import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController";
import {
  addOrderReqSchema,
  getOrderReqSchema,
  updateOrderStatusReqSchema,
} from "../validation/orderSchema";
import { checkAuth } from "../middleware/middleware";
import validateRequest from "../middleware/validationMiddleware";
import { UserRole } from "../models/User";
const orderRoutes = express.Router();

orderRoutes.post(
  "/add",
  checkAuth(),
  validateRequest(addOrderReqSchema),
  createOrder
);

orderRoutes.get("/all", checkAuth(), getAllOrders);

orderRoutes.get(
  "/:orderId",
  checkAuth(),
  validateRequest(getOrderReqSchema),
  getOrderById
);

orderRoutes.patch(
  "/status/:orderId",
  checkAuth([UserRole.ADMIN]),
  validateRequest(updateOrderStatusReqSchema),
  updateOrderStatus
);

export default orderRoutes;
