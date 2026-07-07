import { Box, Heading, Text } from "@chakra-ui/react";

type StatCardProps = {
  label: string;
  value: string;
  helper: string;
};

export function StatCard({ label, value, helper }: StatCardProps) {
  return (
    // Small statistics card on the dashboard
    <Box bg="white" p={6} rounded="xl" shadow="sm">
      <Text color="gray.500">{label}</Text>

      <Heading mt={2}>{value}</Heading>

      <Text mt={2} color="green.500" fontSize="sm">
        {helper}
      </Text>
    </Box>
  );
}
