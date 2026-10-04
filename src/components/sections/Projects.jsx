import { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { projects } from '../../data/portfolio';
import { Github, ExternalLink, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollReveal delay={index * 100}>
      <article className="card group h-full flex flex-col hover:border-indigo-400/50 transition-all duration-300" aria-label={project.title}>
        {/* Color banner */}
        <div className={`h-2 -mx-6 -mt-6 mb-5 bg-gradient-to-r ${project.color}`} />

        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <span className="text-3xl p-2.5 rounded-2xl bg-indigo-50 dark:bg-white/5 border border-indigo-100 dark:border-white/10 shrink-0 shadow-sm">{project.emoji}</span>
          <div className="flex-1">
            <span className="tag text-[11px] mb-1.5 inline-block font-semibold">{project.category}</span>
            <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        {/* Problem */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 mb-4">
          <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
            <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold text-[11px] uppercase mr-1.5">Problem Solved:</span>
            {project.problem}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <span key={tech} className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
              {tech}
            </span>
          ))}
        </div>

        {/* Expandable features */}
        {expanded && (
          <div className="mb-4 border-t border-slate-200/80 dark:border-white/10 pt-3.5 space-y-2.5 animate-fadeIn">
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={13} className="text-indigo-600 dark:text-indigo-400" />
              Key Features
            </p>
            <ul className="space-y-1.5">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-100 dark:border-white/5">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">Role:</span> {project.role}
              </p>
            </div>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-slate-200/80 dark:border-white/10">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? 'Show Less' : 'View Architecture & Features'}
          </button>
          <div className="flex gap-1.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-600 dark:text-slate-400 transition-colors shadow-sm"
                aria-label={`${project.title} GitHub`}
              >
                <Github size={15} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-600 dark:text-slate-400 transition-colors shadow-sm"
                aria-label={`${project.title} Live Demo`}
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-widest uppercase mb-2">Portfolio Showcase</p>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider mx-auto" />
            <p className="section-subtitle text-center mx-auto">
              Real-world full-stack and AI applications engineered with modern technologies.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
