import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/Hero";
import { EligibilitySection } from "@/components/EligibilitySection";
import { DeroulementSection } from "@/components/DeroulementSection";
import { MapSection } from "./components/MapSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { ReservesSection } from "./components/ReservesSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <EligibilitySection />
        <DeroulementSection />
        <MapSection />
        <ReservesSection />
        <FaqSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}