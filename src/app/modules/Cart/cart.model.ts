// src/models/cart.model.ts
import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
});

const cartSchema = new Schema<ICart>({
  items: [cartItemSchema],
  totalPrice: { type: Number, required: true, default: 0 },
});

const Cart = model<ICart>("Cart", cartSchema);

export default Cart;
