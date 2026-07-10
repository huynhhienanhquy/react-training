import {
  Badge,
  Box,
  Card,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import type { Product } from "../types/product";

type ProductListProps = {
  products: Product[];
}

export function ProductList({products}: ProductListProps) {
  if (products.length === 0) {
    return (
      <Text color="gray.500" textAlign="center">
        No products found
      </Text>
    )
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      {products.map((product) => (
        <Card.Root key={product.id}>
          <Card.Body  gap="2">

            <Heading>
              {product.name}
            </Heading>

            <Box>
              <Badge colorPalette="orange">
                {product.category}
              </Badge>
            </Box>
            <Text>Price: ${product.price}</Text>
            <Text>Stock: {product.stock}</Text>

          </Card.Body>
        </Card.Root>
      ))}
    </SimpleGrid>
  )
}
