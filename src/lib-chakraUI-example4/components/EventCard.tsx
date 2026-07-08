import {
  Badge,
  Box,
  Button,
  Heading,
  Progress,
  Text,
  VStack
} from "@chakra-ui/react"
import type { EventItem } from "../data/events"

type EventCardProps = {
  event: EventItem;
}

export function EventCard({event}: EventCardProps) {
  const percent = Math.round((event.participants / event.capacity) * 100);

  const statusColor =
  event.status === "Open" ? "green" : event.status === "Full" ? "orange" : "red";

  return (
    //The card displays information about an event.
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
      <VStack align="start" gap={4}>
        <Badge colorPalette={statusColor}>
          {event.status}
        </Badge>

        <Box>
          <Heading  size="md">
            {event.title}
          </Heading>

          <Text color="gray.500">
            {event.category}
          </Text>
        </Box>

        <Text>
          {event.date}
        </Text>

        <Text color="gray.600">
          {event.location}
        </Text>

        {/* Progress shows the percentage of people who have registered */}
        <Box w="full">
          <Text fontSize="sm" mb={2}>
            {event.participants}/{event.capacity} participant
          </Text>

          <Progress.Root value={percent}>
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Box>

        <Button>
          View Detail
        </Button>
      </VStack>
    </Box>
  )
}
