import {
  Badge,
  Box,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import {
  useMemo,
  useState
} from "react";
import { useDebounce } from "../hooks/useDebounce";

const products = [
  "Laptop Dell",
  "MacBook Pro",
  "iPhone 15",
  "Samsung Monitor",
  "Logitech Mouse",
  "Mechanical Keyboard",
  "USB-C Hub",
];

export function SearchProducts() {
  // useState management keyword
  const [keyword, setKeyword] = useState("");

  // custom hook debounce keyword
  const debouncedKeyword = useDebounce(keyword, 500);

  // useMemo cache result filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.toLowerCase().includes(debouncedKeyword.toLowerCase())
    );
  }, [debouncedKeyword]);

  return (
    <VStack align="stretch" borderWidth="1px" p="4" borderRadius="md">
      <Text fontWeight="bold">useMemo + Custom Hook</Text>

      <Input
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Search product..."
      />

      <Badge width="fit-content">
        Result: {filteredProducts.length}
      </Badge>

      <Box>
        {filteredProducts.map((product) => (
          <Text key={product}>{product}</Text>
        ))}
      </Box>
    </VStack>
  );
}
