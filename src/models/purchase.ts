import { model, Schema } from 'mongoose';
import { IPurchase } from '../utils';
const purchaseSchema = new Schema<IPurchase>({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    details: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "PurchaseDetail"
    }],
    total: {
        type: Number,
        required: true
    }
});

purchaseSchema.methods.toJSON = function () {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
}

export const Purchase = model<IPurchase>("Purchase", purchaseSchema);