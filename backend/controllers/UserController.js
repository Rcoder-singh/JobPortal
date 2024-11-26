const UserCollection = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
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
        res
          .status(200)
          .json({ msg: "Login successfully", success: true, user: findUser });
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
  res.send("update function is running");
};

const deleteUser = async (req, res) => {
  res.send("delete function is running");
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
