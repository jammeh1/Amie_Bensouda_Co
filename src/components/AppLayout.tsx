import React, { useState } from 'react';
import Navigation from './firm/Navigation';
import Hero from './firm/Hero';
import Stats from './firm/Stats';
import About from './firm/About';
import PracticeAreas from './firm/PracticeAreas';
import Team from './firm/Team';
import Insights from './firm/Insights';
import International from './firm/International';
import Careers from './firm/Careers';
import Contact from './firm/Contact';
import Footer from './firm/Footer';
import StickyCTA from './firm/StickyCTA';

// Map each nav id to the section component(s) that should show for it
const sectionMap: Record<string, React.ReactNode> = {
  about: <About />,
  practice: <PracticeAreas />,
  team: <Team />,
  insights: <Insights />,
  international: <International />,
  careers: <Careers />,
  contact: <Contact />,
};

const AppLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const isHome = activeSection === null;

  return (
    <div className="min-h-screen bg-white text-[#111] overflow-x-hidden">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main>
        {isHome ? (
          <>
            <Hero />
            <Stats />
            <About />
            <PracticeAreas />
            <Team />
            <Insights />
            <International />
            <Careers />
            <Contact />
          </>
        ) : (
          <div className="pt-24 lg:pt-28 min-h-[calc(100vh-200px)]">
            {sectionMap[activeSection]}
          </div>
        )}
      </main>
      <Footer />
      {isHome && <StickyCTA />}
    </div>
  );
};

export default AppLayout;
