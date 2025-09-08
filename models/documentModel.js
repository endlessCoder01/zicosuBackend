const db = require("../config/db");

const createDocument= async ({user_id, title, description, file_url}) => {
  const [result] = await db.query(
    'INSERT INTO documents (`user_id`, `title`, `description`, `file_url`) VALUES (?, ?, ?, ?)',
    [user_id, title, description, file_url]
  );
  return { id: result.insertId, title, description};
};

// const getUserByEmail = async (email) => {
//   const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//   return rows[0];
// };

const getDocCountById = async (id) => {
  const [rows] = await db.query(
    "SELECT COUNT(*) FROM documents WHERE user_id = ?",
    [id]
  );
  return rows[0];
};

const getAllDocuments = async () => {
  const [rows] = await db.query("SELECT * FROM documents");
  return rows;
};

module.exports = {
  createDocument,
  getAllDocuments,
  getDocCountById,
  // getUserById,
};
