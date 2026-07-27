'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from "react-responsive"
import Icon from '@/components/ui/AppIcon';

const getInitials = (text = "") =>
  text
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")

function SkillBar({ skill, index }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = `${skill.level}%`;
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [skill.level]);

  return (
    <div style={{ animationDelay: `${index * 80}ms` }}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {skill.logoPath ? (
            <img src={skill.logoPath} alt={skill.name} className="w-5 h-5 rounded object-cover shrink-0" />
          ) : (
            <div className="w-5 h-5 rounded flex items-center justify-center shrink-0 bg-primary/10 border border-primary/20">
              <span className="text-primary text-[10px] font-bold">{getInitials(skill.name)}</span>
            </div>
          )}
          <span className="text-sm font-medium text-foreground/90">{skill.name}</span>
        </div>
        <span className="text-xs font-mono text-primary">{skill.level}%</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState([]);
  const [tools, setTools] = useState([]);
  const [page, setPage] = useState(0);
  const [toolStart, setToolStart] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" })

  const toolColors = {
    'VS Code': '#007ACC',
    'Postman': '#FF6C37',
    'Claude Code': '#D97706',
    'Gemini CLI': '#4285F4',
    'Figma': '#F24E1E',
    'Canva': '#00C4CC',
    'GitHub': '#6e5494',
    'MongoDB': '#47A248',
    'XAMPP': '#FB7A24',
    'Stitch': '#FF3366',
    'vibe coding': '#A855F7',
    'PyTorch': '#EE4C2C',
    'TensorFlow': '#FF6F00',
    'Scikit-Learn': '#F89939',
  };
  const perPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(skillCategories.length / perPage);
  const visibleCategories = skillCategories.slice(page * perPage, page * perPage + perPage);
  const toolsPerPage = 6;
  const extendedTools = [...tools, ...tools];
  const totalSlides = tools.length;
  const visibleTools = tools.length > 0 ? extendedTools.slice(toolStart, toolStart + toolsPerPage) : [];

  useEffect(() => {
    fetch("/data/skills.json")
      .then((res) => res.json())
      .then((data) => {
        setSkillCategories(data.skillCategories || []);
        setTools(data.tools || []);
      })
      .catch(() => {
        setSkillCategories([]);
        setTools([]);
      });
  }, []);

  useEffect(() => {
    if (tools.length === 0) return;
    setToolStart(0);
    const interval = setInterval(() => {
      setToolStart((prev) => (prev + 6) % tools.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tools.length]);

  return (
    <section id="skills" className="relative bg-transparent text-foreground overflow-x-hidden">
      <div className="grain-overlay" aria-hidden="true" />

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 blob-primary" aria-hidden="true" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 blob-secondary" aria-hidden="true" />
      </div>

      <div className="relative z-10 pt-16 md:pt-28 pb-6 md:pb-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              Technical Expertise
            </div>
            <h1 className="font-display text-section-heading font-bold text-foreground mb-4">
              Skills &amp; <span className="text-shimmer">Technologies</span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-xl leading-relaxed">
               Turning ideas into powerful web, mobile, and software solutions.
            </p>
          </div>
          <div className="w-full md:w-96 shrink-0">
            <h2 className="font-display text-xl font-semibold text-foreground mb-1">Daily Toolkit</h2>
            <p className="text-xs text-muted-foreground mb-4">Tools I reach for every day to ship faster and better.</p>
            <div className="w-full overflow-hidden relative" style={{ minHeight: '192px' }}>
              <AnimatePresence>
                <motion.div
                  key={toolStart}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'linear' }}
                  className="absolute flex flex-wrap justify-center gap-x-3 gap-y-0"
                  style={{ width: '390px', left: '50%', marginLeft: '-220px' }}
                >
                  {visibleTools.map((tool, i) => (
                    <a
                      key={tool.name}
                      href={tool.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-25 h-26 flex items-center justify-center group"
                      style={
                        i === 3
                          ? { marginTop: '-20px', transform: 'translateX(50px)' }
                          : i > 3
                          ? { marginTop: '-20px', transform: 'translateX(50px)' }
                          : {}
                      }
                    >
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 115">
                        <polygon
                          points="50 1, 99 28, 99 86, 50 114, 1 86, 1 28"
                          fill={toolColors[tool.name] || '#C8965A'}
                          fillOpacity="0.15"
                          stroke={toolColors[tool.name] || '#C8965A'}
                          strokeWidth="2"
                          style={{ filter: `drop-shadow(0 0 6px ${toolColors[tool.name] || '#C8965A'}60)` }}
                          className="transition-all duration-300 opacity-60 group-hover:opacity-100"
                        />
                      </svg>
                      {tool.logoPath ? (
                        <img
                          src={tool.logoPath}
                          alt={tool.name}
                          className="relative z-10 w-10 h-10 object-contain"
                        />
                      ) : (
                        <span className="relative z-10 text-[10px] font-medium text-foreground/80 leading-tight px-1 text-center">
                          {tool.name}
                        </span>
                      )}
                    </a>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto pb-32">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-w-0">
            {visibleCategories.map((cat) => (
              <div
                key={cat.title}
                className="rounded-2xl border border-border/40 backdrop-blur-sm p-8 hover:border-primary/30 transition-colors duration-300"
              >
                <div className="mb-6">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-1">{cat.title}</h2>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                </div>
                <div className="flex flex-col gap-5">
                  {cat.skills.map((skill, i) => (
                    <SkillBar key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
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

    </section>
  );
}
