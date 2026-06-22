package model

import "time"

type Service struct {
	ServiceGroupID   int64  `db:"service_group_id"`
	ServiceName string `db:"service_name"`
}

type ServiceMapping struct {
	ID int64 `db:"id"`

	ServiceGroupID int64 `db:"service_group_id"`

	SectionName string `db:"section_name"`
	SectionID   int64  `db:"section_id"`

	FieldID   string `db:"field_id"`
	FieldName string `db:"field_name"`

	InputType string `db:"input_type"`

	FieldSetID *int64 `db:"field_set_id"`
}

type WorkflowEvent struct {
	ID int64 `db:"id" json:"id"`

	ApplID int64 `db:"appl_id" json:"appl_id"`

	ServiceID int64 `db:"service_id" json:"service_id"`

	RootType string `db:"root_type" json:"root_type"`

	TaskName string `db:"task_name" json:"task_name"`

	ActionNo int `db:"action_no" json:"action_no"`

	TaskType int `db:"task_type" json:"task_type"`

	ReceivedTime *time.Time `db:"received_time" json:"received_time"`

	ExecutedTime *time.Time `db:"executed_time" json:"executed_time"`

	RawPayload []byte `db:"raw_payload" json:"raw_payload"`

	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

type ApplicationInitiated struct {
	ID int64 `db:"id" json:"id"`

	ApplID int64 `db:"appl_id" json:"appl_id"`

	ServiceID int64 `db:"service_id" json:"service_id"`

	ServiceName string `db:"service_name" json:"service_name"`

	ApplRefNo string `db:"appl_ref_no" json:"appl_ref_no"`

	SubmissionDate *time.Time `db:"submission_date" json:"submission_date"`

	SubmissionLocation string `db:"submission_location" json:"submission_location"`

	AppliedBy string `db:"applied_by" json:"applied_by"`

	PaymentMode string `db:"payment_mode" json:"payment_mode"`

	Amount float64 `db:"amount" json:"amount"`

	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

type ApplicationExecution struct {
	ID int64 `db:"id" json:"id"`

	ApplID int64 `db:"appl_id" json:"appl_id"`

	ServiceID int64 `db:"service_id" json:"service_id"`

	TaskName string `db:"task_name" json:"task_name"`

	ActionNo int `db:"action_no" json:"action_no"`

	ActionTaken string `db:"action_taken" json:"action_taken"`

	TaskType int `db:"task_type" json:"task_type"`

	UserName string `db:"user_name" json:"user_name"`

	Designation string `db:"designation" json:"designation"`

	LocationName string `db:"location_name" json:"location_name"`

	ReceivedTime *time.Time `db:"received_time" json:"received_time"`

	ExecutedTime *time.Time `db:"executed_time" json:"executed_time"`

	Remarks string `db:"remarks" json:"remarks"`

	CreatedAt time.Time `db:"created_at" json:"created_at"`
}