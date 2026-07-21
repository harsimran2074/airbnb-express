const express = require('express');
const userRouter = express.Router();
const userController = require("../controllers/store/userController");


const {homeBody} = require('./hostRoutes');
userRouter.use('/', (req, res,next) => {
   console.log(req.url,req.method);
next();
})

userRouter.get('/',userController.userHome);
userRouter.get('/favourite-list',userController.getFavouriteList);
userRouter.post('/favourite-list',userController.postFavouriteList);
// userRouter.get('/home-detail',userController.homeDetail);
userRouter.get('/booking',userController.booking);

userRouter.get('/homes/:homeId',userController.homeDetail);

module.exports = userRouter;