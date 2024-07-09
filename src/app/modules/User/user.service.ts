import { TUser } from "./user.interface";
import { User } from "./user.model";

// Sign Up a User Into DB
const signUpUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  // console.log({ result });

  return result;
};

export const UsersServices = {
  signUpUserIntoDB,
};
