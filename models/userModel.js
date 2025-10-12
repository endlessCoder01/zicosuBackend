const db = require('../config/db');

const createUser = async ({name, surname, username, gender, dob, phone, campus, residential_location, email, reg_number, password_hash}) => {
  const [result] = await db.query(
    'INSERT INTO users (`name`, `surname`, `username`,`gender`, `dob`, `phone`, `campus`, `residential_location`, `email`, `reg_number`, `password_hash`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, surname, username, gender, dob, phone, campus, residential_location, email, reg_number, password_hash]
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

  if (updates.residential_location) {
    fields.push("residential_location = ?");
    values.push(updates.residential_location);
  }

  if (updates.last_logged_at) {
    fields.push("last_logged_at = now()");
    // values.push(updates.last_logged_at);
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
    `UPDATE users SET ${fields.join(", ")} WHERE reg_number = ?`,
    values
  );

  return result.affectedRows > 0;
};

const getUserByEmail = async (email) => {
  console.log("nwe", email)
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};


const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE reg_number = ?', [id]);
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
  const [rows] = await db.query('UPDATE users SET refresh_token = ? WHERE reg_number = ?', [token, userId]);
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
