import { Avatar, Box, Heading, Text, VStack } from "@chakra-ui/react";
import type { Trainer } from "../data/trainers";

type TrainerCardProps = {
  trainer: Trainer;
};

export function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <Box bg="white" p={6} rounded="xl" shadow="sm" textAlign="center">
      <VStack gap={4}>
        <Avatar.Root size="xl">
          <Avatar.Fallback name={trainer.name} />
        </Avatar.Root>

        <Heading size="md">{trainer.name}</Heading>

        <Text color="orange.500" fontWeight="semibold">
          {trainer.specialty}
        </Text>

        <Text color="gray.600">{trainer.experience}</Text>
      </VStack>
    </Box>
  );
}
