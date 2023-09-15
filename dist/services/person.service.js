"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const person_schema_1 = require("../schemas/person.schema");
const moment_1 = __importDefault(require("moment"));
const error_1 = __importDefault(require("../utils/error"));
const exportResult = {
    async create(reqBody) {
        const createdUser = new person_schema_1.Person(reqBody);
        return createdUser.save();
    },
    async findAll(condition) {
        const users = await person_schema_1.Person.find(condition);
        return users;
    },
    async findOne(condition, options) {
        const user = await person_schema_1.Person.findOne(condition, options === null || options === void 0 ? void 0 : options.select);
        return user;
    },
    async findById(id, select) {
        const user = await person_schema_1.Person.findById(id, select);
        return user;
    },
    async findOneAndUpdate(condition, fields, options) {
        return person_schema_1.Person.findOneAndUpdate(condition, fields, options);
    },
    async updateOne(condition, fields) {
        const user = await person_schema_1.Person.updateOne(condition, fields);
        return user;
    },
    async softDelete(userId) {
        const user = await person_schema_1.Person.findById(userId);
        if (!user || user.deletedAt !== null)
            throw new error_1.default(404, "account not found");
        await person_schema_1.Person.findByIdAndUpdate(userId, { deletedAt: (0, moment_1.default)().toDate() }, { new: true });
        return true;
    },
    async remove(_id) {
        const user = await person_schema_1.Person.findById(_id);
        if (!user)
            throw new error_1.default(404, "account not found");
        if (user.deletedAt !== null)
            throw new error_1.default(400, "account User first");
        return person_schema_1.Person.deleteOne({ _id });
    },
};
exports.default = exportResult;
