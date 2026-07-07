import {
  Container,
  Heading,
  SimpleGrid,
  Text } from "@chakra-ui/react";
import { courses } from "../data/courses";
import { CourseCard } from "./CourseCard";

export function CoursesSection() {
  return (
    <Container maxW="6xl" py={16}>
      <Heading textAlign="center" mb={3}>
        Khóa học nổi bật
      </Heading>

      <Text textAlign="center" color="gray.600" mb={10}>
        Chọn khóa học phù hợp với trình độ hiện tại của bạn.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
