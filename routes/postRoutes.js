const express = require("express");
const postControllers = require('../controllers/postControllers'); // används för att komma åt postControllers.js
const loginController = require('../controllers/loginController'); // används för att komma åt postControllers.js
const router = express.Router(); // assignera router kontanten Objektet Router

// @route GET && POST - /users/
router.route("/users")
    .get(postControllers.getAllUsers)
    .post(postControllers.createNewUser);

// @route GET && PUT && DELETE - /users/id
router.route("/users/:id")
    .get(postControllers.getUserById)
        .put(postControllers.editUserById)
            .delete(postControllers.deleteUserById);

// router.route("/")
//     .post(loginController.loginUser);

// här exporterar vi alla routningar
module.exports = router;