import express from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();
// Product create route
router.post("/product", ProductControllers.createProduct);

// All Product get route
router.get("/product", ProductControllers.getAllProduct);

export const ProductRoutes = router;
