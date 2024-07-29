import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { url } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const searchTrains = async () => {
    try {
      let data = await axios.get(
        `${url}/api/trains/availability?source=${source}&destination=${destination}`
      );
      setTrains(data.data);
      if (data.status === 201) {
        toast({ description: "No trains found!", status: "error" });
      } else if (data.status === 200) {
        navigate("/trains", { state: data.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      bgImage={
        "url('https://www.irctc.co.in/nget/home_page_banner1.e6749c3d9698d1ac7608.jpg')"
      }
    >
      <Navbar />
      <Box display={"flex"} flexDir={"column"} color={"#333"}>
        {/* Book Train */}
        <Box
          w={"45%"}
          h={"100%"}
          bgColor={"#fff"}
          mt={"4rem"}
          display={"flex"}
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={"1.5rem"}
          pb={"2.5rem"}
          ml={"2rem"}
          boxShadow={"0 0 3px #ddd"}
          borderRadius={"0.2rem"}
        >
          <Box>
            <Text fontSize={"1.8rem"} fontWeight={"700"} color={"#2B519A"}>
              BOOK TICKET
            </Text>
          </Box>
          {/* To and From */}
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"1rem"}
            mt={"2rem"}
            flexDir={"column"}
            w={"100%"}
          >
            <Box w={"60%"}>
              <InputGroup
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <InputLeftElement>
                  <i class="fa-solid fa-location-arrow"></i>
                </InputLeftElement>
                <Input
                  placeholder="From"
                  borderColor={"#555"}
                  borderRadius={"5"}
                  w={"100%"}
                  value={source}
                  onChange={(e) => {
                    setSource(e.target.value);
                  }}
                />
              </InputGroup>
            </Box>
            <Text transform={"rotate(90deg)"}>
              <i className="fa-solid fa-right-left"></i>
            </Text>
            <Box
              w={"100%"}
              display={"flex"}
              alignItems={"center"}
              gap={"1rem"}
              flexDir={"column"}
            >
              <Box w={"60%"}>
                <InputGroup
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <InputLeftElement>
                    <i class="fa-solid fa-location-dot"></i>
                  </InputLeftElement>
                  <Input
                    w={"100%"}
                    placeholder="To"
                    borderColor={"#555"}
                    borderRadius={"5"}
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                    }}
                  />
                </InputGroup>
              </Box>
            </Box>
          </Box>
          <Box
            mt={"2rem"}
            w={"100%"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Button
              w={"60%"}
              bgColor={"#2B519A"}
              color={"#f5f5f5"}
              _hover={{ bgColor: "#334580" }}
              onClick={searchTrains}
            >
              Search
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
