'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import VHSText from '@/components/ui/VHSText';
import SphereBg from '@/components/SphereBg';

export default function HeroSection() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch("/data/profile.json")
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => setProfile(null));
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background image with scrim */}
      <div className="absolute inset-0">
        <img
          src="https://img.rocket.new/generatedImages/rocket_gen_img_11bc57644-1772175190337.png"
          alt="Dark atmospheric code editor with deep shadows, dim blue-black environment, low-key developer workspace"
          className="w-full h-full object-cover" />

        {/* Scrim: light/white text → dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      {/* Atmospheric blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 blob-primary pointer-events-none"
        aria-hidden="true" />
      <div
        className="absolute bottom-1/3 left-1/3 w-80 h-80 blob-secondary pointer-events-none"
        aria-hidden="true" />
      {/* Content — bottom-anchored like Template 2 */}
      <div className="relative z-10 section-pad w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          {/* VHS text — first in DOM, shown at top on mobile via order */}
          <div className="shrink-0 md:pt-16 order-first md:order-1 mb-4 md:mb-0 flex items-center gap-4">
            <VHSText text={profile?.heroVHSText || ["HI,", "I'M", "LATRECHE", "BRAHIM"]} className="max-w-[220px] sm:max-w-[350px] md:max-w-[480px]" />
            <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] md:hidden">
              <SphereBg opacity={0.6} radiusRatio={0.4} />
            </div>
          </div>

          {/* Left content */}
          <div className="max-w-3xl flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              Available for hire · Full-Stack Developer
            </div>

            {/* H1 */}
            <h1 className="font-display text-hero-display font-bold text-foreground mb-6">
            Building{' '}
            <span className="text-shimmer">digital</span>
            <br />
            experiences that{' '}
            <span className="italic text-primary">matter.</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-xl mb-10 leading-relaxed">
            {profile?.heroTagline || "Building modern, scalable, and user-friendly digital experiences."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity">

              <Icon name="FolderOpenIcon" size={18} variant="outline" />
              View My Work
            </a>
            <a
              href="/files/CV.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-foreground/20 text-foreground font-semibold text-base hover:border-primary/50 hover:text-primary transition-all duration-300">

              <Icon name="ArrowDownTrayIcon" size={18} variant="outline" />
              Download Resume
            </a>
          </div>

          {/* Tech stack badges */}
          <div className="flex flex-wrap gap-2 mt-10">
            {(profile?.heroTechBadges || ['flutter', 'React', 'laravel', 'python', 'mongodb']).map((tech) =>
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-muted-foreground font-medium">

                {tech}
              </span>
            )}
          </div>
          </div>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <Icon name="ChevronDownIcon" size={20} variant="outline" className="text-muted-foreground" />
      </div>
    </section>
  );
}
