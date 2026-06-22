package utils

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"parser/internal/model"
)

type Parser struct{}

type ParseResult struct {
	WorkflowEvents []model.WorkflowEvent

	InitiatedApps []model.ApplicationInitiated

	ExecutionApps []model.ApplicationExecution
}

type Payload struct {
	InitiatedData []map[string]any `json:"initiated_data"`
	ExecutionData []map[string]any `json:"execution_data"`
}

func NewParser() *Parser {
	return &Parser{}
}

func (p *Parser) Parse(
	raw []byte,
) (*ParseResult, error) {

	var payload Payload

	if err := json.Unmarshal(
		raw,
		&payload,
	); err != nil {
		return nil, fmt.Errorf(
			"unmarshal payload: %w",
			err,
		)
	}

	result := &ParseResult{}

	for _, item := range payload.InitiatedData {

		event, err := p.extractInitiatedEvent(
			item,
		)
		if err != nil {
			return nil, err
		}

		eventRaw, err := json.Marshal(
			item,
		)
		if err != nil {

			return nil, fmt.Errorf(
				"marshal event payload: %w",
				err,
			)
		}

		event.RawPayload = eventRaw

		result.WorkflowEvents = append(
			result.WorkflowEvents,
			event,
		)

		initiated :=
			model.ApplicationInitiated{

				ApplID: toInt64(
					item["appl_id"],
				),

				ServiceID: toInt64(
					item["service_id"],
				),

				ServiceName: toString(
					item["service_name"],
				),

				ApplRefNo: toString(
					item["appl_ref_no"],
				),

				SubmissionDate: parseTime(
					toString(
						item["submission_date"],
					),
				),

				SubmissionLocation: toString(
					item["submission_location"],
				),

				AppliedBy: toString(
					item["applied_by"],
				),

				PaymentMode: toString(
					item["payment_mode"],
				),

				Amount: toFloat64(
					item["amount"],
				),
			}

		result.InitiatedApps = append(
			result.InitiatedApps,
			initiated,
		)
	}

	for _, item := range payload.ExecutionData {

		event, err := p.extractExecutionEvent(
			item,
		)
		if err != nil {
			return nil, err
		}

		eventRaw, err := json.Marshal(
			item,
		)
		if err != nil {

			return nil, fmt.Errorf(
				"marshal event payload: %w",
				err,
			)
		}

		event.RawPayload = eventRaw

		result.WorkflowEvents = append(
			result.WorkflowEvents,
			event,
		)

		taskDetails, ok :=
			item["task_details"].(map[string]any)

		if !ok {
			return nil, fmt.Errorf(
				"task_details missing",
			)
		}

		userDetail, _ :=
			taskDetails["user_detail"].(map[string]any)

		execution :=
			model.ApplicationExecution{

				ApplID: toInt64(
					taskDetails["appl_id"],
				),

				ServiceID: toInt64(
					taskDetails["service_id"],
				),

				TaskName: toString(
					taskDetails["task_name"],
				),

				ActionNo: int(
					toInt64(
						taskDetails["action_no"],
					),
				),

				ActionTaken: toString(
					taskDetails["action_taken"],
				),

				TaskType: int(
					toInt64(
						taskDetails["task_type"],
					),
				),

				UserName: toString(
					taskDetails["user_name"],
				),

				Designation: toString(
					userDetail["designation"],
				),

				LocationName: toString(
					userDetail["location_name"],
				),

				ReceivedTime: parseTime(
					toString(
						taskDetails["received_time"],
					),
				),

				ExecutedTime: parseTime(
					toString(
						taskDetails["executed_time"],
					),
				),

				Remarks: toString(
					taskDetails["remarks"],
				),
			}

		result.ExecutionApps = append(
			result.ExecutionApps,
			execution,
		)
	}

	return result, nil
}

func (p *Parser) extractInitiatedEvent(
	data map[string]any,
) (model.WorkflowEvent, error) {

	submissionDate := parseTime(
		toString(data["submission_date"]),
	)

	return model.WorkflowEvent{
		ApplID:    toInt64(data["appl_id"]),
		ServiceID: toInt64(data["service_id"]),

		RootType: "initiated_data",

		TaskName: "Application Submitted",

		ActionNo: 0,
		TaskType: 0,

		ReceivedTime: submissionDate,
		ExecutedTime: submissionDate,
	}, nil
}

func (p *Parser) extractExecutionEvent(
	data map[string]any,
) (model.WorkflowEvent, error) {

	taskDetails, ok := data["task_details"].(map[string]any)
	if !ok {
		return model.WorkflowEvent{},
			fmt.Errorf(
				"task_details missing",
			)
	}

	return model.WorkflowEvent{
		ApplID:    toInt64(taskDetails["appl_id"]),
		ServiceID: toInt64(taskDetails["service_id"]),
		TaskName:  toString(taskDetails["task_name"]),
		ActionNo:  int(toInt64(taskDetails["action_no"])),
		TaskType:  int(toInt64(taskDetails["task_type"])),
		RootType:  "execution_data",

		ReceivedTime: parseTime(
			toString(taskDetails["received_time"]),
		),

		ExecutedTime: parseTime(
			toString(taskDetails["executed_time"]),
		),
	}, nil
}

func toString(v any) string {
	s, ok := v.(string)
	if !ok {
		return ""
	}

	return s
}

func toInt64(v any) int64 {
	switch x := v.(type) {

	case float64:
		return int64(x)

	case int:
		return int64(x)

	case int64:
		return x

	case string:
		n, err := strconv.ParseInt(
			x,
			10,
			64,
		)
		if err != nil {
			return 0
		}

		return n

	default:
		return 0
	}
}

func parseTime(value string) *time.Time {
	if value == "" {
		return nil
	}

	t, err := time.Parse(
		"02-01-2006 15:04:05",
		value,
	)
	if err != nil {
		return nil
	}

	return &t
}

func toFloat64(v any) float64 {

	switch x := v.(type) {

	case float64:
		return x

	case string:

		f, err := strconv.ParseFloat(
			x,
			64,
		)

		if err != nil {
			return 0
		}

		return f

	default:
		return 0
	}
}
