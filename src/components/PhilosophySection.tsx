/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ShieldCheck, HardDrive, RefreshCw, KeyRound, ArrowDown, UserCheck, Star, Sparkles, Server, Cpu, Globe, HelpCircle } from 'lucide-react';
import { Review } from '../types';

export default function PhilosophySection() {
  const [hoveredReviewId, setHoveredReviewId] = useState<string | null>(null);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  // Reviews data for hovering interactivity
  const reviews: Review[] = [
    {
      id: 'rev-1',
      author: 'Altamash Khan',
      role: 'Founder & CEO',
      company: 'DynamicMenu',
      text: "We switched from printed menus to DynamicMenu three months ago, and it's been a game changer for our restaurant. Updating prices, adding seasonal dishes, and sharing the menu through a QR code takes just a few minutes. It has saved us both time and printing costs, and our customers love the clean digital experience.",
      rating: 5,
      metrics: { label: 'PRINTING COST REDUCTION', value: '92%' }
    },
    {
      id: 'rev-2',
      author: 'Rajesh K. Mehta',
      role: 'Director of Logistics',
      company: 'MedicOrder',
      text: "Managing medicine orders across multiple vendors used to involve endless phone calls and WhatsApp messages. MedicOrder streamlined the entire process for us. We can place orders, track availability, and maintain records in one place. It has significantly improved our inventory management and reduced order errors.",
      rating: 5,
      metrics: { label: 'ORDER FULFILLMENT RATE', value: '99.9%' }
    },
    {
      id: 'rev-3',
      author: 'Shami Hashmi',
      role: 'Nomadic Engineer',
      company: 'GymRat',
      text: "As someone who travels frequently for work, staying consistent with my fitness routine was nearly impossible. GymRat solved that problem perfectly. I can discover partner gyms in any city, access my workout history, and keep my training streak alive wherever I go. It's become an essential app for my lifestyle.",
      rating: 5,
      metrics: { label: 'STREAK RETENTION', value: '100%' }
    },
    {
      id: 'rev-4',
      author: 'Aarav Sharma',
      role: 'Community Lead',
      company: 'de-screen',
      text: "Our local meetups saw a complete transformation after using de-screen. Finding genuine people for real-life experiences has never been easier. It helped us escape digital fatigue and build lasting, offline human connections.",
      rating: 5,
      metrics: { label: 'IN-PERSON ENGAGEMENT', value: '4.8x' }
    }
  ];

  return (
    <div className="relative w-full" id="philosophy-view-container">
      {/* HEADER SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 text-center">
        <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-4">
          <Cpu className="h-3.5 w-3.5" />
          <span>Core Belief System</span>
        </div>
        
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">
          OUR PHILOSOPHY
        </h1>
        
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-gray/90 sm:text-lg font-medium">
          DESCRIBE THE PHILOSOPHY OF OUR COMPANY AND WORK
        </p>
        
        <div className="mx-auto mt-4 h-[2px] w-24 bg-brand-orange"></div>
      </section>

      {/* CHRONOLOGICAL FRAMES TIMELINE ZIGZAG GRID (FRAMES 1 TO 5) */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 relative">
        
        {/* FRAME 1: SYSTEMS OVER SOFTWARE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Frame 1 Visual (IMG3) */}
          <div className="md:col-span-6">
            <div className="aspect-[16/10] w-full rounded-2xl border border-brand-border bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-brand-orange hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-widest">[ ARCH ]</span>
                <Server className="h-5 w-5 text-brand-orange" />
              </div>
              
              {/* Architecture Service Mapping */}
              <div className="flex flex-col space-y-2.5 my-auto">
                <div className="grid grid-cols-4 gap-1.5">
                  <div className="rounded bg-brand-orange/10 border border-brand-orange/20 p-1 text-center">
                    <span className="block font-mono text-[7px] font-bold text-brand-orange">DynamicMenu</span>
                    <span className="block font-sans text-[6px] text-brand-gray/80 mt-0.5">Menu Core</span>
                  </div>
                  <div className="rounded bg-brand-dark/5 border border-brand-dark/10 p-1 text-center">
                    <span className="block font-mono text-[7px] font-bold text-brand-dark">MedicOrder</span>
                    <span className="block font-sans text-[6px] text-brand-gray/80 mt-0.5">Logistics</span>
                  </div>
                  <div className="rounded bg-brand-dark/5 border border-brand-dark/10 p-1 text-center">
                    <span className="block font-mono text-[7px] font-bold text-brand-dark">GymRat</span>
                    <span className="block font-sans text-[6px] text-brand-gray/80 mt-0.5">Tracking</span>
                  </div>
                  <div className="rounded bg-brand-orange/10 border border-brand-orange/20 p-1 text-center">
                    <span className="block font-mono text-[7px] font-bold text-brand-orange">de-screen</span>
                    <span className="block font-sans text-[6px] text-brand-gray/80 mt-0.5">Connection</span>
                  </div>
                </div>

                <div className="relative flex items-center justify-center py-1">
                  <div className="h-[2px] w-full bg-brand-border/60"></div>
                  <div className="absolute px-2 bg-white text-[8px] font-mono text-brand-gray font-bold tracking-widest uppercase border border-brand-border/40 rounded">
                    Unified Gateway Layer
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded border border-brand-border/80 bg-brand-bg/40 p-2 text-center font-mono text-[8px] text-brand-dark font-bold">
                    UPSTASH MEMORY BUS
                  </div>
                  <div className="rounded border border-brand-border/80 bg-brand-bg/40 p-2 text-center font-mono text-[8px] text-brand-dark font-bold">
                    NEON TRANSACTION CORE
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-brand-gray">
                <span>SYSTEM_COHESION_V1.1</span>
                <span className="text-brand-orange animate-pulse">● SYSTEMS_INTEGRAL</span>
              </div>
            </div>
          </div>
          
          {/* Frame 1 Text */}
          <div className="md:col-span-6 flex flex-col space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">1. Philosophy 1</span>
            <h3 className="font-display text-xl font-bold text-brand-dark uppercase tracking-tight">Systems Engineering Over Software Development</h3>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              We approach engineering not as writing disjointed lines of code, but as building coherent, unified industrial systems. While traditional software development focus on shipping isolated features or adding external packages, true <strong>Systems Engineering</strong> designs from the foundation up—analyzing network latency, database locks, socket pools, and compiler attributes simultaneously.
            </p>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              By keeping our compute environments stateless and organizing business domains inside a <strong>Modular Monolith Architecture</strong>, we solve the premature microservices trap. This standard provides the logical isolation benefits of microservices while avoiding their complex distributed failure modes. Every deployment runs within a single lightweight container process, achieving extreme transactional reliability and up to 80% reduced cloud hosting costs.
            </p>
            <p className="text-[11px] leading-relaxed text-brand-gray/75 border-l border-brand-orange/40 pl-3 italic">
              Example: For our wholesale medicine order engine (MedicOrder), we designed a pessimistic row-locking state machine. This prevents race conditions and order double-allocation at the database level, guaranteeing absolute data consistency under high-concurrency loads.
            </p>
          </div>
        </div>

        {/* Diagonal Arrow Connecting 1 -> 2 */}
        <div className="hidden md:flex justify-center items-center py-8">
          <svg className="h-16 w-32 text-brand-gray/30" fill="none" viewBox="0 0 128 64">
            <path d="M16 8 Q64 48, 112 56" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="112,56 102,51 106,59" fill="currentColor" />
          </svg>
        </div>
        <div className="flex md:hidden justify-center py-6">
          <ArrowDown className="h-5 w-5 text-brand-orange animate-bounce" />
        </div>

        {/* FRAME 2: BUILD ONCE - SCALE FOREVER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Frame 2 Text (Ordered left on desktop to form zigzag) */}
          <div className="md:col-span-6 md:order-1 flex flex-col space-y-3 md:text-right">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">2. Philosophy 2</span>
            <h3 className="font-display text-xl font-bold text-brand-dark uppercase tracking-tight">Build Once, Scale Horizontally Symmetrically</h3>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              We design software architectures that scale effortlessly as user traffic grows. In modern <strong>SaaS Engineering</strong>, scaling is achieved not by purchasing expensive server upgrades, but by structuring the code to be completely stateless, allowing new container instances to launch instantly in response to traffic surges.
            </p>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              By isolating the database layer and offloading session memory, global cache keys, and asset rendering pipelines to high-performance distributed networks (such as Upstash Redis and S3 CDNs), our compute processes run as symmetrical, interchangeable nodes. This stateless design prevents single points of failure and allows you to run multiple server instances behind any standard load balancer.
            </p>
            <p className="text-[11px] leading-relaxed text-brand-gray/75 border-r border-brand-orange/40 pr-3 italic">
              Example: For our dynamic restaurant menu engine (DynamicMenu), we implement the cache-aside pattern with Redis. This serves active menu configurations from high-speed in-memory caches, dropping database load and ensuring sub-20ms global delivery under high concurrency.
            </p>
          </div>
          
          {/* Frame 2 Visual (IMG4) */}
          <div className="md:col-span-6 md:order-2">
            <div className="aspect-[16/10] w-full rounded-2xl border border-brand-border bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-brand-orange hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-widest">[ SCALING ]</span>
                <RefreshCw className="h-5 w-5 text-brand-orange animate-spin-slow" />
              </div>
              
              {/* Regional Node Clusters Replication */}
              <div className="relative flex flex-col justify-center my-auto space-y-3">
                <div className="flex items-center justify-between bg-brand-bg/60 border border-brand-border/40 p-2 rounded-lg font-mono text-[8px] text-brand-dark">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold">SGP-1 (Bengaluru Core)</span>
                  </div>
                  <span className="text-brand-gray">PRIMARY LOAD BALANCER</span>
                  <span className="text-brand-orange font-bold">ACTIVE</span>
                </div>
                
                {/* Connecting lines */}
                <div className="flex justify-around items-center px-8">
                  <div className="h-4 w-[1px] bg-brand-orange/40 border-dashed border-l"></div>
                  <div className="h-4 w-[1px] bg-brand-orange/40 border-dashed border-l"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-bg/30 border border-brand-border/40 p-1.5 rounded font-mono text-[7px] text-brand-gray flex flex-col items-center">
                    <span className="font-bold text-brand-dark">US-EAST (Virginia Edge)</span>
                    <span className="text-[6px] text-emerald-600 mt-0.5">SYNCED // 12ms</span>
                  </div>
                  <div className="bg-brand-bg/30 border border-brand-border/40 p-1.5 rounded font-mono text-[7px] text-brand-gray flex flex-col items-center">
                    <span className="font-bold text-brand-dark">EU-CENTRAL (Frankfurt Edge)</span>
                    <span className="text-[6px] text-emerald-600 mt-0.5">SYNCED // 24ms</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-brand-gray">
                <span>SCALABILITY_FACTOR_INFINITE</span>
                <span className="text-brand-orange font-bold">100% REGIONAL REPLICATED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Arrow Connecting 2 -> 3 */}
        <div className="hidden md:flex justify-center items-center py-8">
          <svg className="h-16 w-32 text-brand-gray/30" fill="none" viewBox="0 0 128 64">
            <path d="M112 8 Q64 48, 16 56" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="16,56 22,59 26,51" fill="currentColor" />
          </svg>
        </div>
        <div className="flex md:hidden justify-center py-6">
          <ArrowDown className="h-5 w-5 text-brand-orange animate-bounce" />
        </div>

        {/* FRAME 3: DIGITAL SOVEREIGNTY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Frame 3 Visual (IMG5) */}
          <div className="md:col-span-6">
            <div className="aspect-[16/10] w-full rounded-2xl border border-brand-border bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-brand-orange hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-widest">[ SOV ]</span>
                <KeyRound className="h-5 w-5 text-brand-orange" />
              </div>
              
              {/* Sovereignty cryptographic details */}
              <div className="flex flex-col space-y-2.5 my-auto">
                <div className="border border-brand-border/60 bg-brand-bg/50 rounded-lg p-2.5 font-mono text-[8px] text-brand-dark">
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-1.5 mb-1.5">
                    <span className="font-bold text-brand-orange">CLIENT DATA LOCK: AES-256-GCM</span>
                    <span className="text-emerald-600 font-bold">ENCRYPTED</span>
                  </div>
                  <div className="space-y-1 text-brand-gray">
                    <div className="flex justify-between">
                      <span>Public Signing ID:</span>
                      <span className="text-brand-dark font-medium">SOV_PUB_0x743F9...</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clerk Session token:</span>
                      <span className="text-brand-dark font-medium">Verified // Live</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Third-Party Bypass:</span>
                      <span className="text-rose-500 font-bold">DISABLED (Zero-Trust)</span>
                    </div>
                  </div>
                </div>

                <div className="text-center font-mono text-[7px] text-brand-gray tracking-tighter uppercase">
                  Data custody remains 100% within the client's localized boundaries
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-brand-gray">
                <span>IDENTITY_VIGILANCE_OK</span>
                <span className="text-emerald-600 font-bold">● SHIELD_ACTIVE</span>
              </div>
            </div>
          </div>
          
          {/* Frame 3 Text */}
          <div className="md:col-span-6 flex flex-col space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">3. Philosophy 3</span>
            <h3 className="font-display text-xl font-bold text-brand-dark uppercase tracking-tight">Absolute Digital Sovereignty</h3>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              We believe your proprietary business data, code assets, and customer databases are core strategic investments, not rental properties. Sovereon LLP designs with a focus on <strong>Digital Sovereignty</strong>—building self-hosted, modular software networks packaged inside standard, open container environments (like Docker OCI images).
            </p>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              We eliminate reliance on opaque, third-party service locks and complex black-box cloud APIs. Instead, your platform relies on open relational engines like PostgreSQL and secure JWT-based identity layers. This approach ensures your intellectual property remains under your complete ownership and can run on any physical or virtual Linux server globally.
            </p>
            <p className="text-[11px] leading-relaxed text-brand-gray/75 border-l border-brand-orange/40 pl-3 italic">
              Example: By deploying open authentication protocols and standard encryption layers (such as AES-256-GCM), we guarantee that customer records remain private, audit-ready, and fully compliant with international privacy rules.
            </p>
          </div>
        </div>

        {/* Diagonal Arrow Connecting 3 -> 4 */}
        <div className="hidden md:flex justify-center items-center py-8">
          <svg className="h-16 w-32 text-brand-gray/30" fill="none" viewBox="0 0 128 64">
            <path d="M16 8 Q64 48, 112 56" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="112,56 102,51 106,59" fill="currentColor" />
          </svg>
        </div>
        <div className="flex md:hidden justify-center py-6">
          <ArrowDown className="h-5 w-5 text-brand-orange animate-bounce" />
        </div>

        {/* FRAME 4: ENGINEERING FOR DATA FREEDOM */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Frame 4 Text (Ordered left on desktop to form zigzag) */}
          <div className="md:col-span-6 md:order-1 flex flex-col space-y-3 md:text-right">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">4. Philosophy 4</span>
            <h3 className="font-display text-xl font-bold text-brand-dark uppercase tracking-tight">Engineering for Complete Data Freedom</h3>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              We design software architectures that reject locked-in vendor databases or proprietary hosting ecosystems. Our <strong>Systems Engineering</strong> standard guarantees that your platform's schemas, transactional records, and custom user directories remain highly portable.
            </p>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              We write automated database migrations and standardized schema configurations using tools like Drizzle and PostgreSQL. This enables you to migrate your operational datasets—such as order histories, customer accounts, or AI prompt logs—effortlessly across any cloud environment, self-hosted bare-metal servers, or virtual edge routers without code rewrites or system downtime.
            </p>
            <p className="text-[11px] leading-relaxed text-brand-gray/75 border-r border-brand-orange/40 pr-3 italic">
              Example: Our databases maintain clean relational separations. This structure allows seamless scaling from a serverless single-instance DB to highly resilient, geographically distributed read-replica clusters as your company scales.
            </p>
          </div>
          
          {/* Frame 4 Visual (IMG6) */}
          <div className="md:col-span-6 md:order-2">
            <div className="aspect-[16/10] w-full rounded-2xl border border-brand-border bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-brand-orange hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-widest">[ FREEDOM ]</span>
                <Globe className="h-5 w-5 text-brand-orange" />
              </div>
              
              {/* Dynamic open data pipeline map */}
              <div className="flex flex-col space-y-3 my-auto">
                <div className="flex justify-between items-center text-[8px] font-mono font-bold text-brand-dark px-1">
                  <span>DATA SOURCE</span>
                  <span>MIGRATION TUNNEL</span>
                  <span>DESTINATION</span>
                </div>

                <div className="border border-brand-border/60 bg-brand-bg/20 rounded-lg p-2.5 space-y-2">
                  {/* Row 1: DB */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-brand-dark text-white font-medium">NEON POSTGRES</span>
                    <div className="flex-1 mx-2 flex items-center justify-center">
                      <div className="h-[1px] w-full bg-brand-orange border-dashed border-t animate-pulse"></div>
                      <span className="text-[7px] font-mono text-brand-orange px-1">SYNC</span>
                    </div>
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded border border-brand-border bg-white text-brand-dark font-semibold">SUPABASE / SELF-HOSTED</span>
                  </div>

                  {/* Row 2: Cache */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-brand-dark text-white font-medium">UPSTASH REDIS</span>
                    <div className="flex-1 mx-2 flex items-center justify-center">
                      <div className="h-[1px] w-full bg-brand-orange border-dashed border-t animate-pulse"></div>
                      <span className="text-[7px] font-mono text-brand-orange px-1">SYNC</span>
                    </div>
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded border border-brand-border bg-white text-brand-dark font-semibold">DRAGONFLY / REDIS MEM</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-brand-gray">
                <span>FEDERATION_GRID_OK</span>
                <span className="text-brand-orange font-bold">100% DATA PORTABILITY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Arrow Connecting 4 -> 5 */}
        <div className="hidden md:flex justify-center items-center py-8">
          <svg className="h-16 w-32 text-brand-gray/30" fill="none" viewBox="0 0 128 64">
            <path d="M112 8 Q64 48, 16 56" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="16,56 22,59 26,51" fill="currentColor" />
          </svg>
        </div>
        <div className="flex md:hidden justify-center py-6">
          <ArrowDown className="h-5 w-5 text-brand-orange animate-bounce" />
        </div>

        {/* FRAME 5: BELIEF AT SOVEREON */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Frame 5 Visual (IMG7) */}
          <div className="md:col-span-6">
            <div className="aspect-[16/10] w-full rounded-2xl border border-brand-border bg-white p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:border-brand-orange hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-gray font-bold uppercase tracking-widest">[ BELIEF ]</span>
                <Sparkles className="h-5 w-5 text-brand-orange" />
              </div>
              
              {/* Engineering Blueprint gauge or console */}
              <div className="flex flex-col space-y-2 my-auto">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="border border-brand-border/60 bg-brand-bg/40 p-2 rounded flex flex-col justify-center items-center">
                    <span className="font-mono text-[6px] text-brand-gray uppercase">Core Latency</span>
                    <span className="font-mono text-[11px] font-extrabold text-brand-dark">0.12ms</span>
                    <span className="font-mono text-[5px] text-emerald-600 font-bold">SUB-MICROSECOND</span>
                  </div>
                  <div className="border border-brand-border/60 bg-brand-bg/40 p-2 rounded flex flex-col justify-center items-center">
                    <span className="font-mono text-[6px] text-brand-gray uppercase">SaaS SLA</span>
                    <span className="font-mono text-[11px] font-extrabold text-brand-dark">99.99%</span>
                    <span className="text-[5px] font-mono text-emerald-600 font-bold">Uptime Guaranteed</span>
                  </div>
                </div>

                <div className="border border-brand-border/40 p-1.5 rounded bg-brand-bg/10 flex items-center justify-between font-mono text-[7px] text-brand-gray">
                  <span>OPTIMIZATION LEVEL:</span>
                  <span className="text-brand-orange font-bold">PRISTINE MODULES (0% OVERHEAD)</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-[10px] font-mono font-semibold text-brand-gray">
                <span>MATHEMATICAL_CERTAINTY</span>
                <span className="text-brand-orange font-bold">SOVEREON_STANDARD</span>
              </div>
            </div>
          </div>
          
          {/* Frame 5 Text */}
          <div className="md:col-span-6 flex flex-col space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">5. Philosophy 5</span>
            <h3 className="font-display text-xl font-bold text-brand-dark uppercase tracking-tight">Craftsmanship Over Administrative Bloat</h3>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              We approach systems software development as a high art. In a world full of bloated software platforms and over-engineered setups, Sovereon LLP prioritizes clean, precise execution. We believe visual and functional quality comes from intentional design choices and minimalist architectural layouts.
            </p>
            <p className="text-xs leading-relaxed text-brand-gray/90 font-medium">
              When we build custom <strong>AI Automation</strong> features, we reject flimsy third-party plugins and embed structured intelligence (via the Google GenAI SDK) directly into your secure backend. This results in stable, highly secure, and extremely responsive applications that load instantly and perform flawlessly.
            </p>
            <p className="text-[11px] leading-relaxed text-brand-gray/75 border-l border-brand-orange/40 pl-3 italic">
              Example: By minifying bundle sizes and utilizing native browser capabilities instead of heavy external frameworks, we deliver clean interfaces that achieve top performance on Google's Core Web Vitals.
            </p>
          </div>
        </div>

      </section>

      {/* FOOTER PILLARS (THE PARADIGMATIC PHILOSOPHER REPEATER) */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 border-t border-brand-border/60" id="systems-engagement-promise-section">
        <div className="text-center mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-orange">
            Systems Engagement Promise
          </span>
          <h4 className="font-display text-2xl font-extrabold tracking-tight text-brand-dark sm:text-3xl mt-1">
            THE PARADIGMATIC PHILOSOPHER STANDARD
          </h4>
          <p className="mx-auto mt-3 max-w-xl text-xs text-brand-gray/80 font-mono">
            OPERATIONAL STANDARDS & PERFORMANCE CRITERIA BUILT INTO EVERY CONTRACT
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative group bg-white border border-brand-border rounded-xl p-5 hover:border-brand-orange hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                <RefreshCw className="h-4 w-4 animate-spin-slow" />
              </div>
              <span className="font-mono text-[10px] font-bold text-brand-dark uppercase tracking-wider">MONITORING</span>
            </div>
            <h5 className="font-display font-bold text-sm text-brand-dark mb-1">24×7 System Monitoring</h5>
            <p className="text-[11px] text-brand-gray leading-relaxed">
              Continuous live telemetry mapping every micro-service with automated failovers and self-healing routing paths.
            </p>
          </div>

          <div className="relative group bg-white border border-brand-border rounded-xl p-5 hover:border-brand-orange hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="font-mono text-[10px] font-bold text-brand-dark uppercase tracking-wider">OPERATIONS</span>
            </div>
            <h5 className="font-display font-bold text-sm text-brand-dark mb-1">Low-Latency Operations</h5>
            <p className="text-[11px] text-brand-gray leading-relaxed">
              Expert systems engineering team optimizing code to run natively with sub-millisecond network round trips.
            </p>
          </div>

          <div className="relative group bg-white border border-brand-border rounded-xl p-5 hover:border-brand-orange hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-mono text-[10px] font-bold text-brand-dark uppercase tracking-wider">AI INFRA</span>
            </div>
            <h5 className="font-display font-bold text-sm text-brand-dark mb-1">AI as Infrastructure</h5>
            <p className="text-[11px] text-brand-gray leading-relaxed">
              Embedding intelligence directly into databases and routing networks rather than relying on flimsy external wrappers.
            </p>
          </div>

          <div className="relative group bg-white border border-brand-border rounded-xl p-5 hover:border-brand-orange hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span className="font-mono text-[10px] font-bold text-brand-dark uppercase tracking-wider">PROVEN METRICS</span>
            </div>
            <h5 className="font-display font-bold text-sm text-brand-dark mb-1">Mathematically Proven</h5>
            <p className="text-[11px] text-brand-gray leading-relaxed">
              Formal verification and concrete uptime SLA guarantees backed by transparent cryptographic logging.
            </p>
          </div>
        </div>
      </section>

      {/* REVIEWS OF SaaS USERS */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 bg-brand-bg border-y border-brand-border" id="reviews-section">
        <div className="text-center mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-orange">Client Testimonials</span>
          <h3 className="font-display text-3xl font-extrabold tracking-tight text-brand-dark mt-1">
            REVIEWS OF SaaS USERS
          </h3>
          <p className="text-sm text-brand-gray mt-2 font-medium">
            Hover over the client terminal cards to inspect performance metrics and operational analytics.
          </p>
        </div>

        {/* Interactive Reviews Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`relative flex flex-col justify-between rounded-xl border bg-white p-6 transition-all duration-300 overflow-hidden cursor-default ${
                hoveredReviewId === review.id 
                  ? 'border-brand-dark shadow-lg -translate-y-1' 
                  : 'border-brand-border shadow-sm'
              }`}
              onMouseEnter={() => setHoveredReviewId(review.id)}
              onMouseLeave={() => setHoveredReviewId(null)}
              id={`review-card-${review.id}`}
            >
              {/* Elegant background highlight for active state */}
              <div className={`absolute top-0 left-0 w-1.5 h-full bg-brand-orange transition-opacity duration-300 ${
                hoveredReviewId === review.id ? 'opacity-100' : 'opacity-0'
              }`}></div>

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="font-display font-extrabold text-sm text-brand-dark">{review.author}</span>
                    <span className="font-mono text-[9px] text-brand-gray uppercase">{review.role}, {review.company}</span>
                  </div>
                  <div className="flex items-center text-brand-orange">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-xs leading-relaxed text-brand-gray/90 italic font-medium">
                  "{review.text}"
                </p>
              </div>

              {/* Hover-activated terminal metric block */}
              <div className="mt-6 pt-4 border-t border-brand-border/40 flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-gray/60 uppercase">OPERATIONAL GAIN</span>
                
                {/* Dynamically animate on hover */}
                <div className={`rounded bg-brand-dark px-2.5 py-1 font-mono text-[10px] font-bold text-white transition-all duration-300 ${
                  hoveredReviewId === review.id ? 'bg-brand-orange scale-105' : 'bg-brand-dark'
                }`}>
                  {review.metrics.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION (AI SEARCH & SGE OPTIMIZATION) */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-8 border-t border-brand-border/60" id="faq-section">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-4">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Systems Briefing // FAQ</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-brand-gray/90 font-medium">
            Answers compiled for autonomous search agents, enterprise partners, and technical clients.
          </p>
        </div>

        <div className="space-y-4" id="faq-accordion-group">
          {[
            {
              id: 'faq-1',
              question: "What is Sovereon LLP's core engineering philosophy?",
              answer: "Sovereon LLP champions digital sovereignty, modular monolith system architectures, and mathematically-proven scalability. We intentionally build robust, unified software monoliths with clean internal domain separation instead of over-engineered microservices. This ensures maximum network throughput, low-latency transaction processing, simplified operations, and zero-trust security borders without cloud-bloat overhead."
            },
            {
              id: 'faq-2',
              question: "Where is Sovereon LLP headquartered and who is the founder?",
              answer: "Sovereon LLP is located in Bangalore, Karnataka, India (often recognized as Asia's premier Silicon Valley). The company was founded by Md Faizan Ashrafi, who serves as CEO and Lead Systems Architect. Under his leadership, our firm builds high-performance, resilient software systems for both Indian and global markets."
            },
            {
              id: 'faq-3',
              question: "What specific full-stack services does Sovereon LLP engineer?",
              answer: "Sovereon LLP specializes in three primary technical pillars: custom SaaS product development (ranging from high-concurrency order systems like MedicOrder to restaurant platforms like DynamicMenu), tailored AI automation agents that streamline enterprise workflows, and advanced full-stack systems engineering utilizing highly responsive technologies such as React, Vite, Node, and secure cloud containerization."
            },
            {
              id: 'faq-4',
              question: "How does Sovereon LLP approach application security and digital sovereignty?",
              answer: "Security is baked into the very foundation of our systems rather than added as an afterthought. We implement strict zero-trust operational standards across all application layers—securing databases, locking API endpoints, restricting CORS origins, and setting rigid security headers. This enables digital sovereignty, allowing businesses to own, manage, and audit their entire software ecosystem safely."
            },
            {
              id: 'faq-5',
              question: "How can enterprise partners get in touch with Sovereon LLP?",
              answer: "You can open an engineering ticket or request a full technical consultation directly through our dispatch email at sovereon@sovereon.online or contact our Bangalore office by telephone at +91 7439368190. Our standard systems support and architect-on-call hours are 9:00 AM to 7:00 PM IST, Monday through Saturday."
            }
          ].map((faq) => {
            const isOpen = activeFaqId === faq.id;
            return (
              <div 
                key={faq.id} 
                className="overflow-hidden rounded-xl border border-brand-border/60 bg-white transition-all duration-300 hover:border-brand-orange/40"
                id={faq.id}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left font-display text-sm font-bold text-brand-dark transition-colors hover:text-brand-orange"
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-content`}
                >
                  <span>{faq.question}</span>
                  <span className={`ml-4 flex h-6 w-6 items-center justify-center rounded-full border border-brand-border/80 text-brand-dark transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-brand-orange border-brand-orange text-white' : 'bg-transparent'
                  }`}>
                    <ArrowDown className="h-3 w-3" />
                  </span>
                </button>
                <div 
                  id={`${faq.id}-content`}
                  className={`transition-all duration-300 ${
                    isOpen ? 'max-h-60 opacity-100 border-t border-brand-border/40' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <p className="px-6 py-5 text-xs leading-relaxed text-brand-gray/90 font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
