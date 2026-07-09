import { Box, Typography } from "@mui/material";

import UserTable from "../components/UserTable";
import { users } from "../data/users";

// Page user list
export default function Users() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Users
      </Typography>

      <UserTable users={users} />
    </Box>
  );
}
