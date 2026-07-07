import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text
} from "@chakra-ui/react"

export function Hero() {
  return (
    <Box bg="blue.600" color="white">
      <Container maxW="6xl" py={{base: 16, md: 24}}>
        <Box maxW="650px">
          <Text fontWeight="semibold" mb={4}>
            Học frontend bài bản từ con số 0
          </Text>

          <Heading fontSize={{base: "4xl", md: "6xl"}} lineHeight="1.1">
            Xây dựng kỹ năng React thực chiến
          </Heading>

          <Text mt={6} fontSize="lg" color="blue.50">
            DevCourse giúp bạn học React, TypeScript và UI Library thông qua các
            project thực tế, dễ hiểu và có lộ trình rõ ràng.
          </Text>

          <HStack gap={4} mt={8}>
            <Button size="lg" colorPalette="yellow">
              Bắt đầu học
            </Button>

            <Button size="lg" variant="outline" color="white">
              Xem khóa học
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
