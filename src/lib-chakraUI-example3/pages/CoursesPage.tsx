import {
  Box,
  Heading,
  Progress,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { courses } from "../data/courses";

export function CoursesPage() {
  return (
    <>
      <Heading mb={2}>Courses</Heading>

      <Text color="gray.600" mb={6}>
        Theo dõi số lượng học viên và tiến độ từng khóa học.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {courses.map((course) => (
          <Box key={course.id} bg="white" p={6} rounded="xl" shadow="sm">
            <Heading size="md">{course.name}</Heading>

            <Text mt={3} color="gray.600">
              {course.students} students
            </Text>

            <Text mt={5} mb={2} fontSize="sm">
              Progress: {course.progress}%
            </Text>

            <Progress.Root value={course.progress}>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}
