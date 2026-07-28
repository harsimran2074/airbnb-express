const express = require('express');
const path = require("path");
const app = express();
const hostController = require("./controllers/store/userController");


app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

 const userRouter = require('./routes/userRoutes');
 const {hostRouter} = require('./routes/hostRoutes');
  
const { default: mongoose } = require('mongoose');

app.use(userRouter);
app.use('/host',hostRouter);

app.use(hostController.notFound);

const PORT = 3001;

const url_path = "mongodb+srv://harsimran2074handa_db_user:vCaoHmhUuzKDIUtu@cluster0.4dv16em.mongodb.net/airbnb-mongo";

mongoose.connect(url_path).then(()=>
console.log("connected to database"),
 app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
})
).catch((err)=> console.log("DB connection error",err));


