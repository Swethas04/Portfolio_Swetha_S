import ScrollReveal from '../ui/ScrollReveal';
import Card3D from '../ui/Card3D';
import { profiles } from '../../data/portfolio';
import { Github, Code, Terminal, Linkedin, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Lightbox from '../ui/Lightbox';

const ICON_MAP = {
  github: Github,
  code: Code,
  terminal: Terminal,
  linkedin: Linkedin,
};

export default function CodingProfiles() {
  const [lbItems, setLbItems] = useState([]);
  const [lbIndex, setLbIndex] = useState(-1);

  const openBadge = (p) => {
    if (p.badge) {
      setLbItems([{ title: p.name + ' Profile', file: p.badge }]);
      setLbIndex(0);
    }
  };

  return (
    <section id="coding" className="py-24 relative" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Online Presence</p>
            <h2 className="section-title">Profiles & Coding Platforms</h2>
            <div className="section-divider mx-auto" />
            <p className="section-subtitle text-center mx-auto">
              Explore my code repositories, competitive programming activity, and professional networks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14 items-stretch">
          {profiles.map((p, i) => {
            const Icon = ICON_MAP[p.icon] || Code;
            return (
              <ScrollReveal key={p.name} delay={i * 80} className="h-full">
                <Card3D depth={22} glowColor="rgba(192, 132, 252, 0.3)" className="h-full flex flex-col">
                  <article className="p-6 group flex flex-col flex-1 justify-between">
                    <div>
                      <div className={`h-1.5 -mx-6 -mt-6 mb-5 bg-gradient-to-r ${p.color} rounded-t-2xl`} />
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 shadow-md text-white border border-white/20`}>
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-display font-bold text-purple-950 dark:text-white mb-0.5">{p.name}</h3>
                      <p className="text-purple-700 dark:text-purple-400 text-xs font-mono font-medium mb-2.5">@{p.username}</p>
                      <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed mb-4">{p.description}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-purple-200 dark:border-white/10 mt-auto">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all shadow-sm whitespace-nowrap"
                      >
                        <ExternalLink size={13} />
                        Visit Profile
                      </a>
                      {p.badge && (
                        <button
                          onClick={() => openBadge(p)}
                          className="flex items-center justify-center px-3 py-2 rounded-xl bg-purple-100/60 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-purple-900 dark:text-slate-300 text-xs hover:bg-purple-200 dark:hover:bg-white/10 transition-colors shadow-sm shrink-0"
                          aria-label={`View ${p.name} badge`}
                        >
                          🏆
                        </button>
                      )}
                    </div>
                  </article>
                </Card3D>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Coding stats */}
        <ScrollReveal delay={200}>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto items-stretch">
            {[
              { label: 'LeetCode', note: 'DSA & Algorithms Practice', placeholder: '🟡 Active Problem Solver', icon: '💻' },
              { label: 'HackerRank', note: 'Problem Solving & Python', placeholder: '🟢 Verified Skills', icon: '⚡' },
            ].map((stat) => (
              <Card3D key={stat.label} depth={18} glowColor="rgba(192, 132, 252, 0.25)" className="h-full flex flex-col">
                <div className="p-6 text-center flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-3xl mb-2">{stat.icon}</p>
                    <p className="font-display font-bold text-purple-950 dark:text-white text-base mb-1">{stat.label}</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs mb-4">{stat.note}</p>
                  </div>
                  <div className="flex justify-center mt-auto">
                    <span className="tag text-xs whitespace-nowrap inline-block px-4 py-1.5">{stat.placeholder}</span>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {lbIndex >= 0 && lbItems.length > 0 && (
        <Lightbox
          items={lbItems}
          index={lbIndex}
          onClose={() => setLbIndex(-1)}
          onPrev={() => setLbIndex(0)}
          onNext={() => setLbIndex(0)}
        />
      )}
    </section>
  );
}

