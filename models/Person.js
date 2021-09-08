const db = require('../config/db');


// denna klass är skapad för att kunna använda metoder från klassen gällande personer
class Person {
    constructor(UserName,EmailAdress) {
        this.UserName = UserName;
        this.EmailAdress = EmailAdress;
    }

    // spara en användare
    // skippar datum här iom den ger mig SQL syntax fel som jag inte lyckades lösa, men låter koden ligga kvar för framtiden
    async save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1; // lägger en + 1 för att i javascript så börjar månader på 0 index, detta för att december t.ex. inte är index == 11 och januari index  == 0
        let dd = d.getDate(); // dag i siffer form

        // let createdAtDate = new Date().toJSON(); // funkar inte..
        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO person(
            UserName,
            EmailAdress
        )
        VALUES(
            '${this.UserName}',
            '${this.EmailAdress}'
        )`;

        // här använder jag av mig utav destructor för att inte skicka med en [FieldPacket]
        const [newPerson, _] = await db.execute(sql);
        // const newPerson = await db.execute(sql);
        
        return newPerson;
    }
    // istället för att skapa en instans av Post och köra t.ex const p = new Post(); p.findAll();
    // så kan jag kalla på klassen istället, därav static

    // hitta alla personer
    static findAll() {
        let sql = "SELECT * FROM person";
        return  db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM person WHERE id=${id};`; // <- att lägga till id= tog mig förevigt att förstå..
        return db.execute(sql);
    }
}

// exportera detta objekt för att kunnas användas globalt i projektet
module.exports = Person;