const express = require("express");
const authRouter = express.Router();
const authController = require('../controllers/auth/authController');

authRouter.get("/login", authController.getLogin);
authRouter.get("/logout", authController.getLogout);
authRouter.get("/signUp", authController.getSignUp);
authRouter.post("/signUp", authController.postSignUp);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;