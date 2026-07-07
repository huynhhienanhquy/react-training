import { Box, Container, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Box bg="gray.900" color="gray.300" mt={16}>
      <Container maxW="6xl" py={6} textAlign="center">
        <Text>© 2026 FitTrack. Built with React Router + Chakra UI.</Text>
      </Container>
    </Box>
  );
}
