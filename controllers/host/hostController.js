const Home = require("../../models/home");
const favourite = require("../../models/favourites");

exports.getAddhome = (req, res) => {
   
  res.render("post/addhome",{isLoggedIn: req.isLoggedIn});
};

exports.editHome = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      return res.redirect("/host-home-list");
    } else {
      res.render("post/edithome", { home: home , isLoggedIn: req.isLoggedIn});
    }
  });
};

exports.postAddhome = (req, res) => {
  const { homeName, homeprice, homeRating, description } = req.body;

  const home = new Home({ homeName, homeprice, homeRating, description });

  home.save().then(() => {
    console.log("home added");
  });
  res.render("post/addedhome" , { isLoggedIn: req.isLoggedIn});
};

exports.postEditHome = (req, res) => {
  Home.findById(req.body.homeId)
    .then((home) => {
      home.houseName = req.body.houseName,
        home.price = req.body.price,
        home.rating = req.body.rating,
        home.description = req.body.description,
        home.save().then(() => console.log("home edited"));
      res.redirect("/host/host-home-list" , { isLoggedIn: req.isLoggedIn});
    })
    .catch((err) => console.log(err));
};

exports.hosthomelist = (req, res) => {
  Home.find()
    .then((registeredHomes) => {
      console.log(registeredHomes);
      res.render("post/host-home-list", { homeBody: registeredHomes  , isLoggedIn: req.isLoggedIn});
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
      return res.redirect("/host/host-home-list", { isLoggedIn: req.isLoggedIn});
    } else {
      
      res.redirect("/host/host-home-list" , { isLoggedIn: req.isLoggedIn});
    }
  });
};
