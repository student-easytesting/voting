const User = require("../models/user-model");
const Voter = require("../models/voter-model");
const Store = require("../models/store-model");
const checkAdmin = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};

// // *-------------------------------
// //* getAllUsers Logic 📝
// // *-------------------------------
const getVoter = async (req, res) => {
  try {
    const voters = await Voter.find({});
    console.log(voters);
    if (!voters || voters.length === 0) {
      return res.status(404).json({ message: "No Users Found" });
    }
    await Voter.deleteMany({});
    return res.status(200).json(voters);
  } catch (error) {
    next(error);
  }
};

const deleteAll = async (req, res) => {
  try {
    await Voter.deleteMany({});
    return res.status(200).json({ message: "Voters Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// // *-------------------------------
// //* single user Logic 📝
// // *-------------------------------

// const getUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = await User.findOne({ _id: id }, { password: 0 });
//     return res.status(200).json(data);
//   } catch (error) {
//     next(error);
//   }
// };

// // *-------------------------------
// //* user update Logic 📝
// // *-------------------------------

// const updateUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedUserData = req.body;

//     const updatedData = await User.updateOne(
//       { _id: id },
//       {
//         $set: updatedUserData,
//       }
//     );
//     return res.status(200).json(updatedData);
//   } catch (error) {
//     next(error);
//   }
// };

// // *-------------------------------
// //* user delete Logic 📝
// // *-------------------------------

// const deleteUserById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await User.deleteOne({ _id: id });
//     return res.status(200).json({ message: "User Deleted Successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// // *-------------------------------
// //* getAllContacts Logic 📝
// // *-------------------------------
// const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find();
//     console.log(contacts);
//     if (!contacts || contacts.length === 0) {
//       return res.status(404).json({ message: "No Contacts Found" });
//     }
//     return res.status(200).json(contacts);
//   } catch (error) {
//     next(error);
//   }
// };

// // *-------------------------------
// //* contacts delete Logic 📝
// // *-------------------------------

// const deleteContactById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Contact.deleteOne({ _id: id });
//     return res.status(200).json({ message: "Contact Deleted Successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  checkAdmin,
  getVoter,
  deleteAll,
  // getAllContacts,
  // deleteUserById,
  // getUserById,
  // updateUserById,
  // deleteContactById,
};
