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
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { z } from 'zod';
import 'swiper/css';
import 'swiper/css/effect-fade';

// --- Shared Components ---

const CountUp = ({ value, prefix = "", suffix = "%", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className={`font-circular font-bold leading-none ${className}`}>
      {prefix}<motion.span>{rounded}</motion.span><sup>{suffix}</sup>
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

export const getIcon = (name: string, props: any = {}) => {
  switch (name.toLowerCase()) {
    case 'zap': return <Zap {...props} />;
    case 'layout': return <Layout {...props} />;
    case 'code': return <Code {...props} />;
    case 'globe': return <Globe {...props} />;
    case 'lightbulb': return <Lightbulb {...props} />;
    case 'trendingup': return <TrendingUp {...props} />;
    case 'search': return <Search {...props} />;
    default: return <Plus {...props} />;
  }
}

export const CaseStudySchema = z.object({
  agencyName: z.string(),
  clientName: z.string(),
  navigation: z.object({
    backLinkLabel: z.string(),
    backLinkUrl: z.string(),
  }),
  hero: z.object({
    headline: z.object({
      text: z.string(),
      subtext: z.string(),
      number: z.number(),
      prefix: z.string().optional(),
      suffix: z.string().optional(),
    }),
    subheading: z.string(),
  }),
  background: z.object({
    title: z.string(),
    description: z.array(z.string()).min(1),
    quote: z.string(),
    carouselImages: z.array(z.string()).min(1),
  }),
  performanceHighlights: z.object({
    title: z.string(),
    subtitle: z.string(),
    stats: z.array(
      z.object({
        value: z.number(),
        prefix: z.string().optional(),
        suffix: z.string().optional(),
        label: z.string(),
        chart: z.object({
          title: z.string(),
          type: z.enum(["line", "bar"]),
          yAxisLabels: z.array(z.string()).min(2),
          xAxisLabels: z.array(z.string()).min(2),
          data: z.array(z.number()).min(2),
        }),
      })
    ).min(1),
  }),
  challenges: z.object({
    title: z.string(),
    description: z.array(z.string()).min(1),
    images: z.array(z.string()).min(1),
  }),
  solutions: z.object({
    title: z.string(),
    description: z.array(z.string()).min(1),
    backgroundText: z.string(),
    steps: z.array(
      z.object({
        label: z.string(),
        icon: z.string(),
      })
    ).min(1),
  }),
  keyResults: z.object({
    title: z.string(),
    subtitle: z.string(),
    results: z.array(
      z.object({
        value: z.number(),
        prefix: z.string().optional(),
        suffix: z.string().optional(),
        label: z.string(),
        desc: z.string(),
      })
    ).min(1),
  }),
  emailSequence: z.object({
    title: z.string(),
    description: z.array(z.string()),
    thoughtProcess: z.object({
      title: z.string(),
      content: z.array(z.string())
    }).optional(),
    emails: z.array(
      z.object({
        label: z.string(),
        explanation: z.array(z.string()),
        images: z.array(z.string()).optional()
      })
    )
  }).optional(),
  servicesProvided: z.object({
    title: z.string(),
    services: z.array(
      z.object({
        label: z.string(),
        icon: z.string(),
      })
    ).min(1),
  }),
  brandExperience: z.array(z.string()).min(1),
  testimonials: z.array(
    z.object({
      quote: z.string(),
      authorRole: z.string(),
      clientVisionText: z.string().optional(),
    })
  ).min(1),
  cta: z.object({
    title: z.string(),
    buttonText: z.string(),
    buttonUrl: z.string(),
  }),
  footer: z.object({
    title: z.string(),
    columns: z.array(z.string()).min(1),
  }),
});

export type CaseStudyData = z.infer<typeof CaseStudySchema>;

const generateLinePath = (values: number[], isBar: boolean) => {
  if (values.length === 0) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const normalized = values.map(v => 95 - ((v - min) / range) * 85);
  
  if (isBar) {
    const step = 400 / values.length;
    let path = `M${step / 2},${normalized[0]}`;
    for (let i = 1; i < normalized.length; i++) {
        const prevX = (i - 1 + 0.5) * step;
        const currX = (i + 0.5) * step;
        const prevY = normalized[i - 1];
        const currY = normalized[i];
        const midX = (prevX + currX) / 2;
        path += ` C ${midX},${prevY} ${midX},${currY} ${currX},${currY}`;
    }
    return path;
  } else {
    const step = 400 / (values.length - 1 || 1);
    let path = `M0,${normalized[0]}`;
    for (let i = 1; i < normalized.length; i++) {
      const prevX = (i - 1) * step;
      const currX = i * step;
      const prevY = normalized[i - 1];
      const currY = normalized[i];
      const midX = (prevX + currX) / 2;
      path += ` C ${midX},${prevY} ${midX},${currY} ${currX},${currY}`;
    }
    return path;
  }
};

export default function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openEmailParam, setOpenEmailParam] = useState<number | null>(null);
  const [isThoughtProcessOpen, setIsThoughtProcessOpen] = useState(false);

  // Zod Validation
  const validationResult = CaseStudySchema.safeParse(data);

  if (!validationResult.success) {
    console.error("Case Study Data Validation Failed:", validationResult.error.format());
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Configuration Error</h1>
        <p className="text-xl text-white/60 mb-8 max-w-2xl">
          The case study data is incomplete or improperly formatted. Please check the console for validation details.
        </p>
        <Link to="/work" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
          Return to Work
        </Link>
      </div>
    );
  }

  // Use the validated data
  const validData = validationResult.data;

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-black/5 md:px-12">
        <Link to="/" className="text-xl font-bold tracking-tighter">{validData.agencyName}</Link>
        <div className="flex items-center gap-8">
          <Link to={validData.navigation.backLinkUrl} className="text-xs font-bold uppercase tracking-widest hover:opacity-50 transition-all flex items-center gap-2">
            <ArrowLeft size={14} /> {validData.navigation.backLinkLabel}
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
            className="text-7xl md:text-[10rem] font-bold max-w-6xl mx-auto mb-10 tracking-tight leading-[0.85] uppercase"
          >
            {validData.hero.headline.text} <span className="font-serif italic lowercase font-normal text-white/40">{validData.hero.headline.subtext}</span> <CountUp value={validData.hero.headline.number} prefix={validData.hero.headline.prefix} suffix={validData.hero.headline.suffix} />
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-col items-center"
          >
            <p className="text-[10px] tracking-[0.3em] uppercase font-medium text-white/40 mb-6">{validData.hero.subheading}</p>
            <div className="flex items-center gap-8">
              <div className="text-sm font-bold tracking-widest text-white/60">{validData.clientName}</div>
              <Plus className="text-white/20 w-4 h-4" />
              <div className="text-sm font-bold tracking-widest text-white">{validData.agencyName}</div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- BACKGROUND --- */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-5xl font-bold tracking-tight uppercase">{validData.background.title}</h2>
            <div className="text-lg leading-relaxed text-black/60 font-medium space-y-6">
              {validData.background.description.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="border-l-4 border-black pl-8 py-2">
               <p className="font-serif italic text-2xl text-black">
                "{validData.background.quote}"
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full relative rounded-[2.5rem] overflow-hidden border border-black/5 shadow-2xl aspect-video"
          >
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              speed={1000}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={true}
              className="w-full h-full"
            >
              {validData.background.carouselImages.map((imgSrc, i) => (
                <SwiperSlide key={i}>
                  <div className="w-full h-full bg-[#f8f8f8]">
                    <img
                      src={imgSrc}
                      alt={`${validData.clientName} feature ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </Section>

      {/* --- PERFORMANCE HIGHLIGHTS --- */}
      <Section className="bg-white">
        <div className="flex flex-col items-center mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-center mb-4 uppercase">{validData.performanceHighlights.title}</h2>
          <p className="font-serif italic text-xl text-black/40">{validData.performanceHighlights.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {validData.performanceHighlights.stats.map((stat, i) => {
            const maxData = Math.max(...stat.chart.data);
            const minData = Math.min(...stat.chart.data);
            const rangeData = maxData - minData || 1;
            const normalizedY = stat.chart.data.map(v => 95 - ((v - minData) / rangeData) * 85);
            const finalY = normalizedY[normalizedY.length - 1];
            
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-black/5 rounded-[3rem] p-12 shadow-sm"
              >
                <div className="mb-4">
                  <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} className="text-6xl md:text-7xl lg:text-8xl xl:text-[90px] 2xl:text-[100px] font-bold tracking-tighter" />
                </div>
                <p className="text-sm font-bold tracking-[0.2em] text-black/40 uppercase mb-12">{stat.label}</p>
                
                <div className="bg-[#F8F8F8] rounded-[2rem] p-10 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-10">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-black/20">{stat.chart.title}</span>
                  </div>
                  
                  <div className="h-48 relative">
                    {/* Y-Axis Labels */}
                    <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] font-bold text-black/20 py-1">
                      {stat.chart.yAxisLabels.map((lbl, idx) => (
                        <span key={idx}>{lbl}</span>
                      ))}
                    </div>
                    
                    {/* Grid Lines */}
                    <div className="absolute left-10 md:left-12 right-0 top-0 bottom-0 flex flex-col justify-between py-2">
                      {stat.chart.yAxisLabels.map((_, idx) => (
                        <div key={idx} className="w-full h-[1px] bg-black/5"></div>
                      ))}
                    </div>

                    <div className="absolute left-10 md:left-12 right-0 bottom-0 h-full">
                      {stat.chart.type === "bar" && (
                        <div className="absolute inset-0 flex items-end gap-1 px-4">
                          {stat.chart.data.map((val, idx) => {
                            const barHeight = ((val - minData) / rangeData) * 85 + 5;
                            return (
                              <motion.div 
                                key={idx}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${barHeight}%` }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex-1 bg-black/10 rounded-t-sm"
                              />
                            );
                          })}
                        </div>
                      )}

                      {/* SVG Line Overlay */}
                      <svg className="absolute inset-0 w-[calc(100%-2rem)] md:w-[calc(100%-2.5rem)] h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          d={generateLinePath(stat.chart.data, stat.chart.type === "bar")} 
                          fill="none" 
                          stroke="black" 
                          strokeWidth="3" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Proportional Indicators */}
                    <div className="absolute left-10 md:left-12 right-0 bottom-0 w-[calc(100%-2rem)] md:w-[calc(100%-2.5rem)] h-full pointer-events-none">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="absolute flex flex-col items-center"
                        style={{ 
                          left: stat.chart.type === 'bar' ? `calc(100% - ${100 / stat.chart.data.length / 2}%)` : '100%', 
                          top: `${finalY}%`, 
                          transform: 'translate(-50%, -50%)' 
                        }}
                      >
                        <div className="mb-1">
                          <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} className="text-[16px]" />
                        </div>
                        <div className="w-3 h-3 bg-black border-2 border-white rounded-full shadow-sm" />
                      </motion.div>
                    </div>

                    {/* X-Axis Labels */}
                    <div className="absolute left-10 md:left-12 right-0 -bottom-6 flex justify-between text-[8px] font-bold text-black/20">
                      {stat.chart.xAxisLabels.map((lbl, idx) => (
                        <span key={idx}>{lbl}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* --- CHALLENGES --- */}
      <Section className="bg-[#F8F8F8] py-32 border-y border-black/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8 lg:order-1 order-2"
          >
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight uppercase">{validData.challenges.title}</h2>
            <div className="text-lg leading-relaxed text-black/60 font-medium space-y-6">
              {validData.challenges.description.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </motion.div>

          {validData.challenges.images.length >= 1 && (
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] lg:order-2 order-1 mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 50, rotate: -3 }}
                whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`absolute top-0 left-0 ${validData.challenges.images.length > 1 ? 'w-[80%]' : 'w-full'} z-10`}
              >
                <img src={validData.challenges.images[0]} alt={`${validData.clientName} challenge`} className="rounded-3xl shadow-xl border border-black/5" />
              </motion.div>
              {validData.challenges.images[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 50, rotate: 4 }}
                  whileInView={{ opacity: 1, y: 60, rotate: 4 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-24 right-0 w-[80%] z-20"
                >
                  <img src={validData.challenges.images[1]} alt={`${validData.clientName} challenge 2`} className="rounded-3xl shadow-2xl border border-black/5" />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </Section>

      {/* --- SOLUTIONS --- */}
      <section className="relative bg-black text-white py-40 overflow-hidden">
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-24 gap-y-12 opacity-[0.08] pointer-events-none select-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="text-[15rem] font-bold tracking-tight text-white leading-none">{validData.solutions.backgroundText}</span>
          ))}
        </div>
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight uppercase">{validData.solutions.title}</h2>
              <div className="text-lg leading-relaxed text-white/60 font-medium space-y-6">
                {validData.solutions.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className="flex flex-col items-center justify-center gap-8 relative"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 w-full max-w-md">
                {validData.solutions.steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, y: 20 },
                      visible: { opacity: 1, scale: 1, y: 0 }
                    }}
                    className="w-40 h-40 rounded-full border border-white/10 flex flex-col items-center justify-center p-6 bg-white/5 text-center hover:bg-white/10 transition-colors group relative"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center text-black font-bold text-[10px] tracking-widest p-2 shadow-2xl"
                    >
                      {getIcon(step.icon, { className: "w-5 h-5" })}
                      <span className="mt-2 text-[8px]">{step.label}</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- EMAIL SEQUENCE (Optional) --- */}
      {validData.emailSequence && (
        <Section className="bg-[#F8F8F8] border-b border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-8"
            >
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight uppercase">{validData.emailSequence.title}</h2>
              <div className="text-lg leading-relaxed text-black/60 font-medium space-y-6">
                {validData.emailSequence.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>

              {validData.emailSequence.thoughtProcess && (
                <div className="mt-8 bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm transition-all duration-300">
                  <button 
                    onClick={() => setIsThoughtProcessOpen(!isThoughtProcessOpen)}
                    className="w-full flex items-center justify-between p-8 text-left hover:bg-black/[0.02] transition-colors focus:outline-none"
                  >
                    <span className="text-xl font-bold uppercase tracking-widest">{validData.emailSequence.thoughtProcess.title}</span>
                    <motion.div
                      animate={{ rotate: isThoughtProcessOpen ? 45 : 0 }}
                      className="bg-black/5 rounded-full p-2"
                    >
                      <Plus className="w-5 h-5 text-black" />
                    </motion.div>
                  </button>
                  <motion.div 
                    initial={false}
                    animate={{ height: isThoughtProcessOpen ? 'auto' : 0, opacity: isThoughtProcessOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 text-lg leading-relaxed text-black/60 font-medium space-y-6">
                      {validData.emailSequence.thoughtProcess.content.map((p, i) => (
                        <p key={i} className={p.startsWith('•') ? "pl-4" : ""}>{p}</p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-4"
            >
              {validData.emailSequence.emails.map((email, idx) => {
                const isOpen = openEmailParam === idx;
                return (
                  <div key={idx} className="bg-white border border-black/5 rounded-[2rem] overflow-hidden shadow-sm transition-all duration-300">
                    <button 
                      onClick={() => setOpenEmailParam(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-8 text-left hover:bg-black/[0.02] transition-colors focus:outline-none"
                    >
                      <span className="text-xl font-bold uppercase tracking-widest">{email.label}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        className="bg-black/5 rounded-full p-2"
                      >
                        <Plus className="w-5 h-5 text-black" />
                      </motion.div>
                    </button>
                    
                    <motion.div 
                      initial={false}
                      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-0 space-y-4 text-black/60 font-medium leading-relaxed">
                        {email.explanation.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
                        {email.images && email.images.map((img, imgIdx) => (
                          <div key={imgIdx} className="mt-8 rounded-2xl overflow-hidden border border-black/5 bg-[#F8F8F8] flex justify-center">
                            <img src={img} alt={`${email.label} part ${imgIdx + 1}`} className="w-full max-w-full h-auto object-cover" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </Section>
      )}

      {/* --- KEY RESULTS --- */}
      <Section className="relative bg-white pt-32 pb-32">
        <div className="max-w-3xl mx-auto text-center relative z-10 mb-24">
          <h2 className="text-6xl font-bold tracking-tight mb-6 uppercase">{validData.keyResults.title}</h2>
          <p className="font-serif italic text-xl text-black/40">{validData.keyResults.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {validData.keyResults.results.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              className="bg-[#F8F8F8] border border-black/5 rounded-[2rem] p-10 shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="text-4xl md:text-5xl md:mb-8 font-bold mb-6 tracking-normal">
                <CountUp value={r.value} prefix={r.prefix} suffix={r.suffix} />
              </div>
              <div className="text-xs font-bold text-black uppercase tracking-[0.2em] mb-4">{r.label}</div>
              <p className="text-sm text-black/60 leading-relaxed font-medium">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* --- SERVICES PROVIDED --- */}
      <div className="bg-[#F8F8F8] py-24 border-y border-black/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight uppercase">{validData.servicesProvided.title}</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {validData.servicesProvided.services.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-black/5 rounded-full px-8 py-4 font-bold text-[10px] tracking-[0.2em] uppercase shadow-sm hover:shadow-md transition-all">
                {getIcon(s.icon, { className: "w-4 h-4" })}
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- BRAND EXPERIENCE --- */}
      <div className="overflow-hidden">
        <Marquee>
          {validData.brandExperience.map((b, i) => (
            <div key={i} className="text-[10px] font-bold text-black/10 tracking-[0.4em] uppercase mx-12">
              {b}
            </div>
          ))}
        </Marquee>
      </div>

      {/* --- TESTIMONIALS --- */}
      <Section className="bg-white">
        <div className="bg-black rounded-[4rem] overflow-hidden relative min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
          
          <div className="relative z-20 p-20 md:p-32 max-w-4xl text-white">
            <div className="text-[10px] font-bold tracking-[0.5em] text-white/30 mb-16 uppercase">{validData.testimonials[activeTestimonial].clientVisionText || "Client Vision"}</div>
            <motion.blockquote 
              key={activeTestimonial}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-16 text-white/90 italic font-serif"
            >
              "{validData.testimonials[activeTestimonial].quote}"
            </motion.blockquote>
            <div className="flex items-center gap-8">
              <div className="w-12 h-[1px] bg-white/20" />
              <p className="text-sm font-bold tracking-widest text-white/40 uppercase">
                {validData.testimonials[activeTestimonial].authorRole}
              </p>
            </div>
            
            <div className="flex gap-4 mt-16">
              {validData.testimonials.map((_, i) => (
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
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-7xl md:text-[10rem] font-bold tracking-tight mb-16 uppercase leading-none">
              {validData.cta.title}
            </h2>
            <Link 
              to={validData.cta.buttonUrl} 
              className="inline-flex items-center gap-8 bg-white text-black px-20 py-10 rounded-full font-bold uppercase tracking-[0.4em] text-xs hover:bg-neutral-200 transition-all shadow-2xl group"
            >
              {validData.cta.buttonText} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 bg-white border-t border-black/5 text-center">
        <div className="text-5xl font-bold tracking-tighter mb-12 uppercase">{validData.footer.title}</div>
        <div className="flex flex-wrap justify-center gap-x-16 gap-y-6 text-[10px] font-bold uppercase tracking-[0.5em] text-black/20">
          {validData.footer.columns.map((col, idx) => (
            <span key={idx}>{col}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}
