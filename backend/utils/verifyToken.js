const jwt = require("jsonwebtoken");

const verifyToken = async (token) => {
  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      return verified
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { verifyToken };
