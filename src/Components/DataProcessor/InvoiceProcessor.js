import React from "react";
import FileUploaderControl from "../Common/Controls/FileUploaderControl";
import { UploadInvoiceData } from "../repos/DataProcessosRepos/InvoiceProcessorRepo";

class InvoiceProcessor extends React.Component {

    constructor() {
        super();
        this.state = {
            DataRows: [],
            InvalidRowsCount: "",
            ValidationMessage: "",
            DataFile: null,
            CurrentFile: "",
            ProcessingTime: ""
        }
    }

    HandleChange = (event) => {
        this.setState({ ValidationMessage: "File Uploaded" });
    }

    HandleValidate = () => {
        var reader = new FileReader();
        var rows = [{
            number: 123
        }]
        this.setState({ DataRows: rows });
        alert(this.state.ValidationMessage)
    }

    HandlePost = () => {
        if (this.state.DataRows != null && this.state.DataRows.length > 0) {
            UploadInvoiceData(this.state.DataRows);
        }
    }

    render() {
        return (<>

            <FileUploaderControl HandleChange={this.HandleChange} />
            <button onClick={this.HandleValidate}>Validate & Display Data</button>
            <button onClick={this.HandlePost} disabled={!this.state.DataRows.length > 0}> Post Data</button >
        </>)
    }

}

export default InvoiceProcessor;