import React from "react";
import { Box, Flex, Center, Avatar, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";

const Profile = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const cardBg = useColorModeValue("white", "gray.700");
  const { userInfo } = useContext(AuthContext);

  return (
    <Flex
      py={{ base: "1rem", md: "2rem" }}
      justifyContent="center"
      alignItems="center"
      bg={bg}
    >
      <Box
        textAlign="center"
        maxW={{ base: "90%", md: "400px" }}
        w="100%"
        borderRadius="lg"
        bg={cardBg}
        p={{ base: "0.5rem", md: "2rem" }}
        my={{ base: "8rem", md: "6.2rem" }}
      >
        <Center>
          <Avatar
            size={{ base: "xl", md: "2xl" }}
            name={userInfo.name.charAt(0)}
            src="profile_pic_url"
          />
        </Center>
        <Text mt={4} fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          {userInfo.name}
        </Text>
        <Text mt={2} fontSize={{ base: "md", md: "lg" }} color="gray.600">
          {userInfo.email}
        </Text>
      </Box>
    </Flex>
  );
};

export default Profile;
