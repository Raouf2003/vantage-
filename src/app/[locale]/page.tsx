import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ecosystem from "@/components/Ecosystem";
import Strategy from "@/components/Strategy";
import Investment from "@/components/Investment";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingLogo from "@/components/FloatingLogo";
import { AnchorProvider } from "@/contexts/AnchorContext";

export default function HomePage() {
  return (
    <AnchorProvider>
      <FloatingLogo />
      <Navbar />
      <main>
        <Hero />
        <Ecosystem />
        <Strategy />
        <Investment />
        <Contact />
      </main>
      <Footer />
    </AnchorProvider>
  );
}
