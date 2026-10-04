import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import { internships, industrialTraining } from '../../data/portfolio';
import { Briefcase, Calendar, Eye, MapPin, Hash, Factory } from 'lucide-react';

function TimelineCard({ entry, onCert }) {
  return (
    <article className="card flex-1 hover:border-indigo-400/50 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-1">{entry.role}</h3>
          <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">{entry.company}</p>

          {/* Location */}
          {entry.location && (
            <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono mt-1">
              <MapPin size={12} className="text-indigo-500" />
              {entry.location}
            </p>
          )}

          {/* Program / ID */}
          {entry.program && (
            <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono mt-0.5">
              <Hash size={12} className="text-indigo-500" />
              {entry.program}
            </p>
          )}
          {entry.id_code && !entry.program && (
            <p className="text-xs text-slate-500 font-mono mt-1">ID: {entry.id_code}</p>
          )}
        </div>

        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
          <span className="flex items-center gap-1.5 tag text-xs">
            <Calendar size={12} />
            {entry.duration}
          </span>
          {(entry.certificate || entry.certificateImg) && (
            <button
              onClick={() => onCert(entry)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-600/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
            >
              <Eye size={12} />
              View Certificate
            </button>
          )}
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4 font-body">
        {entry.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
        {entry.tech.map((t) => (
          <span key={t} className="px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Internship() {
  const [lbItems, setLbItems] = useState([]);
  const [lbIndex, setLbIndex] = useState(-1);

  const openCert = (entry) => {
    const items = entry.certificateImg
      ? [{ title: `${entry.company} – Certificate`, file: entry.certificateImg }]
      : entry.certificate
      ? [{ title: `${entry.company} – Certificate`, file: entry.certificate }]
      : [];
    setLbItems(items);
    setLbIndex(0);
  };

  return (
    <section id="internship" className="py-20 bg-slate-100/60 dark:bg-surface-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Internship ─────────────────────────────────────── */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Work Experience</p>
            <h2 className="section-title">Internships</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-transparent hidden md:block" />
          <div className="space-y-8">
            {internships.map((intern, i) => (
              <ScrollReveal key={intern.id} delay={i * 150} direction="left">
                <div className="flex gap-8">
                  <div className="hidden md:flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${intern.color} flex items-center justify-center shadow-lg shrink-0 z-10 text-white`}>
                      <Briefcase size={24} />
                    </div>
                  </div>
                  <TimelineCard entry={intern} onCert={openCert} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ── Industrial Training / Exposure ─────────────────── */}
        <div id="industrial" className="mt-20">
          <ScrollReveal delay={100}>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-600/60 to-transparent" />
              <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-white/5 border border-indigo-200 dark:border-white/10">
                <Factory size={16} className="text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">Industrial Training / Exposure</h3>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-600/60 to-transparent" />
            </div>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent hidden md:block" />
            <div className="space-y-8">
              {industrialTraining.map((entry, i) => (
                <ScrollReveal key={entry.id} delay={i * 150} direction="left">
                  <div className="flex gap-8">
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${entry.color} flex items-center justify-center shadow-lg shrink-0 z-10 text-white`}>
                        <Factory size={24} />
                      </div>
                    </div>
                    <TimelineCard entry={entry} onCert={openCert} />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

      </div>

      {lbIndex >= 0 && lbItems.length > 0 && (
        <Lightbox
          items={lbItems}
          index={lbIndex}
          onClose={() => setLbIndex(-1)}
          onPrev={() => setLbIndex((i) => (i - 1 + lbItems.length) % lbItems.length)}
          onNext={() => setLbIndex((i) => (i + 1) % lbItems.length)}
        />
      )}
    </section>
  );
}
