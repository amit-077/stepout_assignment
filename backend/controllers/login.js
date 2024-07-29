const { User } = require("../db/models/User");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(402).send("User not found");
    }
    const token = generateToken(userExists._id);

    if (userExists.password === password) {
      res
        .status(200)
        .send({ token, userId: userExists._id, message: "Login Successful" });
      return;
    }
    res.status(401).send("Wrong credentials");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { loginUser };
