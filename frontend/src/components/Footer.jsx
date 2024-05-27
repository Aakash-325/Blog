import { Flex, chakra, Icon } from "@chakra-ui/react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Flex
      bg={bg}
      w="full"
      as="footer"
      flexDir={{
        base: "column",
        sm: "row",
      }}
      align="center"
      justify="center"
      px="6"
      py="4"
    >
      <chakra.p
        py={{
          base: "2",
          sm: "0",
        }}
        color="black"
        _dark={{
          color: "white",
        }}
        textAlign="center"
        display="flex"
        alignItems="center"
        gap={1}
      >
        Made with <Icon as={BsFillSuitHeartFill} color="#EF4444" boxSize={6} />{" "}
        by Aakash
      </chakra.p>
    </Flex>
  );
};

export default Footer;
