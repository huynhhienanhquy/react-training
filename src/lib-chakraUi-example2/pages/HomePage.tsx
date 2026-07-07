import { Box, Button, Container, Heading, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    //Hero Section
    <Box bg="orange.500" color="white">
      <Container maxW="6xl" py={{ base: 20, md: 28 }}>
        <Box maxW="650px">
          <Text fontWeight="bold" mb={4}>
            FITNESS CENTER
          </Text>

          <Heading fontSize={{ base: "4xl", md: "6xl" }} lineHeight="1.1">
            Build your body, build your discipline
          </Heading>

          <Text mt={6} fontSize="lg" color="orange.50">
            FitTrack giúp bạn tìm lớp tập, huấn luyện viên và gói thành viên phù
            hợp với mục tiêu sức khỏe.
          </Text>

          <HStack mt={8} gap={4}>
            <Button asChild size="lg" colorPalette="yellow">
              <Link to="/classes">Xem lớp tập</Link>
            </Button>

            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">Xem bảng giá</Link>
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}
