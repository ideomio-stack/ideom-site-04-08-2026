import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  ArrowRight, Zap, Menu, X, Lock, Mail, CheckCircle2
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

// --- Mock Data for Benchmarks ---

const WINNERS_DATA = [
  { name: 'Top 1%', spend: 65 },
  { name: 'Next 9%', spend: 25 },
  { name: 'Remaining 90%', spend: 10 },
];

const PORTFOLIO_LOGIC_DATA = [
  { month: 'Sep', winners: 2, testing: 10 },
  { month: 'Oct', winners: 3, testing: 15 },
  { month: 'Nov', winners: 5, testing: 25 },
  { month: 'Dec', winners: 7, testing: 40 },
  { month: 'Jan', winners: 4, testing: 30 },
];

const VISUAL_STYLES = [
  { name: 'UGC Style', value: 45 },
  { name: 'High-Prod', value: 25 },
  { name: 'Motion Graphics', value: 18 },
  { name: 'Static Design', value: 12 },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center">
            <Zap className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-2xl tracking-tighter uppercase italic font-serif">Ideom</span>
        </div>
        
        <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#" className="hover:line-through transition-all">Benchmarks</a>
          <a href="#" className="hover:line-through transition-all">Methodology</a>
          <a href="#" className="hover:line-through transition-all">Case Studies</a>
          <button className="bg-black text-white px-6 py-3 hover:bg-white hover:text-black border-2 border-black transition-all">
            Get the Report
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b-2 border-black p-8 flex flex-col gap-6 text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <a href="#">Benchmarks</a>
            <a href="#">Methodology</a>
            <a href="#">Case Studies</a>
            <button className="bg-black text-white py-4">Get the Report</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle, number }: { title: string, subtitle?: string, number: string }) => (
  <div className="mb-20 border-l-[6px] border-black pl-10">
    <div className="flex items-baseline gap-6 mb-6">
      <span className="font-mono text-6xl font-black leading-none">{number}</span>
      <h2 className="font-serif italic text-5xl md:text-7xl tracking-tighter text-black leading-none">{title}</h2>
    </div>
    {subtitle && <p className="text-black/80 max-w-4xl text-xl font-sans leading-relaxed">{subtitle}</p>}
  </div>
);

const ChartGate = ({ isUnlocked, onUnlock, children, title, description }: { 
  isUnlocked: boolean, 
  onUnlock: (email: string) => void, 
  children: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) onUnlock(email);
  };

  return (
    <div className="relative">
      <div className="mb-8">
        <h3 className="font-black text-base uppercase tracking-widest mb-2">{title}</h3>
        <p className="text-[11px] text-black/60 uppercase font-bold tracking-[0.15em]">{description}</p>
      </div>
      
      <div className={cn(
        "bg-white border-4 border-black p-10 transition-all duration-1000",
        !isUnlocked && "blur-2xl select-none pointer-events-none opacity-20"
      )}>
        <div className="h-[400px] w-full">
          {children}
        </div>
      </div>

      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black text-white p-10 max-w-md w-full shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] border-2 border-white/10"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-16 h-16 bg-white flex items-center justify-center">
                <Lock className="text-black w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif italic text-3xl">Unlock Benchmarks</h4>
                <p className="text-[10px] opacity-60 leading-relaxed uppercase tracking-[0.2em] font-black">
                  Access the full 2026 dataset and performance metrics.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border-2 border-white/20 px-12 py-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-white/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] text-xs hover:invert transition-all flex items-center justify-center gap-3">
                  Reveal Data <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ideom_unlocked_2026');
    if (saved) setIsUnlocked(true);
  }, []);

  const handleUnlock = (email: string) => {
    setIsUnlocked(true);
    localStorage.setItem('ideom_unlocked_2026', 'true');
    console.log('Unlocked by:', email);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <header className="pt-48 pb-32 px-6 max-w-7xl mx-auto border-b-[4px] border-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6 mb-12">
            <span className="bg-black text-white text-[11px] font-black px-4 py-1.5 uppercase tracking-[0.3em]">2026 Edition</span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30">Creative Intelligence</span>
          </div>
          
          <h1 className="text-[16vw] md:text-[12vw] font-serif italic leading-[0.75] tracking-tighter mb-16">
            Creative <br />
            <span className="bg-black text-white px-6 not-italic">Benchmarks</span> <br />
            2026.
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-10">
              <p className="text-3xl md:text-5xl font-serif italic leading-[1.1] text-black/90">
                "Advertising is described as a science of prediction."
              </p>
              <p className="text-xl leading-relaxed opacity-70 font-medium">
                Marketers often try to isolate and optimize as many variables as possible to guarantee success. But in practice, most ads are forgettable. This report examines why that’s normal and how creative strategy should actually work.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'Ads Analyzed', value: '550,000+' },
                { label: 'Total Spend', value: '$1.3 Billion' },
                { label: 'Advertisers', value: '6,000+' },
                { label: 'Hit Rate', value: '5%' },
              ].map((stat, i) => (
                <div key={i} className="p-8 border-2 border-black bg-black/5 flex flex-col justify-between aspect-square">
                  <div className="text-5xl font-black tracking-tighter">{stat.value}</div>
                  <div className="text-[11px] font-black uppercase tracking-[0.2em] opacity-40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-48 space-y-64">
        
        {/* Section 1: Winners are Rare */}
        <section>
          <SectionHeader 
            number="01"
            title="Winning ads are rare"
            subtitle="Only a small share of ads — roughly 5% — spend at least 10x their account median. Low hit rates are not a sign of weak creative; they are a statistical feature of performance advertising."
          />
          
          <div className="grid lg:grid-cols-3 gap-20">
            <div className="lg:col-span-2">
              <ChartGate 
                isUnlocked={isUnlocked} 
                onUnlock={handleUnlock}
                title="Spend Concentration" 
                description="Distribution of spend across creative performance tiers"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WINNERS_DATA} layout="vertical">
                    <CartesianGrid strokeDasharray="0" horizontal={false} stroke="#000" strokeOpacity={0.2} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={120} axisLine={false} tickLine={false} className="text-[11px] font-black uppercase" />
                    <Tooltip 
                      cursor={{ fill: '#000', fillOpacity: 0.05 }}
                      contentStyle={{ backgroundColor: '#000', border: 'none', color: '#fff', fontSize: '11px', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="spend" fill="#000" barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartGate>
            </div>

            <div className="space-y-12 py-10">
              <div className="p-10 bg-black text-white shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]">
                <h4 className="font-black uppercase text-[11px] tracking-[0.2em] mb-6 opacity-40">The Core Thesis</h4>
                <p className="font-serif italic text-2xl leading-tight">
                  "In a system where big wins are uncommon but crucial, taking more chances matters more than being certain about any individual ad."
                </p>
              </div>
              <div className="space-y-6 border-t-2 border-black pt-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Probability over Intuition</p>
                <p className="text-lg leading-relaxed opacity-70">
                  Roughly half of all ads receive very minimal spend. Meanwhile, 6% of ads are responsible for the majority of spend in any given account.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Scale and Volume */}
        <section className="bg-black text-white -mx-6 px-6 py-48">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              number="02"
              title="Volume is a structural advantage"
              subtitle="Larger advertisers surface more winning ads because they introduce more variation into the system. Scale changes frequency, not fundamentals."
            />
            
            <div className="grid lg:grid-cols-2 gap-32">
              <div className="space-y-16">
                <div className="h-[450px] border-2 border-white/20 p-10 bg-white/5">
                  <ChartGate 
                    isUnlocked={isUnlocked} 
                    onUnlock={handleUnlock}
                    title="Testing Cadence vs. Breakout Ads" 
                    description="Monthly creative tests correlated with successful scaling"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={PORTFOLIO_LOGIC_DATA}>
                        <CartesianGrid strokeDasharray="0" vertical={false} stroke="#fff" strokeOpacity={0.1} />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-[11px] font-black" stroke="#fff" />
                        <YAxis axisLine={false} tickLine={false} className="text-[11px] font-black" stroke="#fff" />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', color: '#000', border: 'none', fontWeight: 'bold' }} />
                        <Area type="step" dataKey="testing" stroke="#fff" fill="#fff" fillOpacity={0.05} strokeWidth={2} />
                        <Area type="step" dataKey="winners" stroke="#fff" fill="#fff" fillOpacity={0.4} strokeWidth={4} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartGate>
                </div>
              </div>
              
              <div className="flex flex-col justify-center gap-12">
                <div className="border-l-4 border-white pl-10 space-y-6">
                  <h4 className="text-5xl md:text-6xl font-serif italic leading-none">"Volume creates opportunities."</h4>
                  <p className="text-white/60 text-xl leading-relaxed">
                    Stronger advertisers don't have sharper intuition; they have better testing cadences. They create enough ideas to give wins a chance to appear, and they notice when something starts to take off.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-10 border-2 border-white/20 hover:border-white transition-colors">
                    <div className="text-5xl font-black mb-2">10x</div>
                    <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 font-black">Account Median Spend</div>
                  </div>
                  <div className="p-10 border-2 border-white/20 hover:border-white transition-colors">
                    <div className="text-5xl font-black mb-2">550k</div>
                    <div className="text-[11px] uppercase tracking-[0.2em] opacity-40 font-black">Ads Analyzed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Anatomy of Winning Ads */}
        <section>
          <SectionHeader 
            number="03"
            title="The Anatomy of Winning Ads"
            subtitle="Not all ads have the same odds. Some formats, hooks, and types of assets surface winners more often than others."
          />
          
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <p className="text-2xl leading-relaxed opacity-80 font-medium">
                The strength of a creative strategist is in understanding and interpreting the patterns behind what does. We use two simple measures to describe these patterns.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: 'Hit Rate', desc: 'How frequently did this format become a winner?' },
                  { title: 'Spend Use Ratio', desc: 'When we use this format, how likely is it to get spend?' },
                ].map((item, i) => (
                  <div key={i} className="p-10 border-2 border-black flex items-start gap-8 hover:bg-black hover:text-white transition-all group">
                    <div className="w-12 h-12 bg-black text-white group-hover:bg-white group-hover:text-black flex items-center justify-center shrink-0 font-black text-xl transition-all">
                      {i + 1}
                    </div>
                    <div>
                      <h5 className="font-black uppercase text-sm tracking-[0.2em] mb-2">{item.title}</h5>
                      <p className="text-sm opacity-60 group-hover:opacity-80 transition-all">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-black/5 p-12 border-2 border-black">
              <ChartGate 
                isUnlocked={isUnlocked} 
                onUnlock={handleUnlock}
                title="Top Visual Archetypes" 
                description="Distribution of winning styles in 2026"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={VISUAL_STYLES}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={140}
                      paddingAngle={0}
                      dataKey="value"
                      stroke="none"
                    >
                      {VISUAL_STYLES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#000' : '#ccc'} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartGate>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="border-t-[8px] border-black pt-32 pb-64 text-center">
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-[0.85]">
              "Creative strategy is capacity planning."
            </h2>
            <p className="text-2xl md:text-3xl opacity-70 leading-relaxed max-w-4xl mx-auto">
              The advertisers who win out will not be the ones who eliminate failure. They will be the ones who make it survivable and routine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button className="bg-black text-white px-16 py-8 font-black uppercase tracking-[0.3em] hover:invert transition-all w-full sm:w-auto text-sm">
                Download Full PDF
              </button>
              <button className="border-4 border-black px-16 py-8 font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all w-full sm:w-auto text-sm">
                Book Strategy Call
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-48 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white flex items-center justify-center">
                <Zap className="text-black w-8 h-8" />
              </div>
              <span className="font-bold text-3xl tracking-tighter uppercase italic font-serif">Ideom</span>
            </div>
            <p className="text-white/40 max-w-md text-lg leading-relaxed">
              The creative analytics infrastructure for high-growth performance marketing teams. Built for the future of advertising.
            </p>
            <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.3em] opacity-30">
              <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
              <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-20">Resources</h4>
              <ul className="space-y-6 text-sm font-black uppercase tracking-[0.2em]">
                <li><a href="#" className="hover:line-through">Benchmarks</a></li>
                <li><a href="#" className="hover:line-through">Methodology</a></li>
                <li><a href="#" className="hover:line-through">Blog</a></li>
              </ul>
            </div>
            <div className="space-y-10">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-20">Company</h4>
              <ul className="space-y-6 text-sm font-black uppercase tracking-[0.2em]">
                <li><a href="#" className="hover:line-through">About</a></li>
                <li><a href="#" className="hover:line-through">Careers</a></li>
                <li><a href="#" className="hover:line-through">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-48 pt-16 border-t border-white/5 text-[11px] font-black uppercase tracking-[0.3em] opacity-10">
          © 2026 Ideom Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
