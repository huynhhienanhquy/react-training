import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  Chip,
  Paper,
  Snackbar,
} from "@mui/material";

import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";

import ProductToolbar from "../components/ProductToolbar";
import ProductActionMenu from "../components/ProductActionMenu";
import ProductFormDialog from "../components/ProductFormDialog";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";

import { initialProducts } from "../data/products";
import type { Product } from "../types/product";

type ProductFormData = Omit<Product, "id">;

// Page management product
export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchText, setSearchText] = useState("");

  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Filter products by name or category
  const filteredProducts = useMemo(() => {
    const keyword = searchText.toLowerCase();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
    );
  }, [products, searchText]);

  function handleAddClick() {
    setEditingProduct(null);
    setOpenForm(true);
  }

  function handleEdit(product: Product) {
    setEditingProduct(product);
    setOpenForm(true);
  }

  function handleSubmit(data: ProductFormData) {
    if (editingProduct) {
      // Edit Product
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...data }
            : product
        )
      );

      setSnackbarMessage("Product updated successfully!");
    } else {
      // Add product
      const newProduct: Product = {
        id: Date.now(),
        ...data,
      };

      setProducts((prev) => [newProduct, ...prev]);
      setSnackbarMessage("Product added successfully!");
    }

    setOpenForm(false);
    setEditingProduct(null);
  }

  function handleConfirmDelete() {
    if (!deleteProduct) return;

    setProducts((prev) =>
      prev.filter((product) => product.id !== deleteProduct.id)
    );

    setDeleteProduct(null);
    setSnackbarMessage("Product deleted successfully!");
  }

  // Configure columns for the DataGrid
  const columns: GridColDef<Product>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => `$${params.row.price}`,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === "Active" ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <ProductActionMenu
          onEdit={() => handleEdit(params.row)}
          onDelete={() => setDeleteProduct(params.row)}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        p: 3,
        bgcolor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <ProductToolbar
        searchText={searchText}
        onSearchChange={setSearchText}
        onAddClick={handleAddClick}
      />

      <Paper
        sx={{
          height: 500,
          width: "100%",
        }}
      >
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 5,
              },
            },
          }}
          disableRowSelectionOnClick
        />
      </Paper>

      <ProductFormDialog
        open={openForm}
        product={editingProduct}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={Boolean(deleteProduct)}
        productName={deleteProduct?.name}
        onClose={() => setDeleteProduct(null)}
        onConfirm={handleConfirmDelete}
      />

      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={2500}
        onClose={() => setSnackbarMessage("")}
      >
        <Alert severity="success">{snackbarMessage}</Alert>
      </Snackbar>
    </Box>
  );
}
