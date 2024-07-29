import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { url } from "../utils/constants";

const BoxModal = ({
  isOpen,
  onOpen,
  onClose,
  train,
  token,
  userId,
  searchTrains,
}) => {
  const [seats, setSeats] = useState(0);
  const toast = useToast();

  const confirmTrain = async () => {
    try {
      // userId, token,
      if (seats === 0) {
        toast({ description: "Enter number of seats", status: "error" });
        return;
      }
      console.log(token);

      // console.log(userId, token, seats);
      let data = await axios.post(
        `${url}/api/trains/${train._id}/book`,
        { seats },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(data);

      if (data.status === 200) {
        toast({ description: "Train Booked Successfully", status: "success" });
        searchTrains();
      }
      console.log(data);
    } catch (e) {
      console.log(e);
      if (e.response.status === 404) {
        toast({ description: "Invalid Train!", status: "error" });
      } else if (e.response.status === 401) {
        toast({ description: "Not enough seats!", status: "error" });
      } else {
        toast({
          description: "An error occured, Please try again!",
          status: "error",
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
      <ModalOverlay />
      <ModalContent
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"0.3rem"}
      >
        <ModalHeader
          bgColor={"#252994"}
          color={"#f5f5f5"}
          w={"100%"}
          display={"flex"}
          justifyContent={"center"}
          mb={"1rem"}
          overflow={"hidden"}
          borderTopRadius={"0.3rem"}
        >
          Enter Booking Details
        </ModalHeader>
        <ModalCloseButton color={"#f5f5f5"} />
        <ModalBody w={"100%"}>
          <Box display={"flex"} flexDir={"column"} gap={"1rem"}>
            <Box display={"flex"} alignItems={"center"}>
              <Text fontSize={"1.1rem"}>USER ID :&nbsp;</Text>
              <Input w={"70%"} value={userId} />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Text fontSize={"1.1rem"}>TRAIN ID :&nbsp;</Text>
              <Input w={"70%"} value={train._id.substr(-6, 6)} />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Text fontSize={"1.1rem"}>TRAIN NAME :&nbsp;</Text>
              <Input w={"70%"} value={train.name} />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Text fontSize={"1.1rem"}>Source :&nbsp;</Text>
              <Input w={"70%"} value={train.source} />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Text fontSize={"1.1rem"}>Destination :&nbsp;</Text>
              <Input w={"70%"} value={train.destination} />
            </Box>
            <Box display={"flex"} alignItems={"center"}>
              <Text fontSize={"1.1rem"}>Enter number of seats :&nbsp;</Text>
              <Input
                w={"30%"}
                type="number"
                min={1}
                max={train?.capacity}
                onChange={(e) => {
                  setSeats(e.target.value);
                }}
              />
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              mt={"1.5rem"}
              mb={"2rem"}
              pl={"2rem"}
              pr={"2rem"}
            >
              <Button colorScheme="blue" w={"100%"} onClick={confirmTrain}>
                Confirm Booking
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default BoxModal;
