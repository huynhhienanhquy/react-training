import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@mui/material"

export default function Header() {
  return (
    //Top navigation bar
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{flexGrow: 1}}>
          Material UI example
        </Typography>

        <Button color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}
