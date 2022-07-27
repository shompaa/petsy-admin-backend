import { model, Schema } from "mongoose";
import { IPurchaseDetail } from "../utils";

const purchaseDetailSchema = new Schema<IPurchaseDetail>({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: false
    }
});

purchaseDetailSchema.methods.toJSON = function () {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
}

export const PurchaseDetail = model<IPurchaseDetail>("PurchaseDetail", purchaseDetailSchema);


