const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

let  _db;
const mongodbUrl = "mongodb+srv://harsimran2074handa_db_user:vCaoHmhUuzKDIUtu@cluster0.4dv16em.mongodb.net"

const mongoConnect = (callback) => {
   MongoClient.connect(mongodbUrl).then(client => {
      _db = client.db("airbnb-mongo");
      
      callback(client);
   }).catch(err => {
      console.log(err);
      console.log("could not connect to database");
   })
}

const getdb = () => {
   if(!_db){
      throw new Error("No database found");
   }else {
      return _db
   }
}

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;