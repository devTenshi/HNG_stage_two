"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePersonDto = exports.fullNameDto = exports.CreatePersonDto = void 0;
const zod_1 = require("zod");
exports.CreatePersonDto = zod_1.z.object({
    body: zod_1.z.object({
        Name: zod_1.z
            .string()
            .min(3, { message: "Name must have at least three characters " })
            .max(20, {
            message: "Name must not be greater than 20 characters",
        }),
        email: zod_1.z
            .string()
            .email("This is not a valid email.")
            .trim()
            .min(8, { message: "Email length must be at least 8." }),
        phoneNumber: zod_1.z
            .string()
            .min(10, { message: "phonenumber must be at least 10." }),
        // hobbies: z.array(z.string()).min(0),
        age: zod_1.z.number().int().min(0).max(100),
    }),
});
exports.fullNameDto = zod_1.z.object({
    query: zod_1.z.object({
        Name: zod_1.z
            .string()
            .min(3, { message: "Full name must have at least three characters " })
            .max(20, {
            message: "Full name must not be greater than 20 characters",
        })
            .optional(), // Make Name optional
    }),
});
exports.UpdatePersonDto = zod_1.z.object({
    body: zod_1.z.object({
        Name: zod_1.z
            .string()
            .min(3, { message: "Name must have at least three characters " })
            .max(20, {
            message: "Name must not be greater than 20 characters",
        })
            .optional(),
        email: zod_1.z
            .string()
            .email("This is not a valid email.")
            .trim()
            .min(8, { message: "Email length must be at least 8." })
            .optional(),
        phoneNumber: zod_1.z
            .string()
            .min(10, { message: "phonenumber must be at least 10." })
            .optional(),
        age: zod_1.z.number().int().min(0).max(100).optional(),
    }),
});
