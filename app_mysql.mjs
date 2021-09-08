import express from 'express';
import path from 'path';
import { request } from 'http';
import { env } from 'process';
import mssql from 'mssql';
import mysql from 'mysql';

const app = express();
const _path = path;
const router = express.Router();
app.use(express.json());

const __dirname = "./"
var sql = mssql;

// koppling till databasen
var con = mysql.createConnection({
    host: "localhost",
    user: "kimmo",
    password: "kimmo123",
    database: "db"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

let query = "SELECT * FROM Person";

const GETPersons = () => {
    con.query("SELECT * FROM Person", function (err, result, fields) {
        if (err) throw err;
        
        result.forEach(row => {
            let ret = "Name: " + row.UserName + " | MailAdress : " + row.EmailAdress;
            ret;
        });
    });
}


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});


app.get(`/persons`, (req, res) => {
    
    res.status(200).send(
         con.query("SELECT id, UserName, EmailAdress FROM Person", (err, result) => {
            // if (err) throw err;
            console.log(result);
            res.json(result);
        })
    );
    if (res.status(404)) {
        res.send(`<p>Error..</p>`);
    }
});

//skicka något i /test
app.post('/test', (req, res) => {
    if (!req.body.UserName) {
        return res.status(400).json({
            status: "error",
            error: "req body cannot be empty",
        });
    }
   
     res.status(200).json({
        status: "Success",
        data: req.body,
    })
});

// PORT
const port = env.PORT || 3001;

app.use('/', router);
app.listen(port, () => console.log(`listening on port ${port}`));
