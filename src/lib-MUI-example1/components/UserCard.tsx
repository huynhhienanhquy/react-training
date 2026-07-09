import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography
} from "@mui/material"

export default function UserCard() {
  return (
    <Card elevation={4}>
      <CardContent>
        <Stack spacing={2} >
          <Avatar sx={{ width: 80, height: 80 }}>
            N
          </Avatar>

          <Typography variant="h5">
            Huynh Hien Anh Quy
          </Typography>

          <Typography color="text.secondary">
            Frontend Developer
          </Typography>

          <Chip  label="Active" color="success">

          </Chip>

          <Divider sx={{width: "100%"}}>

          </Divider>

          <Box>
            <Button variant="contained">
              Follow
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}
