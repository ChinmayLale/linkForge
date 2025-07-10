import Image from "next/image";
import Hero from '@/Components/Dashboard/Hero';
import NavBar from "@/Components/Navbar/NavBar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center  md:px-12">
      <Hero />
    </main>
  );
}
