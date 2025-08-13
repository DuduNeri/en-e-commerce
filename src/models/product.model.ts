import mongoose, { Schema, Types } from "mongoose";
import { IProduct } from "../interfaces/product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
