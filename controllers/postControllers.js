const Person = require('../models/User.js');


// GET - returnerar alla användare
exports.getAllUsers = async (req, res, next) => {
    try {
        
        const [user, _] = await Person.FindAll();
        // 200 = "OK" Lyckades göra en GET på alla användare
        res.status(200).json({ count: user.length, user });
    } catch (error) {
        console.table(error);
        // global error handler
        next(error);
    }
    // res.send("Get all persons route");
};
// POST - skapar en ny användare
exports.createNewUser = async (req, res, next) => {
    try {
        // här exporterar jag fälten UserName och EmailAdress från själva body av POST requesten jag skapar i Postman
        let { UserName, EmailAdress, Password } = req.body;
        let user = new Person(UserName,EmailAdress,Password);
        
        // spara personen i databasen
        // await måste köras så att den väntar in Promise { <pending> } helt och hållet för att save är en async funktion
        user = await user.Save(); 

        console.log(user);
        // 201 = Create lyckades skapa en användare
        res.status(201).json({
            message: "Användare skapad!"
        })
    } catch (error) {
        console.table(error);
        // global error handler
        next(error);       
    }
}
// GET - hitta användare på id i adress fältet ex: /user/1
exports.getUserById = async (req, res, next) => {
    try {
        // exporta parametern vi matar in i users/id, och detta fungerar pga
        // vi har specifierat det i våran route i postRoutes på router.route("/:id") med variabeln :id efter /
        let userId = { id } = req.params.id;
        // vi behöver inte FieldData utan vill bara har Row data så då destructar vi
        // arrayen och lägger till en _
        let [user, _] = await Person.FindById(userId);
        
        // 200 = request var "OK"
        // user[0] tog mig ett jäkla tag att få till.. så man slipper hak-parenteserna "user": [ { } ]
        res.status(200).json({ user : user[0] });

    } catch (error) {
        console.table(error);
        next(error);
    }
    // res.send("Get user by ID route");
}
// PUT - ändra en användare
exports.editUserById = async (req, res, next) => {
    try {
        let userId = { id } = req.params.id;
        let userBody = { UserName, EmailAdress, Password } = req.body;
        let user = new Person(UserName, EmailAdress, Password);

        user = await user.Edit(userId,userBody.UserName,userBody.EmailAdress,Password);
        
        // 200 = request var "OK"
        if (res.status(202)) {
            console.log(`202 - Accepted by server: ${res}`)
        }
        // 200 / 202 - lyckades att uppdatera resursen
        res.status(200 || 204).json({ user: user[0] });
    } catch (error) {
        console.table(error);
        next(error);
    }
    // res.send("Edit user by ID route");
}
// DELETE - ta bort en användare
exports.deleteUserById = async (req, res, next) => {
    try {
        let userId = { id } = req.params.id;
        let userBody = { UserName, EmailAdress, Password } = req.body;
        let user = new Person(userId, UserName, EmailAdress, Password);
        user = await user.Delete(userId);
        
        // 200 = request var "OK"
        if (res.status(202)) {
            console.log(`202 - Accepted by server: ${res}`)
        }
        // 200 / 202 - lyckades att uppdatera resursen
        res.status(200 || 204).json({ message: `Deleted user with id ${userId}`,user: user[0] });
    } catch (error) {
        console.table(error);
        next(error);
    }
    // res.send("Delete user by ID route");
}