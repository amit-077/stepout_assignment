const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.status(200).send({
        message: "LoggedIn successfully",
        token: process.env.ADMIN_TOKEN,
      });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { adminLogin };
