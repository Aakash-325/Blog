import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Input,
  Stack,
} from "@chakra-ui/react";
import { API_ENDPOINT } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";

function Register() {
  const [loginFormLeft, setLoginFormLeft] = useState("50px");
  const [registerFormLeft, setRegisterFormLeft] = useState("450px");
  const [btnLeft, setBtnLeft] = useState("0px");
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const register = () => {
    setLoginFormLeft("-400px");
    setRegisterFormLeft("50px");
    setBtnLeft("110px");
  };

  const login = () => {
    setLoginFormLeft("50px");
    setRegisterFormLeft("450px");
    setBtnLeft("0px");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 0",
    margin: "5px 0",
    borderLeft: "0",
    borderTop: "0",
    borderRight: "0",
    borderBottom: "1px solid #999",
    outline: "none",
    background: "transparent",
  };

  const fontStyle = {
    fontFamily: "Arial, sans-serif",
  };

  console.log(user);

  const Register = async (e) => {
    e.preventDefault();

    const payload = {
      name: e.target.name?.value,
      email: e.target.email?.value,
      password: e.target.password?.value,
    };

    try {
      await axios
        .post(`${API_ENDPOINT}/user/register`, payload)
        .then((response) => {
          if (response.status === 200) {
            const authCookie = response.data;
            localStorage.setItem("auth", JSON.stringify(authCookie));
            console.log("Registration successful!");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const Login = async (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email?.value,
      password: e.target.password?.value,
    };
    try {
      await axios
        .post(`${API_ENDPOINT}/user/login`, payload)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const authCookie = response.data;
            localStorage.setItem("auth", JSON.stringify(authCookie));
            console.log("Login successful!");
            setTimeout(() => {
              navigate("/");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error loging user", error);
    }
  };

  return (
    <Box
      h="100vh"
      bg="url(https://avatars.mds.yandex.net/i?id=da3e9064b6b429a21d43871cbb82754a8bf0176f-12805492-images-thumbs&n=13)"
      bgPos="center"
      bgSize="cover"
      pos="absolute"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w="380px"
        h="480px"
        pos="relative"
        bg="#fff"
        p="20px"
        overflow="hidden"
        borderRadius="20px"
      >
        <Stack spacing={4}>
          <Flex
            w="220px"
            m="35px auto"
            pos="relative"
            boxShadow="0 0 20px 9px #ff61241f"
            borderRadius="30px"
            flexDirection="row"
          >
            <Box
              left={btnLeft}
              w="110px"
              h="100%"
              pos="absolute"
              bgGradient="linear(to right, #ff105f, #ffad06)"
              borderRadius="30px"
              transition="0.5s"
            ></Box>
            <Button
              type="button"
              onClick={login}
              style={{
                padding: "10px 30px",
                cursor: "pointer",
                background: "transparent",
                border: "0",
                outline: "none",
                position: "relative",
                borderTopLeftRadius: "30px",
                borderBottomLeftRadius: "30px",
              }}
            >
              Log In
            </Button>
            <Button
              type="button"
              onClick={register}
              style={{
                padding: "10px 30px",
                cursor: "pointer",
                background: "transparent",
                border: "0",
                outline: "none",
                position: "relative",
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
              }}
            >
              Register
            </Button>
          </Flex>
          <Box pos="relative">
            <form onSubmit={Login}>
              <FormControl
                style={{
                  width: "200px",
                  transition: "0.5s",
                }}
                pos="absolute"
                left={loginFormLeft}
                transition="0.5s"
              >
                <Input
                  type="email"
                  style={inputStyle}
                  placeholder="email"
                  name="email"
                  id="loginEmail" // Unique ID for email input in login form
                  required
                  mb="3"
                />
                <Input
                  type="password"
                  style={inputStyle}
                  placeholder="Enter password"
                  name="password"
                  id="loginPassword" // Unique ID for password input in login form
                  required
                  mb="3"
                />
                <Checkbox mb="3" style={fontStyle}>
                  Remember Password
                </Checkbox>
                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    cursor: "pointer",
                    display: "block",
                    background: "linear-gradient(to right, #ff105f, #ffad06)",
                    border: "0",
                    outline: "none",
                    borderRadius: "30px",
                  }}
                >
                  Log in
                </Button>
              </FormControl>
            </form>
          </Box>
          <Box pos="relative">
            <form onSubmit={Register}>
              <FormControl
                pos="absolute"
                style={{
                  width: "200px",
                  transition: "0.5s",
                }}
                left={registerFormLeft}
                transition="0.5s"
              >
                <Input
                  type="text"
                  style={inputStyle}
                  placeholder="username"
                  name="name"
                  id="registerUsername"
                  required
                  mb="3"
                />
                <Input
                  type="email"
                  style={inputStyle}
                  placeholder="email"
                  name="email"
                  id="registerEmail"
                  required
                  mb="3"
                />
                <Input
                  type="password"
                  style={inputStyle}
                  placeholder="Enter password"
                  name="password"
                  id="registerPassword"
                  required
                  mb="3"
                />
                <Checkbox mb="3" style={fontStyle}>
                  I agree to terms & condition
                </Checkbox>
                <Button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    cursor: "pointer",
                    display: "block",
                    background: "linear-gradient(to right, #ff105f, #ffad06)",
                    border: "0",
                    outline: "none",
                    borderRadius: "30px",
                  }}
                >
                  Register
                </Button>
              </FormControl>
            </form>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Register;
