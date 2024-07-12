const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: String,
  district: String,
  state: String,
  candidates: {
    candidate1: String,
    candidate2: String,
    candidate3: String,
    candidate4: String,
    candidate5: String,
  },
});

const City = new mongoose.model("City", citySchema);

module.exports = City;
