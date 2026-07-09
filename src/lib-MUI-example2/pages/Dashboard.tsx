import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import PaidIcon from "@mui/icons-material/Paid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Grid, Typography } from "@mui/material";

import DashboardCard from "../components/DashboardCard";

// Page Overview
export default function Dashboard() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Dashboard
      </Typography>

      {/* Grid divides the statistics cards. */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Users"
            value="120"
            color="#1976d2"
            icon={<GroupIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Products"
            value="58"
            color="#2e7d32"
            icon={<InventoryIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Orders"
            value="235"
            color="#ed6c02"
            icon={<ShoppingCartIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <DashboardCard
            title="Revenue"
            value="$12,300"
            color="#9c27b0"
            icon={<PaidIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
