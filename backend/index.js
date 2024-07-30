const express = require("express");
const { registerUser } = require("./controllers/register");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connection/connect");
const { loginUser } = require("./controllers/login");
const { getTrains } = require("./controllers/getTrains");
const { adminLogin } = require("./controllers/adminLogin");
const { addTrain } = require("./controllers/addTrain");
const { checkAdmin } = require("./controllers/checkAdmin");
const { bookTrain } = require("./controllers/bookTrain");
const { authUser } = require("./middleware/authUser");
const { Train } = require("./db/models/Train");
const { Booking } = require("./db/models/Booking");
const { getUserBookings } = require("./controllers/getUserBookings");
const { getSpecificTrain } = require("./controllers/getSpecificTrain");
const { getTrain } = require("./controllers/getTrain");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

connectDB();

app.post("/api/signup", registerUser);
app.post("/api/login", loginUser);
app.get("/api/trains/availability", getTrains);
app.post("/api/admin", adminLogin);
app.post("/api/trains/create", addTrain);
app.post("/api/trains/:trainId/book", authUser, bookTrain);
app.get("/api/check/admin", checkAdmin);
app.get("/api/trains/get-bookings", authUser, getUserBookings);
app.get("/api/bookings/:bookingId", authUser, getSpecificTrain);
app.get("/api/trains/:trainId", getTrain);
// Testing
app.get("/getAllTrains", async (req, res) => {
  let data = await Train.find();
  res.send(data);
});

app.get("/getAllBookings", async (req, res) => {
  let data = await Booking.find();
  res.send(data);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
