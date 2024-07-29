const { Train } = require("../db/models/Train");

const addTrain = async (req, res) => {
  try {
    const {
      name,
      source,
      destination,
      capacity,
      arrivalTime,
      destinationTime,
    } = req.body;

    const newTrain = await Train.create({
      name,
      source,
      destination,
      capacity,
      arrivalTime,
      destinationTime,
    });

    if (newTrain) {
      res
        .status(200)
        .send({ message: "Train added successfully!", train_id: newTrain._id });
    }
    console.log("Train added successfully");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { addTrain };
