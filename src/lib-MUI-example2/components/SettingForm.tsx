import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

//This form is for practicing basic Material UI inputs.
export default function SettingForm() {
  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          Settings
        </Typography>

        <TextField label="Full Name" defaultValue="Admin" fullWidth />

        <TextField label="Email" defaultValue="admin@gmail.com" fullWidth />

        <TextField select label="Language" defaultValue="en" fullWidth>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="vi">Vietnamese</MenuItem>
          <MenuItem value="jp">Japanese</MenuItem>
        </TextField>

        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Dark Mode"
        />

        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Receive Notifications"
        />

        <RadioGroup defaultValue="comfortable">
          <FormControlLabel
            value="comfortable"
            control={<Radio />}
            label="Comfortable"
          />

          <FormControlLabel value="compact" control={<Radio />} label="Compact" />
        </RadioGroup>

        <Box>
          <Typography
            sx={{
              mb: 1,
            }}
          >
            Font Size
          </Typography>

          <Slider
            defaultValue={16}
            min={12}
            max={24}
            valueLabelDisplay="auto"
          />
        </Box>

        <Button variant="contained" size="large">
          Save Settings
        </Button>

        <Alert severity="info">Material UI Form Example</Alert>
      </Box>
    </Paper>
  );
}
