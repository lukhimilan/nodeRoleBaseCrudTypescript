import express from "express";
import { checkAuth } from "../middleware/middleware";
import { UserRole } from "../models/User";
import validateRequest from "../middleware/validationMiddleware";
import {
  addRatingSchemaReq,
  updateRatingSchemaReq,
} from "../validation/ratingSchema";
import {
  addRating,
  getRating,
  getRatingByProductId,
  updateRating,
} from "../controllers/ratingController";
const ratingRoutes = express.Router();

ratingRoutes.post(
  "/add",
  checkAuth([UserRole.USER]),
  validateRequest(addRatingSchemaReq),
  addRating
);

ratingRoutes.get("/:ratingId", getRating);
ratingRoutes.get("/byProductId/:productId", getRatingByProductId);

ratingRoutes.put(
  "/:ratingId",
  checkAuth([UserRole.USER]),
  validateRequest(updateRatingSchemaReq),
  updateRating
);

export default ratingRoutes;
