import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

const plans = [
  {
    name: "Basic",
    price: "399k",
    features: ["Tập tự do", "Locker miễn phí", "Hỗ trợ cơ bản"],
  },
  {
    name: "Pro",
    price: "699k",
    features: ["Tập tự do", "Tham gia lớp nhóm", "1 buổi PT/tháng"],
    popular: true,
  },
  {
    name: "Premium",
    price: "999k",
    features: ["Tất cả lớp nhóm", "4 buổi PT/tháng", "Tư vấn dinh dưỡng"],
  },
];

export function PricingPage() {
  return (
    <Container maxW="6xl" py={16}>
      <Heading mb={3}>Bảng giá</Heading>

      <Text color="gray.600" mb={8}>
        Chọn gói thành viên phù hợp với lịch tập của bạn.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
        {plans.map((plan) => (
          <Box key={plan.name} bg="white" p={6} rounded="xl" shadow="sm">
            {plan.popular && (
              <Badge colorPalette="orange" mb={4}>
                Popular
              </Badge>
            )}

            <Heading size="md" mb={4}>
              {plan.name}
            </Heading>

            <Text fontSize="4xl" fontWeight="bold" mb={6}>
              {plan.price}
            </Text>

            <VStack align="start" gap={3} mb={8}>
              {plan.features.map((feature) => (
                <Text key={feature}>✅ {feature}</Text>
              ))}
            </VStack>

            <Button w="full" colorPalette="orange">
              Chọn gói
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
