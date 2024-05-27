import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Authcontext";
import { API_ENDPOINT } from "../config";
import axios from "axios";

const AddBlog = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const widget = useColorModeValue("white", "gray.700");
  const { user } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log("Current User", user);

  const onImageChange = (event) => {
    if (event.target.files.length > 0) {
      setImageFile(event.target.files[0]);
    }
  };

  const NewBlog = async (event) => {
    event.preventDefault();

    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("description", event.target.description.value);
    formData.append("image", imageFile); // Match this name with backend
    formData.append("user", user);

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/blog/addBlog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      if (response.status === 201) {
        setSuccess(true);
        // Reset form state
        event.target.reset();
        setImageFile(null);
      }
    } catch (error) {
      console.error("Error occurred while creating blog:", error);
      setError("An error occurred while creating the blog.");
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
      <form onSubmit={NewBlog}>
        <Flex
          flexDirection="column"
          borderRadius="lg"
          bg={widget}
          p={{ base: "1rem", md: "2rem" }}
          boxShadow="lg"
          justifyContent="space-between"
          alignItems="center"
          maxW={{ base: "90%", md: "700px" }}
          w="100%"
          m={{ base: "1rem", md: "2rem" }}
        >
          <Text fontSize="xl" fontWeight="bold" mb="1rem">
            Create New Blog
          </Text>

          <Input
            variant="filled"
            placeholder="Title"
            name="title"
            focusBorderColor="#25c19b"
            required
            mb="1rem"
            maxW="100%"
          />

          <InputGroup w="100%" mb="1rem">
            <InputLeftElement pointerEvents="none" />
            <Input
              variant="filled"
              placeholder="Upload Image"
              type="file"
              onChange={onImageChange}
              name="image" // Ensure this matches backend
              focusBorderColor="#25c19b"
              required
            />
          </InputGroup>
          <Textarea
            placeholder="Description"
            resize="vertical"
            minH="150px"
            mb="1rem"
            maxW="100%"
            name="description"
            required
          />
          {error && (
            <Text color="red.500" mb="1rem">
              {error}
            </Text>
          )}
          {success && (
            <Text color="green.500" mb="1rem">
              Blog created successfully!
            </Text>
          )}
          <Button
            type="submit"
            bg="#25c19b"
            size="lg"
            fontSize="md"
            fontWeight="normal"
            maxW="100%"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AddBlog;
