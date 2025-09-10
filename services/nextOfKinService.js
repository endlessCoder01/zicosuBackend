const userModel = require('../models/userModel');

const getUsers = async () => {
  return await userModel.getAllUsers();
};

const getUser = async (id) => {
  const user = await userModel.getUserById(id);
  if (!user) throw new Error('User not found');
  return user;
};

const getUserByStatus = async (status) => {
  const users = await userModel.getUserByStatus(status);
  if (!users) throw new Error('Users not found');
  return users;
};

const createUser = async (userData) => {
  return await userModel.createUser(userData);
};
const updateUser = async (id, userData) => {
  console.log("look",id);
  console.log(userData)
  return await userModel.updateUser(id, userData);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  getUserByStatus,
};
