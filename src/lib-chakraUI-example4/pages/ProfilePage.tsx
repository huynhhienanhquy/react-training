import {
  Alert,
  Avatar,
  Box,
  Container,
  Heading,
  Progress,
  Skeleton,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PageHeader } from "../components/PageHeader";

export function ProfilePage() {
  return (
    <Container maxW="4xl" py={10}>
      <PageHeader
        title="Profile"
        description="Trang profile demo Tabs, Avatar, Alert, Skeleton và Progress."
      />

      <Box bg="white" p={6} rounded="xl" shadow="sm">
        <VStack gap={4} mb={8}>
          <Avatar.Root size="xl">
            <Avatar.Fallback name="Admin User" />
          </Avatar.Root>

          <Heading size="md">Admin User</Heading>
          <Text color="gray.500">event.admin@gmail.com</Text>
        </VStack>

        <Tabs.Root defaultValue="account">
          <Tabs.List mb={6}>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="security">Security</Tabs.Trigger>
            <Tabs.Trigger value="loading">Loading</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="account">
            <Alert.Root status="info" mb={5}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Profile completion</Alert.Title>
                <Alert.Description>
                  Hồ sơ của bạn đã hoàn thành 75%.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>

            <Progress.Root value={75}>
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          </Tabs.Content>

          <Tabs.Content value="security">
            <Text mb={3}>Two-factor authentication</Text>
            <Text color="gray.600">
              Đây là khu vực mô phỏng phần bảo mật tài khoản.
            </Text>
          </Tabs.Content>

          <Tabs.Content value="loading">
            <Skeleton height="24px" mb={4} />
            <Skeleton height="24px" mb={4} />
            <Skeleton height="24px" />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Container>
  );
}
