import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import { hackathons } from '../../data/portfolio';
import { Trophy, Eye } from 'lucide-react';

const RESULT_STYLE = {
  Winner: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-600/50 text-amber-800 dark:text-amber-300 font-bold',
  Finalist: 'bg-violet-50 dark:bg-violet-950/40 border-violet-300 dark:border-violet-600/50 text-violet-800 dark:text-violet-300 font-bold',
  Participant: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium',
};

export default function Hackathons() {
  const [lbItems, setLbItems] = useState([]);
  const [lbIndex, setLbIndex] = useState(-1);

  const openCert = (hack) => {
    if (hack.certificate) {
      setLbItems([{ title: hack.name, file: hack.certificate }]);
      setLbIndex(0);
    }
  };

  return (
    <section id="hackathons" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Competitions</p>
            <h2 className="section-title">Hackathons & Technical Events</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {hackathons.map((hack, i) => (
            <ScrollReveal key={hack.id} delay={i * 100}>
              <article className="card group h-full flex flex-col hover:border-indigo-400/50 transition-all duration-300">
                {/* Gradient strip */}
                <div className={`h-1.5 -mx-6 -mt-6 mb-5 bg-gradient-to-r ${hack.color}`} />

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${hack.color} flex items-center justify-center shrink-0 shadow-md text-white`}>
                      <Trophy size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-mono">{hack.year}</span>
                      {hack.team && (
                        <p className="text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">Team: {hack.team}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-display border shadow-sm ${RESULT_STYLE[hack.result] || 'bg-slate-100 text-slate-700'}`}>
                    {hack.result}
                  </span>
                </div>

                <h3 className="text-base font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex-1">
                  {hack.name}
                </h3>

                {hack.organiser && (
                  <p className="text-slate-600 dark:text-slate-400 text-xs mb-1.5 font-medium">🏛️ {hack.organiser}</p>
                )}
                {hack.round && (
                  <p className="text-slate-500 text-xs font-mono mb-2">{hack.round}</p>
                )}
                {hack.date && (
                  <p className="text-slate-500 text-xs mb-4">📅 {hack.date}</p>
                )}

                {hack.certificate && (
                  <button
                    onClick={() => openCert(hack)}
                    className="mt-auto flex items-center gap-2 py-2 px-4 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all w-full justify-center shadow-sm"
                  >
                    <Eye size={14} />
                    View Certificate
                  </button>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
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
