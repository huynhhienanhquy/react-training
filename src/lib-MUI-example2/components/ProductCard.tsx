import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Typography,
} from "@mui/material";

import type { Product } from "../types/product";

type Props = {
  product: Product;
};

// Card displaying product information
export default function ProductCard({ product }: Props) {
  return (
    <Card elevation={3}>
      {/* Ảnh sản phẩm */}
      <CardMedia
        component="img"
        height="180"
        image={product.image}
        alt={product.name}
      />

      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h6">{product.name}</Typography>

          <Typography
            sx={{
              color: "text.secondary",
            }}
          >
            {product.category}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "primary.main",
              fontWeight: 700,
            }}
          >
            ${product.price}
          </Typography>

          <Rating value={product.rating} readOnly />

          <Chip
            label={product.inStock ? "In Stock" : "Out of Stock"}
            color={product.inStock ? "success" : "error"}
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions>
        <Button variant="contained" fullWidth disabled={!product.inStock}>
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
}
