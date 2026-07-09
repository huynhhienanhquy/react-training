import type { ReactNode } from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

type Props = {
  title: string;
  value: string | number;
  color: string;
  icon: ReactNode;
};

// Statistics card on the Dashboard page
export default function DashboardCard({
  title,
  value,
  color,
  icon,
}: Props) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: color,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>

          <Box>
            <Typography
              sx={{
                color: "text.secondary",
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
