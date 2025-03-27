import { StatusCodes } from "http-status-codes";
import pino from 'pino';

const logger = pino();

import userService from "../services/user.service";

const STATUS = {
  success: "OK",
  failure: "OK",
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const getAllUser = (req, res) => {
  const users = userService.getAllUsers();

  logger.info("Retrieving all user");

  if (users.length) {
    return res.status(StatusCodes.OK).send(users);
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: "No users found",
  });
};

/**
 * Retrieve a User
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUsers = (req, res) => {
  const id = parseInt(req.params.id, 10);

  const user = userService.getUser(id);

  logger.info(`Retrieving user ${id}`);

  if (user) {
    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      user,
    });
  }
  return res.status(StatusCodes.NOT_FOUND).send({
    status: STATUS.failure,
    message: `User ${id} not found`,
  });
};

/**
 * Add a User
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addUser = (req, res) => {
  const { body: user } = req;

  const addedUser = userService.addUser(user);

  logger.info("Creating a user");

  return res.status(StatusCodes.CREATED).send({
    status: STATUS.success,
    user: addedUser,
  });
};

/**
 * Update a User
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const updateUser = (req, res) => {
  // use body wen u need to ad something like get or post
  const { body: user } = req;

  const id = parseInt(req.params.id, 10);

  const updatedUser = userService.updateUser(id, user);

  logger.info(`Updating user ${id}`);

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
};

/**
 * Delete a User
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteUser = (req, res) => {
  const { params } = req;

  const id = parseInt(params.id);
  const user = userService.getUser(id);

  logger.info(`Deleting user ${id}`);

  if (user) {
    userService.removeUser(id);

    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      message: `User ${id} has been deleted`,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} hasn't not found`,
    });
  }
};

export default {
  getAllUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
