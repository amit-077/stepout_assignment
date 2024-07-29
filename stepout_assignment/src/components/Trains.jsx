import { Box, Button, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ListTrain from "./ListTrain";
import axios from "axios";
import { url } from "../utils/constants";

const Trains = () => {
  let { state } = useLocation();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [trains, setTrains] = useState([]);
  const [userToken, setUserToken] = useState("");
  const toast = useToast();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userid = localStorage.getItem("stepout_user");
    setUserId(userid);
    const token = localStorage.getItem("stepout_token");
    setUserToken(token);
    console.log(token);
  }, []);

  const searchTrains = async () => {
    try {
      let data = await axios.get(
        `${url}/api/trains/availability?source=${source}&destination=${destination}`
      );
      console.log(data.data);
      setTrains(data.data.trains);
      if (data.status === 201) {
        toast({ description: "No trains found!", status: "error" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (state && state.trains) {
      setSource(state.trains[0].source);
      setDestination(state.trains[0].destination);
      setTrains(state.trains);
    }
  }, []);

  return (
    <Box w={"100vw"} minH={"100vh"}>
      <Navbar />
      {/* Search bar */}
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"90%"}
        pt={"1rem"}
        pb={"1rem"}
        margin={"auto"}
        mt={"2rem"}
        gap={"5rem"}
        bgColor={"#2B519A"}
      >
        {/* Search bar */}
        <Box display={"flex"} justifyContent={"center"} gap={"3rem"}>
          <Box>
            <Input
              placeholder="Source"
              bgColor={"#f5f5f5"}
              id="source"
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
              }}
            />
          </Box>
          <Text display={"flex"} alignItems={"center"} color={"#f5f5f5"}>
            <i className="fa-solid fa-right-left"></i>
          </Text>
          <Box>
            <Input
              placeholder="Destination"
              bgColor={"#f5f5f5"}
              id="destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
          </Box>
        </Box>
        <Box>
          <Button
            colorScheme="blue"
            pl={"3rem"}
            pr={"3rem"}
            onClick={searchTrains}
          >
            Search
          </Button>
        </Box>
      </Box>
      {/* All trains */}
      <Box
        w={"90%"}
        display={"flex"}
        margin={"auto"}
        mt={"2rem"}
        flexDir={"column"}
        gap={"2rem"}
        mb={"3rem"}
      >
        {trains?.map((train) => {
          return (
            <ListTrain
              train={train}
              setUserToken={setUserToken}
              userToken={userToken}
              userId={userId}
              searchTrains = {searchTrains}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Trains;
