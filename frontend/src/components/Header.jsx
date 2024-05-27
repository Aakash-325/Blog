import {
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  VStack,
  chakra,
  Box,
  Image,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import logo from "../assets/Images/logo.png";
import { AuthContext } from "../context/Authcontext";
import { useContext } from "react";
import SearchBar from "./SearchBar";

const Header = () => {
  const bg = useColorModeValue("white", "gray.800");
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { user, logout } = useContext(AuthContext);

  const mobileNav = useDisclosure();

  if (mobileNav.isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mx={{
            base: "1rem",
            md: "2rem",
          }}
        >
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Image
                src={logo}
                alt="Logo"
                width={{
                  base: "2rem",
                  md: "3.2rem",
                }}
                height={{
                  base: "2rem",
                  md: "3.2rem",
                }}
              />
            </chakra.a>
          </Flex>
          <SearchBar
            size="lg"
            width="66"
            display="flex"
            mx={{
              base: "1rem",
              md: "2rem",
            }}
          />
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{
                base: "none",
                md: "inline-flex",
              }}
            >
              <Button variant="ghost">
                <Link href="/" style={{ textDecoration: "none" }}>
                  Home
                </Link>
              </Button>

              {user ? (
                <>
                  <Button variant="ghost">
                    <Link
                      href={`/profile/${user}`}
                      style={{ textDecoration: "none" }}
                    >
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost">
                    <Link href={"/create"} style={{ textDecoration: "none" }}>
                      Add Blog
                    </Link>
                  </Button>
                  <Button variant="ghost">
                    <Link
                      href={`/myposts/${user}`}
                      style={{ textDecoration: "none" }}
                    >
                      My Blogs
                    </Link>
                  </Button>
                  <Button variant="ghost">
                    <Link style={{ textDecoration: "none" }} onClick={logout}>
                      Logout
                    </Link>
                  </Button>
                </>
              ) : (
                <Button variant="ghost">
                  <Link href="/auth" style={{ textDecoration: "none" }}>
                    LogIn
                  </Link>
                </Button>
              )}
            </HStack>
            <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{
                base: "0",
                md: "3",
              }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  <Link href="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </Button>
                {user ? (
                  <>
                    <Button variant="ghost">
                      <Link
                        href={`/profile/${user}`}
                        style={{ textDecoration: "none" }}
                      >
                        Profile
                      </Link>
                    </Button>
                    <Button variant="ghost">
                      <Link href={"/create"} style={{ textDecoration: "none" }}>
                        Add Blog
                      </Link>
                    </Button>
                    <Button variant="ghost">
                      <Link
                        href={`/myposts/${user}`}
                        style={{ textDecoration: "none" }}
                      >
                        My Blogs
                      </Link>
                    </Button>
                    <Button variant="ghost">
                      <Link style={{ textDecoration: "none" }} onClick={logout}>
                        Logout
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost">
                    <Link href="/auth" style={{ textDecoration: "none" }}>
                      LogIn
                    </Link>
                  </Button>
                )}
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default Header;
