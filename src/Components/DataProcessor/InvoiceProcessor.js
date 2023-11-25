import React from "react";
import FileUploaderControl from "../Common/Controls/FileUploaderControl";
import { UploadInvoiceData } from "../repos/DataProcessosRepos/InvoiceProcessorRepo";
import { AlphaEx, AlphaNumericEx } from "../Common/Config";
import { AllowedExtentions, Columns, GetInvoiceValueWithDecimal, BuildCustomerInvoices } from "./InvoiceProcessorHelper";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Grid, Typography, Input, Button } from "@mui/material";

class InvoiceProcessor extends React.Component {

    constructor() {
        super();
        this.state = {
            DataRows: [],
            DataFile: null,
            InvalidRows: [],
            ValidationMessage: "",
            FileText: "",
            CurrentFile: "",
            ProcessingTime: "",
            FileProcessTime: ""
        }
    }

    //region EventMethods

    HandleChange = (event) => {
        if (event !== undefined && event.target !== undefined && event.target.files !== undefined && event.target.files.length > 0) {
            var file = event.target.files[0];
            if (file.type !== "text/csv") {
                alert("Selected file is not a valid type , please select csv file only")
            }
            else {
                var reader = new FileReader();
                reader.onload = async ({ target }) => {
                    var fileText = target.result;
                    this.setState({ FileText: fileText });
                }
                reader.readAsText(file);
                this.setState({ DataFile: file });
            }
        }
    }

    HandleValidate = () => {
        if (this.state.FileText != "") {
            //Validate data
            this.ValidateFileText(this.state.FileText);
        }
    }

    HandlePost = () => {
        if (this.state.DataRows != null && this.state.DataRows.length > 0) {
            var rows = [...this.state.DataRows];
            rows = rows.splice(0, rows.length - 1);
            var customerInvoices = BuildCustomerInvoices(rows);
            UploadInvoiceData(customerInvoices);
        }
    }

    //endregion

    //region helpers

    ValidateFileText = (fileText) => {
        this.state.ValidationMessage = "";
        var allLines = fileText.split("\n");
        var totalInvoiceValue = 0.00;
        if (allLines.length > 1) {
            //Removing Header row
            allLines.splice(0, 1);

            var rows = [];
            var invalidRows = [];
            var rowNumber = 0;
            allLines.forEach(line => {
                var values = line.split(",");
                rowNumber++;
                if (this.IsValidRow(values)) {
                    var invoiceValue = GetInvoiceValueWithDecimal(values[2]);

                    rows.push({
                        id: rowNumber,
                        InvoiceNumber: values[0],
                        CustomerNumber: Number(values[1]),
                        InvoiceValue: invoiceValue
                    })
                    totalInvoiceValue = parseFloat(totalInvoiceValue) + parseFloat(invoiceValue);
                }
                else {
                    invalidRows.push(rowNumber)
                    this.setState({ InvalidRows: invalidRows })
                }
            });
            console.log(rows);

            //Adding total invoice value
            rows.push({
                id: "",
                InvoiceNumber: "",
                CustomerNumber: "Total Invoice Value",
                InvoiceValue: Number(totalInvoiceValue).toFixed(2)
            })
            this.setState({ DataRows: rows, FileProcessTime: new Date().toLocaleTimeString(), CurrentFile: this.state.DataFile.name })
        }
        else {
            this.state.ValidationMessage = "No data to process, file data is empty";
        }
    }

    IsValidRow = (values) => {
        if (values.length !== 3) return false;

        var isValid = true;
        //Validate customer number
        var custNo = Number(values[1]);
        if (isNaN(custNo) || custNo < 2000) {
            isValid = false;
        }

        //Validating invoice number
        if (isValid) {
            if (values[0].match(AlphaNumericEx)) {
                var invoicePrefix = values[0].substring(0, 3)
                var invoiceNum = Number(values[0].substring(3, values[0].lenght));

                if (!invoicePrefix.match(AlphaEx) || isNaN(invoiceNum)) {
                    isValid = false;
                }
            }
        }

        //Validating Invoice Value
        if (isValid) {
            var invoiceValue = Number(values[2]);
            if (isNaN(invoiceValue)) {
                isValid = false;
            }
        }
        return isValid;
    }
    //endregion

    //region render
    render() {
        return (<>
            <Box sx={{ height: '100%', width: '100%', marginTop: '20px' }}>

                <Grid container spacing={2}>
                    <Grid item sm={12}>
                        <FileUploaderControl HandleChange={this.HandleChange} AllowedExtentions={AllowedExtentions} />
                    </Grid>
                    <Grid item sm={12} >
                        <Button variant="contained" onClick={this.HandleValidate} data-testid="ValidateData">Validate & Display Data</Button>
                        <Button data-testid="PostData" variant="contained" style={{ marginLeft: '20px' }} onClick={this.HandlePost} disabled={!this.state.DataRows.length > 0}> Post Data</Button >
                    </Grid>
                    <Grid item sm={4} hidden={this.state.CurrentFile == ""}>
                        <Typography textAlign={"left"} color={"Highlight"} >Currnet Processed File :&nbsp;  {this.state.CurrentFile} &nbsp; &nbsp; &nbsp; At :&nbsp; {this.state.FileProcessTime}</Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={this.state.DataRows}
                                columns={Columns}
                                disableRowSelectionOnClick
                            />
                        </Box>
                    </Grid>
                    <Grid item sm={12} hidden={this.state.InvalidRows.length == 0} >
                        <Typography textAlign={"left"} color={"crimson"}>Invalid Data Row Number(s): {this.state.InvalidRows.toString()}</Typography>
                    </Grid>
                    <Grid item sm={5}>
                        <Typography textAlign={"left"} color={"GrayText"}>File Instructions: <br />
                            1. Customer number should be numeric and greater than 2000 <br />

                            2. Invoice number should be Alphanumeric with first 3 chars as alphabets and the and rest to be numbers <br />

                            3. File type should be selected as csv <br />

                            4. File columns sequence are  1. Invoice Number 2. Custormer Number 3. Invoice value</Typography>
                    </Grid>
                </Grid>
            </Box >

        </>)
    }
}
// endregion

export default InvoiceProcessor;