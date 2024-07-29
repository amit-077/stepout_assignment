import { Box, Button, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import BoxModal from "./BoxModal";

const ListTrain = ({
  train,
  setUserToken,
  userToken,
  userId,
  searchTrains,
}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bookTrain = async () => {
    try {
      const token = localStorage.getItem("stepout_token");
      setUserToken(token);
      if (!token) {
        toast({ description: "Please login first", status: "error" });
      } else {
        console.log(train._id);
        onOpen();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box w={"100%"} border={"1px solid"} pb={"1rem"}>
      {/* first row */}
      <BoxModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        train={train}
        token={userToken}
        userId={userId}
        searchTrains={searchTrains}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pl={"2rem"}
        pr={"2rem"}
        bgColor={"#f5f5f5"}
        pt={"0.3rem"}
        pb={"0.3rem"}
      >
        <Text fontSize={"1.4rem"} fontWeight={"600"}>
          {train?.name}&nbsp;({train?._id.substr(-6, 6)})
        </Text>
        <Text display={"flex"} alignItems={"center"} fontSize={"1.1rem"}>
          Runs On:&nbsp;
          <Text fontSize={"1.1rem"} letterSpacing={"0.5rem"} fontWeight={"600"}>
            MTWTFSS
          </Text>
        </Text>
        <Text display={"flex"} alignItems={"center"}>
          Capacity :&nbsp;
          <Text fontSize={"1.1rem"} fontWeight={"600"}>
            {train?.capacity}
          </Text>
        </Text>
      </Box>
      {/* second row */}
      <Box
        pt={"1rem"}
        pl={"2rem"}
        pr={"2rem"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontSize={"1.5rem"} fontWeight={"600"}>
          {train?.arrivalTime}&nbsp;|&nbsp;{train?.source}
        </Text>
        <Text fontSize={"1.3rem"}>
          {/* <i className="fa-solid fa-arrow-right-long"></i> */}
          ______________
        </Text>
        <Text fontSize={"1.5rem"} fontWeight={"600"}>
          {train?.destinationTime}&nbsp;|&nbsp;{train?.destination}
        </Text>
      </Box>
      {/* Book Button */}
      <Box pl={"2rem"} pr={"2rem"} mt={"1.5rem"}>
        <Button
          bgColor={"#2B519A"}
          color={"#f5f5f5"}
          _hover={{ bgColor: "#252994" }}
          onClick={bookTrain}
        >
          Book Now{" "}
        </Button>
      </Box>
    </Box>
  );
};

export default ListTrain;
