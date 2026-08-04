const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
firstName : {type: String, required: true},
lastName : {type: String, required: true},
email : {type: String, required: true},
password : {type: String, required: true},
userType: {type: String,enum: ['host', 'guest'] , default: 'guest' },

})
  

module.exports = mongoose.model("user", userSchema);