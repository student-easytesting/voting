const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
  //   name: {
  //     type: String,
  //     require: true,
  //   },
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
  wallet: {
    type: String,
    require: true,
  },
});

// define the model or the collection name
const Voter = new mongoose.model("Voter", voterSchema);
module.exports = Voter;
