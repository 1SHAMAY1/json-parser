package utils

import (
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"parser/internal/model"
)

type Parser struct{}

type Payload struct {
	InitiatedData []map[string]any `json:"initiated_data"`
	ExecutionData []map[string]any `json:"execution_data"`
}

func NewParser() *Parser {
	return &Parser{}
}
func (p *Parser) Parse(
	raw []byte,
) ([]model.WorkflowEvent, error) {

	var payload Payload

	if err := json.Unmarshal(raw, &payload); err != nil {
		return nil, fmt.Errorf(
			"unmarshal payload: %w",
			err,
		)
	}

	var events []model.WorkflowEvent

	for _, item := range payload.InitiatedData {

		event, err := p.extractInitiatedEvent(
			item,
		)
		if err != nil {
			return nil, err
		}

		eventRaw, err := json.Marshal(item)
		if err != nil {
			return nil, fmt.Errorf(
				"marshal event payload: %w",
				err,
			)
		}

		event.RawPayload = eventRaw

		events = append(
			events,
			event,
		)
	}

	for _, item := range payload.ExecutionData {

		event, err := p.extractExecutionEvent(
			item,
		)
		if err != nil {
			return nil, err
		}

		eventRaw, err := json.Marshal(item)
		if err != nil {
			return nil, fmt.Errorf(
				"marshal event payload: %w",
				err,
			)
		}

		event.RawPayload = eventRaw

		events = append(
			events,
			event,
		)
	}

	return events, nil
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
