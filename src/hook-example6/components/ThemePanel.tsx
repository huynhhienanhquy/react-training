import {
  Button,
  Text,
  VStack
} from "@chakra-ui/react";
import { useTheme } from "../context/ThemeContext";

export function ThemePanel() {
  // useContext retrieves data from ThemeContext
  const { theme, toggleTheme } = useTheme();

  return (
    <VStack align="stretch" borderWidth="1px" p="4" borderRadius="md">
      <Text fontWeight="bold">useContext</Text>

      <Text>Current theme: {theme}</Text>

      <Button colorPalette="orange" onClick={toggleTheme}>
        Toggle Theme
      </Button>
    </VStack>
  );
}
