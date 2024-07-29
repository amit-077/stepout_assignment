const { verifyToken } = require("../utils/verifyToken");

const authUser = async (req, res, next) => {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    const verified = await verifyToken(token);
    if (verified) {
      req.user = verified.userId;
      next();
    } else {
      res.status(401).send("Unauthorized user");
      return;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { authUser };
