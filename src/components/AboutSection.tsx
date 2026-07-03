/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Sparkles, Server, Compass, MapPin, Users, Globe, ExternalLink } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="w-full">
      {/* HERO HERO SECTION */}
      <section className="relative overflow-hidden bg-brand-bg py-20 px-6 sm:px-8 border-b border-brand-border/40 tech-grid">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-6">
            <Compass className="h-3.5 w-3.5" />
            <span>Digital Sovereignty // Corporate Profile</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
            Sovereon LLP
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-gray/90 font-medium">
            Based in Bangalore, India, we are a premier software engineering firm dedicated to digital sovereignty, robust multi-tenant SaaS products, and highly reliable AI automation workflows.
          </p>
        </div>
      </section>

      {/* CORE IDENTITY BLOCK */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-orange to-orange-600 opacity-20 blur-md transition duration-500 group-hover:opacity-40"></div>
              <img
                src="https://res.cloudinary.com/dn8rbacc5/image/upload/v1783058089/founder_w7w37t.png"
                alt="Md Faizan Ashrafi - Founder and CEO of Sovereon LLP"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                width="240"
                height="240"
                className="relative rounded-2xl border border-brand-border bg-brand-bg object-cover h-60 w-60 shadow-md grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <div className="md:col-span-8 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-wider text-brand-orange font-bold">
              // FOUNDER SUMMARY
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-dark">
              Md Faizan Ashrafi
            </h2>
            <p className="font-mono text-xs text-brand-orange/90 font-bold uppercase">
              CEO &amp; Lead Systems Architect
            </p>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              Sovereon LLP was founded by Md Faizan Ashrafi, an accomplished developer and lead systems engineer based in Bangalore, Karnataka, India. With deep technical expertise across micro-SaaS architecture, high-concurrency ordering APIs, and safe LLM automation systems, Faizan directs our firm\'s engineering standard. Under his guidance, Sovereon designs robust software monoliths that give companies full ownership of their digital ecosystems.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com/mdfaizanashrafi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 font-mono text-xs font-bold text-brand-dark hover:text-brand-orange transition-colors"
              >
                <Globe className="h-3.5 w-3.5 text-brand-orange" />
                <span>GITHUB PROFILE</span>
                <ExternalLink className="h-3.5 w-3.5 text-brand-gray" />
              </a>
            </div>
          </div>
        </div>

        {/* DETAILED SYSTEMS SPECIFICATION */}
        <div className="border border-brand-border/60 rounded-2xl bg-white p-8 space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <Server className="h-5 w-5 text-brand-orange" />
            <h3 className="font-display text-lg font-bold text-brand-dark">
              Bangalore Systems Engineering Hub
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
            India\'s Silicon Valley serves as our home base. From our office in Bangalore, Karnataka, India, we engineer custom software architectures for both local and global organizations. We build scalable backend systems that handle millions of requests without complex distributed microservices. We strictly utilize <strong>Modular Monolith Architectures</strong> to simplify deployments, reduce cloud-bloat overhead, and ensure 99.99% system availability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-brand-border/40">
            <div>
              <p className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-wide">LOCATION</p>
              <div className="flex items-center space-x-1.5 mt-1 font-display text-xs font-bold text-brand-dark">
                <MapPin className="h-3.5 w-3.5 text-brand-orange" />
                <span>Bangalore, IN</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-wide">COMPLIANCE</p>
              <div className="flex items-center space-x-1.5 mt-1 font-display text-xs font-bold text-brand-dark">
                <Shield className="h-3.5 w-3.5 text-brand-orange" />
                <span>Zero-Trust Standard</span>
              </div>
            </div>
            <div>
              <p className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-wide">ARCHITECT</p>
              <div className="flex items-center space-x-1.5 mt-1 font-display text-xs font-bold text-brand-dark">
                <Sparkles className="h-3.5 w-3.5 text-brand-orange" />
                <span>M.F. Ashrafi</span>
              </div>
            </div>
          </div>
        </div>

        {/* MISSION & STANDARD */}
        <div className="space-y-4">
          <h3 className="font-display text-xl font-bold text-brand-dark">
            The Digital Sovereignty Manifesto
          </h3>
          <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
            At Sovereon, we believe software should be an asset, not a lease. When you commission our systems engineering services, you own your code, databases, and servers. We remove expensive, locked-in cloud dependencies, replacing them with standard container configurations (such as Docker, Node.js, and PostgreSQL) that can run on any Linux-based machine globally. This is true digital sovereignty.
          </p>
          <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
            Whether we are engineering high-volume clinic order queues (MedicOrder) or restaurant management engines (DynamicMenu), we bake zero-trust security directly into our databases and secure APIs. Every user session is verified, and data is structured securely using relational standards.
          </p>
        </div>

        {/* CALL TO ACTION BUTTON */}
        <div className="pt-6 text-center">
          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-dark px-6 font-display text-xs font-bold tracking-wide text-white transition-all duration-300 hover:bg-brand-orange shadow-md"
          >
            DISPATCH ENGINEERING REQUEST
          </a>
        </div>
      </section>
    </div>
  );
}
