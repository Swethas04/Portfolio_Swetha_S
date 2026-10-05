import { useState, useEffect } from 'react';
import { Download, Mail, ArrowDown, Github, Linkedin, Code2, Sparkles } from 'lucide-react';
import { hero } from '../../data/portfolio';
import Card3D from '../ui/Card3D';

const ROLES = [
  "Fresher Software Developer",
  "Full-Stack Engineer",
  "AI & GenAI Builder",
  "B.Tech IT · 2024–2028",
];

function useTyping(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < word.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setText(word.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTyping(ROLES);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
      style={{ perspective: '1200px' }}
      aria-label="Introduction"
    >
      {/* 3D Volumetric Light Halo and Deep Space Depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(216,180,254,0.2) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 75%, rgba(244,114,182,0.15) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-15" />
        
        {/* Floating cosmic glow spheres */}
        <div className="orb w-96 h-96 bg-purple-600/15 top-1/4 -left-36" />
        <div className="orb w-80 h-80 bg-fuchsia-600/15 bottom-1/4 right-0" />
        <div className="orb w-64 h-64 bg-pink-600/12 top-2/3 left-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* 3D Floating Glass Platform Container */}
        <Card3D depth={35} glowColor="rgba(192, 132, 252, 0.3)" className="p-8 sm:p-12 lg:p-14">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left – text (7 cols) */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-400/35 text-purple-800 dark:text-purple-200 text-xs font-mono font-medium mb-6 shadow-md backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                <Sparkles size={13} className="text-purple-600 dark:text-purple-400" />
                Available for Internships & Full-time Roles
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-display font-extrabold text-purple-950 dark:text-white leading-[1.1] mb-5 tracking-tight">
                Hi, I'm{' '}
                <span className="gradient-text">Swetha S</span>
              </h1>

              {/* Typing animation */}
              <div className="h-10 mb-6">
                <p className="text-xl sm:text-2xl font-display font-semibold text-purple-900 dark:text-purple-100 flex items-center justify-center lg:justify-start">
                  <span className="text-purple-600 dark:text-purple-400 font-mono mr-2">&gt;</span>
                  <span>{typed}</span>
                  <span className="inline-block w-0.5 h-6 bg-purple-600 dark:bg-purple-400 ml-1.5 animate-pulse" />
                </p>
              </div>

              <p className="text-slate-600 dark:text-purple-200/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-body">
                {hero.tagline} Passionate about architecting scalable full-stack applications with React, FastAPI, Node.js, and Google Gemini.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start mb-8">
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary flex items-center gap-2"
                >
                  <Code2 size={18} />
                  Explore Projects
                </button>
                <a
                  href={hero.resume}
                  download
                  className="btn-outline flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </a>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-outline"
                >
                  <Mail size={18} />
                  Contact
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 justify-center lg:justify-start flex-wrap">
                <a
                  href={hero.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-purple-100/60 dark:bg-white/5 border border-purple-300/60 dark:border-white/10 text-purple-900 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:border-purple-400 shadow-sm hover:shadow transition-all"
                  aria-label="GitHub profile"
                >
                  <Github size={18} />
                </a>
                <a
                  href={hero.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-purple-100/60 dark:bg-white/5 border border-purple-300/60 dark:border-white/10 text-purple-900 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:border-purple-400 shadow-sm hover:shadow transition-all"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={`mailto:${hero.email}`}
                  className="p-2.5 rounded-xl bg-purple-100/60 dark:bg-white/5 border border-purple-300/60 dark:border-white/10 text-purple-900 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white hover:border-purple-400 shadow-sm hover:shadow transition-all"
                  aria-label="Send email"
                >
                  <Mail size={18} />
                </a>
                <span className="text-purple-300 dark:text-purple-800 hidden sm:inline">|</span>
                <span className="text-purple-700 dark:text-purple-300 text-xs font-mono">{hero.email}</span>
              </div>
            </div>

            {/* Right – avatar/visual (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                {/* Outer glowing halo */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-purple-500/30 via-fuchsia-500/30 to-pink-500/30 blur-xl opacity-75 animate-pulse-slow" />
                
                {/* Subtle decorative 3D orbits */}
                <div
                  className="absolute inset-0 rounded-full border border-purple-400/40 animate-spin-slow"
                  style={{ margin: '-20px' }}
                />
                <div
                  className="absolute inset-0 rounded-full border border-dashed border-fuchsia-400/40 animate-spin-slow"
                  style={{ margin: '-40px', animationDirection: 'reverse', animationDuration: '16s' }}
                />

                {/* Avatar circular frame */}
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full glass border-2 border-purple-400/50 p-3 shadow-2xl shadow-purple-500/25 relative z-10 animate-float">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-purple-100 to-fuchsia-100 dark:from-purple-950 dark:to-slate-900 flex items-center justify-center">
                    <img
                      src="./assets/profile-pfp.jpeg"
                      alt="Swetha S – Profile Portrait"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-700 items-center justify-center"
                      aria-label="Photo placeholder"
                    >
                      <span className="text-7xl font-display font-bold text-white">SS</span>
                    </div>
                  </div>
                </div>

                {/* Floating 3D badges */}
                <div className="absolute -bottom-3 -left-6 glass px-3.5 py-1.5 rounded-xl border border-purple-400/40 text-xs font-mono font-medium text-purple-900 dark:text-purple-200 shadow-xl shadow-purple-500/20 z-20 flex items-center gap-1.5 backdrop-blur-xl">
                  <span className="text-amber-400 font-bold">★</span>
                  <span>CGPA 8.52</span>
                </div>
                <div className="absolute -top-3 -right-6 glass px-3.5 py-1.5 rounded-xl border border-fuchsia-400/40 text-xs font-mono font-medium text-purple-900 dark:text-fuchsia-200 shadow-xl shadow-fuchsia-500/20 z-20 flex items-center gap-1.5 backdrop-blur-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>LeetCode Active</span>
                </div>
              </div>
            </div>
          </div>
        </Card3D>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={scrollToAbout} 
            aria-label="Scroll down" 
            className="p-2 rounded-full text-purple-400 hover:text-fuchsia-300 hover:bg-white/5 transition-all animate-bounce"
          >
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

