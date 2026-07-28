const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  homeId : {type:mongoose.Schema.Types.ObjectId , ref:"Home" , unique: true , required: true},
})



module.exports = mongoose.model("favourite", homeSchema);


// save(){
// const db = getdb();
// return db.collection("favourites").find({homeId: this.homeId}).toArray().then((favouriteExist)=>{
// if(!favouriteExist){


//     const db = getdb();
//     return db.collection('favourites').insertOne(this);
// }else {
//   console.log("already exist");
// }

// });

// }


//   static removefromfavourite(delhomeId) {
   
//        const db = getdb();
//        return db.collection("favourites").deleteOne({ homeId: delhomeId});
//   }

//   static getFavourites(callback) {
//     //readFile.....
// const db = getdb();
// return db.collection("favourites").find().toArray();
//   }

//   static findById(homeId , callback){  
    

// };

// }