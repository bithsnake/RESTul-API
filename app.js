require("dotenv").config(); //tillåter environment variablar att sättas på process.env
const express = require("express");
const app = express();
// middleware
app.use(express.json()); //parsar json body's i request objektet

// dirigera requests till endpointent som börjar med /users till postRoutes.js
// där alla olika requests kan köras på /users
// app.use("/", require("./routes/postRoutes"));
app.get('/', function(req, res) {
    res.send(`
    <html>
        <body style="color: black">
            <h1 style="color: blue">Dokumentation av det här APIet</h1>
            <p>GET  /users returnerar alla användare inkklusive antal</p>
            <p>GET  /users/id en användare baserat på id </p>
            <p>POST /users - skapar en användare där JSON objektet ska se ut som följande:
            {
                "UserName" : "namn"
                "EmailAdress" : "namn@domän.com"
            }
            </p>

            <p>PS: du kan användare address fältet för att få en route på användar id</p>
        </body>
    </html>`);
});

app.use("/users", require("./routes/postRoutes"));

// en global error handler
app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        message: "Någonting gick riktigt fel här..",
    });
});

// var mysql = require('mysql');
// // koppling till databasen
// var con = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "kimmo",
//     password: "kimmo123",
//     database: "db"
// });

// con.connect(function(err) {	// anslut till databasen
//   if (err) throw err;
//   console.log("Connected");
// });




// app.get('/', function(req, res) {
//     res.send(`<html><body><h1>Dokumentation av det här APIet</h1></body></html>`);
//   });
  

// app.get('/hello', function(req, res) {
//     res.json({
//         message: "Hello REST world!"
//     });
// });

// app.get('/users', function(req, res) {
//     var sql = "SELECT ID, UserName, EmailAdress FROM person";
//     con.query(sql, function(err, result, fields) {
//         if (err) throw err;
//         // result.forEach(row => {
//         //     row.UserName + "<br/>";
//         // });
//         // res.json(result).send(`<html><body>${name}</body></html>`);
//         res.send(`<html><body><h4>${result.UserName}</h4></body></html>`);
//         res.json(result);
//         res.status(400).send("<h1>400 Sorry</h1>");
//     });
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
console.log(`Server started. Listening on localhost: ${PORT}`);
});
  