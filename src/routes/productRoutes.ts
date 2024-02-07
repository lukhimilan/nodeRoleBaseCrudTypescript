import express from "express";
import {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { checkAuth } from "../middleware/middleware";
import { UserRole } from "../models/User";
import validateRequest from "../middleware/validationMiddleware";
import {
  addProductReqSchema,
  deleteProductReqSchema,
  getProductReqSchema,
} from "../validation/productSchema";
const productRoutes = express.Router();

productRoutes.post(
  "/add",
  checkAuth([UserRole.ADMIN]),
  validateRequest(addProductReqSchema),
  createProduct
);

productRoutes.get("/all", getAllProducts);
productRoutes.get("/:productId", getProduct);

productRoutes.put(
  "/:productId",
  checkAuth([UserRole.ADMIN]),
  validateRequest(getProductReqSchema),
  updateProduct
);

productRoutes.delete(
  "/:productId",
  checkAuth([UserRole.ADMIN]),
  validateRequest(deleteProductReqSchema),
  deleteProduct
);

export default productRoutes;
