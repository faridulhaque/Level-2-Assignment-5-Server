import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { verifyJwt } from "../middleWares/verifyJwt";
import { JoiSalesValidationSchema } from "./sales.validation";
import AppError from "../errorHandlers/appError";
import { createSaleService, getSalesService } from "./sales.services";

export const createSalesController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await verifyJwt(req.headers.authorization as string);
    const { value, error } = JoiSalesValidationSchema.validate(req?.body);

    if (error) {
      throw new AppError("JOI", error);
    }

    const result = await createSaleService(value);

    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Sales added successfully",
      data: result,
    });
  }
);

export const getSalesController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // await verifyJwt(req.headers.authorization as string);
    const result = await getSalesService(req.params.param);
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: "Sales added successfully",
      data: result,
    });
  }
);
