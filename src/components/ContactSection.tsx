/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, ShieldCheck, Clock, Layers } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      // Direct integration with our API endpoint (or secure simulated handler in client context)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message })
      });
      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden bg-brand-bg py-20 px-6 sm:px-8 border-b border-brand-border/40 tech-grid">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-brand-orange uppercase mb-6">
            <Mail className="h-3.5 w-3.5" />
            <span>HQ Dispatch // Systems Consultation</span>
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl">
            Contact Sovereon LLP
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-brand-gray/90 font-medium">
            Open an engineering ticket or schedule a dedicated systems architecture consultation with our team.
          </p>
        </div>
      </section>

      {/* CORE CONTACT INTERACTIVE MODULE */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Coordinates */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-brand-orange font-bold mb-1">
              // SYSTEMS DISPATCH OFFICE
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-dark">
              Bangalore Headquarters
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-brand-gray font-medium">
              We operate from Bangalore, India (the digital epicentre of Asia). Reach out to discuss multi-tenant SaaS products, secure order APIs, and workflow automations.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4 border border-brand-border/60 bg-white p-5 rounded-xl">
              <Phone className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h3 className="font-mono text-xs font-bold text-brand-dark uppercase tracking-wider">
                  TELEPHONE COORDINATES
                </h3>
                <p className="mt-1 font-display text-sm font-bold text-brand-dark">+91 7439368190</p>
                <p className="text-[10px] text-brand-gray font-medium uppercase mt-0.5">Architect-on-Call</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border border-brand-border/60 bg-white p-5 rounded-xl">
              <Mail className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h3 className="font-mono text-xs font-bold text-brand-dark uppercase tracking-wider">
                  EMAIL DISPATCH
                </h3>
                <p className="mt-1 font-display text-sm font-bold text-brand-dark">sovereon@sovereon.online</p>
                <p className="text-[10px] text-brand-gray font-medium uppercase mt-0.5">Standard Ticket Support</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 border border-brand-border/60 bg-white p-5 rounded-xl">
              <MapPin className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
              <div>
                <h3 className="font-mono text-xs font-bold text-brand-dark uppercase tracking-wider">
                  REGISTRATION ADDRESS
                </h3>
                <p className="mt-1 font-display text-xs font-bold text-brand-dark leading-relaxed">
                  Door No. 675, 13th Cross, 29th Main Road, BTM 2nd Stage, Bengaluru, Karnataka, India - 560076
                </p>
              </div>
            </div>
          </div>

          {/* Timings Block */}
          <div className="border border-brand-border/60 bg-brand-bg p-5 rounded-xl space-y-3 font-mono text-xs">
            <div className="flex items-center space-x-2 text-brand-dark font-bold">
              <Clock className="h-4 w-4 text-brand-orange" />
              <span>OFFICE HOURS</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-brand-gray">
              <span>MONDAY - SATURDAY</span>
              <span className="text-right text-brand-dark">09:00 AM - 07:00 PM IST</span>
              <span>SUNDAYS</span>
              <span className="text-right text-brand-orange">EMERGENCY TICKET ONLY</span>
            </div>
          </div>
        </div>

        {/* Dispatch Form */}
        <div className="lg:col-span-7 border border-brand-border/60 bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex items-center space-x-2.5 mb-6">
            <Layers className="h-5 w-5 text-brand-orange" />
            <h3 className="font-display text-lg font-bold text-brand-dark">
              Secure Consultation Form
            </h3>
          </div>

          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center space-y-3">
              <ShieldCheck className="h-10 w-10 text-green-500 mx-auto" />
              <h4 className="font-display text-base font-bold text-green-900">
                Ticket Staged Successfully
              </h4>
              <p className="text-xs text-green-700 leading-relaxed max-w-md mx-auto">
                Your consultation request has been successfully dispatched to <a href="https://mdfaizanashrafi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-brand-orange font-bold hover:underline">Md Faizan Ashrafi</a> and our systems team. We will review your technical specifications and contact you within 12 hours.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 font-mono text-xs text-brand-orange hover:underline font-bold"
              >
                DISPATCH ANOTHER DISPATCH
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="block font-mono text-[10px] uppercase font-bold text-brand-gray">
                    FULL NAME <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexander Pierce"
                    className="w-full h-10 rounded-lg border border-brand-border px-4 font-display text-xs font-semibold text-brand-dark focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="block font-mono text-[10px] uppercase font-bold text-brand-gray">
                    EMAIL ADDRESS <span className="text-brand-orange">*</span>
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@enterprise.com"
                    className="w-full h-10 rounded-lg border border-brand-border px-4 font-display text-xs font-semibold text-brand-dark focus:border-brand-dark focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-company" className="block font-mono text-[10px] uppercase font-bold text-brand-gray">
                  COMPANY NAME (OPTIONAL)
                </label>
                <input
                  id="form-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Enterprise Logistics Ltd"
                  className="w-full h-10 rounded-lg border border-brand-border px-4 font-display text-xs font-semibold text-brand-dark focus:border-brand-dark focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-message" className="block font-mono text-[10px] uppercase font-bold text-brand-gray">
                  SYSTEM SPECIFICATIONS <span className="text-brand-orange">*</span>
                </label>
                <textarea
                  id="form-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your application specifications, tenancy needs, active scale, and expected integrations..."
                  className="w-full rounded-lg border border-brand-border p-4 font-display text-xs font-semibold text-brand-dark focus:border-brand-dark focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {status === 'error' && (
                <p className="text-[10px] font-mono font-bold text-brand-orange">
                  // ERROR: PLEASE FILL OUT ALL REQUIRED FIELDS VALIDLY.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full h-11 inline-flex items-center justify-center rounded-lg bg-brand-dark text-white font-display text-xs font-bold uppercase tracking-wider hover:bg-brand-orange transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <span>DISPATCHING SECURITY TICKET...</span>
                ) : (
                  <span className="inline-flex items-center space-x-2">
                    <Send className="h-3.5 w-3.5" />
                    <span>DISPATCH TICKETING PROTOCOL</span>
                  </span>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
