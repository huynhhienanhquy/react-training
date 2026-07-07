import { Badge, Box, Button, Heading, Text } from "@chakra-ui/react";
import type { GymClass } from "../data/classes";

type ClassCardProps = {
  item: GymClass;
};

export function ClassCard({ item }: ClassCardProps) {
  return (
    // Card displaying information about a class
    <Box
      bg="white"
      p={6}
      rounded="xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
      transition="0.2s"
    >
      <Badge colorPalette="orange" mb={4}>
        {item.level}
      </Badge>

      <Heading size="md" mb={2}>
        {item.name}
      </Heading>

      <Text color="gray.500" mb={4}>
        Thời lượng: {item.duration}
      </Text>

      <Text color="gray.600" mb={6}>
        {item.description}
      </Text>

      <Button colorPalette="orange" w="full">
        Đăng ký lớp
      </Button>
    </Box>
  );
}
