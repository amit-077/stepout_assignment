const { User } = require("../db/models/User");

const registerUser = async (req, res) => {
  try {
    let { uname, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(401).send("User already exists");
    }

    const data = await User.create({
      username: uname,
      email,
      password,
    });

    if (data) {
      res.status(200).send(data._id);
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { registerUser };
