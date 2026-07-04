/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { ArrowLeft, BookOpen, Clock, User, Calendar, ShieldAlert } from 'lucide-react';

interface BlogSectionProps {
  activeRoute: string;
}

export default function BlogSection({ activeRoute }: BlogSectionProps) {
  const isIndex = activeRoute === '/blog' || activeRoute === '/blog/';
  const slug = activeRoute.startsWith('/blog/') ? activeRoute.substring(6) : '';
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // If we are looking for a post but it doesn't exist, show simple warning
  if (!isIndex && !post) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center space-y-4">
        <ShieldAlert className="h-12 w-12 text-brand-orange mx-auto" />
        <h1 className="font-display text-2xl font-bold text-brand-dark">Blog Post Not Found</h1>
        <p className="text-xs text-brand-gray font-medium">The requested software systems brief could not be located on our servers.</p>
        <div className="pt-4">
          <a href="/blog" className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-brand-orange">
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO SYSTEMS BRIEFINGS INDEX</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {isIndex ? (
        // ============================================
        // BLOG INDEX VIEW
        // ============================================
        <div className="w-full">
          {/* Header */}
          <section className="relative overflow-hidden bg-brand-bg py-20 px-6 sm:px-8 border-b border-brand-border/40 tech-grid">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-6">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Systems Briefings // Engineering Logs</span>
              </div>
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">
                Sovereon LLP Blog
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-gray/90 font-medium">
                Deep briefings on high-concurrency architectures, digital sovereignty, safe LLM agent orchestration, and modular system design.
              </p>
            </div>
          </section>

          {/* List of articles */}
          <section className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
            <div className="space-y-10">
              {BLOG_POSTS.map((p) => (
                <article 
                  key={p.slug}
                  className="group relative border border-brand-border/60 bg-white p-6 sm:p-8 rounded-2xl hover:border-brand-orange/40 transition-all duration-300 shadow-sm"
                >
                  <div className="flex flex-wrap gap-x-4 gap-y-2 items-center font-mono text-[9px] font-bold text-brand-gray uppercase mb-3">
                    <span className="text-brand-orange">{p.category}</span>
                    <span>·</span>
                    <span>{p.date}</span>
                    <span>·</span>
                    <span className="flex items-center space-x-1"><Clock className="h-3 w-3" /> <span>{p.readTime}</span></span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                    <a href={`/blog/${p.slug}`} className="focus:outline-none">
                      {p.title}
                    </a>
                  </h2>

                  <p className="mt-3 text-xs leading-relaxed text-brand-gray/90 font-medium">
                    {p.excerpt}
                  </p>

                  <div className="mt-5 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                    <div className="flex items-center space-x-2 font-mono text-[10px] text-brand-dark font-semibold">
                      <div className="h-5 w-5 rounded-full bg-brand-orange/10 flex items-center justify-center text-[10px] text-brand-orange font-bold uppercase">
                        FA
                      </div>
                      <span>{p.author}</span>
                    </div>

                    <a 
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold text-brand-orange hover:translate-x-1 transition-transform"
                    >
                      <span>READ TECHNICAL BRIEFING</span>
                      <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      ) : (
        // ============================================
        // DYNAMIC BLOG POST DETAILS VIEW
        // ============================================
        post && (
          <article className="w-full">
            {/* Post Header Banner */}
            <section className="relative overflow-hidden bg-brand-bg py-20 px-6 sm:px-8 border-b border-brand-border/40 tech-grid">
              <div className="mx-auto max-w-3xl">
                <div className="mb-6">
                  <a 
                    href="/blog"
                    className="inline-flex items-center space-x-1.5 font-mono text-xs font-bold text-brand-gray hover:text-brand-orange transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>RETURN TO BRIEFINGS INDEX</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2 items-center font-mono text-[10px] font-bold text-brand-orange uppercase mb-4">
                  <span>{post.category}</span>
                  <span className="text-brand-gray">•</span>
                  <span className="text-brand-gray flex items-center space-x-1"><Calendar className="h-3 w-3" /> <span>{post.date}</span></span>
                  <span className="text-brand-gray">•</span>
                  <span className="text-brand-gray flex items-center space-x-1"><Clock className="h-3 w-3" /> <span>{post.readTime}</span></span>
                </div>

                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-brand-dark leading-tight">
                  {post.title}
                </h1>

                <div className="mt-6 flex items-center space-x-3 border-t border-brand-border/40 pt-6">
                  <div className="h-8 w-8 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-xs text-brand-orange font-extrabold">
                    FA
                  </div>
                  <div>
                    <div className="font-display text-xs font-bold text-brand-dark flex items-center space-x-1">
                      <User className="h-3 w-3 text-brand-orange" />
                      <span>{post.author}</span>
                    </div>
                    <p className="text-[10px] text-brand-gray font-mono uppercase tracking-wider">CEO &amp; Lead Architect, Sovereon LLP</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Post Body Content */}
            <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
              <div 
                className="prose prose-sm max-w-none text-xs leading-relaxed text-brand-gray/90 font-medium space-y-6"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author Bio Box */}
              <div className="mt-16 rounded-2xl border border-brand-border/60 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                <a href="https://mdfaizanashrafi.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src="https://res.cloudinary.com/dn8rbacc5/image/upload/v1783058089/founder_w7w37t.png"
                    alt="Md Faizan Ashrafi - Lead Architect of Sovereon LLP"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                    width="100"
                    height="100"
                    className="rounded-full border border-brand-border bg-brand-bg object-cover h-20 w-20 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                  />
                </a>
                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="font-display text-sm font-bold text-brand-dark">
                    <a href="https://mdfaizanashrafi.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
                      Md Faizan Ashrafi
                    </a>
                  </h4>
                  <p className="font-mono text-[9px] text-brand-orange font-bold uppercase tracking-wider">// CEO &amp; SYSTEM LEAD, SOVEREON LLP</p>
                  <p className="text-[11px] text-brand-gray font-medium leading-relaxed">
                    Faizan designs, builds, and scales high-performance, resilient software systems. Under his leadership, our firm champions digital sovereignty and Modular Monolithic engineering globally. Connect on his <a href="https://mdfaizanashrafi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-bold hover:underline">Portfolio</a> or on GitHub: <a href="https://github.com/mdfaizanashrafi" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-bold hover:underline">mdfaizanashrafi</a>.
                  </p>
                </div>
              </div>
            </section>
          </article>
        )
      )}
    </div>
  );
}
