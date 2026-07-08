import {
  Alert,
  Container,
  Heading,
  SimpleGrid } from "@chakra-ui/react";
import { EventCard } from "../components/EventCard";
import { PageHeader } from "../components/PageHeader";
import { StatsCard } from "../components/StatsCard";
import { events } from "../data/events";

export function DashboardPage() {
  return (
    <Container maxW="6xl" py={10}>
      <PageHeader
        title="Dashboard"
        description="Tổng quan các sự kiện, người tham gia và trạng thái đăng ký."
      />

      <Alert.Root status="success" mb={6}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>EventHub is ready</Alert.Title>
          <Alert.Description>
            Đây là example tổng hợp Chakra UI với nhiều page khác nhau.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={10}>
        <StatsCard label="Total Events" value="24" helper="+4 this month" />
        <StatsCard label="Participants" value="1,256" helper="+180 new users" />
        <StatsCard label="Revenue" value="$12,500" helper="+18% growth" />
      </SimpleGrid>

      <Heading size="lg" mb={5}>
        Upcoming Events
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {events.slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
