import {
  Box,
  Container,
  Grid,
  Stack } from "@mui/material";

import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import UserCard from "./components/UserCard";

export default function App() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Nội dung */}
      <Container sx={{ mt: 4 }}>
        {/* Grid chia thành 2 cột trên màn hình vừa/lớn */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <LoginForm />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <UserCard />
          </Grid>
        </Grid>

        {/* Ví dụ Stack */}
        <Box sx={{mt: 5,}}>
          <Stack
            direction="row"
            spacing={2}
            sx={{justifyContent: "center",
  }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "primary.main",
                borderRadius: 2,
              }}
            />

            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "success.main",
                borderRadius: 2,
              }}
            />

            <Box
              sx={{
                width: 80,
                height: 80,
                bgcolor: "warning.main",
                borderRadius: 2,
              }}
            />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
