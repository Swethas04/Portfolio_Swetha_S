import { useState, useEffect } from 'react';
import CustomCursor from './components/ui/CustomCursor';
import CosmicCanvas from './components/ui/CosmicCanvas';
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
    return localStorage.getItem('portfolio-theme') || 'dark';
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
    <div className="min-h-screen bg-[#f5f0fb] dark:bg-[#0c0714] text-slate-800 dark:text-purple-100 transition-colors duration-300 relative overflow-hidden">
      {/* Real-time 3D Cosmic Constellation WebGL Universe */}
      <CosmicCanvas />

      {/* 3D Gravitational Quantum Cursor */}
      <CustomCursor />

      {/* 3D Floating Glass Deck Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* 3D Immersive Spatial Portfolio Sections */}
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


