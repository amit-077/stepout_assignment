const { Train } = require("../db/models/Train");

const getTrains = async (req, res) => {
  try {
    const { source, destination } = req.query;
    const trains = await Train.find({ source, destination });
    if (trains.length > 0) {
      res.status(200).send({ trains });
    } else {
      res.status(201).send({ message: "No trains found" });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getTrains };
