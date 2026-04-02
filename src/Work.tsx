import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Linkedin, 
  Instagram, 
  Twitter, 
  Menu, 
  X, 
  ArrowRight,
  Dribbble,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: number;
  title: string;
  metric: string;
  metricLabel: string;
  category: string;
  tags: string;
  description: string;
  image: string;
  slug?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Oxidelta",
    metric: "+125%",
    metricLabel: "Lead Generation",
    category: "Infrastructure",
    tags: "Strategic Design • Development",
    description: "Modernizing urban infrastructure through smart design solutions.",
    image: "https://dhero.studio/wp-content/uploads/recruiterone-showcase-main.webp", // Fallback, would ideally be Oxidelta image
    slug: "/case-study/oxidelta"
  },
  {
    id: 2,
    title: "RecruiterOne",
    metric: "+60%",
    metricLabel: "Conversion Increases",
    category: "Human Resources",
    tags: "Development",
    description: "Transforming Recruitment for Entrepreneurs",
    image: "https://dhero.studio/wp-content/uploads/recruiterone-showcase-main.webp"
  },
  {
    id: 3,
    title: "Optimo Autohaus",
    metric: "+180%",
    metricLabel: "Traffic Increase",
    category: "Automotive",
    tags: "Branding • Design • Development",
    description: "Elevating the Luxury Car Experience",
    image: "https://dhero.studio/wp-content/uploads/optimo-showcase-main.webp"
  },
  {
    id: 4,
    title: "Kooki",
    metric: "+167%",
    metricLabel: "Sales Growth",
    category: "Bakery",
    tags: "Branding • Design • Development",
    description: "Cookies that dare to be different",
    image: "https://dhero.studio/wp-content/uploads/kooki-showcase-main.webp"
  },
  {
    id: 5,
    title: "MC Interior Design",
    metric: "+89%",
    metricLabel: "Traffic Growth",
    category: "Interior Design",
    tags: "Branding • Design • Development",
    description: "Well-being & Harmony to Interior Spaces",
    image: "https://dhero.studio/wp-content/uploads/cristina-micu-showcase-main.webp"
  },
  {
    id: 6,
    title: "Vignetique",
    metric: "-40%",
    metricLabel: "Bounce Rate",
    category: "Transport",
    tags: "Branding • Design • Development",
    description: "Streamlining road access in Romania",
    image: "https://dhero.studio/wp-content/uploads/vignetique-showcase-main.webp"
  },
  {
    id: 7,
    title: "Soleil",
    metric: "+42%",
    metricLabel: "Conversion Rate",
    category: "Fashion",
    tags: "Branding • Design • Development",
    description: "Elegance and Simplicity in Romanian Fashion",
    image: "https://dhero.studio/wp-content/uploads/soleil-showcase-main.webp"
  },
  {
    id: 8,
    title: "Westgrowth",
    metric: "+134%",
    metricLabel: "Market Authority",
    category: "Venture Capital",
    tags: "Branding • Design • Development",
    description: "Empowering Businesses to Scale & Thrive",
    image: "https://dhero.studio/wp-content/uploads/westgrowth-showcase-main.webp"
  },
  {
    id: 9,
    title: "sKOOLvers",
    metric: "60d",
    metricLabel: "Time-to-Market",
    category: "Education",
    tags: "Branding • Design • Development",
    description: "Redefining Education Through Innovation",
    image: "https://dhero.studio/wp-content/uploads/skoolvers-showcase-main.webp"
  }
];

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

const ProjectItem = ({ project, index }: { project: Project, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  // Tilt effect
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

  const Wrapper = project.slug ? Link : 'div';

  return (
    <motion.article 
      ref={ref}
      style={{ opacity, scale }}
      className="py-32 md:py-56 relative group border-b border-white/10 last:border-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Metric Background (Large floating number) */}
        <motion.div 
          style={{ y }}
          className="absolute -left-20 top-0 text-[20vw] font-black text-white/[0.03] pointer-events-none select-none"
        >
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </motion.div>

        <div className="lg:col-span-5 space-y-8 order-1 lg:order-1 text-white">
          <div className="space-y-4 overflow-hidden">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block px-3 py-1 rounded-sm bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest"
            >
              {project.category}
            </motion.span>
            <motion.h2 
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-none"
            >
              {project.title}
            </motion.h2>
          </div>
          
          <div className="space-y-6">
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-neutral-400 leading-relaxed font-medium"
            >
              {project.description}
            </motion.p>
            <div className="flex flex-wrap gap-3">
              {project.tags.split(' • ').map((tag, i) => (
                <motion.span 
                  key={tag} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.05) }}
                  className="text-xs font-bold text-white/40 uppercase tracking-widest border border-white/5 px-4 py-2 rounded-full"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 relative order-2 lg:order-2">
          {/* @ts-ignore */}
          <Wrapper to={project.slug || '#'} className="block">
            <motion.div 
              className={`hover-trigger relative aspect-[16/10] overflow-hidden rounded-2xl glass group cursor-none mask-reveal ${isInView ? 'active' : ''}`} 
              data-cursor="View"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ 
                rotateX, 
                rotateY,
                scale: isInView ? 1 : 0.95,
                opacity: isInView ? 1 : 0
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 150, 
                damping: 20,
                scale: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
              }}
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
            </motion.div>
          </Wrapper>

          <div className="mt-12 flex items-end justify-between">
            <div className="space-y-2 text-white">
              <h3 className="text-7xl md:text-9xl font-bold tracking-tighter">
                {project.metric}
              </h3>
              <p className="text-sm uppercase tracking-[0.3em] text-neutral-400 font-bold">
                {project.metricLabel}
              </p>
            </div>
            <div className="hidden md:block h-[1px] flex-grow mx-12 bg-white/10" />
            <motion.div 
              whileHover={{ rotate: 45, scale: 1.2 }}
              className="w-20 h-20 rounded-full glass flex items-center justify-center text-white border-white/20 border shadow-sm"
            >
              <ArrowUpRight size={32} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
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
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePos({ 
          x: (e.clientX / window.innerWidth - 0.5) * 40, 
          y: (e.clientY / window.innerHeight - 0.5) * 40 
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
  
    return (
      <header className="mb-40 md:mb-64 relative min-h-[80vh] flex flex-col justify-center">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              x: mousePos.x * 0.5, 
              y: mousePos.y * 0.5,
              scale: [1, 1.1, 1],
              opacity: [0.02, 0.04, 0.02]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-40 -left-20 w-[600px] h-[600px] bg-black blur-[120px] rounded-full" 
          />
          <motion.div 
            animate={{ 
              x: -mousePos.x * 0.8, 
              y: -mousePos.y * 0.8,
              opacity: [0.01, 0.03, 0.01]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-black blur-[100px] rounded-full" 
          />
          
          {/* Floating Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.1, 0],
                y: [-20, 20],
                x: [-10, 10]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                delay: Math.random() * 5 
              }}
              className="absolute w-[1px] h-12 bg-gradient-to-b from-transparent via-black/20 to-transparent"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%` 
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 flex items-center gap-6"
          >
            <div className="w-16 h-[1px] bg-black" />
            <span className="text-black font-bold uppercase tracking-[0.6em] text-[10px]">
              Digital Excellence Studio
            </span>
          </motion.div>
  
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div 
              style={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
              className="lg:col-span-9 text-8xl md:text-[min(12vw,180px)] font-bold tracking-tighter leading-[0.75]"
            >
              <div className="overflow-hidden py-2">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  Crafting
                </motion.div>
              </div>
              <div className="overflow-hidden py-2">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.4, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-black/20 italic"
                >
                  Digital
                </motion.div>
              </div>
              <div className="overflow-hidden py-2">
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 1.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  Work
                </motion.div>
              </div>
            </motion.div>
            
            <div className="lg:col-span-3 space-y-16 pb-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 2 }}
                className="relative"
              >
                <div className="absolute -left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-black/30 via-black/5 to-transparent" />
                <motion.p 
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl text-neutral-600 leading-tight font-medium"
                >
                  We translate complex ideas into visual languages that resonate. Every project is a unique expression of digital excellence.
                </motion.p>
              </motion.div>
  
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1.5 }}
                className="flex items-center gap-8 group cursor-pointer"
              >
                <div className="relative w-20 h-20 rounded-full border border-black/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-black/30">
                  <motion.div 
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="rotate-90" size={24} />
                  </motion.div>
                  <div className="absolute inset-0 bg-black scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full -z-10" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-600 group-hover:text-black group-hover:tracking-[0.7em] transition-all duration-500">Explore Work</span>
              </motion.div>
            </div>
          </div>
        </div>
      </header>
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
      
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 pb-24 relative z-10">
        <HeroHeader />

        <div className="relative -mx-6 md:-mx-12 px-6 md:px-12 bg-black text-white rounded-t-[40px] md:rounded-t-[80px] pt-40 pb-24">
          <div className="absolute inset-0 bg-black rounded-t-[40px] md:rounded-t-[80px]" />
          
          <div className="relative z-10">
            <section className="space-y-0">
              {projects.map((project, i) => (
                <div key={project.id}>
                  <ProjectItem project={project} index={i} />
                </div>
              ))}
            </section>

            {/* CTA Section */}
            <section className="mt-60 md:mt-80 py-40 relative">
              <div className="absolute inset-0 bg-white/5 blur-[150px] rounded-full" />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.h2 
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-7xl md:text-[min(12vw,180px)] font-bold tracking-tighter leading-none mb-20 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent uppercase"
                >
                  Let's build <br /> your <span className="text-white italic">legacy</span>
                </motion.h2>

                <MagneticButton>
                  <Link 
                    to="/" 
                    className="group relative inline-flex items-center justify-center w-64 h-64 rounded-full glass border border-white/10 hover:border-white/50 transition-colors duration-500"
                  >
                    <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
                    <div className="relative z-10 flex flex-col items-center gap-4 group-hover:text-black transition-colors duration-500 text-white">
                      <span className="text-xl font-bold uppercase tracking-widest">Start Now</span>
                      <ArrowRight size={32} />
                    </div>
                  </Link>
                </MagneticButton>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
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
