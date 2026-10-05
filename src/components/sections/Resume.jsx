import ScrollReveal from '../ui/ScrollReveal';
import Card3D from '../ui/Card3D';
import { hero } from '../../data/portfolio';
import { Download, FileText, CheckCircle } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="py-24 relative" style={{ perspective: '1200px' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-purple-600 dark:text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Curriculum Vitae</p>
            <h2 className="section-title">Resume & Summary</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Card3D depth={25} glowColor="rgba(192, 132, 252, 0.3)">
            <div className="p-6 sm:p-8">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4 pb-4 border-b border-purple-200 dark:border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/70 border border-purple-300 dark:border-purple-500/40 flex items-center justify-center shadow-md shadow-purple-600/20 text-purple-700 dark:text-white">
                    <FileText size={22} className="text-purple-700 dark:text-purple-300" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-purple-950 dark:text-white text-base">Resume-Swetha_S.docx</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">Official Document · Verified Portfolio</p>
                  </div>
                </div>
                <a
                  href={hero.resume}
                  download
                  className="btn-primary flex items-center gap-2 text-xs font-semibold"
                  aria-label="Download resume"
                >
                  <Download size={15} />
                  Download CV
                </a>
              </div>

              {/* Resume content preview */}
              <div className="bg-purple-50/70 dark:bg-black/40 rounded-2xl p-6 border border-purple-200/80 dark:border-white/10 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed shadow-inner backdrop-blur-md">
                <div>
                  <p className="text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-purple-600 dark:text-purple-400" />
                    Professional Summary
                  </p>
                  <p className="text-slate-800 dark:text-slate-300 font-sans text-sm">
                    Fresher software developer with hands-on experience building full-stack web applications and GenAI-powered platforms using Python, FastAPI, React, Node.js, and MySQL. CGPA 8.52, B.Tech Information Technology (2024–2028).
                  </p>
                </div>
                <div>
                  <p className="text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-purple-600 dark:text-purple-400" />
                    Core Stack
                  </p>
                  <p className="text-slate-800 dark:text-slate-300 font-sans text-sm">
                    Python · JavaScript · React · FastAPI · Node.js · Express · MySQL · Google Gemini API · Docker · AWS · RESTful APIs · Git
                  </p>
                </div>
                <div>
                  <p className="text-purple-700 dark:text-purple-300 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-purple-600 dark:text-purple-400" />
                    Work Experience
                  </p>
                  <ul className="text-slate-800 dark:text-slate-300 font-sans text-sm space-y-1">
                    <li>• <span className="font-semibold text-purple-950 dark:text-white">Full Stack Developer Intern</span> – Teceze (Jun–Jul 2026)</li>
                    <li>• <span className="font-semibold text-purple-950 dark:text-white">Web Development Intern</span> – ShadowFox (Jun 2025)</li>
                  </ul>
                </div>
                <div className="pt-2 border-t border-purple-200 dark:border-white/10 text-slate-600 dark:text-slate-400 text-xs font-sans">
                  📎 Download the official resume document above for detailed academic scores, project metrics, and complete timeline.
                </div>
              </div>
            </div>
          </Card3D>
        </ScrollReveal>
      </div>
    </section>
  );
}

