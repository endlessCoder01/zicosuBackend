const db = require('../config/db');

const createUser = async ({ name, email, password_hash, phone_number, home_address, role, profile_picture }) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password_hash, phone_number, home_address, role, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, password_hash, phone_number, home_address, role, profile_picture]
  );
  return { id: result.insertId, name, email };
};


const updateUser = async (userId, updates) => {
  const fields = [];
  const values = [];

  if (updates.email) {
    fields.push("email = ?");
    values.push(updates.email);
  }
  if (updates.password_hash) {
    fields.push("password_hash = ?");
    values.push(updates.password_hash);
  }
  if (updates.phone_number) {
    fields.push("phone_number = ?");
    values.push(updates.phone_number);
  }
  if (updates.home_address) {
    fields.push("home_address = ?");
    values.push(updates.home_address);
  }

  if (updates.profile_picture) {
    fields.push("profile_picture = ?");
    values.push(updates.profile_picture);
  }

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }


  
  if (fields.length === 0) {
    return null;
  }

  values.push(userId);

  const [result] = await db.query(
    `UPDATE users SET ${fields.join(", ")} WHERE user_id = ?`,
    values
  );

  return result.affectedRows > 0;
};

const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
  return rows[0];
};

const getUserByStatus = async (status) => {
  const [rows] = await db.query('SELECT * FROM users WHERE status = ?', [status]);
  return rows;
};

const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

const saveRefreshToken = async (userId, token) => {
  const [rows] = await db.query('UPDATE users SET refresh_token = ? WHERE user_id = ?', [token, userId]);
};


module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  saveRefreshToken,
  updateUser,
  getUserByStatus,
};
