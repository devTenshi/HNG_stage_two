"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const mongoose_1 = require("mongoose");
const PersonSchema = new mongoose_1.Schema({
    Name: { type: String, required: true, minlength: 2, trim: true },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
        required: true,
    },
    deletedAt: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Person = (0, mongoose_1.model)("Person", PersonSchema);
