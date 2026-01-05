import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  size: [{ type: String }], // <-- FIX: Array of strings
  color: { type: String, required: true },
  image: { type: String, required: true },
  inStock: { type: Boolean, default: true },
});

const productDb =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productDb;
