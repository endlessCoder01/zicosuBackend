const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserById = async (req, res) => {
  console.log("id", req.params.id)
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getUserByStatus = async (req, res) => {
  try {
    const users = await userService.getUserByStatus(req.params.status);
    res.json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    // console.log(newUser);
    
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id
  try {
    const updateUser = await userService.updateUser(userId, req.body);
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  getUserByStatus,
};
