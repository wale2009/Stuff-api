import userDao from "../models/user.doa";

/**
 * Get a user from its ID
 *
 * @param {integer} userId
 * @returns {T}
 */
const getUser = (userId) => userDao.get(userId);

/**
 * Get all users
 *
 * @returns {T[]}
 */
const getAllUsers = () => userDao.getAll();

/**
 * Update a user from its ID
 *
 * @param {integer} userId
 * @param {*} details
 * @returns {boolean|*}
 */
const updateUser = (userId, details) => {
  return userDao.update(userId, details);
};

/**
 * Add a user
 * 
 * @param {object} details 
 * @returns 
 */
const addUser = (details) => {
  return userDao.insert(details);
};

/**
 * Remove a user
 * 
 * @param {integer} userId 
 * @returns 
 */
const removeUser = (userId) => {
  return userDao.remove(userId);
};

export default {
  getUser,
  getAllUsers,
  updateUser,
  addUser,
  removeUser,
};
