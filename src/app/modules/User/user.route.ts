import express from "express";
import { UserControllers } from "./user.controller";
// import validateRequest from '../../middlewares/validateRequest';
// import { SignupUserValidation } from './user.validation';

const router = express.Router();

router.post("/user", UserControllers.signUpUser);

export const UserRoutes = router;
