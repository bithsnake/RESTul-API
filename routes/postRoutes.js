const express = require("express");
const postControllers = require('../controllers/postControllers'); // används för att komma åt postControllers.js
const router = express.Router(); // assignera router kontanten Objektet Router

// @route GET && POST - /person/
router
    .route("/")
    .get(postControllers.getAllUsers)
    .post(postControllers.createNewUser);


// @route GET && PUT && DELETE - /person/id
router.route("/:id")
    .get(postControllers.getUserById)
    .put(postControllers.editUserById)
    .delete(postControllers.deleteUserById);

// här exporterar vi alla routningar
module.exports = router;
