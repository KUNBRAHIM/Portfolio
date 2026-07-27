'use client';

import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { asset } from '@/utils';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetch(asset("data/contact.json"))
      .then((res) => res.json())
      .then((data) => setSocialLinks(data.socialLinks || []))
      .catch(() => setSocialLinks([]));
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://formspree.io/f/xojgyzob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          subject: formState.subject,
          message: formState.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-transparent text-foreground overflow-x-hidden" ref={sectionRef}>
      <div className="grain-overlay" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 blob-primary" aria-hidden="true" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 blob-secondary" aria-hidden="true" />
      </div>
      <div className="relative z-10 section-pad px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-5 items-start">
          {/* Left: Header + Form (3/5) */}
          <div className="lg:col-span-3">
            <div className="mb-14 reveal-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm text-primary text-sm font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
                Get In Touch
              </div>
              <h1 className="font-display text-section-heading font-bold text-foreground mb-4">
                Let&apos;s build something <span className="text-shimmer">together.</span>
              </h1>
            </div>
            <div className="reveal-left">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-6">
                  <Icon name="CheckIcon" size={28} variant="outline" className="text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">Message sent!</h3>
                <p className="text-muted-foreground max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Jordan Lee"
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      placeholder="jordan@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
                    Inquiry Type
                  </label>
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 text-sm appearance-none"
                  >
                    <option value="" disabled>Select inquiry type...</option>
                    <option value="fulltime">Full-time Position</option>
                    <option value="contract">Contract / Freelance</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="collab">Open Source Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project, timeline, and what you're looking for..."
                    className="w-full px-4 py-3 rounded-xl bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-200 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Icon name="ArrowPathIcon" size={18} variant="outline" className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Icon name="PaperAirplaneIcon" size={18} variant="outline" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          </div>

          {/* Right: Info panel (2/5) */}
          <div className="lg:col-span-2 reveal-right flex flex-col gap-6">
            {/* Availability card */}
            <div className="p-6 rounded-2xl border border-border/40 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-green-400">Available for work</span>
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-2">
                Currently open to full-time roles and select contract engagements starting <strong>August 2026</strong>.
              </p>
              <p className="text-muted-foreground text-xs">Response time: typically within 24 hours</p>
            </div>

            {/* Resume download */}
            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
              <h3 className="font-display text-base font-semibold text-foreground mb-2">
                Download Resume
              </h3>
              <p className="text-muted-foreground text-xs mb-4 leading-relaxed">
                Full CV with work history, projects, and references. Last updated July 2026.
              </p>
              <a
                href={asset("files/CV.pdf")}
                download
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-full justify-center"
              >
                <Icon name="ArrowDownTrayIcon" size={16} variant="outline" />
                Download PDF Resume
              </a>
            </div>

            {/* Social links */}
            <div className="p-6 rounded-2xl border border-border/40 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300">
              <h3 className="font-display text-base font-semibold text-foreground mb-4">
                Find Me Online
              </h3>
              <div className="space-y-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon name={social.icon} size={15} variant="outline" className="text-current" />
                    </div>
                    <span className="text-sm font-medium">{social.label}</span>
                    <Icon name="ArrowTopRightOnSquareIcon" size={12} variant="outline" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* Direct email */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border/40 backdrop-blur-sm">
              <Icon name="EnvelopeIcon" size={18} variant="outline" className="text-primary shrink-0" />
              <a
                href="mailto:m.commentateur@gmail.com"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                m.commentateur@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
