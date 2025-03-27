import express from "express";
import { expressYupMiddleware } from "express-yup-middleware";

import userController from "./controllers/user.controller";
import { addUser, deleteUsers, getUsers, updateUser } from "./user.schemas";

const router = express.Router();

router.get("/all", userController.getAllUser);

router.get(
  "/:id",
  expressYupMiddleware({
    schemaValidator: getUsers,
  }),
  userController.getUsers
);

router.post(
  "/",
  expressYupMiddleware({
    schemaValidator: addUser,
  }),
  userController.addUser
);

router.put(
  "/:id",
  expressYupMiddleware({
    schemaValidator: updateUser,
  }),
  userController.updateUser
);

router.delete(
  "/:id",
  expressYupMiddleware({
    schemaValidator: deleteUsers,
  }),
  userController.deleteUser
);

export default router;
