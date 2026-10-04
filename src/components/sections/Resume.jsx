import ScrollReveal from '../ui/ScrollReveal';
import { hero } from '../../data/portfolio';
import { Download, FileText, CheckCircle } from 'lucide-react';

export default function Resume() {
  return (
    <section id="resume" className="py-20 bg-slate-100/60 dark:bg-surface-800/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Curriculum Vitae</p>
            <h2 className="section-title">Resume & Summary</h2>
            <div className="section-divider mx-auto" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="card">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4 pb-4 border-b border-slate-200/80 dark:border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-600/30 flex items-center justify-center shadow-sm">
                  <FileText size={22} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="font-display font-bold text-slate-900 dark:text-white text-base">Resume-Swetha_S.docx</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">Official Document · Verified Portfolio</p>
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
            <div className="bg-slate-50 dark:bg-surface-900/80 rounded-xl p-6 border border-slate-200/80 dark:border-white/5 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed shadow-inner">
              <div>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-indigo-500" />
                  Professional Summary
                </p>
                <p className="text-slate-600 dark:text-slate-300 font-sans text-sm">
                  Fresher software developer with hands-on experience building full-stack web applications and GenAI-powered platforms using Python, FastAPI, React, Node.js, and MySQL. CGPA 8.52, B.Tech Information Technology (2024–2028).
                </p>
              </div>
              <div>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-indigo-500" />
                  Core Stack
                </p>
                <p className="text-slate-600 dark:text-slate-400 font-sans text-sm">
                  Python · JavaScript · React · FastAPI · Node.js · Express · MySQL · Google Gemini API · Docker · AWS · RESTful APIs · Git
                </p>
              </div>
              <div>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-indigo-500" />
                  Work Experience
                </p>
                <ul className="text-slate-600 dark:text-slate-300 font-sans text-sm space-y-1">
                  <li>• <span className="font-semibold text-slate-800 dark:text-slate-200">Full Stack Developer Intern</span> – Teceze (Jun–Jul 2026)</li>
                  <li>• <span className="font-semibold text-slate-800 dark:text-slate-200">Web Development Intern</span> – ShadowFox (Jun 2025)</li>
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 text-xs font-sans">
                📎 Download the official resume document above for detailed academic scores, project metrics, and complete timeline.
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
