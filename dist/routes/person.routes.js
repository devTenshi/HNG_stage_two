"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const person_controller_1 = __importDefault(require("../controllers/person.controller"));
const validators_1 = require("../validators");
const validator_1 = require("../middleware/validator");
const router = express_1.default.Router();
router.post("/", (0, validator_1.validateSchema)(validators_1.CreatePersonDto), person_controller_1.default.createPerson);
router.get("/:id", (0, validator_1.validateQuery)(validators_1.fullNameDto), person_controller_1.default.getPerson);
router.put("/:id", [(0, validator_1.validateSchema)(validators_1.UpdatePersonDto)], person_controller_1.default.updatePerson);
router.delete("/:id", (0, validator_1.validateQuery)(validators_1.fullNameDto), person_controller_1.default.deletePerson);
exports.default = router;
