const db = require('../config/db');

const createSentiment = async ({name, surname, gender, dob, phone, campus, residential_location, email, reg_number, password_harsh}) => {
  const [result] = await db.query(
    'INSERT INTO sentiments (`reg_number`, `sentiment`, `upload_url`) VALUES (?, ?, ?)',
    [name, surname, gender, dob, phone, campus, residential_location, email, reg_number, password_harsh
]
  );
  return { id: result.insertId, name, email };
};

// const updateUser = async (userId, updates) => {
//   const fields = [];
//   const values = [];

//   if (updates.email) {
//     fields.push("email = ?");
//     values.push(updates.email);
//   }
//   if (updates.password_hash) {
//     fields.push("password_hash = ?");
//     values.push(updates.password_hash);
//   }
//   if (updates.phone_number) {
//     fields.push("phone_number = ?");
//     values.push(updates.phone_number);
//   }
//   if (updates.home_address) {
//     fields.push("home_address = ?");
//     values.push(updates.home_address);
//   }

//   if (updates.profile_picture) {
//     fields.push("profile_picture = ?");
//     values.push(updates.profile_picture);
//   }

//   if (updates.status) {
//     fields.push("status = ?");
//     values.push(updates.status);
//   }


  
//   if (fields.length === 0) {
//     return null;
//   }

//   values.push(userId);

//   const [result] = await db.query(
//     `UPDATE users SET ${fields.join(", ")} WHERE reg_number = ?`,
//     values
//   );

//   return result.affectedRows > 0;
// };


const getSentimentByReg = async (id) => {
  const [rows] = await db.query('SELECT * FROM sentiments WHERE reg_number = ?', [id]);
  return rows[0];
};

const getSentimentById = async (id) => {
  const [rows] = await db.query('SELECT * FROM sentiments WHERE sentiment_id = ?', [id]);
  return rows[0];
};

const getAllSentiments = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};


module.exports = {
 createSentiment,
  getAllSentiments,
  getSentimentById,
  getSentimentByReg,
};
