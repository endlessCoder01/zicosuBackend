const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

const registerUser = async ({name, surname, username, gender, dob, phone, campus, residential_location, email, reg_number, password}) => {
  const existing = await userModel.getUserByEmail(email);
  if (existing) throw new Error("Email already in use");

  const existingReg = await userModel.getUserById(reg_number);
  if (existingReg) throw new Error("Student Number already in use");

  const password_hash = await bcrypt.hash(password, 10);
  return await userModel.createUser({ name, surname, username, gender, dob, phone, campus, residential_location, email, reg_number, password_hash });
};

const loginUser = async ({ email, password }) => {
  const user = await userModel.getUserByEmail(email);
  // console.log("user", user);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error("Invalid credentials");

  await userModel.updateUser(user.reg_number, {"last_logged_at": new Date() })
  const userDetails = {user};
  const token = generateAccessToken(userDetails);
  const refreshToken = generateRefreshToken(userDetails)
  await userModel.saveRefreshToken(user.reg_number, refreshToken);

  return {token, refreshToken, userDetails};
};

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('No refresh token');

  const userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const user = await userModel.getUserById(userData.userId);

  if (user.refresh_token !== refreshToken) throw new Error('Invalid refresh token');

  const newAccessToken = generateAccessToken(user);
  return newAccessToken;
};


function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function generateRefreshToken (user) {
  return jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = { registerUser, loginUser, refreshAccessToken };
