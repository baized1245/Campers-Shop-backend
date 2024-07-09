// src/controllers/cart.controller.ts
import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartService } from "./cart.service";
import httpStatus from "http-status";

// Get cart
const getCart = catchAsync(async (req: Request, res: Response) => {
  const cart = await CartService.getCart();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Cart retrieved successfully",
    data: cart,
  });
});

// Add product to cart
const addToCart = catchAsync(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const cart = await CartService.addToCart(productId, quantity);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product added to cart successfully",
    data: cart,
  });
});

// Update cart item quantity
const updateCartItem = catchAsync(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const cart = await CartService.updateCartItem(productId, quantity);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Cart item updated successfully",
    data: cart,
  });
});

// Remove product from cart
const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const cart = await CartService.removeFromCart(productId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Product removed from cart successfully",
    data: cart,
  });
});

// Place order
const placeOrder = catchAsync(async (req: Request, res: Response) => {
  await CartService.placeOrder();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Order placed successfully",
  });
});

// // Place an order
// const placeOrder = catchAsync(async (req: Request, res: Response) => {
//     const { cartId } = req.body;
//     const result = await CartService.placeOrder(cartId);

//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.OK,
//         message: 'Order placed successfully',
//         data: result
//     });
// });

// Delete an order
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CartService.deleteOrder(id);

  if (!result) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Order not found!",
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Order deleted successfully!",
    data: result,
  });
});

export const CartController = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  placeOrder,
  deleteOrder,
};
