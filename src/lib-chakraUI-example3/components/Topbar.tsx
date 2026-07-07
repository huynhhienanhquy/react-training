import {
  Avatar,
  Box,
  Flex,
  Heading,
  Input
} from "@chakra-ui/react"

export function Topbar() {
  return (
    // Top bar of the dashboard
    <Box bg="white" borderBottom="1px solid" borderColor="gray.200" px={6} py={4}>
      <Flex justify="space-between" align="center" gap={4}>
        <Heading size="md">Student Dashboard</Heading>

        <Flex align="center" gap={4}>
          {/* Search box */}
          <Input
            placeholder="Search student..."
            maxW="250px"
            display={{ base: "none", md: "block" }}
          />

          {/* Avatar user */}
          <Avatar.Root>
            <Avatar.Fallback name="Admin User" />
          </Avatar.Root>
        </Flex>
      </Flex>
    </Box>
  )
}
