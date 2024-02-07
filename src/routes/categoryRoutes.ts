import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController";
import { checkAuth } from "../middleware/middleware";
import { UserRole } from "../models/User";
import validateRequest from "../middleware/validationMiddleware";
import {
  addCategoryReq,
  deleteCategoryReqSchema,
  getCategoryReqSchema,
  updateCategoryReqSchema,
} from "../validation/categorySchema";
const categoryRoutes = express.Router();

categoryRoutes.post(
  "/add",
  checkAuth([UserRole.ADMIN]),
  validateRequest(addCategoryReq),
  createCategory
);

categoryRoutes.get("/all", getAllCategories);

categoryRoutes.get(
  "/:categoryId",
  validateRequest(getCategoryReqSchema),
  getCategory
);

categoryRoutes.put(
  "/:categoryId",
  checkAuth([UserRole.ADMIN]),
  validateRequest(updateCategoryReqSchema),
  updateCategory
);

categoryRoutes.delete(
  "/:categoryId",
  checkAuth([UserRole.ADMIN]),
  validateRequest(deleteCategoryReqSchema),
  deleteCategory
);

export default categoryRoutes;
