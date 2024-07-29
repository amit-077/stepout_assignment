const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    return token;
  } catch (e) {
    console.log(e);
  }
};

module.exports = { generateToken };
