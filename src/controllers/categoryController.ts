import { Request, Response } from "express";
import { CategoryModel } from "../models/Category";

export async function createCategory(req: Request, res: Response) {
  try {
    const category = await CategoryModel.create(req.body);
    return res.status(201).json({
      success: true,
      category: category,
      message: "Category created successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getCategory(req: Request, res: Response) {
  try {
    const category = await CategoryModel.findById(req.params.categoryId);
    return res.status(200).json({
      success: true,
      category: category,
      message: "Get category successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await CategoryModel.find({});
    return res.status(200).json({
      success: true,
      categories: categories,
      message: "Get all categories successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      { new: true }
    );
    return res.status(200).json({
      success: true,
      category: category,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    await CategoryModel.findByIdAndDelete(req.params.categoryId);
    return res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}
