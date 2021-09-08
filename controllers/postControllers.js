const Person = require('../models/Person.js');


// GET - returnerar alla användare
exports.getAllPersons = async (req, res, next) => {
    try {
        
        const [person, _] = await Person.findAll();
        // 200 = "OK" Lyckades göra en GET på alla användare
        res.status(200).json({ count: person.length, person });
    } catch (error) {
        console.table(error);
        // global error handler
        next(error);
    }
    // res.send("Get all persons route");
};
// POST - skapar en ny användare
exports.createNewPerson = async (req, res, next) => {
    try {
        // här exporterar jag fälten UserName och EmailAdress från själva body av POST requesten jag skapar i Postman
        let { UserName, EmailAdress } = req.body;
        let person = new Person(UserName, EmailAdress);
        
        // spara personen i databasen
        // await måste köras så att den väntar in Promise { <pending> } helt och hållet för att save är en async funktion
        person = await person.save(); 

        console.log(person);
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
// GET - hitta användare på id i adress fältet ex: /person/1
exports.getPersonById = async (req, res, next) => {
    try {
        // exporta parametern vi matar in i users/id, och detta fungerar pga
        // vi har specifierat det i våran route i postRoutes på router.route("/:id") med variabeln :id efter /
        let userId = { id } = req.params.id;
        // vi behöver inte FieldData utan vill bara har Row data så då destructar vi
        // arrayen och lägger till en _
        let [person, _] = await Person.findById(userId);
        
        // 200 = request var "OK"
        // person[0] tog mig ett jäkla tag att få till.. så man slipper hak-parenteserna "person": [ { } ]
        res.status(200).json({ person : person[0] });

    } catch (error) {
        console.table(error);
        next(error);
    }
    // res.send("Get post by ID route");
}