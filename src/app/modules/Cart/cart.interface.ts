import { Document, Schema } from "mongoose";

export type TCartItem = {
  product: Schema.Types.ObjectId;
  quantity: number;
};

export interface ICart extends Document {
  items: TCartItem[];
  totalPrice: number;
}
