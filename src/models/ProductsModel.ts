import mongoose from "mongoose";
import { IProduct } from "../types/ProductTypes";

const Product = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IProduct>("Product", Product);
