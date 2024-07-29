import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { url } from "../utils/constants";

const Register = () => {
  const [user, setUser] = useState({ uname: "", email: "", password: "" });
  const toast = useToast();

  const registerUser = async () => {
    try {
      let data = await axios.post(`${url}/api/signup`, user);
      console.log(data);
      if (data.status === 200) {
        toast({
          description: "User registered successfully. Please Login.",
          status: "success",
        });
      }
    } catch (e) {
      console.log(e);
      if (e?.response?.status === 401) {
        toast({ description: "User already exists", status: "error" });
      }
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      w={"100%"}
      gap={"1rem"}
      mt={"1rem"}
      color={"#333"}
    >
      <Box>
        <FormLabel
          mb={"0.3rem"}
          fontSize={"0.9rem"}
          htmlFor="email"
          color={"#2B519A"}
        >
          Email address
        </FormLabel>
        <Input
          placeholder="Enter your email address"
          id="email"
          value={user.email}
          name="email"
          onChange={(e) => {
            setUser((prevVal) => {
              return { ...prevVal, [e.target.name]: e.target.value };
            });
          }}
        />
      </Box>
      <Box>
        <FormLabel
          mb={"0.3rem"}
          fontSize={"0.9rem"}
          htmlFor="username"
          color={"#2B519A"}
        >
          Username
        </FormLabel>
        <Input
          placeholder="Enter Username"
          id="username"
          value={user.uname}
          name="uname"
          onChange={(e) => {
            setUser((prevVal) => {
              return { ...prevVal, [e.target.name]: e.target.value };
            });
          }}
        />
      </Box>
      <Box>
        <FormLabel
          mb={"0.3rem"}
          fontSize={"0.9rem"}
          htmlFor="password"
          color={"#2B519A"}
        >
          Password
        </FormLabel>
        <Input
          placeholder="Enter Password"
          id="password"
          value={user.password}
          name="password"
          onChange={(e) => {
            setUser((prevVal) => {
              return { ...prevVal, [e.target.name]: e.target.value };
            });
          }}
        />
      </Box>
      <Box w={"100%"} mt={"1rem"}>
        <Button
          w={"100%"}
          fontSize={"1.1rem"}
          bgColor={"#2B519A"}
          color={"#f5f5f5"}
          onClick={registerUser}
          _hover={{ bgColor: "#252994" }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
