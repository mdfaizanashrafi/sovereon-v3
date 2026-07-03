/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, HardDrive, ShieldAlert, Award, Globe, Database, HelpCircle, Activity } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { Project, Product } from '../types';
import founderImg from '../../assets/founder.jpg';

interface HomeSectionProps {
  onNavigateToPhilosophy: () => void;
  onNavigateToSolutions: () => void;
  onGetInTouch: () => void;
}

export default function HomeSection({ 
  onNavigateToPhilosophy, 
  onNavigateToSolutions, 
  onGetInTouch 
}: HomeSectionProps) {
  
  const [imageIndex, setImageIndex] = useState(0);
  const imageSources = [
    'https://res.cloudinary.com/dn8rbacc5/image/upload/v1783058089/founder_w7w37t.png',
    founderImg,
    '/assets/founder.jpg',
    '/founder.jpg',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600&h=600'
  ];

  const handleImageError = () => {
    if (imageIndex < imageSources.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  // Custom Sovereon Products for the Infinite Scrolling Marquee Banner
  const products: Product[] = [
    { name: 'DynamicMenu', symbol: '🍽️', description: 'SaaS for restaurants menu creation tool' },
    { name: 'MedicOrder', symbol: '💊', description: 'SaaS for Wholesale order of medicines' },
    { name: 'GymRat', symbol: '🏋️', description: 'SaaS for gym rats on the move' },
  ];

  // Double the products array to allow seamless looping in the marquee
  const marqueeItems = [...products, ...products, ...products];

  // Key Active Projects matching the mockup instructions
  const currentProjects: Project[] = [
    {
      id: 'proj-1',
      name: 'DynamicMenu',
      logoText: 'DM',
      logoBg: 'bg-brand-dark text-white hover:bg-brand-orange hover:text-white group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 cursor-pointer',
      description: 'A robust digital menu builder designed for modern gastronomy. Allows restaurant operators to instantly design, publish, and update beautiful, interactive menus with real-time QR code generation and instant checkout integrations.',
      link: '#',
      category: 'Restaurant SaaS',
      tags: ['React', 'Next.js', 'QR-Engine']
    },
    {
      id: 'proj-2',
      name: 'MedicOrder',
      logoText: 'MO',
      logoBg: 'bg-brand-dark text-white hover:bg-brand-orange hover:text-white group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 cursor-pointer',
      description: 'The definitive wholesale order-routing engine facilitating supply links between medicine stockists and independent vendors. Built on zero-trust transactional logging, optimizing wholesale bulk medicine distribution at speed.',
      link: '#',
      category: 'Healthcare Logistics',
      tags: ['PostgreSQL', 'TypeScript', 'ACID-Transactions']
    },
    {
      id: 'proj-3',
      name: 'GymRat',
      logoText: 'GR',
      logoBg: 'bg-brand-charcoal text-white border border-brand-border hover:bg-brand-orange hover:border-brand-orange hover:text-white group-hover:bg-brand-orange group-hover:border-brand-orange group-hover:text-white transition-all duration-300 cursor-pointer',
      description: 'A global training-hub locator and session scheduler designed specifically for traveling fitness enthusiasts. Aggregates multi-location gym memberships, tracking workouts and maintaining streak counts as you migrate across borders.',
      link: '#',
      category: 'Fitness & Travel',
      tags: ['Geolocation', 'WASM', 'Real-Time Sync']
    }
  ];

  return (
    <div className="relative w-full" id="home-view-container">
      {/* 1. HERO DESCRIPTION SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-20">
        {/* Mockup Indicator - Rendered elegantly as engineering metadata */}
        <div className="mb-6 flex items-center space-x-2">
          <span className="inline-block h-2 w-2 rounded-full bg-brand-orange"></span>
          <span className="font-mono text-xs font-semibold tracking-wider text-brand-orange uppercase">
            Sovereon // System Description Entry
          </span>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              SOVEREON
            </h1>
            
            <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-brand-orange">
              Sovereign Systems & Software Engineering
            </h2>
            
            <p className="text-sm leading-relaxed text-brand-gray/90 font-medium">
              Based in Bangalore, India, <strong>Sovereon LLP</strong> is an elite systems engineering and digital product firm. Founded by Md Faizan Ashrafi, we specialize in building robust, secure, and highly scalable applications for both Indian and global markets. We reject the over-complications of modern software architecture in favor of clean design, modular systems, and digital sovereignty.
            </p>

            <p className="text-sm leading-relaxed text-brand-gray/90 font-medium">
              Our engineering philosophy is centered around three primary pillars:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-2">
              <div className="rounded-lg border border-brand-border/60 bg-brand-bg/20 p-3">
                <span className="block font-mono text-[9px] font-bold text-brand-orange uppercase">01 / SAAS ENGINEERING</span>
                <span className="block text-xs text-brand-dark/90 font-medium mt-1">Deploying zero-trust, modular monolith SaaS models that scale without network overhead.</span>
              </div>
              <div className="rounded-lg border border-brand-border/60 bg-brand-bg/20 p-3">
                <span className="block font-mono text-[9px] font-bold text-brand-orange uppercase">02 / AI AUTOMATION</span>
                <span className="block text-xs text-brand-dark/90 font-medium mt-1">Embedding intelligent agents and tool-calling models natively into secure backends.</span>
              </div>
              <div className="rounded-lg border border-brand-border/60 bg-brand-bg/20 p-3">
                <span className="block font-mono text-[9px] font-bold text-brand-orange uppercase">03 / SYSTEMS DESIGN</span>
                <span className="block text-xs text-brand-dark/90 font-medium mt-1">Formulating high-performance database schemas and low-latency API networks.</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-brand-gray/80">
              We empower startups and enterprises to break free from proprietary cloud vendor locks, ensuring complete custody over their databases, transactional logs, and intellectual property. Let's build something beautiful and resilient.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onGetInTouch}
                className="group flex items-center justify-center space-x-3 rounded-full border-2 border-brand-dark bg-brand-dark px-8 py-3.5 font-display text-sm font-semibold text-brand-bg transition-all duration-300 hover:bg-transparent hover:text-brand-dark shadow-lg hover:shadow-md"
                id="hero-primary-cta"
              >
                <span>GET FREE STRATEGIC CONSULTATION</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Canvas Column (Visualizing img1) */}
          <div className="lg:col-span-6 h-[400px] sm:h-[480px]">
            <HeroCanvas />
          </div>
        </div>
      </section>

      {/* 2. INFINITE MARQUEE BANNER (SHOWCASING ALL THE PRODUCTS) */}
      <section className="border-y border-brand-border bg-white py-10 overflow-hidden shadow-sm">
        <div className="mb-4 text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-gray/60 font-medium">
            ✦ Running Portfolio: Showcasing All Core Products and Systems ✦
          </span>
        </div>
        
        <div className="relative flex w-full overflow-hidden select-none">
          {/* Infinite marquee content */}
          <div className="animate-marquee whitespace-nowrap flex py-2">
            {marqueeItems.map((product, idx) => (
              <div 
                key={`${product.name}-${idx}`} 
                className="flex items-center space-x-4 mx-8 px-6 py-3 border border-brand-border/60 bg-brand-bg/40 rounded-xl transition-all hover:border-brand-orange/40 hover:bg-white hover:shadow-sm"
              >
                {/* Logo / Symbol */}
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-dark font-mono text-lg font-bold text-brand-orange">
                  {product.symbol}
                </span>
                
                {/* Product Name */}
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-brand-dark">
                    {product.name}
                  </span>
                  <span className="font-mono text-[9px] text-brand-gray uppercase tracking-tight">
                    {product.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE PARADIGMATIC PHILOSOPHER SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
        <div className="rounded-2xl border border-brand-border bg-white p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {/* Technical watermarks in corners */}
          <div className="absolute right-4 top-4 font-mono text-[9px] text-brand-gray/20">
            PARADIGM_v4.1
          </div>
          
          <div className="flex flex-col items-center text-center space-y-6">
            <h3 className="font-display text-2xl font-black uppercase tracking-tight text-brand-dark sm:text-3xl">
              THE PARADIGMATIC PHILOSOPHER
            </h3>

            {/* Pillar list */}
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-sm font-semibold font-mono text-brand-dark">
              <span className="flex items-center space-x-1.5 hover:text-brand-orange transition-colors duration-200 cursor-pointer">
                <Activity className="h-4 w-4" />
                <span>24×7 System Integrity</span>
              </span>
              <span className="text-brand-border select-none">|</span>
              <span className="flex items-center space-x-1.5 hover:text-brand-orange transition-colors duration-200 cursor-pointer">
                <Cpu className="h-4 w-4" />
                <span>Expert Engineering Team</span>
              </span>
              <span className="text-brand-border select-none">|</span>
              <span className="flex items-center space-x-1.5 hover:text-brand-orange transition-colors duration-200 cursor-pointer">
                <Database className="h-4 w-4" />
                <span>AI as Infrastructure</span>
              </span>
              <span className="text-brand-border select-none">|</span>
              <span className="flex items-center space-x-1.5 hover:text-brand-orange transition-colors duration-200 cursor-pointer">
                <Award className="h-4 w-4" />
                <span>Proven Mathematical Results</span>
              </span>
            </div>

            <div className="max-w-3xl border-t border-dashed border-brand-border pt-6">
              <p className="text-base italic text-brand-gray leading-relaxed sm:text-lg font-medium">
                "We believe that software is transient, but systems are permanent. Our work is guided by the paradigm of building self-governing, self-healing digital structures that secure your core operational independence."
              </p>
            </div>

            <button
              onClick={onNavigateToPhilosophy}
              className="mt-4 inline-flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-brand-orange hover:text-brand-orange-hover border-b border-brand-orange/30 pb-0.5 hover:border-brand-orange transition-colors"
              id="expand-philosophy-btn"
            >
              <span>Expand on this in the Philosophy section</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. CURRENT PROJECTS SHOWCASE */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-orange">
              Active Operations
            </span>
            <h3 className="font-display text-3xl font-extrabold tracking-tight text-brand-dark mt-1">
              CURRENT PROJECTS
            </h3>
          </div>
          <p className="text-sm text-brand-gray max-w-md font-medium">
            A comprehensive list of ongoing software assemblies, hardware orchestrators, and system nodes maintained under strict quality control.
          </p>
        </div>

        {/* Project Card Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {currentProjects.map((project) => (
            <div 
              key={project.id} 
              className="group flex flex-col justify-between rounded-xl border border-brand-border bg-white p-6 transition-all duration-300 hover:border-brand-dark hover:shadow-md"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {/* Logo block */}
                    <div className={`flex h-11 w-11 items-center justify-center rounded-lg font-mono text-base font-bold shadow-sm ${project.logoBg}`}>
                      {project.logoText}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-extrabold text-base text-brand-dark">
                        {project.name}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gray">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Icon Link Accent */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-bg text-brand-gray transition-colors group-hover:bg-brand-orange group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-brand-gray group-hover:text-brand-dark transition-colors mb-6">
                  {project.description}
                </p>
              </div>

              {/* Tags footer */}
              <div className="flex flex-wrap gap-2 border-t border-brand-border/50 pt-4">
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="rounded-md bg-brand-bg px-2.5 py-1 font-mono text-[10px] font-semibold text-brand-dark/70 border border-brand-border/40 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 flex items-center justify-center">
          <button 
            onClick={onNavigateToSolutions}
            className="group inline-flex items-center space-x-2 text-sm font-bold text-brand-dark hover:text-brand-orange transition-colors"
          >
            <span>VIEW SYSTEMS SOLUTIONS &amp; SPECIFICATIONS</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </section>

      {/* 5. THE PHILOSOPHER // FOUNDER SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:pb-24 border-t border-brand-border/60" id="founder-section">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Image with elegant framing */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full" id="founder-image-wrapper">
              {/* Outer double border framing */}
              <div className="absolute -inset-2 rounded-2xl border border-brand-border/40 pointer-events-none transition-all duration-300 group-hover:border-brand-orange/20"></div>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl border-2 border-brand-dark bg-white shadow-md">
                <img
                  id="founder-profile-img"
                  src={imageSources[imageIndex]}
                  onError={handleImageError}
                  alt="Md. Faizan Ashrafi"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  width="380"
                  height="380"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Copy and Info */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-orange">
                The Philosopher // Leadership
              </span>
              <h3 className="font-display text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl" id="founder-title">
                Md. Faizan Ashrafi
              </h3>
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-gray">
                Founder &amp; Principal Architect
              </p>
            </div>

            <div className="border-l-2 border-brand-orange pl-6 my-4">
              <p className="text-base leading-relaxed text-brand-gray/95 sm:text-lg italic font-medium">
                “I'm Md Faizan Ashrafi, a technology professional passionate about designing and building modern digital solutions. As The Architect, I combine strategic thinking with technical expertise to create scalable systems, intuitive user experiences, and impactful products. I focus on clean design, innovation, and practical problem-solving to deliver technology that is both effective and meaningful.”
              </p>
            </div>

            {/* Decorative technical stats or milestones */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-brand-border/40">
              <div id="founder-stat-1">
                <span className="block font-mono text-[10px] text-brand-gray uppercase tracking-wider">ROLE_DEFINITION</span>
                <span className="block text-sm font-semibold text-brand-dark mt-1">Systems Craftsman</span>
              </div>
              <div id="founder-stat-2">
                <span className="block font-mono text-[10px] text-brand-gray uppercase tracking-wider">FOCUS_AREAS</span>
                <span className="block text-sm font-semibold text-brand-dark mt-1">SaaS, Clean Code &amp; Design</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
