import { Request, Response, NextFunction } from "express";
import PersonService from "../services/person.service";
import AppError from "../utils/error";
import logger from "../utils/logger";
import { success } from "../utils";
import { StatusCodes } from "http-status-codes";
import { Person } from "../schemas/person.schema";

const exportResult = {
  async createPerson(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const personExist = await PersonService.findOne({
        $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
      });
      if (personExist)
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          "PhoneNumber or email already used"
        );
      const person = await PersonService.create(req.body);
      return res
        .status(StatusCodes.OK)
        .json(
          success(
            person,
            "successfully created person",
            "A new person has been successfully saved",
            StatusCodes.OK
          )
        );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  async getPerson(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { Name } = req.query;
    try {
      if (!id && !Name)
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid id/fullname");
      const person = await PersonService.findOne({
        $or: [{ _id: id }, { Name }],
      });
      if (!person)
        throw new AppError(StatusCodes.NOT_FOUND, "Record not found");
      return res
        .status(StatusCodes.OK)
        .json(
          success(
            person,
            "successfully found person",
            "A new record has been successfully found",
            StatusCodes.OK
          )
        );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  async updatePerson(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { Name } = req.body;

    try {
      if (!id && !Name)
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid id/fullname");
      const personExist = await PersonService.findOne({
        $or: [{ _id: id }, { Name }],
      });
      if (!personExist)
        throw new AppError(StatusCodes.NOT_FOUND, "Record not found");
      const person = await PersonService.findOneAndUpdate(
        {
          $or: [
            { _id: id }, // Search by user ID
            { Name }, // Search by full name from the request body
          ],
        },
        {
          ...req.body,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );
      return res
        .status(StatusCodes.OK)
        .json(
          success(
            person,
            "Success",
            "Successfully Edited person",
            StatusCodes.OK
          )
        );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
  async deletePerson(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { Name } = req.query;
    try {
      if (!id && !Name)
        throw new AppError(StatusCodes.BAD_REQUEST, "invalid id/fullname");
      const query = { $or: [{ _id: id }, { Name }] };
      const deletedPerson = await Person.findOneAndDelete(query);
      if (!deletedPerson)
        throw new AppError(StatusCodes.NOT_FOUND, "Record not found");
      return res
        .status(StatusCodes.OK)
        .json(
          success(
            true,
            "successfully deleted person",
            "A new record has been successfully deleted",
            StatusCodes.OK
          )
        );
    } catch (error) {
      logger.error(error);
      next(error);
    }
  },
};
export default exportResult;
