import { Schema, model, Document } from "mongoose";

export interface ICategoryDoc extends Document {
  name: string;
  description: string;
}

const categorySchema = new Schema<ICategoryDoc>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoryModel = model<ICategoryDoc>("Category", categorySchema);
