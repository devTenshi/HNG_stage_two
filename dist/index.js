"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./database"));
const cors_1 = __importDefault(require("cors"));
const ratelimiter_1 = __importDefault(require("./middleware/ratelimiter"));
const person_routes_1 = __importDefault(require("./routes/person.routes"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json({ extended: false }));
app.use((0, ratelimiter_1.default)());
app.use(middleware_1.logger);
//connect to db
(0, database_1.default)(() => console.log("check anything"));
//these are our routes
app.use("/api", person_routes_1.default);
app.get("/", (_req, res) => {
    res.send("Hello from express + ts");
});
app.use(middleware_1.errorResponder);
app.use(middleware_1.invalidPathHandler);
const server = new http_1.default.Server(app);
server.listen(port);
exports.default = server;
