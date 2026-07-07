import {
  Box,
  Container,
  Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box bg="gray.900" color="gray.300">
      <Container maxW="6xl" py={6} textAlign="center">
        <Text>© 2026 DevCourse. Built with React + Chakra UI.</Text>
      </Container>
    </Box>
  );
}
