import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

// Danh sách menu
const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    title: "Products",
    path: "/products",
    icon: <InventoryIcon />,
  },
  {
    title: "Users",
    path: "/users",
    icon: <PeopleIcon />,
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <ShoppingCartIcon />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];

// Sidebar left
export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
    >
      <Toolbar />

      <Divider />

      <List>
        {menus.map((menu) => (
          <ListItemButton
            key={menu.path}
            component={NavLink}
            to={menu.path}
            sx={{
              "&.active": {
                bgcolor: "primary.main",
                color: "white",

                "& .MuiListItemIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <ListItemIcon>
              {menu.icon}
            </ListItemIcon>

            <ListItemText
              primary={menu.title}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
