type Props = {
    summary: any
}

function ApplicationSummary({
    summary,
}: Props) {

    if (!summary) {
        return null
    }

    return (
        <>
            <h2>
                Application Summary
            </h2>

            <p>
                <strong>
                    Application ID:
                </strong>{" "}
                {summary.ApplID}
            </p>

            <p>
                <strong>
                    Service ID:
                </strong>{" "}
                {summary.ServiceID}
            </p>

            <p>
                <strong>
                    Service Name:
                </strong>{" "}
                {summary.ServiceName}
            </p>

            <p>
                <strong>
                    Reference No:
                </strong>{" "}
                {summary.ApplRefNo}
            </p>

            <p>
                <strong>
                    Applied By:
                </strong>{" "}
                {summary.AppliedBy}
            </p>

            <p>
                <strong>
                    Submission Date:
                </strong>{" "}
                {
                    summary.SubmissionDate
                }
            </p>

            <p>
                <strong>
                    Submission Location:
                </strong>{" "}
                {
                    summary.SubmissionLocation
                }
            </p>

            <p>
                <strong>
                    Payment Mode:
                </strong>{" "}
                {
                    summary.PaymentMode
                }
            </p>

            <p>
                <strong>
                    Amount:
                </strong>{" "}
                {summary.Amount}
            </p>
        </>
    )
}

export default ApplicationSummary