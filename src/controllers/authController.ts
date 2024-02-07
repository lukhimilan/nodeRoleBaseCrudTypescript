import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { createUser, findUserByEmail } from "./userController";
import bcrypt from "bcrypt";
import { UserDoc } from "../models/User";
const saltRounds = 10;

export async function signUp(req: Request, res: Response) {
  try {
    const isUserExist = await findUserByEmail(req.body.email);
    if (isUserExist) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const password = await bcrypt.hash(req.body.password, saltRounds);
    const user = await createUser({...req.body, password });

  

    const accessToken = await createAccessToken(user);
    res.status(201).json({
      success: true,
      user: { ...user.toJSON() },
      accessToken,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ success: false, message: "Error" });
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const accessToken = await createAccessToken(user);

    // remove password from user object
    res.status(200).json({
      success: true,
      user: { ...user.toJSON() },
      accessToken,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "" });
  }
}

async function createAccessToken(user: UserDoc) {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1d" }
  );
}
