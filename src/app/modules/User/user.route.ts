import express from "express";
import { UserControllers } from "./user.controller";
// import validateRequest from '../../middlewares/validateRequest';
// import { SignupUserValidation } from './user.validation';

const router = express.Router();

router.post(
  "/auth/signup",
  //   validateRequest(SignupUserValidation.signupUserValidationSchema),
  UserControllers.signUpUser,
);

router.post(
  "/auth/signin",
  //   validateRequest(SignupUserValidation.sigInUserValidationSchema),
  UserControllers.signInUser,
);

export const UserRoutes = router;
