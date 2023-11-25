import { RestController, BaseApi } from "../../Common/Config";

const invoiceBaseUrl = BaseApi + "Invoice";

export function UploadInvoiceData(data) {

    // RestController.post(invoiceBaseUrl + "/upload", data);
    alert("Please press f12 or go to dev tools to view console for data payload")
    console.log(JSON.stringify(data))
}