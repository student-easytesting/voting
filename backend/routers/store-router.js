const express = require("express");
const { store, service } = require("../controllers/store-controller");
const router = express.Router();

router.route("/store").post(store);
router.route("/service").post(service);

module.exports = router;
