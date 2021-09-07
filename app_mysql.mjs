import express from 'express';
import path from 'path';
import { request } from 'http';
import { env } from 'process';
import mssql from 'mssql';
import mysql from 'mysql';

const app = express();
const _path = path;
const router = express.Router();
const __dirname ="./"
var sql = mssql;



app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});


// koppling till databasen
var con = mysql.createConnection({
    host: "localhost",
    user: "kimmo",
    password: "kimmo123",
    database: "db"
});



// en upkoppling samt
let query = "SELECT * FROM Person";

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query(query, function (err, result,fields) {
        if (err) throw err;
        console.log("Result: " + result,fields);
      });
});
  

// PORT
const port = env.PORT || 3001;

app.use('/', router);
app.listen(port, () => console.log(`listening on port ${port}`));
