import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  BarChart,
  Calendar,
  Menu,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Data
import {
  CAMPAIGNS,
  TRAIL_IMAGES
} from './data/siteData';

// Components
import { IntroController } from './components/IntroController';
import { RotatingHeadline } from './components/RotatingHeadline';
import { CircularArcLogos } from './components/CircularArcLogos';
import { ImageTrail } from './components/ImageTrail';
import { ServicesMarquee } from './components/ServicesMarquee';
import { ScrollDrivenTicker } from './components/ScrollDrivenTicker';
import { PremiumButton } from './components/PremiumButton';
import { CaseStudySlider } from './components/CaseStudySlider';

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
      {/* Global Motion Engine Controller */}
      <IntroController />
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4  border-b border-black bg-[#F5F5F5] shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="text-4xl font-bold tracking-tighter text-black flex items-center leading-none" style={{ fontFamily: "var(--font-circular)" }}>
            ideom<span className="text-[#1F2F2A] text-[0.92em] translate-y-[14px] leading-none">*</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B6B6B]">
            <a href="#services" className="hover:text-black transition-colors">Services</a>
            <Link to="/work" className="hover:text-black transition-colors">Work</Link>
            <a href="#about" className="hover:text-black transition-colors">About</a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold text-black hover:text-black transition-colors"
            >
              Free Guide
            </button>
            <PremiumButton href="#contact" size="sm">
              Let's Collaborate
            </PremiumButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#6B6B6B] hover:text-black"
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
            className="fixed inset-0 z-40 bg-[#F5F5F5]  pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-medium text-black">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <Link to="/work" onClick={() => setIsMenuOpen(false)}>Work</Link>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
              <button
                onClick={() => { setIsMenuOpen(false); setIsModalOpen(true); }}
                className="text-left text-[#1F2F2A]"
              >
                Free Guide
              </button>
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 bg-black text-[#FFFFFF] px-6 py-4 rounded-none text-lg font-semibold shadow-none shadow-sm"
              >
                Let's Collaborate
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full overflow-x-hidden">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto relative pt-40 pb-16 md:pt-56 md:pb-24 h-auto px-6">

          <section className="px-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl"
            >
              <RotatingHeadline />

              <div className="flex flex-col md:flex-row gap-8 md:items-end justify-between mt-12">
                <p className="text-lg md:text-xl text-[#6B6B6B] max-w-md leading-relaxed">
                  At Ideom, we provide data-driven digital marketing solutions to elevate your brand and dominate your market.
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <PremiumButton href="#contact">
                    Get Started
                  </PremiumButton>
                </div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Client Logo Arc */}
        <div className="max-w-6xl mx-auto">
          <CircularArcLogos />
        </div>

        {/* PROWEB-style Image Trail Section */}
        <section className="relative w-full px-6">
          <div className="max-w-6xl mx-auto relative" style={{ height: '40vh', minHeight: '320px' }}>
            {/* Invisible spacer — image trail is active across this zone */}
            <div className="absolute inset-0 z-10">
              <ImageTrail images={TRAIL_IMAGES} />
            </div>
          </div>
        </section>

        {/* Services Header */}
        {/* Seamless Transition Wrapper - Blends from White to Dark and back to Grey */}
        {/* Seamless Transition Wrapper - Blends from Page Background to Dark and back */}
        <div className="w-full relative" style={{
          background: 'linear-gradient(to bottom, #F8F8F8 0%, #F5F5F5 15%, #000000 50%, #000000 85%, #F5F5F5 100%)',
          maskImage: 'linear-gradient(to bottom, transparent, black 150px)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 150px)'
        }}>



          <section id="services" className="pt-12 pb-8 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-black">
                Where strategy meets <span className="font-serif italic text-[#6B6B6B]">execution.</span>
              </h2>
            </motion.div>
          </section>

          {/* New Ads Marquee section replaces the traditional Services section */}
          <section id="ads" className="bg-transparent overflow-hidden">
            <ServicesMarquee />
          </section>

          {/* How We Do It ticker moved here */}
          <ScrollDrivenTicker />

          {/* About / Stats Section relocated under the ticker */}
          <section id="about" className="pb-24 pt-4 px-6 bg-transparent">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8 text-white">
                  Crafting exceptional, data-driven strategies to drive impactful results with <span className="font-serif italic text-white/40">precision.</span>
                </h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-none border border-white bg-white text-black">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Creativity</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-none border border-white bg-transparent text-white">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">Strategy</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-none border border-white bg-white text-black">
                    <BarChart className="w-4 h-4" />
                    <span className="text-sm font-medium">Growth</span>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                  <div className="text-6xl md:text-7xl font-serif italic text-white">+40</div>
                  <div className="text-sm text-white/60 uppercase tracking-wider font-medium">Total Projects</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-6xl md:text-7xl font-serif italic text-white">+15</div>
                  <div className="text-sm text-white/60 uppercase tracking-wider font-medium">Years combined Exp</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-6xl md:text-7xl font-serif italic text-white">99%</div>
                  <div className="text-sm text-white/60 uppercase tracking-wider font-medium">Retention</div>
                </div>
              </div>

            </div>
          </section>

          <CaseStudySlider />

          {/* Campaign Showcase — Swiper Wheel Carousel */}
          <section
            id="work"
            className="py-24"
            style={{
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              overflow: 'hidden',
              backgroundColor: 'transparent',
            }}
          >
            {/* Header row */}
            <div className="max-w-6xl mx-auto px-6 mb-12 flex items-center justify-between">
              <h2
                className="text-sm md:text-base font-bold tracking-tighter uppercase text-white/70"
                style={{ fontFamily: "var(--font-circular)" }}
              >
                Campaigns for top brands
              </h2>
              <span
                className="text-sm md:text-base font-bold tracking-tighter uppercase text-white/70"
                style={{ fontFamily: "var(--font-circular)" }}
              >
                Designed by Ideom
              </span>
            </div>

            {/* Swiper Coverflow Wheel */}
            <div style={{ paddingBottom: '60px' }}>
              <Swiper
                modules={[EffectCoverflow, Autoplay]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                loop={true}
                speed={5000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: false,
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 1,
                  slideShadows: false,
                }}
                watchSlidesProgress={true}
                allowTouchMove={true}
                style={{ overflow: 'visible', padding: '40px 0' }}
              >
                {[...CAMPAIGNS, ...CAMPAIGNS, ...CAMPAIGNS].map((item, i) => (
                  <SwiperSlide
                    key={i}
                    style={{
                      width: '280px',
                      height: '650px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {({ isActive }: { isActive: boolean }) => (
                      <div className="relative w-full h-full">
                        <img
                          src={item.src}
                          alt={item.alt}
                          draggable={false}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                            display: 'block',
                            borderRadius: '16px',
                            userSelect: 'none',
                          }}
                        />
                        {/* 60% Black Tint Overlay for non-active slides */}
                        <div
                          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-0' : 'opacity-100'}`}
                        />
                      </div>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Scroll-down Lottie indicator (optional mouse icon) */}
            <div className="flex justify-center mt-4">
              <div
                className="w-[30px] h-[50px] rounded-full border-2 border-black/20 flex items-start justify-center pt-2"
              >
                <motion.div
                  className="w-1.5 h-3 rounded-full bg-black/30"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="bg-[#F5F5F5]  border border-black shadow-none rounded-[3rem] p-8 md:p-16 lg:p-24 relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16"
            >
              <div className="lg:col-span-5">
                <div className="inline-block px-4 py-1.5 rounded-none bg-[#F5F5F5] text-[#1F2F2A] text-xs font-bold tracking-wider uppercase mb-6">
                  Let's make it happen
                </div>
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 text-black">
                  Ready to<br />
                  <span className="font-serif italic text-slate-500">Get started</span>
                </h2>
              </div>

              <div className="lg:col-span-7">
                {/* Tabs */}
                <div className="flex gap-8 border-b border-black/10 mb-8">
                  <button
                    onClick={() => setContactTab('quote')}
                    className={`pb-4 text-xl font-medium border-b-2 transition-colors ${contactTab === 'quote' ? 'border-black text-black' : 'border-transparent text-[#6B6B6B] hover:text-[#6B6B6B]'}`}
                  >
                    Request a quote
                  </button>
                  <button
                    onClick={() => setContactTab('call')}
                    className={`pb-4 text-xl font-medium border-b-2 transition-colors ${contactTab === 'call' ? 'border-black text-black' : 'border-transparent text-[#6B6B6B] hover:text-[#6B6B6B]'}`}
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
                          <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Name *</label>
                          <input type="text" required className="w-full bg-[#F5F5F5] border border-black/10 rounded-none px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/50 transition-all shadow-sm" placeholder="Full name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Email *</label>
                          <input type="email" required className="w-full bg-[#F5F5F5] border border-black/10 rounded-none px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/50 transition-all shadow-sm" placeholder="Business email" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Message *</label>
                        <textarea required rows={4} className="w-full bg-[#F5F5F5] border border-black/10 rounded-none px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/50 transition-all shadow-sm resize-none" placeholder="Tell us about your project"></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6B6B6B] mb-2">Budget *</label>
                        <div className="relative">
                          <select required className="w-full bg-[#F5F5F5] border border-black/10 rounded-none px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/50 transition-all shadow-sm appearance-none">
                            <option value="">Select...</option>
                            <option value="5k-10k">$5K - $10K</option>
                            <option value="10k-25k">$10K - $25K</option>
                            <option value="25k-50k">$25K - $50K</option>
                            <option value="50k+">$50K +</option>
                          </select>
                          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-[#6B6B6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#6B6B6B] mb-3">How can we help you *</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {['Ads', 'AI SEO', 'SEO', 'Email', 'P/R', 'Brand Strategy'].map((service) => (
                            <label key={service} className="flex items-center gap-3 cursor-pointer group">
                              <div className="relative flex items-center justify-center w-5 h-5 border border-black/10 rounded bg-[#F5F5F5] group-hover:border-black transition-colors">
                                <input type="checkbox" className="peer absolute opacity-0 w-full h-full cursor-pointer" />
                                <div className="w-2.5 h-2.5 bg-black rounded-[2px] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                              </div>
                              <span className="text-sm text-[#6B6B6B]">{service}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <PremiumButton type="submit" className="w-full">
                        Send message
                      </PremiumButton>
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
                        <h3 className="text-2xl font-bold tracking-tighter text-black mb-4" style={{ fontFamily: "var(--font-circular)" }}>No sales pitch</h3>
                        <p className="text-[#6B6B6B] leading-relaxed">
                          Just honest advice on whether we're the right fit. Let's bring your vision to life!
                        </p>
                      </div>
                      <div className="space-y-4">
                        <a href="https://portal.ideom.io/widget/booking/gDSNwtHTHOesH52PujCg" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-[#F5F5F5] border border-black/10 rounded-none hover:bg-[#F5F5F5] hover:border-black transition-all shadow-sm hover:shadow-none border border-black">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1F2F2A] rounded-none flex items-center justify-center text-white">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold tracking-tighter text-black" style={{ fontFamily: "var(--font-circular)" }}>15 Min Meeting</h4>
                              <span className="text-sm text-[#6B6B6B]">Quick alignment call</span>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-none bg-[#F5F5F5] flex items-center justify-center group-hover:bg-black group-hover:text-[#FFFFFF] transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </a>
                        <a href="https://portal.ideom.io/widget/booking/XfvzSstcxxqp36Zr2e6h" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between p-4 bg-[#F5F5F5] border border-black/10 rounded-none hover:bg-[#F5F5F5] hover:border-black transition-all shadow-sm hover:shadow-none border border-black">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1F2F2A] rounded-none flex items-center justify-center text-white">
                              <Calendar className="w-6 h-6" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold tracking-tighter text-black" style={{ fontFamily: "var(--font-circular)" }}>30 Min Meeting</h4>
                              <span className="text-sm text-[#6B6B6B]">Deep dive strategy</span>
                            </div>
                          </div>
                          <div className="w-10 h-10 rounded-none bg-[#F5F5F5] flex items-center justify-center group-hover:bg-black group-hover:text-[#FFFFFF] transition-colors">
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
      <footer className="border-t border-black/10/50 pt-20 pb-10 px-6 bg-[#F5F5F5] backdrop-blur-sm mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <a href="#" className="text-3xl font-bold tracking-tighter block mb-6 text-black">
                ideom<span className="text-[#1F2F2A]">.</span>
              </a>
              <p className="text-[#6B6B6B] max-w-sm mb-8">
                Empowering businesses with innovative digital marketing solutions. Let's create something amazing together.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover="hover"
                    className="w-10 h-10 rounded-none bg-[#F5F5F5] shadow-sm border border-black/10 flex items-center justify-center hover:border-black transition-all"
                  >
                    <span className="sr-only">{social}</span>
                    <motion.span
                      variants={{
                        hover: { rotate: 360 }
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="text-2xl font-bold translate-y-[2px]"
                      style={{ fontFamily: "var(--font-circular)" }}
                    >
                      *
                    </motion.span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-black">Sitemap</h4>
              <ul className="space-y-4 text-[#6B6B6B]">
                <li><a href="#about" className="hover:text-black transition-colors">About us</a></li>
                <li><Link to="/work" className="hover:text-black transition-colors">Work</Link></li>
                <li><a href="#ads" className="hover:text-black transition-colors">Services</a></li>
                <li><Link to="/free-guide" className="hover:text-black transition-colors">Free Guide</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6 text-black">Contact</h4>
              <ul className="space-y-4 text-[#6B6B6B]">
                <li>info@ideom.io</li>
                <li>+1 647-969-5294</li>
                <li>92 Main St, Erin, ON<br />N0B 1T0</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10/50 text-sm text-[#6B6B6B]">
            <p>© 2025 Ideom Digital Marketing. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-black transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Lead Gen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#F5F5F5] rounded-none p-8 max-w-md w-full shadow-none relative border border-black/5"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-[#6B6B6B] hover:text-[#6B6B6B] bg-[#F5F5F5] hover:bg-[#F5F5F5] p-2 rounded-none transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-block px-4 py-1.5 rounded-none bg-[#F5F5F5] text-[#1F2F2A] text-xs font-bold tracking-wider uppercase mb-6">
                Free Guide
              </div>
              <h3 className="text-2xl font-bold mb-2 text-black">Get Instant Access</h3>
              <p className="text-[#6B6B6B] mb-6 text-sm leading-relaxed">
                Fill out your details to download the free guide: <strong>Visual formats every brand should use in 2025</strong>. You'll learn:
              </p>
              <ul className="space-y-3 mb-8 text-sm text-[#6B6B6B]">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#F5F5F5] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-none bg-black" />
                  </div>
                  Top 5 visual trends dominating 2025
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#F5F5F5] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-none bg-black" />
                  </div>
                  How to leverage AI-generated visuals effectively
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-none bg-[#F5F5F5] flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-none bg-black" />
                  </div>
                  Formats that drive the highest conversion rates
                </li>
              </ul>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div>
                  <label className="block text-sm font-medium text-[#6B6B6B] mb-1.5">Full Name</label>
                  <input type="text" required className="w-full bg-[#F5F5F5] border border-black/10 rounded-none px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/50 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6B6B6B] mb-1.5">Work Email</label>
                  <input type="email" required className="w-full bg-[#F5F5F5] border border-black/10 rounded-none px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black/50 transition-all" placeholder="john@company.com" />
                </div>
                <PremiumButton type="submit" className="w-full">
                  Download guide
                </PremiumButton>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
