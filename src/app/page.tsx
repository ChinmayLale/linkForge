// import Image from "next/image";
import { FeaturesSection } from "@/Components/Dashboard/Features";
import HowItWorksSection from "@/Components/Dashboard/HowItWorksSection";
import LandingPage from "@/Components/Dashboard/LandingPage";
import NavBar from "@/Components/Navbar/NavBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12 md:px-18">
      <NavBar />
      <LandingPage />
      <HowItWorksSection />
      <FeaturesSection />
    </main>
  );
}
