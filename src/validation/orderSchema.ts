import Joi from "joi";
import { OrderStatus } from "../models/Order";

export const addOrderReqSchema = {
  body: Joi.object({
    products: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          name: Joi.string().required(),
          price: Joi.number().required(),
          quantity: Joi.number().required(),
        })
      )
      .required(),
    totalPrice: Joi.number().required(),
  }),
};

export const getOrderReqSchema = {
  params: Joi.object({
    orderId: Joi.string().required(),
  }),
};

export const updateOrderStatusReqSchema = {
  body: Joi.object({
    status: Joi.string()
      .valid(...Object.values(OrderStatus))
      .required(),
  }),
  params: Joi.object({
    orderId: Joi.string().required(),
  }),
};
