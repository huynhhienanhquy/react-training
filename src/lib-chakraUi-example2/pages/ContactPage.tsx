import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export function ContactPage() {
  return (
    <Container maxW="3xl" py={16}>
      <Heading mb={3}>Liên hệ tư vấn</Heading>

      <Text color="gray.600" mb={8}>
        Gửi thông tin, FitTrack sẽ liên hệ lại với bạn.
      </Text>

      <Box bg="white" p={6} rounded="xl" shadow="sm">
        <VStack gap={4}>
          <Input placeholder="Họ và tên" />
          <Input placeholder="Email" />
          <Input placeholder="Số điện thoại" />
          <Textarea placeholder="Mục tiêu tập luyện của bạn" rows={5} />

          <Button colorPalette="orange" w="full">
            Gửi thông tin
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
