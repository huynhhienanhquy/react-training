import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react"

import {
  Link,
  NavLink
} from "react-router-dom"

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Events", path: "/events" },
  { label: "Participants", path: "/participants" },
  { label: "Create", path: "/create-event" },
  { label: "Profile", path: "/profile" },
]

export function Navbar() {
  return (
    // The navbar is located at the top of the entire application.
    <Box bg="white" borderBottom="1px solid" borderColor="gray.200">
      <Container maxW="6xl" py={4}>
        <Flex justify="space-between" align="center" gap={5}>
          {/* The logo uses a link to return to the Dashboard page.*/}
          <Text asChild fontSize="2xl" fontWeight="bold" color="purple.600">
            <Link to="/">EventHub</Link>
          </Text>

          {/* Navigation menu, hidden on mobile */}
          <HStack gap={5} display={{ base: "none", md: "flex" }}>
            {navItems.map((item) => (
              <Text
                key={item.path}
                asChild
                fontWeight="medium"
                _hover={{ color: "purple.600" }}
              >
                <NavLink to={item.path}>{item.label}</NavLink>
              </Text>
            ))}
          </HStack>

          {/* Search and avatar */}
          <HStack gap={3}>
            <Input
              placeholder="Search..."
              maxW="180px"
              display={{ base: "none", lg: "block" }}
            />

            <Button asChild colorPalette="purple" display={{ base: "none", md: "inline-flex" }}>
              <Link to="/create-event">New Event</Link>
            </Button>

            <Avatar.Root>
              <Avatar.Fallback name="Admin User" />
            </Avatar.Root>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
