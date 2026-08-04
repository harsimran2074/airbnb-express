const { check, validationResult } = require("express-validator");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");


exports.getLogin = (req, res) => {
      isLoggedIn: req.isLoggedIn,
  res.render("auth/login",{errors: [], oldInput: {email: ""},isLoggedIn: req.isLoggedIn});
};

exports.postLogin = async(req, res) => {
  const email = req.body.email;
 const user = await User.findOne({email})
  if(!user){
    res.status(404).render("auth/login", {errors: ["User not found"] ,isLoggedIn: req.isLoggedIn, oldInput: {email: req.body.email}});
    
  }else{
   const isMatch = await bcrypt.compare(req.body.password, user.password)
    
  if(isMatch){
  

    req.session.isLoggedIn = true;
    req.session.user = user;
   req.session.save(()=>{
    console.log("session saved");
  res.redirect("/");
   } );
  
  

  }else{
    
    res.status(404).render("auth/login", {errors: ["incorrect password"] , oldInput: {email: req.body.email}});
    
  }
  
}},

  exports.getLogout = (req, res) => {
    req.session.destroy(() => res.redirect("/"));
  };

exports.getSignUp = (req, res) => {
  res.render("auth/signup", {
    errors: [],
      isLoggedIn: req.isLoggedIn,

    oldInput: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
      
    },
  });
};

exports.postSignUp = [
  check("firstName")
    .notEmpty()
    .withMessage("Please enter your first name")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z]+$/)
    .withMessage("First name can only contain letters"),

  // Last Name validation
  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name can only contain letters"),

  // Email validation
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  // Password validation
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@&]/)
    .withMessage("Password should contain atleast one special character")
    .trim(),

  // Confirm password validation
  check("confirm_password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // User Type validation
  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["admin", "guest"])
    .withMessage("Invalid user type"),

  //   Terms Accepted validation
  //   check("termsAccepted")
  //     .notEmpty()
  //     .withMessage("You must accept the terms and condition")
  //     .custom((value) => {
  //       if (value !== "on") {
  //         throw new Error("You must accept the term");
  //       }
  //       return true;
  //     }),

  (req, res) => {
    const { firstName, lastName, email, password, userType } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signup", {
        isLoggedIn: false,
        oldInput: { firstName, lastName, email, password, userType },
        errors: errors.array().map((error) => error.msg),
      });
    } else {
      bcrypt.hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userType,
          });
          return user.save();
        })
        .then(() => {
          res.redirect("/login");
        })
        .catch((err) =>
          res.render("auth/signup", {
            errors: err,
            oldInput: { firstName, lastName, email, password, userType },
          }),
        );
    }
  },
];
