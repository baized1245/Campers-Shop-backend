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

// Get single Product from DB
const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};

// Update a product from DB 
const updateAProductFromDB = async (id: string, updatedData: Partial<TProduct>) => {
  const options = { new: true };
  const result = await Product.findByIdAndUpdate(id, updatedData, options);

  return result;
};


// Delete a product from DB 
const deleteAProductFromDb = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

// exporting ProductService methods
export const ProductService = {
  createProductIntoDb,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateAProductFromDB,
  deleteAProductFromDb,
};
