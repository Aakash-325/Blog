import { Flex, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";
import { API_ENDPOINT } from "../config";
import axios from "axios";
import { useColorModeValue } from "@chakra-ui/react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const bg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    const getAllblogs = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}/blog/getPosts`);
        console.log(res.data);
        return res.data;
      } catch (err) {
        console.log(err);
        return { blogs: [] };
      }
    };

    getAllblogs().then((data) => setBlogs(data.blogs));
  }, []);

  return (
    <Flex py="2rem" justifyContent="center" bg={bg}>
      <SimpleGrid columns={[1, 2, 3]} spacing="3rem" m="1rem">
        {blogs &&
          blogs.map((blog, index) => (
            <Link to={`/posts/${blog._id}`} key={index}>
              <BlogCard key={index} blog={blog} />
            </Link>
          ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
