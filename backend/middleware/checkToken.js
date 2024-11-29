const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("Token from checkToken:", token);

    if (!token) {
      return res.json({ msg: "Token not found", success: false });
    }

    let decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedToken", decodedToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.json({ msg: "Invalid Token", success: false });
  }
};

module.exports = checkToken;
