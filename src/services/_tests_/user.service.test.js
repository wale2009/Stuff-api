import test from "ava";

import userService from "../user.service";

let sampleUser;

test.beforeEach(() => {
  sampleUser = {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    city: "New York",
    country: "USA",
  };
});
test("must add a user", (t) => {
  const expectedId = 1;
  const user = userService.addUser(sampleUser);

  t.is(user.id, expectedId);
  t.deepEqual(user, { id: expectedId, ...sampleUser });
});

test("must retrieve a user", (t) => {
  const expectedId = 1;
  const user = userService.getUser(1);

  t.is(user.id, expectedId);
  t.deepEqual(user, { id: expectedId, ...sampleUser });
});

test("must get all a user", (t) => {
  const expectedId = 1;
  const user = userService.getAllUsers();

  t.deepEqual(user[0], { id: expectedId, ...sampleUser });
});

test("must update a user", (t) => {
  const expectedId = 1;
  const updateDetails = {
    name: "Jane Doe",
    email: "janedoe@email.com",
    city: "Los Angeles",
    country: "USA",
  };
  const user = userService.updateUser(1, updateDetails);

  t.is(user.id, expectedId);
  t.deepEqual(user, { id: expectedId, ...updateDetails });
});
test("must delete a user", (t) => {
  const userId = 1;

  const expected = userService.removeUser(userId);

  t.is(expected, undefined);
  // Trying to retrieve a removed user, and expect to be "undefined"
  const user = userService.getUser(userId);
  t.is(user, undefined);
});
