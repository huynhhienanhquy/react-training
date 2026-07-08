import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react"

type PageHeaderProps = {
  title: string;
  description: string;
}

export function PageHeader ({title, description}: PageHeaderProps) {
  return (
    // Component reused for the title of each page
    <Box mb={8}>
      <Heading>{title}</Heading>
      <Text mt={2} color="gray.600">
        {description}
      </Text>
    </Box>
  )
}
