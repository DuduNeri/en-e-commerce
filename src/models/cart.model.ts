import mongoose, { Schema } from "mongoose";

const CartSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1, default: 1 },
    }
  ],
  }, { timestamps: true}
)

export default mongoose.model("Cart", CartSchema);