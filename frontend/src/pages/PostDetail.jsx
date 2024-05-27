import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../config";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { format } from "date-fns";

const PostDetails = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const cardBg = useColorModeValue("white", "gray.700");
  const [post, setPost] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}/blog/getPostByID/${id}`);
        setPost(res.data.blog);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return format(date, "MMMM d");
  };

  return (
    <Flex py={{ base: "1rem", md: "2rem" }} justifyContent="center" bg={bg}>
      <Flex
        bg={cardBg}
        boxShadow="lg"
        width={{ base: "90%", md: "700px" }}
        display="flex"
        borderRadius="md"
        flexDirection="column"
        p={{ base: "0.5rem", md: "1rem" }}
      >
        <Text>Posted on {formatDate(post.createdAt)}</Text>
        <Text as="h1" fontSize="xl" fontWeight="bold" mb="1rem">
          {post.title}
        </Text>
        <Image
          src={post.image}
          alt="Blog"
          objectFit="cover"
          mb={4}
          borderRadius="md"
          width="100%"
        />
        <Text fontSize={{ base: "sm", md: "md" }}>{post.description}</Text>
      </Flex>
    </Flex>
  );
};

export default PostDetails;
