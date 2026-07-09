import { Box, Grid, Typography } from "@mui/material";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

// Page product list
export default function Products() {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Products
      </Typography>

      {/* Render product list*/}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
