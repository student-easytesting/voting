const express = require("express");
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, adminMiddleware, adminController.checkAdmin);

router
  .route("/voter")
  .get(authMiddleware, adminMiddleware, adminController.getVoter);

router
  .route("/delete")
  .get(authMiddleware, adminMiddleware, adminController.deleteAll);

// router
//   .route("/users/update/:id")
//   .patch(authMiddleware, adminMiddleware, adminController.updateUserById);

// router
//   .route("/users/delete/:id")
//   .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

// router
//   .route("/contacts")
//   .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

// router
//   .route("/contacts/delete/:id")
//   .delete(authMiddleware, adminMiddleware, adminController.deleteContactById);

module.exports = router;
