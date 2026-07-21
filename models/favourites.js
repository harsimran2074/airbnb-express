const fs = require("fs");
const registeredHomes = [];
const path = require("path");

module.exports = class favourite{

  static addToFavourite(homeId) {
  
    favourite.getFavourites((favourite) => {
      favourite.push(homeId); 
      const favouritePath = path.join(__dirname, "../data/favourite.json");
      fs.writeFile(favouritePath, JSON.stringify(favourite), (error) => {
        console.log("file is underprocess", error);
      });
    });
  }

  static getFavourites(callback) {
    //readFile.....

    const readFavouriteFile = path.join(__dirname, "../data/favourite.json");
    const readFile = fs.readFile(readFavouriteFile, (error, data) => {

      callback(!error ? JSON.parse(data) : []);
    });
  }

  static findById(homeId , callback){  
    this.fetchAll(homes=> { 
     const homeFound =  homes.find(home => homeId === home.id);
      callback(homeFound);
    })

};

}