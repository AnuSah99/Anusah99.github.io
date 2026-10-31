import React, { useState } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { TopHUD } from './components/TopHUD';
import { HeroSection } from './components/HeroSection';
import { ArsenalBento } from './components/ArsenalBento';
import { CareerTimeline } from './components/CareerTimeline';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactCommandCenter } from './components/ContactCommandCenter';
import { Footer } from './components/Footer';
import { HireModal } from './components/HireModal';

export const App: React.FC = () => {
  const [hireModalOpen, setHireModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 font-sans">
      {/* Dynamic Cyber Ambient Background */}
      <CyberBackground />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top HUD Telemetry Bar */}
        <TopHUD onOpenHireModal={() => setHireModalOpen(true)} />

        <main className="flex-1">
          {/* Hero Section with Dual-Column Typography & Interactive Terminal */}
          <HeroSection onOpenHireModal={() => setHireModalOpen(true)} />

          {/* Bento Grid: Tech Arsenal & Security Telemetry */}
          <ArsenalBento />

          {/* System Log: Career Timeline */}
          <CareerTimeline />

          {/* Featured Deployments & Projects (3D Tilt Cards) */}
          <ProjectsSection />

          {/* Futuristic Contact Command Center */}
          <ContactCommandCenter />
        </main>

        {/* System Footer */}
        <Footer />
      </div>

      {/* Sudo Hire Protocol Overlay Modal */}
      <HireModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />
    </div>
  );
};

export default App;
