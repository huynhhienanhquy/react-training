import { Heading, Text } from "@chakra-ui/react";
import { StudentTable } from "../components/StudentTable";

export function StudentsPage() {
  return (
    <>
      <Heading mb={2}>Students</Heading>

      <Text color="gray.600" mb={6}>
        Quản lý danh sách sinh viên và trạng thái học tập.
      </Text>

      <StudentTable />
    </>
  );
}
