import {
  Box,
  Text,
  VStack
} from "@chakra-ui/react"
import { NavLink } from "react-router-dom"

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Students", path: "/students" },
  { label: "Courses", path: "/courses" },
  { label: "Settings", path: "/settings" },
];

export function Sidebar() {
  return (
    // Fixed left sidebar
    <Box
      w="240px"
      bg="gray.900"
      color="white"
      p={5}
      display={{ base: "none", md: "block" }}
    >
      {/* Logo */}
      <Text fontSize="2xl" fontWeight="bold" mb={10}>
        EduAdmin
      </Text>

      {/* Menu */}
      <VStack align="stretch" gap={3}>
        {menuItems.map((item) => (
          <Text
            key={item.path}
            asChild
            px={4}
            py={3}
            rounded="lg"
            _hover={{ bg: "gray.700" }}
          >
            <NavLink to={item.path}>{item.label}</NavLink>
          </Text>
        ))}
      </VStack>
    </Box>
  );
}
