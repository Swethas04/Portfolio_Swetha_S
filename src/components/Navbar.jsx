import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollSpy';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certs' },
  { id: 'internship', label: 'Experience' },
  { id: 'hackathons', label: 'Hackathons' },
  { id: 'coding', label: 'Profiles' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const progress = useScrollProgress();

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
      const scrollY = window.scrollY + 140;
      let current = 'hero';
      for (const sec of sections) {
        if (sec.offsetTop <= scrollY) current = sec.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        id="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-300 ${
          scrolled ? 'py-2.5' : 'py-5'
        }`}
        aria-label="Main navigation"
      >
        <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled 
            ? 'glass rounded-2xl mx-4 sm:mx-6 shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-slate-200/80 dark:border-white/10' 
            : 'bg-transparent'
        }`}>
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5 group"
              aria-label="Go to top"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-indigo-500/50 shadow-md shadow-indigo-600/25 group-hover:scale-110 transition-transform bg-indigo-50 dark:bg-white/5 shrink-0">
                <img
                  src="./assets/profile-pfp.jpeg"
                  alt="Swetha S Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <span className="hidden w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 items-center justify-center text-white font-display font-bold text-xs">
                  SS
                </span>
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors hidden sm:block tracking-tight text-base">
                Swetha S
              </span>
            </button>

            {/* Desktop Nav */}
            <ul className="hidden lg:flex items-center gap-1 bg-slate-200/50 dark:bg-white/5 p-1 rounded-xl border border-slate-300/40 dark:border-white/10 backdrop-blur-md" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-display font-semibold transition-all duration-200 ${
                      activeSection === item.id
                        ? 'text-white bg-indigo-600 shadow-md shadow-indigo-600/25'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Right: theme toggle + hamburger */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all active:scale-95"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-600" />}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden pb-4 border-t border-slate-200 dark:border-white/10 mt-2 pt-4">
              <ul className="flex flex-col gap-1.5" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-display font-medium transition-all ${
                        activeSection === item.id
                          ? 'text-white bg-indigo-600 shadow-sm shadow-indigo-600/30'
                          : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
