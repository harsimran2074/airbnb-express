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
const multer = require('multer');
const url_path =
  "mongodb+srv://harsimran2074handa_db_user:vCaoHmhUuzKDIUtu@cluster0.4dv16em.mongodb.net/airbnb-mongo";

app.set("view engine", "ejs");
app.set("views", "views");


const store = new MongoDBStore({
  uri: url_path,
  collection: 'sessions'
});

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const multerOptions = {
  storage,
  fileFilter,
};

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(multer(multerOptions).single('photo'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      secure: false,
    },
  })
);

app.use((req, res, next) => {
  const { isLoggedIn = false, userType = null } = req.session || {};

  req.isLoggedIn = isLoggedIn;
  req.userType = userType;

  res.locals.isLoggedIn = isLoggedIn;
  res.locals.userType = userType;

  next();
});
// app.use((req, res, next) => {
//   req.isLoggedIn = !!(req.session && req.session.isLoggedIn);
//   req.userType = !!(req.session && req.session.userType);
//   res.locals.isLoggedIn = req.isLoggedIn;
//   next();
// });

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
