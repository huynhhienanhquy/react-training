import { Grid, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import { ActivityList } from "../components/ActivityList";
import { StatCard } from "../components/StatCard";
import { StudentTable } from "../components/StudentTable";

export function DashboardPage() {
  return (
    <>
      <Heading mb={6}>Overview</Heading>

      {/* Statistical cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} gap={6} mb={6}>
        <StatCard label="Students" value="120" helper="+12 this month" />
        <StatCard label="Courses" value="8" helper="+2 new courses" />
        <StatCard label="Average Score" value="8.4" helper="+0.6 improved" />
        <StatCard label="Active Today" value="32" helper="+8 online" />
      </SimpleGrid>

      {/* Table and activity  */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <GridItem>
          <StudentTable />
        </GridItem>

        <GridItem>
          <ActivityList />
        </GridItem>
      </Grid>
    </>
  );
}
