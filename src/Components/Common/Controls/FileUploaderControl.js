import { Input, Button, Typography, Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
import React from "react";

const HiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

class FileUploaderControl extends React.Component {
    render() {
        return (<>
            {/* <Input type="file" onChange={this.props.HandleChange} accept={this.props.AllowedExtentions} multiple={false} /> */}
            <Grid container>
                <Button component="label" variant="contained" >
                    Upload file
                    <HiddenInput type="file" onChange={this.props.HandleChange} accept={this.props.AllowedExtentions} multiple={false} />
                </Button>
                <Typography color={"firebrick"} style={{ marginLeft: "15px", alignSelf: "center" }}>{this.props.SelectedFile}</Typography>
            </Grid>
        </>);
    }
}

export default FileUploaderControl;