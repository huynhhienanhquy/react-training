import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text } from "@chakra-ui/react";
import {
  Link,
  NavLink } from "react-router-dom";

// Menu list.
//Just add the element here and the Navbar will render automatically.
const navItems = [
  {label: "Home", path: "/"},
  { label: "Classes", path: "/classes" },
  { label: "Trainers", path: "/trainers" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  return (
    // Navigation bar
    <Box bg="white" borderBottom="1px solid" borderColor="gray.200">
      <Container maxW="6xl" py={4}>
        <Flex justify="space-between" align="center">
          <Text asChild fontSize="2xl" fontWeight="bold" color="orange.500">
            <Link to="/">FitTrack</Link>
          </Text>

          <HStack gap={6} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
            <Text key={item.path} asChild fontWeight="medium" _hover={{ color: "orange.500" }}>
              <NavLink to={item.path}>{item.label}</NavLink>
            </Text>
            ))}
          </HStack>

          <Button colorPalette="orange">Join Now</Button>
        </Flex>
      </Container>
    </Box>
  )
}
