import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/Hero";
import { EligibilitySection } from "@/components/EligibilitySection";
import { DeroulementSection } from "@/components/DeroulementSection";
import { MapSection } from "@/components/MapSection";
import { ReservesSection } from "@/components/ReservesSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* C1 — Pourquoi donner (accroche + argument central) */}
        <HeroSection />

        {/* C2 + C3 — Qui peut donner / Simulateur d'éligibilité */}
        <EligibilitySection />

        {/* C4 + C5 — Déroulement du don / Préparation */}
        <DeroulementSection />

        {/* C6 — Où donner (carte des centres, départements + villes) */}
        <MapSection />

        {/* C7 — État des réserves par groupe sanguin */}
        <ReservesSection />

        {/* C8 — FAQ & idées reçues */}
        <FaqSection />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}