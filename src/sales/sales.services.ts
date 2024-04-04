import { startSession } from "mongoose";
import { TSales, TSalesOQ } from "./sales.interfaces";
import SalesModel from "./sales.model";
import catchAsync from "../utils/catchAsync";
import GadgetModel from "../gadgets/gadget.model";
import AppError from "../errorHandlers/appError";

export const createSaleService = async (data: TSalesOQ) => {
  const session = await startSession();
  try {
    await session.withTransaction(async () => {
      if (data?.quantity === data?.quantityHistory) {
        await GadgetModel.findByIdAndUpdate(
          data?.productId,
          {
            isDeleted: true,
          },
          { session, new: true }
        );
      }

      await GadgetModel.findByIdAndUpdate(
        data?.productId,
        {
          quantity: data?.quantityHistory - data?.quantity,
        },
        { session, new: true }
      );

      const { quantityHistory, ...info } = data;

      await SalesModel.create([info], { session });
    });
  } catch (error) {
    await session.abortTransaction();
    throw new AppError("MONGO", error);
  } finally {
    await session.endSession();
  }

  return null;
};

export const getSalesService = async (data: string) => {
  let filter: any = {};
  const today = new Date();

  if (data === "1") {
    const timeStart = new Date().setUTCHours(0, 0, 0, 0);

    filter = {
      createdAt: {
        $gte: timeStart,
        $lt: today,
      },
    };
  } else if (data === "2") {
    const startOfWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    filter = {
      createdAt: {
        $gte: startOfWeek,
        $lt: today,
      },
    };
  } else if (data === "3") {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    filter = {
      createdAt: {
        $gte: startOfMonth,
        $lt: today,
      },
    };
  } else if (data === "4") {
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    filter = {
      createdAt: {
        $gte: startOfYear,
        $lt: today,
      },
    };
  }

  const sales = await SalesModel.find(filter).populate({
    path: "productId",
    model: "Gadget",
    select: "name",
  });

  return sales;
};
