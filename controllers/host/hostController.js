const Home = require("../../models/home");
const favourite = require("../../models/favourites");

exports.getAddhome = (req, res) => {
   
  res.render("post/addhome",{isLoggedIn: req.isLoggedIn , userType: req.session.userType});
};

exports.editHome = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/host-home-list");
    } else {
      res.render("post/edithome", { home: home , isLoggedIn: req.isLoggedIn , userType: req.session.userType});
    }
  });
};

exports.postAddhome = (req, res) => {
  const imageUrl = req.file ? req.file.path : "/images/house1.png";
  const { homeName, homeprice, homeRating, description } = req.body;

  const home = new Home({ homeName, homeprice, homeRating, description, imageUrl });

  home.save()
    .then(() => {
      console.log("home added");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Failed to add home:", err);
      res.status(500).send("Unable to add home. Please try again.");
    });
};

exports.postEditHome = (req, res) => {
  Home.findById(req.body.homeId)
    .then((home) => {
      home.homeName = req.body.houseName,
        home.homeprice = req.body.price,
        home.homerating = req.body.rating,
        home.description = req.body.description,
        home.save().then(() => console.log("home edited"));
      // res.render("post/host-home-list" , { isLoggedIn: req.isLoggedIn , userType: req.session.userType});
      res.redirect("/host/host-home-list");
    })
    .catch((err) => console.log(err));
};

exports.hosthomelist = (req, res) => {
  Home.find()
    .then((registeredHomes) => {
      console.log(registeredHomes);
      res.render("post/host-home-list", { homeBody: registeredHomes  , isLoggedIn: req.isLoggedIn , userType: req.session.userType});
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postdeleteHome = (req, res) => {
  const homeId = req.body.id;
  console.log("came to delete");
  Home.findByIdAndDelete(homeId).then((home) => {
    console.log(home);
    if (!home) {
      console.log("error occur while deleting home");
      return res.redirect("/host/host-home-list");
    } else {
      
      res.redirect("/host/host-home-list" );
    }
  });
};
