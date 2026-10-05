import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import Card3D from '../ui/Card3D';
import { about, skills, education } from '../../data/portfolio';
import { GraduationCap, Award, Code, Compass, Sparkles } from 'lucide-react';

const SKILL_PILL_STYLES = {
  Languages: 'bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-600/40 hover:border-purple-500',
  Frameworks: 'bg-fuchsia-100 dark:bg-fuchsia-950/60 text-fuchsia-800 dark:text-fuchsia-300 border-fuchsia-300 dark:border-fuchsia-600/40 hover:border-fuchsia-500',
  Databases: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-600/40 hover:border-emerald-500',
  'AI / APIs': 'bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-pink-300 border-pink-300 dark:border-pink-600/40 hover:border-pink-500',
  Tools: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-600/40 hover:border-amber-500',
  'Cloud / DevOps': 'bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 border-violet-300 dark:border-violet-600/40 hover:border-violet-500',
  Design: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-600/40 hover:border-rose-500',
};

const STAT_ICONS = [Code, Award, Compass, GraduationCap];

export default function About() {
  return (
    <section id="about" className="py-24 relative" style={{ perspective: '1200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Who I Am</p>
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
                <Card3D key={stat.label} depth={20} glowColor="rgba(192, 132, 252, 0.35)">
                  <div className="text-center group p-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-500/40 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-md shadow-purple-600/20">
                      <Icon size={22} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <p className="text-3xl font-display font-extrabold gradient-text">
                      <AnimatedCounter target={stat.value} />
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs font-body font-medium mt-1">{stat.label}</p>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Education */}
          <ScrollReveal direction="left">
            <div>
              <h3 className="text-xl font-display font-bold text-purple-950 dark:text-white mb-6 flex items-center gap-2.5">
                <GraduationCap className="text-purple-600 dark:text-purple-400" size={24} />
                Academic Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <Card3D key={i} depth={18} glowColor="rgba(192, 132, 252, 0.25)">
                    <div className="flex items-start gap-4 group p-2">
                      <span className="text-3xl p-2.5 rounded-2xl bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-white/10 shadow-md">{edu.icon}</span>
                      <div className="flex-1">
                        <p className="text-purple-950 dark:text-white font-display font-bold text-base">{edu.degree}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-0.5">{edu.institution}</p>
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                          <span className="tag text-xs">{edu.year}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 bg-emerald-100 dark:bg-emerald-950/50 shadow-sm">
                            {edu.score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Skills */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-xl font-display font-bold text-purple-950 dark:text-white mb-6 flex items-center gap-2.5">
                <Code className="text-purple-600 dark:text-purple-400" size={24} />
                Technical Competencies
              </h3>
              <Card3D depth={22} glowColor="rgba(192, 132, 252, 0.25)">
                <div className="space-y-5 p-2">
                  {Object.entries(skills).filter(([k]) => k !== 'Languages_Spoken').map(([category, items]) => (
                    <div key={category}>
                      <p className="text-purple-900 dark:text-slate-300 text-xs font-mono font-semibold mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-sm shadow-purple-400" />
                        {category}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-all cursor-default shadow-sm backdrop-blur-md ${
                              SKILL_PILL_STYLES[category] || 'bg-purple-100 dark:bg-white/5 text-purple-900 dark:text-slate-300 border-purple-200 dark:border-white/10'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Languages spoken */}
                  <div className="pt-2 border-t border-purple-200/60 dark:border-white/10">
                    <p className="text-purple-900 dark:text-slate-300 text-xs font-mono font-semibold mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-sm shadow-amber-400" />
                      Languages Spoken
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.Languages_Spoken.map((l) => (
                        <span key={l} className="px-3 py-1 rounded-lg text-xs font-mono bg-amber-100 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-600/40 text-amber-900 dark:text-amber-300 font-medium shadow-sm">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

