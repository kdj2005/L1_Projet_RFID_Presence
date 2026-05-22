const express = require("express");
const UserRouter = express.Router();
const { creerUtilisateur, userInfo } = require("../controllers/usercontroller");

UserRouter.post("/creer", creerUtilisateur);
UserRouter.post("/info", userInfo);
module.exports = UserRouter;