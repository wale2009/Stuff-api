import { StatusCodes } from "http-status-codes";
import pino from "pino";

const logger = pino();

import userService from "../services/user.service";

const STATUS = {
  success: true,
  failure: false,
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - city
 *         - country
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the user
 *         name:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         city:
 *           type: string
 *           description: User's city
 *         country:
 *           type: string
 *           description: User's country
 *       example:
 *         id: 1
 *         name: John Doe
 *         email: john@example.com
 *         city: New York
 *         country: USA
 *
 * /user:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users from the system
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *             example:
 *               - id: 1
 *                 name: John Doe
 *                 email: john@example.com
 *                 city: New York
 *                 country: USA
 *               - id: 2
 *                 name: Waled Alhassan
 *                 email: jan@example.com
 *                 city: New
 *                 country: Cali
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Add a new user to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *           example:
 *             name: John Doe
 *             email: john@example.com
 *             city: New York
 *             country: USA
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *
 * /user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user by ID
 *     description: Retrieve a single user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 *   put:
 *     tags:
 *       - Users
 *     summary: Update user by ID
 *     description: Update an existing user's information
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete user by ID
 *     description: Remove a user from the system
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: User not found
 */

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
const getAllUser = (req, res) => {
  const users = userService.getAllUsers();

  if (users.length) {
    logger.info("Retrieving all user");
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

  if (user) {
    // logger.info(`Retrieving user ID ${id}`);
    return res.status(StatusCodes.OK).send(user);
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

  if (updatedUser) {
    logger.info(`Updating user ID ${id}`);
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

  if (user) {
    logger.info(`Deleting user ID ${id}`);
    userService.removeUser(id);

    return res.status(StatusCodes.OK).send({
      status: STATUS.success,
      message: `User ${id} has been deleted`,
    });
  } else {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: STATUS.failure,
      message: `User ${id} not found`,
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
