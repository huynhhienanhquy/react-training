import { Badge, Box, Table, Text } from "@chakra-ui/react";
import { students } from "../data/students";

export function StudentTable() {
  return (
      // Box helps the table have a white background and rounded corners    <Box bg="white" rounded="xl" shadow="sm" overflow="hidden">
    <Box bg="white" rounded="xl" shadow="sm" overflow="hidden">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Course</Table.ColumnHeader>
            <Table.ColumnHeader>Score</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {students.map((student) => (
            <Table.Row key={student.id}>
              <Table.Cell>
                <Text fontWeight="semibold">{student.name}</Text>
              </Table.Cell>

              <Table.Cell>{student.email}</Table.Cell>
              <Table.Cell>{student.course}</Table.Cell>
              <Table.Cell>{student.score}</Table.Cell>

              <Table.Cell>
                <Badge
                  colorPalette={student.status === "Active" ? "green" : "red"}
                >
                  {student.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
