import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./product.service";

//Create a product
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Product created successfully!",
    data: result,
  });
});
export const ProductControllers = {
  createProduct,
  // getAllCars,
  // getSingleCar,
  // updateACar,
  // deleteACar,
  // returnACar,
};
