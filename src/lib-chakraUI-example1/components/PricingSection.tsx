import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack } from "@chakra-ui/react";

export function PricingSection() {
  return (
    <Container maxW="4xl" py={16}>
      <Box bg="white" p={10} rounded="2xl" shadow="md" textAlign="center">
        <Heading mb={4}>Gói học Pro</Heading>

        <Text color="gray.600" mb={6}>
          Truy cập toàn bộ khóa học, bài tập thực hành và project mẫu.
        </Text>

        <VStack gap={3} mb={8}>
          <Text>✅ React + TypeScript từ cơ bản đến nâng cao</Text>
          <Text>✅ Project thực tế theo từng module</Text>
          <Text>✅ Hỗ trợ code review</Text>
        </VStack>

        <Text fontSize="4xl" fontWeight="bold" mb={6}>
          1.499k
        </Text>

        <Button size="lg" colorPalette="blue">
          Đăng ký ngay
        </Button>
      </Box>
    </Container>
  );
}
