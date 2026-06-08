import { useState } from "react"
import { api } from "../api"
import JsonTree from "./JsonTree"

function SearchApplication() {

    const [applID, setApplID] =
        useState("")

    const [serviceID, setServiceID] =
        useState("")

    const [rootType, setRootType] =
        useState("")

    const [result, setResult] =
        useState<any>(null)

    async function handleSearch() {

        try {

            const response =
                await api.get(
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

            setResult(
                response.data,
            )

        } catch (err) {

            console.error(err)

            alert(
                "Application not found",
            )
        }
    }

    return (
        <>
            <h2>
                Search Application
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
                    handleSearch
                }
            >
                Search
            </button>

            {
                result && (
                    <>
                        <hr />

                        <h3>
                            Application{" "}
                            {
                                result.application_id
                            }
                        </h3>

                        <p>
                            Service ID:{" "}
                            {
                                result.service_id
                            }
                        </p>

                        <p>
                            Root Type:{" "}
                            {
                                result.root_type
                            }
                        </p>

                        {
                            result.events.map(
                                (
                                    event: any,
                                    index: number,
                                ) => (
                                    <div
                                        key={
                                            event.id
                                        }
                                        style={{
                                            marginTop:
                                                "20px",
                                            padding:
                                                "10px",
                                            border:
                                                "1px solid #ccc",
                                        }}
                                    >
                                        <h4>
                                            {
                                                index +
                                                1
                                            }
                                            .{" "}
                                            {
                                                event.task_name
                                            }
                                        </h4>

                                        <p>
                                            Action No:{" "}
                                            {
                                                event.action_no
                                            }
                                        </p>

                                        <JsonTree
                                            name="payload"
                                            data={
                                                event.payload
                                            }
                                        />
                                    </div>
                                ),
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default SearchApplication