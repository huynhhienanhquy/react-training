import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

export function DashboardLayout() {
  return (
    // Overall dashboard layout
    <Flex minH="100vh" bg="gray.50">
      {/* Left sidebar */}
      <Sidebar />

      {/* Content on the right */}
      <Box flex="1">
        <Topbar />

        <Box p={6}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
}
