import { Schema, model, models } from "mongoose";

const productoSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    isbn: {
      type: String,
      trim: true,
      default: null,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ["book", "ebook", "audiobook"], // Example categories
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Producto || model("Producto", productoSchema);
