import joi from "joi";

export const addProductReqSchema = {
  body: joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    categoryId: joi.string().required(),
  }),
};

export const getProductReqSchema = {
  params: joi.object({
    productId: joi.string().required(),
  }),
};

export const updateProductReqSchema = {
  body: joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    categoryId: joi.string().required(),
  }),
  params: joi.object({
    productId: joi.string().required(),
  }),
};

export const deleteProductReqSchema = {
  params: joi.object({
    productId: joi.string().required(),
  }),
};
