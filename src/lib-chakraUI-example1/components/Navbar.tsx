import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text } from "@chakra-ui/react";

export function Navbar() {
  return (
    <Box bg="white" borderBottom="1px solid" borderColor="gray.200">
      <Container maxW="6xl" py={4}>
        <Flex justify="space-between" align="center">

          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            DevCourse
          </Text>

          <HStack gap={6} display={{base: "none", md: "flex"}}>
            <Text cursor="pointer">Khóa học</Text>
            <Text cursor="pointer">Giá</Text>
            <Text cursor="pointer">Liên hệ</Text>
          </HStack>

          <Button colorPalette="blue">Đăng ký</Button>
        </Flex>
      </Container>
    </Box>
  )
}
