import {
  Box,
  Button,
  FormLabel,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const AddTrain = () => {
  const [pageLoading, setPageLoading] = useState(false);

  const navigate = useNavigate();
  const [trainId, setTrainId] = useState("");
  const checkAdminLogin = async () => {
    setPageLoading(true);
    try {
      const adminToken = localStorage.getItem("stepout_token");
      let data = await axios.get(`${url}/api/check/admin`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      console.log(data);
      if (data.status !== 200) {
        console.log("Invalid token");
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status !== 200) {
        navigate("/admin-login");
      }
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    checkAdminLogin();
  }, []);

  const [train, setTrain] = useState({
    name: "",
    source: "",
    destination: "",
    capacity: "",
    arrivalTime: "",
    destinationTime: "",
    trainId: "",
  });

  const toast = useToast();

  const addTrain = async () => {
    try {
      let data = await axios.post(`${url}/api/trains/create`, {
        train,
        trainId,
      });
      if (data.status === 200) {
        toast({ description: "Train added successfully!", status: "success" });
      } else if (data.status === 203) {
        toast({
          description: "Train Updated successfully!",
          status: "success",
        });
      } else {
        toast({
          description: "An error occured!",
          status: "error",
        });
      }
    } catch (e) {
      console.log(e);
      toast({
        description: "An error occured, please try again later",
        status: "error",
      });
    }
  };

  const fetchTrain = async () => {
    try {
      let { data } = await axios.get(`${url}/api/trains/${trainId}`);
      console.log(data);
      let {
        name,
        source,
        destination,
        capacity,
        destinationTime,
        arrivalTime,
      } = data;

      setTrain({
        name: name,
        source: source,
        destination,
        capacity,
        destinationTime,
        arrivalTime,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      w={"100vw"}
      minH={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      gap={"1rem"}
      bgImage={
        !pageLoading
          ? "url('https://www.irctc.co.in/nget/home_page_banner1.e6749c3d9698d1ac7608.jpg')"
          : null
      }
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      {pageLoading && (
        <Box>
          <Spinner size={"xl"} thickness="3px" />
        </Box>
      )}
      {/* Heading */}
      {!pageLoading && (
        <Box
          w={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          bgColor={"#2B519A"}
          color={"#fff"}
          borderRadius={"0.2rem"}
          pt={"0.5rem"}
          pb={"0.5rem"}
          mt={"2rem"}
        >
          <Text fontSize={"2.2rem"}>ADD TRAIN</Text>
        </Box>
      )}
      {/* Fields */}
      {!pageLoading && (
        <Box
          w={"50%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
          bgColor={"#fff"}
          pt={"1.5rem"}
          pb={"3rem"}
          borderRadius={"0.3rem"}
          boxShadow={"0 0 3px #ddd"}
          gap={"1rem"}
          mb={"3rem"}
        >
          <Box w={"70%"}>
            <Input
              placeholder="Enter Train ID to update train"
              name="trainId"
              onChange={(e) => {
                setTrainId(e.target.value);
                setTrain((prevVal) => {
                  return { ...prevVal, [e.target.name]: e.target.value };
                });
              }}
            />
          </Box>
          <Box w={"70%"}>
            <Input
              placeholder="Enter Train Name"
              name="name"
              onChange={(e) => {
                setTrain((prevVal) => {
                  return { ...prevVal, [e.target.name]: e.target.value };
                });
              }}
              value={train.name}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1rem"}
            w={"70%"}
          >
            <Box>
              <Input
                placeholder="Enter Source"
                name="source"
                onChange={(e) => {
                  setTrain((prevVal) => {
                    return { ...prevVal, [e.target.name]: e.target.value };
                  });
                }}
                value={train.source}
              />
            </Box>
            <Box>
              <Text>
                <i className="fa-solid fa-right-left"></i>
              </Text>
            </Box>
            <Box>
              <Input
                placeholder="Enter Destination"
                name="destination"
                onChange={(e) => {
                  setTrain((prevVal) => {
                    return { ...prevVal, [e.target.name]: e.target.value };
                  });
                }}
                value={train.destination}
              />
            </Box>
          </Box>
          {/* Seat capacity */}
          <Box
            display={"flex"}
            justifyContent={"left"}
            alignItems={"left"}
            w={"70%"}
            flexDir={"column"}
          >
            <FormLabel fontWeight={"500"} fontSize={"0.9rem"}>
              Seat capacity
            </FormLabel>
            <Input
              placeholder="eg: 100"
              w={"100%"}
              type="number"
              min={10}
              max={100}
              name="capacity"
              onChange={(e) => {
                setTrain((prevVal) => {
                  return { ...prevVal, [e.target.name]: e.target.value };
                });
              }}
              value={train.capacity}
            />
          </Box>
          {/* Arrival Time */}
          <Box
            display={"flex"}
            justifyContent={"left"}
            alignItems={"left"}
            w={"70%"}
            flexDir={"column"}
          >
            <FormLabel fontWeight={"500"} fontSize={"0.9rem"}>
              Arrival Time (Source)
            </FormLabel>
            <Input
              placeholder="eg: 100"
              w={"100%"}
              type="time"
              id="arrivalTime"
              name="arrivalTime"
              step={"10"}
              onChange={(e) => {
                setTrain((prevVal) => {
                  return { ...prevVal, [e.target.name]: e.target.value };
                });
              }}
              value={train.arrivalTime}
            />
          </Box>
          {/* Departure Time */}
          <Box
            display={"flex"}
            justifyContent={"left"}
            alignItems={"left"}
            w={"70%"}
            flexDir={"column"}
          >
            <FormLabel fontWeight={"500"} fontSize={"0.9rem"}>
              Arrival Time (Destination)
            </FormLabel>
            <Input
              placeholder="eg: 100"
              w={"100%"}
              type="time"
              id="destinationTime"
              name="destinationTime"
              step={"10"}
              onChange={(e) => {
                setTrain((prevVal) => {
                  return { ...prevVal, [e.target.name]: e.target.value };
                });
              }}
              value={train.destinationTime}
            />
          </Box>
          <Box
            w={"70%"}
            mt={"1rem"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={"1rem"}
          >
            <Button colorScheme="blue" w={"100%"} onClick={addTrain}>
              Add Train
            </Button>
            <Button colorScheme="blue" w={"100%"} onClick={fetchTrain}>
              Fetch Train
            </Button>
            <Button colorScheme="orange" w={"100%"} onClick={addTrain}>
              Update a Train
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AddTrain;
