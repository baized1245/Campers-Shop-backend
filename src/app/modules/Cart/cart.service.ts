import { Order } from "../Order/order.model";
import { Product } from "../Product/product.model";
import { TCartItem } from "./cart.interface";
import Cart from "./cart.model";

// Add product to cart
const addToCart = async (productId: string, quantity: number) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne();
  if (!cart) {
    // Create a new cart if it doesn't exist
    cart = new Cart({
      items: [{ product: productId, quantity }],
      totalPrice: product.price * quantity,
    });
  } else {
    // Check if product already exists in cart
    const cartItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (cartItem) {
      // Update quantity of existing product in cart
      cartItem.quantity += quantity;
      if (cartItem.quantity > product.stock) {
        cartItem.quantity = product.stock; // Ensure quantity doesn't exceed stock
      }
    } else {
      // Add new product to cart
      cart.items.push({ product: productId, quantity });
    }

    // Calculate total price after adding/updating item in cart
    cart.totalPrice = await calculateTotalPrice(cart.items);
  }

  await cart.save();
  return cart;
};

// Calculate total price of cart items
const calculateTotalPrice = async (items: TCartItem[]) => {
  let totalPrice = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      totalPrice += product.price * item.quantity;
    }
  }
  return totalPrice;
};

// Get cart
const getCart = async () => {
  const cart = await Cart.findOne().populate("items.product");
  if (!cart) {
    throw new Error("Cart not found");
  }
  return cart;
};

// Place an order
const placeOrder = async () => {
  const cart = await Cart.findOne().populate("items.product");
  if (!cart) {
    throw new Error("Cart is empty");
  }

  // Deduct stock from products
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    if (product) {
      product.stock -= item.quantity;
      await product.save();
    }
  }

  // Save order to database
  const newOrder = new Order({
    items: cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    })),
    totalPrice: cart.totalPrice,
  });
  await newOrder.save();

  // Clear the cart after placing order
  await Cart.findByIdAndDelete(cart._id);

  return {
    message: "Order placed successfully",
    orderItems: newOrder.items,
    totalPrice: newOrder.totalPrice,
  };
};

// // Place an order and clear the cart
// const placeOrder = async (cartId: string) => {
//     const cart = await Cart.findById(cartId);
//     if (!cart) throw new Error('Cart not found');

//     // Populate product details
//     const cartWithPopulatedProducts = await cart.populate('items.product').execPopulate();

//     // Check stock and calculate total price
//     let totalPrice = 0;
//     for (const item of cartWithPopulatedProducts.items) {
//         const product = item.product as any;
//         if (item.quantity > product.stock) {
//             throw new Error(`Not enough stock for product ${product.name}`);
//         }
//         totalPrice += product.price * item.quantity;
//     }

//     // Create the order
//     const newOrder = new Order({
//         items: cart.items,
//         totalPrice,
//         createdAt: new Date()
//     });
//     await newOrder.save();

//     // Decrease product stock
//     for (const item of cartWithPopulatedProducts.items) {
//         const product = item.product as any;
//         product.stock -= item.quantity;
//         await product.save();
//     }

//     // Clear the cart
//     cart.items = [];
//     cart.totalPrice = 0;
//     await cart.save();

//     return newOrder;
// };

// Delete an order
const deleteOrder = async (orderId: string) => {
  const result = await Order.findByIdAndDelete(orderId);
  return result;
};

// Remove product from cart
const removeFromCart = async (productId: string) => {
  const cart = await Cart.findOne();
  if (!cart) {
    throw new Error("Cart not found");
  }

  const cartItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );
  if (cartItemIndex === -1) {
    throw new Error("Product not found in cart");
  }

  cart.items.splice(cartItemIndex, 1);

  // Recalculate total price after removing item from cart
  cart.totalPrice = await calculateTotalPrice(cart.items);

  await cart.save();
  return cart;
};

// Update quantity in cart
const updateCartQuantity = async (productId: string, quantity: number) => {
  const cart = await Cart.findOne();
  if (!cart) {
    throw new Error("Cart not found");
  }

  const cartItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );
  if (!cartItem) {
    throw new Error("Product not found in cart");
  }

  cartItem.quantity = quantity;
  if (cartItem.quantity > cartItem.product.stock) {
    cartItem.quantity = cartItem.product.stock; // Ensure quantity doesn't exceed stock
  }

  // Recalculate total price after updating quantity in cart
  cart.totalPrice = await calculateTotalPrice(cart.items);

  await cart.save();
  return cart;
};

export const CartService = {
  addToCart,
  getCart,
  placeOrder,
  removeFromCart,
  updateCartQuantity,
  deleteOrder,
};
