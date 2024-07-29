import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";

const Form = () => {
  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
      color={"#f5f5f5"}
      gap={"1rem"}
      bgImage={"url('https://www.irctc.co.in/nget/home_page_banner1.e6749c3d9698d1ac7608.jpg')"}
    >
      <Box
        color={"#f5f5f5"}
        w={"40%"}
        display={"flex"}
        justifyContent={"center"}
        bgColor={"#2B519A"}
        pt={"0.3rem"}
        pb={"0.3rem"}
        borderRadius={"0.6rem"}
      >
        <Text fontSize={"2.3rem"}>IRCTC PORTAL</Text>
      </Box>
      <Box
        w={"40%"}
        bgColor={"#fff"}
        h={"80%"}
        display={"flex"}
        justifyContent={"center"}
        pt={"2rem"}
        borderRadius={"0.6rem"}
        boxShadow={'0 0 2px #ccc'}
      >
        {/* Tab buttons */}
        <Tabs variant="soft-rounded" colorScheme="green" w={"90%"}>
          <TabList display={"flex"} justifyContent={"space-between"}>
            <Tab
              borderRadius={"20"}
              // bgColor={"#f5f5f5"}
              color={"#333"}
              _selected={{ bgColor: "#2B519A", color: "#f5f5f5" }}
              p={"0.4rem 5rem 0.4rem 5rem"}
            >
              <Text>Register</Text>
            </Tab>
            <Tab
              borderRadius={"20"}
              // bgColor={"#f5f5f5"}
              color={"#333"}
              _selected={{ bgColor: "#2B519A", color: "#f5f5f5" }}
              p={"0.4rem 5rem 0.4rem 5rem"}
            >
              <Text>Login</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel display={"flex"} justifyContent={"center"}>
              <Register />
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default Form;
