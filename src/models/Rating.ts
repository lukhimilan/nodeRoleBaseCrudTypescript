import { Schema, model, Document, Types } from "mongoose";

export interface IRatingDoc extends Document {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  rating: number;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema = new Schema<IRatingDoc>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const RatingModel = model<IRatingDoc>("Rating", ratingSchema);
