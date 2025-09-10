const db = require("../config/db");

const createUpload= async ({reg_number, title, file_url}) => {
  const [result] = await db.query(
    'INSERT INTO uploads (`reg_number`, `title`, `file_url`) VALUES (?, ?, ?)',
    [reg_number, title, file_url]
  );
  return { id: result.insertId, title};
};

// const getUserByEmail = async (email) => {
//   const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//   return rows[0];
// };

const getDocCountById = async (id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) FROM uploads WHERE reg_number = ?",
    [id]
  );
  return rows[0];
};

const getDocById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM uploads WHERE upload_id = ?",
    [id]
  );
  return rows[0];
};

const getDocByReg = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM uploads WHERE reg_number = ?",
    [id]
  );
  return rows[0];
};

const getAllUploads = async () => {
  const [rows] = await db.query("SELECT * FROM uploads");
  return rows;
};

module.exports = {
  createUpload,
  getAllUploads,
  getDocCountById,
  getDocById,
  getDocByReg,
  // getUserById,
};
