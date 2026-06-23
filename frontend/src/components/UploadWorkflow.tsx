import { useState } from "react"
import { api } from "../api"

function UploadWorkflow() {
    const [file, setFile] = useState<File | null>(null)

    async function handleUpload() {
        if (!file) {
            alert("Select a workflow file")
            return
        }

        const formData = new FormData()

        formData.append(
            "file",
            file,
        )

        try {
            const response = await api.post(
                "/workflow",
                formData,
            )

            alert(
                    `${response.data.message}
                Events: ${response.data.events}
                Initiated: ${response.data.initiated}
                Execution: ${response.data.execution}
                Skipped: ${response.data.skipped}`
                )
        } catch (err: any) {
            console.log(err)

            alert(
                err?.response?.data?.error ??
            err.message ??
            "Upload failed"
            )
        }
    }

    return (
        <div>
            <h2>Upload Workflow</h2>

            <input
                type="file"
                accept=".json"
                onChange={(e) =>
                    setFile(
                        e.target.files?.[0] ??
                            null,
                    )
                }
            />

            <br />

            <button
                onClick={
                    handleUpload
                }
            >
                Upload
            </button>
        </div>
    )
}

export default UploadWorkflow