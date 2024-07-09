import { Schema, model } from "mongoose";
import { TProduct } from "./product.interface";

// Create the schema for the TProduct model
const productSchema: Schema<TProduct> = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  ratings: { type: Number, required: true },
  images: { type: String, required: true },
});

// Create the model from the schema
export const Product = model<TProduct>("Product", productSchema);
