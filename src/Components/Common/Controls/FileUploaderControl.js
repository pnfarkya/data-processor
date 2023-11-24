import React from "react";

class FileUploaderControl extends React.Component {

    constructor() {
        super();
        this.state = {
            File: null,
            FilePath: ""
        }
    }

    render() {
        return (<>
            <input type="file" onChange={this.props.HandleChange} />
        </>);
    }
}

export default FileUploaderControl;