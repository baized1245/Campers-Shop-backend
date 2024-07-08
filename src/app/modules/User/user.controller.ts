import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UsersServices } from "./user.service";

const signUpUser = catchAsync(async (req, res) => {
  const result = await UsersServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully!",
    result,
  });
});

const signInUser = catchAsync(async (req, res) => {
  const result = await UsersServices.signInUserService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is logged in successfully!",
    result: result.user,
    token: result.token,
  });
});

export const UserControllers = {
  signUpUser,
  signInUser,
};
