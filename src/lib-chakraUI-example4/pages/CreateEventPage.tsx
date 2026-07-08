import { Container } from "@chakra-ui/react";
import { EventForm } from "../components/EventForm";
import { PageHeader } from "../components/PageHeader";

export function CreateEventPage() {
  return (
    <Container maxW="3xl" py={10}>
      <PageHeader
        title="Create Event"
        description="Form tạo sự kiện mới, áp dụng Input, Select, Textarea, Radio, Switch và Checkbox."
      />

      <EventForm />
    </Container>
  );
}
