import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import { misc } from '../../data/portfolio';
import { Eye } from 'lucide-react';

export default function OtherEvidence() {
  const [lbIndex, setLbIndex] = useState(-1);
  const lbItems = misc.map((m) => ({ title: m.title, file: m.file }));

  return (
    <section id="other" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Miscellaneous</p>
            <h2 className="section-title">Other Evidence & Achievements</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {misc.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100}>
              <article className="card group hover:border-indigo-400/50 transition-all flex flex-col">
                <span className="tag text-[11px] mb-3 self-start">{item.category}</span>
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-base mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs mb-4 leading-relaxed flex-1">{item.description}</p>
                <button
                  onClick={() => setLbIndex(i)}
                  className="flex items-center gap-1.5 py-2 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all w-full justify-center shadow-sm mt-auto"
                >
                  <Eye size={13} />
                  View File
                </button>
              </article>
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
