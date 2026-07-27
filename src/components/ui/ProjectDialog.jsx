'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './AppIcon';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const pages = ['gallery', 'details'];

const statusColors = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 [&>span]:bg-emerald-400',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20 [&>span]:bg-amber-400',
  slate: 'bg-slate-500/10 text-slate-400 border-slate-500/20 [&>span]:bg-slate-400',
  red: 'bg-red-500/10 text-red-400 border-red-500/20 [&>span]:bg-red-400',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20 [&>span]:bg-blue-400',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 [&>span]:bg-purple-400',
};

const statusDefault = { label: 'Unknown', color: 'slate' };

function StatusBadge({ status }) {
  const s = typeof status === 'string' ? { label: status, color: 'emerald' } : (status || statusDefault);
  const colors = statusColors[s.color] || statusColors.emerald;
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border flex items-center gap-1.5 ${colors}`}>
      <span className="w-1.5 h-1.5 rounded-full" />
      {s.label}
    </span>
  );
}

export default function ProjectDialog({ project, onClose }) {
  const images = project?.images?.length ? project.images : (project?.image ? [project.image] : []);
  const [imgIndex, setImgIndex] = useState(0);
  const [page, setPage] = useState('gallery');

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (page === 'gallery') {
        if (e.key === 'ArrowLeft') setImgIndex((i) => (i - 1 + images.length) % images.length);
        if (e.key === 'ArrowRight') setImgIndex((i) => (i + 1) % images.length);
      }
    };
    if (project) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose, images.length, page]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 32 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl border border-white/10 bg-background/70 backdrop-blur-2xl shadow-2xl shadow-black/40"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/60 hover:border-white/20 transition-all duration-200 backdrop-blur-md"
            >
              <Icon name="XMarkIcon" size={16} variant="outline" />
            </button>

            <div className="flex items-center justify-center gap-1 pt-5 pb-2 px-4">
              {pages.map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`relative px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                    page === p
                      ? 'text-foreground'
                      : 'text-muted-foreground/50 hover:text-muted-foreground'
                  }`}
                >
                  {page === p && (
                    <motion.div
                      layoutId="pageTab"
                      className="absolute inset-0 rounded-xl bg-white/5 border border-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon
                      name={p === 'gallery' ? 'PhotoIcon' : 'DocumentTextIcon'}
                      size={15}
                      variant="outline"
                    />
                    {p}
                  </span>
                </button>
              ))}
            </div>

            <div className="overflow-y-auto max-h-[calc(92vh-72px)] scrollbar-hide">
              <AnimatePresence mode="wait">
                {page === 'gallery' && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden group"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={imgIndex}
                        src={images[imgIndex]}
                        alt={project.alt || project.title}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    </AnimatePresence>

                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-105 backdrop-blur-md"
                        >
                          <Icon name="ChevronLeftIcon" size={18} variant="outline" />
                        </button>
                        <button
                          onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-105 backdrop-blur-md"
                        >
                          <Icon name="ChevronRightIcon" size={18} variant="outline" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setImgIndex(i)}
                              className={`rounded-full transition-all duration-300 ${
                                i === imgIndex
                                  ? 'w-7 h-2 bg-white'
                                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/30 pointer-events-none" />
                  </motion.div>
                )}

                {page === 'details' && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="p-6 md:p-8 lg:p-10"
                  >
                    <motion.div
                      variants={stagger}
                      initial="hidden"
                      animate="visible"
                      className="max-w-3xl mx-auto"
                    >
                      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-3">
                        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                          {project.category}
                        </span>
                        {project.status && <StatusBadge status={project.status} />}
                      </motion.div>

                      <motion.h2 variants={fadeUp} className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                        {project.title}
                      </motion.h2>

                      {project.role && (
                        <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5 text-sm text-muted-foreground/80">
                          <Icon name="UserCircleIcon" size={18} variant="outline" className="text-primary shrink-0" />
                          <span>{project.role}</span>
                        </motion.div>
                      )}

                      <motion.p variants={fadeUp} className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </motion.p>

                      {project.highlights?.length > 0 && (
                        <motion.div variants={fadeUp} className="mb-6">
                          <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-[0.12em] mb-3">
                            Highlights
                          </h3>
                          <div className="flex flex-col gap-2">
                            {project.highlights.map((item, i) => (
                              <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground pl-3 border-l-2 border-primary/30">
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {project.stack && (
                        <motion.div variants={fadeUp} className="mb-6">
                          <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-[0.12em] mb-3">
                            Tech Stack
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {Object.values(project.stack).flat().map((item) => (
                              <span
                                key={item}
                                className="text-xs px-2.5 py-1 rounded-lg bg-primary/5 text-muted-foreground border border-primary/10 hover:border-primary/25 hover:text-foreground transition-colors duration-200"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {project.features?.length > 0 && (
                        <motion.div variants={fadeUp} className="mb-6">
                          <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-[0.12em] mb-3">
                            Key Features
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {project.features.map((feature, i) => (
                              <div key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground bg-primary/3 rounded-lg p-2.5 border border-primary/5">
                                <Icon name="CheckIcon" size={14} variant="outline" className="text-primary shrink-0 mt-0.5" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {project.tags?.length > 0 && (
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-6">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium border border-border"
                            >
                              {tag}
                            </span>
                          ))}
                        </motion.div>
                      )}

                      <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-5 border-t border-white/5">
                        {project.url && project.url !== '#' && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                          >
                            <Icon name="ArrowTopRightOnSquareIcon" size={15} variant="outline" />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-foreground border border-white/10 hover:border-white/20 hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
                          >
                            <Icon name="CodeBracketIcon" size={15} variant="outline" />
                            Source Code
                          </a>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
