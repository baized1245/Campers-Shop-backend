import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// Create a product into DB
const createProductIntoDb = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// Get all car from DB (public service)
const getAllProductFromDB = async () => {
  const result = await Product.find();

  return result;
};

// exporting ProductService methods
export const ProductService = {
  createProductIntoDb,
  getAllProductFromDB,
  // getSingleProductFromDB,
  // deleteAProductFromDb,
  // updateAProductFromDB,
};
