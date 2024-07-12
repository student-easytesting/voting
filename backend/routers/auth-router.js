const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const { adminSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.route("/").get(authControllers.home);
router.route("/cities").get(authControllers.Cities);
router.route("/candidates").get(authControllers.Candidates);
router.route("/citypost").post(authControllers.CityId);
router.route("/login").post(validate(adminSchema), authControllers.login);
router
  .route("/register")
  .post(
    validate(adminSchema),
    authMiddleware,
    adminMiddleware,
    authControllers.register
  );
router.route("/voter").post(authControllers.voter);

module.exports = router;
