const UserCollection = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
  let { name, email, password, role } = req.body;

  if (password.length < 6 || password.length > 12) {
    return res.json({
      msg: "Password length cannot be less than 6 and more than 12",
    });
  }
  if (!name) {
    return res.json({ msg: "Name is required", status: false });
  }
  if (!email) {
    return res.json({ msg: "Email is required", status: false });
  }
  if (!password) {
    return res.json({ msg: "Password is required", status: false });
  }

  let findUser = await UserCollection.findOne({ email });

  if (findUser) {
    return res.json({ msg: "User already registered", status: false });
  } else {
    try {
      let hashedPassword = bcrypt.hashSync(password, salt);
      let data = await UserCollection.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      res
        .status(201)
        .json({ msg: "User registered successfully", success: true, data });
    } catch (error) {
      res.status(500).json({
        msg: "Error in registering User",
        success: false,
        error: error.message,
      });
    }
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let findUser = await UserCollection.findOne({ email });
  try {
    if (findUser) {
      let comparedPassword = bcrypt.compareSync(password, findUser.password);
      if (comparedPassword) {
        let token = jwt.sign(
          { _id: findUser._id, role: findUser.role },
          process.env.JWT_SECRET
        );
        res
          .status(200)
          .json({ msg: "Login successfully", success: true, token: token });
      } else {
        return res.json({ msg: "Wrong password", success: false });
      }
    } else {
      return res.json({ msg: "User not found", success: false });
    }
  } catch (error) {
    res.status(401).json({
      msg: "Error in logging",
      success: false,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { name, password, bio, profession } = req.body;
  try {
    let { _id, role } = req.user;
    let userId = req.params._id;
    console.log("Login user id = ", _id);
    console.log("Params id = ", userId);
    if (_id == userId) {
      if (password) {
        var hashedPassword = bcrypt.hashSync(password, salt);
      }
      let data = await UserCollection.findByIdAndUpdate(_id, {
        $set: { name, password: hashedPassword, bio, profession },
      });
      res
        .status(200)
        .json({ msg: "User updated successfully", success: true, data });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error updating user ",
      success: false,
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { _id, role } = req.user;

  try {
    let paramsId = req.params._id;
    console.log("Login user id = ", _id);
    console.log("Params id = ", paramsId);
    if (_id == paramsId) {
      let data = await UserCollection.findByIdAndDelete(_id);
      res.status(200).json({ msg: "User deleted successfully", success: true });
    } else {
      res.status(403).json({ msg: "User not authorized", success: false });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error deleting user ",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
