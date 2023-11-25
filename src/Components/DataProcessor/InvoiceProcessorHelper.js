export const Columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'InvoiceNumber',
        headerName: 'Invoice Number',
        width: 150,
    },
    {
        field: 'CustomerNumber',
        headerName: 'Customer Number',
        width: 150,
        type: 'number',
    },
    {
        field: 'InvoiceValue',
        headerName: 'Invoice Value',
        type: 'number',
        width: 150,
    }
];

export const AllowedExtentions = ".csv";

export function GetInvoiceValueWithDecimal(value) {

    if (value.length > 2) {
        var intVal = value.substring(0, value.length - 3);
        var decimalPlace = value.substring(value.length - 1, 2);

        var actualValue = intVal + "." + decimalPlace;

        return Number(actualValue).toFixed(2);
    }
    return Number(value).toFixed(2);
}

export function BuildCustomerInvoices(rows) {

    var custInvoice = [];
    rows.forEach(r => {
        var customer = custInvoice.find(c => c.CustomerNumber == r.CustomerNumber);

        if (customer === undefined || customer === null) {

            customer = {
                CustomerNumber: r.CustomerNumber,
                Invoices: []
            }
            customer.Invoices.push({
                Number: r.InvoiceNumber,
                Currency: "Aud",
                Amount: r.InvoiceValue
            })
            custInvoice.push(customer);
        }
        else {
            customer.Invoices.push({
                Number: r.InvoiceNumber,
                Currency: "Aud",
                Amount: r.InvoiceValue
            })
        }
    })

    return custInvoice;

}