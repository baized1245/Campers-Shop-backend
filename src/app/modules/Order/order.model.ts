import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema: Schema = new Schema({
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Order = model<IOrder>("Order", orderSchema);
