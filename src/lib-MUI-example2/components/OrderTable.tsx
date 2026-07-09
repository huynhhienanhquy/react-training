import { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import type { Order } from "../types/order";

type Props = {
  orders: Order[];
};

// Order form, with confirmation dialog and Snackbar notification
export default function OrderTable({ orders }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleDeleteClick() {
    setOpenDialog(true);
  }

  function handleConfirmDelete() {
    setOpenDialog(false);
    setOpenSnackbar(true);
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>${order.total}</TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                    color={
                      order.status === "Completed"
                        ? "success"
                        : order.status === "Pending"
                          ? "warning"
                          : "error"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell>{order.date}</TableCell>

                <TableCell align="center">
                  <IconButton color="error" onClick={handleDeleteClick}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete confirmation dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Order</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this order?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification after deletion */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">Order deleted successfully!</Alert>
      </Snackbar>
    </>
  );
}
