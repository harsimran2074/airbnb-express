const Home = require("../../models/home");

exports.getAddhome = (req, res) => {
   console.log("Rendering edit home");
  res.render("post/edithome");
};

exports.editHome = (req,res) => {
  const homeId = req.params.homeId;
  Home.findById(homeId , (home)=> {
console.log(home);
res.render('post/edithome');

  })
}

exports.postAddhome = (req, res) => {
  const home = new Home(req.body.houseName, req.body.price, req.body.rating);
  home.save();
  res.render("post/addedhome");
};

exports.hosthomelist = (req, res) => {
  Home.fetchAll((registeredHomes) =>
    res.render("post/host-home-list", { homeBody: registeredHomes }),
  );
};