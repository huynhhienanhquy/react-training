import {
  Alert,
  Button,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material"

export default function LoginForm() {
  return (
    // Paper creates the effect of a sheet of paper
    <Paper
      elevation={3}
      sx= {{pading: 3,}}
    >
      <Stack spacing={2}>
        <Typography variant="h5">
          Login
        </Typography>

        <TextField label="Email" fullWidth>

        </TextField>

        <TextField label="Password" type="password" fullWidth>

        </TextField>

        <Button variant="contained" size="large">
          Login
        </Button>

        <Alert security="infor">
          Demo Material UI Components
        </Alert>
      </Stack>
    </Paper>
  )
}
