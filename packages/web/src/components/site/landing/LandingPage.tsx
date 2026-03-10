import { Features } from "./Features";
import { Hero } from "./Hero";
import { Highlights } from "./Highlights";
import { HowItWorks } from "./HowItWorks";
import { LandingCTA } from "./LandingCTA";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { TechStack } from "./TechStack";
import { WhyNotNextjs } from "./WhyNotNextjs";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors">
      <LandingHeader />
      <main>
        <Hero />
        <Features />
        <WhyNotNextjs />
        <HowItWorks />
        <Highlights />
        <TechStack />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
