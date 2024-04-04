import { Schema, model } from "mongoose";
import { TSales } from "./sales.interfaces";


const salesSchema = new Schema<TSales>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        buyerName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true } 
);

const SalesModel = model<TSales>("Sales", salesSchema);

export default SalesModel;
