const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "kimmo",
    password: "kimmo123",
    database: "db",
    port: 3306
});

// TEST
// let sql = "SELECT * FROM users";

// pool.execute(sql, (err, result) => {
//     if (err) throw err;
//     console.log(result);
// });

module.exports = pool.promise();