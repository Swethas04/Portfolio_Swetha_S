import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import { workshops } from '../../data/portfolio';
import { BookOpen, Eye, Calendar } from 'lucide-react';

export default function Workshops() {
  const [lbIndex, setLbIndex] = useState(-1);

  const lbItems = workshops.map((w) => ({
    title: w.title,
    file: w.certImg || w.certificate,
  }));

  return (
    <section id="workshops" className="py-20 bg-slate-100/60 dark:bg-surface-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Events & Activities</p>
            <h2 className="section-title">Workshops & Competitions</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {workshops.map((ws, i) => (
              <ScrollReveal key={ws.id} delay={i * 80}>
                <div className="flex gap-6 items-center">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-md z-10 text-white">
                      <BookOpen size={18} />
                    </div>
                  </div>
                  <article className="card flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-indigo-400/50 transition-all">
                    <div>
                      <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold mb-1">{ws.event}</p>
                      <h3 className="font-display font-bold text-slate-900 dark:text-white text-base sm:text-lg">{ws.title}</h3>
                      <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-1">
                        <Calendar size={13} />
                        {ws.date}
                      </p>
                    </div>
                    <button
                      onClick={() => setLbIndex(i)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all shrink-0 self-start sm:self-auto shadow-sm"
                    >
                      <Eye size={13} />
                      View Certificate
                    </button>
                  </article>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>

      {lbIndex >= 0 && (
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
