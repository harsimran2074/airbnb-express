const mongoose = require("mongoose");
const favourites = require("./favourites");

const homeSchema = mongoose.Schema({
  homeName : {type: String, required: true}, 
  homeprice : {type: Number, required: true}, 
  homeRating : {type: Number, required: true}, 
  description : {type: String, required: true}, 
 imageUrl : {type: String, required: true}

})
  
homeSchema.pre('findOneAndDelete', async function() {
  console.log('Came to pre hook while deleting a home');
  const homeId = this.getQuery()._id;
  await favourites.deleteMany({ homeId: homeId });
});

module.exports = mongoose.model("Home", homeSchema);