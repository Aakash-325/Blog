import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../config";
import {
  Box,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";
import { format } from "date-fns";

const Search = () => {
  const { query } = useParams();
  const [isLargerThanMd] = useMediaQuery("(min-width: 768px)");
  const bg = useColorModeValue("white", "gray.700");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/blog/getPosts`);
        const data = response.data;

        if (query) {
          setFilteredData(
            data.blogs.filter((blog) => {
              return blog.title.toLowerCase().includes(query.toLowerCase());
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    getBlog();
  }, [query]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return format(date, "MMMM d");
  };

  return (
    <Link to={`/posts/${filteredData[0]?._id}`}>
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
        m="2rem"
      >
        <Image
          src={filteredData[0]?.image}
          alt={filteredData[0]?.image}
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
            {filteredData[0]?.title}
          </Text>
          <Text noOfLines={3} fontSize={{ base: "sm", md: "md" }}>
            {filteredData[0]?.description.length > 105
              ? `${filteredData[0]?.description.substring(0, 105)}...`
              : filteredData[0]?.description}
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
              Created on {formatDate(filteredData[0]?.createdAt)}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default Search;
