import {
  Box,
  Button,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { url } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ uname: "", email: "", password: "" });
  const toast = useToast();
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      let data = await axios.post(`${url}/api/login`, user);
      console.log(data);
      if (data) {
        localStorage.setItem("stepout_token", data.data.token);
        localStorage.setItem("stepout_user", data.data.userId);
        navigate("/");
      }
      if (data.status === 200) {
        toast({
          description: "LoggedIn successfully",
          status: "success",
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
      if (e?.response.status === 402) {
        toast({ description: "User does not exist!", status: "error" });
      } else if (e?.response.status === 401) {
        toast({ description: "Invalid credentials", status: "error" });
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
          placeholder="Enter email address"
          id="email"
          name="email"
          value={user?.email}
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
          name="password"
          value={user?.password}
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
          _hover={{ bgColor: "#252994" }}
          onClick={loginUser}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
