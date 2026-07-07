import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function MainLayout() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
}
