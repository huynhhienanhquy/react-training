import {
  Box,
  Container,
  Heading,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";

import { products } from "./data/products";
import { ProductList } from "./components/ProductList";
import { ProductSearch } from "./components/ProductSearch";
import { ProductStats } from "./components/ProductStats";
import { useDebounce } from "./hooks/useDebounce";

export default function App() {
  //useState management text search
  const [searchText, setSeachText] = useState("");

  //useState manages the selected category
  const [category, setCategory] = useState("All");

  // custom hook debounce searchText
  const debouncedSearchText = useDebounce(searchText, 500);

  // useCallback prevents the function from being unnecessarily recreated
  const handleSearchChange = useCallback((value: string) => {
    setCategory(value);
  }, [])

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
  }, [])

  const handleReset = useCallback(() => {
    setSeachText("");
    setCategory("All");
  }, [])

  // useMemo is used to filter products
  // Rerun only when debouncedSearchText or category changes
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(debouncedSearchText.toLowerCase());

      const matchCategory = category === "All" || product.category === category;

      return matchSearch && matchCategory;
    })
  }, [debouncedSearchText, category])

  return (
    <Container maxW="4xl" py="10">
      <Box p="6" borderWidth="1px" borderRadius="xl" boxShadow="md">
        <VStack align="stretch" gap="5">
          <Box>
            <Heading>
              Product Filter Dashboard
            </Heading>

            <Text color="gray.500">
              Example React Hooks with Chakra UI
            </Text>
          </Box>

          <Separator>
          </Separator>

          <ProductSearch
            searchText={searchText}
            category={category}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onReset={handleReset}
          >
          </ProductSearch>

          <ProductStats products={filteredProducts} />

          <ProductList products={filteredProducts} />
        </VStack>
      </Box>
    </Container>
  )
}
