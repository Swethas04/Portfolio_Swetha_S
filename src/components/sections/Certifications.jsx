import { useState, useMemo } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import Card3D from '../ui/Card3D';
import { certifications } from '../../data/portfolio';
import { Eye, Calendar, Building, Award } from 'lucide-react';

const CATEGORIES = ['All', 'Industry', 'NPTEL', 'Other'];

const CATEGORY_COLORS = {
  Industry: 'from-blue-500 to-indigo-600',
  NPTEL: 'from-orange-500 to-rose-600',
  Other: 'from-emerald-500 to-teal-600',
};

function CertCard({ cert, onOpen }) {
  return (
    <Card3D depth={22} glowColor="rgba(192, 132, 252, 0.3)" className="h-full">
      <article className="group flex flex-col h-full cursor-pointer p-6" onClick={() => onOpen(cert)} aria-label={cert.title}>
        {/* Category band */}
        <div className={`h-1.5 -mx-6 -mt-6 mb-4 bg-gradient-to-r ${CATEGORY_COLORS[cert.category] || 'from-purple-500 to-fuchsia-600'} rounded-t-2xl`} />

        {/* Category badge */}
        <span className="tag text-[11px] mb-3 self-start">{cert.category}</span>

        <h3 className="text-sm font-display font-bold text-purple-950 dark:text-white leading-snug mb-3 flex-1 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
          {cert.title}
        </h3>

        <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-purple-200 dark:border-white/10">
          <p className="flex items-center gap-2">
            <Building size={13} className="text-purple-600 dark:text-purple-400 shrink-0" />
            <span className="font-medium text-slate-800 dark:text-slate-300 truncate">{cert.issuer}</span>
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={13} className="text-purple-600 dark:text-purple-400 shrink-0" />
            <span>{cert.date}</span>
          </p>
          {cert.score && (
            <p className="flex items-center gap-2 font-semibold text-emerald-700 dark:text-emerald-300">
              <Award size={13} className="shrink-0" />
              <span>{cert.score}</span>
            </p>
          )}
          {cert.credentialId && (
            <p className="font-mono text-[10px] text-purple-700/70 dark:text-slate-400 truncate" title={cert.credentialId}>
              ID: {cert.credentialId}
            </p>
          )}
        </div>

        <button
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/40 text-purple-900 dark:text-purple-200 text-xs font-semibold hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 transition-all shadow-sm"
          onClick={(e) => { e.stopPropagation(); onOpen(cert); }}
          aria-label={`View ${cert.title} certificate`}
        >
          <Eye size={14} />
          View Certificate
        </button>
      </article>
    </Card3D>
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
    <section id="certifications" className="py-24 relative" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Verified Credentials</p>
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
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400/50'
                      : 'bg-white/80 dark:bg-white/5 text-purple-950 dark:text-slate-300 hover:text-purple-600 dark:hover:text-white border border-purple-200 dark:border-white/10 shadow-sm backdrop-blur-md hover:bg-white'
                  }`}
                  aria-pressed={filter === cat}
                >
                  {cat}
                  <span className="ml-1.5 text-[11px] opacity-80 font-mono">
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
              className="w-full sm:w-64 px-4 py-2 rounded-xl bg-white/90 dark:bg-white/5 border border-purple-200 dark:border-white/10 text-xs text-purple-950 dark:text-white placeholder:text-purple-400/70 focus:outline-none focus:border-purple-500 transition-colors shadow-sm backdrop-blur-md"
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

