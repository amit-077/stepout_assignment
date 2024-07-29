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

const Admin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const adminLogin = async () => {
    setLoading(true);
    try {
      let data = await axios.post(`${url}/api/admin`, user);
      console.log(data);
      if (data.status === 200) {
        localStorage.setItem("stepout_token", data?.data.token);
        toast({ description: "LoggedIn as Admin!", status: "success" });
        toast({
          description: "NOTE: ADMIN CANNOT BOOK ANY TRAIN",
          status: "success",
        });
        navigate("/train/add-train");
      }
    } catch (e) {
      console.log(e);
      if (e.response.status === 401) {
        toast({ description: "Invalid credentials", status: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      w={"100vw"}
      minH={"100vh"}
      gap={"1rem"}
      color={"#333"}
      bgImage={
        "url('https://www.irctc.co.in/nget/home_page_banner1.e6749c3d9698d1ac7608.jpg')"
      }
    >
      {/* Heading */}
      <Box
        w={"40%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"#2B519A"}
        color={"#fff"}
        borderRadius={"0.2rem"}
        pt={"0.5rem"}
        pb={"0.5rem"}
      >
        <Text fontSize={"2.2rem"}>ADMIN LOGIN</Text>
      </Box>
      <Box
        w={"40%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        bgColor={"#fff"}
        pt={"3rem"}
        pb={"3rem"}
        borderRadius={"0.3rem"}
        boxShadow={"0 0 3px #ddd"}
        gap={"1rem"}
      >
        <Box w={"80%"}>
          <FormLabel
            mb={"0.3rem"}
            fontSize={"0.9rem"}
            htmlFor="email"
            color={"#2B519A"}
          >
            Email address
          </FormLabel>
          <Input
            placeholder="Enter admin email"
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
        <Box w={"80%"}>
          <FormLabel
            mb={"0.3rem"}
            fontSize={"0.9rem"}
            htmlFor="password"
            color={"#2B519A"}
          >
            Password
          </FormLabel>
          <Input
            placeholder="Enter admin password"
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
        <Box w={"60%"} mt={"2rem"}>
          <Button
            isLoading={loading}
            w={"100%"}
            fontSize={"1.1rem"}
            bgColor={"#2B519A"}
            color={"#f5f5f5"}
            _hover={{ bgColor: "#394B87" }}
            onClick={adminLogin}
          >
            Login as Admin
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;
