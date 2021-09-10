const express = require("express");
const app = express();
// middleware
app.use(express.json()); //parsar json body's i request objektet

// root
app.use("/", require("./routes/postRoutes"));
app.get('/', function(req, res) {
    res.send(`
    <html style="display: flex; place-content: center; font-size: 1rem;">
        <body style="color: black">
            <h1 style="color: blue">Dokumentation av det här APIet</h1>
            <h2><b>Hämta alla användare</b></h2>
            <p><b style="color: green">GET /users</b> - returnerar alla användare inkklusive antal</p>
            
            <h2><b>Hämta en användare med ett specifikt ID</b></h2>
            <p><b style="color: green">GET  /users/{id}</b> - returnerar en användare baserat på id </p>
            
            <h2><b>Skapa Användare</b></h2>
            <p><b style="color: orchid">POST /users</b> - skapar en användare med hashat lösenord där JSON objektet ska se ut som följande:</p>
            <p>
            {
                <ul style=" list-style: none;">
                <b>
                <li>"UserName" : "namn",</li>
                <li>"EmailAdress" : "namn@domän.com",</li>
                <li>"Password" : "lösenord"</li>
                </b>
                </ul>
            }
            <br/>
            <b><h3>OBS: användarnamnet och mailadressen måste vara unikt</h3></b>
            
            <h2><b>Logga in med en användare</b></h2>
            <p><b style="color: violet">POST /login</b> - loggar in med en användare där JSON objektet ska se ut som följande:</p>
            <p>
            {
                <ul style=" list-style: none;">
                <b>
                <li>"EmailAdress" : "namn@domän.com",</li>
                <li>"Password" : "lösenord"</li>
                </b>
                </ul>
            }
            <br/>
            </p>
            
            <h2><b>Ändra information på en användare</b></h2>
            <p><b style="color: tomato">PUT /users/{id}</b> - ändrar en användare där JSON objektet ska ut som följande:</p>
            <p>
            {
                <ul style=" list-style: none;">
                <b>
                <li>"UserName" : "namn",</li>
                <li>"EmailAdress" : "namn@domän.com",</li>
                <li>"Password" : "lösenord"</li>
                </b>
                </ul>
            }
            </p>
            <br/>
            <b><h4>returnerar en ändrad användare, med all information man har ändra förutom lösenord</h3></b>
            
            <h2><b> Ta bort en användare</b></h2>
            <p><b style="color: firebrick">DELETE  /users/{id}</b> tar bort en användare med id som man har anget speficierat</p>
            
            <hr/>
            <p><b> Snabba test länkar för GET requests</b></p>
            <a href="http://localhost:3000/users">Hämta alla användare</a>
            <br/>
            <a href="http://localhost:3000/users/1">Hämta användare med id 1</a>
        </body>
    </html>`);
});

// routes
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