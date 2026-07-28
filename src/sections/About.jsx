'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { asset } from '@/utils';

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold text-foreground">
      {count}{suffix}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [data, setData] = useState({ education: [], certifications: [] });
  const [profileStats, setProfileStats] = useState([]);
  const [about, setAbout] = useState(null);
  const [statsPage, setStatsPage] = useState(0);
  const statsPerPage = 2;
  const totalStatsPages = Math.ceil(profileStats.length / statsPerPage);
  const visibleStats = profileStats.slice(statsPage * statsPerPage, statsPage * statsPerPage + statsPerPage);

  useEffect(() => {
    if (totalStatsPages <= 1) return;
    const interval = setInterval(() => {
      setStatsPage((p) => (p + 1) % totalStatsPages);
    }, 8000);
    return () => clearInterval(interval);
  }, [totalStatsPages]);

  useEffect(() => {
    fetch(asset('data/education.json'))
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData({ education: [], certifications: [] }));
    fetch(asset('data/profile.json'))
      .then((res) => res.json())
      .then((json) => setProfileStats(json.stats || []))
      .catch(() => setProfileStats([]));
    fetch(asset('data/about.json'))
      .then((res) => res.json())
      .then((json) => setAbout(json))
      .catch(() => setAbout(null));
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
      { threshold: 0.15 }
    );

    const items = sectionRef.current?.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative bg-transparent text-foreground overflow-x-hidden" ref={sectionRef}>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 blob-primary" aria-hidden="true" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 blob-secondary" aria-hidden="true" />
      </div>
      <div className="relative z-10 section-pad px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Left column: Header + Photo/Bio */}
          <div className="flex flex-col gap-6">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                About Me
              </div>
              <h1 className="font-display text-section-heading font-bold text-foreground mb-4">
                {about?.headerTagline?.split("future")[0] || "Let's build the "}<span className="text-shimmer">future</span>{about?.headerTagline?.split("future")[1] || " together!"}
              </h1>
              <p className="text-lg text-foreground/70 max-w-xl leading-relaxed">
                {about?.headerSubtitle || "A full-stack software developer passionate about building high-performance, scalable intelligent systems."}          </p>
            </div>

            <div className="rounded-2xl border border-primary/20 card-shadow backdrop-blur-sm p-8 hover:border-primary/30 transition-colors duration-300 reveal-left">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative flex-shrink-0">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-primary/30">
                    <AppImage
                      src={asset(about?.photo || "/images/personal.png")}
                      alt={about?.photoAlt || "Profile photo"}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="CodeBracketIcon" size={14} variant="solid" className="text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {about?.name || "Latreche Brahim"}
                  </h3>
                  {(about?.bio || [
                    "As a passionate developer with a strong focus on creating innovative applications and advancing artificial intelligence solutions, I am eager to contribute my skills to your dynamic team.",
                    "Let's build the future together!"
                  ]).map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed text-sm mb-3 last:mb-0">{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Education + Certifications */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-primary/20 card-shadow backdrop-blur-sm p-8 hover:border-primary/30 transition-colors duration-300">
              <h3 className="font-display text-base font-semibold text-foreground mb-4">
                Education
              </h3>
              <div className="space-y-4">
                {data.education.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="AcademicCapIcon" size={18} variant="outline" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.school}</p>
                      <p className="text-xs text-primary font-medium">{item.degree}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.year} &middot; {item.gpa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 card-shadow backdrop-blur-sm p-8 hover:border-primary/30 transition-colors duration-300">
              <h3 className="font-display text-base font-semibold text-foreground mb-4">
                Certifications
              </h3>
              <div className="space-y-3">
                {data.certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2">
                    <Icon name="CheckBadgeIcon" size={16} variant="solid" className="text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={statsPage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                {visibleStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center p-4 rounded-xl border border-primary/20 card-shadow"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                      <Icon name={stat.icon} size={18} variant="outline" className="text-primary" />
                    </div>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    <p className="text-muted-foreground text-xs mt-1 font-medium">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>


      </div>
    </section>
  );
}
