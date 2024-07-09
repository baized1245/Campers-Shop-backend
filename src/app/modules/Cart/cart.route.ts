import express from "express";
import { CartController } from "./cart.controller";

const router = express.Router();

// Get all cart
router.get("/cart", CartController.getCart);

// Create a new Cart
router.post("/cart", CartController.addToCart);

//Add or remove cart
router.put("/cart", CartController.updateCartItem);

// Remove item from cart
router.delete("/cart/:productId", CartController.removeFromCart);

// Create a new Order
router.post("/cart/order", CartController.placeOrder);

// Delete an order
router.delete("/order/:id", CartController.deleteOrder);

export const CartRoutes = router;
