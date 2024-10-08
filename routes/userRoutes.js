const express = require("express");
const {
  getAllusers,
  registerController,
  loginController,
} = require("../controllers/userController");

const router = express.Router();

router.get("/all-users", getAllusers);
router.post("/register", registerController);
router.get("/login", loginController);

module.exports = router;
