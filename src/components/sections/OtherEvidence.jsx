import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import Card3D from '../ui/Card3D';
import { misc } from '../../data/portfolio';
import { Eye } from 'lucide-react';

export default function OtherEvidence() {
  const [lbIndex, setLbIndex] = useState(-1);
  const lbItems = misc.map((m) => ({ title: m.title, file: m.file }));

  return (
    <section id="other" className="py-24 relative" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Miscellaneous</p>
            <h2 className="section-title">Other Evidence & Achievements</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {misc.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100}>
              <Card3D depth={22} glowColor="rgba(192, 132, 252, 0.28)" className="h-full">
                <article className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <span className="tag text-[11px] mb-3 self-start">{item.category}</span>
                    <h3 className="font-display font-bold text-purple-950 dark:text-white text-base mb-2">{item.title}</h3>
                    <p className="text-slate-700 dark:text-slate-300 text-xs mb-4 leading-relaxed">{item.description}</p>
                  </div>
                  <button
                    onClick={() => setLbIndex(i)}
                    className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all w-full justify-center shadow-sm mt-auto"
                  >
                    <Eye size={13} />
                    View File
                  </button>
                </article>
              </Card3D>
            </ScrollReveal>
          ))}
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

