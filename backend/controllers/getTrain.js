const { Train } = require("../db/models/Train");

const getTrain = async (req, res) => {
  try {
    let { trainId } = req.params;
    let data = await Train.findOne({ _id: trainId });
    res.status(200).send(data);
    console.log(trainId);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getTrain };
