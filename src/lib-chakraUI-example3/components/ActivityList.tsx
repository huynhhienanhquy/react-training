import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { activities } from "../data/activities";

export function ActivityList() {
  return (
    // List of recent activities
    <Box bg="white" p={6} rounded="xl" shadow="sm">
      <Heading size="md" mb={5}>
        Recent Activities
      </Heading>

      <VStack align="stretch" gap={4}>
        {activities.map((activity) => (
          <Box key={activity.id}>
            <Text fontWeight="medium">{activity.title}</Text>
            <Text fontSize="sm" color="gray.500">
              {activity.time}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
