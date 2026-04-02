import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight, Lock, Mail, Menu, X, ArrowUpRight, CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Mock Data for Charts ── */

const WINNERS_DATA = [
  { label: 'Top 1%', spend: 65 },
  { label: 'Next 9%', spend: 25 },
  { label: 'Remaining 90%', spend: 10 },
];

const PORTFOLIO_DATA = [
  { tier: 'Micro (<$10K)', losers: 50.2, mid: 46.0, winners: 3.7 },
  { tier: 'Small ($10K-$50K)', losers: 49.3, mid: 44.6, winners: 6.2 },
  { tier: 'Medium ($50K-$200K)', losers: 52.6, mid: 40.1, winners: 7.3 },
  { tier: 'Large ($200K-$1M)', losers: 53.9, mid: 38.0, winners: 8.1 },
  { tier: 'Enterprise ($1M+)', losers: 52.2, mid: 39.6, winners: 8.2 },
];

const SPEND_DISTRIBUTION = [
  { tier: 'Micro (<$10K)', losers: 31.5, mid: 45.6, winners: 23.0 },
  { tier: 'Small ($10K-$50K)', losers: 25.7, mid: 39.7, winners: 34.6 },
  { tier: 'Medium ($50K-$200K)', losers: 18.6, mid: 28.1, winners: 53.3 },
  { tier: 'Large ($200K-$1M)', losers: 17.1, mid: 26.4, winners: 56.5 },
  { tier: 'Enterprise ($1M+)', losers: 13.8, mid: 22.4, winners: 63.7 },
];

const VISUAL_HIT_RATES = [
  { format: 'Offer-first banner', winners: 11006, midRange: 39448, hitRate: 8.68 },
  { format: 'Demo', winners: 5563, midRange: 28551, hitRate: 8.11 },
  { format: 'Testimonial', winners: 5073, midRange: 30517, hitRate: 6.57 },
  { format: 'Headline', winners: 4570, midRange: 35228, hitRate: 6.26 },
  { format: 'Montage', winners: 3704, midRange: 21565, hitRate: 7.02 },
  { format: 'Before & after', winners: 1724, midRange: 9771, hitRate: 6.07 },
  { format: 'Listicle', winners: 1641, midRange: 12072, hitRate: 5.30 },
  { format: 'Split screen', winners: 1491, midRange: 10723, hitRate: 5.62 },
  { format: 'Us vs them', winners: 1365, midRange: 8203, hitRate: 6.52 },
  { format: 'Unboxing', winners: 1229, midRange: 5295, hitRate: 9.83 },
  { format: 'Feature benefit point', winners: 1142, midRange: 9242, hitRate: 5.61 },
  { format: 'Cinematic b-roll', winners: 900, midRange: 5847, hitRate: 6.85 },
  { format: 'Grid swap', winners: 882, midRange: 4975, hitRate: 7.98 },
  { format: 'Screen recording', winners: 879, midRange: 5446, hitRate: 5.49 },
  { format: 'Problem agitation', winners: 818, midRange: 6859, hitRate: 5.98 },
  { format: 'Review', winners: 804, midRange: 5129, hitRate: 4.89 },
  { format: 'How to', winners: 793, midRange: 3797, hitRate: 6.62 },
  { format: 'POV', winners: 792, midRange: 3831, hitRate: 8.28 },
  { format: 'Behind the scenes', winners: 772, midRange: 2989, hitRate: 8.64 },
  { format: 'Founder', winners: 692, midRange: 4961, hitRate: 8.57 },
  { format: 'Statistic', winners: 645, midRange: 3777, hitRate: 5.81 },
  { format: 'Influencer endorsement', winners: 635, midRange: 4331, hitRate: 7.71 },
  { format: 'Collage', winners: 626, midRange: 3130, hitRate: 6.50 },
  { format: 'Static to video hybrid', winners: 586, midRange: 3359, hitRate: 5.18 },
  { format: 'Expert explainer', winners: 581, midRange: 3359, hitRate: 5.96 },
];

const HOOK_HIT_RATES = [
  { hook: 'Newness', winners: 83, midRange: 498, hitRate: 11.37 },
  { hook: 'Sale announcement', winners: 16, midRange: 29, hitRate: 11.35 },
  { hook: 'Price anchor', winners: 71, midRange: 255, hitRate: 10.89 },
  { hook: 'Urgency', winners: 4855, midRange: 13497, hitRate: 9.73 },
  { hook: 'Announcement', winners: 37, midRange: 229, hitRate: 9.59 },
  { hook: 'Offer only', winners: 4798, midRange: 16666, hitRate: 9.29 },
  { hook: 'FOMO', winners: 364, midRange: 1720, hitRate: 9.20 },
  { hook: 'New product announcement', winners: 29, midRange: 195, hitRate: 8.76 },
  { hook: 'Confession', winners: 675, midRange: 2672, hitRate: 8.74 },
  { hook: 'Exclusivity', winners: 421, midRange: 2157, hitRate: 8.44 },
  { hook: 'Curiosity', winners: 2402, midRange: 12009, hitRate: 7.77 },
  { hook: 'Giveaway', winners: 33, midRange: 191, hitRate: 7.69 },
  { hook: 'Event announcement', winners: 33, midRange: 172, hitRate: 7.62 },
  { hook: 'Bold claim', winners: 2308, midRange: 13310, hitRate: 7.19 },
  { hook: 'Reverse psychology', winners: 61, midRange: 338, hitRate: 7.14 },
  { hook: 'Shocking statement', winners: 597, midRange: 2790, hitRate: 7.12 },
  { hook: 'If then', winners: 876, midRange: 4241, hitRate: 7.12 },
  { hook: 'Warning', winners: 316, midRange: 1570, hitRate: 7.07 },
  { hook: 'Wordplay', winners: 21, midRange: 143, hitRate: 7.02 },
  { hook: 'Contrarian', winners: 421, midRange: 2203, hitRate: 7.01 },
  { hook: 'Relatability', winners: 3377, midRange: 21215, hitRate: 6.85 },
  { hook: 'Contrast', winners: 2035, midRange: 12449, hitRate: 6.78 },
  { hook: 'Direct address', winners: 343, midRange: 2154, hitRate: 6.65 },
  { hook: 'Product announcement', winners: 32, midRange: 295, hitRate: 6.52 },
  { hook: 'Authority', winners: 590, midRange: 4034, hitRate: 6.40 },
];

const ASSET_HIT_RATES = [
  { asset: 'Text only', winners: 1728, midRange: 4766, hitRate: 11.60 },
  { asset: 'Product image with text', winners: 6256, midRange: 29402, hitRate: 8.75 },
  { asset: 'Lifestyle-product image', winners: 24, midRange: 186, hitRate: 7.59 },
  { asset: 'UGC', winners: 11374, midRange: 60699, hitRate: 7.56 },
  { asset: 'High production', winners: 2653, midRange: 15812, hitRate: 6.97 },
  { asset: 'Gif', winners: 215, midRange: 972, hitRate: 6.82 },
  { asset: 'Illustration', winners: 1447, midRange: 6776, hitRate: 6.80 },
  { asset: 'UGC mashup', winners: 779, midRange: 4193, hitRate: 6.28 },
  { asset: 'Lifestyle-product image with text', winners: 3173, midRange: 22533, hitRate: 6.18 },
  { asset: 'Lifestyle image with text', winners: 8769, midRange: 62631, hitRate: 6.10 },
  { asset: 'Lifestyle image', winners: 386, midRange: 3540, hitRate: 5.91 },
  { asset: 'Hybrid', winners: 1983, midRange: 10621, hitRate: 5.74 },
  { asset: 'Product image', winners: 32, midRange: 339, hitRate: 5.39 },
  { asset: 'Animation', winners: 731, midRange: 4267, hitRate: 4.57 },
  { asset: 'Carousel', winners: 15, midRange: 135, hitRate: 4.45 },
];

/* ── Reusable Components ── */

function SectionNumber({ num }: { num: string }) {
  return (
    <div className="flex items-baseline gap-6 mb-6">
      <span className="font-serif italic text-6xl md:text-8xl text-black/10 leading-none">{num}</span>
    </div>
  );
}

function EmailGate({
  isUnlocked,
  onUnlock,
  children,
}: {
  isUnlocked: boolean;
  onUnlock: (email: string) => void;
  children: React.ReactNode;
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) onUnlock(email);
  };

  return (
    <div className="relative">
      <div
        className={`transition-all duration-700 ${
          !isUnlocked ? 'blur-2xl select-none pointer-events-none opacity-20' : ''
        }`}
      >
        {children}
      </div>

      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center z-10 px-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-black text-white p-8 md:p-10 max-w-md w-full border border-white/10"
          >
            <div className="flex flex-col items-center text-center gap-6">
              <div className="w-14 h-14 bg-white flex items-center justify-center">
                <Lock className="text-black w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif italic text-3xl">Unlock Benchmarks</h4>
                <p className="text-xs opacity-60 leading-relaxed uppercase tracking-widest font-bold">
                  Enter your email to access the full 2026 dataset.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="w-full bg-white/5 border border-white/20 px-12 py-4 text-sm focus:outline-none focus:border-white transition-all placeholder:text-white/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#eaeaea] transition-all flex items-center justify-center gap-3">
                  Unlock <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div className="overflow-x-auto border border-black/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-black text-white">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-4 py-3 font-bold uppercase tracking-wider text-xs whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-t border-black/5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-[#6B6B6B] whitespace-nowrap">
                  {typeof cell === 'number' ? cell.toLocaleString() : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StackedBar({ data, colors, labels }: {
  data: { label: string; values: number[] }[];
  colors: string[];
  labels: string[];
}) {
  return (
    <div className="space-y-4">
      <div className="flex gap-6 mb-6">
        {labels.map((l, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-[#6B6B6B]">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[i] }} />
            {l}
          </div>
        ))}
      </div>
      {data.map((item, i) => (
        <div key={i} className="space-y-1">
          <div className="text-xs text-[#6B6B6B] font-medium">{item.label}</div>
          <div className="flex h-8 overflow-hidden bg-[#f0f0f0]">
            {item.values.map((v, j) => (
              <div
                key={j}
                className="flex items-center justify-center text-[10px] font-bold text-white transition-all"
                style={{ width: `${v}%`, backgroundColor: colors[j] }}
              >
                {v > 5 ? `${v}%` : ''}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ── */

export default function FreeGuide() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ideom_unlocked_2026');
    if (saved) setIsUnlocked(true);
    window.scrollTo(0, 0);
  }, []);

  const handleUnlock = (email: string) => {
    setIsUnlocked(true);
    localStorage.setItem('ideom_unlocked_2026', 'true');
    console.log('Unlocked by:', email);
  };

  return (
    <div className="min-h-screen font-sans bg-white text-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b-2 border-black bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-4xl font-bold tracking-tighter text-black flex items-center leading-none"
            style={{ fontFamily: "var(--font-circular)" }}
          >
            ideom<span className="text-[#1F2F2A] text-[0.92em] translate-y-[14px] leading-none">*</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.15em] text-black/60">
            <a href="#part1" className="hover:text-black transition-colors">Part 1</a>
            <a href="#part2" className="hover:text-black transition-colors">Part 2</a>
            <a href="#methodology" className="hover:text-black transition-colors">Methodology</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-4 bg-black text-white p-[10px] px-[16px] rounded-none border-2 border-black group cursor-pointer transition-all duration-300 hover:bg-white hover:text-black"
            >
              <span className="text-sm font-bold uppercase tracking-widest">Book a Demo</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium text-black">
              <a href="#part1" onClick={() => setIsMenuOpen(false)}>Part 1: The Search for Winners</a>
              <a href="#part2" onClick={() => setIsMenuOpen(false)}>Part 2: Anatomy of Winning Ads</a>
              <a href="#methodology" onClick={() => setIsMenuOpen(false)}>Methodology</a>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-[#6B6B6B]">← Back to Site</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ HERO ═══════ */}
      <header className="pt-44 pb-32 px-6 max-w-7xl mx-auto border-b-4 border-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6 mb-12">
            <span className="bg-black text-white text-[11px] font-black px-4 py-1.5 uppercase tracking-[0.3em]">
              2026 Edition
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30">
              Creative Intelligence
            </span>
          </div>

          <h1 className="text-[14vw] md:text-[10vw] font-serif italic leading-[0.8] tracking-tighter mb-16">
            Creative <br />
            <span className="bg-black text-white px-6 not-italic inline-block">Benchmarks</span> <br />
            2026.
          </h1>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
              <p className="text-2xl md:text-4xl font-serif italic leading-[1.15] text-black/90">
                See where you stand next to the best advertisers in the world.
              </p>
              <p className="text-lg leading-relaxed text-[#6B6B6B]">
                Advertising is described as a science of prediction. The right message, the right angle, for the right audience. Marketers often try to isolate and optimize as many variables as possible so that they can guarantee an ad's success. But in practice, most ads are forgettable. And that's okay. This report examines why that's normal and what it suggests about how creative strategy should actually work.
              </p>
              <p className="text-base leading-relaxed text-[#6B6B6B]">
                We analyzed an anonymized dataset of <strong className="text-black">+550,000 ads</strong> launched by <strong className="text-black">+6,000 advertisers</strong>, representing roughly <strong className="text-black">$1.3 billion in spend</strong> across Facebook and Instagram between September 2025 and early January 2026.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Ads Analyzed', value: '550K+' },
                { label: 'Total Spend', value: '$1.3B' },
                { label: 'Advertisers', value: '6,000+' },
                { label: 'Hit Rate', value: '~5%' },
              ].map((stat, i) => (
                <div key={i} className="p-8 border-2 border-black bg-black/5 flex flex-col justify-between aspect-square">
                  <div className="text-4xl md:text-5xl font-black tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* ═══════ KEY FINDINGS ═══════ */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-black/10">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-12">Several patterns stand out</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Winning ads are rare',
              body: 'Only about 5% of ads spend at least 10× their account median. Low hit rates are a statistical feature of how performance advertising works.',
            },
            {
              title: 'Scale changes frequency, not fundamentals',
              body: 'Larger advertisers surface more winners because they introduce more variation. Smaller advertisers aren\'t excluded—they just get winners less often.',
            },
            {
              title: 'Trends are not universal',
              body: 'Popular ad formats aren\'t always the ones that capture spend. Performance shifts with context—scale, industry, timing, and saturation.',
            },
          ].map((item, i) => (
            <div key={i} className="p-8 border-2 border-black hover:bg-black hover:text-white transition-all group">
              <h3 className="font-black text-lg mb-4 tracking-tight">{item.title}</h3>
              <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-80">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ THE FOUR QUESTIONS ═══════ */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-b border-black/10">
        <p className="text-lg text-[#6B6B6B] leading-relaxed mb-12 max-w-4xl">
          This report is designed to describe the system surrounding performance advertising. It focuses on the mechanics that shape successful ad accounts. These benchmarks are meant to help teams answer four fundamental questions with clear context.
        </p>
        <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-30 mb-8">The four biggest questions in creative strategy</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            'How many ads should we be testing?',
            'What types of ads should we be testing?',
            'What makes a winning ad?',
            'How should we structure our strategy?',
          ].map((q, i) => (
            <div key={i} className="p-6 border-l-4 border-black bg-[#FAFAFA] flex items-center gap-4">
              <span className="text-3xl font-serif italic text-black/15">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-medium text-black">{q}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ PART 1: THE SEARCH FOR WINNERS ═══════ */}
      <main className="max-w-7xl mx-auto px-6">
        <section id="part1" className="py-32">
          <div className="border-l-[6px] border-black pl-10 mb-20">
            <div className="flex items-center gap-6 mb-6">
              <span className="font-mono text-5xl md:text-6xl font-black leading-none">01</span>
              <h2 className="font-serif italic text-4xl md:text-6xl tracking-tighter text-black leading-none">The Search for Winners</h2>
            </div>
            <p className="text-black/70 max-w-4xl text-xl font-sans leading-relaxed">
              Creative volume is a structural advantage. Across industries and budget sizes, one pattern is consistent: advertisers that launch more ads get more winners.
            </p>
          </div>

          {/* Winners are rare */}
          <div className="space-y-20">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-black">Winners are rare — and that's okay</h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  If spend was more evenly spread out, improving results would mostly be about optimization. The data shows that's not how it works. Most ads don't spend, or they spend very little. Meanwhile, a small number of ads receive far more spend than the rest.
                </p>
                <p className="text-[#6B6B6B] leading-relaxed">
                  In this report, we use a strict definition of a winner: an ad must spend at least <strong className="text-black">10× more than the account's median ad</strong>. This helps us find ads that truly stand out, not just ads that run a bit longer.
                </p>
                <p className="text-[#6B6B6B] leading-relaxed">
                  This helps explain a common frustration. When results are predictably inconsistent, it doesn't always mean an ad that doesn't spend is "weak." It suggests that advertisers are much better off asking themselves <em>why an ad worked</em> than why it didn't.
                </p>
              </div>

              <div>
                <div className="bg-black text-white p-10 mb-8">
                  <h4 className="font-black uppercase text-[11px] tracking-[0.2em] mb-6 opacity-40">Spend Concentration</h4>
                  <div className="space-y-4">
                    {WINNERS_DATA.map((d, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-bold">{d.label}</span>
                          <span className="opacity-60">{d.spend}% of spend</span>
                        </div>
                        <div className="w-full bg-white/10 h-6">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${d.spend}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.15 }}
                            className="h-full bg-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 border-2 border-black">
                  <p className="font-serif italic text-xl leading-tight text-black">
                    "In a system where big wins are uncommon but crucial, taking more chances matters more than being certain about any individual ad."
                  </p>
                </div>
              </div>
            </div>

            {/* Rethinking hit rate */}
            <div className="border-t-2 border-black pt-16">
              <h3 className="text-2xl font-medium text-black mb-6">Rethinking hit rate</h3>
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-[#6B6B6B] leading-relaxed">
                    Hit rate is often used as a scorecard for creative strategists. A high hit rate can look like proof of sharp intuition. But high hit rates may actually signal that someone isn't testing enough.
                  </p>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    Two accounts can have the same hit rate but work very differently. One might launch only a few ads and put most of their spend behind them. Another might test many ads and find a few strong outliers. Hit rates are likely to look lower for the latter, despite more testing.
                  </p>
                  <p className="text-[#6B6B6B] leading-relaxed">
                    Hit rate is still a valuable metric. But it is not a proxy for success. It just describes how often rare events happen within an account.
                  </p>
                </div>
                <div className="bg-[#FAFAFA] border-2 border-black p-8 flex flex-col justify-center">
                  <h4 className="font-black uppercase text-xs tracking-widest mb-6 opacity-40">Why hit rate can be misleading</h4>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-[#6B6B6B]"><strong className="text-black">High hit rate</strong> could mean strong judgment — or limited testing</p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-[#6B6B6B]"><strong className="text-black">Lower hit rate</strong> often appears in accounts that test more ideas — more testing naturally produces more average ads <em>and</em> more winners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio logic */}
            <div className="border-t-2 border-black pt-16">
              <h3 className="text-2xl font-medium text-black mb-6">Mid-range spenders and portfolio logic</h3>
              <p className="text-[#6B6B6B] leading-relaxed max-w-3xl mb-10">
                Between winning ads and losing ads sits a third group: mid-range spenders. These ads never become winners, but they keep running, receive steady spend, and in many accounts quietly support day-to-day performance.
              </p>

              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-6 opacity-40">Portfolio Breakdown by Tier</h4>
                  <StackedBar
                    data={PORTFOLIO_DATA.map((d) => ({
                      label: d.tier,
                      values: [d.losers, d.mid, d.winners],
                    }))}
                    colors={['#999', '#555', '#000']}
                    labels={['Losers', 'Mid-range', 'Winners']}
                  />
                </div>
                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest mb-6 opacity-40">Spend Distribution by Tier</h4>
                  <StackedBar
                    data={SPEND_DISTRIBUTION.map((d) => ({
                      label: d.tier,
                      values: [d.losers, d.mid, d.winners],
                    }))}
                    colors={['#999', '#555', '#000']}
                    labels={['Losers', 'Mid-range', 'Winners']}
                  />
                </div>
              </div>

              <div className="mt-12 p-8 bg-black text-white">
                <p className="font-serif italic text-xl leading-snug">
                  "A common mistake is to treat mid-range ads as failed tests. In a healthy account, they connect testing and scaling. They help keep performance steady while new ideas compete for spend."
                </p>
              </div>
            </div>

            {/* How many ads? */}
            <div className="border-t-2 border-black pt-16">
              <h3 className="text-2xl font-medium text-black mb-6">How many ads should you be testing?</h3>
              <p className="text-[#6B6B6B] leading-relaxed max-w-3xl mb-10">
                There's no universal testing volume that's "best" for all advertisers. The right testing volume depends on budget, team size, and how quickly an advertiser can produce new ideas. Creative volume rises with scale.
              </p>

              <EmailGate isUnlocked={isUnlocked} onUnlock={handleUnlock}>
                <DataTable
                  headers={['Spend Tier', 'Avg Testing Volume (per week)', 'Avg Hit Rate (%)']}
                  rows={[
                    ['Micro (<$10K)', 3, '3.7%'],
                    ['Small ($10K-$50K)', 8, '6.2%'],
                    ['Medium ($50K-$200K)', 18, '7.3%'],
                    ['Large ($200K-$1M)', 35, '8.1%'],
                    ['Enterprise ($1M+)', 62, '8.2%'],
                  ]}
                />
              </EmailGate>

              <p className="text-[#6B6B6B] leading-relaxed mt-10 max-w-3xl">
                The most useful question creative strategists should be asking is: <strong className="text-black">are we shipping enough ads to make winners possible?</strong> Creative strategy should be seen more as capacity planning than optimization.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ PART 2: ANATOMY OF WINNING ADS ═══════ */}
        <section id="part2" className="py-32 border-t-4 border-black">
          <div className="border-l-[6px] border-black pl-10 mb-20">
            <div className="flex items-center gap-6 mb-6">
              <span className="font-mono text-5xl md:text-6xl font-black leading-none">02</span>
              <h2 className="font-serif italic text-4xl md:text-6xl tracking-tighter text-black leading-none">The Anatomy of Winning Ads</h2>
            </div>
            <p className="text-black/70 max-w-4xl text-xl font-sans leading-relaxed">
              If ad performance works like probability, then not all ads have the same odds of success. Some formats, hooks, and types of assets surface winners more often than others.
            </p>
          </div>

          {/* Hit Rate + Spend Use Explanation */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <p className="text-[#6B6B6B] leading-relaxed text-lg">
                The strength of a creative strategist is in understanding and interpreting the patterns behind what does work. Two simple measures — when considered together — help describe these patterns:
              </p>
              {[
                { title: 'Hit Rate', desc: 'How frequently did this format become a winner?' },
                { title: 'Spend Use Ratio', desc: 'When we use this format, how likely is it to get spend? (>1.0 = punches above weight, ≈1.0 = as expected, <1.0 = overused relative to results)' },
              ].map((item, i) => (
                <div key={i} className="p-8 border-2 border-black flex items-start gap-6 hover:bg-black hover:text-white transition-all group">
                  <div className="w-10 h-10 bg-black text-white group-hover:bg-white group-hover:text-black flex items-center justify-center shrink-0 font-black text-lg transition-all">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="font-black uppercase text-sm tracking-widest mb-2">{item.title}</h5>
                    <p className="text-sm opacity-60 group-hover:opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <p className="text-[#6B6B6B] leading-relaxed">
                Neither metric says an ad format is "good" or "bad." But formats with high hit rates <em>and</em> high spend use ratios suggest collective confidence. Keep in mind that this dataset represents a very specific window (BFCM, gifting season) and that results are time-bound.
              </p>
            </div>
          </div>

          {/* Top visual styles */}
          <div className="mb-20">
            <h3 className="text-2xl font-medium text-black mb-8">Top visual styles</h3>
            <EmailGate isUnlocked={isUnlocked} onUnlock={handleUnlock}>
              <DataTable
                headers={['Visual Format', 'Winners', 'Mid-range', 'Hit Rate (%)']}
                rows={VISUAL_HIT_RATES.map((r) => [r.format, r.winners, r.midRange, `${r.hitRate}%`])}
              />
            </EmailGate>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {[
                { label: 'Scale Formats', desc: 'Offer-first banners, demos — widely used, easy to deploy, trusted when performance matters.' },
                { label: 'Volatile Formats', desc: 'Unboxing, POV, behind the scenes, founder ads — high hit rates but lower spend use.' },
                { label: 'Coverage Formats', desc: 'High-volume styles that get spend but become winners less often — help teams explore ideas.' },
              ].map((item, i) => (
                <div key={i} className="p-6 border-l-4 border-black bg-[#FAFAFA]">
                  <h5 className="font-black uppercase text-xs tracking-widest mb-2">{item.label}</h5>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top hooks */}
          <div className="mb-20">
            <h3 className="text-2xl font-medium text-black mb-4">Top hooks & headlines</h3>
            <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-3xl">
              Like with visuals, it's tempting to look for a list of "winning hooks." But hook performance also depends on context. Hooks that signal immediacy, clarity, or a concrete reason to act tend to surface often.
            </p>
            <EmailGate isUnlocked={isUnlocked} onUnlock={handleUnlock}>
              <DataTable
                headers={['Hook Headline Tactic', 'Winners', 'Mid-range', 'Hit Rate (%)']}
                rows={HOOK_HIT_RATES.map((r) => [r.hook, r.winners, r.midRange, `${r.hitRate}%`])}
              />
            </EmailGate>
          </div>

          {/* Top asset types */}
          <div className="mb-20">
            <h3 className="text-2xl font-medium text-black mb-4">Top asset types</h3>
            <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-3xl">
              Asset choice is not only a creative decision. It's also an operational one. Some asset types are easier to adjust, remix, and relaunch. That difference affects how quickly a team can test ideas.
            </p>
            <EmailGate isUnlocked={isUnlocked} onUnlock={handleUnlock}>
              <DataTable
                headers={['Asset Type', 'Winners', 'Mid-range', 'Hit Rate (%)']}
                rows={ASSET_HIT_RATES.map((r) => [r.asset, r.winners, r.midRange, `${r.hitRate}%`])}
              />
            </EmailGate>
            <div className="mt-8 p-8 border-2 border-black bg-[#FAFAFA]">
              <p className="text-[#6B6B6B] leading-relaxed">
                <strong className="text-black">Text-forward assets create winners more often than many teams expect.</strong> Text-only ads, product images with text overlays, and simple GIFs rank well. Their strength is speed and clarity. Because they are fast to produce, these assets make experimentation easier.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════ CONCLUSION ═══════ */}
        <section id="methodology" className="border-t-4 border-black pt-32 pb-32 text-center">
          <div className="max-w-5xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-8xl font-serif italic tracking-tighter leading-[0.85]">
              "Creative strategy is capacity planning."
            </h2>
            <p className="text-xl md:text-2xl opacity-60 leading-relaxed max-w-4xl mx-auto">
              The advertisers who win out will not be the ones who eliminate failure. They will be the ones who make it survivable and routine. They'll keep shipping high volume. They'll keep adjusting. And they'll keep looking for a signal in the noise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <Link
                to="/#contact"
                className="bg-black text-white px-12 py-6 font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black border-2 border-black transition-all w-full sm:w-auto text-sm text-center"
              >
                Book a Strategy Call
              </Link>
              <Link
                to="/"
                className="border-2 border-black px-12 py-6 font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all w-full sm:w-auto text-sm text-center"
              >
                Back to Ideom
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24">
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-4">
              <span className="font-bold text-3xl tracking-tighter" style={{ fontFamily: "var(--font-circular)" }}>
                ideom<span className="text-white/40">.</span>
              </span>
            </Link>
            <p className="text-white/40 max-w-md text-lg leading-relaxed">
              Empowering businesses with data-driven marketing intelligence. Built for teams that want to win.
            </p>
            <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.3em] opacity-30">
              <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
              <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-20">Report</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <li><a href="#part1" className="hover:opacity-60 transition-opacity">Part 1</a></li>
                <li><a href="#part2" className="hover:opacity-60 transition-opacity">Part 2</a></li>
                <li><a href="#methodology" className="hover:opacity-60 transition-opacity">Methodology</a></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-20">Company</h4>
              <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                <li><Link to="/" className="hover:opacity-60 transition-opacity">Home</Link></li>
                <li><Link to="/privacy-policy" className="hover:opacity-60 transition-opacity">Privacy</Link></li>
                <li><Link to="/terms-of-service" className="hover:opacity-60 transition-opacity">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 text-[11px] font-black uppercase tracking-[0.3em] opacity-10">
          © 2025 Ideom Digital Marketing. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
