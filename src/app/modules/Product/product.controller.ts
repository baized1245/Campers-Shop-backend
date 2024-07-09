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

//get single Product by _id
const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.getSingleProductFromDB(id);

  if (!result) {
    return NotFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "A Product retrieved successfully!",
    data: result,
  });
});

//Update a product
const updateAProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await ProductService.updateAProductFromDB(id, updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully!",
    data: result,
  });
});

//Delete car
const deleteAProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deleteAProductFromDb(id);

  if (!result || result === null) {
    return res.status(404).json({
      success: false,
      messasge: "Product not exist!",
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product deleted successfully!",
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateAProduct,
  deleteAProduct,
};
