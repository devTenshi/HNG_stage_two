import express, { Request } from "express";
import PersonController from "../controllers/person.controller";
import { CreatePersonDto, fullNameDto, UpdatePersonDto } from "../validators";
import { validateSchema, validateQuery } from "../middleware/validator";
const router = express.Router();
router.post(
  "/",
  validateSchema(CreatePersonDto),
  PersonController.createPerson
);
router.get("/:id", validateQuery(fullNameDto), PersonController.getPerson);
router.put(
  "/:id",
  [validateSchema(UpdatePersonDto)],
  PersonController.updatePerson
);
router.delete(
  "/:id",
  validateQuery(fullNameDto),
  PersonController.deletePerson
);

export default router;
