const Home = require("../../models/home");
const favourite = require('../../models/favourites');

exports.userHome = (req, res) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home", { homeBody: registeredHomes }),
  );
};

exports.notFound = (req, res, next) => {
  res.status(404).render("404");
};

exports.postFavouriteList = (req, res) => {
  const homeId = req.body.id;
    console.log(homeId);
  favourite.addToFavourite(homeId);
  res.redirect("/favourite-list");
};

exports.getFavouriteList = (req, res) => {
  favourite.getFavourites((favouriteId) => {
   
    Home.fetchAll((homes) => {
    const homeBody =   homes.filter((home)=> favouriteId.includes(home.id) );
    console.log(homeBody);
    res.render("store/favourite-list", { homeBody: homeBody });
    });
    
    
  });
};

exports.homeDetail = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      res.redirect("/");
    } else {
      //  console.log(home)
      res.render("store/home-detail", { home: home });
    }
  });
};

exports.booking = (req, res) => {
  res.render("store/booking");
};
