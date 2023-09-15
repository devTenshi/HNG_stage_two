"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = exports.response = void 0;
const error_1 = __importDefault(require("./error"));
const response = (status, title, message, code, data, meta) => {
    return {
        status,
        title,
        message,
        code,
        data,
        meta,
    };
};
exports.response = response;
const success = (data, title, message, code, meta) => {
    return (0, exports.response)("success", title, message, code, data, meta);
};
exports.success = success;
const error = (title, message, code = 400) => {
    const res = (0, exports.response)("error", title, message, code, null);
    throw new error_1.default(code, message, res);
};
exports.error = error;
