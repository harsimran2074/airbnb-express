const express = require("express");
const path = require("path");
const hostRouter = express.Router();
const rootDir = require("../utils/pathUtils.js");

hostRouter.get("/add-home", (req, res) => {
  res.sendFile(path.join(rootDir, "views", "addhome.html"));
});

const homeBody = [];
hostRouter.post("/add-home", (req, res) => {
  homeBody.push(req.body);

  res.sendFile(path.join(__dirname, "/../views/addedhome.html"));
});

module.exports = {
  hostRouter,
  homeBody
};