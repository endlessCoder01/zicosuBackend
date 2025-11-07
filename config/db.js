const mysql = require('mysql2/promise');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'zicosu_db',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const pool = mysql.createPool({
  host: 'bmbdob8hfgubror2xzkk-mysql.services.clever-cloud.com',
  user: 'uccnvffg8byf2hob',
  password: 'V0UfWHipngm3h5VYZaBN',
  database: 'bmbdob8hfgubror2xzkk',
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = pool;
