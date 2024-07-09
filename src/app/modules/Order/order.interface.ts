import { Document } from "mongoose";
import { TCartItem } from "../Cart/cart.interface";

export interface IOrder extends Document {
  items: TCartItem[];
  totalPrice: number;
  createdAt: Date;
}
