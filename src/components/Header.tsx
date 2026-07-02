/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ArrowRight, Layers, FileText, Send } from 'lucide-react';
import { ActiveSection } from '../types';

interface HeaderProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
  onGetInTouch: () => void;
}

export default function Header({ activeSection, setActiveSection, onGetInTouch }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home' as ActiveSection, label: 'PHILOSOPHY', isPhilosophy: false },
    { id: 'philosophy' as ActiveSection, label: 'OUR PHILOSOPHY', isPhilosophy: true },
    { id: 'solutions' as ActiveSection, label: 'SOLUTIONS AND ENGINEERING', isPhilosophy: false },
  ];

  const handleNavClick = (sectionId: ActiveSection) => {
    setActiveSection(sectionId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-bg/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo Container - EXACTLY matches Image 4/5 */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center space-x-3 transition-opacity hover:opacity-90"
          id="sovereon-logo-btn"
        >
          {/* Circular Icon (Orange circle with black outline and white center - exactly matching uploaded image) */}
          <svg
            viewBox="0 0 100 100"
            className="h-8 w-8 transition-transform group-hover:scale-105"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" fill="#FF4500" stroke="#000000" strokeWidth="10" />
            <ellipse cx="50" cy="50" rx="18" ry="26" fill="#FFFFFF" />
          </svg>
          
          {/* SOVEREON Lettering (SOVER in Black, EON in Orange-Red) */}
          <span className="font-display text-2xl font-bold tracking-tight text-brand-dark">
            SOVER<span className="text-brand-orange">EON</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 font-display text-sm font-medium tracking-wide">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-4 py-2 transition-colors ${
              activeSection === 'home'
                ? 'text-brand-orange font-semibold'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            HOME
          </button>
          <span className="text-brand-border select-none">|</span>
          <button
            onClick={() => handleNavClick('philosophy')}
            className={`px-4 py-2 transition-colors ${
              activeSection === 'philosophy'
                ? 'text-brand-orange font-semibold'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            PHILOSOPHY
          </button>
          <span className="text-brand-border select-none">|</span>
          <button
            onClick={() => handleNavClick('solutions')}
            className={`px-4 py-2 transition-colors ${
              activeSection === 'solutions'
                ? 'text-brand-orange font-semibold'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            SOLUTIONS &amp; ENGINEERING
          </button>
        </nav>

        {/* Right Action: Get in touch */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onGetInTouch}
            className="group relative flex items-center space-x-2 rounded-full border border-brand-dark bg-brand-dark px-6 py-2.5 font-display text-sm font-medium text-brand-bg transition-all duration-300 hover:bg-transparent hover:text-brand-dark shadow-md hover:shadow-sm"
            id="nav-get-in-touch"
          >
            <span>GET IN TOUCH</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-white text-brand-dark transition-colors hover:bg-brand-bg"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Slide-down */}
      {isOpen && (
        <div className="md:hidden border-b border-brand-border bg-brand-bg px-6 py-6 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col space-y-4 font-display text-base font-semibold tracking-wide">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex items-center space-x-2 py-2 text-left transition-colors ${
                activeSection === 'home' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>HOME</span>
            </button>
            <button
              onClick={() => handleNavClick('philosophy')}
              className={`flex items-center space-x-2 py-2 text-left transition-colors ${
                activeSection === 'philosophy' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>PHILOSOPHY</span>
            </button>
            <button
              onClick={() => handleNavClick('solutions')}
              className={`flex items-center space-x-2 py-2 text-left transition-colors ${
                activeSection === 'solutions' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              <Send className="h-4 w-4" />
              <span>SOLUTIONS &amp; ENGINEERING</span>
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onGetInTouch();
                }}
                className="flex w-full items-center justify-center space-x-2 rounded-full border border-brand-orange bg-brand-orange py-3 text-center text-sm font-semibold text-white shadow transition-colors hover:bg-brand-orange-hover"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
