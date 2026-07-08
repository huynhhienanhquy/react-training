import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  Text,
  VStack } from "@chakra-ui/react";
import type { Participant } from "../data/participants";

type ParticipantCardProps = {
  participant: Participant;
};

export function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    // Card participant
    <Box bg="white" p={6} rounded="xl" shadow="sm" textAlign="center">
      <VStack gap={4}>
        <Avatar.Root size="xl">
          <Avatar.Fallback name={participant.name} />
        </Avatar.Root>

        <Box>
          <Heading size="md">{participant.name}</Heading>
          <Text color="gray.500">{participant.email}</Text>
        </Box>

        <Badge colorPalette={participant.ticket === "VIP" ? "purple" : "blue"}>
          {participant.ticket}
        </Badge>

        <Badge colorPalette={participant.status === "Checked In" ? "green" : "orange"}>
          {participant.status}
        </Badge>

        <Button size="sm" colorPalette="purple">
          View Profile
        </Button>
      </VStack>
    </Box>
  );
}
