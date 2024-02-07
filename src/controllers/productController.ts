import { Types } from "mongoose";
import { ProductModel } from "../models/Product";
import { Request, Response } from "express";

export async function createProduct(req: Request, res: Response) {
  try {
    const product = await ProductModel.create({
      ...req.body,
      categoryId: new Types.ObjectId(req.body.categoryId),
    });
    return res.status(201).json({
      success: true,
      product: product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getProduct(req: Request, res: Response) {
  try {
    const product = await ProductModel.findById(req.params.productId);
    return res.status(200).json({
      success: true,
      product: product,
      message: "Get product successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const skip = (parseInt(req.query.page as string) - 1) * limit;
    const products = await ProductModel.find({}).limit(limit).skip(skip);
    const totalProductCount = await ProductModel.countDocuments();
    return res.status(200).json({
      success: true,
      products: products,
      totalProductCount: totalProductCount,
      message: "Get all products successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const product = await ProductModel.findOneAndUpdate(
      { _id: req.params.productId },
      req.body,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      product: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function searchProduct(req: Request, res: Response) {
  try {
    let filter = {};
    if (req.body.categoryId.length > 0) {
      filter = { categoryId: { $in: req.body.categoryId } };
    }
    if (req.body.priceRange) {
      const [min, max] = req.body.priceRange;
      filter = { ...filter, price: { $gte: min, $lte: max } };
    }
    const products = await ProductModel.find(filter);
    return res.status(200).json({
      success: true,
      products: products,
      message: "Search product successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    await ProductModel.findByIdAndDelete(req.params.productId);
    return res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}
