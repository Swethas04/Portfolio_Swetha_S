import { useState, useEffect } from 'react';
import CustomCursor from './components/ui/CustomCursor';
import InteractiveBackground from './components/ui/InteractiveBackground';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Resume from './components/sections/Resume';
import CodingProfiles from './components/sections/CodingProfiles';
import Certifications from './components/sections/Certifications';
import Projects from './components/sections/Projects';
import Internship from './components/sections/Internship';
import Hackathons from './components/sections/Hackathons';
import Workshops from './components/sections/Workshops';
import OtherEvidence from './components/sections/OtherEvidence';
import Contact from './components/sections/Contact';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090a16] text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      {/* Dynamic Interactive Canvas & Glow Background */}
      <InteractiveBackground />

      {/* Dual Layer Glass Magnetic Cursor */}
      <CustomCursor />

      {/* Main Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Portfolio Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Resume />
        <CodingProfiles />
        <Certifications />
        <Projects />
        <Internship />
        <Hackathons />
        <Workshops />
        <OtherEvidence />
        <Contact />
      </main>
    </div>
  );
}
