import express from "express";
import { StatusCodes } from "http-status-codes";

import userService from "./services/user.service";

const router = express.Router();

const STATUS = {
  success: "OK",
  failure: "OK",
  // OK: 200,
  // CREATED: 201,
  // BAD_REQUEST: 400,
  // NOT_FOUND: 404,
  // INTERNAL_SERVER_ERROR: 500,
};

router.get("/all", (req, res) => {
  const users = userService.getAllUsers();

  if (users.length) {
    return res.status(StatusCodes.OK).send(users);
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: "No users found",
  });
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  const user = userService.getUser(id);

  if (user) {
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      user,
    });
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: `User ${id} is not found`,
  });
});

router.post("/", (req, res) => {
  const { body: user } = req;

  const addedUser = userService.addUser(user);

  return res.status(StatusCodes.CREATED).send({
    status: STATUS.success,
    user: addedUser,
  });
});

router.put("/:id", (req, res) => {
  // use body wen u need to ad something like get or post
  const { body: user } = req;

  const id = parseInt(req.params.id, 10);

  const updatedUser = userService.updateUser(id, user);

  if (updatedUser) {
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      user: updatedUser,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} is not found`,
    });
  }
});

router.delete("/:id", (req, res) => {
  const { params } = req;

  const id = parseInt(params.id, 10);
  const status = userService.removeUser(id);

  let response;
  if (status) {
    response = {
      status: STATUS.success,
      message: `User ${id} has been deleted`,
    };
  } else {
    response = {
      status: STATUS.failure,
      message: `User ${id} is not found`,
    };
  }
  return res.status(StatusCodes.OK).send(response);
});

export default router;
