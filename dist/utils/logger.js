"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.prettyPrint()),
    transports: [
        new winston_1.transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug",
        }),
        new winston_1.transports.File({ filename: "debug.log", level: "debug" }),
        new winston_1.transports.File({ filename: "error.log", level: "error" }),
    ],
    exitOnError: false,
});
logger.error("error", (err) => {
    if (err instanceof Error) {
        logger.log({ level: "error", message: `${err.stack || err}` });
    }
    else {
        logger.log({ level: "error", message: err });
    }
});
if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}
exports.default = logger;
