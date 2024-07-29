import { Box, Spinner, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import BookingBox from "./BookingBox";
import { url } from "../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("stepout_token");
    if (!token) {
      toast({ description: "Please login", status: "error" });
      navigate("/user/login");
    }
  }, []);

  const getBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("stepout_token");
      let data = await axios.get(`${url}/api/trains/get-bookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.status === 200) {
        setBookings(data.data.bookings);
        console.log(data);
      }
      if (data.status === 201) {
        toast({
          description: "No bookings listed",
          status: "success",
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      bgImage={
        "url('https://www.irctc.co.in/nget/home_page_banner1.e6749c3d9698d1ac7608.jpg')"
      }
      bgSize={"cover"}
    >
      <Navbar />
      <Box pl={"3rem"} pr={"3rem"} pt={"2rem"}>
        <Box>
          <Text
            fontSize={"2rem"}
            fontWeight={"700"}
            textDecoration={"underline"}
          >
            My Bookings
          </Text>
        </Box>
        {/* List all bookings */}
        {!loading && (
          <Box mt={"1.5rem"} display={"flex"} flexDir={"column"} gap={"1.5rem"} pb={'2rem'}>
            {bookings.map((train) => {
              return <BookingBox train={train} />;
            })}
          </Box>
        )}
        {loading && (
          <Box
            w={"100%"}
            h={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Spinner size={"xl"} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Bookings;
