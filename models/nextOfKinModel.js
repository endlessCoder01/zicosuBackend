const db = require('../config/db');

const createNok = async ({ reg_number, fullname, phone, address, email}) => {
  const [result] = await db.query(
    'INSERT INTO next_of_kins (`reg_number`, `fullname`, `phone`, `address`, `email`) VALUES (?, ?, ?, ?, ?)',
    [reg_number, fullname, phone, address, email]
  );
  return { id: result.insertId };
};

const updateNok = async (userId, updates) => {
  const fields = [];
  const values = [];

  if (updates.email) {
    fields.push("email = ?");
    values.push(updates.email);
  }

  if (updates.fullname) {
    fields.push("fullname = ?");
    values.push(updates.fullname);
  }

  if (updates.address) {
    fields.push("address = ?");
    values.push(updates.address);
  }

  if (updates.phone) {
    fields.push("phone = ?");
    values.push(updates.phone);
  }
  
  if (fields.length === 0) {
    return null;
  }

  values.push(userId);

  const [result] = await db.query(
    `UPDATE next_of_kins SET ${fields.join(", ")} WHERE reg_number = ?`,
    values
  );

  return result.affectedRows > 0;
};


const getNokByReg = async (id) => {
  const [rows] = await db.query('SELECT * FROM next_of_kins WHERE reg_number = ?', [id]);
  return rows;
};

const getNokById = async (id) => {
  const [rows] = await db.query('SELECT * FROM next_of_kins WHERE  nok_id = ?', [id]);
  return rows[0];
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
  updateNok
};
