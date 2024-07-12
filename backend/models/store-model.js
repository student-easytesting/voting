const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  hashdata: {
    type: String,
    require: true,
  },
  //   voter: {
  //     type: String,
  //     require: true,
  //   },
  //   dob: {
  //     type: String,
  //     default: false,
  //   },
  //   city: {
  //     type: String,
  //     require: true,
  //   },
});

// define the model or the collection name
const Store = new mongoose.model("Store", storeSchema);
module.exports = Store;
