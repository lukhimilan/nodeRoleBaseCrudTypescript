import { Schema, model } from "mongoose";
import { Types } from "mongoose";

export enum OrderStatus {
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export interface IOrderProduct {
  productId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrderDoc extends Document {
  userId: Types.ObjectId;
  products: IOrderProduct[];
  totalPrice: number;
  status: OrderStatus;
}

const orderSchema = new Schema<IOrderDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PROCESSING,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const OrderModel = model<IOrderDoc>("Order", orderSchema);
