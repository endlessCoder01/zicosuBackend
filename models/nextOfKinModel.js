const db = require('../config/db');

const createNok = async ({ reg_number, fullname, phone, address, email}) => {
  const [result] = await db.query(
    'INSERT INTO next_of_kins (`reg_number`, `fullname`, `phone`, `address`, `email`) VALUES (?, ?, ?, ?, ?)',
    [reg_number, fullname, phone, address, email]
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


const getNokByReg = async (id) => {
  const [rows] = await db.query('SELECT * FROM next_of_kins WHERE reg_number = ?', [id]);
  return rows[0];
};

const getNokById = async (id) => {
  const [rows] = await db.query('SELECT * FROM next_of_kins WHERE  nok_id = ?', [id]);
  return rows;
};

const getAllNoks = async () => {
  const [rows] = await db.query('SELECT * FROM next_of_kins');
  return rows;
};


module.exports = {
  createNok,
  getAllNoks,
  getNokByReg,
  getNokById,
  // updateUser,
};
