const db = require('../config/db.js');
const User = require('../models/User.js');

// POST - Logga in användare
exports.loginUser = async (req, res, next) => {
    try {
        let { UserName, EmailAdress, Password } = req.body;
        let user = new User(UserName, EmailAdress, Password);

        sql = `
        SELECT id,UserName, EmailAdress, Password FROM users
        WHERE (Emailadress = ? AND EmailAdress='${user.EmailAdress}') AND (Password = ? AND Password='${user.Password}');
        `;
        user = await User.Login(user.EmailAdress, user.Password);
        // 200 - OK
        console.log(user);
        res.status(200).json({
            message:    "Du lyckades logga in! Nedan har du dina uppgifter\nVar noga med att notera dom och att ha dom på en säker plats.",
            new_user:   {UserName, EmailAdress}
        });
        res.status(400).json({
            message: "Det blev något fel vid inloggningen.."
        })
    } catch (error) {
        
        console.table(error);
        next(error);
    }
}