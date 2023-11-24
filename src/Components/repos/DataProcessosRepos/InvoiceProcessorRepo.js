import { RestController, BaseApi } from "../../Common/Config";

const invoiceBaseUrl = BaseApi + "Invoice";

export function UploadInvoiceData(data) {

    RestController.post(invoiceBaseUrl + "/upload", data);
}