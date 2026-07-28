'use client';

import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';
import { asset } from '@/utils';

export default function Navbar() {
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    fetch(asset("data/site.json"))
      .then((res) => res.json())
      .then((data) => setNavLinks(data.navLinks || []))
      .catch(() => setNavLinks([]));
  }, []);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border' :'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href={asset("/")} className="flex items-center gap-2 group">
            <AppLogo
              size={32}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
            <span className="font-display font-semibold text-lg tracking-tight text-foreground block">
              JOKER<span className="text-primary">DEV</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className="nav-link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link?.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity duration-200"
          >
            <Icon name="BriefcaseIcon" size={15} variant="outline" />
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={menuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} variant="outline" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-transparent backdrop-blur-xl border border-border rounded-2xl mb-4 p-6 flex flex-col items-center gap-5">
            {navLinks?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className="text-foreground font-medium text-base hover:text-primary transition-colors"
                onClick={handleNavClick}
              >
                {link?.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-primary-foreground bg-primary"
              onClick={handleNavClick}
            >
              <Icon name="BriefcaseIcon" size={15} variant="outline" />
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
