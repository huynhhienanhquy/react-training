import {
  Badge,
  Box,
  Table } from "@chakra-ui/react";
import type { EventItem } from "../data/events";

type EventTableProps = {
  events: EventItem[];
};

export function EventTable({ events }: EventTableProps) {
  return (
    // The box wraps around the table to create a white background, rounded corners, and shadows.
    <Box bg="white" rounded="xl" shadow="sm" overflow="hidden">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Event</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Date</Table.ColumnHeader>
            <Table.ColumnHeader>Location</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {events.map((event) => (
            <Table.Row key={event.id}>
              <Table.Cell>{event.title}</Table.Cell>
              <Table.Cell>{event.category}</Table.Cell>
              <Table.Cell>{event.date}</Table.Cell>
              <Table.Cell>{event.location}</Table.Cell>

              <Table.Cell>
                <Badge
                  colorPalette={
                    event.status === "Open"
                      ? "green"
                      : event.status === "Full"
                      ? "orange"
                      : "red"
                  }
                >
                  {event.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
