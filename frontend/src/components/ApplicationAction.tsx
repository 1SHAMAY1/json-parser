type Props = {
    action: any
}

function ApplicationAction({
    action,
}: Props) {

    if (!action) {
        return null
    }

    return (
        <>
            <h2>
                Action Details
            </h2>

            <p>
                <strong>
                    Task Name:
                </strong>{" "}
                {action.task_name}
            </p>

            <p>
                <strong>
                    Action No:
                </strong>{" "}
                {action.action_no}
            </p>

            <p>
                <strong>
                    Action Taken:
                </strong>{" "}
                {action.action_taken}
            </p>

            <p>
                <strong>
                    Task Type:
                </strong>{" "}
                {action.task_type}
            </p>

            <p>
                <strong>
                    User Name:
                </strong>{" "}
                {action.user_name}
            </p>

            <p>
                <strong>
                    Designation:
                </strong>{" "}
                {action.designation}
            </p>

            <p>
                <strong>
                    Location:
                </strong>{" "}
                {action.location_name}
            </p>

            <p>
                <strong>
                    Received Time:
                </strong>{" "}
                {action.received_time}
            </p>

            <p>
                <strong>
                    Executed Time:
                </strong>{" "}
                {action.executed_time}
            </p>

            <p>
                <strong>
                    Remarks:
                </strong>{" "}
                {action.remarks}
            </p>
        </>
    )
}

export default ApplicationAction