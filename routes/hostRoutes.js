const express = require("express");
const hostRouter = express.Router();
const hostController = require("../controllers/host/hostController");

hostRouter.get("/add-home", hostController.getAddhome);
hostRouter.post("/add-home",hostController.postAddhome);
hostRouter.get("/host-home-list",hostController.hosthomelist);
hostRouter.get("/edit-home/:homeId",hostController.editHome);
hostRouter.post("/edit-home",hostController.postEditHome);
hostRouter.post("/delete-home",hostController.postdeleteHome);
module.exports = {
  hostRouter

};