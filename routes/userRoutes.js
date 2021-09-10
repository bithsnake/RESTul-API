const express = require("express");
const userControllers = require('../controllers/userControllers'); // används för att komma åt userControllers.js
const router = express.Router(); // assignera router kontanten Objektet Router

// @route GET && POST - /users/
router.route("/users")
    .get(userControllers.getAllUsers)
    .post(userControllers.createNewUser);

// @route GET && PUT && DELETE - /users/id
router.route("/users/:id")
    .get(userControllers.getUserById)
        .put(userControllers.editUserById)
            .delete(userControllers.deleteUserById);

// här exporterar vi alla routningar
module.exports = router;