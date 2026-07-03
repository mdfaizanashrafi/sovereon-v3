/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TOPIC_PAGES } from '../data/seoContent';
import { ArrowLeft, ArrowDown, HelpCircle, Layers, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface TopicClusterSectionProps {
  activeRoute: string;
}

export default function TopicClusterSection({ activeRoute }: TopicClusterSectionProps) {
  const page = TOPIC_PAGES[activeRoute];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!page) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-brand-dark">Systems Briefing Not Found</h1>
        <p className="text-xs text-brand-gray font-medium">The requested custom systems topic cluster is currently offline or undergoing schema updates.</p>
        <div className="pt-4">
          <a href="/" className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-brand-orange">
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO SOVEREON HOME</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Dynamic Header Block with Breadcrumbs */}
      <section className="relative overflow-hidden bg-brand-bg py-20 px-6 sm:px-8 border-b border-brand-border/40 tech-grid">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb Navigation - Task 1 Requirement */}
          <nav className="flex items-center space-x-2 font-mono text-[9px] font-bold uppercase text-brand-gray mb-6 tracking-wide">
            <a href="/" className="hover:text-brand-orange transition-colors">HOME</a>
            <ChevronRight className="h-3 w-3 text-brand-gray/50" />
            <a href="/solutions" className="hover:text-brand-orange transition-colors">SOLUTIONS</a>
            <ChevronRight className="h-3 w-3 text-brand-gray/50" />
            <span className="text-brand-orange truncate max-w-xs">{page.h1.toUpperCase()}</span>
          </nav>

          <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-6">
            <Layers className="h-3.5 w-3.5" />
            <span>Topic Cluster // Engineering Standards</span>
          </div>
          
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-dark leading-tight">
            {page.h1}
          </h1>
          
          <p className="mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed text-brand-gray/90 font-medium uppercase font-mono tracking-tight">
            {page.subtitle}
          </p>
        </div>
      </section>

      {/* Main Core Content Container with Problems and Solutions Structure (Task 7 Requirement) */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <article className="prose prose-sm max-w-none text-xs leading-relaxed text-brand-gray/90 font-medium space-y-6">
          <div 
            className="space-y-6"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </article>

        {/* Dynamic FAQ Accordion Section (Task 2 Requirement) */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="mt-16 border-t border-brand-border/60 pt-16" id="topic-faq-section">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-3">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>SPECIFIC SYSTEM BRIEFS // FAQ</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-brand-dark">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="space-y-4">
              {page.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="overflow-hidden rounded-xl border border-brand-border/60 bg-white transition-all duration-300 hover:border-brand-orange/40"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left font-display text-xs sm:text-sm font-bold text-brand-dark transition-colors hover:text-brand-orange"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-brand-border/80 text-brand-dark transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-brand-orange border-brand-orange text-white' : 'bg-transparent'
                      }`}>
                        <ArrowDown className="h-3 w-3" />
                      </span>
                    </button>
                    <div 
                      className={`transition-all duration-300 ${
                        isOpen ? 'max-h-60 opacity-100 border-t border-brand-border/40' : 'max-h-0 opacity-0'
                      } overflow-hidden`}
                    >
                      <p className="px-6 py-5 text-xs leading-relaxed text-brand-gray/90 font-medium bg-brand-bg/10">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sibling and Parent Cluster Authority Links (Task 4 Internal Linking Graph Engine) */}
        <div className="mt-16 pt-12 border-t border-brand-border/60 grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
          
          {/* Related Siblings / Sibling Internal Graph Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-brand-dark uppercase tracking-wider">// RELATED SYSTEM BRIEFS</h4>
            <ul className="space-y-2.5">
              {page.siblingLinks.map((sib, i) => (
                <li key={i} className="flex items-center space-x-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                  <a 
                    href={sib.url}
                    className="font-semibold text-brand-gray hover:text-brand-orange transition-colors"
                  >
                    {sib.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Blog / Core Parental Links */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-bold text-brand-dark uppercase tracking-wider">// PARENT RESOURCE FILES</h4>
              <div className="flex flex-wrap gap-2">
                {page.parentLinks.map((par, i) => (
                  <a 
                    key={i}
                    href={par.url}
                    className="rounded bg-brand-bg border border-brand-border px-3 py-1 text-[10px] font-semibold text-brand-dark hover:border-brand-orange transition-all"
                  >
                    {par.label.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Related Blog Article - Solid Authority Link */}
            {page.blogLink && (
              <div className="border border-brand-border/60 bg-white p-5 rounded-xl space-y-2">
                <div className="flex items-center space-x-1.5 text-brand-orange font-bold uppercase text-[9px]">
                  <FileText className="h-3 w-3" />
                  <span>RECOMMENDED BRIEFING</span>
                </div>
                <h5 className="font-display font-bold text-xs text-brand-dark hover:text-brand-orange transition-colors">
                  <a href={page.blogLink.url}>{page.blogLink.title}</a>
                </h5>
                <a 
                  href={page.blogLink.url}
                  className="inline-flex items-center space-x-1 text-[10px] font-bold text-brand-orange hover:underline"
                >
                  <span>ACCESS DEEP BRIEFING</span>
                  <ArrowLeft className="h-3 w-3 rotate-180" />
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Founder Authority Link Banner (Task 7 Requirement) */}
        <div className="mt-16 bg-brand-bg/30 border border-brand-border/40 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-display text-sm font-bold text-brand-dark">Enterprise Software Audit Needed?</h4>
            <p className="text-[11px] text-brand-gray font-medium">Get a complete systems analysis and architectural assessment directed by CEO Md Faizan Ashrafi.</p>
          </div>
          <a
            href="/contact"
            className="h-10 px-5 inline-flex items-center justify-center rounded-lg bg-brand-dark text-white font-display text-xs font-bold transition-all hover:bg-brand-orange shrink-0 shadow-sm"
          >
            CONSULT CHIEF ARCHITECT
          </a>
        </div>
      </section>
    </div>
  );
}
