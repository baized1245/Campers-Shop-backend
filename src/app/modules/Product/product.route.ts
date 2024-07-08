import express from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();
// Car create route (admin only)
router.post("/create-product", ProductControllers.createProduct);
export const ProductRoutes = router;
