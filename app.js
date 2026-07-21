const express = require('express');
const path = require("path");
const app = express();
const hostController = require("./controllers/store/userController");

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

 const userRouter = require('./routes/userRoutes');
 const {hostRouter} = require('./routes/hostRoutes');

app.use(userRouter);
app.use('/host',hostRouter);

app.use(hostController.notFound);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});