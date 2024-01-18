const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const Router = express.Router();

Router.route("/register").post(registerUser);
Router.post("/login", loginUser);

module.exports = Router;
