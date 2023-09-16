"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const person_service_1 = __importDefault(require("../services/person.service"));
const error_1 = __importDefault(require("../utils/error"));
const logger_1 = __importDefault(require("../utils/logger"));
const utils_1 = require("../utils");
const http_status_codes_1 = require("http-status-codes");
const person_schema_1 = require("../schemas/person.schema");
const exportResult = {
    async createPerson(req, res, next) {
        try {
            console.log(req.body);
            const personExist = await person_service_1.default.findOne({
                $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
            });
            if (personExist)
                throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "PhoneNumber or email already used");
            const person = await person_service_1.default.create(req.body);
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, utils_1.success)(person, "successfully created person", "A new person has been successfully saved", http_status_codes_1.StatusCodes.OK));
        }
        catch (error) {
            logger_1.default.error(error);
            next(error);
        }
    },
    async getPerson(req, res, next) {
        const { id } = req.params;
        const { Name } = req.query;
        try {
            if (!id && !Name)
                throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid id/fullname");
            const person = await person_service_1.default.findOne({
                $or: [{ _id: id }, { Name }],
            });
            if (!person)
                throw new error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Record not found");
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, utils_1.success)(person, "successfully found person", "A new record has been successfully found", http_status_codes_1.StatusCodes.OK));
        }
        catch (error) {
            logger_1.default.error(error);
            next(error);
        }
    },
    async getAllPersons(req, res, next) {
        try {
            const persons = await person_service_1.default.findAll(req.body);
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, utils_1.success)(persons, "Success", "Successfully got all persons", http_status_codes_1.StatusCodes.OK));
        }
        catch (error) {
            logger_1.default.error(error);
            next(error);
        }
    },
    async updatePerson(req, res, next) {
        const { id } = req.params;
        const { Name } = req.body;
        try {
            if (!id && !Name)
                throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid id/fullname");
            const personExist = await person_service_1.default.findOne({
                $or: [{ _id: id }, { Name }],
            });
            if (!personExist)
                throw new error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Record not found");
            const person = await person_service_1.default.findOneAndUpdate({
                $or: [
                    { _id: id },
                    { Name }, // Search by full name from the request body
                ],
            }, {
                ...req.body,
                updatedAt: new Date(),
            }, {
                new: true,
            });
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, utils_1.success)(person, "Success", "Successfully Edited person", http_status_codes_1.StatusCodes.OK));
        }
        catch (error) {
            logger_1.default.error(error);
            next(error);
        }
    },
    async deletePerson(req, res, next) {
        const { id } = req.params;
        const { Name } = req.query;
        try {
            if (!id && !Name)
                throw new error_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "invalid id/fullname");
            const query = { $or: [{ _id: id }, { Name }] };
            const deletedPerson = await person_schema_1.Person.findOneAndDelete(query);
            if (!deletedPerson)
                throw new error_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Record not found");
            return res
                .status(http_status_codes_1.StatusCodes.OK)
                .json((0, utils_1.success)(true, "successfully deleted person", "A new record has been successfully deleted", http_status_codes_1.StatusCodes.OK));
        }
        catch (error) {
            logger_1.default.error(error);
            next(error);
        }
    },
};
exports.default = exportResult;
