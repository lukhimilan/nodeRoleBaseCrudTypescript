import joi from "joi";

export const addRatingSchemaReq = {
  body: joi.object({
    productId: joi.string().required(),
    rating: joi.number().required().min(1).max(5),
    review: joi.string().required(),
  }),
};

export const updateRatingSchemaReq = {
  body: joi.object({
    rating: joi.number().required().min(1).max(5),
    review: joi.string().required(),
  }),
  params: joi.object({
    ratingId: joi.string().required(),
  }),
};
