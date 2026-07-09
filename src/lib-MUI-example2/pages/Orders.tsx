import { Box, Typography } from "@mui/material";

import OrderTable from "../components/OrderTable";
import { orders } from "../data/orders";

// Order list page
export default function Orders() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Orders
      </Typography>

      <OrderTable orders={orders} />
    </Box>
  );
}
