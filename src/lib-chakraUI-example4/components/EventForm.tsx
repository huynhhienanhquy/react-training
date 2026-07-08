import {
  Box,
  Button,
  Checkbox,
  Field,
  Input,
  NativeSelect,
  RadioGroup,
  Switch,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export function EventForm() {
  return (
    // This demo form creates events, focusing solely on learning Chakra UI components.
    <Box bg="white" p={6} rounded="xl" shadow="sm">
      <VStack align="stretch" gap={5}>
        <Field.Root>
          <Field.Label>Event title</Field.Label>
          <Input placeholder="Example: React Meetup 2026" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Category</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field>
              <option value="tech">Tech</option>
              <option value="design">Design</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        <Field.Root>
          <Field.Label>Description</Field.Label>
          <Textarea placeholder="Write short event description..." rows={5} />
        </Field.Root>

        <Field.Root>
          <Field.Label>Event type</Field.Label>

          {/* RadioGroup is used when only one option can be selected. */}
          <RadioGroup.Root defaultValue="offline">
            <VStack align="start">
              <RadioGroup.Item value="offline">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Offline</RadioGroup.ItemText>
              </RadioGroup.Item>

              <RadioGroup.Item value="online">
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>Online</RadioGroup.ItemText>
              </RadioGroup.Item>
            </VStack>
          </RadioGroup.Root>
        </Field.Root>

        {/* Switches are used for the on/off state. */}
        <Switch.Root>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Publish immediately</Switch.Label>
        </Switch.Root>

        {/*Checkboxes are used for independent selections. */}
        <Checkbox.Root>
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label>Send notification to participants</Checkbox.Label>
        </Checkbox.Root>

        <Button colorPalette="purple">Create Event</Button>
      </VStack>
    </Box>
  );
}
