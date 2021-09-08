const express = require("express");
const postControllers = require('../controllers/postControllers'); // används för att komma åt postControllers.js
const router = express.Router(); // skapa en instans av Router objektet

// @route GET && POST - /person/
router
    .route("/")
    .get(postControllers.getAllPersons)
    .post(postControllers.createNewPerson);


// @route GET - /person/id
router.route("/:id").get(postControllers.getPersonById);

// här exporterar vi alla routningar
module.exports = router;
