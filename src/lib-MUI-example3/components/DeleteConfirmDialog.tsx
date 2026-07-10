import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

type Props = {
  open: boolean;
  productName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

//Dialog confirm delete product
export default function DeleteConfirmDialog ({
  open,
  productName,
  onClose,
  onConfirm
}: Props) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Deleta Product
      </DialogTitle>

      <DialogContent>
        Are you sure you want to deleta {" "}
        <strong>{productName || "this product"}</strong>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancle
        </Button>

        <Button variant="contained" color="error" onClick={onConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
