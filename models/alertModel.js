const db = require("../config/db");

const createAlert = async ({
  farm_id,
  message,
  type,
  severity,
  initiated_by,
  alert_status,
}) => {
  const [result] = await db.query(
    "INSERT INTO alerts (`farm_id`, `message`, `type`, `severity`, `initiated_by`, `alert_status`) VALUES (?, ?, ?, ?, ?, ?)",
    [farm_id, message, type, severity, initiated_by, alert_status]
  );

  return {
    id: result.insertId,
    farm_id,
    message,
    type,
    severity,
    initiated_by,
    alert_status,
  };
};

// const getUserByEmail = async (email) => {
//   const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
//   return rows[0];
// };

const getAllAlertsByJoinId = async (id) => {
  const [rows] = await db.query(
    `SELECT 
      a.alert_id,
      a.message,
      a.type,
      a.severity,
      a.alert_status
      a.timestamp,
      
      f.farm_id,
      f.farm_name,
      f.location AS farm_location,
      f.size AS farm_size,
      f.soil_type,

      u.user_id AS initiator_id,
      u.name AS initiator_name,
      u.email AS initiator_email,
      u.role AS initiator_role

    FROM alerts a
    JOIN farms f ON a.farm_id = f.farm_id
    LEFT JOIN users u ON a.initiated_by = u.user_id
    WHERE u.user_id = ?`,
    [id]
  );
  return rows;
};

const getAllAlertsByJoin = async () => {
  const [rows] = await db.query(`SELECT 
  a.alert_id,
  a.message,
  a.type,
  a.severity,
  a.alert_status,
  a.timestamp,
  
  f.farm_id,
  f.farm_name,
  f.location AS farm_location,
  f.size AS farm_size,
  f.soil_type,

  u.user_id AS initiator_id,
  u.name AS initiator_name,
  u.email AS initiator_email,
  u.role AS initiator_role

FROM alerts a
JOIN farms f ON a.farm_id = f.farm_id
LEFT JOIN users u ON a.initiated_by = u.user_id;
`);
  return rows;
};

const getAllAlerts = async () => {
  const [rows] = await db.query("SELECT * FROM alerts");
  return rows;
};

const deleteAlertById = async (id) => {
  const [rows] = await db.query("DELETE FROM alerts WHERE alert_id = ?", [id]);
  return rows;
};

module.exports = {
  createAlert,
  getAllAlerts,
  getAllAlertsByJoin,
  getAllAlertsByJoinId,
  deleteAlertById,
};
