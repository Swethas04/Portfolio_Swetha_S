import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import Card3D from '../ui/Card3D';
import { workshops } from '../../data/portfolio';
import { BookOpen, Eye, Calendar } from 'lucide-react';

export default function Workshops() {
  const [lbIndex, setLbIndex] = useState(-1);

  const lbItems = workshops.map((w) => ({
    title: w.title,
    file: w.certImg || w.certificate,
  }));

  return (
    <section id="workshops" className="py-24 relative" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Events & Activities</p>
            <h2 className="section-title">Workshops & Competitions</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent hidden sm:block opacity-60" />

          <div className="space-y-6">
            {workshops.map((ws, i) => (
              <ScrollReveal key={ws.id} delay={i * 80}>
                <div className="flex gap-6 items-center">
                  {/* Timeline dot */}
                  <div className="hidden sm:flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-purple-600/30 z-10 text-white border border-white/20">
                      <BookOpen size={18} />
                    </div>
                  </div>
                  <Card3D depth={20} glowColor="rgba(192, 132, 252, 0.25)" className="flex-1">
                    <article className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-purple-700 dark:text-purple-400 font-mono text-xs font-semibold mb-1">{ws.event}</p>
                        <h3 className="font-display font-bold text-purple-950 dark:text-white text-base sm:text-lg">{ws.title}</h3>
                        <p className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs mt-1">
                          <Calendar size={13} />
                          {ws.date}
                        </p>
                      </div>
                      <button
                        onClick={() => setLbIndex(i)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all shrink-0 self-start sm:self-auto shadow-sm"
                      >
                        <Eye size={13} />
                        View Certificate
                      </button>
                    </article>
                  </Card3D>
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

