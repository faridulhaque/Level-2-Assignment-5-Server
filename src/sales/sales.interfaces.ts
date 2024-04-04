import { Types } from "mongoose";

export type TSales = {
    productId: Types.ObjectId,
    buyerName: string,
    quantity: number,
}

export interface TSalesOQ extends TSales {
    quantityHistory: number;
}