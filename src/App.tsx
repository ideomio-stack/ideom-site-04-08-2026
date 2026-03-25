import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowUpRight,
  BarChart,
  Bot,
  Calendar,
  Compass,
  Mail,
  Megaphone,
  Menu,
  MessageSquare,
  Search,
  Sparkles,
  Star,
  Target,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactTab, setContactTab] = useState<'quote' | 'call'>('quote');

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl border-b border-white/40 bg-white/60 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-tighter text-slate-900">
            ideom<span className="text-purple-600">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
            <a href="#work" className="hover:text-slate-900 transition-colors">Work</a>
            <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors"
            >
              Free Guide
            </button>
            <a
              href="#contact"
              className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10"
            >
              Let's Collaborate
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium text-slate-900">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#work" onClick={() => setIsMenuOpen(false)}>Work</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <button
                onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
                className="text-left text-purple-600"
              >
                Free Guide
              </button>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-full text-lg font-semibold shadow-lg shadow-slate-900/20"
              >
                Let's Collaborate
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 min-h-[90vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-medium tracking-tight mb-8 text-slate-900">
              Gain traction.<br />
              Get sales.<br />
              <span className="font-serif italic text-slate-500">Grow your business.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between mt-12">
              <p className="text-lg md:text-xl text-slate-600 max-w-md leading-relaxed">
                At Ideom, we provide data-driven digital marketing solutions to elevate your brand and dominate your market.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <a
                  href="#contact"
                  className="group flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                >
                  Get Started
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="hidden sm:flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={`https://picsum.photos/seed/${i}/100/100`}
                        alt={`Avatar ${i}`}
                        className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex text-yellow-500">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 font-medium mt-1">Trusted by 200+ clients</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Client Logo Marquee */}
        <section className="py-10 border border-white/40 bg-white/20 backdrop-blur-sm overflow-hidden rounded-3xl mx-6 mb-32 shadow-sm">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">Trusted by industry leaders</p>
          <div className="flex whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 28 }}
              className="flex items-center gap-16 px-8"
              style={{ willChange: "transform" }}
            >
              {[
                { src: "/client-logos/AAPPTEC-logo.webp", alt: "AAPPTEC", scaleClass: "scale-75" },
                { src: "/client-logos/BRG-Logo_Final_Print-1.jpg", alt: "BRG", scaleClass: "scale-75" },
                { src: "/client-logos/Coextro-b.png", alt: "Coextro", scaleClass: "scale-110" },
                { src: "/client-logos/Outschool_Color_Logo.jpg", alt: "Outschool", scaleClass: "scale-90" },
                { src: "/client-logos/SIDIA_Brandmark.png", alt: "SIDIA", scaleClass: "scale-150" },
                { src: "/client-logos/Small_RGB_Negro-2.png", alt: "Small", scaleClass: "scale-75" },
                { src: "/client-logos/WESCO_International_logo.svg", alt: "WESCO International", scaleClass: "scale-75" },
                { src: "/client-logos/sultan-athletic.png", alt: "Sultan Athletic", scaleClass: "scale-90" },
                { src: "/client-logos/logo copy.png", alt: "Ideom", scaleClass: "scale-100" },
                { src: "/client-logos/om.png", alt: "OM", scaleClass: "scale-[2.5]" },
                { src: "/client-logos/propertybox.webp", alt: "PropertyBox", scaleClass: "scale-[1.8]" },
                // Duplicate set for seamless loop
                { src: "/client-logos/AAPPTEC-logo.webp", alt: "AAPPTEC", scaleClass: "scale-75" },
                { src: "/client-logos/BRG-Logo_Final_Print-1.jpg", alt: "BRG", scaleClass: "scale-75" },
                { src: "/client-logos/Coextro-b.png", alt: "Coextro", scaleClass: "scale-110" },
                { src: "/client-logos/Outschool_Color_Logo.jpg", alt: "Outschool", scaleClass: "scale-90" },
                { src: "/client-logos/SIDIA_Brandmark.png", alt: "SIDIA", scaleClass: "scale-150" },
                { src: "/client-logos/Small_RGB_Negro-2.png", alt: "Small", scaleClass: "scale-75" },
                { src: "/client-logos/WESCO_International_logo.svg", alt: "WESCO International", scaleClass: "scale-75" },
                { src: "/client-logos/sultan-athletic.png", alt: "Sultan Athletic", scaleClass: "scale-90" },
                { src: "/client-logos/logo copy.png", alt: "Ideom", scaleClass: "scale-100" },
                { src: "/client-logos/om.png", alt: "OM", scaleClass: "scale-[2.5]" },
                { src: "/client-logos/propertybox.webp", alt: "PropertyBox", scaleClass: "scale-[1.8]" },
              ].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-20 w-48 px-4 flex-shrink-0 group"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`max-h-14 max-w-[160px] w-auto h-auto object-contain mix-blend-multiply grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ${logo.scaleClass || ""}`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About / Stats Section */}
        <section id="about" className="py-20 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8 text-slate-900">
                Crafting exceptional, data-driven strategies to drive impactful results with <span className="font-serif italic text-slate-500">precision.</span>
              </h2>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-200 bg-purple-50 text-purple-700">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Creativity</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700">
                  <Target className="w-4 h-4" />
                  <span className="text-sm font-medium">Strategy</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-200 bg-green-50 text-green-700">
                  <BarChart className="w-4 h-4" />
                  <span className="text-sm font-medium">Growth</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <div className="text-6xl md:text-7xl font-serif italic text-slate-900">+40</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">Total Projects Completed</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-6xl md:text-7xl font-serif italic text-slate-900">+15</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">Years of Experience</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-6xl md:text-7xl font-serif italic text-slate-900">+12</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">Industry Awards</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-6xl md:text-7xl font-serif italic text-slate-900">99%</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">Client Retention</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-slate-900">
              Where strategy meets <span className="font-serif italic text-slate-500">execution.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "Ads", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-1-2.jpg", desc: "Data-driven performance marketing to maximize ROI." },
              { title: "AI SEO Optimization", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-8.jpg", desc: "Optimizing content to be cited, mentioned, or recommended by ChatGPT, Claude, Perplexity, and Google's AI Overviews." },
              { title: "SEO Optimization", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-3-2.jpg", desc: "Technical and content-driven strategies to dominate search." },
              { title: "Email Strategy", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-2.jpg", desc: "High-converting lifecycle campaigns and newsletters." },
              { title: "P/R", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-1.jpg", desc: "Strategic communications to build authority and trust." },
              { title: "Brand Strategy", img: "https://itscraft.com/wp-content/themes/craft-2025/public/abstracted-flora/HALF_ABSTRACT_FLORA_SET_09E.avif", desc: "Positioning and identity to make your business unforgettable." },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer flex flex-col gap-6"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] bg-slate-100 shadow-sm border border-slate-200/50">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-medium mb-3 text-slate-900 group-hover:text-purple-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-32 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-slate-900">
              How we transformed businesses'<br />
              <span className="font-serif italic text-slate-500">online presence.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "TechFlow", tags: ["AI SEO", "Brand Strategy"], img: "10" },
              { title: "Nexus Health", tags: ["Ads", "Email Strategy"], img: "20" },
              { title: "Aura Beauty", tags: ["P/R", "SEO Optimization"], img: "30" },
              { title: "FinTech Pro", tags: ["Brand Strategy", "Ads"], img: "40" },
            ].map((work, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl aspect-[4/3] bg-slate-100 shadow-md"
              >
                <img
                  src={`https://picsum.photos/seed/${work.img}/800/600`}
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-3xl font-medium text-white">{work.title}</h3>
                    <div className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {work.tags.map((tag, j) => (
                      <span key={j} className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-[3rem] p-8 md:p-16 lg:p-24 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16"
            >
              <div className="lg:col-span-5">
                <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wider uppercase mb-6">
                  Let's make it happen
                </div>
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-slate-900">
                  Ready to<br />
                  <span className="font-serif italic text-slate-500">Get started</span>
                </h2>
              </div>

              <div className="lg:col-span-7">
                {/* Tabs */}
                <div className="flex gap-8 border-b border-slate-200 mb-8">
                  <button
                    onClick={() => setContactTab('quote')}
                    className={`pb-4 text-xl font-medium border-b-2 transition-colors ${contactTab === 'quote' ? 'border-purple-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    Request a quote
                  </button>
                  <button
                    onClick={() => setContactTab('call')}
                    className={`pb-4 text-xl font-medium border-b-2 transition-colors ${contactTab === 'call' ? 'border-purple-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    Book a free call
                  </button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {contactTab === 'quote' ? (
                    <motion.form
                      key="quote"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Name *</label>
                          <input type="text" required className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-sm" placeholder="Full name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                          <input type="email" required className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-sm" placeholder="Business email" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Message *</label>
                        <textarea required rows={4} className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-sm resize-none" placeholder="Tell us about your project"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Budget *</label>
                        <div className="relative">
                          <select required className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all shadow-sm appearance-none">
                            <option value="">Select...</option>
                            <option value="5k-10k">$5K - $10K</option>
                            <option value="10k-25k">$10K - $25K</option>
                            <option value="25k-50k">$25K - $50K</option>
                            <option value="50k+">$50K +</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-3">How can we help you *</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {['Ads', 'AI SEO', 'SEO', 'Email', 'P/R', 'Brand Strategy'].map((service) => (
                            <label key={service} className="flex items-center gap-3 cursor-pointer group">
                              <div className="relative flex items-center justify-center w-5 h-5 border border-slate-300 rounded bg-white group-hover:border-purple-500 transition-colors">
                                <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                                <div className="w-2.5 h-2.5 bg-purple-600 rounded-[2px] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                              </div>
                              <span className="text-sm text-slate-700">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 mt-4">
                        Send message
                        <ArrowUpRight className="w-5 h-5" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="call"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">No sales pitch</h3>
                        <p className="text-slate-600 leading-relaxed">
                          Just honest advice on whether we're the right fit. Let's bring your vision to life!
                        </p>
                      </div>
                      <div className="space-y-4">
                        <a href="#" className="group flex items-center justify-between p-4 bg-white/50 border border-slate-200 rounded-2xl hover:bg-white hover:border-purple-200 transition-all shadow-sm hover:shadow-md">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-slate-900">15 Min Meeting</h4>
                              <span className="text-sm text-slate-500">15m</span>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </a>
                        <a href="#" className="group flex items-center justify-between p-4 bg-white/50 border border-slate-200 rounded-2xl hover:bg-white hover:border-purple-200 transition-all shadow-sm hover:shadow-md">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold text-slate-900">30 Min Meeting</h4>
                              <span className="text-sm text-slate-500">30m</span>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 pt-20 pb-10 px-6 bg-white/30 backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <a href="#" className="text-3xl font-bold tracking-tighter block mb-6 text-slate-900">
                ideom<span className="text-purple-600">.</span>
              </a>
              <p className="text-slate-600 max-w-sm mb-8">
                Empowering businesses with innovative digital marketing solutions. Let's create something amazing together.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-slate-400 rounded-sm" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-slate-900">Sitemap</h4>
              <ul className="space-y-4 text-slate-600">
                <li><a href="#about" className="hover:text-slate-900 transition-colors">About us</a></li>
                <li><a href="#work" className="hover:text-slate-900 transition-colors">Work</a></li>
                <li><a href="#services" className="hover:text-slate-900 transition-colors">Services</a></li>
                <li><button onClick={() => setIsModalOpen(true)} className="hover:text-slate-900 transition-colors">Free Guide</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-slate-900">Contact</h4>
              <ul className="space-y-4 text-slate-600">
                <li>hello@ideom.agency</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Growth Ave, Suite 100<br />San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-200/50 text-sm text-slate-500">
            <p>© 2026 Ideom Digital Marketing. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Lead Gen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-slate-100"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-wider uppercase mb-6">
                Free Guide
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Get Instant Access</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Fill out your details to download the free guide: <strong>Visual formats every brand should use in 2026</strong>. You'll learn:
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  </div>
                  Top 5 visual trends dominating 2026
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  </div>
                  How to leverage AI-generated visuals effectively
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-purple-600" />
                  </div>
                  Formats that drive the highest conversion rates
                </li>
              </ul>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email</label>
                  <input type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all" placeholder="john@company.com" />
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-semibold py-4 rounded-xl mt-2 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20">
                  Download Guide
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
