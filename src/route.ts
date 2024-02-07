import express from "express";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import orderRoutes from "./routes/orderRoutes";
import ratingRoutes from "./routes/ratingRoutes";
const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/product", productRoutes);
routes.use("/category", categoryRoutes);
routes.use("/order", orderRoutes);
routes.use("/rating", ratingRoutes);

export default routes;
