import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import { 
  Plus, 
  ArrowRight, 
  ArrowLeft,
  Zap, 
  Layout, 
  Code, 
  Globe, 
  Lightbulb,
  TrendingUp,
  Search
} from "lucide-react";
import { Link } from 'react-router-dom';

// --- Components ---

const CountUp = ({ value, suffix = "%", className = "" }: { value: number; suffix?: string; className?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className={`font-sans font-bold leading-none tracking-tighter ${className}`}>
      <motion.span>{rounded}</motion.span><sup>{suffix}</sup>
    </span>
  );
};

const Marquee = ({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) => (
  <div className="flex overflow-hidden whitespace-nowrap py-12 border-y border-black/5 bg-[#F8F8F8]">
    <motion.div 
      initial={{ x: reverse ? "-50%" : 0 }}
      animate={{ x: reverse ? 0 : "-50%" }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex shrink-0"
    >
      {children}
      {children}
    </motion.div>
  </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 ${className}`}>
    <div className="container mx-auto px-6 max-w-6xl">
      {children}
    </div>
  </section>
);

export default function CaseStudyOxidelta() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "We chose IDEOM for our B2B website redesign, and results exceeded expectations. Their strategic web design team delivered a modern platform that perfectly showcases our infrastructure solutions. A fantastic design partnership from start to finish!",
      logo: "OXIDELTA"
    },
    {
      quote: "The intuitive user flow makes it effortless for visitors to explore our diverse offerings from intelligent photovoltaic street lighting to smart urban furniture.",
      logo: "OXIDELTA"
    },
    {
      quote: "Positioned Oxidelta as a leader in modern infrastructure development, strengthening our reputation in smart urban solutions.",
      logo: "OXIDELTA"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5 md:px-12">
        <Link to="/" className="text-xl font-bold tracking-tighter">IDEOM</Link>
        <div className="flex items-center gap-8">
          <Link to="/work" className="text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-all flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Work
          </Link>
        </div>
      </nav>

      {/* --- HERO --- */}
      <header className="relative overflow-hidden bg-black text-white pt-56 pb-32 text-center">
        <div className="stripes pointer-events-none opacity-20">
          <span style={{ left: "8%" }}></span>
          <span style={{ left: "18%" }}></span>
          <span style={{ left: "35%" }}></span>
          <span style={{ left: "52%" }}></span>
          <span style={{ left: "67%" }}></span>
          <span style={{ left: "80%" }}></span>
          <span style={{ left: "92%" }}></span>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-[10rem] font-bold max-w-6xl mx-auto mb-10 tracking-tighter leading-[0.85] uppercase"
          >
            Leads <span className="font-serif italic lowercase font-normal text-white/40">up</span> 125%
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-col items-center"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium text-white/40 mb-6">Strategic Design for Oxidelta</p>
            <div className="flex items-center gap-8">
              <div className="text-sm font-bold tracking-widest text-white/60">OXIDELTA</div>
              <Plus className="text-white/20 w-4 h-4" />
              <div className="text-sm font-bold tracking-widest text-white">IDEOM</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- PERFORMANCE HIGHLIGHTS --- */}
      <Section className="bg-white">
        <div className="flex flex-col items-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-center mb-4 uppercase">Performance Highlights</h2>
          <p className="font-serif italic text-xl text-black/40">Measurable impact through strategic design</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Stat 1: Lead Volume */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-black/5 rounded-[3rem] p-12 shadow-sm"
          >
            <div className="mb-4">
              <CountUp value={23} suffix="%" className="text-7xl md:text-8xl" />
            </div>
            <p className="text-xs font-bold tracking-widest text-black/40 uppercase mb-12">Increase in Lead Volume</p>
            
            <div className="bg-[#F8F8F8] rounded-[2rem] p-10 relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-black/20">Lead Volume Trend</span>
              </div>
              
              <div className="h-48 relative">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] font-bold text-black/20 py-1">
                  <span>30%</span>
                  <span>20%</span>
                  <span>10%</span>
                  <span>1%</span>
                </div>
                
                {/* Grid Lines */}
                <div className="absolute left-10 right-0 top-0 bottom-0 flex flex-col justify-between py-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-black/5"></div>
                  ))}
                </div>

                {/* The Graph */}
                <svg className="absolute left-10 right-0 bottom-0 w-[calc(100%-2.5rem)] h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M0,95 C50,95 100,90 150,80 C200,65 250,30 300,25" 
                    fill="none" 
                    stroke="black" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  {/* Growth Number */}
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <foreignObject x="260" y="-10" width="80" height="40">
                      <div className="text-[16px] font-bold text-black flex items-center justify-center h-full">
                        <CountUp value={23} suffix="%" />
                      </div>
                    </foreignObject>
                    <circle cx="300" cy="25" r="6" fill="black" stroke="white" strokeWidth="2" />
                  </motion.g>
                </svg>

                {/* X-Axis Labels */}
                <div className="absolute left-10 right-0 -bottom-6 flex justify-between text-[8px] font-bold text-black/20">
                  <span>Q1</span>
                  <span>Q2</span>
                  <span>Q3</span>
                  <span>Q4</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stat 2: Revenue */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-black/5 rounded-[3rem] p-12 shadow-sm"
          >
            <div className="mb-4">
              <CountUp value={1192} suffix="%" className="text-7xl md:text-8xl" />
            </div>
            <p className="text-xs font-bold tracking-widest text-black/40 uppercase mb-12">Increase in Revenue</p>
            
            <div className="bg-[#F8F8F8] rounded-[2rem] p-10 relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <span className="text-[10px] font-bold tracking-widest uppercase text-black/20">Revenue Growth</span>
              </div>
              
              <div className="h-48 relative">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] font-bold text-black/20 py-1">
                  <span>1500%</span>
                  <span>1000%</span>
                  <span>500%</span>
                  <span>100%</span>
                </div>
                
                {/* Grid Lines */}
                <div className="absolute left-12 right-0 top-0 bottom-0 flex flex-col justify-between py-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-black/5"></div>
                  ))}
                </div>

                {/* Bar Chart with Trend */}
                <div className="absolute left-12 right-0 bottom-0 h-full flex items-end gap-1 px-4">
                  {[...Array(30)].map((_, i) => {
                    const height = 15 + (i * 2.5) + (Math.random() * 5);
                    return (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        transition={{ delay: i * 0.02 }}
                        className="flex-1 bg-black/10 rounded-t-sm"
                      />
                    );
                  })}
                </div>

                <svg className="absolute left-12 right-0 bottom-0 w-[calc(100%-3rem)] h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M0,85 L100,75 L200,50 L300,20" 
                    fill="none" 
                    stroke="black" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                  />
                  {/* Growth Number */}
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <foreignObject x="230" y="-20" width="100" height="40">
                      <div className="text-[16px] font-bold text-black flex items-center justify-center h-full">
                        <CountUp value={1192} suffix="%" />
                      </div>
                    </foreignObject>
                    <circle cx="300" cy="20" r="6" fill="black" stroke="white" strokeWidth="2" />
                  </motion.g>
                </svg>

                {/* X-Axis Labels */}
                <div className="absolute left-12 right-0 -bottom-6 flex justify-between text-[8px] font-bold text-black/20">
                  <span>MONTH 01</span>
                  <span>MONTH 04</span>
                  <span>MONTH 08</span>
                  <span>MONTH 12</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- SERVICES PROVIDED --- */}
      <div className="bg-[#F8F8F8] py-24 border-y border-black/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight uppercase">Services Provided</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: <Zap className="w-4 h-4" />, label: "Branding" },
              { icon: <Layout className="w-4 h-4" />, label: "UI/UX Design" },
              { icon: <Code className="w-4 h-4" />, label: "Development" },
              { icon: <Globe className="w-4 h-4" />, label: "Strategic Consulting" },
              { icon: <Lightbulb className="w-4 h-4" />, label: "Innovation Strategy" }
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-black/5 rounded-full px-8 py-4 font-bold text-[10px] tracking-[0.2em] uppercase shadow-sm hover:shadow-md transition-all">
                {s.icon}
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BACKGROUND --- */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold tracking-tighter uppercase">Strategic Investment & Smart urban Solutions</h2>
            <p className="text-lg leading-relaxed text-black/60 font-medium">
              Oxidelta offers integrated consulting services for the development, implementation, and supervision of strategic investment projects, specializing in innovative solutions within PNDR and Structural Programs.
            </p>
            <div className="border-l-4 border-black pl-8 py-2">
               <p className="font-serif italic text-2xl text-black">
                "Enhancing modern infrastructure through intelligent design."
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#F8F8F8] rounded-[2.5rem] p-12 aspect-video flex items-center justify-center border border-black/5 shadow-inner group"
          >
            <div className="text-center group-hover:scale-110 transition-transform duration-700">
              <Globe className="w-16 h-16 mx-auto mb-6 text-black/10" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/20">Oxidelta Global Platform</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* --- BRAND EXPERIENCE --- */}
      <div className="overflow-hidden">
        <Marquee>
          {["SMART LIGHTING", "URBAN DESIGN", "PNDR PROJECTS", "INFRASTRUCTURE", "CONSULTING", "INNOVATION", "STRUCTURAL PROGRAMS"].map((b, i) => (
            <div key={i} className="text-[10px] font-bold text-black/10 tracking-[0.4em] uppercase mx-12">
              {b}
            </div>
          ))}
        </Marquee>
      </div>

      {/* --- OUR APPROACH --- */}
      <section className="relative bg-black text-white py-40 overflow-hidden">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-24 gap-y-12 opacity-[0.03] pointer-events-none select-none">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="text-[15rem] font-bold tracking-tighter text-white leading-none">IDEOM</span>
          ))}
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-6xl md:text-7xl font-bold text-center mb-32 tracking-tight uppercase">Our Approach</h2>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="flex flex-wrap items-center justify-center gap-12 mb-32"
          >
            {[
              { label: "AUDIT", icon: <Search className="w-5 h-5" /> },
              { label: "DESIGN", icon: <Layout className="w-5 h-5" /> },
              { label: "DEV", icon: <Code className="w-5 h-5" /> },
              { label: "SCALE", icon: <TrendingUp className="w-5 h-5" /> }
            ].map((step, i) => (
              <div key={i} className="flex items-center">
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 20 },
                    visible: { opacity: 1, scale: 1, y: 0 }
                  }}
                  className="w-56 h-56 rounded-full border border-white/10 flex flex-col items-center justify-center p-8 bg-white/5 text-center hover:bg-white/10 transition-colors group relative"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-32 h-32 rounded-full bg-white flex flex-col items-center justify-center text-black font-bold text-xs tracking-widest p-2 shadow-2xl"
                  >
                    {step.icon}
                    <span className="mt-3">{step.label}</span>
                  </motion.div>
                </motion.div>
                {i < 3 && (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <ArrowRight className="hidden lg:block mx-8 text-white/20" />
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>

          <p className="max-w-3xl mx-auto text-center text-2xl leading-relaxed text-white/40 font-serif italic">
            Crafting a clean, modern UI/UX design that aligned with Oxidelta’s innovative brand.
          </p>
        </div>
      </section>

      {/* --- RESULTS GRIDS --- */}
      <Section className="relative">
        <div className="max-w-3xl mx-auto text-center relative z-10 mb-24">
          <h2 className="text-6xl font-bold tracking-tighter mb-6 uppercase">Key Results</h2>
          <p className="font-serif italic text-xl text-black/40">Measurable impact through strategic digital transformation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { metric: "+125%", label: "Lead Generation", desc: "Converting more visitors into qualified leads." },
            { metric: "-58%", label: "Education Time", desc: "Allowing potential clients to easily understand solutions." },
            { metric: "+89%", label: "Market Positioning", desc: "Establishing Oxidelta as a leader in modern infrastructure." }
          ].map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-black/5 rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="text-4xl font-bold mb-6 tracking-tighter">{r.metric}</div>
              <div className="text-[10px] font-bold text-black/40 uppercase tracking-[0.3em] mb-6">{r.label}</div>
              <p className="text-sm text-black/60 leading-relaxed font-medium">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- TESTIMONIALS --- */}
      <Section className="bg-white">
        <div className="bg-black rounded-[4rem] overflow-hidden relative min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          
          <div className="relative z-20 p-20 md:p-32 max-w-4xl text-white">
            <div className="text-[10px] font-bold tracking-[0.5em] text-white/30 mb-16 uppercase">Client Vision</div>
            <motion.blockquote 
              key={activeTestimonial}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-16 text-white/90 italic font-serif"
            >
              "{testimonials[activeTestimonial].quote}"
            </motion.blockquote>
            <div className="flex items-center gap-8">
              <div className="w-12 h-[1px] bg-white/20" />
              <p className="text-sm font-bold tracking-widest text-white/40 uppercase">
                CEO @ Oxidelta
              </p>
            </div>
            
            <div className="flex gap-4 mt-16">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-1 transition-all duration-700 ${activeTestimonial === i ? 'bg-white w-12' : 'bg-white/20 w-8'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* --- CTA --- */}
      <section className="bg-black text-white py-64 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white opacity-[0.02] blur-[150px] translate-y-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-7xl md:text-[10rem] font-bold tracking-tighter mb-16 uppercase leading-none">
              Next Success?
            </h2>
            <Link 
              to="/" 
              className="inline-flex items-center gap-8 bg-white text-black px-20 py-10 rounded-full font-bold uppercase tracking-[0.4em] text-xs hover:bg-neutral-200 transition-all shadow-2xl group"
            >
              Hit the Damn Button <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 bg-white border-t border-black/5 text-center">
        <div className="text-5xl font-bold tracking-tighter mb-12 uppercase">IDEOM.</div>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 text-[10px] font-bold uppercase tracking-[0.5em] text-black/20">
          <span>© 2026 IDEOM</span>
          <span>EST. 2009</span>
          <span>BASED IN CANADA</span>
        </div>
      </footer>
    </div>
  );
}
