const express = require('express');
const path = require("path");
const rootDir = require('../utils/pathUtils.js')
const userRouter = express.Router();

const {homeBody} = require('./hostRoutes');
userRouter.use('/', (req, res,next) => {
   console.log(req.url,req.method);
next();
})

userRouter.get('/', (req, res) => {
  console.log(homeBody);
  res.render('home',{homeBody : homeBody});
});

module.exports = userRouter;