import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UsersServices } from "./user.service";

const signUpUser = catchAsync(async (req, res) => {
  const result = await UsersServices.signUpUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});

export const UserControllers = {
  signUpUser,
};
