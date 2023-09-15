"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUrl = process.env.mongoURI;
const connectDB = async (cb) => {
    try {
        //connect to db
        await mongoose_1.default.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongodb connected");
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
exports.default = connectDB;
