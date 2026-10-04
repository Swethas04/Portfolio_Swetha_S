import { useState, useEffect } from 'react';
import { Download, Mail, ArrowDown, Github, Linkedin, Code2, Sparkles } from 'lucide-react';
import { hero } from '../../data/portfolio';

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
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20"
      aria-label="Introduction"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle radial light gradients */}
        <div
          className="absolute inset-0 opacity-70 dark:opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 85% 75%, rgba(168,85,247,0.12) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-20" />
        
        {/* Floating gradient orbs */}
        <div className="orb w-80 h-80 bg-indigo-400/20 dark:bg-indigo-600/20 top-1/4 -left-36" />
        <div className="orb w-72 h-72 bg-violet-400/20 dark:bg-violet-600/20 bottom-1/4 right-0" />
        <div className="orb w-56 h-56 bg-pink-400/15 dark:bg-pink-600/15 top-2/3 left-1/3" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left – text (7 cols) */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <Sparkles size={13} className="text-indigo-600 dark:text-indigo-400" />
              Available for Internships & Full-time Roles
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-display font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-5 tracking-tight">
              Hi, I'm{' '}
              <span className="gradient-text">Swetha S</span>
            </h1>

            {/* Typing animation */}
            <div className="h-10 mb-6">
              <p className="text-xl sm:text-2xl font-display font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center lg:justify-start">
                <span className="text-indigo-600 dark:text-indigo-400 font-mono mr-2">&gt;</span>
                <span>{typed}</span>
                <span className="inline-block w-0.5 h-6 bg-indigo-600 dark:bg-indigo-400 ml-1.5 animate-pulse" />
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 font-body">
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
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-0.5"
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
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-300 dark:hover:border-indigo-500 shadow-sm hover:shadow transition-all"
                aria-label="GitHub profile"
              >
                <Github size={18} />
              </a>
              <a
                href={hero.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-300 dark:hover:border-indigo-500 shadow-sm hover:shadow transition-all"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={`mailto:${hero.email}`}
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-300 dark:hover:border-indigo-500 shadow-sm hover:shadow transition-all"
                aria-label="Send email"
              >
                <Mail size={18} />
              </a>
              <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">|</span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">{hero.email}</span>
            </div>
          </div>

          {/* Right – avatar/visual (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Outer glowing halo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-pink-500/20 blur-xl opacity-75 animate-pulse-slow" />
              
              {/* Subtle decorative orbits */}
              <div
                className="absolute inset-0 rounded-full border border-indigo-500/25 dark:border-indigo-400/20 animate-spin-slow"
                style={{ margin: '-20px' }}
              />
              <div
                className="absolute inset-0 rounded-full border border-dashed border-violet-500/25 dark:border-violet-400/20 animate-spin-slow"
                style={{ margin: '-40px', animationDirection: 'reverse', animationDuration: '16s' }}
              />

              {/* Avatar circular frame */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full glass border-2 border-white/80 dark:border-indigo-500/30 p-3 shadow-2xl shadow-indigo-500/20 relative z-10 animate-float">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-indigo-100 to-violet-50 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
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
                    className="hidden w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 items-center justify-center"
                    aria-label="Photo placeholder"
                  >
                    <span className="text-7xl font-display font-bold text-white">SS</span>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-3 -left-6 glass px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-indigo-500/30 text-xs font-mono font-medium text-slate-800 dark:text-indigo-200 shadow-lg shadow-indigo-500/10 z-20 flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">★</span>
                <span>CGPA 8.52</span>
              </div>
              <div className="absolute -top-3 -right-6 glass px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-violet-500/30 text-xs font-mono font-medium text-slate-800 dark:text-violet-200 shadow-lg shadow-violet-500/10 z-20 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>LeetCode Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={scrollToAbout} 
            aria-label="Scroll down" 
            className="p-2 rounded-full text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all animate-bounce"
          >
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
