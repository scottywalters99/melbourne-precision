import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  CheckCircle2, 
  Paintbrush, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Terminal as TerminalIcon,
  Activity
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- 1. GLOBAL UI ELEMENTS ---

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.05]">
    <svg width="100%" height="100%">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out flex items-center px-6 py-3 rounded-full border border-black/10 ${
      isScrolled ? 'bg-[#F5F3EE]/80 backdrop-blur-xl w-[90%] md:w-[600px]' : 'bg-transparent w-[95%]'
    }`}>
      <span className="font-['Space_Grotesk'] font-bold tracking-tighter text-black text-sm md:text-lg mr-auto">
        MELBOURNE PRECISION
      </span>
      <button className="bg-[#E63B2E] text-white px-5 py-2 rounded-full font-['Space_Grotesk'] font-bold text-[10px] md:text-xs uppercase tracking-tighter overflow-hidden relative group">
        <span className="relative z-10">Get My Estimate</span>
        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </button>
    </nav>
  );
};

// --- 2. SECTIONS ---

const Hero = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-line", { y: 100, opacity: 0, stagger: 0.2, duration: 1, ease: "power4.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100dvh] w-full bg-[#111111] overflow-hidden flex flex-col justify-end p-8 md:p-24">
      <img 
        src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2000" 
        className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
        alt="Industrial Concrete"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent" />
      <div className="relative z-10 max-w-6xl">
        <h1 className="hero-line font-['Space_Grotesk'] text-[#F5F3EE] text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85]">
          COMMAND THE
        </h1>
        <h2 className="hero-line font-['DM_Serif_Display'] italic text-[#E63B2E] text-7xl md:text-[16rem] leading-[0.75] mb-8">
          Finish.
        </h2>
        <p className="hero-line font-['Space_Mono'] text-[#E8E4DD] max-w-sm text-[10px] md:text-xs mb-10 uppercase tracking-[0.2em] opacity-60">
          Melbourne's precision painting agency. Professional systems. Zero drama. High-density quality.
        </p>
        <button className="hero-line group bg-[#F5F3EE] text-black px-10 py-5 rounded-full font-['Space_Grotesk'] font-black text-lg uppercase tracking-tighter flex items-center gap-4 hover:scale-[1.03] transition-transform duration-300">
          Get My Estimate <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>
    </section>
  );
};

const ZeroDramaDiagnostic = () => {
  const [activeScan, setActiveScan] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setActiveScan((prev) => (prev + 1) % 4), 2000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { label: "CONTRACTOR_FLAKINESS", status: "NEUTRALIZED", icon: <Clock size={16}/> },
    { label: "HIDDEN_SURCHARGE_LOGIC", status: "DELETED", icon: <ShieldCheck size={16}/> },
    { label: "SITE_CLEANLINESS_PROTOCOL", status: "ACTIVE", icon: <CheckCircle2 size={16}/> },
    { label: "COMMUNICATION_LATENCY", status: "0ms_TARGET", icon: <TerminalIcon size={16}/> }
  ];

  return (
    <section className="bg-[#E8E4DD] py-24 border-y border-black/10">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b-2 border-black pb-8">
          <div>
            <span className="font-['Space_Mono'] text-[#E63B2E] text-[10px] font-bold uppercase tracking-[0.2em]">Safety_Stability_Security</span>
            <h2 className="font-['Space_Grotesk'] text-5xl md:text-7xl font-black uppercase tracking-tighter mt-2">Zero Drama.</h2>
          </div>
          <div className="mt-6 md:mt-0 bg-black text-[#F5F3EE] p-4 rounded-xl font-['Space_Mono'] text-[10px] uppercase">
            Status: <span className="text-green-500 underline underline-offset-4 animate-pulse">Operational</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className={`p-6 rounded-2xl border-2 transition-all duration-500 flex items-center justify-between ${activeScan === i ? 'border-[#E63B2E] bg-white scale-[1.02] shadow-xl' : 'border-black/5 bg-[#F5F3EE]/50'}`}>
              <div className="flex items-center gap-4">
                <div className={`${activeScan === i ? 'text-[#E63B2E]' : 'text-black/20'}`}>{item.icon}</div>
                <span className="font-['Space_Mono'] text-xs font-bold tracking-tight">{item.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-['Space_Mono'] text-[10px] ${activeScan === i ? 'text-black' : 'text-black/30'}`}>{item.status}</span>
                <div className={`w-2 h-2 rounded-full ${activeScan === i ? 'bg-[#E63B2E] animate-ping' : 'bg-black/10'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EstimateTerminal = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: "", scope: "", contact: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { label: "IDENTIFY_ENTITY", placeholder: "Name or Company...", key: "name" },
    { label: "DEFINE_SCOPE", placeholder: "Interior, Exterior, Full Site?", key: "scope" },
    { label: "COMMUNICATION_UPLINK", placeholder: "Email or Phone...", key: "contact" }
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (step < steps.length - 1) setStep(step + 1);
    else {
      setIsSubmitting(true);
      setTimeout(() => setIsSubmitting(false), 3000);
    }
  };

  return (
    <section className="bg-[#111111] py-32 px-8 flex justify-center">
      <div className="w-full max-w-3xl bg-[#1A1A1A] border-t-4 border-[#E63B2E] p-8 md:p-12 shadow-2xl rounded-b-[2rem]">
        <div className="flex items-center gap-2 mb-8 opacity-50">
          <TerminalIcon size={14} className="text-[#E63B2E]" />
          <span className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#F5F3EE]">ESTIMATE_PROTOCOL_v4.0</span>
        </div>
        {!isSubmitting ? (
          <form onSubmit={handleNext}>
            <div className="mb-4">
              <label className="font-['Space_Mono'] text-[#E63B2E] text-xs block mb-4">&gt; {steps[step].label}</label>
              <input 
                autoFocus
                className="w-full bg-transparent border-b border-white/10 py-4 font-['Space_Grotesk'] text-3xl md:text-5xl text-[#F5F3EE] outline-none focus:border-[#E63B2E] transition-colors placeholder:text-white/5"
                placeholder={steps[step].placeholder}
                value={formData[steps[step].key]}
                onChange={(e) => setFormData({...formData, [steps[step].key]: e.target.value})}
              />
            </div>
            <div className="flex justify-between items-center mt-12">
              <div className="flex gap-2">
                {steps.map((_, i) => <div key={i} className={`h-1 w-8 transition-colors ${i <= step ? 'bg-[#E63B2E]' : 'bg-white/10'}`} />)}
              </div>
              <button className="group font-['Space_Mono'] text-[#E63B2E] text-[10px] uppercase flex items-center gap-2 tracking-widest">
                {step === steps.length - 1 ? "[EXECUTE_UPLINK]" : "[NEXT_STEP]"} 
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        ) : (
          <div className="py-20 text-center">
            <Activity className="mx-auto text-[#E63B2E] mb-6 animate-spin" />
            <h3 className="font-['Space_Grotesk'] text-[#F5F3EE] text-4xl uppercase font-black">Data Transmitted.</h3>
          </div>
        )}
      </div>
    </section>
  );
};

// --- 3. MAIN APP WRAPPER ---

export default function App() {
  return (
    <main className="bg-[#F5F3EE] selection:bg-[#E63B2E] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&family=DM+Serif+Display:ital@1&family=Space+Mono:wght@400;700&display=swap');
      `}</style>
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <ZeroDramaDiagnostic />
      <EstimateTerminal />
      <footer className="bg-[#111111] py-20 px-8 text-center border-t border-white/5">
        <p className="font-['Space_Mono'] text-[#F5F3EE]/30 text-[10px] uppercase tracking-[0.5em]">
          Melbourne Precision Painting © 2026 // Absolute Accuracy Required
        </p>
      </footer>
    </main>
  );
}
