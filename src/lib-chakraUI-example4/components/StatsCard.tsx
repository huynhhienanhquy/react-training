import {
  Box,
  Heading,
  Text
} from "@chakra-ui/react"

type StatsCardProps = {
  label: string;
  value: string;
  helper: string;
}

export function StatsCard({label, value, helper}: StatsCardProps) {
  return (
    //Statistics card used in the Dashboard
    <Box bg="white" p={6} rounded="xl" shadow="sm">
      <Text color="gray.500">
        {label}
      </Text>

      <Heading mt={2}>
        {value}
      </Heading>

      <Text mt={2} color="green.500" fontSize="sm">
        {helper}
      </Text>
    </Box>
  )
}
