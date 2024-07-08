import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { NotFoundResponse } from "../../utils/noDataFoundResponse";
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

//get all product
const getAllProduct = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProductFromDB();

  if (!result || result.length === 0) {
    return NotFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product retrived successfully!",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  // getSingleCar,
  // updateACar,
  // deleteACar,
  // returnACar,
};
