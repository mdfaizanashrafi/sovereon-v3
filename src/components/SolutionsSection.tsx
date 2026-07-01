/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent } from 'react';
import { Cpu, Terminal, Layers, Send, ShieldCheck, Database, HelpCircle, CheckCircle2, History, Trash2, ArrowRight, Utensils, Pill, Dumbbell, QrCode, AlertCircle } from 'lucide-react';
import { Solution, ContactSubmission } from '../types';

export default function SolutionsSection() {
  const [selectedSolution, setSelectedSolution] = useState<string>('sol-1');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [apiConsoleLog, setApiConsoleLog] = useState<string[]>([]);
  const [isConsoleSimulating, setIsConsoleSimulating] = useState<boolean>(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formType, setFormType] = useState('sol-1');
  const [formMessage, setFormMessage] = useState('');

  // Refs for smooth scroll
  const detailRefs = {
    'sol-1': useRef<HTMLDivElement>(null),
    'sol-2': useRef<HTMLDivElement>(null),
    'sol-3': useRef<HTMLDivElement>(null),
  };

  const contactFormRef = useRef<HTMLDivElement>(null);

  const solutionsList: Solution[] = [
    {
      id: 'sol-1',
      frameId: 6,
      title: 'DynamicMenu',
      summary: 'SaaS for restaurants menu creation tool',
      description: 'A robust digital menu builder designed for modern gastronomy. Allows restaurant operators to instantly design, publish, and update beautiful, interactive menus with real-time QR code generation, simple custom styling, and instant checkout integration.',
      techSpecs: ['QR Scaling: Instant', 'Load Latency: < 15ms', 'Engine: Vector QR-Gen', 'Memory overhead: < 1MB']
    },
    {
      id: 'sol-2',
      frameId: 7,
      title: 'MedicOrder',
      summary: 'SaaS for Wholesale medicine orders',
      description: 'The definitive wholesale order-routing engine facilitating supply links between medicine stockists and independent vendors. Features secure client transaction records, bulk ordering capabilities, precise availability tracking, and integrated inventory alerts.',
      techSpecs: ['Orders/sec: 10,000+', 'Sync Latency: Real-time', 'Integrations: stockist ERP', 'Security: Zero-trust transactional']
    },
    {
      id: 'sol-3',
      frameId: 8,
      title: 'GymRat',
      summary: 'SaaS for nomadic training & fitness tracking',
      description: 'A global training-hub locator and session scheduler designed specifically for traveling fitness enthusiasts. Aggregates partner gym locations across the country, syncs workout logs, and secures streak retention no matter where you move.',
      techSpecs: ['Geo Radius: Country-wide', 'Sync Latency: Sub-second', 'Workouts tracked: Unlimited', 'Partner network: 2,500+ gyms']
    }
  ];

  // Load submissions from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('sovereon_submissions');
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse submissions', err);
      }
    }
    // Set initial console log welcome
    setApiConsoleLog([
      'SOVEREON SHELL v1.4.2 [SYSTEMS CONNECTED]',
      'READY FOR CONSULTATION API DISPATCH...',
      'REST_ENDPOINT: /api/v1/consultations',
      'STATUS: IDLE'
    ]);
  }, []);

  const handleSolutionSelect = (id: string) => {
    setSelectedSolution(id);
    // Smooth scroll to details
    const targetRef = detailRefs[id as keyof typeof detailRefs];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setIsConsoleSimulating(true);
    setFormError(null);

    const projectTitle = solutionsList.find(s => s.id === formType)?.title || (formType === 'build-for-me' ? 'BuildForMe' : 'General Inquiry');
    const subjectLine = `Sovereon Consultation: ${formCompany ? formCompany + ' - ' : ''}${projectTitle}`;

    const submissionPayload = {
      name: formName,
      email: formEmail,
      company: formCompany || 'Self-Employed',
      projectType: projectTitle,
      message: formMessage,
    };

    // Update Console with request transmission
    setApiConsoleLog(prev => [
      ...prev,
      `[HTTP CLIENT] >>> POST /api/contact HTTP/1.1`,
      `[HEADERS] Host: api.sovereon.io`,
      `[HEADERS] Content-Type: application/json`,
      `[PAYLOAD] ${JSON.stringify({
        name: formName,
        email: formEmail,
        subject: subjectLine,
        message: `Company: ${formCompany || 'Self-Employed'}\nProject: ${projectTitle}\n\n${formMessage}`
      }, null, 2)}`,
      `[HTTP CLIENT] Transmitting packets to serverless function...`
    ]);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          subject: subjectLine,
          message: `Company: ${formCompany || 'Self-Employed'}\nProject: ${projectTitle}\n\n${formMessage}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server responded with an error status.');
      }

      const newSubmission: ContactSubmission = {
        id: `sov-tkt-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formName,
        email: formEmail,
        company: formCompany || 'Independent Partner',
        projectType: projectTitle,
        message: formMessage,
        timestamp: new Date().toLocaleTimeString(),
        status: 'pending'
      };

      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      localStorage.setItem('sovereon_submissions', JSON.stringify(updated));

      // Update console with server response
      setApiConsoleLog(prev => [
        ...prev,
        `[SERVER] <<< HTTP/1.1 200 OK`,
        `[SERVER] Connection: keep-alive`,
        `[SERVER] Date: ${new Date().toUTCString()}`,
        `[SERVER] Database (Neon PostgreSQL) -> Insert successfully committed (ID: ${newSubmission.id})`,
        `[SERVER] Cache (Upstash Redis) -> Submissions cache invalidated`,
        `[SERVER] Email Dispatch (Resend SDK) -> Consultation dispatch delivered successfully!`,
        `[STATUS] TRANSMISSION SUCCESSFUL.`
      ]);

      setIsConsoleSimulating(false);
      setFormSubmitted(true);

      // Reset form fields
      setFormName('');
      setFormEmail('');
      setFormCompany('');
      setFormMessage('');

      // Auto clear success state after 6 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 6000);

    } catch (err: any) {
      console.error('Failed to submit consultation form:', err);
      const errorMessage = err.message || 'An unexpected networking failure occurred.';
      
      setFormError(errorMessage);
      
      // Update console with failure
      setApiConsoleLog(prev => [
        ...prev,
        `[SERVER] <<< HTTP/1.1 500 Internal Server Error`,
        `[SERVER] Error logs: ${errorMessage}`,
        `[STATUS] TRANSMISSION FAILED.`
      ]);
      
      setIsConsoleSimulating(false);
    }
  };

  const deleteSubmission = (id: string) => {
    const filtered = submissions.filter(s => s.id !== id);
    setSubmissions(filtered);
    localStorage.setItem('sovereon_submissions', JSON.stringify(filtered));
  };

  // Scroll to contact form
  const scrollToContactForm = () => {
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full" id="solutions-view-container">
      {/* SECTION TITLE & DESCRIPTION IN SQUARE BOXES */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-8 text-center">
        <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-4">
          <Terminal className="h-3.5 w-3.5 animate-pulse" />
          <span>Engineering Systems</span>
        </div>
        
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">
          SOLUTIONS &amp; ENGINEERING
        </h1>
        
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-brand-gray/90 sm:text-lg font-medium">
          DESCRIBE THE SOLUTION AND ENGINEERING IN SQUARE BOXES
        </p>
        
        <div className="mx-auto mt-4 h-[2px] w-24 bg-brand-orange"></div>

        {/* THREE SQUARE BOXES BENTO-GRID (FRAMES 6 TO 8) */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
          {solutionsList.map((sol) => (
            <button
              key={sol.id}
              onClick={() => handleSolutionSelect(sol.id)}
              className={`aspect-square w-full rounded-2xl border p-6 text-left flex flex-col justify-between transition-all duration-300 relative group cursor-pointer ${
                selectedSolution === sol.id
                  ? 'border-brand-dark bg-white shadow-md scale-[1.02]'
                  : 'border-brand-border bg-white hover:border-brand-gray/50 hover:shadow-sm'
              }`}
              id={`solution-square-btn-${sol.id}`}
            >
              {/* Technical index indicator */}
              <div className="flex items-center justify-end">
                <span className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  selectedSolution === sol.id ? 'bg-brand-orange animate-pulse' : 'bg-brand-border'
                }`}></span>
              </div>

              {/* Box Title */}
              <div className="flex flex-col space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-brand-gray">
                  SOLUTION 0{sol.frameId - 5}
                </span>
                <h3 className="font-display text-lg font-extrabold tracking-tight text-brand-dark group-hover:text-brand-orange transition-colors">
                  {sol.title}
                </h3>
                <span className="font-mono text-[10px] text-brand-gray/80 uppercase tracking-tighter">
                  {sol.summary}
                </span>
              </div>

              {/* Bottom detail action */}
              <div className="flex items-center justify-between font-mono text-[10px] font-semibold text-brand-gray/60 group-hover:text-brand-dark">
                <span>[ ENGAGE SYSTEM_0{sol.frameId - 5} ]</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* DETAILED SOLUTIONS SECTION (FRAMES 9 TO 11 IN ZIGZAG TIMELINE) */}
      <section className="border-t border-brand-border bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 sm:px-8 space-y-24">
          
          {/* Frame 9: Solution 1 Details */}
          <div 
            ref={detailRefs['sol-1']}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center scroll-mt-28 transition-all duration-300 ${
              selectedSolution === 'sol-1' ? 'opacity-100' : 'opacity-65'
            }`}
          >
            {/* Square box representation (Left) */}
            <div className="md:col-span-5">
              <div className="aspect-square w-full rounded-2xl border-2 border-brand-dark bg-brand-bg p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 h-14 w-14 bg-brand-dark text-white flex items-center justify-center font-mono text-[10px] font-bold">
                  SF_9
                </div>
                
                <div className="flex flex-col space-y-3.5 flex-1 justify-center">
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-2">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-4 w-4 text-brand-orange animate-pulse" />
                      <span className="font-mono text-[9px] font-extrabold text-brand-dark tracking-tighter">DYNAMIC_MENU // STABLE</span>
                    </div>
                    <span className="text-[7px] font-mono bg-brand-orange/10 text-brand-orange px-1.5 py-0.5 rounded font-bold">QR_ENABLED</span>
                  </div>
                  
                  {/* Mock Menu Build */}
                  <div className="space-y-1.5 bg-white/80 p-2.5 rounded-lg border border-brand-border/60">
                    <div className="flex justify-between items-center text-[8px] font-bold text-brand-dark">
                      <span>🍽️ Grilled Truffle Salmon</span>
                      <span className="text-brand-orange font-mono">₹24.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] font-bold text-brand-dark">
                      <span>🍸 Smoked Rosemary Old Fashioned</span>
                      <span className="text-brand-orange font-mono">₹14.00</span>
                    </div>
                    <div className="h-[1px] w-full bg-brand-border/30 my-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[7px] text-brand-gray font-mono">SCAN TO VIEW LIVE</span>
                      <div className="h-6 w-6 bg-brand-dark rounded p-0.5 flex items-center justify-center">
                        <QrCode className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col pt-2 border-t border-brand-border/40">
                  <span className="font-mono text-[9px] uppercase text-brand-gray tracking-widest">Digital Gastronomy</span>
                  <span className="font-display text-lg font-black">DynamicMenu</span>
                </div>
              </div>
            </div>

            {/* Description Text (Right) */}
            <div className="md:col-span-7 flex flex-col space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">
                DYNAMICMENU CAPABILITIES
              </span>
              <h3 className="font-display text-2xl font-black tracking-tight text-brand-dark">
                DynamicMenu Platform Architecture
              </h3>
              <p className="text-sm leading-relaxed text-brand-gray">
                {solutionsList[0].description}
              </p>
              
              {/* Custom specs */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border/60">
                {solutionsList[0].techSpecs.map(spec => (
                  <div key={spec} className="flex flex-col">
                    <span className="font-mono text-[10px] text-brand-gray uppercase tracking-tighter">SPECIFICATION</span>
                    <span className="font-mono text-xs font-semibold text-brand-dark">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Frame 10: Solution 2 Details */}
          <div 
            ref={detailRefs['sol-2']}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center scroll-mt-28 transition-all duration-300 ${
              selectedSolution === 'sol-2' ? 'opacity-100' : 'opacity-65'
            }`}
          >
            {/* Description Text (Left - Zigzag order) */}
            <div className="md:col-span-7 md:order-1 flex flex-col space-y-4 md:text-right">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">
                MEDICORDER SYSTEMS
              </span>
              <h3 className="font-display text-2xl font-black tracking-tight text-brand-dark">
                MedicOrder Wholesale Logistics Engine
              </h3>
              <p className="text-sm leading-relaxed text-brand-gray">
                {solutionsList[1].description}
              </p>
              
              {/* Custom specs */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border/60 md:justify-items-end">
                {solutionsList[1].techSpecs.map(spec => (
                  <div key={spec} className="flex flex-col md:items-end">
                    <span className="font-mono text-[10px] text-brand-gray uppercase tracking-tighter">LOGISTICS SPEC</span>
                    <span className="font-mono text-xs font-semibold text-brand-dark">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Square box representation (Right) */}
            <div className="md:col-span-5 md:order-2">
              <div className="aspect-square w-full rounded-2xl border-2 border-brand-dark bg-brand-bg p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 h-14 w-14 bg-brand-dark text-white flex items-center justify-center font-mono text-[10px] font-bold">
                  SF_10
                </div>
                
                <div className="flex flex-col space-y-3.5 flex-1 justify-center">
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-2">
                    <div className="flex items-center space-x-2">
                      <Pill className="h-4 w-4 text-brand-orange" />
                      <span className="font-mono text-[9px] font-extrabold text-brand-dark tracking-tighter">MEDIC_ORDER // ROUTE</span>
                    </div>
                    <span className="text-[7px] font-mono bg-dark/10 text-brand-dark px-1.5 py-0.5 border border-brand-border/40 rounded font-bold">VERIFIED_LOG</span>
                  </div>
                  
                  {/* Logistics routing visualization */}
                  <div className="bg-white/80 p-2.5 rounded-lg border border-brand-border/60 space-y-1.5 font-mono text-[7px]">
                    <div className="flex items-center justify-between text-brand-dark font-semibold">
                      <span>STK_01 (Stockist Hub)</span>
                      <span className="text-emerald-600 font-bold">● ACTIVE</span>
                    </div>
                    <div className="flex items-center space-x-1 py-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-ping"></div>
                      <div className="h-[1px] flex-1 bg-brand-orange/40 border-dashed border-t"></div>
                      <span className="text-[6px] text-brand-gray">ROUTING ORDER_#4829</span>
                      <div className="h-[1px] flex-1 bg-brand-orange/40 border-dashed border-t"></div>
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-dark"></div>
                    </div>
                    <div className="flex items-center justify-between text-brand-gray">
                      <span>VND_99 (Vendor Pharmacy)</span>
                      <span className="text-brand-dark font-bold">EST_ETA // 14 MIN</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col pt-2 border-t border-brand-border/40">
                  <span className="font-mono text-[9px] uppercase text-brand-gray tracking-widest">Supply Chain</span>
                  <span className="font-display text-lg font-black">MedicOrder</span>
                </div>
              </div>
            </div>
          </div>

          {/* Frame 11: Solution 3 Details */}
          <div 
            ref={detailRefs['sol-3']}
            className={`grid grid-cols-1 md:grid-cols-12 gap-8 items-center scroll-mt-28 transition-all duration-300 ${
              selectedSolution === 'sol-3' ? 'opacity-100' : 'opacity-65'
            }`}
          >
            {/* Square box representation (Left) */}
            <div className="md:col-span-5">
              <div className="aspect-square w-full rounded-2xl border-2 border-brand-dark bg-brand-bg p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 h-14 w-14 bg-brand-dark text-white flex items-center justify-center font-mono text-[10px] font-bold">
                  SF_11
                </div>
                
                <div className="flex flex-col space-y-3.5 flex-1 justify-center">
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-2">
                    <div className="flex items-center space-x-2">
                      <Dumbbell className="h-4 w-4 text-brand-orange" />
                      <span className="font-mono text-[9px] font-extrabold text-brand-dark tracking-tighter">GYM_RAT // NOMAD</span>
                    </div>
                    <span className="text-[7px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">36-DAY STREAK</span>
                  </div>
                  
                  {/* Workout tracking & multi-gym sync */}
                  <div className="bg-white/80 p-2.5 rounded-lg border border-brand-border/60 space-y-1.5">
                    <div className="flex justify-between items-center text-[8px] text-brand-dark font-bold">
                      <span>🏋️ Back Squats</span>
                      <span className="font-mono text-brand-gray text-[7px]">5x5 @ 120kg</span>
                    </div>
                    <div className="flex justify-between items-center text-[8px] text-brand-dark font-bold">
                      <span>💪 Weighted Pullups</span>
                      <span className="font-mono text-brand-gray text-[7px]">4x8 @ +20kg</span>
                    </div>
                    <div className="h-[1px] w-full bg-brand-border/30 my-1"></div>
                    <div className="flex justify-between items-center text-[7px] font-mono">
                      <span className="text-brand-gray">GPS SYNC // BTM 2nd Stage</span>
                      <span className="text-brand-orange font-bold">CONNECTED</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col pt-2 border-t border-brand-border/40">
                  <span className="font-mono text-[9px] uppercase text-brand-gray tracking-widest">Nomadic Fitness</span>
                  <span className="font-display text-lg font-black">GymRat</span>
                </div>
              </div>
            </div>

            {/* Description Text (Right) */}
            <div className="md:col-span-7 flex flex-col space-y-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-orange">
                GYMRAT NETWORK
              </span>
              <h3 className="font-display text-2xl font-black tracking-tight text-brand-dark">
                GymRat Borderless Fitness Platform
              </h3>
              <p className="text-sm leading-relaxed text-brand-gray">
                {solutionsList[2].description}
              </p>
              
              {/* Custom specs */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-border/60">
                {solutionsList[2].techSpecs.map(spec => (
                  <div key={spec} className="flex flex-col">
                    <span className="font-mono text-[10px] text-brand-gray uppercase tracking-tighter">TRACKER SPEC</span>
                    <span className="font-mono text-xs font-semibold text-brand-dark">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* GET IN TOUCH CONTACT FORM (IMAGE 3 FOOTER FORM) */}
      <section 
        ref={contactFormRef}
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 border-t border-brand-border scroll-mt-24" 
        id="contact-form-section"
      >
        <div className="text-center mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-orange">Initiate Session</span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-dark mt-1">
            GET IN TOUCH CONTACT FORM
          </h2>
          <p className="text-sm text-brand-gray mt-2 max-w-lg mx-auto font-medium">
            Deploy your requirements directly to our consulting team via secure zero-knowledge endpoints.
          </p>
        </div>

        {/* Dual Column Form Layout with integrated API developer log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          
          {/* Left Column: Form itself */}
          <div className="lg:col-span-7 bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm">
            
            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="font-display text-xl font-bold text-brand-dark">TRANSMISSION COMMITTED</h3>
                <p className="text-xs text-brand-gray font-mono max-w-xs">
                  Your strategic consultation request has been written successfully to our database and cache nodes. Our expert systems team will review it within 2 hours.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="font-mono text-xs font-bold text-brand-orange hover:text-brand-orange-hover border-b border-brand-orange/30 pb-0.5"
                  >
                    [ INITIATE ANOTHER TRANSMISSION ]
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Name field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-name" className="font-mono text-[10px] uppercase font-bold text-brand-gray">Full Name *</label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Vivek Kumar"
                      className="w-full rounded-lg border border-brand-border bg-brand-bg/40 px-3.5 py-2.5 font-sans text-sm text-brand-dark focus:border-brand-dark focus:bg-white focus:outline-none transition-all placeholder:text-brand-gray/40"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-email" className="font-mono text-[10px] uppercase font-bold text-brand-gray">Email Address *</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. vivek@gmail.com"
                      className="w-full rounded-lg border border-brand-border bg-brand-bg/40 px-3.5 py-2.5 font-sans text-sm text-brand-dark focus:border-brand-dark focus:bg-white focus:outline-none transition-all placeholder:text-brand-gray/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Company field */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-company" className="font-mono text-[10px] uppercase font-bold text-brand-gray">Company Name</label>
                    <input
                      id="form-company"
                      type="text"
                      value={formCompany}
                      onChange={(e) => setFormCompany(e.target.value)}
                      placeholder="e.g. Starfleet Command"
                      className="w-full rounded-lg border border-brand-border bg-brand-bg/40 px-3.5 py-2.5 font-sans text-sm text-brand-dark focus:border-brand-dark focus:bg-white focus:outline-none transition-all placeholder:text-brand-gray/40"
                    />
                  </div>

                  {/* Solution select */}
                  <div className="flex flex-col space-y-1.5">
                    <label htmlFor="form-type" className="font-mono text-[10px] uppercase font-bold text-brand-gray">Solution Interest</label>
                    <select
                      id="form-type"
                      value={formType}
                      onChange={(e) => setFormType(e.target.value)}
                      className="w-full rounded-lg border border-brand-border bg-brand-bg/40 px-3.5 py-2.5 font-mono text-xs text-brand-dark focus:border-brand-dark focus:bg-white focus:outline-none transition-all cursor-pointer"
                    >
                      <option value="sol-1">DynamicMenu</option>
                      <option value="sol-2">MedicOrder</option>
                      <option value="sol-3">GymRat</option>
                      <option value="build-for-me">BuildForMe</option>
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="form-message" className="font-mono text-[10px] uppercase font-bold text-brand-gray">Operational Requirements / Message *</label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Describe your current software limits, latency issues, or custom infrastructure specifications..."
                    className="w-full rounded-lg border border-brand-border bg-brand-bg/40 px-3.5 py-2.5 font-sans text-sm text-brand-dark focus:border-brand-dark focus:bg-white focus:outline-none transition-all placeholder:text-brand-gray/40 resize-none"
                  />
                </div>

                {formError && (
                  <div className="flex items-start space-x-2 rounded-lg border border-red-200 bg-red-50 p-3.5 text-xs text-red-600 font-mono animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold uppercase block mb-1">TRANSMISSION ERROR</span>
                      <p className="leading-relaxed">{formError}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isConsoleSimulating}
                  className="w-full group flex items-center justify-center space-x-2 rounded-lg border border-brand-dark bg-brand-dark py-3 font-display text-sm font-semibold text-brand-bg hover:bg-transparent hover:text-brand-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow"
                >
                  {isConsoleSimulating ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-brand-gray border-t-brand-orange animate-spin"></span>
                      <span>TRANSMITTING BUNDLE...</span>
                    </>
                  ) : (
                    <>
                      <span>TRANSMIT REQ BUNDLE</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Live API Request Console */}
          <div className="lg:col-span-5 flex flex-col h-[400px] lg:h-auto border border-brand-border rounded-2xl overflow-hidden bg-brand-dark text-emerald-400 font-mono text-[10px] leading-relaxed relative">
            <div className="bg-brand-charcoal px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
              <span className="text-zinc-400 font-bold tracking-tight uppercase select-none flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span>REST /api/v1/consultations Console</span>
              </span>
              <span className="text-[9px] text-zinc-500 select-none">PORT: 3000 // HOST_UP</span>
            </div>

            {/* Scrollable logs area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text" id="api-console-logs">
              {apiConsoleLog.map((log, i) => {
                const isHeader = log.includes('[HTTP CLIENT]') || log.includes('[SERVER]');
                const isSuccess = log.includes('SUCCESSFUL') || log.includes('201 Created');
                let color = 'text-emerald-400/90';
                if (isHeader) color = 'text-zinc-400 font-bold';
                else if (isSuccess) color = 'text-amber-500 font-extrabold';
                else if (log.includes('Insert successfully') || log.includes('Resend Zoho')) color = 'text-sky-400';

                return (
                  <pre key={i} className={`whitespace-pre-wrap break-all ${color}`}>
                    {log}
                  </pre>
                );
              })}
              {isConsoleSimulating && (
                <div className="animate-pulse text-zinc-500 select-none">
                  [COMPUTING HANDSHAKES... TRANSMITTING PACKETS]
                </div>
              )}
            </div>
            
            {/* Console action overlay */}
            <div className="p-3 bg-brand-charcoal/80 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-zinc-500 text-[9px]">CLERK_OAUTH_INTEGRATION = TRUE</span>
              <button 
                onClick={() => setApiConsoleLog([
                  'SOVEREON SHELL REBOOTED.',
                  'REST_ENDPOINT: /api/v1/consultations',
                  'STATUS: READY'
                ])}
                className="text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 rounded px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider"
              >
                Clear Log
              </button>
            </div>
          </div>
        </div>

        {/* PERSISTENT TICKETS LOGS (Durable Cloud / Local Storage Client Panel) */}
        {submissions.length > 0 && (
          <div className="mt-16 max-w-5xl mx-auto border border-brand-border bg-white rounded-2xl p-6 shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <History className="h-4.5 w-4.5 text-brand-orange animate-spin-slow" />
                <h3 className="font-display font-black text-sm text-brand-dark tracking-tight">
                  SOVEREON SYSTEM TICKETS (LOCAL INSTANCE WORKSPACE)
                </h3>
              </div>
              <button
                onClick={() => {
                  if (confirm('Delete all consultation tickets?')) {
                    setSubmissions([]);
                    localStorage.removeItem('sovereon_submissions');
                  }
                }}
                className="flex items-center space-x-1 text-[10px] font-bold uppercase text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Wipe Database Cache</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submissions.map((ticket) => (
                <div key={ticket.id} className="border border-brand-border/80 rounded-xl p-4 bg-brand-bg/25 relative group hover:border-brand-dark transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[9px] font-extrabold text-brand-orange uppercase bg-brand-orange/5 px-2 py-0.5 rounded border border-brand-orange/10">
                      {ticket.id}
                    </span>
                    <span className="font-mono text-[9px] text-brand-gray">
                      Time: {ticket.timestamp}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-display text-xs font-bold text-brand-dark">{ticket.name}</span>
                      <span className="text-brand-gray/40 text-[10px]">•</span>
                      <span className="font-mono text-[9px] text-brand-gray uppercase tracking-tighter">{ticket.company}</span>
                    </div>
                    <div className="font-mono text-[9px] text-brand-gray uppercase">
                      Interest: <span className="font-bold text-brand-dark">{ticket.projectType}</span>
                    </div>
                  </div>

                  <p className="text-xs text-brand-gray leading-relaxed border-t border-brand-border/40 pt-2 font-medium">
                    {ticket.message}
                  </p>

                  <button
                    onClick={() => deleteSubmission(ticket.id)}
                    className="absolute bottom-4 right-4 text-brand-gray hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete record"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
