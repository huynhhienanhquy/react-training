import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { useState } from "react";

import type { Product } from "../types/product";

type ProductFormData = Omit<Product, "id">;

type Props = {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
};

const defaultForm: ProductFormData = {
  name: "",
  category: "Accessories",
  price: 0,
  stock: 0,
  status: "Active",
};

function getInitialForm(product?: Product | null): ProductFormData {
  if (!product) return defaultForm;

  return {
    name: product.name,
    category: product.category,
    price: product.price,
    stock: product.stock,
    status: product.status,
  };
}

// The dialog is used for both adding and editing products.
export default function ProductFormDialog({
  open,
  product,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<ProductFormData>(() =>
    getInitialForm(product)
  );

  const isEdit = Boolean(product);

  function handleChange(field: keyof ProductFormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: field === "price" || field === "stock" ? Number(value) : value,
    }));
  }

  function handleSubmit() {
    onSubmit(form);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            label="Product Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Category"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            fullWidth
          >
            <MenuItem value="Accessories">Accessories</MenuItem>
            <MenuItem value="Audio">Audio</MenuItem>
            <MenuItem value="Monitor">Monitor</MenuItem>
            <MenuItem value="Laptop">Laptop</MenuItem>
          </TextField>

          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            fullWidth
          />

          <TextField
            label="Stock"
            type="number"
            value={form.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            fullWidth
          />

          <TextField
            select
            label="Status"
            value={form.status}
            onChange={(e) => handleChange("status", e.target.value)}
            fullWidth
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
