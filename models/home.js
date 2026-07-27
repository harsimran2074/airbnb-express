const fs = require("fs");
const registeredHomes = [];
const { ObjectId } = require("mongodb");
const path = require("path");
const db = require("../utils/database");
const { getdb } = require("../utils/database");
module.exports = class Home {
  constructor(homeName, homeprice, homeRating, description, _id) {
    this.homeName = homeName;
    this.homeprice = homeprice;
    this.homeRating = homeRating;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const updateField = {
      homeName: this.homeName,
      homeprice: this.homeprice,
      homeRating: this.homeRating,
      description: this.description,
    };

    if (this._id) {
      const db = getdb();
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateField },
        );
    }
    const db = getdb();

    return db.collection("homes").insertOne(this);
  }

  static fetchAll(callback) {
    const db = getdb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId, callback) {
    const db = getdb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId, callback) {
    const db = getdb();
    return db.collection("homes").deleteOne({ _id: new ObjectId(homeId) });
  }
};
