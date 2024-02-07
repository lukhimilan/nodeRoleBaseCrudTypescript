// validationMiddleware.ts

import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

interface Schema {
  body?: ObjectSchema<any>;
  params?: ObjectSchema<any>;
}

const validateRequest = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema.body) {
      const { error: bodyError } = schema.body.validate(req.body);
      if (bodyError) {
        return res
          .status(400)
          .json({ success: false, message: bodyError.details[0].message });
      }
    }

    if (schema.params) {
      const { error: paramsError } = schema.params.validate(req.params);
      if (paramsError) {
        return res
          .status(400)
          .json({ success: false, message: paramsError.details[0].message });
      }
    }

    next();
  };
};

export default validateRequest;
