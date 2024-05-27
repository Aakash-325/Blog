/* eslint-disable */
import { Box, Text, Image, Flex, useMediaQuery } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { format } from "date-fns";

const BlogCard = (props) => {
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const bg = useColorModeValue("white", "gray.700");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return format(date, "MMMM d");
  };

  return (
    <Box
      bg={bg}
      borderRadius="1.4rem"
      overflow="hidden"
      p={{ base: 2, md: 3 }}
      boxShadow="lg"
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
      width={isLargerThanMd ? "350px" : "100%"}
      maxWidth={isLargerThanMd ? "450px" : "none"}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={props.blog.image}
        alt={props.blog.title}
        objectFit="cover"
        mb={4}
        borderRadius="1rem"
        height={isLargerThanMd ? "200px" : "200px"}
        width="100%"
      />

      <Flex flexDirection="column" flex="1">
        <Text
          fontWeight="bold"
          fontSize={{ base: "md", md: "lg" }}
          mb={2}
          lineHeight="shorter"
          textTransform="capitalize"
        >
          {props.blog.title}
        </Text>
        <Text noOfLines={3} fontSize={{ base: "sm", md: "md" }}>
          {props.blog.description.length > 105
            ? `${props.blog.description.substring(0, 105)}...`
            : props.blog.description}
        </Text>

        <Flex alignItems="center" mt={8}>
          <Box
            as="span"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            bgColor="green.500"
            color="white"
            borderRadius="0.7rem"
            fontSize="sm"
            px={2}
            py={1}
            mr={2}
          >
            by fsknfs
          </Box>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
            Posted on {formatDate(props.blog.createdAt)}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default BlogCard;
