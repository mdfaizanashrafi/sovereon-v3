/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, ArrowUp, Send as SendIcon } from 'lucide-react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import PhilosophySection from './components/PhilosophySection';
import SolutionsSection from './components/SolutionsSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import BlogSection from './components/BlogSection';
import TopicClusterSection from './components/TopicClusterSection';
import SEOManager from './components/SEOManager';
import { TOPIC_PAGES } from './data/seoContent';
import SanityTestSection from './components/SanityTestSection';

export default function App() {
  const [activeRoute, setActiveRoute] = useState<string>('/');

  // 1. Core Routing Engine: Intercept PopState & Internal Anchors for Pure SPA Transitions
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const view = params.get('view');
      
      // Query Param Fallback Compatibility Router (Task 1 Rule)
      if (path === '/' && (view === 'philosophy' || view === 'solutions')) {
        const cleanPath = `/${view}`;
        window.history.replaceState({}, '', cleanPath);
        setActiveRoute(cleanPath);
      } else {
        setActiveRoute(path);
      }
      window.scrollTo({ top: 0 });
    };

    // PopState handling for Back/Forward navigation
    window.addEventListener('popstate', handleLocationChange);

    // Global interceptor for internal links (Task 4 Anchor Enforcement Rule)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.origin === window.location.origin) {
        const pathname = anchor.pathname;
        const search = anchor.search;
        const hash = anchor.hash;

        // Ignore target="_blank", modifier keys, and external pages
        if (
          anchor.getAttribute('target') === '_blank' || 
          e.metaKey || 
          e.ctrlKey || 
          e.shiftKey || 
          pathname.startsWith('/api') || 
          pathname.endsWith('.xml')
        ) {
          return;
        }

        e.preventDefault();
        
        // Push state to history and update active route
        window.history.pushState({}, '', pathname + search + hash);
        handleLocationChange();

        // If a specific section element hash is referenced, scroll to it smoothly
        if (hash) {
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1));
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Initial Trigger on load
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  // Multi-step view mapping helper to check if a route is a dynamic topic/solutions cluster page
  const isTopicPage = TOPIC_PAGES[activeRoute] !== undefined;

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-brand-dark relative tech-grid selection:bg-brand-orange/20 selection:text-brand-orange">
      {/* Dynamic SEO, GA4 Tracking, & Schema Microdata Injections */}
      <SEOManager activeRoute={activeRoute} />

      {/* HEADER NAVBAR (Task 1 Compliant Header) */}
      <Header activeRoute={activeRoute} />

      {/* CORE VIEWPORT */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoute}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* Standard Pages Router */}
            {activeRoute === '/' && (
              <HomeSection 
                onNavigateToPhilosophy={() => {
                  window.history.pushState({}, '', '/philosophy');
                  setActiveRoute('/philosophy');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToSolutions={() => {
                  window.history.pushState({}, '', '/solutions');
                  setActiveRoute('/solutions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onGetInTouch={() => {
                  window.history.pushState({}, '', '/contact');
                  setActiveRoute('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
            
            {activeRoute === '/philosophy' && (
              <PhilosophySection />
            )}
            
            {activeRoute === '/solutions' && (
              <SolutionsSection />
            )}

            {activeRoute === '/about' && (
              <AboutSection />
            )}

            {activeRoute === '/contact' && (
              <ContactSection />
            )}

            {activeRoute === '/sanity-test' && (
              <SanityTestSection />
            )}

            {/* Systems Blog Router (Task 3 Compliant Engine) */}
            {activeRoute.startsWith('/blog') && (
              <BlogSection activeRoute={activeRoute} />
            )}

            {/* Topical Clusters & Programmatic Solutions Router (Task 2 + 6 Compliant Engine) */}
            {isTopicPage && (
              <TopicClusterSection activeRoute={activeRoute} />
            )}
            
            {/* Fallback for invalid paths - simple redirect to home or page not found */}
            {activeRoute !== '/' && 
             activeRoute !== '/philosophy' && 
             activeRoute !== '/solutions' && 
             activeRoute !== '/about' && 
             activeRoute !== '/contact' && 
             activeRoute !== '/sanity-test' && 
             !activeRoute.startsWith('/blog') && 
             !isTopicPage && (
              <div className="mx-auto max-w-xl text-center py-24 px-6 space-y-4">
                <h1 className="font-display text-2xl font-bold text-brand-dark">Resource Brief Not Found</h1>
                <p className="text-xs text-brand-gray font-medium">The requested system resource or landing page is currently offline or moving.</p>
                <div className="pt-4">
                  <a href="/" className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-brand-orange">
                    <span>RETURN TO SECURITY CENTRE</span>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* GLOBAL FOOTER (Enforced Semantic Anchor Tags for SEO Indexing) */}
      <footer className="w-full border-t border-brand-border bg-white py-12 px-6 sm:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Column 1: Sovereon Brand block */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <svg
                viewBox="0 0 100 100"
                className="h-6 w-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="45" fill="#FF4500" stroke="#000000" strokeWidth="10" />
                <ellipse cx="50" cy="50" rx="18" ry="26" fill="#FFFFFF" />
              </svg>
              <span className="font-display text-xl font-extrabold tracking-tight text-brand-dark">
                SOVEREON<span className="text-brand-orange">.</span>
              </span>
            </div>
            
            <p className="font-mono text-[10px] text-brand-gray/90 leading-relaxed uppercase tracking-tighter max-w-xs">
              Sovereon is an advanced full-stack systems engineering firm. We design modular architectures with high concurrency, low latency, and zero-trust security profiles.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono font-medium text-brand-gray">
              <div className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 text-brand-dark" />
                <span>+91 7439368190</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 text-brand-dark" />
                <span>sovereon@sovereon.online</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3.5 w-3.5 text-brand-dark" />
                <span>Door No. 675, 13th Cross, 29th Main Road, BTM 2nd Stage, Bengaluru, Karnataka 560076</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Hub (Organized into Top & Bottom Nodes) */}
          <div className="md:col-span-4 space-y-5 md:pl-12">
            <div>
              <h4 className="font-mono text-[9px] font-bold text-brand-orange uppercase tracking-widest mb-2">
                PRIMARY OVERVIEW (TOP)
              </h4>
              <div className="flex flex-col space-y-1.5 font-mono text-xs text-brand-dark/90 font-semibold">
                <a href="/" className="hover:text-brand-orange transition-colors">
                  // SYSTEM_INDEX
                </a>
                <a href="/philosophy" className="hover:text-brand-orange transition-colors">
                  // OUR_PHILOSOPHY
                </a>
                <a href="/solutions" className="hover:text-brand-orange transition-colors">
                  // SOLUTIONS_ENGINEERING
                </a>
              </div>
            </div>

            <div className="border-t border-brand-border/40 pt-4">
              <h4 className="font-mono text-[9px] font-bold text-brand-gray uppercase tracking-widest mb-2">
                SYSTEM RESOURCES (BOTTOM)
              </h4>
              <div className="flex flex-col space-y-1.5 font-mono text-xs text-brand-gray font-semibold">
                <a href="/blog" className="hover:text-brand-orange transition-colors">
                  // SYSTEM_BRIEFINGS_LOG
                </a>
                <a href="/about" className="hover:text-brand-orange transition-colors">
                  // COMPANY_PROFILE
                </a>
                <a href="/contact" className="hover:text-brand-orange transition-colors">
                  // INITIATE_CONSULTATION
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Tech Stack Clusters (Task 4 Indexing Links) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs font-bold text-brand-dark uppercase tracking-wider">
              TECHNICAL DIRECTORIES
            </h4>
            
            <div className="flex flex-wrap gap-2 pt-1">
              <a href="/saas-development" className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border hover:border-brand-orange transition-all">SAAS DEVELOPMENT</a>
              <a href="/ai-automation" className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border hover:border-brand-orange transition-all">AI AUTOMATION</a>
              <a href="/distributed-systems" className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border hover:border-brand-orange transition-all">DISTRIBUTED SYSTEMS</a>
              <a href="/modular-monolith-architecture" className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border hover:border-brand-orange transition-all">MODULAR MONOLITH</a>
              <a href="/zero-trust-architecture" className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border hover:border-brand-orange transition-all">ZERO TRUST SECURITY</a>
              <a href="/solutions/custom-saas-for-enterprises" className="rounded bg-brand-bg px-2 py-1 font-mono text-[9px] font-semibold text-brand-dark border border-brand-border hover:border-brand-orange transition-all">ENTERPRISE SOLUTIONS</a>
            </div>

            <p className="font-mono text-[9px] text-brand-gray/50 italic leading-relaxed pt-1">
              Headquarters: Bangalore, Karnataka, India. Deployments: cloud-native stateless containers. Separation standard: active.
            </p>
          </div>

        </div>

        {/* BOTTOM LEGAL ROW */}
        <div className="mx-auto max-w-7xl border-t border-brand-border/60 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between font-mono text-[10px] text-brand-gray/80 gap-4">
          <span>© 2026 Sovereon LLP. All rights reserved. Registered in Karnataka, India.</span>
          <div className="flex space-x-4">
            <a href="/about" className="hover:text-brand-orange transition-colors">Company Bio</a>
            <span>·</span>
            <a href="/contact" className="hover:text-brand-orange transition-colors">Support Ticket</a>
            <span>·</span>
            <a href="https://github.com/mdfaizanashrafi" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors flex items-center space-x-1"><span>GitHub</span></a>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP FLOATING BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full border border-brand-border bg-white shadow-md flex items-center justify-center text-brand-dark hover:border-brand-dark hover:text-brand-orange transition-all duration-300 z-40 group hover:-translate-y-1"
        id="scroll-to-top"
        aria-label="Scroll back to top of page"
      >
        <ArrowUp className="h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
      </button>
    </div>
  );
}
