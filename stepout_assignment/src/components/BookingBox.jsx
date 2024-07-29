import {
  Badge,
  Box,
  Button,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import { url } from "../utils/constants";

const BookingBox = ({ train }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currTrain, setCurrTrain] = useState({});

  const getTrainDetail = async () => {
    try {
      const token = localStorage.getItem("stepout_token");
      let data = await axios.get(`${url}/api/bookings/${train?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      if (data.status === 200) {
        setCurrTrain(data.data);
        onOpen();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={"2rem"}
      bgColor={"#fff"}
      pt={"2rem"}
      pb={"2rem"}
      boxShadow={"0 0 2px #ccc"}
      pl={"1.5rem"}
      pr={"1.5rem"}
    >
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton color={"#f5f5f5"} />
          <ModalBody p={0}>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              w={"100%"}
              h={"100%"}
              pb={"3rem"}
            >
              <Box
                bgColor={"#2B519A"}
                w={"100%"}
                h={"100%"}
                display={"flex"}
                justifyContent={"center"}
                pt={"1rem"}
                pb={"1rem"}
              >
                <Text fontSize={"1.5rem"} color={"#f5f5f5"} fontWeight={"700"}>
                  TRAIN DETAILS
                </Text>
              </Box>
              <Box
                display={"flex"}
                flexDir={"column"}
                fontSize={"1.2rem"}
                gap={"1rem"}
                mt={"2rem"}
              >
                <Box>
                  <Text>Booking ID : {currTrain.bookingId}</Text>
                </Box>
                <Box>
                  <Text>Train ID : {currTrain.trainId}</Text>
                </Box>
                <Box>
                  <Text>Train Name : {currTrain.trainName}</Text>
                </Box>
                <Box>
                  <Text>No. of seats : {currTrain.noOfSeats}</Text>
                </Box>
                <Box>
                  <Text display={"flex"} gap={"1rem"}>
                    Seats :{" "}
                    <Box display={"flex"} gap={"0.5rem"}>
                      {currTrain.seats?.map((seat) => {
                        return <Badge fontSize={"1rem"}>{seat}</Badge>;
                      })}
                    </Box>
                  </Text>
                </Box>
                <Box>
                  <Text>Arrival Time : {currTrain.arrivalTime}</Text>
                </Box>
                <Box>
                  <Text>Departure Time : {currTrain.destinationTime}</Text>
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      {/* Modal */}
      {/* Train logo */}
      <Box w={"6rem"} h={"6rem"}>
        <Image src="https://iconape.com/wp-content/png_logo_vector/train.png" />
      </Box>
      {/* Train details */}
      <Box display={"flex"} flexDir={"column"} gap={"0.2rem"} w={"100%"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={"100%"}
        >
          <Text fontSize={"1.2rem"} fontWeight={"700"}>
            {train?.trainID.name} ({train?.trainID._id.substr(-6, 6)})
          </Text>
          <Text fontWeight={"600"}>
            BOOKING ID : {train?._id.substr(-6, 6)}
          </Text>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
          <Text fontSize={"1.2rem"}>
            {train?.trainID.source} | {train?.trainID.arrivalTime}
          </Text>
          <Text>
            <i className="fa fa-arrow-right"></i>
          </Text>
          <Text fontSize={"1.2rem"}>
            {train?.trainID.destination} | {train?.trainID.destinationTime}
          </Text>
        </Box>
        <Box mt={"1rem"} display={"flex"} alignItems={"center"}>
          <Text fontSize={"1.1rem"} fontWeight={"600"}>
            Seats Booked :&nbsp;
          </Text>
          <Box display={"flex"} alignItems={"center"} gap={"0.7rem"}>
            {train?.seats.map((seat) => {
              return <Badge fontSize={"1rem"}>{seat}</Badge>;
            })}
          </Box>
        </Box>
        <Box mt={"1rem"}>
          <Button
            transform={"scale(0.8)"}
            colorScheme="blue"
            onClick={() => {
              //   onOpen();
              getTrainDetail();
            }}
          >
            GET DETAILS
          </Button>
          <Button transform={"scale(0.8)"} colorScheme="orange">
            Download E-ticket
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingBox;
