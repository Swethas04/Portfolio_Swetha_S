import { useState, useMemo } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import { certifications } from '../../data/portfolio';
import { Eye, Calendar, Building, Award } from 'lucide-react';

const CATEGORIES = ['All', 'Industry', 'NPTEL', 'Other'];

const CATEGORY_COLORS = {
  Industry: 'from-blue-600 to-indigo-600',
  NPTEL: 'from-orange-500 to-rose-600',
  Other: 'from-emerald-500 to-teal-600',
};

function CertCard({ cert, onOpen }) {
  return (
    <article className="card group flex flex-col h-full cursor-pointer hover:border-indigo-400/50 transition-all duration-300" onClick={() => onOpen(cert)} aria-label={cert.title}>
      {/* Category band */}
      <div className={`h-1.5 -mx-6 -mt-6 mb-4 bg-gradient-to-r ${CATEGORY_COLORS[cert.category] || 'from-slate-400 to-slate-600'}`} />

      {/* Category badge */}
      <span className="tag text-[11px] mb-3 self-start">{cert.category}</span>

      <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white leading-snug mb-3 flex-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors">
        {cert.title}
      </h3>

      <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5">
        <p className="flex items-center gap-2">
          <Building size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="font-medium text-slate-700 dark:text-slate-300 truncate">{cert.issuer}</span>
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={13} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>{cert.date}</span>
        </p>
        {cert.score && (
          <p className="flex items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
            <Award size={13} className="shrink-0" />
            <span>{cert.score}</span>
          </p>
        )}
        {cert.credentialId && (
          <p className="font-mono text-[10px] text-slate-400 dark:text-slate-500 truncate" title={cert.credentialId}>
            ID: {cert.credentialId}
          </p>
        )}
      </div>

      <button
        className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-200 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
        onClick={(e) => { e.stopPropagation(); onOpen(cert); }}
        aria-label={`View ${cert.title} certificate`}
      >
        <Eye size={14} />
        View Certificate
      </button>
    </article>
  );
}

export default function Certifications() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [lbIndex, setLbIndex] = useState(-1);

  const filtered = useMemo(() => {
    return certifications.filter((c) => {
      const matchCat = filter === 'All' || c.category === filter;
      const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  const openLightbox = (cert) => {
    const idx = filtered.findIndex((c) => c.id === cert.id);
    setLbIndex(idx);
  };

  return (
    <section id="certifications" className="py-20 bg-slate-100/60 dark:bg-surface-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Verified Credentials</p>
            <h2 className="section-title">Certifications & Learning</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        {/* Filter + Search */}
        <ScrollReveal delay={100}>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-center justify-between">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-display font-semibold transition-all ${
                    filter === cat
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white border border-slate-200/80 dark:border-white/10 shadow-sm'
                  }`}
                  aria-pressed={filter === cat}
                >
                  {cat}
                  <span className="ml-1.5 text-[11px] opacity-70 font-mono">
                    ({cat === 'All' ? certifications.length : certifications.filter((c) => c.category === cat).length})
                  </span>
                </button>
              ))}
            </div>
            {/* Search */}
            <input
              type="search"
              placeholder="Search certifications…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-sm"
              aria-label="Search certifications"
            />
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cert, i) => (
            <ScrollReveal key={cert.id} delay={i * 40}>
              <CertCard cert={cert} onOpen={openLightbox} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-medium">
            No certifications match your search criteria.
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lbIndex >= 0 && (
        <Lightbox
          items={filtered}
          index={lbIndex}
          onClose={() => setLbIndex(-1)}
          onPrev={() => setLbIndex((i) => (i - 1 + filtered.length) % filtered.length)}
          onNext={() => setLbIndex((i) => (i + 1) % filtered.length)}
        />
      )}
    </section>
  );
}
