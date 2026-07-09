import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

// The layout is used for all pages.
export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />

      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
