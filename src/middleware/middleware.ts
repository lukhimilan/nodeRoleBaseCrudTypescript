import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/User";

export const checkAuth = (allowedRoles?: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[0]
        : null;

      if (!token) {
        return res
          .status(401)
          .json("You are not authorized to use this route.");
      }

      var decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      // @ts-ignore
      req.user = decoded as { userId: string; role: UserRole };

      if (!allowedRoles) {
        next();
        // @ts-ignore
      } else if (allowedRoles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({
          success: false,
          error: "Forbidden Access.",
        });
      }
    } catch (error) {
      res.status(403).json({
        success: false,
        error: "Jwt token is not valid.",
      });
    }
  };
};
