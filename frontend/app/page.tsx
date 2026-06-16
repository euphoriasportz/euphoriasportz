"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence 
} from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Target, 
  Maximize, 
  Activity, 
  Trophy, 
  Swords, 
  Clock, 
  Footprints, 
  Star,
  Layers,
  Sparkles,
  Sun,
  Moon
} from "lucide-react";
import SportToggle from "@/components/SportToggle";
import InteractiveArena from "@/components/InteractiveArena";
import { sportConfigs } from "@/utils/sportConfigs";

const sportIcons: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  football: Trophy,
  cricket: Swords,
  basketball: Target,
};

// Reviews mock data
const reviews = [
  { text: "Booking the full 14,000 sq. ft. field here is a completely different experience. Perfect size!", author: "Justdial Verified", rating: 5 },
  { text: "Highly competitive hourly rental rates considering the premium synthetic grass and large scale.", author: "Google Local Guide", rating: 5 },
  { text: "The staff and management are extremely helpful. We successfully ran the Double Wicket Championship.", author: "CricHeroes Member", rating: 5 },
  { text: "Best turf in the Vasai-Virar region. The netting and floodlights are professional grade.", author: "Local Athlete", rating: 5 },
  { text: "Excellent drainage during monsoons. Playing football here is an absolute joy.", author: "Tournament Host", rating: 5 },
];

export default function Home() {
  const [currentSport, setCurrentSport] = useState("football");
  const config = sportConfigs[currentSport];
  
  // Section refs for scroll triggering
  const containerRef = useRef(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Framer Motion useScroll hook
  const { scrollY, scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollY, [0, 800], [0, 250]);
  const splitLeftX = useTransform(scrollY, [0, 500], [0, -100]);
  const splitRightX = useTransform(scrollY, [0, 500], [0, 100]);
  const stickyBarOpacity = useTransform(scrollY, [400, 550], [0, 1]);
  const stickyBarY = useTransform(scrollY, [400, 550], [-50, 0]);

  // Smooth springs for mouse trackers
  const mouseX = useSpring(0, { stiffness: 60, damping: 15 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 15 });

  // Floating Grass Particles
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  
  // Day/Night simulation state
  const [isNightMode, setIsNightMode] = useState(true);
  const [dayNightProgress, setDayNightProgress] = useState(70); // Slider progress: 0 (Day) -> 100 (Night)

  useEffect(() => {
    // Generate grass flyaway particles
    const list = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5
    }));
    setParticles(list);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);

    // Spotlight calculation relative to grandstand box
    if (spotlightRef.current) {
      const rect = spotlightRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      spotlightRef.current.style.setProperty("--x", `${x}px`);
      spotlightRef.current.style.setProperty("--y", `${y}px`);
    }
  };

  // Pricing based on day-night slider
  const getSliderPrice = () => {
    const base = config.basePrice;
    const isPeak = dayNightProgress > 60; // Sliders above 60% count as night floodlight peak hours
    return Math.round(isPeak ? base * config.peakMultiplier : base);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#060709] selection:bg-[#39FF14] selection:text-black"
    >
      
      {/* Custom Lag-Behind Cursor (Awwwards Style) */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border border-[#39FF14] pointer-events-none z-50 hidden md:block mix-blend-mode-difference"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
          boxShadow: "0 0 15px rgba(57, 255, 20, 0.3)",
        }}
      />
      
      {/* Dynamic Floating Sticky Booking Bar */}
      <motion.div 
        style={{ opacity: stickyBarOpacity, y: stickyBarY }}
        className="fixed top-24 inset-x-0 z-40 px-4 hidden sm:block pointer-events-auto"
      >
        <div className="max-w-4xl mx-auto glass-panel rounded-full px-6 py-3 border border-white/10 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: config.primaryColor }} />
            <span className="font-['Orbitron'] text-xs font-bold text-white uppercase tracking-wider">
              EST Arena | {config.name}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400">
              Standard Rate: <strong className="text-white">₹{config.basePrice}/hr</strong>
            </span>
            <Link 
              href="/book" 
              style={{ 
                backgroundColor: config.primaryColor,
                boxShadow: `0 0 15px ${config.primaryColor}33`
              }}
              className="px-6 py-2 rounded-full text-black text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all"
            >
              Book Setup
            </Link>
          </div>
        </div>
      </motion.div>

      {/* 1. Hero Section: "The Kick-Off" */}
      <section className="relative h-[100vh] flex flex-col items-center justify-center px-4 overflow-hidden border-b border-white/5">
        
        {/* Parallax Atmospheric Layer */}
        <motion.div 
          style={{ y: yOffset }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          {/* Low intensity grid flow */}
          <div className="absolute inset-0 bg-grid-pattern opacity-15" />
          {/* Stadium Floodlight beam */}
          <div 
            className="absolute top-[-20%] left-[20%] w-[60%] h-[130%] stadium-light-beam animate-pulse-glow transition-colors duration-1000"
            style={{ filter: `hue-rotate(${currentSport === 'cricket' ? '60deg' : currentSport === 'basketball' ? '120deg' : '0deg'})` }}
          />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#060709] to-transparent" />
        </motion.div>

        {/* Mouse Interactive Particle Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: config.primaryColor,
                boxShadow: `0 0 8px ${config.primaryColor}`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.7, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 6 + p.size,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut"
              }}
              className="absolute rounded-full"
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-[#39FF14]"
          >
            <Sparkles className="w-3.5 h-3.5" /> 14,000 SQ. FT. MULTI-PURPOSE ARENA
          </motion.div>
          
          {/* Scroll-Driven Splitting Text Heading */}
          <div className="overflow-hidden py-4">
            <motion.h1 
              style={{ x: splitLeftX }}
              className="font-['Orbitron'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase leading-tight"
            >
              The Largest Sports Venue
            </motion.h1>
            <motion.h1 
              className="font-['Orbitron'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight uppercase leading-tight mt-1"
              style={{ 
                color: config.primaryColor,
                x: splitRightX,
                textShadow: `0 0 30px ${config.primaryColor}33`
              }}
            >
              In Vasai-Virar
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            Host full-ground Box Cricket and Football matches. Featuring a premium synthetic grass pitch matrix and professional stadium floodlights for full-sized tournament leagues.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/book"
              style={{
                backgroundColor: config.primaryColor,
                boxShadow: `0 0 25px ${config.primaryColor}66`
              }}
              className="px-8 py-4 rounded-xl text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Schedule Matches
            </Link>
            <a
              href="#interactive"
              className="px-8 py-4 rounded-xl bg-zinc-900 border border-white/10 text-white font-bold uppercase tracking-wider text-xs hover:border-white/20 transition-all duration-300"
            >
              Interactive Layouts
            </a>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-gray-500 uppercase tracking-widest">
          <span className="animate-bounce">↓</span>
          <span>Scroll down</span>
        </div>
      </section>

      {/* 2. Feature Showcase: "The Grid" */}
      <section id="interactive" className="py-32 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <h2 className="font-['Orbitron'] font-black text-2xl sm:text-4xl text-white uppercase tracking-wide">
            Switch Setup Mode
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Toggle the layouts below to watch our 14,000 sq ft venue dynamically re-configure the playlines.
          </p>
        </div>

        {/* Toggle Controls */}
        <SportToggle currentSportId={currentSport} onSportChange={setCurrentSport} />

        {/* Arena visualizer */}
        <InteractiveArena currentSportId={currentSport} />

        {/* Pitch Showcase Cards Stacked (Awwwards Style) */}
        <div className="flex flex-col gap-12 max-w-4xl mx-auto pt-16 relative">
          {Object.values(sportConfigs).map((sport, idx) => {
            const isActive = sport.id === currentSport;
            return (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setCurrentSport(sport.id)}
                style={{
                  top: `${110 + idx * 35}px`,
                  boxShadow: isActive ? `0 10px 40px ${sport.primaryColor}22` : undefined
                }}
                className={`sticky glass-panel p-8 rounded-2xl border transition-all duration-500 cursor-pointer space-y-6 group bg-[#090b0e]/95 ${
                  isActive 
                    ? "border-white/20" 
                    : "border-white/5 opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  {(() => {
                    const Icon = sportIcons[sport.id] || Trophy;
                    return <Icon className="w-8 h-8 transition-transform group-hover:scale-110" style={{ color: sport.primaryColor }} />;
                  })()}
                  <span 
                    className="font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${sport.primaryColor}15`, 
                      color: sport.primaryColor,
                      border: `1px solid ${sport.primaryColor}33`
                    }}
                  >
                    {sport.name}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-['Orbitron'] font-bold text-lg text-white">{sport.name.split(" ")[0]} Specs</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{sport.tagline}</p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3 text-xs text-gray-300">
                  <div className="flex items-center gap-2.5">
                    <Maximize className="w-4 h-4 text-gray-500" />
                    <span><strong>Court Size:</strong> {sport.dimensions}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span><strong>Capacity:</strong> {sport.capacity}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pitches & Facilities:</h4>
                  <ul className="space-y-1 text-xs text-gray-400">
                    {sport.amenities.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

      </section>

      {/* 3. Review & Crowd Sentiment: "The Grandstand" (Interactive Spotlight & Marquee) */}
      <section 
        ref={spotlightRef}
        className="py-32 bg-[#08090c] border-y border-white/5 relative overflow-hidden group/spotlight"
        style={{
          background: "radial-gradient(600px circle at var(--x, 0px) var(--y, 0px), rgba(255,255,255,0.03), transparent 80%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#39FF14]">
              ⭐ Player Accolades
            </div>
            <h2 className="font-['Orbitron'] font-black text-2xl sm:text-4xl text-white uppercase tracking-wide">
              The Grandstand Reviews
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Holding a stellar <strong>4.4 out of 5 stars</strong> rating across 230+ verified reviews, EST is the premier choice for cricket and football clubs in Mumbai suburbs.
            </p>
          </div>

          {/* Asymmetrical Review Marquee */}
          <div className="overflow-hidden w-full flex flex-col gap-4 py-4 pointer-events-none">
            {/* Row 1: Left Moving */}
            <div className="flex gap-4 w-[200%] animate-[marquee_25s_linear_infinite] hover:pause">
              {reviews.concat(reviews).map((r, i) => (
                <div key={`marquee-1-${i}`} className="glass-panel p-5 rounded-xl border border-white/5 w-[350px] shrink-0 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase">{r.author}</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Dashboard (Counters) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-12">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden"
            >
              <span className="block font-['Orbitron'] text-4xl sm:text-5xl font-black text-[#39FF14]">4.4 ★</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2 block">Average Rating</span>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-white/5"
            >
              <span className="block font-['Orbitron'] text-4xl sm:text-5xl font-black text-[#FFD700]">230+</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2 block">Verified Reviews</span>
            </motion.div>

            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl border border-white/5"
            >
              <span className="block font-['Orbitron'] text-4xl sm:text-5xl font-black text-white">14,000</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-2 block">Sq. Ft. Grid Size</span>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. Interactive Booking Simulation & Rules */}
      <section id="pricing" className="py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Day/Night simulation slider layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slider Controls Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-[#FFD700]">
              <Sun className="w-3.5 h-3.5" /> Real-time Pricing Slider
            </div>
            <h2 className="font-['Orbitron'] font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
              Daylight vs. Night Matches
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Drag the scheduling slider to see standard rates transition into peak night rates when our stadium under-lights turn on.
            </p>

            {/* Slider Component */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex justify-between items-center text-xs uppercase font-bold tracking-wider">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Sun className="w-4 h-4 text-amber-400" /> Day Slots
                </span>
                <span className="flex items-center gap-1.5 text-[#FFD700]">
                  <Moon className="w-4 h-4" /> Night Floodlights (Peak)
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={dayNightProgress}
                onChange={(e) => setDayNightProgress(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#39FF14]"
              />

              <div className="flex justify-between items-center pt-2">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Estimated Price:</span>
                  <span className="text-2xl font-black text-white font-['Orbitron'] block">
                    ₹{getSliderPrice()}/hr
                  </span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  dayNightProgress > 60
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/20"
                }`}>
                  {dayNightProgress > 60 ? "Peak rate multiplier active" : "Standard day rate"}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Grid details */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-white/2">
                <h3 className="font-['Orbitron'] text-xs font-bold tracking-widest text-white uppercase">Arena Rates</h3>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 text-gray-400">
                    <th className="p-4 font-bold">SPORT CONFIG</th>
                    <th className="p-4 font-bold">STANDARD RATE</th>
                    <th className="p-4 font-bold">PEAK RATE</th>
                    <th className="p-4 font-bold">MULTIPLIER</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {Object.values(sportConfigs).map((sport) => (
                    <tr key={sport.id} className="hover:bg-white/2 transition-colors">
                      <td className="p-4 font-semibold text-white flex items-center gap-2">
                        {(() => {
                          const Icon = sportIcons[sport.id] || Trophy;
                          return <Icon className="w-4 h-4" style={{ color: sport.primaryColor }} />;
                        })()}
                        <span>{sport.name}</span>
                      </td>
                      <td className="p-4">₹{sport.basePrice}/hr</td>
                      <td className="p-4 text-amber-400 font-medium">₹{Math.round(sport.basePrice * sport.peakMultiplier)}/hr</td>
                      <td className="p-4 font-mono text-gray-500">x{sport.peakMultiplier} (5 PM - 11 PM)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* General safety guidelines card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 flex gap-4 items-start">
            <Footprints className="w-8 h-8 text-[#39FF14] shrink-0" />
            <div>
              <h4 className="font-['Orbitron'] text-xs font-bold text-white uppercase tracking-wider">Footwear Guidelines</h4>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Flat-soled turf shoes or non-marking sports shoes only. To prevent synthetic grass turf damage, studded football boots or metal spike track shoes are strictly prohibited.
              </p>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-white/5 flex gap-4 items-start">
            <Clock className="w-8 h-8 text-[#FFD700] shrink-0" />
            <div>
              <h4 className="font-['Orbitron'] text-xs font-bold text-white uppercase tracking-wider">Transition Overhead</h4>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Matches are requested to conclude 5 minutes before the hour. This brief period enables technicians to safely roll out cricket pitches or adjust goals and perimeter nets.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 5. Final CTA */}
      <section className="py-32 bg-gradient-to-b from-transparent to-[#090b0e] text-center border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="font-['Orbitron'] font-black text-3xl sm:text-5xl text-white uppercase tracking-wide">
            Ready to Take the Court?
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">
            Book your session online in less than 2 minutes. Secure real-time confirmations and enjoy instant access.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-black font-bold uppercase tracking-wider text-xs transition-all duration-300 bg-gradient-to-r from-[#39FF14] to-[#FFD700] hover:scale-105 shadow-[0_0_20px_rgba(57,255,20,0.2)]"
            >
              Enter booking scheduler <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
