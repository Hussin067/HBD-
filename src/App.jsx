import React, { useState, useMemo, useRef } from "react";
import {
  Sparkles,
  PartyPopper,
  Music2,
  GraduationCap,
  Disc3,
  Mail,
  Zap,
  ArrowDown,
  PlayCircle,
} from "lucide-react";

/* ---------------------------------------------------------
   Confetti — reusable burst, remounts via `burstKey` to replay
--------------------------------------------------------- */
function Confetti({ burstKey, count = 60 }) {
  const pieces = useMemo(() => {
    const colors = ["#ff2e93", "#22d3ee", "#facc15", "#a855f7", "#ffffff"];
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 2 + Math.random() * 1.5,
      color: colors[i % colors.length],
      rotate: Math.random() * 360,
      size: 6 + Math.random() * 6,
    }));
  }, [burstKey, count]);

  if (burstKey === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-40">
      {pieces.map((p) => (
        <span
          key={`${burstKey}-${p.id}`}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-10px",
            width: p.size,
            height: p.size * 1.6,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Halftone dot overlay — the Spider-Verse comic texture
--------------------------------------------------------- */
function Halftone({ opacity = 0.15, size = 14 }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) 1.4px, transparent 1.4px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}

/* ---------------------------------------------------------
   Portal nav — the signature dimension-hopping side nav
--------------------------------------------------------- */
const SECTIONS = [
  { id: "hero", label: "Home", icon: Sparkles },
  { id: "birthday", label: "18", icon: PartyPopper },
  { id: "drake", label: "Take Care", icon: Music2 },
  { id: "spiderverse", label: "Multiverse", icon: Zap },
  { id: "college", label: "College", icon: GraduationCap },
];

function PortalNav() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col gap-3">
      {SECTIONS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-fuchsia-400/60 bg-indigo-950/70 backdrop-blur-sm hover:border-cyan-300 transition-colors"
          style={{ boxShadow: "0 0 12px rgba(217,70,239,0.35)" }}
          aria-label={label}
        >
          <Icon className="w-4 h-4 text-fuchsia-200 group-hover:text-cyan-200 transition-colors" />
          <span
            className="portal-ghost absolute inset-0 rounded-full border-2 border-cyan-300 opacity-0 group-hover:opacity-70"
          />
          <span className="absolute right-12 whitespace-nowrap text-[11px] font-mono px-2 py-1 rounded bg-black/80 text-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity">
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

/* ---------------------------------------------------------
   Section wrapper
--------------------------------------------------------- */
function Section({ id, className = "", children }) {
  return (
    <section
      id={id}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */
export default function FaymBirthday() {
  const [spinning, setSpinning] = useState(true);
  const [flipped, setFlipped] = useState({});
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [burst, setBurst] = useState(0);
  const containerRef = useRef(null);

  const fireConfetti = () => setBurst((b) => b + 1);

  const facts = [
    { front: "18", back: "Officially certified adult. No takebacks." },
    { front: "1", back: "Elite taste in music." },
    { front: "∞", back: "Beauty and brains." },
    { front: "F", back: "Future Finance Major. The market should be nervous." },
  ];

  const tracklist = [
    { n: "01", title: "Take Care", id: "124NFj84ppZ5pAxTuVQYCQ" },
    { n: "02", title: "Passionfruit", id: "5mCPDVBb16L4XQwDdbRUpz" },
    { n: "03", title: "8teen", id: "5bgwqaRSS3M8WHWruHgSL5" },
    { n: "04", title: "cece's interlude", id: "147TR5QZzxTnnwqltaRi4N" },
    { n: "05", title: "Find Your Love", id: "18PSaTJMLkFNWnW0NWdOAW" },
    { n: "06", title: "Normal girl", id: "5fQBa4wkmq28xpSLOQ202K" },
    { n: "07", title: "Sunflower", id: "3KkXRkHbMCARz0aVfEt68P" },
  ];
  const [currentTrack, setCurrentTrack] = useState(tracklist[0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full text-white overflow-x-hidden"
      style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#0d0518" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Poppins:wght@300;400;600;800&family=Space+Mono:wght@400;700&display=swap');

        .font-display { font-family: 'Bangers', cursive; letter-spacing: 0.03em; }
        .font-mono2 { font-family: 'Space Mono', monospace; }

        .text-fluid-hero { font-size: clamp(2.75rem, 14vw, 8rem); }
        .text-fluid-sub { font-size: clamp(1.25rem, 5vw, 2.25rem); }
        .text-fluid-h2 { font-size: clamp(2rem, 6.5vw, 3.75rem); }
        .text-fluid-h2-sm { font-size: clamp(1.75rem, 6vw, 3rem); }

        html, body { max-width: 100%; overflow-x: hidden; }

        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0.9; }
        }

        @keyframes glitchShift {
          0%, 100% { transform: translate(0,0); text-shadow: -3px 0 #ff2e93, 3px 0 #22d3ee; }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); text-shadow: 3px 0 #ff2e93, -3px 0 #22d3ee; }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); text-shadow: -3px 0 #22d3ee, 3px 0 #ff2e93; }
        }
        .glitch-text { animation: glitchShift 3s infinite; }

        @keyframes spin-record {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-record 6s linear infinite; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .float { animation: floatY 4s ease-in-out infinite; }

        @keyframes portal-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .portal-ghost { animation: portal-pulse 1.4s ease-out infinite; }

        .flip-card { perspective: 1000px; }
        .flip-inner { transition: transform 0.6s; transform-style: preserve-3d; }
        .flip-card.flipped .flip-inner { transform: rotateY(180deg); }
        .flip-front, .flip-back {
          position: absolute; inset: 0; backface-visibility: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .flip-back { transform: rotateY(180deg); }

        @media (prefers-reduced-motion: reduce) {
          .glitch-text, .spin-slow, .float, .portal-ghost { animation: none !important; }
        }
      `}</style>

      <PortalNav />
      <Confetti burstKey={burst} />

      {/* ================= HERO ================= */}
      <Section
        id="hero"
        className="bg-gradient-to-b from-indigo-950 via-[#170a2b] to-[#0d0518]"
      >
        <Halftone opacity={0.12} />
        <div className="relative z-10 text-center max-w-3xl w-full px-2">
          <h1 className="glitch-text font-display text-fluid-hero text-white leading-none">
            FAYM
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 sm:w-10 bg-fuchsia-400" />
            <p className="font-display text-fluid-sub text-fuchsia-300">
              turns 18
            </p>
            <span className="h-[2px] w-8 sm:w-10 bg-cyan-300" />
          </div>
          <div className="mt-10 flex flex-col items-center gap-2 text-white/50 float">
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </Section>

      {/* ================= BIRTHDAY / 18 ================= */}
      <Section id="birthday" className="bg-[#12081f]">
        <Halftone opacity={0.08} size={18} />
        <div className="relative z-10 w-full max-w-4xl text-center">
          <p className="font-mono2 text-amber-300 text-xs tracking-[0.3em] uppercase mb-2">
            Certificate of Adulthood
          </p>
          <h2 className="font-display text-fluid-h2 text-white mb-3">
            Officially 18
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-12">
            Tap a card. Every one flips into a fact the multiverse already
            knew about you.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {facts.map((f, i) => (
              <button
                key={i}
                onClick={() => setFlipped((s) => ({ ...s, [i]: !s[i] }))}
                className={`flip-card relative h-36 sm:h-40 rounded-xl ${
                  flipped[i] ? "flipped" : ""
                }`}
              >
                <div className="flip-inner relative w-full h-full">
                  <div
                    className="flip-front rounded-xl border-4 border-black bg-fuchsia-600"
                    style={{ boxShadow: "6px 6px 0 rgba(0,0,0,0.85)" }}
                  >
                    <span className="font-display text-4xl">{f.front}</span>
                  </div>
                  <div
                    className="flip-back rounded-xl border-4 border-black bg-cyan-500 p-3 text-center"
                    style={{ boxShadow: "6px 6px 0 rgba(0,0,0,0.85)" }}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-black">
                      {f.back}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= DRAKE / TAKE CARE ================= */}
      <Section
        id="drake"
        className="bg-gradient-to-b from-[#0d0518] via-[#1a0b2e] to-[#0d0518]"
      >
        <Halftone opacity={0.1} />
        <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSpinning((s) => !s)}
              className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full flex items-center justify-center"
              aria-label="Toggle vinyl spin"
            >
              <div
                className={`absolute inset-0 rounded-full ${
                  spinning ? "spin-slow" : ""
                }`}
                style={{
                  background:
                    "repeating-radial-gradient(circle, #0a0510 0px, #0a0510 3px, #1c1030 4px, #1c1030 6px)",
                  boxShadow: "0 0 30px rgba(217,70,239,0.35)",
                }}
              />
              <div
                className={`absolute inset-8 rounded-full bg-fuchsia-600 flex items-center justify-center text-center ${
                  spinning ? "spin-slow" : ""
                }`}
              >
                <span className="font-display text-sm leading-tight px-2">
                  {currentTrack.title}
                </span>
              </div>
              <div className="absolute w-4 h-4 rounded-full bg-black" />
            </button>
            <p className="font-mono2 text-xs text-white/50 mt-4">
              tap the record to {spinning ? "pause" : "spin"}
            </p>
            <p className="font-mono2 text-[11px] text-white/30 mt-1 text-center max-w-[220px]">
              now playing: {currentTrack.title}
            </p>
          </div>

          <div>
            <h2 className="font-display text-fluid-h2-sm text-white mb-1">
              "Take Care"
            </h2>
            <p className="text-white/60 mb-6">
              Drake, on loop, in every era of her life. 
            </p>
            <div
              className="border-4 border-black rounded-xl bg-indigo-950/70 p-4"
              style={{ boxShadow: "6px 6px 0 rgba(0,0,0,0.85)" }}
            >
              {tracklist.map((t) => (
                <button
                  key={t.n}
                  onClick={() => {
                    setCurrentTrack(t);
                    setSpinning(true);
                    window.open(
                      `https://open.spotify.com/track/${t.id}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className={`w-full flex items-center gap-3 py-2 border-b border-white/10 last:border-none hover:bg-white/5 rounded transition-colors text-left ${
                    currentTrack.id === t.id ? "bg-white/10" : ""
                  }`}
                >
                  <span className="font-mono2 text-fuchsia-300 text-xs w-5 shrink-0">
                    {t.n}
                  </span>
                  <Disc3 className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span className="text-sm text-white/90 flex-1">
                    {t.title}
                  </span>
                  <PlayCircle
                    className={`w-4 h-4 shrink-0 ${
                      currentTrack.id === t.id
                        ? "text-fuchsia-300"
                        : "text-white/40"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="font-mono2 text-[11px] text-white/40 mt-3">
            </p>
          </div>
        </div>
      </Section>

      {/* ================= SPIDER-VERSE ================= */}
      <Section
        id="spiderverse"
        className="bg-[#0a0416]"
      >
        <Halftone opacity={0.2} size={10} />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,46,147,0.15) 1px, transparent 1px), linear-gradient(0deg, rgba(34,211,238,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 text-center max-w-3xl">
          <p className="font-mono2 text-fuchsia-300 text-xs tracking-[0.3em] uppercase mb-3">
            Chapter Select
          </p>
          <h2 className="glitch-text font-display text-fluid-h2 mb-6">
            Every Faym is Faym
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10">
            In every version of the multiverse, you shine in your own unique way. Eighteen years of growing, laughing, and building unforgettable memories—and the best chapters are still waiting to be written.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: "Dimension 1", text: "The one with a playlist that never misses." },
              { label: "Dimension 2", text: "The person who always makes everyone feel heard and valued." },
              { label: "Dimension 3", text: "The future finance icon ready to rule the business world." },
            ].map((d, i) => (
              <div
                key={i}
                className="border-4 border-black rounded-xl p-5 bg-gradient-to-br from-indigo-900/80 to-fuchsia-900/40"
                style={{ boxShadow: "6px 6px 0 rgba(0,0,0,0.85)" }}
              >
                <p className="font-mono2 text-[11px] text-cyan-300 mb-2 uppercase tracking-widest">
                  {d.label}
                </p>
                <p className="text-sm text-white/85">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ================= COLLEGE / FINANCE ================= */}
      {/* ================= COLLEGE / FINANCE ================= */}
      <Section
        id="college"
        className="bg-gradient-to-b from-[#0d0518] via-[#111033] to-[#0d0518]"
      >
        <Halftone opacity={0.08} />

        {/* Ambient background floating icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          <GraduationCap className="absolute top-12 left-[10%] w-24 h-24 text-fuchsia-300 -rotate-12" />
          <Sparkles className="absolute bottom-16 right-[12%] w-20 h-20 text-cyan-300 rotate-12" />
        </div>

        <div className="relative z-10 max-w-2xl w-full text-center">
          <p className="font-mono2 text-amber-300 text-xs tracking-[0.3em] uppercase mb-2">
            Breaking News
          </p>
          <h2 className="font-display text-fluid-h2 mb-3">
            She's Going to College
          </h2>
          <p className="text-white/60 mb-10">
            New chapter, new campus, same iconic energy. Open the letter to reveal what’s next.
          </p>

          <div className="flex flex-col items-center gap-8">
            {/* Interactive Envelope Button */}
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  setEnvelopeOpen(true);
                  fireConfetti();
                }}
                className="group relative w-64 h-40 mx-auto max-w-full cursor-pointer hover:scale-105 transition-transform"
                aria-label="Open acceptance letter"
              >
                {/* Base Envelope Background */}
                <div
                  className="absolute inset-0 bg-amber-200 rounded-lg border-4 border-black flex flex-col items-center justify-center overflow-hidden"
                  style={{ boxShadow: "8px 8px 0 rgba(0,0,0,0.85)" }}
                >
                  {/* Decorative Top Flap Line */}
                  <div className="absolute top-0 w-0 h-0 border-l-[120px] border-r-[120px] border-t-[70px] border-l-transparent border-r-transparent border-t-amber-300/80" />

                  {/* Letter Header / Stamp */}
                  <div className="z-10 flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-fuchsia-600 border-2 border-black flex items-center justify-center shadow-md">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-mono2 text-[10px] uppercase font-bold text-black/70 tracking-wider mt-1">
                      CONFIDENTIAL
                    </span>
                  </div>
                </div>
              </button>

              {/* Prompt underneath envelope when closed */}
              {!envelopeOpen && (
                <span className="inline-flex items-center gap-2 font-mono2 text-xs bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40 px-3 py-1.5 rounded-full animate-bounce">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Tap envelope to open
                </span>
              )}
            </div>

            {/* Revealed Acceptance Card */}
            {envelopeOpen && (
              <div
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 border-4 border-black rounded-xl bg-white text-black p-6 max-w-md text-left relative overflow-hidden"
                style={{ boxShadow: "8px 8px 0 #ff2e93, 12px 12px 0 rgba(0,0,0,0.85)" }}
              >
                {/* Top decorative accent bar */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400" />

                <p className="font-mono2 text-[11px] font-bold uppercase tracking-widest text-fuchsia-600 mb-2">
                  🎓 Official Acceptance
                </p>
                <p className="text-sm leading-relaxed font-medium text-slate-800">
                  Congratulations Faym—you made it! Finance major.
                 We all believe in you, and you've got this.
                  We're so proud of you!
                </p>

                <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t-2 border-dashed border-gray-200 text-center">
                  <div>
                    <p className="font-display text-3xl text-fuchsia-600">1</p>
                    <p className="text-[10px] font-mono2 uppercase font-bold text-black/50">
                      Acceptance
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-fuchsia-600">4</p>
                    <p className="text-[10px] font-mono2 uppercase font-bold text-black/50">
                      Years Ahead
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-3xl text-fuchsia-600">∞</p>
                    <p className="text-[10px] font-mono2 uppercase font-bold text-black/50">
                      Upside
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>
      

      {/* ================= FOOTER ================= */}
      <div className="relative z-10 py-16 text-center px-6 bg-[#0a0416]">
        <Halftone opacity={0.1} size={16} />
        <p className="relative font-mono2 text-white/40 text-xs sm:text-sm">
          Happy 18th birthday, Faym — every timeline agrees you're the main character.
        </p>
      </div>
    </div>
  );
}
