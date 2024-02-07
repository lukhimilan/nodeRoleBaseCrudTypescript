import { Request, Response } from "express";
import { IOrderProduct, OrderModel, OrderStatus } from "../models/Order";
import { UserRole } from "../models/User";

export async function createOrder(req: Request, res: Response) {
  try {
    const total = req.body.products.reduce(
      (acc: number, product: IOrderProduct) =>
        acc + product.price * product.quantity,
      0
    );
    // @ts-ignore
    const userId = req.user.userId;
    if (total !== req.body.totalPrice) {
      return res.status(400).json({ success: false, message: "Invalid total" });
    }
    const order = await OrderModel.create({
      ...req.body,
      userId: userId,
      status: "PROCESSING",
    });
    return res.status(201).json({
      success: true,
      order: order,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    // @ts-ignore
    const user = req.user;
    let filter: { _id: string; userId?: string } = {
      _id: req.params.orderId,
    };

    if (user.role === UserRole.USER) {
      filter = { ...filter, userId: user.userId };
    }

    const order = await OrderModel.findOne(filter);
    // TODO: user check middleware
    return res
      .status(200)
      .json({ success: true, order: order, message: "Get order successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getAllOrders(req: Request, res: Response) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const skip = (parseInt(req.query.page as string) - 1) * limit;

    let filter = {};
    // @ts-ignore
    const user = req.user;
    if (user.role !== "ADMIN") {
      filter = { userId: user._id };
    }

    const orders = await OrderModel.find(filter).limit(limit).skip(skip);
    return res.status(200).json({
      success: true,
      orders: orders,
      message: "get orders successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const isValid = await validateStatus(req.body.status, req.params.orderId);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status" });
    }
    const order = await OrderModel.findByIdAndUpdate(
      req.params.orderId,
      { status: req.body.status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      order: order,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

async function validateStatus(status: OrderStatus, orderId: string) {
  const order = await OrderModel.findById(orderId);
  if (!order) {
    return false;
  }
  if (status === OrderStatus.PROCESSING) {
    return false;
  }
  if (
    status === OrderStatus.SHIPPED &&
    order.status !== OrderStatus.PROCESSING
  ) {
    return false;
  }
  if (
    status === OrderStatus.DELIVERED &&
    order.status !== OrderStatus.SHIPPED
  ) {
    return false;
  }
  return true;
}
