import { useState } from "react"

import { api } from "../api"

import ApplicationSummary from "./ApplicationSummary"

function SearchApplication() {

    const [applID, setApplID] =
        useState("")

    const [serviceID, setServiceID] =
        useState("")

    const [rootType, setRootType] =
        useState("initiated")

    const [result, setResult] =
        useState<any>(null)

    async function handleSearch() {

        try {

            const response =
                await api.get(
                    `/applications/${applID}/summary`,
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

            setResult(
                null,
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
                <option value="initiated">
                    Initiated Data
                </option>

                <option value="execution">
                    Execution Data
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
                result &&
                rootType ===
                    "initiated" && (
                    <>
                        <hr />

                        <ApplicationSummary
                            summary={
                                result
                            }
                        />
                    </>
                )
            }

            {
                result &&
                rootType ===
                    "execution" && (
                    <>
                        <hr />

                        <h3>
                            Execution Data
                        </h3>

                    {
                        result.map(
                            (
                                execution: any,
                            ) => (
                                <div
                                    key={
                                        execution.ID
                                    }
                                    style={{
                                        marginBottom:
                                            "20px",
                                        padding:
                                            "10px",
                                        border:
                                            "1px solid #ccc",
                                    }}
                                >
                                    <p>
                                        <strong>
                                            Action No:
                                        </strong>{" "}
                                        {
                                            execution.ActionNo
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            Task Name:
                                        </strong>{" "}
                                        {
                                            execution.TaskName
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            Action Taken:
                                        </strong>{" "}
                                        {
                                            execution.ActionTaken
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            User:
                                        </strong>{" "}
                                        {
                                            execution.UserName
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            Designation:
                                        </strong>{" "}
                                        {
                                            execution.Designation
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            Location:
                                        </strong>{" "}
                                        {
                                            execution.LocationName
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            Received Time:
                                        </strong>{" "}
                                        {
                                            execution.ReceivedTime
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            Executed Time:
                                        </strong>{" "}
                                        {
                                            execution.ExecutedTime
                                        }
                                    </p>
                                    
                                    <p>
                                        <strong>
                                            Remarks:
                                        </strong>{" "}
                                        {
                                            execution.Remarks
                                        }
                                    </p>
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