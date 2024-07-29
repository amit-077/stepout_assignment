import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("stepout_token");
    setToken(userToken);
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem("stepout_token");
    localStorage.removeItem("stepout_user");
    location.reload();
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      pl={"3rem"}
      pr={"3rem"}
      alignItems={"center"}
      pt={"1rem"}
      pb={"1rem"}
      bgColor={"#fff"}
    >
      <Box>
        <Text fontSize={"1.6rem"} fontWeight={"800"} cursor={"pointer"}>
          <Link to={"/"}>IRCTC</Link>
        </Text>
      </Box>
      <Box display={"flex"} alignItems={"center"} gap={"2rem"}>
        {!token && (
          <Box fontSize={"1.1rem"}>
            <Link to={"/user/login"}>Register</Link>
          </Box>
        )}
        {!token && (
          <Box fontSize={"1.1rem"}>
            <Link to={"/user/login"}>Login</Link>
          </Box>
        )}
        <Box fontSize={"1.1rem"}>
          <Link to={"/admin-login"}>Admin Login</Link>
        </Box>
        <Box fontSize={"1.1rem"}>
          <Link to={"/user/bookings"}>My Bookings</Link>
        </Box>
        <Box fontSize={"1.1rem"}>
          <Link>Contact Us</Link>
        </Box>
        {token && (
          <Box fontSize={"1.1rem"}>
            <Link onClick={logoutUser}>Logout</Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
