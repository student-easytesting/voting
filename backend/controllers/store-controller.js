const bcrypt = require("bcrypt");
const Store = require("../models/store-model");

const store = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, voter, dob, city } = req.body;
    const data = `${name}${voter}${dob}${city}`;
    // hash the data
    const saltRound = process.env.SALT;
    const hashdata = await bcrypt.hash(data, saltRound);

    const dataExist = await Store.findOne({ hashdata });

    if (dataExist) {
      return res.status(400).json({ message: "Data already exists" });
    }
    const dataCreated = await Store.create({
      hashdata: hashdata,
    });
    res.status(201).json({
      msg: "Store successful",
    });
  } catch (error) {
    res.status(500).json("internal server error");
    // console.log(error);
    // next(error);
  }
};

const service = async (req, res) => {
  try {
    // console.log(req.body);
    const { hashdata } = req.body;

    const dataExist = await Store.findOne({ hashdata });

    if (dataExist) {
      return res.status(200).json({ message: "Wallet Registered" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
    // console.log(error);
    // next(error);
  }
};

module.exports = { store, service };
