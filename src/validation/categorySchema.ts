import Joi from "joi";

export const addCategoryReq = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

export const getCategoryReqSchema = {
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
};

export const updateCategoryReqSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
};

export const deleteCategoryReqSchema = {
  params: Joi.object({
    categoryId: Joi.string().required(),
  }),
};
