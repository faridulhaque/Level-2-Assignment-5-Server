import { Router } from "express";
import {
  createSalesController,
  getSalesController,
} from "../sales/sales.controller";

export const salesRoutes = Router();

salesRoutes.post("/create", createSalesController);
salesRoutes.get("/:param", getSalesController);
