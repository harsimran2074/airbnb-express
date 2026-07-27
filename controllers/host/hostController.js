const Home = require("../../models/home");
const favourite = require("../../models/favourites");
exports.getAddhome = (req, res) => {
  res.render("post/addhome");
};

exports.editHome = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then (home=> {
    
    if (!home) {
      return res.redirect("/host-home-list");
    } else {
      res.render("post/edithome", { home: home });
    }
  });
};

exports.postAddhome = (req, res) => {
  const home = new Home(req.body.houseName, req.body.price, req.body.rating , req.body.description);
  
  home.save().then(()=>  {console.log("home added")});
  res.render("post/addedhome");
};

exports.postEditHome = (req, res) => {
  const home = new Home(
    req.body.houseName,
    req.body.price,
    req.body.rating,
    req.body.description,
    req.body.homeId,

  );
  home._id = req.body.homeId;
  home.save().then(() => console.log("home edited"));
  res.redirect("/host/host-home-list");
};

exports.hosthomelist = (req, res) => {

  Home.fetchAll().then(registeredHomes => {
    console.log(registeredHomes);
      res.render("post/host-home-list", { homeBody: registeredHomes });
      
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postdeleteHome = (req, res) => {
  const homeId = req.body.id;
  Home.deleteById(homeId).then(home => {
    console.log(home);
    if (!home) {
      console.log("error occur while deleting home");
      return res.redirect("/host/host-home-list");
    } else {
    
      favourite.removefromfavourite(homeId);
      res.redirect("/host/host-home-list");
    }
  });
};
