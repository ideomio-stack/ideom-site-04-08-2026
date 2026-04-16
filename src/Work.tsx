import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'motion/react';
import {
  Linkedin,
  Instagram,
  Twitter,
  Menu,
  X,
  ArrowRight,
  Dribbble,
  ArrowUpRight,
  Asterisk
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from './data/siteData';

const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleHoverStart = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hover-trigger')) {
        setIsHovering(true);
        setCursorText(target.closest('.hover-trigger')?.getAttribute('data-cursor') || "");
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHoverStart);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, []);

  return (
    <motion.div
      className="cursor-follower hidden lg:flex items-center justify-center text-[10px] font-bold uppercase tracking-tighter text-white z-[9999]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none'
      }}
      animate={{
        x: mousePos.x - (isHovering ? 50 : 10),
        y: mousePos.y - (isHovering ? 50 : 10),
        scale: isHovering ? 2.5 : 1,
        width: isHovering ? 100 : 20,
        height: isHovering ? 100 : 20,
        backgroundColor: isHovering ? "rgba(0, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.1)",
        backdropFilter: isHovering ? "blur(10px)" : "blur(4px)"
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.4 }}
    >
      {isHovering && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-white"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-xl py-4 border-b border-white/10 text-white' : 'bg-transparent py-8 text-black'}`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
        <MagneticButton>
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-8 h-8 ${scrolled ? 'bg-white' : 'bg-black'} rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500`} />
            <span className="text-2xl font-bold tracking-tighter">
              IDEOM<span className={scrolled ? 'text-white/50' : 'text-black/50'}>.</span>
            </span>
          </Link>
        </MagneticButton>

        <div className="hidden md:flex items-center gap-12">
          {['Portfolio', 'Services', 'About', 'Contact'].map((item) => (
            <div key={item}>
              <MagneticButton>
                <Link to={item === 'Portfolio' ? '/work' : '/'} className="text-sm font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                  {item}
                </Link>
              </MagneticButton>
            </div>
          ))}
          <MagneticButton>
            <button
              className={`w-10 h-10 flex items-center justify-center rounded-full glass ${scrolled ? 'hover:bg-white hover:text-black border-white/20' : 'hover:bg-black hover:text-white border-black/20'} transition-all duration-500`}
              onClick={() => setIsOpen(true)}
            >
              <Menu size={20} />
            </button>
          </MagneticButton>
        </div>

        <button className={`md:hidden ${scrolled ? 'text-white' : 'text-black'}`} onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black text-white z-[100] flex flex-col"
          >
            <div className="flex justify-between items-center p-12">
              <span className="text-2xl font-bold tracking-tighter">IDEOM.</span>
              <button onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-full glass flex items-center justify-center hover:rotate-90 transition-transform duration-500 border-white/20">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-grow gap-4">
              {['Home', 'Portfolio', 'Services', 'About', 'Contact'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <Link
                    to={item === 'Home' ? '/' : (item === 'Portfolio' ? '/work' : '/')}
                    className="text-6xl md:text-9xl font-bold tracking-tighter hover:opacity-50 transition-all duration-500"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="p-12 flex justify-between items-end border-t border-white/10">
              <div className="flex gap-8">
                {['LI', 'IG', 'TW', 'BE'].map(s => (
                  <a key={s} href="#" className="text-sm font-bold tracking-widest hover:opacity-50 transition-colors">{s}</a>
                ))}
              </div>
              <p className="text-xs text-neutral-500 uppercase tracking-widest">© 2026 IDEOM STUDIO</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const MagneticButton = ({ children }: { children: React.ReactNode }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', damping: 20, stiffness: 180, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const HeroHeader = () => {
  return (
    <header className="relative w-full h-[110vh] flex items-center justify-start overflow-hidden">
      <motion.div
        className="absolute inset-0 z-20 bg-black flex items-center justify-start px-6 md:px-12"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          initial={{ scale: 4, x: '-8%' }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col leading-[0.82] font-bold tracking-tighter uppercase select-none"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <span className="text-[18vw] text-white">Crafting</span>
          <span className="text-[18vw] text-white/30 italic" style={{ fontFamily: 'var(--font-serif)' }}>Digital</span>
          <span className="text-[18vw] text-white">ideoms</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col leading-[0.82] font-bold tracking-tighter uppercase select-none px-6 md:px-12"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <span className="text-[18vw] text-black">Crafting</span>
        <span className="text-[18vw] text-black/20 italic" style={{ fontFamily: 'var(--font-serif)' }}>Digital</span>
        <div className="flex items-center gap-12">
          <span className="text-[18vw] text-black">ideoms</span>
          <motion.div
            initial={{ rotate: 0, opacity: 0, scale: 0 }}
            animate={{ rotate: 360, opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[10vw] h-[10vw] flex items-center justify-center text-black/5"
          >
            <Asterisk size="100%" strokeWidth={1} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-12 right-6 md:right-12 max-w-sm text-right z-10 hidden md:flex flex-col items-end gap-12"
      >
        <p className="text-[18px] text-neutral-500 leading-tight font-medium">
          We translate complex ideas into visual languages that resonate. Every project is a unique expression of digital excellence.
        </p>

        <div
          className="flex items-center gap-8 group cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-400 group-hover:text-black group-hover:tracking-[0.65em] transition-all duration-500">
            Explore Work
          </span>
          <div className="relative w-20 h-20 rounded-full border border-black/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-black/30 bg-white/50 backdrop-blur-sm">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ArrowRight className="rotate-90 text-neutral-600 group-hover:text-black transition-colors" size={24} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

const ProjectItem = ({ project, index }: { project: any, index: number }) => {
  const ref = useRef(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const Wrapper = (project.href || '').startsWith('/') ? Link : 'div';

  return (
    <div className="relative py-20 px-8 md:px-16" style={{ zIndex: index + 10 }}>
      <motion.article
        ref={ref}
        className="sticky top-24 w-full bg-black rounded-[40px] md:rounded-[60px] border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="p-12 md:p-24 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center min-h-[70vh]">
          <div className="absolute -left-20 top-0 text-[20vw] font-black text-white/[0.03] pointer-events-none select-none">
            0{index + 1}
          </div>

          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1 text-white relative z-10">
            <div className="space-y-4 overflow-hidden">
              <motion.span
                className="inline-block px-3 py-1 rounded-sm bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest"
              >
                {project.category}
              </motion.span>
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                {project.title}
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-neutral-400 leading-relaxed font-medium">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {(project.tags || '').split(' • ').map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs font-bold text-white/40 uppercase tracking-widest border border-white/5 px-4 py-2 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-white/10 space-y-2">
              <div className="flex items-baseline gap-4">
                <span className="text-7xl md:text-9xl font-bold tracking-tighter text-white italic" style={{ fontFamily: 'var(--font-serif)' }}>
                  {project.metric}
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 whitespace-nowrap">
                  {project.metricLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative order-1 lg:order-2 z-10">
            {/* @ts-ignore */}
            <Wrapper to={project.href || '#'} className="block">
              <motion.div
                className={`hover-trigger relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 group cursor-none`}
                data-cursor="View"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ rotateX, rotateY }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              >
                <div className="w-full h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight size={20} />
                </div>
              </motion.div>
            </Wrapper>
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default function Work() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      <div className="noise" />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-[100] origin-left"
        style={{ scaleX }}
      />
      <Cursor />
      <Navbar />

      <main className="relative z-10">
        <HeroHeader />

        <div className="relative z-20 bg-black rounded-t-[40px] md:rounded-t-[80px] -mt-20">
          <div className="max-w-[1440px] mx-auto pb-40">
            <div className="space-y-0">
              {CASE_STUDIES.map((project, i) => (
                <ProjectItem key={project.id} project={project} index={i} />
              ))}
            </div>

            <section className="mt-40 py-40 relative flex flex-col items-center text-center px-6">
              <div className="absolute inset-0 bg-white/5 blur-[150px] rounded-full" />

              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-7xl md:text-[min(12vw,180px)] font-bold tracking-tighter leading-none mb-20 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent uppercase z-10"
              >
                Let's build <br /> your <span className="text-white italic">legacy</span>
              </motion.h2>

              <MagneticButton>
                <Link
                  to="/"
                  className="group relative inline-flex items-center justify-center w-64 h-64 rounded-full glass border border-white/10 hover:border-white/50 transition-colors duration-500 z-10"
                >
                  <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
                  <div className="relative z-10 flex flex-col items-center gap-4 group-hover:text-black transition-colors duration-500 text-white font-bold">
                    <span className="text-xl uppercase tracking-widest">Start Now</span>
                    <ArrowRight size={32} />
                  </div>
                </Link>
              </MagneticButton>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white pt-40 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-white/5 blur-[150px] rounded-full translate-y-1/2 translate-x-1/2" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-40 text-left">
            <div className="col-span-1 lg:col-span-2 space-y-12">
              <span className="text-4xl font-bold tracking-tighter uppercase">IDEOM.</span>
              <p className="text-3xl md:text-5xl text-neutral-400 font-medium leading-tight max-w-xl">
                Transforming the digital landscape through intentional design.
              </p>
              <div className="flex gap-6">
                {[Linkedin, Instagram, Twitter, Dribbble].map((Icon, i) => (
                  <a key={i} href="#" className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 border border-white/10 text-white">
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Capabilities</h4>
              <ul className="space-y-4 text-sm font-medium text-neutral-400">
                {['Ads', 'AI SEO Optimization', 'SEO Optimization', 'Email Strategy', 'P/R', 'Brand Strategy'].map((item) => (
                  <li key={item} className="hover:text-white transition-colors cursor-default">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-10">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Get in touch</h4>
              <div className="space-y-6 text-2xl font-medium">
                <p>info@ideom.io</p>
                <p>+1 647-969-5294</p>
                <p className="text-neutral-400 text-lg">92 Main St, Erin, ON <br /> N0B 1T0</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-12 justify-between items-center pt-12 border-t border-white/5">
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              © 2026 IDEOM STUDIO
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
