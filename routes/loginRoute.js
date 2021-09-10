const express = require("express");
const loginController = require('../controllers/loginController'); // används för att komma åt loginControllers.js
const router = express.Router(); // assignera router kontanten Objektet Router

// @route GET && POST - /users/

router.route("/")
.post(loginController.loginUser);

// här exporterar vi alla routningar
module.exports = router;