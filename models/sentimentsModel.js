const db = require("../config/db");

const createSentiment = async ({ reg_number, sentiment, upload_url }) => {
  const [result] = await db.query(
    "INSERT INTO sentiments (`reg_number`, `sentiment`, `upload_url`) VALUES (?, ?, ?)",
    [reg_number, sentiment, upload_url]
  );
  return { id: result.insertId };
};

const updateSentiment = async (id, updates) => {
  const fields = [];
  const values = [];

  if (updates.sentiment) {
    fields.push("sentiment = ?");
    values.push(updates.sentiment);
  }

  if (updates.status) {
    fields.push("status = ?");
    values.push(updates.status);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);
  console.log("sentField", fields)
  console.log("sentValue", values)


  const [result] = await db.query(
    `UPDATE sentiments SET ${fields.join(", ")} WHERE sentiment_id = ?`,
    values
  );

  return result.affectedRows > 0;
};

const getSentimentByReg = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM sentiments WHERE reg_number = ?",
    [id]
  );
  return rows;
};

const getSentimentById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM sentiments WHERE sentiment_id = ?",
    [id]
  );
  return rows[0];
};

const getAllSentiments = async () => {
  const [rows] = await db.query("SELECT * FROM sentiments");
  return rows;
};

const deleteAll = async () => {
  const [rows] = await db.query("TRUNCATE TABLE users");
  return rows;
};

const getAllSentimentsWithUsers = async () => {
const [rows] = await db.query(`
  SELECT 
    s.sentiment_id,
    s.reg_number,
    s.sentiment,
    s.upload_url AS sentiment_upload_url,
    s.date_created,
    u.name,
    u.surname,
    u.username,
    u.gender,
    u.dob,
    u.phone,
    u.campus,
    u.residential_location,
    u.email,
    up.file_url AS profile_url
  FROM sentiments s
  JOIN users u 
    ON s.reg_number = u.reg_number
  LEFT JOIN (
    SELECT reg_number, file_url
    FROM uploads
    WHERE title = 'profile'
    GROUP BY reg_number
    ORDER BY MAX(upload_id) DESC
  ) up
    ON u.reg_number = up.reg_number
  ORDER BY s.sentiment_id DESC
`);

  console.log("honaiii", rows)
  return rows;

};


module.exports = {
  createSentiment,
  getAllSentiments,
  getSentimentById,
  getSentimentByReg,
  updateSentiment,
  getAllSentimentsWithUsers,
  deleteAll
};
