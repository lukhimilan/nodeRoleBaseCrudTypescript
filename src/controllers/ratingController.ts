import { Request, Response } from "express";
import { OrderModel } from "../models/Order";
import { RatingModel } from "../models/Rating";

export async function addRating(req: Request, res: Response) {
  try {
    // @ts-ignore
    const user = req.user;

    const order = await OrderModel.findOne({
      userId: user.userId,
      "products.productId": req.body!.productId,
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found with the given product id",
      });
    }

    const ratingObj = {
      userId: user.userId,
      productId: req.body.productId,
      rating: req.body.rating,
      review: req.body.review,
    };

    const rating = await RatingModel.create(ratingObj);
    return res.status(201).json({
      success: true,
      rating: rating,
      message: "Rating added successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function updateRating(req: Request, res: Response) {
  try {
    //@ts-ignore
    const user = req.user;
    const updatedRating = await RatingModel.findOneAndUpdate(
      {
        _id: req.params.ratingId,
        userId: user.userId,
      },
      {
        $set: {
          rating: req.body.rating,
          review: req.body.review,
        },
      }
    );
    return res.status(200).json({
      success: true,
      rating: updatedRating,
      message: "Rating updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getRating(req: Request, res: Response) {
  try {
    const rating = await RatingModel.findOne({
      _id: req.params.ratingId,
    });
    return res.status(200).json({
      success: true,
      rating: rating,
      message: "Rating fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}

export async function getRatingByProductId(req: Request, res: Response) {
  try {
    const rating = await RatingModel.aggregate([
      {
        $lookup: {
          from: "users",
          let: { userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$userId"] },
              },
            },
            { $project: { _id: 0, userName: 1 } },
          ],
          as: "user",
        },
      },
      { $unwind: { path: "$user" } },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 },
          ratingsArray: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          rating: "$_id",
          count: 1,
          ratingsArray: 1,
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      rating: rating,
      message: "Rating fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: (error as Error).message });
  }
}
