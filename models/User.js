const db = require('../config/db');
// denna klass är skapad för att kunna använda metoder från klassen gällande användare
class User {
    constructor(UserName,EmailAdress,Password) {
        this.UserName = UserName;
        this.EmailAdress = EmailAdress;
        this.Password = Password
    }

    // spara en användare
    // skippar datum här iom den ger mig SQL syntax fel som jag inte lyckades lösa, men låter koden ligga kvar för framtiden
    async Save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1; // lägger en + 1 för att i javascript så börjar månader på 0 index, detta för att december t.ex. inte är index == 11 och januari index  == 0
        let dd = d.getDate(); // dag i siffer form

        // let createdAtDate = new Date().toJSON(); // funkar inte..
        let createdAtDate = `${yyyy}-${mm}-${dd}`;

        let sql = `
        INSERT INTO users(
            UserName,
            EmailAdress,
            Password
        )
        VALUES(
            '${this.UserName}',
            '${this.EmailAdress}',
            '${this.Password}'
        )`;

        // här använder jag av mig utav destructor för att inte skicka med en [FieldPacket], och så slipper att få "null" längst ner i response Body'n
        const [newUser, _] = await db.execute(sql);
        return newUser;
        
        
    }
    // Logga in en användare
    static Login(mail, pass) {
        var sql = `
        SELECT * FROM users
        WHERE EmailAdress = '${mail}' AND password = '${pass}'
        `;
        return db.execute(sql);
    }
    // ändra en användare
    async Edit(id,UserName,EmailAdress,Password) {
        let sql = `
        UPDATE users
        SET UserName='${UserName}', EmailAdress='${EmailAdress}', Password='${Password}'
        WHERE id=${id};
        `;
        const [editedUser,_] = await db.execute(sql);
        console.table(`edit result: ${editedUser}`);
        
        return editedUser;
    }
    // ta bort en användare
    async Delete(id) {
        let sql = `
        DELETE FROM users
        WHERE id=${id};
        `;
        const deletedUser = await db.execute(sql);
        console.table(`delete result: ${deletedUser}`);
        
        return deletedUser;
    }

    // hitta alla användare
    static FindAll() {
        let sql = "SELECT * FROM users";
        return  db.execute(sql);
    }
    static FindById(id) {
        let sql = `SELECT * FROM users WHERE id=${id};`; 
        return db.execute(sql);
    }
}

// exportera detta objekt för att kunnas användas globalt i projektet
module.exports = User;