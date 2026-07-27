const Home = require("../../models/home");
const favourite = require("../../models/favourites");

exports.userHome = (req, res) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home", { homeBody: registeredHomes });
  });
};

exports.notFound = (req, res, next) => {
  res.status(404).render("404");
};

exports.postFavouriteList = (req, res) => {
  const homeId = req.body.id;
  const favourites = new favourite(homeId);
  favourites.save()
    .then(() => console.log("added to favourite"))
    .catch((err) => console.log(err));
  res.redirect("/favourite-list");
};

exports.getFavouriteList = (req, res) => {
  favourite.getFavourites().then(favouriteId => {
  
    const favourite = favouriteId.map((home)=> home.homeId);
    Home.fetchAll().then((homes) => {
      
      
      const homeBody = homes.filter((home) => {
        return favourite.includes(String(home._id)) } );
      res.render("store/favourite-list", { homeBody: homeBody });
    });
  });
};

exports.removeFavourite = (req,res) => {
  
  favourite.removefromfavourite(req.body.homeId).then(() => res.redirect("/favourite-list")).catch((err) => console.log(err));
}

exports.homeDetail = (req, res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/");
    } else {

      res.render("store/home-detail", { home: home });
    }
  });
};

exports.booking = (req, res) => {
  res.render("store/booking");
};
