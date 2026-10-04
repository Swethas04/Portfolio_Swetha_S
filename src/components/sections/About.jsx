import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import { about, skills, education } from '../../data/portfolio';
import { GraduationCap, Award, Code, Compass, Sparkles } from 'lucide-react';

const SKILL_PILL_STYLES = {
  Languages: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  Frameworks: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/40 dark:text-violet-300 dark:border-violet-800/40',
  Databases: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
  'AI / APIs': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-800/40',
  Tools: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  'Cloud / DevOps': 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/40',
  Design: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 dark:border-fuchsia-800/40',
};

const STAT_ICONS = [Code, Award, Compass, GraduationCap];

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Who I Am</p>
            <h2 className="section-title">Student Profile & Background</h2>
            <div className="section-divider mx-auto" />
            <p className="section-subtitle mx-auto text-center">
              {about.bio}
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal delay={100}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
            {about.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i] || Sparkles;
              return (
                <div key={stat.label} className="card text-center group">
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-600/30 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon size={22} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <p className="text-3xl font-display font-extrabold gradient-text">
                    <AnimatedCounter target={stat.value} />
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-body font-medium mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Education */}
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
                <GraduationCap className="text-indigo-600 dark:text-indigo-400" size={24} />
                Academic Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="card flex items-start gap-4 group">
                    <span className="text-3xl p-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">{edu.icon}</span>
                    <div className="flex-1">
                      <p className="text-slate-900 dark:text-white font-display font-bold text-base">{edu.degree}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{edu.institution}</p>
                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="tag text-xs">{edu.year}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-600/30 bg-emerald-50 dark:bg-emerald-950/40">
                          {edu.score}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Skills */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
                <Code className="text-indigo-600 dark:text-indigo-400" size={24} />
                Technical Competencies
              </h3>
              <div className="card space-y-5">
                {Object.entries(skills).filter(([k]) => k !== 'Languages_Spoken').map(([category, items]) => (
                  <div key={category}>
                    <p className="text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-all cursor-default shadow-sm ${
                            SKILL_PILL_STYLES[category] || 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-white/5 dark:text-slate-300 dark:border-white/10'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Languages spoken */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-white/10">
                  <p className="text-slate-700 dark:text-slate-300 text-xs font-mono font-semibold mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Languages Spoken
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.Languages_Spoken.map((l) => (
                      <span key={l} className="px-3 py-1 rounded-lg text-xs font-mono bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-600/30 text-amber-800 dark:text-amber-300 font-medium">
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
