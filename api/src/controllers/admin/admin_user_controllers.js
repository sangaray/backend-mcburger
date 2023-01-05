const { User } = require("../../db");

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const disableActivateUser = async (id) => {
  let user = await User.findOne({ where: { id } });
  user.state = user.state === "enabled" ? "disabled" : "enabled";

  user = await User.update(user.dataValues, { where: { id } });
  return user;
};

const deleteUser = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

const createUser = async (data) => {
  const user = await User.create(data);
  return user;
};

module.exports = { getAllUsers, disableActivateUser, deleteUser, createUser };
