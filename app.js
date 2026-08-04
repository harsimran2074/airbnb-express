const express = require("express");
const path = require("path");
const app = express();
const hostController = require("./controllers/store/userController");
const expressSession = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(expressSession);
const userRouter = require("./routes/userRoutes");
const { hostRouter } = require("./routes/hostRoutes");
const authRouter = require("./routes/authRoutes");
const { default: mongoose } = require("mongoose");

const url_path =
  "mongodb+srv://harsimran2074handa_db_user:vCaoHmhUuzKDIUtu@cluster0.4dv16em.mongodb.net/airbnb-mongo";

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: url_path,
  collection: 'sessions'
});

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.isLoggedIn = req.isLoggedIn;
  
  next();
});

app.use(userRouter);
app.use(authRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(hostController.notFound);

const PORT = 3001;


mongoose
  .connect(url_path)
  .then(() => console.log("connected to database"),
    app.listen(PORT, () => {
      console.log(`server running at http://localhost:${PORT}`);
    }),
  )
  .catch((err) => console.log("DB connection error", err));
