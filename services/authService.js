const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

const registerUser = async ({ name, email, password, phone_number, home_address, role, profile_picture }) => {
  const existing = await userModel.getUserByEmail(email);
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  return await userModel.createUser({ name, email, password_hash: hashedPassword, phone_number, role, profile_picture });
};

const loginUser = async ({ email, password }) => {
  const user = await userModel.getUserByEmail(email);
  // console.log("user", user);
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw new Error("Invalid credentials");

  const userDetails = { userId: user.user_id, email: user.email, role: user.role };
  const token = generateAccessToken(userDetails);
  const refreshToken = generateRefreshToken(userDetails)
  await userModel.saveRefreshToken(user.user_id, refreshToken);

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
    { expiresIn: '7d' }
  );
};

module.exports = { registerUser, loginUser, refreshAccessToken };
