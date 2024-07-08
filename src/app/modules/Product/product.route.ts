import express from "express";
import { ProductControllers } from "./product.controller";
const router = express.Router();
// Product create route
router.post("/product", ProductControllers.createProduct);

// All Product get route
router.get("/product", ProductControllers.getAllProduct);

// Single Product get route
router.get("/product/:id", ProductControllers.getSingleProduct);

// Update a Product route
router.put("/product/:id", ProductControllers.updateAProduct);

// Update a Product route
router.delete("/product/:id", ProductControllers.deleteAProduct);

export const ProductRoutes = router;
