import { Schema, model, Document, Types } from "mongoose";

export interface IProductDoc extends Document {
  categoryId: Types.ObjectId;
  name: string;
  price: number;
  description: string;
}

const productSchema = new Schema<IProductDoc>(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductModel = model<IProductDoc>("Product", productSchema);
