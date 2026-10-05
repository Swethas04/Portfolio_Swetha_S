import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import Card3D from '../ui/Card3D';
import { hackathons } from '../../data/portfolio';
import { Trophy, Eye } from 'lucide-react';

const RESULT_STYLE = {
  Winner: 'bg-amber-100 dark:bg-amber-950/70 border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-300 font-bold shadow-sm',
  Finalist: 'bg-purple-100 dark:bg-violet-950/70 border-purple-300 dark:border-violet-500/50 text-purple-900 dark:text-violet-300 font-bold shadow-sm',
  Participant: 'bg-purple-50 dark:bg-white/5 border-purple-200 dark:border-white/10 text-purple-900 dark:text-slate-300 font-medium',
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
    <section id="hackathons" className="py-24 relative" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Competitions</p>
            <h2 className="section-title">Hackathons & Technical Events</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {hackathons.map((hack, i) => (
            <ScrollReveal key={hack.id} delay={i * 100}>
              <Card3D depth={25} glowColor="rgba(192, 132, 252, 0.3)" className="h-full">
                <article className="p-6 h-full flex flex-col justify-between" aria-label={hack.name}>
                  <div>
                    {/* Gradient strip */}
                    <div className={`h-1.5 -mx-6 -mt-6 mb-5 bg-gradient-to-r ${hack.color} rounded-t-2xl`} />

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${hack.color} flex items-center justify-center shrink-0 shadow-md text-white border border-white/20`}>
                          <Trophy size={18} />
                        </div>
                        <div>
                          <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">{hack.year}</span>
                          {hack.team && (
                            <p className="text-xs text-purple-700 dark:text-purple-400 font-mono font-semibold">Team: {hack.team}</p>
                          )}
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-display border shadow-sm ${RESULT_STYLE[hack.result] || 'bg-purple-50 dark:bg-white/5 text-purple-900 dark:text-slate-300 border-purple-200 dark:border-white/10'}`}>
                        {hack.result}
                      </span>
                    </div>

                    <h3 className="text-base font-display font-bold text-purple-950 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex-1">
                      {hack.name}
                    </h3>

                    {hack.organiser && (
                      <p className="text-slate-700 dark:text-slate-300 text-xs mb-1.5 font-medium">🏛️ {hack.organiser}</p>
                    )}
                    {hack.round && (
                      <p className="text-purple-700 dark:text-purple-300/90 text-xs font-mono mb-2">{hack.round}</p>
                    )}
                    {hack.date && (
                      <p className="text-slate-600 dark:text-slate-400 text-xs mb-4">📅 {hack.date}</p>
                    )}
                  </div>

                  {hack.certificate && (
                    <button
                      onClick={() => openCert(hack)}
                      className="mt-auto flex items-center gap-2 py-2 px-4 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all w-full justify-center shadow-sm"
                    >
                      <Eye size={14} />
                      View Certificate
                    </button>
                  )}
                </article>
              </Card3D>
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

