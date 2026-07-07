import {
  Box,
  Button,
  Checkbox,
  Heading,
  Input,
  NativeSelect,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";

export function SettingsPage() {
  return (
    <>
      <Heading mb={2}>Settings</Heading>

      <Text color="gray.600" mb={6}>
        Cấu hình thông tin tài khoản và tuỳ chọn hệ thống.
      </Text>

      <Box bg="white" p={6} rounded="xl" shadow="sm" maxW="600px">
        <VStack align="stretch" gap={5}>
          {/* admin name */}
          <Box>
            <Text mb={2} fontWeight="medium">
              Admin name
            </Text>
            <Input placeholder="Admin User" />
          </Box>

          {/* Select language */}
          <Box>
            <Text mb={2} fontWeight="medium">
              Language
            </Text>

            <NativeSelect.Root>
              <NativeSelect.Field>
                <option value="vi">Vietnamese</option>
                <option value="en">English</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Box>

          {/* Turn notifications on or off. */}
          <Switch.Root>
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label>Enable notifications</Switch.Label>
          </Switch.Root>

          {/* Checkbox to receive reports */}
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>Receive weekly report</Checkbox.Label>
          </Checkbox.Root>

          <Button colorPalette="blue">Save settings</Button>
        </VStack>
      </Box>
    </>
  );
}
