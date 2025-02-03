import users from "./data/user.data.js";

// const get = (UserId) => {
//   const findUser = users.find((user) => user.id === UserId);
//   return findUser;
// };
const get = (UserId) => users.find((user) => user.id === UserId);

const getAll = () => users;
// const getAll = () => {
//   return users;
// };

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

// This function inserts a new user into the `users` array.
// It takes `details` (an object containing user information) as input,
// creates a new user object `newUser` by adding a unique `id` (based on the length of the `users` array),
// and pushes this `newUser` object into the `users` array.
// Finally, it returns `true` to indicate that the operation was successful.
const insert = (details) => {
  const newUser = { id: users.length + 1, ...details };
  users.push(newUser);

  return newUser;
};

const remove = (userId) => {
  const deleteUser = (user, index) => {
    if (user.id === userId) {
      user.splice(index, 1);
    }
  };
  return users.find(deleteUser);
};

export default {
  get,
  getAll,
  update,
  insert,
  remove,
};
