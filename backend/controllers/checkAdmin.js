const checkAdmin = async (req, res) => {
  try {
    let validAdmin = req.headers["authorization"].split(" ")[1];
    if (validAdmin === process.env.ADMIN_TOKEN) {
      res.status(200).send({ message: "Admin is valid" });
    } else {
      res.status(401).send({ message: "Invalid Admin" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { checkAdmin };
