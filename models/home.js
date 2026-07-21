const fs = require("fs");
const registeredHomes = [];
const path = require("path");

module.exports = class Home {
  constructor(homeName, homeprice, homeRating) {
    this.homeName = homeName;
    this.homeprice = homeprice;
    this.homeRating = homeRating;
  }

  save() {
    this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const homeDataPath = path.join(__dirname, "../data/file.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("file is underprocess", error);
      });
    });
  }

  static fetchAll(callback) {
    //readFile.....

    const readDataFile = path.join(__dirname, "../data/file.json");
    const readFile = fs.readFile(readDataFile, (error, data) => {
     
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