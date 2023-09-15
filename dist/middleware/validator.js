"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateSchema = void 0;
const validateSchema = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync({
            body: req.body,
        });
        // req.body = validatedData;
        return next();
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            message: `invalid body parameter(s)`,
            data: {
                error: error.issues,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            },
        });
    }
};
exports.validateSchema = validateSchema;
const validateQuery = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync({
            query: req.query,
            // body: req.body,
            // params: req.params,
        });
        // req.query = validatedData;
        return next();
    }
    catch (error) {
        return res.status(400).json({
            status: "error",
            message: `invalid query parameter(s)`,
            data: {
                error: error.issues,
                statusCode: 400,
                timestamp: new Date().toISOString(),
            },
        });
    }
};
exports.validateQuery = validateQuery;
