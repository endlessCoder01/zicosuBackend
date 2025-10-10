const db = require("../config/db");

const createEmail = async ({
  email,
  signedIn,
}) => {
  const [result] = await db.query(
    "INSERT INTO emails (`email`, `signed`) VALUES (?, ?)",
    [email, signedIn]
  );

  return {
    id: result.insertId,
  };
};

// const getUserByEmail = async (email) => {
//   const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//   return rows[0];
// };


const getAllEmails = async () => {
  const [rows] = await db.query("SELECT * FROM emails");
  return rows;
};

const deleteEmailById = async (id) => {
  const [rows] = await db.query("DELETE FROM emails WHERE email_id = ?", [id]);
  return rows;
};

module.exports = {
 createEmail,
 getAllEmails,
 deleteEmailById,
};
