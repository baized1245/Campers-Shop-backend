import { TProduct } from "./product.interface";
import { Product } from "./product.model";

// Create a product into DB
const createProductIntoDb = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

// exporting ProductService methods
export const ProductService = {
  createProductIntoDb,
  // getAllProductFromDB,
  // getSingleProductFromDB,
  // deleteAProductFromDb,
  // updateAProductFromDB,
};
