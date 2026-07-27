'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import ProjectDialog from '@/components/ui/ProjectDialog';
import { asset } from '@/utils';

const statusDotColors = {
  emerald: 'bg-emerald-400',
  amber: 'bg-amber-400',
  slate: 'bg-slate-400',
  red: 'bg-red-400',
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
};

function StatusDot({ status }) {
  const s = typeof status === 'string' ? { label: status, color: 'emerald' } : (status || {});
  const dotColor = statusDotColors[s.color] || 'bg-emerald-400';
  return (
    <div className="relative flex items-center">
      <span className={`w-2.5 h-2.5 rounded-full ${dotColor} shadow-sm shadow-black/20`} />
      <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {s.label}
      </span>
    </div>
  );
}

function ProjectCard({ project, onOpenDialog }) {
  return (
    <div className="rounded-2xl border border-border/40 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300 h-full flex flex-col overflow-hidden">
      <div className="relative h-48 overflow-hidden group">
        <img
          src={asset(project.image)}
          alt={project.alt || project.title}
          className="w-full h-full object-cover"
        />
        {project.status && (
          <div className="absolute top-3 right-3 z-10">
            <StatusDot status={project.status} />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
            {project.category}
          </span>
          <button
            onClick={() => onOpenDialog(project)}
            className="text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer"
          >
            <Icon name="ArrowTopRightOnSquareIcon" size={18} variant="outline" />
          </button>
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-2">{project.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>
        {project.description && project.description.length > 120 && (
          <button
            onClick={() => onOpenDialog(project)}
            className="text-xs text-primary hover:text-primary/80 font-medium mt-1.5 transition-colors duration-200 self-start"
          >
            Read more
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-auto px-6 pb-6">
        {project.tags.map((tag) =>
          <span
            key={tag}
            className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-medium border border-border">
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0);
  const [dialogProject, setDialogProject] = useState(null);
  const perPage = 2;
  const totalPages = Math.ceil(projects.length / perPage);
  const visibleProjects = projects.slice(page * perPage, page * perPage + perPage);

  useEffect(() => {
    fetch(asset("data/projects.json"))
      .then((res) => res.json())
      .then((data) => setProjects(data.projects || []))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll('.reveal-up');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [visibleProjects]);

  return (
    <section id="projects" className="relative bg-transparent text-foreground overflow-x-hidden" ref={sectionRef}>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 blob-primary" aria-hidden="true" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 blob-secondary" aria-hidden="true" />
      </div>
      <div className="relative z-10 section-pad px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-0 reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            Selected Work
          </div>
          <h1 className="font-display text-section-heading font-bold text-foreground mb-4">
            Projects &amp; <span className="text-shimmer">Case Studies</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-xl leading-relaxed">
            A showcase of my work, creativity, and problem-solving through real-world projects.
          </p>
        </div>

        {projects.length > 0 && (
          <div className="block md:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4" style={{ scrollSnapType: "x mandatory" }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-[85vw] shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ProjectCard project={project} onOpenDialog={setDialogProject} />
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleProjects.length > 0 && (
          <div className="hidden md:block">
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mb-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`project-dot ${i === page ? "active" : ""}`}
                  />
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="project-nav-btn shrink-0"
              >
                <Icon name="ChevronLeftIcon" size={24} variant="outline" />
              </button>

              <div className="grid grid-cols-2 gap-6 flex-1 min-w-0">
                {visibleProjects.map((project, i) => (
                  <div
                    key={project.id}
                    className="reveal-up"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <ProjectCard project={project} onOpenDialog={setDialogProject} />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="project-nav-btn shrink-0"
              >
                <Icon name="ChevronRightIcon" size={24} variant="outline" />
              </button>
            </div>
          </div>
        )}
      </div>
      <ProjectDialog project={dialogProject} onClose={() => setDialogProject(null)} />
    </section>
  );
}
