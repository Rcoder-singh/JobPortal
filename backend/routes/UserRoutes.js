const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

router.post("/create", registerUser);
router.post("/login", loginUser);
router.put("/update/:_id", checkToken, updateUser);
router.delete("/delete/:_id",checkToken, deleteUser);

module.exports = router;
