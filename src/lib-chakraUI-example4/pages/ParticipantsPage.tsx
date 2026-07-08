import { Container, SimpleGrid } from "@chakra-ui/react";
import { PageHeader } from "../components/PageHeader";
import { ParticipantCard } from "../components/ParticipantCard";
import { participants } from "../data/participants";

export function ParticipantsPage() {
  return (
    <Container maxW="6xl" py={10}>
      <PageHeader
        title="Participants"
        description="Danh sách người tham gia sự kiện với Avatar, Badge và Card."
      />

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {participants.map((participant) => (
          <ParticipantCard key={participant.id} participant={participant} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
