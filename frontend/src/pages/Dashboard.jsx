/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Flex, Text, Image, Button, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { API_ENDPOINT } from "../config";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const widget = useColorModeValue("white", "gray.700");
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `${API_ENDPOINT}/blog/getPostByUserID/${id}`
        );
        setBlogs(res.data.blogs);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  const deleteBlog = async (blogId) => {
    try {
      const res = axios.delete(`${API_ENDPOINT}/blog/deleteBlog/${blogId}`);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      flexDirection="column"
      py={{ base: "1rem", md: "2rem" }}
      justifyContent="center"
      alignItems="center"
      bg={bg}
    >
      {blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Flex
            key={index}
            gap="8"
            borderRadius="sm"
            bg={widget}
            p="0.7rem"
            m="1rem"
            boxShadow="lg"
            justifyContent="space-between"
            alignItems="center"
            maxW={{ base: "90%", md: "700px" }}
            w="100%"
          >
            <Link to={`/posts/${blog._id}`} key={index}>
              <Image
                src={blog.image}
                alt={blog.title}
                objectFit="cover"
                borderRadius="0.2rem"
                w="4rem"
                h="2.8rem"
              />
            </Link>
            <Text
              fontWeight="bold"
              fontSize={{ base: "md", md: "lg" }}
              lineHeight="shorter"
              textTransform="capitalize"
              mb="0.5rem"
            >
              {blog.title}
            </Text>
            <Flex gap="1rem">
              <Button colorScheme="green">Update</Button>
              <Button colorScheme="red" onClick={() => deleteBlog(blog._id)}>
                Delete
              </Button>
            </Flex>
          </Flex>
        ))
      ) : (
        <Flex justifyContent="center" alignItems="center" h="200px">
          <Box bg={widget} py="1rem" px="4rem" borderRadius="md" boxShadow="lg">
            <Text fontSize="xl" fontWeight="bold" color="gray.600">
              No blogs found
            </Text>
          </Box>
        </Flex>
      )}
    </Flex>
  );
};

export default Dashboard;
