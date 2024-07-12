const axios = require("axios");
const User = require("../models/user-model");
const Voter = require("../models/voter-model");
const Store = require("../models/store-model");
const City = require("../models/city-model");
const bcrypt = require("bcrypt");

// *-------------------
// Home Logic
// *-------------------

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to voting Website using router ");
  } catch (error) {
    console.log(error);
  }
};

// *-------------------
// Registration Logic
// *-------------------

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, password } = req.body;

    const userExist = await User.findOne({ username });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      password,
    });

    res.status(201).json({
      msg: "registration successful",
    });
  } catch (error) {
    res.status(500).json("internal server error");
    // console.log(error);
    // next(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await User.findOne({ username });
    console.log(userExist);

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials " });
    }

    // const user = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

const voter = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, voter, dob, city, wallet } = req.body;
    const data = `${name}${voter}${dob}${city}`;
    // hash the data
    const saltRound = process.env.SALT;
    const hashdata = await bcrypt.hash(data, saltRound);

    const dataExist = await Store.findOneAndDelete({ hashdata });
    const walletExist = await Store.findOne({ hashdata: wallet });

    if (!dataExist || !wallet || walletExist) {
      return res
        .status(400)
        .json({ message: "Data not exists or Invalid wallet address" });
    }

    //city
    const cities = await City.find({});
    const cityNames = cities.map((city) => city.name);
    const index = cityNames.indexOf(city);

    if (index !== -1) {
      const voterCreated = await Voter.create({
        wallet: wallet,
      });

      const dataCreated = await Store.create({
        hashdata: wallet,
      });

      return res.status(201).json({
        msg: "registration successful",
        cityid: index,
      });
    } else {
      return res.status(400).json({
        msg: "registration not successful",
      });
    }
  } catch (error) {
    res.status(500).json("internal server error");
    // console.log(error);
    // next(error);
  }
};

const Cities = async (req, res) => {
  try {
    const cities = await City.find({}).sort({ cityId: 1 });
    const cityNames = cities.map((city) => city.name);
    res.status(200).send(cityNames);
  } catch (error) {
    // console.log(error);
    res.status(500).json("internal server error");
  }
};

const Candidates = async (req, res) => {
  try {
    const cities = await City.find({}).sort({ cityId: 1 });
    const candidates2DArray = cities.map((city) => {
      const candidates = city.candidates;
      return Object.values(candidates);
    });
    res.status(200).send(candidates2DArray);
  } catch (error) {
    // console.log(error);
    res.status(500).json("internal server error");
  }
};
const CityId = async (req, res) => {
  try {
    const { city } = req.body;
    const cities = await City.find({});
    const cityNames = cities.map((city) => city.name);
    const index = cityNames.indexOf(city);

    if (index !== -1) {
      return res.status(200).json({
        cityid: index,
      });
    } else {
      return res.status(400).json({
        msg: "City Invalid",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json("internal server error");
  }
};
module.exports = { home, login, register, voter, Cities, Candidates, CityId };
