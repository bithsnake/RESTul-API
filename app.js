const express = require("express");
const app = express();
// middleware
app.use(express.json()); //parsar json body's i request objektet

// dirigera requests till endpointent som börjar med /users till postRoutes.js
// där alla olika requests kan köras på /users
// app.use("/", require("./routes/postRoutes"));
// app.get('/', function(req, res) {
//     res.send(`
//     <html>
//         <body style="color: black">
//             <h1 style="color: blue">Dokumentation av det här APIet</h1>
//             <p>GET  /users returnerar alla användare inkklusive antal</p>
//             <p>GET  /users/id en användare baserat på id </p>
//             <p>POST /users - skapar en användare där JSON objektet ska se ut som följande:
//             {
//                 "UserName" : "namn",
//                 "EmailAdress" : "namn@domän.com",
//                 "Password" : "lösenord"
//             }
//             </p>

//             <p>PS: du kan användare address fältet för att få en route på användar id</p>
//         </body>
//     </html>`);
// });

app.use("/login", require("./routes/loginRoute"));
app.use("/", require("./routes/postRoutes"));

// en global error handler
app.use((err, req, res, next) => {
    let message = "Någonting gick riktigt fel här..";
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    var stack = String(err.stack);

    // OBS: för POST metoden "createNewUser" i userControllers MYSQL felkod 1062 innebär att det finns kolumner med samma värden
    if (err.errno === 1062) {
        if (stack.includes('users.EmailAdress_UNIQUE')) {
            message = `Mailaddressen '${req.body.EmailAdress}' är taget, använd en annan mailadress.`;
        }
        if (stack.includes('users.UserName_UNIQUE')) {
            message = `Användarnamnet '${req.body.UserName}' är taget, använd ett annat användarnamn.`;
        }
    }
    res.status(500).json({
        message: message,
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
console.log(`Server started. Listening on localhost: ${PORT}`);
});
  