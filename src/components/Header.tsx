/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, ArrowRight, Layers, FileText, Send, BookOpen, Compass, Mail } from 'lucide-react';

interface HeaderProps {
  activeRoute: string;
}

export default function Header({ activeRoute }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-bg/85 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo Container - Left Aligned on Desktop */}
        <div className="flex lg:flex-1 justify-start">
          <a
            href="/"
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
          </a>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden lg:flex items-center space-x-2 font-display text-xs font-semibold tracking-wide">
          <a
            href="/"
            className={`px-3 py-2 transition-colors duration-200 ${
              activeRoute === '/'
                ? 'text-brand-orange'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            HOME
          </a>
          <span className="text-brand-border/60 select-none">|</span>
          <a
            href="/philosophy"
            className={`px-3 py-2 transition-colors duration-200 ${
              activeRoute === '/philosophy'
                ? 'text-brand-orange'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            PHILOSOPHY
          </a>
          <span className="text-brand-border/60 select-none">|</span>
          <a
            href="/solutions"
            className={`px-3 py-2 transition-colors duration-200 ${
              activeRoute === '/solutions' || activeRoute.startsWith('/solutions/')
                ? 'text-brand-orange'
                : 'text-brand-gray hover:text-brand-dark'
            }`}
          >
            SOLUTIONS & ENGINEERING
          </a>
        </nav>

        {/* Mobile Menu Toggle Button - Right Aligned on Desktop (as empty space spacer) */}
        <div className="flex lg:flex-1 justify-end">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-brand-dark hover:text-brand-orange focus:outline-none transition-colors lg:hidden"
            aria-expanded={isOpen}
            id="mobile-menu-toggle-btn"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden border-b border-brand-border bg-brand-bg px-6 py-6 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 font-display text-sm font-semibold tracking-wide">
            <span className="font-mono text-[9px] text-brand-orange uppercase tracking-wider font-bold mb-1">
              Primary System Nodes
            </span>
            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 py-2 text-left transition-colors ${
                activeRoute === '/' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>HOME</span>
            </a>
            <a
              href="/philosophy"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 py-2 text-left transition-colors ${
                activeRoute === '/philosophy' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>PHILOSOPHY</span>
            </a>
            <a
              href="/solutions"
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-2 py-2 text-left transition-colors ${
                activeRoute === '/solutions' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              <Send className="h-4 w-4" />
              <span>SOLUTIONS & ENGINEERING</span>
            </a>
            
            {/* Elegant Divider for secondary directories */}
            <div className="border-t border-brand-border/50 pt-4 mt-2">
              <span className="block font-mono text-[9px] text-brand-gray/60 uppercase tracking-wider font-bold mb-2">
                Secondary System Directories
              </span>
              <div className="grid grid-cols-1 gap-2 pl-1 font-mono text-xs">
                <a
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 py-1.5 transition-colors ${
                    activeRoute.startsWith('/blog') ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>// SYSTEM_LOG_BLOG</span>
                </a>
                <a
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 py-1.5 transition-colors ${
                    activeRoute === '/about' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
                  }`}
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>// COMPANY_PROFILE</span>
                </a>
                <a
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 py-1.5 transition-colors ${
                    activeRoute === '/contact' ? 'text-brand-orange' : 'text-brand-gray hover:text-brand-dark'
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>// INITIATE_CONSULTATION</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
