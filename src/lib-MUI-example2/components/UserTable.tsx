import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import type { User } from "../types/user";

type Props = {
  users: User[];
};

// The table displays the list of users.
export default function UserTable({ users }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Header */}
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Body */}
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Avatar>
                  {user.avatar}
                </Avatar>
              </TableCell>

              <TableCell>
                {user.name}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>
                {user.role}
              </TableCell>

              <TableCell>
                <Chip
                  label={user.status}
                  color={
                    user.status === "Active"
                      ? "success"
                      : "default"
                  }
                  size="small"
                />
              </TableCell>

              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
