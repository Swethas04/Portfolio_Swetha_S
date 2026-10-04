import ScrollReveal from '../ui/ScrollReveal';
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
    <section id="coding" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Online Presence</p>
            <h2 className="section-title">Profiles & Coding Platforms</h2>
            <div className="section-divider mx-auto" />
            <p className="section-subtitle text-center mx-auto">
              Explore my code repositories, competitive programming activity, and professional networks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {profiles.map((p, i) => {
            const Icon = ICON_MAP[p.icon] || Code;
            return (
              <ScrollReveal key={p.name} delay={i * 80}>
                <article className="card group flex flex-col h-full hover:border-indigo-400/50 transition-all duration-300">
                  <div className={`h-1.5 -mx-6 -mt-6 mb-5 bg-gradient-to-r ${p.color}`} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-4 shadow-md text-white`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-0.5">{p.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-xs font-mono mb-2.5">@{p.username}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 flex-1">{p.description}</p>
                  <div className="flex gap-2 mt-auto pt-2 border-t border-slate-100 dark:border-white/5">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                    >
                      <ExternalLink size={13} />
                      Visit Profile
                    </a>
                    {p.badge && (
                      <button
                        onClick={() => openBadge(p)}
                        className="flex items-center justify-center px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 text-xs hover:bg-slate-200 transition-colors shadow-sm"
                        aria-label={`View ${p.name} badge`}
                      >
                        🏆
                      </button>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Coding stats */}
        <ScrollReveal delay={200}>
          <div className="grid sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            {[
              { label: 'LeetCode', note: 'DSA & Algorithms Practice', placeholder: '🟡 Active Problem Solver', icon: '💻' },
              { label: 'HackerRank', note: 'Problem Solving & Python', placeholder: '🟢 Verified Skills', icon: '⚡' },
            ].map((stat) => (
              <div key={stat.label} className="card text-center">
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="font-display font-bold text-slate-900 dark:text-white text-base mb-0.5">{stat.label}</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">{stat.note}</p>
                <span className="tag text-xs">{stat.placeholder}</span>
              </div>
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
