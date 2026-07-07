import { Box } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CoursesSection } from "./components/CoursesSection";
import { PricingSection } from "./components/PricingSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <Box minH="100vh" bg="gray.50" color="gray.800">
      <Navbar />
      <Hero />
      <CoursesSection />
      <PricingSection />
      <Footer />
    </Box>
  );
}
