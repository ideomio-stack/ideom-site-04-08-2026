import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
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
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

/* ── Logo Data ────────────────────────────────────────────── */

type LogoEntry =
  | { type: "image"; src: string; alt: string; scale?: number }
  | { type: "text"; text: string; sub?: string; alt: string; scale?: number };

const LOGOS: LogoEntry[] = [
  { type: "image", src: "/client-logos/AAPPTEC-logo.png", alt: "AAPPTEC" },
  { type: "image", src: "/client-logos/faccia_brutto-logo_brandlogos.net_lg7fu-512x216.png", alt: "Faccia Brutto" },
  { type: "image", src: "/client-logos/Coextro-b.png", alt: "Coextro" },
  { type: "image", src: "/client-logos/hiab-corporation-logo-1024x341.png", alt: "Hiab Corporation" },
  { type: "image", src: "/client-logos/sultan-athletic.png", alt: "Sultan Athletic" },
  { type: "image", src: "/client-logos/SIDIA_Brandmark.png", alt: "SIDIA" },
  { type: "image", src: "/client-logos/WESCO_Logo.png", alt: "WESCO International" },
  { type: "image", src: "/client-logos/signet-logo.avif", alt: "Signet" },
  { type: "image", src: "/client-logos/NORLHA_Tibetan_logo.avif", alt: "Norlha" },
  { type: "image", src: "/client-logos/ZSJ_logo_3f401257-835a-41ba-bda1-c02108d9b08e.avif", alt: "ZSJ" },
  { type: "image", src: "/client-logos/brg_logo.png", alt: "BRG" },
  { type: "image", src: "/client-logos/mutimer_no_bg_clean.png", alt: "Mutimer" },
  { type: "image", src: "/client-logos/mesoblast-limited-logo-512x68.png", alt: "Mesoblast" },
  { type: "image", src: "/client-logos/propertybox.webp", alt: "PropertyBox", scale: 1.5 },
  { type: "image", src: "/client-logos/universidad-nacional-de-colombia-vector-logo.png", alt: "Universidad Nacional de Colombia" },
  { type: "image", src: "/client-logos/yokogawa-electric-logo-1024x155.png", alt: "Yokogawa Electric" },
];

const LOGOS_TRIPLED = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

/* ══════════════════════════════════════════════════════════════
   GLOBAL MOTION ENGINE — single source of truth for all motion
   ══════════════════════════════════════════════════════════════ */

type MotionState = "loading" | "intro" | "ready" | "interactive";

interface MotionEngine {
  velocity: number;
  targetVelocity: number;
  progress: number;
  state: MotionState;
  scrollDelta: number;           // accumulated scroll delta this frame
  _lastScrollY: number;
  _raf: number;
  _listeners: Set<() => void>;
}

const Motion: MotionEngine = {
  velocity: 0,
  targetVelocity: 0,
  progress: 0,
  state: "loading",
  scrollDelta: 0,
  _lastScrollY: typeof window !== "undefined" ? window.scrollY : 0,
  _listeners: new Set(),
  _raf: 0,
};

// Constants
const MOTION_EASING = 0.08;        // velocity interpolation toward target
const MOTION_DAMPING = 0.95;       // velocity decay per frame
const MOTION_BASE_SPEED = 0.56;    // base forward velocity (logo carousel)
const MOTION_SCROLL_MULT = 0.098;  // scroll delta → velocity multiplier (35% slower)
const MOTION_INTRO_INJECT = 0.6;   // initial momentum injected after intro

function startMotionEngine() {
  // Scroll listener — adds delta, not absolute position
  const onScroll = () => {
    if (Motion.state !== "interactive") return;
    const y = window.scrollY;
    const delta = y - Motion._lastScrollY;
    Motion.scrollDelta += delta;
    Motion._lastScrollY = y;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // Core rAF loop
  function update() {
    // 1. Damping only applies to "targetVelocity" (the scroll momentum)
    Motion.targetVelocity *= MOTION_DAMPING;

    // 2. Feed scroll delta into target velocity (allow negative for scrolling up)
    if (Motion.state === "interactive" && Motion.scrollDelta !== 0) {
      Motion.targetVelocity += Motion.scrollDelta * MOTION_SCROLL_MULT;
      Motion.scrollDelta = 0;
    }

    // 3. Smooth velocity interpolation toward (Base + Momentum)
    const currentTarget = MOTION_BASE_SPEED + Motion.targetVelocity;
    Motion.velocity += (currentTarget - Motion.velocity) * MOTION_EASING;

    // Accumulate progress
    Motion.progress += Motion.velocity;

    // Notify subscribers
    Motion._listeners.forEach((fn) => fn());

    Motion._raf = requestAnimationFrame(update);
  }

  Motion._raf = requestAnimationFrame(update);

  return () => {
    window.removeEventListener("scroll", onScroll);
    cancelAnimationFrame(Motion._raf);
  };
}

/** Subscribe to motion ticks — returns cleanup function */
function useMotionTick(callback: () => void) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const fn = () => cbRef.current();
    Motion._listeners.add(fn);
    return () => { Motion._listeners.delete(fn); };
  }, []);
}

/* ── Intro State Controller ──────────────────────────────── */
function IntroController() {
  useEffect(() => {
    // Start the global engine once
    const cleanup = startMotionEngine();

    // State machine: loading → intro → ready → interactive
    Motion.state = "intro";

    // After intro animation completes (~1.2s), transition to interactive
    const introTimer = setTimeout(() => {
      Motion.state = "ready";

      // Inject initial momentum — the "shooting star" carryover
      Motion.targetVelocity = MOTION_INTRO_INJECT;

      // Small delay then fully interactive
      setTimeout(() => {
        Motion.state = "interactive";
      }, 200);
    }, 1200);

    return () => {
      clearTimeout(introTimer);
      cleanup();
    };
  }, []);

  return null; // No visual output — pure controller
}

/* ══════════════════════════════════════════════════════════════
   ROTATING HEADLINE — Continuous Auto-Cycle + Scroll Momentum
   ══════════════════════════════════════════════════════════════ */

const HEADLINE_WORDS = ["Gain traction.", "Get sales.", "Grow your business."];

function RotatingHeadline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressRef = useRef(0);
  const lastScrollY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    let animationFrameId: number;

    const tick = () => {
      // 1. Steady auto-advance (approx 1 word every 2s at 60fps)
      progressRef.current += 0.008;

      // 2. Add scroll delta (scrolling seamlessly fast-forwards or reverses from current point)
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      progressRef.current += deltaY * 0.002;

      const totalWords = HEADLINE_WORDS.length;
      // Safe positive modulo
      let safeProgress = progressRef.current % totalWords;
      if (safeProgress < 0) safeProgress += totalWords;

      const active = Math.floor(safeProgress);
      setActiveIndex((prev) => {
        // Only trigger React state updates if the index actually changed
        if (prev !== active) return active;
        return prev;
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <h1 className="text-[12vw] md:text-[8vw] leading-[0.9] font-medium tracking-tight mb-8 text-black">
      {HEADLINE_WORDS.map((word, i) => (
        <span
          key={word}
          className="block"
          style={{
            opacity: i === activeIndex ? 1 : 0.15,
            transform: i === activeIndex ? "translateY(0) scale(1)" : "translateY(6px) scale(0.98)",
            // Faster transitions for a snappier, non-glitchy feel
            transition: "opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {i === HEADLINE_WORDS.length - 1 ? (
            <span className="font-serif italic text-[#6B6B6B]">{word}</span>
          ) : (
            word
          )}
        </span>
      ))}
    </h1>
  );
}

/* ══════════════════════════════════════════════════════════════
   CIRCULAR ARC LOGO CAROUSEL — driven by global motion engine
   ══════════════════════════════════════════════════════════════ */

const ARC_SAGITTA = 40;
const CENTER_SCALE_BOOST = 0.08;

function circleArcOffset(d: number, hw: number, sagitta: number): number {
  if (hw <= 0 || sagitta <= 0) return 0;
  const R = (hw * hw + sagitta * sagitta) / (2 * sagitta);
  const dClamped = Math.min(Math.abs(d), hw);
  const underRoot = R * R - dClamped * dClamped;
  return R - Math.sqrt(Math.max(underRoot, 0));
}

/* ══════════════════════════════════════════════════════════════
   VERTICAL TICKER — Agency Word Rotation
   ══════════════════════════════════════════════════════════════ */

const SCROLL_TICKER_WORDS = [
  "growth",
  "acquisition",
  "conversion",
  "retention",
  "systems",
  "automation",
  "scale",
  "intelligence"
];

const CASE_STUDIES = [
  {
    title: "Leelo Active",
    subtitle: "How we helped Leelo Active make an extra $1M+",
    description: "This case study is about an 8-figure activewear brand in Australia, specifically how they changed their retention marketing strategy to capture an additional $1M in yearly revenue."
  },
  {
    title: "Flex Fitness Equipment",
    subtitle: "How Flex Fitness Equipment Scaled Lifecycle Revenue by 116%",
    description: "We restructured their entire retention ecosystem across email, SMS, and on-site touchpoints—driving a 116% increase in performance through better segmentation, timing, and offer strategy."
  },
  {
    title: "Fashion",
    subtitle: "How This Fashion Brand Added $800K in 10 Weeks Through Full-Funnel Optimization",
    description: "By aligning acquisition, retention, and conversion flows, we unlocked hidden revenue across the funnel—turning underperforming traffic into high-value customers at scale."
  },
  {
    title: "Signet Sunday",
    subtitle: "How We Helped Signet Sunday Sell 1,200 Units in 2 Hours",
    description: "A coordinated campaign across email, SMS, and launch strategy created a high-intensity demand spike—driving rapid sell-through while strengthening brand equity."
  }
];

const SERVICES = [
  { title: "Ads", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-1-2.jpg", desc: "Data-driven performance marketing to maximize ROI." },
  { title: "AI SEO Optimization", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-8.jpg", desc: "Optimizing content to be cited, mentioned, or recommended by ChatGPT, Claude, Perplexity, and Google's AI Overviews." },
  { title: "SEO Optimization", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-3-2.jpg", desc: "Technical and content-driven strategies to dominate search." },
  { title: "Email Strategy", img: "https://itscraft.com/wp-content/uploads/2025/11/SundryCraft_PaulaCodoner-2.jpg", desc: "High-converting lifecycle campaigns and newsletters." },
  { title: "P/R", img: "/pr-flower-2.jpeg", desc: "Strategic communications to build authority and trust." },
  { title: "Brand Strategy", img: "/flower-brand-strategy.jpeg", desc: "Positioning and identity to make your business unforgettable." },
];

function ServicesMarquee() {
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const momentum = useRef(0);

  useEffect(() => {
    if (containerRef.current) {
      // Width of a single set (array is doubled)
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  useMotionTick(() => {
    if (isDragging || !contentWidth) return;

    // Decay momentum back to zero over time
    momentum.current *= 0.96;

    // Sync speed with global engine (base 0.56 + scroll delta)
    // and add the local momentum from drags/grabs
    // We negate (base speed * 1.5) to keep it moving left as standard
    const baseAutoSpeed = -0.58;
    const move = baseAutoSpeed + (Motion.velocity * -1.0) + momentum.current;

    let nextX = x.get() + move;

    // Wrap Logic
    if (nextX <= -contentWidth) nextX += contentWidth;
    if (nextX > 0) nextX -= contentWidth;

    x.set(nextX);
  });

  return (
    <motion.div
      ref={containerRef}
      drag="x"
      style={{ x, width: "max-content" }}
      onDragStart={() => setIsDragging(true)}
      onDrag={() => {
        // Enforce wrapping during drag to keep it truly infinite
        const currentX = x.get();
        if (currentX <= -contentWidth) x.set(currentX + contentWidth);
        if (currentX > 0) x.set(currentX - contentWidth);
      }}
      onDragEnd={(_, info) => {
        setIsDragging(false);
        // Inject drag speed into the momentum ref
        momentum.current = info.velocity.x * 0.018;
      }}
      className="flex gap-8 md:gap-12 py-10 cursor-grab active:cursor-grabbing will-change-transform"
    >
      {[...SERVICES, ...SERVICES].map((service, i) => (
        <div
          key={i}
          className="flex-shrink-0 flex flex-col gap-6 w-[80vw] md:w-[45vw] lg:w-[352px] select-none"
        >
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#F5F5F5] shadow-sm border border-black/5 group">
            <img
              src={service.img}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
              draggable={false}
            />
          </div>
          <div className="px-2">
            <h3 className="text-2xl font-medium mb-3 text-black transition-colors">
              {service.title}
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed text-base">
              {service.desc}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function ScrollDrivenTicker() {
  const [index, setIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef(0);

  // Force off-screen at mount — guaranteed hidden before any scroll
  useEffect(() => {
    if (headlineRef.current) {
      headlineRef.current.style.transform = 'translateX(-100vw)';
    }
  }, []);

  useMotionTick(() => {
    if (!containerRef.current || !headlineRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Slide starts the moment section top crosses the viewport bottom edge
    // and locks once it has scrolled 600px into view
    const entranceRange = 600;
    const progress = Math.min(Math.max((windowH - rect.top) / entranceRange, 0), 1);

    if (progress < 1) {
      // Ease-out feel: ease the position mapping
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const x = (1 - eased) * -100;
      headlineRef.current.style.transform = `translateX(${x}vw)`;
      if (isLocked) setIsLocked(false);
    } else {
      headlineRef.current.style.transform = `translateX(0)`;
      if (!isLocked) setIsLocked(true);
    }

    if (progress === 1) {
      timerRef.current += 16.67;
      if (timerRef.current >= 1900) {
        setIndex((prev) => (prev + 1) % SCROLL_TICKER_WORDS.length);
        timerRef.current = 0;
      }
    }
  });

  const words = [...SCROLL_TICKER_WORDS, SCROLL_TICKER_WORDS[0]];

  return (
    // overflow-x-hidden clips the slide-in without cutting the ticker words vertically
    <section
      ref={containerRef}
      className="bg-white py-20 overflow-x-hidden flex flex-col justify-center items-center"
      style={{
        // Full-bleed escape from the max-w-6xl mx-auto parent container
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      <div
        ref={headlineRef}
        className="flex items-baseline gap-x-4 whitespace-nowrap will-change-transform"
      >
        {/* Static text — flush left from screen edge */}
        <span className="text-[6vw] font-medium tracking-tighter text-black leading-none">
          Human-centered
        </span>

        {/* Ticker — font-size on this div so height em resolves correctly */}
        <div
          className="text-[6vw] relative inline-block overflow-hidden align-top"
          style={{ height: '1.3em' }}
        >
          <motion.div
            animate={{ y: `-${index * 1.3}em` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col leading-[1.1]"
          >
            {words.map((word, i) => (
              <div
                key={i}
                className="flex items-center font-medium tracking-tighter"
                style={{
                  height: '1.3em',
                  filter: index === i + 1 ? 'blur(2px)' : 'blur(0px)',
                  transition: 'filter 0.4s ease-out',
                }}
              >
                {word}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PREMIUM BUTTON — Unified black container with rotating asterisk
   ══════════════════════════════════════════════════════════════ */

function PremiumButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  size = "default"
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  size?: "default" | "sm";
}) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center gap-4 bg-[#eaeaea] p-[12px] px-[18px] rounded-[20px] 
        border border-black/10 group cursor-pointer transition-all duration-300 ${className} 
        ${size === "sm" ? "scale-90 origin-left" : ""}`}
    >
      <div
        className="w-12 h-12 rounded-[14px] flex items-center justify-center transition-colors duration-500 shadow-sm overflow-hidden"
        style={{ backgroundColor: isHovered ? "#000000" : "white" }}
      >
        <motion.div
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full flex items-center justify-center p-0 m-0"
        >
          <span
            className="text-4xl font-bold leading-none select-none transition-colors duration-500"
            style={{
              color: isHovered ? "white" : "#1F2F2A",
              marginTop: '0.22em'
            }}
          >
            *
          </span>
        </motion.div>
      </div>

      {/* 2. Text */}
      <span className="text-[20px] font-medium tracking-tight text-black whitespace-nowrap pr-2">
        {children}
      </span>
    </div>
  );

  if (href) return <a href={href} className="inline-block">{content}</a>;
  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}

function PremiumArrowButton({
  onClick,
  direction,
  disabled
}: {
  onClick: () => void;
  direction: 'left' | 'right';
  disabled: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-14 h-14 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border ${disabled ? 'bg-[#F5F5F5] border-black/5 text-black/10 cursor-not-allowed' : 'bg-black border-white/10 text-white cursor-pointer hover:bg-black/90'}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Asterisk slide */}
        <motion.span
          animate={{
            rotate: isHovered ? 90 : 0,
            y: isHovered ? "-120%" : "0%"
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-bold leading-none select-none pt-[0.1em]"
        >
          *
        </motion.span>
        {/* Arrow slide */}
        <motion.span
          animate={{
            y: isHovered ? "0%" : "120%"
          }}
          initial={{ y: "120%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon className="w-6 h-6" />
        </motion.span>
      </div>
    </button>
  );
}

function CaseStudySlider() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const itemsPerView = width < 768 ? 1 : width < 1024 ? 2 : 3;
  const gap = 24; // 6 in tailwind is 24px

  const next = () => {
    if (index < CASE_STUDIES.length - itemsPerView) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="py-24 overflow-hidden bg-transparent">
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <span className="text-xs font-bold tracking-[0.2em] text-white/50 uppercase mb-4 block">
          PROVEN AT SCALE
        </span>
        <h2 className="text-5xl md:text-6xl font-medium text-white leading-[1.05] mb-8">
          Retention Wins<br />Across Industries
        </h2>
        <p className="text-lg text-white/60 max-w-xl font-medium">
          We are committed to your growth and always want to get the most out of the email channel.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Navigation Buttons */}
        <div className="flex justify-end gap-3 mb-8">
          <PremiumArrowButton
            onClick={prev}
            direction="left"
            disabled={index === 0}
          />
          <PremiumArrowButton
            onClick={next}
            direction="right"
            disabled={index >= CASE_STUDIES.length - itemsPerView}
          />
        </div>

        <div className="overflow-visible" ref={containerRef}>
          <motion.div
            className="flex gap-6 will-change-transform"
            animate={{
              x: `calc(-${index * (100 / itemsPerView)}% - ${index * (gap / itemsPerView)}px)`
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{
              left: -((CASE_STUDIES.length - itemsPerView) * (100 / itemsPerView) * containerRef.current?.offsetWidth! / 100),
              right: 0
            }}
            onDragEnd={(_, info) => {
              const threshold = 50;
              if (info.offset.x < -threshold) next();
              else if (info.offset.x > threshold) prev();
            }}
          >
            {CASE_STUDIES.map((study, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 bg-white/5 border border-white/10 rounded-[32px] p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 group select-none"
                style={{
                  width: `calc(${100 / itemsPerView}% - ${(gap * (itemsPerView - 1)) / itemsPerView}px)`,
                  minHeight: '420px'
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                  borderColor: "rgba(0,0,0,0.1)"
                }}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="text-sm font-bold tracking-tight text-white/80">
                      {study.title}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-white leading-tight tracking-tight">
                    {study.subtitle}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-white/60 leading-relaxed font-medium">
                  {study.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CircularArcLogos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const innersRef = useRef<(HTMLDivElement | null)[]>([]);

  const posRef = useRef(0);
  const layoutInfo = useRef<{ centerOffset: number }[]>([]);
  const loopWidthRef = useRef(0);

  // Measure natural widths recursively as images load
  useEffect(() => {
    if (!stripRef.current) return;

    const updateMetrics = () => {
      if (!slotsRef.current.length) return;
      const originalCount = LOGOS.length;
      if (!slotsRef.current[originalCount]) return;

      loopWidthRef.current = slotsRef.current[originalCount]!.offsetLeft;

      layoutInfo.current = slotsRef.current.map((el) => {
        if (!el) return { centerOffset: 0 };
        return { centerOffset: el.offsetLeft + el.offsetWidth / 2 };
      });
    };

    updateMetrics();

    const ro = new ResizeObserver(() => {
      updateMetrics();
    });

    ro.observe(stripRef.current);
    return () => ro.disconnect();
  }, [LOGOS.length]);

  // Subscribe to global motion engine — NO local rAF
  useMotionTick(() => {
    if (!containerRef.current || !stripRef.current || !loopWidthRef.current || !layoutInfo.current.length) return;

    const hw = window.innerWidth / 2;

    // Position is driven directly by global velocity
    posRef.current += Motion.velocity;

    const loopW = loopWidthRef.current;
    const scrollX = ((posRef.current % loopW) + loopW) % loopW; // safe modulo

    stripRef.current.style.transform = `translate3d(-${scrollX}px, 0, 0)`;

    // Arc offsets per logo
    for (let i = 0; i < LOGOS_TRIPLED.length; i++) {
      const el = innersRef.current[i];
      if (!el) continue;
      const info = layoutInfo.current[i];
      if (!info) continue;

      const screenX = info.centerOffset - scrollX;
      const d = screenX - hw;
      const sagittaOffset = circleArcOffset(d, hw, ARC_SAGITTA);
      const distRatio = Math.min(Math.abs(d) / hw, 1);
      const scaleBoost = CENTER_SCALE_BOOST * (1 - distRatio);

      el.style.transform = `translate3d(0, -${sagittaOffset}px, ${scaleBoost * 150}px) scale(${1 + scaleBoost})`;
    }
  });

  return (
    <section className="pt-8 pb-12 mx-6 overflow-hidden">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#6B6B6B] mb-16 mt-8">
        Trusted by industry leaders
      </p>

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "150px", perspective: "1200px" }}
      >
        <div
          ref={stripRef}
          className="absolute flex items-center gap-16"
          style={{ willChange: "transform" }}
        >
          {LOGOS_TRIPLED.map((logo, i) => (
            <div
              key={i}
              ref={(el) => { slotsRef.current[i] = el; }}
              className="flex-shrink-0"
            >
              <div
                ref={(el) => { innersRef.current[i] = el; }}
                className="flex items-center justify-center group transform-gpu"
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
                {logo.type === "image" ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={`w-auto h-auto max-h-[60px] max-w-[180px] object-contain px-2 mix-blend-multiply grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ${logo.alt === "Mutimer" ? "contrast-[1.2] brightness-[1.1]" : ""
                      }`}
                    style={logo.scale ? { transform: `scale(${logo.scale})` } : undefined}
                    draggable={false}
                  />
                ) : (
                  <div className="flex flex-col items-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 select-none">
                    <span
                      style={{ fontFamily: "'Playfair Display', 'Instrument Serif', Georgia, serif" }}
                      className="text-4xl font-extrabold text-black tracking-tight leading-none"
                    >
                      {logo.text}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
            <a href="#ads" className="hover:text-black transition-colors">Services</a>
            <a href="#work" className="hover:text-black transition-colors">Work</a>
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
              <a href="#ads" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#work" onClick={() => setIsMenuOpen(false)}>Work</a>
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

      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative pt-40 pb-16 md:pt-56 md:pb-24 h-auto">
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
        <CircularArcLogos />



        {/* Scroll-Driven Headline Section */}

        {/* Scroll-Driven Headline Section */}

        {/* Services Header */}
        <div style={{ background: 'linear-gradient(to bottom, #F5F5F5, #000000)' }}>
          <section id="services" className="pt-32 pb-8 px-6">
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
          <section id="ads" className="bg-white border-y border-[#EEEEEE] overflow-hidden">
            <ServicesMarquee />
          </section>

          {/* How We Do It ticker moved here */}
          <ScrollDrivenTicker />

          {/* About / Stats Section relocated under the ticker */}
          <section id="about" className="pb-24 pt-4 px-6 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <h2 className="text-4xl md:text-5xl font-medium leading-tight mb-8 text-black">
                  Crafting exceptional, data-driven strategies to drive impactful results with <span className="font-serif italic text-[#6B6B6B]">precision.</span>
                </h2>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-none border border-black bg-black text-[#FFFFFF]">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Creativity</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-none border border-black bg-[#F5F5F5] text-black">
                    <Target className="w-4 h-4" />
                    <span className="text-sm font-medium">Strategy</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-none border border-black bg-black text-[#FFFFFF]">
                    <BarChart className="w-4 h-4" />
                    <span className="text-sm font-medium">Growth</span>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="flex flex-col gap-2">
                  <div className="text-6xl md:text-7xl font-serif italic text-black">+40</div>
                  <div className="text-sm text-[#6B6B6B] uppercase tracking-wider font-medium">Total Projects</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-6xl md:text-7xl font-serif italic text-black">+15</div>
                  <div className="text-sm text-[#6B6B6B] uppercase tracking-wider font-medium">Years combined Exp</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-6xl md:text-7xl font-serif italic text-black">99%</div>
                  <div className="text-sm text-[#6B6B6B] uppercase tracking-wider font-medium">Retention</div>
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
                speed={600}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 200,
                  modifier: 1,
                  slideShadows: true,
                }}
                style={{ overflow: 'visible', padding: '40px 0' }}
              >
                {[
                  { src: "/campaigns/emails/email_01.webp", alt: "Email campaign design" },
                  { src: "/campaigns/emails/email_02.webp", alt: "Email lifecycle campaign" },
                  { src: "/campaigns/emails/email_03.webp", alt: "Retention email design" },
                  { src: "/campaigns/emails/email_04.webp", alt: "Promotional email campaign" },
                  { src: "/campaigns/emails/email_05.webp", alt: "Email flow design" },
                  { src: "/campaigns/emails/email_06.webp", alt: "Newsletter campaign design" },
                  { src: "/campaigns/emails/email_07.webp", alt: "Welcome series email" },
                  { src: "/campaigns/emails/email_08.webp", alt: "Transactional email design" },
                  { src: "/campaigns/emails/email_09.webp", alt: "Engagement email campaign" },
                  { src: "/campaigns/emails/email_10.webp", alt: "Drip email sequence" },
                  { src: "/campaigns/emails/email_11.webp", alt: "Re-engagement email" },
                  { src: "/campaigns/emails/email_12.webp", alt: "Loyalty email campaign" },
                  { src: "/campaigns/emails/email_13.webp", alt: "Flash sale email" },
                  { src: "/campaigns/emails/email_14.webp", alt: "Cart recovery email" },
                  { src: "/campaigns/emails/email_15.webp", alt: "Product recommendation email" },
                  { src: "/campaigns/emails/email_16.png", alt: "Campaign screenshot" },
                  { src: "/campaigns/emails/email_17.png", alt: "Email campaign screenshot" },
                  { src: "/campaigns/emails/email_18.png", alt: "Lifecycle email screenshot" },
                  { src: "/campaigns/emails/email_19.png", alt: "Retention campaign screenshot" },
                  { src: "/campaigns/emails/email_20.png", alt: "Marketing email screenshot" },
                  { src: "/campaigns/emails/email_21.png", alt: "Branded email screenshot" },
                  { src: "/campaigns/emails/email_22.png", alt: "Promotional campaign screenshot" },
                ].map((item, i) => (
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
                <li><a href="#work" className="hover:text-black transition-colors">Work</a></li>
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
