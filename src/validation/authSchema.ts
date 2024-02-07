import Joi from "joi";
import { UserRole } from "../models/User";

export interface inSignUpReq {
  userName: string;
  email: string;
  role: UserRole;
  password: string;
}

export const signUpReqSchema = {
  body: Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string()
      .valid(...Object.values(UserRole))
      .required(),
    password: Joi.string().required(),
  }),
};

export const signInReqSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
