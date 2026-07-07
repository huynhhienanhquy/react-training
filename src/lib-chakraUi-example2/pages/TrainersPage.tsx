import { Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { trainers } from "../data/trainers";
import { TrainerCard } from "../components/TrainerCard";

export function TrainersPage() {
  return (
    <Container maxW="6xl" py={16}>
      <Heading mb={3}>Huấn luyện viên</Heading>

      <Text color="gray.600" mb={8}>
        Đội ngũ trainer hỗ trợ bạn tập luyện đúng cách và an toàn.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {trainers.map((trainer) => (
          <TrainerCard key={trainer.id} trainer={trainer} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
