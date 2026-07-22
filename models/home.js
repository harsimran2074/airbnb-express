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
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        registeredHomes = registeredHomes.map((home) => (home.id === this.id ? this : home));
      } else {
         this.id = Math.random().toString();
        registeredHomes.push(this);
       
      }
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

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => homeId === home.id);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.filter((home) => homeId !== home.id);
      callback(homeFound);
  const homeDataPath = path.join(__dirname, "../data/file.json");
      fs.writeFile(homeDataPath, JSON.stringify(homeFound), (error) => {
        console.log("file is underprocess", error);
      });
    });
  }
};
