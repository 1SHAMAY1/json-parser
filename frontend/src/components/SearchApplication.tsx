import { useState } from "react"
import { api } from "../api"

function SearchApplication() {
    const [type, setType] =
        useState("initiated")

    const [applicationID, setApplicationID] =
        useState("")

    const [serviceID, setServiceID] =
        useState("")

    const [actionNo, setActionNo] =
        useState("")

    const [result, setResult] =
        useState<any>(null)

    async function handleSearch() {
        try {
            let url = ""

            if (type === "initiated") {
                url =
                    `/applications/${applicationID}/actions` +
                    `?service_id=${serviceID}`
            } else {
                url =
                    `/applications/${applicationID}` +
                    `/actions/${actionNo}` +
                    `?service_id=${serviceID}`
            }

            const response =
                await api.get(url)

            setResult(
                response.data,
            )
        } catch (err: any) {
            console.error(err)

            alert(
                err?.response?.data?.error ??
                    "Search failed",
            )

            setResult(null)
        }
    }

    return (
        <div>
            <h2>
                Search Application
            </h2>

            <select
                value={type}
                onChange={(e) =>
                    setType(
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
            <br />

            <input
                type="text"
                placeholder="Application ID"
                value={applicationID}
                onChange={(e) =>
                    setApplicationID(
                        e.target.value,
                    )
                }
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="Service ID"
                value={serviceID}
                onChange={(e) =>
                    setServiceID(
                        e.target.value,
                    )
                }
            />

            <br />
            <br />

            {type === "execution" && (
                <>
                    <input
                        type="text"
                        placeholder="Action No"
                        value={actionNo}
                        onChange={(e) =>
                            setActionNo(
                                e.target.value,
                            )
                        }
                    />

                    <br />
                    <br />
                </>
            )}

            <button
                onClick={
                    handleSearch
                }
            >
                Search
            </button>

            {result && (
                <>
                    <hr />

                    <h2>
                        Result
                    </h2>

                    {Object.entries(
                        result,
                    ).map(
                        ([key, value]) => (
                            <p key={key}>
                                <strong>
                                    {key}:
                                </strong>{" "}
                                {String(
                                    value,
                                )}
                            </p>
                        ),
                    )}
                </>
            )}
        </div>
    )
}

export default SearchApplication