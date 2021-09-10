const db = require('../config/db.js');
const User = require('../models/User.js');
const crypto = require('crypto');

// Hasha lösenord
function hash(data) {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}
  
// POST - Logga in användare
exports.loginUser = async (req, res, next) => {
    try {
        let {EmailAdress, Password } = req.body;
        let user = new User(UserName = "", EmailAdress, Password);

        const requestUserPassword = hash(Password);

        [user,_] = await User.Login(EmailAdress, requestUserPassword);
        // Om response bodyn innehåller data så har vi lyckats logga in
        if (res.status(200) && user.length !== 0) {
            // skapar ett anonymt objekt bara för att det ska bli lite snyggare att visa informationen om användaren
            var responseObject = {
                username: user[0].UserName,
                mailadress: user[0].EmailAdress
            }
            res.json({
                message: `StatusKod = ${res.statusCode}, Du lyckades logga in! Nedan har du dina uppgifter.`,
                new_user: responseObject
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        
        console.table(error);
        next(error);
    }
}