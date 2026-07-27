const fs = require("fs");
const registeredHomes = [];
const path = require("path");
    const db = require("../utils/database");
const { getdb } = require("../utils/database");
const { ObjectId } = require("mongodb");



module.exports = class favourite{

constructor(homeId){
  this.homeId = homeId;
}


save(){
const db = getdb();
return db.collection("favourites").find({homeId: this.homeId}).toArray().then((favouriteExist)=>{
if(!favouriteExist){


    const db = getdb();
    return db.collection('favourites').insertOne(this);
}else {
  console.log("already exist");
}

});

}


  static removefromfavourite(delhomeId) {
   
       const db = getdb();
       return db.collection("favourites").deleteOne({ homeId: delhomeId});
  }

  static getFavourites(callback) {
    //readFile.....
const db = getdb();
return db.collection("favourites").find().toArray();
  }

  static findById(homeId , callback){  
    

};

}