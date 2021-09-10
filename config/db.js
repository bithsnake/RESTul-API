const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "kimmo",
    password: "kimmo123",
    database: "db",
    port: 3306
});

module.exports = pool.promise();