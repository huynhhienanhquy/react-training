import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { classes } from "../data/classes";
import { ClassCard } from "../components/ClassCard";

export function ClassesPage() {
  return (
    // Container helps to center the entire content
    <Container maxW="6xl" py={16}>
      <Heading mb={3}>Danh sách lớp tập</Heading>

      <Text color="gray.600" mb={8}>
        Chọn lớp phù hợp với trình độ và mục tiêu của bạn.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {classes.map((item) => (
          <ClassCard key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
