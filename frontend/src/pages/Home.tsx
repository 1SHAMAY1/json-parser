import "../App.css"

import UploadSpreadsheet from "../components/UploadSpreadsheet"
import UploadWorkflow from "../components/UploadWorkflow"
import SearchApplication from "../components/SearchApplication"
import DeleteWorkflow from "../components/DeleteWorkflow"
function Home() {
    return (
        <div className="container">
            <h1>Workflow Explorer</h1>

            <div className="section">
                <UploadSpreadsheet />
            </div>

            <div className="section">
                <UploadWorkflow />
            </div>

            <div className="section">
                <DeleteWorkflow />
            </div>

            <div className="section">
                <SearchApplication />
            </div>
            
        </div>
    )
}

export default Home