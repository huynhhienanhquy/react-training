import {
  Badge,
  Box,
  Button,
  Heading,
  Text
} from "@chakra-ui/react"
import type { Course } from "../data/courses";


type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Box
      bg="white"
      p={6}
      rounded="xl"
      shadow="sm"
      border="1px solid"
      borderColor="gray.200"
      _hover={{
        shadow: "lg",
        transform: "translateY(-4px)",
      }}
      transition="0.2s"
    >
      <Badge colorPalette="blue" mb={4}>
        {course.level}
      </Badge>

      <Heading size="md" mb={3}>
        {course.title}
      </Heading>

      <Text color="gray.600" mb={6}>
        {course.description}
      </Text>

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {course.price}
      </Text>

      <Button w="full" colorPalette="blue">
        Xem chi tiết
      </Button>
    </Box>
  );
}
