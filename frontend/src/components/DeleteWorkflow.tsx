import { useState } from "react"
import { api } from "../api"

function DeleteWorkflow() {

    const [applID, setApplID] =
        useState("")

    const [serviceID, setServiceID] =
        useState("")

    const [rootType, setRootType] =
        useState("")

    async function handleDelete() {

        const confirmed =
            window.confirm(
                "Are you sure?"
            )

        if (!confirmed) {
            return
        }

        try {

            await api.delete(
                `/applications/${applID}`,
                {
                    params: {
                        service_id:
                            serviceID,
                        root_type:
                            rootType,
                    },
                },
            )

            alert(
                "Workflow deleted",
            )

            setApplID("")
            setServiceID("")
            setRootType("")

        } catch (err) {

            console.error(err)

            alert(
                "Delete failed",
            )
        }
    }

    return (
        <>
            <h2>
                Delete Workflow
            </h2>

            <input
                placeholder="Application ID"
                value={applID}
                onChange={(e) =>
                    setApplID(
                        e.target.value,
                    )
                }
            />

            <br />

            <input
                placeholder="Service ID"
                value={serviceID}
                onChange={(e) =>
                    setServiceID(
                        e.target.value,
                    )
                }
            />

            <br />

            <select
                value={rootType}
                onChange={(e) =>
                    setRootType(
                        e.target.value,
                    )
                }
            >
                <option value="">
                    Select Root Type
                </option>

                <option value="initiated_data">
                    initiated_data
                </option>

                <option value="execution_data">
                    execution_data
                </option>
            </select>

            <br />

            <button
                onClick={
                    handleDelete
                }
            >
                Delete
            </button>
        </>
    )
}

export default DeleteWorkflow