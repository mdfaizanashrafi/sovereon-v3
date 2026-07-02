/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { ActiveSection } from './types';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import PhilosophySection from './components/PhilosophySection';
import SolutionsSection from './components/SolutionsSection';

export default function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  // Multi-step switch & scroll to contact form on Solutions view
  const handleGetInTouch = () => {
    setActiveSection('solutions');
    setTimeout(() => {
      const contactForm = document.getElementById('contact-form-section');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Navigates directly to the review/SaaS grid on Philosophy view
  const handleNavigateToPhilosophy = () => {
    setActiveSection('philosophy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToSolutions = () => {
    setActiveSection('solutions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-brand-dark relative tech-grid selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* HEADER NAVBAR */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onGetInTouch={handleGetInTouch}
      />

      {/* CORE VIEWPORT */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {activeSection === 'home' && (
              <HomeSection 
                onNavigateToPhilosophy={handleNavigateToPhilosophy}
                onNavigateToSolutions={handleNavigateToSolutions}
                onGetInTouch={handleGetInTouch}
              />
            )}
            
            {activeSection === 'philosophy' && (
              <PhilosophySection />
            )}
            
            {activeSection === 'solutions' && (
              <SolutionsSection />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER - EXACT SPECIFICATIONS FROM IMAGE 1, 2, 3 */}
      <footer className="w-full border-t border-brand-border bg-white py-12 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Sovereon Brand block - Image 2/3 */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full border border-brand-dark bg-brand-orange flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-brand-bg"></div>
              </div>
              <span className="font-display text-xl font-extrabold tracking-tight text-brand-dark">
                SOVEREON<span className="text-brand-orange">.</span>
              </span>
            </div>
            
            <p className="font-mono text-[10px] text-brand-gray/90 leading-relaxed uppercase tracking-tighter max-w-xs">
              Sovereon is an advanced full-stack micro SaaS development agency. Engineering modular systems with high availability, microsecond latency, and zero-trust models for solving specific pain points of our clients.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono font-medium text-brand-gray">
              <div className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 text-brand-dark" />
                <span>+91 743-936-8190</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 text-brand-dark" />
                <span>partners@sovereon.online</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3.5 w-3.5 text-brand-dark" />
                <span>Door No. 675, 13th Cross, 29th Main Road, BTM 2nd Stage, Bengaluru, Karnataka 560076</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-4 space-y-4 md:pl-12">
            <h4 className="font-mono text-xs font-bold text-brand-dark uppercase tracking-wider">
              NAVIGATION
            </h4>
            <div className="flex flex-col space-y-2 font-mono text-xs text-brand-gray font-semibold">
              <button 
                onClick={() => { setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left hover:text-brand-orange transition-colors"
              >
                // PHILOSOPHY_INDEX
              </button>
              <button 
                onClick={() => { setActiveSection('philosophy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left hover:text-brand-orange transition-colors"
              >
                // OUR_PHILOSOPHY_TIMELINE
              </button>
              <button 
                onClick={() => { setActiveSection('solutions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-left hover:text-brand-orange transition-colors"
              >
                // SOLUTIONS_AND_ENGINEERING
              </button>
              <button 
                onClick={handleGetInTouch}
                className="text-left hover:text-brand-orange transition-colors"
              >
                // INITIATE_CONSULTATION_REQ
              </button>
            </div>
          </div>

          {/* Column 3: Tech Stack & Architecture badges */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs font-bold text-brand-dark uppercase tracking-wider">
              SYSTEM CONVENTIONS
            </h4>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border">MODULAR MONOLITH</span>
              <span className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border">SOLID PATTERNS</span>
              <span className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border">ZERO TRUST</span>
              <span className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border">CLERK AUTH</span>
              <span className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border">NEON POSTGRES</span>
              <span className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border">UPSTASH REDIS</span>
            </div>

            <p className="font-mono text-[9px] text-brand-gray/50 italic leading-relaxed pt-1">
              Architecture style: modular monolith, separation: true. Designed, built, and deployed on serverless environments matching client specifications perfectly.
            </p>
          </div>

        </div>

        {/* BOTTOM LEGAL ROW - MATCHING IMAGE 1, 2, 3 FOOTERS */}
        <div className="mx-auto max-w-7xl border-t border-brand-border/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-brand-gray/80 gap-4">
          <span>© 2026 Sovereon. Building scalable software for modern businesses.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-brand-orange transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP ACCENT FLOATING BTN */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full border border-brand-border bg-white shadow-md flex items-center justify-center text-brand-dark hover:border-brand-dark hover:text-brand-orange transition-all duration-300 z-40 group hover:-translate-y-1"
        id="scroll-to-top"
      >
        <ArrowUp className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
      </button>
    </div>
  );
}
