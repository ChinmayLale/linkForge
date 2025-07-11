import Image from "next/image";
import LandingPage from '@/Components/Dashboard/LandingPage';
import NavBar from "@/Components/Navbar/NavBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-12 md:px-18">
      <LandingPage />
    </main>
  );
}
