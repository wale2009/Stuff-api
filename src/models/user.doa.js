import users from "./data/user.data.js";

// ! const get = (UserId) => {
//  ! const findUser = users.find((user) => user.id === UserId);
// !  return findUser;
// };
/**
 * get a user from its ID
 *
 * @param {*} userId
 * @returns
 */
const get = (UserId) => users.find((user) => user.id === UserId);

/**
 * get a users
 *
 * @param {*}
 * @returns
 */
const getAll = () => users;
// const getAll = () => {
//   return users;
// };

/**
 * update a user from its ID
 *
 * @param {integer} userId
 * @param {object} newDetails
 * @returns {boolean|*}
 */
const update = (userId, newDetails) => {
  let existingUser = null;
  let userIndex;

  users.map((user, index) => {
    if (user.id === userId) {
      existingUser = user;
      userIndex = index;
    }
  });

  if (!existingUser) {
    return false;
  }

  const updatedUser = {
    ...existingUser,
    ...newDetails,
  };

  users.splice(userIndex, 1, updatedUser); // replace the existing user with the new details

  return updatedUser;
};

// ! This function inserts a new user into the `users` array.
// ! It takes `details` (an object containing user information) as input,
// ! creates a new user object `newUser` by adding a unique `id` (based on the length of the `users` array),
// ! and pushes this `newUser` object into the `users` array.
// ! Finally, it returns `newUser` to indicate that the operation was successful.
/**
 * Insert a user
 *
 * @param {object} details
 * @returns {*&{id: number}}
 */
const insert = (details) => {
  const newUser = { id: users.length + 1, ...details };
  users.push(newUser);

  return newUser;
};

/**
 * Remove a user from its ID
 *
 * @param {integer} userId
 * @returns {*}
 */
const remove = (userId) => {
  const deleteUser = (user, index) => {
    // ? optional chaining for null check
    if (user?.id === userId) {
      users.splice(index, 1);
    }
  };
  return users.find(deleteUser);
};

// const remove = (userId) => {
//   const index = users.findIndex(user => user.id === userId);
//   if (index !== -1) {
//     return users.splice(index, 1)[0]; // Returns the removed user
//   }
//   return null; // Return null if user not found
// };

export default {
  get,
  getAll,
  update,
  insert,
  remove,
};
