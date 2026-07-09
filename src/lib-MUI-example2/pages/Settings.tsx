import { Box, Typography } from "@mui/material";

import SettingForm from "../components/SettingForm";

// Page Setting
export default function Settings() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Settings
      </Typography>

      <SettingForm />
    </Box>
  );
}
