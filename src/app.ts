import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/User/user.route";
import { ProductRoutes } from "./app/modules/Product/product.route";
import { OrderRoutes } from "./app/modules/Order/order.route";
import { CartRoutes } from "./app/modules/Cart/cart.route";
// import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Level 2 student, BH.Sadhin");
});
// application routes
app.use("/api", UserRoutes);
app.use("/api", ProductRoutes);
app.use("/api", OrderRoutes);
app.use("/api", CartRoutes);

// app.use(globalErrorHandler);

// Handle not found route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
  });
});

export default app;
