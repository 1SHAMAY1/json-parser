type Props = {
    actions: any[]
    onSelectAction: (
        actionNo: number,
    ) => void
}

function ApplicationActions({
    actions,
    onSelectAction,
}: Props) {

    if (
        !actions ||
        actions.length === 0
    ) {
        return null
    }

    return (
        <>
            <h2>
                Workflow Timeline
            </h2>

            {actions.map(
                (action) => (
                    <div
                        key={
                            action.action_no
                        }
                    >
                        <button
                            onClick={() =>
                                onSelectAction(
                                    action.action_no,
                                )
                            }
                        >
                            {
                                action.action_no
                            }
                            {" "}
                            {
                                action.task_name
                            }
                        </button>

                        <br />
                        <br />
                    </div>
                ),
            )}
        </>
    )
}

export default ApplicationActions