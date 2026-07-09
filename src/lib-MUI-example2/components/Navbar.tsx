import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

// Top navigation bar
export default function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
        >
          Material UI Admin
        </Typography>

        {/* Icon Notification */}
        <IconButton color="inherit">
          <Badge
            badgeContent={3}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User information */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            ml: 2,
          }}
        >
          <Avatar>A</Avatar>

          <Typography>Admin</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
