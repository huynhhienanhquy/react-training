import { Box, Button, Container, HStack, Input, SimpleGrid, Tabs } from "@chakra-ui/react";
import { EventCard } from "../components/EventCard";
import { EventTable } from "../components/EventTable";
import { PageHeader } from "../components/PageHeader";
import { events } from "../data/events";

export function EventsPage() {
  return (
    <Container maxW="6xl" py={10}>
      <PageHeader
        title="Events"
        description="Quản lý danh sách sự kiện theo dạng card hoặc table."
      />

      <Box mb={6}>
        <Input placeholder="Search events..." bg="white" maxW="400px" />
      </Box>

      <Tabs.Root defaultValue="cards">
        <HStack justify="space-between" mb={6}>
          <Tabs.List>
            <Tabs.Trigger value="cards">Cards</Tabs.Trigger>
            <Tabs.Trigger value="table">Table</Tabs.Trigger>
          </Tabs.List>

          <Button colorPalette="purple">Export</Button>
        </HStack>

        <Tabs.Content value="cards">
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </SimpleGrid>
        </Tabs.Content>

        <Tabs.Content value="table">
          <EventTable events={events} />
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
}
