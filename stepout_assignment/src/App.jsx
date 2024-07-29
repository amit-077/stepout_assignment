import { Box } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Form from "./components/Form";
import Home from "./components/Home";
import Trains from "./components/Trains";
import Admin from "./components/Admin";
import AddTrain from "./components/AddTrain";
import Bookings from "./components/Bookings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/login" element={<Form />} />
        <Route path="/trains" element={<Trains />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<Admin />} />
        <Route path="/train/add-train" element={<AddTrain />} />
        <Route path="/user/bookings" element={<Bookings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
