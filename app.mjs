import express from 'express';
import path from 'path';
import { request } from 'http';
import { env } from 'process';
import mssql from 'mssql';
import mysql from 'mysql';

/**Info about server
 *  SQLServerExpress connection string
    Server=localhost\SQLEXPRESS02;
    Database=master;
    Trusted_Connection=True;
    User BITH\Kimmo

 */
// http://localhost:3001/api/persons
const app = express();
const _path = path;
const router = express.Router();
const __dirname ="./"
var sql = mssql;



const doGet = (query ="",getall = true,endpoint = "") => {
    // connect to db
    sql.connect(config, (err) => {
        if (err) {
            console.table(err);
        };

        // create Request object
        var request = new sql.Request();

        // query to the database and ge the records
        query = (getall === true) ? `select * from ${endpoint}` : query;
        request.query(query, (err, recordset) => {
            if (err) {
                console.table(err);
            };
            // send records as a response
            return(recordset);
        });
    });
};
var sub = '/api/';
// Root of the website
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

const getAllPersons = (err) => {
    if (err) {
        console.table(err);
    }
    app.get(`${sub}persons`, (req, res) => {
        res.send(doGet("", true, "Person"));
    });
};

app.get(`${sub}persons`, (req, res) => {
    res.send(doGet("", true, "Person"));
});
app.get(`${sub}topics`, (req, res) => {
    res.send(doGet("", true, "Topic"));
});
app.get(`${sub}posts`, (req, res) => {
    res.send(doGet("", true, "Post"));
});


/** Queries
 *  /:id?sortBy=name
 * 
 */
// hello
app.get('/hello', async (req, res) => {
    res.json({
        message: "hello"
    });

});
// show person with the specific id
app.get('/api/person/:id', async (req, res) => {
    // res.send(req.params.id); // shows the parameter input
    res.send(req.query); //shows the query done to the backend server
});
// PORT
const port = env.PORT || 3001;

app.use('/', router);
app.listen(port, () => console.log(`listening on port ${port}`));