const Home = require("../../models/home");
const favourite = require("../../models/favourites");

exports.userHome = (req, res) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home", { homeBody: registeredHomes });
  });
};

exports.notFound = (req, res, next) => {
  res.status(404).render("404");
};

exports.postFavouriteList = (req, res) => {
  const homeId = req.body.id;
  favourite.findOne({homeId: homeId}).then((favouriteExist) => {
    if(favouriteExist){
      console.log("favourite exist");
     
    }else{
      const favourites = new favourite({homeId});
  favourites.save()
    .then(() => console.log("added to favourite"))
    .catch((err) => console.log(err));
      }
  })
  
  res.redirect("/favourite-list");
};

exports.getFavouriteList = (req, res) => {
  favourite.find().populate("homeId")
  
  
  .then(favourites => {

    const favourite = favourites.map((home)=> home.homeId);
  console.log(favourite);

      res.render("store/favourite-list", { homeBody: favourite });
    });

  }

exports.removeFavourite = (req,res) => {
  console.log(req.body.homeId);
  const homeId = req.body.homeId;
  favourite.findOneAndDelete(req.body.homeId).then(() => res.redirect("/favourite-list")).catch((err) => console.log(err));
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
