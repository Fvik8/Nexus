"use client"
// NEXUS GAMING — Ultra-Premium Gaming E-Commerce Platform
// Full Blueprint Showcase: Hero + PC Builder + FPS Predictor + Daily Drop
// Built with React, CSS-in-JS animations, and Cyber-Luxury design language

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNexusStore, Product, PCComponent } from "./store/useNexusStore";
import { HARDWARE_CATALOG } from "./data/hardware";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const TOKENS = {
  black:       "#050508",
  surface:     "#0a0a0f",
  panel:       "#0f0f1a",
  border:      "rgba(99,102,241,0.18)",
  cyan:        "#00f5ff",
  violet:      "#7c3aed",
  magenta:     "#ff2d78",
  gold:        "#ffd700",
  textPrimary: "#f0f0ff",
  textMuted:   "#7878a0",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --cyan:    #00f5ff;
      --violet:  #7c3aed;
      --magenta: #ff2d78;
      --gold:    #ffd700;
      --black:   #050508;
      --surface: #0a0a0f;
      --panel:   #0f0f1a;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--black);
      color: #f0f0ff;
      font-family: 'Rajdhani', sans-serif;
      overflow-x: hidden;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--violet); border-radius: 2px; }

    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes pulse-glow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-12px) rotate(0.5deg); }
      66% { transform: translateY(-6px) rotate(-0.3deg); }
    }
    @keyframes rgb-border {
      0%   { border-color: #00f5ff; box-shadow: 0 0 20px #00f5ff44; }
      33%  { border-color: #7c3aed; box-shadow: 0 0 20px #7c3aed44; }
      66%  { border-color: #ff2d78; box-shadow: 0 0 20px #ff2d7844; }
      100% { border-color: #00f5ff; box-shadow: 0 0 20px #00f5ff44; }
    }
    @keyframes slide-in-left {
      from { opacity: 0; transform: translateX(-60px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes slide-in-right {
      from { opacity: 0; transform: translateX(60px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes counter-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(-360deg); }
    }
    @keyframes data-stream {
      0% { transform: translateY(0); opacity: 1; }
      100% { transform: translateY(-40px); opacity: 0; }
    }
    @keyframes ping {
      0% { transform: scale(1); opacity: 1; }
      75%, 100% { transform: scale(2); opacity: 0; }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes glitch {
      0%, 100% { transform: translate(0); clip-path: none; }
      10% { transform: translate(-2px, 1px); clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%); }
      20% { transform: translate(2px, -1px); clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); }
      30% { transform: translate(0); clip-path: none; }
    }
    @keyframes heat-bar {
      from { width: 0%; }
      to { width: var(--target-width); }
    }
    @keyframes countdown-tick {
      0% { transform: rotateX(0deg); opacity: 1; }
      49% { transform: rotateX(-90deg); opacity: 0; }
      50% { transform: rotateX(90deg); opacity: 0; }
      100% { transform: rotateX(0deg); opacity: 1; }
    }
    @keyframes neon-flicker {
      0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
      20%, 24%, 55% { opacity: 0.4; }
    }
    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes circuit-draw {
      from { stroke-dashoffset: 1000; }
      to { stroke-dashoffset: 0; }
    }

    .orbitron { font-family: 'Orbitron', sans-serif; }
    .mono { font-family: 'Space Mono', monospace; }

    .neon-text-cyan {
      color: var(--cyan);
      text-shadow: 0 0 10px var(--cyan), 0 0 30px var(--cyan)60, 0 0 60px var(--cyan)30;
    }
    .neon-text-magenta {
      color: var(--magenta);
      text-shadow: 0 0 10px var(--magenta), 0 0 30px var(--magenta)60;
    }
    .glass {
      background: rgba(15,15,26,0.7);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(99,102,241,0.15);
    }
    .mag-btn {
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      cursor: pointer;
    }
    .mag-btn:hover {
      transform: scale(1.04) translateY(-2px);
    }
    .tab-active {
      background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(0,245,255,0.1));
      border-color: rgba(0,245,255,0.5) !important;
      color: var(--cyan) !important;
    }
  `}</style>
);


// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tick, setTick] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 2000);
    return () => clearInterval(t);
  }, []);

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  const specs = [
    { label: "CUDA CORES", value: "16,384" },
    { label: "VRAM", value: "24 GB GDDR7" },
    { label: "TDP", value: "450W" },
    { label: "BOOST CLK", value: "3.21 GHz" },
  ];

  return (
    <section ref={heroRef} onMouseMove={handleMouseMove}
      style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center",
        background: `radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,58,237,0.12) 0%, transparent 60%),
                     radial-gradient(ellipse 50% 40% at 30% 60%, rgba(0,245,255,0.07) 0%, transparent 55%),
                     ${TOKENS.black}`,
        padding: "80px 60px 40px",
      }}>

      {/* Scanline effect */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }} />

      {/* Animated circuit SVG background */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, pointerEvents: "none" }}>
        <defs>
          <pattern id="circuit" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M10 10 H40 V40 H70" fill="none" stroke="#00f5ff" strokeWidth="0.5"/>
            <path d="M70 10 V40 H40 V70" fill="none" stroke="#7c3aed" strokeWidth="0.5"/>
            <circle cx="10" cy="10" r="2" fill="#00f5ff"/>
            <circle cx="70" cy="70" r="2" fill="#7c3aed"/>
            <circle cx="40" cy="40" r="1.5" fill="#ff2d78"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)"/>
      </svg>

      {/* Decorative corner frames */}
      {[{top:20,left:20},{top:20,right:20},{bottom:20,left:20},{bottom:20,right:20}].map((pos,i) => (
        <div key={i} style={{
          position: "absolute", width: 40, height: 40, ...pos,
          borderTop: i < 2 ? `2px solid ${TOKENS.cyan}` : "none",
          borderBottom: i >= 2 ? `2px solid ${TOKENS.cyan}` : "none",
          borderLeft: i % 2 === 0 ? `2px solid ${TOKENS.cyan}` : "none",
          borderRight: i % 2 === 1 ? `2px solid ${TOKENS.cyan}` : "none",
          opacity: 0.4, pointerEvents: "none",
        }} />
      ))}

      {/* LEFT — Text Content */}
      <div style={{ flex: 1, maxWidth: 560, zIndex: 5, animation: "slide-in-left 0.9s cubic-bezier(0.16,1,0.3,1) forwards" }}>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: TOKENS.magenta,
            boxShadow: `0 0 12px ${TOKENS.magenta}`, animation: "ping 1.5s infinite" }} />
          <span className="mono" style={{ fontSize: 11, letterSpacing: 4, color: TOKENS.magenta, fontWeight: 700 }}>
            FEATURED DROP — LIMITED UNITS
          </span>
        </div>

        <h1 className="orbitron" style={{
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 900, lineHeight: 1.0, marginBottom: 8,
          letterSpacing: -1,
        }}>
          <span style={{ display: "block", color: TOKENS.textPrimary }}>RTX</span>
          <span className="neon-text-cyan" style={{ display: "block", fontSize: "1.2em",
            animation: "neon-flicker 8s infinite" }}>
            5090 Ti
          </span>
          <span style={{ display: "block", color: TOKENS.textMuted, fontSize: "0.45em",
            letterSpacing: 8, fontWeight: 400, marginTop: 8 }}>
            PHANTOM SERIES
          </span>
        </h1>

        <p style={{ fontSize: 16, lineHeight: 1.7, color: TOKENS.textMuted, marginBottom: 32, maxWidth: 420 }}>
          The first GPU built on <span style={{ color: TOKENS.cyan }}>Blackwell Ultra</span> architecture.
          Native 8K gaming. 200 TFLOPS of raw compute. 
          This is not hardware — this is <span style={{ color: TOKENS.magenta }}>war.</span>
        </p>

        {/* Spec pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
          {specs.map(s => (
            <div key={s.label} className="glass" style={{
              padding: "8px 16px", borderRadius: 4,
              display: "flex", flexDirection: "column", gap: 2,
            }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: 2, color: TOKENS.textMuted }}>{s.label}</span>
              <span className="orbitron" style={{ fontSize: 13, fontWeight: 700, color: TOKENS.textPrimary }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 36 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: TOKENS.textMuted, letterSpacing: 2 }}>STARTING AT</div>
            <div className="orbitron" style={{
              fontSize: 42, fontWeight: 900, lineHeight: 1,
              background: "linear-gradient(135deg, #ffd700, #ff9500)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>$2,899</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="mag-btn orbitron" style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #7c3aed 0%, #00f5ff 100%)",
              border: "none", borderRadius: 4, color: "#fff",
              fontSize: 13, fontWeight: 700, letterSpacing: 3, cursor: "pointer",
              boxShadow: "0 0 30px rgba(124,58,237,0.5)",
            }}>
              SECURE YOURS →
            </button>
            <button className="mag-btn" style={{
              padding: "12px 32px",
              background: "transparent",
              border: "1px solid rgba(0,245,255,0.3)", borderRadius: 4, color: TOKENS.cyan,
              fontSize: 12, fontWeight: 600, letterSpacing: 2, cursor: "pointer",
            }}>
              ADD TO BUILD
            </button>
          </div>
        </div>

        {/* Stock indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              width: "23%", height: "100%",
              background: "linear-gradient(90deg, #ff2d78, #ff9500)",
              borderRadius: 2,
              boxShadow: "0 0 8px #ff2d78",
              transition: "width 1s ease",
            }} />
          </div>
          <span className="mono" style={{ fontSize: 11, color: TOKENS.magenta, letterSpacing: 1 }}>
            ONLY 47 LEFT
          </span>
        </div>
      </div>

      {/* RIGHT — 3D GPU Visual */}
      <div style={{
        flex: 1, display: "flex", justifyContent: "center", alignItems: "center",
        position: "relative", zIndex: 5,
        animation: "slide-in-right 0.9s cubic-bezier(0.16,1,0.3,1) forwards",
      }}>
        {/* Orbital rings */}
        <div style={{
          position: "absolute", width: 460, height: 460,
          border: "1px solid rgba(0,245,255,0.1)",
          borderRadius: "50%", animation: "spin-slow 20s linear infinite",
        }}>
          <div style={{
            position: "absolute", top: -4, left: "50%", transform: "translateX(-50%)",
            width: 8, height: 8, borderRadius: "50%",
            background: TOKENS.cyan, boxShadow: `0 0 15px ${TOKENS.cyan}`,
          }} />
        </div>
        <div style={{
          position: "absolute", width: 380, height: 380,
          border: "1px solid rgba(124,58,237,0.15)",
          borderRadius: "50%", animation: "counter-spin 15s linear infinite",
        }}>
          <div style={{
            position: "absolute", bottom: -4, right: "20%",
            width: 6, height: 6, borderRadius: "50%",
            background: TOKENS.violet, boxShadow: `0 0 12px ${TOKENS.violet}`,
          }} />
        </div>

        {/* GPU Card visual */}
        <div style={{
          position: "relative",
          animation: "float 6s ease-in-out infinite",
          transform: `perspective(800px) rotateY(${mousePos.x * -8}deg) rotateX(${mousePos.y * 4}deg)`,
          transition: "transform 0.1s ease-out",
        }}>
          {/* Glow halo */}
          <div style={{
            position: "absolute", inset: -40,
            background: "radial-gradient(ellipse at center, rgba(124,58,237,0.35) 0%, transparent 70%)",
            animation: "pulse-glow 3s ease-in-out infinite",
          }} />

          {/* GPU Body */}
          <div style={{
            width: 340, height: 200,
            background: "linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 40%, #1a1040 100%)",
            borderRadius: 16,
            border: "2px solid transparent",
            backgroundClip: "padding-box",
            position: "relative",
            boxShadow: `
              0 0 0 1px rgba(124,58,237,0.4),
              0 0 60px rgba(124,58,237,0.2),
              0 40px 80px rgba(0,0,0,0.6),
              inset 0 1px 0 rgba(255,255,255,0.08)
            `,
            animation: "rgb-border 4s linear infinite",
          }}>
            {/* PCB texture */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden", opacity: 0.15,
              backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,245,255,0.1) 3px,rgba(0,245,255,0.1) 4px), repeating-linear-gradient(90deg,transparent,transparent 20px,rgba(0,245,255,0.05) 20px,rgba(0,245,255,0.05) 21px)",
            }} />

            {/* Fan shroud */}
            <div style={{ position: "absolute", top: 12, left: 12, right: 12, bottom: 40, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(0,0,0,0.5), rgba(20,10,40,0.8))",
              border: "1px solid rgba(255,255,255,0.05)",
              display: "flex", alignItems: "center", justifyContent: "space-around",
              padding: "0 20px",
            }}>
              {/* Fan 1 */}
              {[0, 1].map(fi => (
                <div key={fi} style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "radial-gradient(circle, #1a1a2e 20%, transparent 60%)",
                  border: "2px solid rgba(124,58,237,0.3)",
                  position: "relative", overflow: "hidden",
                  boxShadow: "0 0 20px rgba(124,58,237,0.2)",
                }}>
                  <div style={{
                    position: "absolute", inset: 4, borderRadius: "50%",
                    background: "conic-gradient(from 0deg, transparent 0deg, rgba(0,245,255,0.3) 60deg, transparent 90deg, rgba(124,58,237,0.2) 150deg, transparent 180deg, rgba(0,245,255,0.3) 240deg, transparent 270deg, rgba(124,58,237,0.2) 330deg, transparent 360deg)",
                    animation: `spin-slow ${3 + fi}s linear infinite`,
                  }} />
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 12, height: 12, borderRadius: "50%",
                    background: TOKENS.cyan, boxShadow: `0 0 10px ${TOKENS.cyan}`,
                  }} />
                </div>
              ))}
            </div>

            {/* NEXUS branding on GPU */}
            <div className="orbitron" style={{
              position: "absolute", bottom: 10, left: 20,
              fontSize: 11, letterSpacing: 4, fontWeight: 900,
              color: TOKENS.cyan, opacity: 0.9,
              textShadow: `0 0 10px ${TOKENS.cyan}`,
            }}>NEXUS</div>

            {/* RGB strip */}
            <div style={{
              position: "absolute", bottom: 0, left: 16, right: 16, height: 3,
              borderRadius: "0 0 14px 14px",
              background: "linear-gradient(90deg, #ff2d78, #7c3aed, #00f5ff, #ffd700, #ff2d78)",
              backgroundSize: "200% 100%",
              animation: "gradient-shift 3s linear infinite",
              boxShadow: "0 0 12px rgba(0,245,255,0.6)",
            }} />
          </div>

          {/* Backplate */}
          <div style={{
            position: "absolute", top: 10, left: -8, right: -8, bottom: -8,
            background: "#080810",
            borderRadius: "0 0 18px 18px",
            border: "1px solid rgba(255,255,255,0.05)",
            zIndex: -1,
          }}>
            <div style={{
              position: "absolute", bottom: 8, left: 20,
              fontSize: 8, letterSpacing: 6, color: "rgba(255,255,255,0.2)",
              fontFamily: "monospace",
            }}>RTX 5090 Ti // PHANTOM</div>
          </div>
        </div>

        {/* Data tags floating around GPU */}
        {[
          { label: "8K@240Hz", pos: { top: "10%", right: "5%" }, color: TOKENS.cyan },
          { label: "AI BOOST", pos: { top: "50%", right: "2%" }, color: TOKENS.violet },
          { label: "200 TFLOPS", pos: { bottom: "15%", right: "8%" }, color: TOKENS.magenta },
        ].map(tag => (
          <div key={tag.label} className="glass mono" style={{
            position: "absolute", ...tag.pos,
            padding: "6px 12px", borderRadius: 4,
            fontSize: 10, letterSpacing: 2, color: tag.color,
            border: `1px solid ${tag.color}40`,
            boxShadow: `0 0 20px ${tag.color}20`,
          }}>
            ◈ {tag.label}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── DAILY DROP COUNTDOWN ─────────────────────────────────────────────────────
function DailyDrop() {
  const [timeLeft, setTimeLeft] = useState({ h: 5, m: 47, s: 33 });

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        s--; if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = n => String(n).padStart(2, "0");

  const drops = [
    { id: 'd1', name: "ROG SWIFT OLED 4K", sub: "360Hz — 0.03ms GtG", price: 1299, units: 12, img: "🖥️", hot: true, category: "Monitor" },
    { id: 'd2', name: "Wooting 60HE+ APEX", sub: "Analog Hall Effect — 0.1ms", price: 199, units: 34, img: "⌨️", hot: false, category: "Keyboard" },
    { id: 'd3', name: "Xenics Titan Air", sub: "26K DPI — 95g Ultralight", price: 149, units: 7, img: "🖱️", hot: true, category: "Mouse" },
  ];

  const addToCart = useNexusStore(state => state.addToCart);

  return (
    <section style={{
      padding: "100px 60px",
      background: `linear-gradient(180deg, ${TOKENS.black} 0%, ${TOKENS.surface} 50%, ${TOKENS.black} 100%)`,
      position: "relative",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.4), transparent)",
      }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: 5, color: TOKENS.magenta, marginBottom: 12 }}>
          ⚡ FLASH EVENT — ENDS IN
        </div>

        {/* Countdown */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, marginBottom: 24 }}>
          {[
            { val: pad(timeLeft.h), label: "HRS" },
            { val: ":", label: null },
            { val: pad(timeLeft.m), label: "MIN" },
            { val: ":", label: null },
            { val: pad(timeLeft.s), label: "SEC" },
          ].map((item, i) => item.label === null ? (
            <span key={i} className="orbitron" style={{ fontSize: 52, fontWeight: 900, color: TOKENS.violet, lineHeight: 1 }}>:</span>
          ) : (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="glass orbitron" style={{
                fontSize: 52, fontWeight: 900, padding: "4px 16px", borderRadius: 6,
                color: TOKENS.textPrimary, minWidth: 90, textAlign: "center",
                border: "1px solid rgba(0,245,255,0.2)",
                boxShadow: "0 0 30px rgba(0,245,255,0.05)",
              }}>{item.val}</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: 3, color: TOKENS.textMuted, marginTop: 6 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <h2 className="orbitron" style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>
          DAILY <span className="neon-text-magenta">DROP</span>
        </h2>
      </div>

      {/* Drop cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
        {drops.map((item, i) => (
          <div key={i} className="glass mag-btn" style={{
            borderRadius: 12, overflow: "hidden", cursor: "pointer",
            border: item.hot ? `1px solid rgba(255,45,120,0.3)` : "1px solid rgba(99,102,241,0.15)",
            transition: "all 0.3s ease",
            position: "relative",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = `0 20px 60px rgba(${item.hot ? "255,45,120" : "0,245,255"},0.2)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}>

            {item.hot && (
              <div style={{
                position: "absolute", top: 12, right: 12,
                padding: "4px 10px", borderRadius: 20,
                background: "linear-gradient(135deg, #ff2d78, #ff9500)",
                fontSize: 9, fontWeight: 700, letterSpacing: 2, color: "#fff",
                zIndex: 2,
              }}>🔥 HOT</div>
            )}

            <div style={{
              height: 160, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 72,
              background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(0,245,255,0.05))",
            }}>{item.img}</div>

            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: TOKENS.textPrimary }}>{item.name}</div>
              <div className="mono" style={{ fontSize: 10, color: TOKENS.textMuted, marginBottom: 16, letterSpacing: 1 }}>{item.sub}</div>

              {/* Stock bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="mono" style={{ fontSize: 9, color: TOKENS.textMuted, letterSpacing: 1 }}>UNITS LEFT</span>
                  <span className="mono" style={{ fontSize: 9, color: item.units < 15 ? TOKENS.magenta : TOKENS.cyan }}>
                    {item.units} / 50
                  </span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{
                    width: `${(item.units / 50) * 100}%`, height: "100%",
                    background: item.units < 15
                      ? "linear-gradient(90deg, #ff2d78, #ff9500)"
                      : "linear-gradient(90deg, #7c3aed, #00f5ff)",
                    borderRadius: 2,
                    transition: "width 1s ease",
                  }} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="orbitron" style={{ fontSize: 20, fontWeight: 900, color: TOKENS.gold }}>${item.price.toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(item)}
                  style={{
                    padding: "8px 16px", borderRadius: 4,
                    background: item.hot
                      ? "linear-gradient(135deg, #ff2d78, #ff9500)"
                      : "linear-gradient(135deg, #7c3aed, #00f5ff)",
                    border: "none", color: "#fff",
                    fontSize: 11, fontWeight: 700, letterSpacing: 2, cursor: "pointer",
                  }}>BUY NOW</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PC BUILDER ───────────────────────────────────────────────────────────────
function PCBuilder() {
  const { currentBuild: selected, updateBuild } = useNexusStore();
  const addToCart = useNexusStore(state => state.addToCart);
  
  // Dynamically group components from the hardware catalog
  const catalog = useMemo(() => {
    const getPerf = (p: any) => {
      if (p.category === "GPU") return p.price > 2000 ? 100 : p.price > 1000 ? 82 : 70;
      if (p.category === "CPU") return p.price > 500 ? 98 : p.price > 400 ? 85 : 72;
      return 0;
    };

    const mapItem = (p: any): PCComponent => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      socket: p.specs?.socket,
      tdp: p.specs?.tdp ? parseInt(p.specs.tdp) : undefined,
      vram: p.specs?.vram ? parseInt(p.specs.vram) : undefined,
      perf: getPerf(p),
      compat: p.category === "Motherboards" ? [p.specs?.socket || ""] : undefined,
      img: p.img
    });

    return {
      cpu: HARDWARE_CATALOG.filter(p => p.category === "CPU").map(mapItem),
      mobo: HARDWARE_CATALOG.filter(p => p.category === "Motherboards").map(mapItem),
      gpu: HARDWARE_CATALOG.filter(p => p.category === "GPU").map(mapItem),
      ram: HARDWARE_CATALOG.filter(p => p.category === "RAM").map(mapItem),
      cooling: HARDWARE_CATALOG.filter(p => p.category === "Cooling").map(mapItem),
      cases: HARDWARE_CATALOG.filter(p => p.category === "Cases").map(mapItem),
    };
  }, []);

  const [activeTab, setActiveTab] = useState("cpu");
  const tabs = ["cpu", "mobo", "gpu", "ram", "cooling", "cases"];
  const tabLabels: Record<string, string> = { 
    cpu: "CPU", 
    mobo: "MOBO", 
    gpu: "GPU", 
    ram: "RAM",
    cooling: "COOLING",
    cases: "CASE"
  };

  const isCompatible = (comp: PCComponent) => {
    if (activeTab === "mobo" && selected.cpu) {
      return comp.compat?.includes(selected.cpu.socket || "");
    }
    if (activeTab === "cpu" && selected.mobo) {
      return selected.mobo.compat?.includes(comp.socket || "");
    }
    return true;
  };

  const totalPrice: number = (Object.values(selected) as (PCComponent | null)[]).reduce((s: number, c) => s + (c?.price || 0), 0);
  const totalPerf = (selected.gpu?.perf || 0) + (selected.cpu?.perf || 0) / 2; // Weighting GPU more for gaming

  const checkSocketConflict = () => {
    if (selected.cpu && selected.mobo) {
      return selected.mobo.compat?.includes(selected.cpu.socket || "") ?? true;
    }
    return true;
  };

  const responsiveMessage = useMemo(() => {
    if (!selected.cpu && !selected.gpu) return "Awaiting configuration...";
    if (totalPerf > 90) return "GOD-TIER MACHINE DETECTED";
    return "Optimizing for peak efficiency...";
  }, [selected, totalPerf]);

  const compatible = checkSocketConflict();

  const handleLockBuild = () => {
    const buildId = Date.now();
    Object.values(selected).forEach(comp => {
      if (comp) addToCart({ ...comp, id: `${comp.id}-${buildId}`, category: "Build Component", img: "⚡" });
    });
  };

  return (
    <section style={{
      padding: "100px 60px",
      background: TOKENS.black,
      position: "relative",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 5, color: TOKENS.cyan, marginBottom: 12 }}>
            ◈ INTERACTIVE CONFIGURATOR
          </div>
          <h2 className="orbitron" style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1 }}>
            BUILD YOUR <span className="neon-text-cyan">BATTLE STATION</span>
          </h2>
          <p style={{ color: TOKENS.textMuted, fontSize: 15, marginTop: 12, maxWidth: 500 }}>
            Smart compatibility engine validates every pick in real-time. Zero conflicts. Maximum performance.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          {/* Left — Selector */}
          <div className="glass" style={{ borderRadius: 16, padding: 28, border: `1px solid ${TOKENS.border}` }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {tabs.map(t => (
                <button key={t} onClick={() => setActiveTab(t)}
                  className={activeTab === t ? "tab-active orbitron" : "orbitron"}
                  style={{
                    padding: "8px 16px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                    letterSpacing: 2, cursor: "pointer",
                    background: "transparent",
                    border: "1px solid rgba(99,102,241,0.2)",
                    color: TOKENS.textMuted,
                    transition: "all 0.2s",
                    position: "relative",
                  }}>
                  {tabLabels[t]}
                  {selected[t] && (
                    <div style={{
                      position: "absolute", top: -4, right: -4,
                      width: 8, height: 8, borderRadius: "50%",
                      background: TOKENS.cyan, boxShadow: `0 0 8px ${TOKENS.cyan}`,
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* Component list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 600, overflowY: "auto", paddingRight: 8 }}>
              {catalog[activeTab].map(comp => {
                const compat = isCompatible(comp);
                const isSelected = selected[activeTab]?.id === comp.id;
                return (
                  <div key={comp.id}
                    onClick={() => compat && updateBuild(activeTab, isSelected ? null : comp)}
                    style={{
                      padding: "16px 20px", borderRadius: 10, cursor: compat ? "pointer" : "not-allowed",
                      border: isSelected
                        ? `1px solid ${TOKENS.cyan}`
                        : compat ? "1px solid rgba(99,102,241,0.15)" : "1px solid rgba(255,45,120,0.15)",
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.05))"
                        : compat ? "rgba(255,255,255,0.02)" : "rgba(255,45,120,0.03)",
                      opacity: compat ? 1 : 0.45,
                      transition: "all 0.2s",
                      display: "flex", alignItems: "center", gap: 16,
                      position: "relative",
                    }}>

                    {/* Selection indicator */}
                    <div style={{
                      width: 20, height: 20, borderRadius: "50%", flexShrink: 0,
                      border: `2px solid ${isSelected ? TOKENS.cyan : "rgba(255,255,255,0.15)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isSelected ? TOKENS.cyan : "transparent",
                    }}>
                      {isSelected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#000" }} />}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: TOKENS.textPrimary, marginBottom: 2 }}>
                        {comp.brand} {comp.name}
                      </div>
                      <div className="mono" style={{ fontSize: 10, color: TOKENS.textMuted, letterSpacing: 1 }}>
                        {comp.socket && `${comp.socket} · `}
                        {comp.tdp && `${comp.tdp}W TDP · `}
                        {comp.vram && `${comp.vram}GB VRAM · `}
                        {comp.perf && `PERF ${comp.perf}/100`}
                      </div>
                    </div>

                    {!compat && (
                      <div style={{ fontSize: 10, color: TOKENS.magenta, letterSpacing: 1 }}>⚠ INCOMPATIBLE</div>
                    )}
                    <div className="orbitron" style={{ fontSize: 16, fontWeight: 900, color: TOKENS.gold }}>
                      ${comp.price.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Build Summary */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Compatibility status */}
            <div className="glass" style={{
              borderRadius: 12, padding: 16,
              border: `1px solid ${compatible ? "rgba(0,245,255,0.2)" : "rgba(255,45,120,0.4)"}`,
              background: compatible ? "rgba(0,245,255,0.03)" : "rgba(255,45,120,0.06)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: compatible ? TOKENS.cyan : TOKENS.magenta,
                  boxShadow: `0 0 10px ${compatible ? TOKENS.cyan : TOKENS.magenta}`,
                }} />
                <span className="mono" style={{
                  fontSize: 11, letterSpacing: 2,
                  color: compatible ? TOKENS.cyan : TOKENS.magenta,
                }}>
                  {compatible ? "COMPATIBLE BUILD" : "SOCKET MISMATCH"}
                </span>
              </div>
            </div>

            {/* Selected components summary */}
            <div className="glass" style={{ borderRadius: 12, padding: 20, border: `1px solid ${TOKENS.border}`, flex: 1 }}>
              <div className="orbitron" style={{ fontSize: 12, letterSpacing: 3, color: TOKENS.textMuted, marginBottom: 16 }}>
                BUILD MANIFEST
              </div>
              {tabs.map(t => (
                <div key={t} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ flex: 1, marginRight: 12 }}>
                    <div className="mono" style={{ fontSize: 8, letterSpacing: 1, color: TOKENS.textMuted }}>{tabLabels[t]}</div>
                    <div style={{ fontSize: 11, color: selected[t] ? TOKENS.textPrimary : "rgba(255,255,255,0.15)", marginTop: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {selected[t] ? `${selected[t].brand} ${selected[t].name}` : "— EMPTY_SLOT"}
                    </div>
                  </div>
                  {selected[t] && (
                    <span className="orbitron" style={{ fontSize: 11, fontWeight: 700, color: TOKENS.gold }}>
                      ${selected[t].price.toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Performance bar */}
            {totalPerf > 0 && (
              <div className="glass" style={{ borderRadius: 12, padding: 16, border: `1px solid ${TOKENS.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="mono" style={{ fontSize: 10, color: TOKENS.textMuted, letterSpacing: 2 }}>PERF SCORE</span>
                  <span className="orbitron" style={{ fontSize: 14, fontWeight: 900, color: TOKENS.cyan }}>{totalPerf}/100</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${totalPerf}%`, height: "100%", borderRadius: 3,
                    background: "linear-gradient(90deg, #7c3aed, #00f5ff)",
                    boxShadow: `0 0 12px ${TOKENS.cyan}`,
                    transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                  }} />
                </div>
              </div>
            )}

            {/* Total + CTA */}
            <div className="glass" style={{
              borderRadius: 12, padding: 20,
              border: "1px solid rgba(0,245,255,0.2)",
              background: "linear-gradient(135deg, rgba(0,245,255,0.04), rgba(124,58,237,0.04))",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
                <div>
                  <div className="mono" style={{ fontSize: 9, color: TOKENS.textMuted, letterSpacing: 2 }}>BUILD TOTAL</div>
                  <div className="orbitron" style={{
                    fontSize: 28, fontWeight: 900,
                    background: "linear-gradient(135deg, #ffd700, #ff9500)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    ${totalPrice.toLocaleString()}
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 10, color: TOKENS.textMuted, textAlign: "right" }}>
                  {Object.values(selected).filter(Boolean).length} / 6<br/>
                  slots active
                </div>
              </div>

              <button 
                onClick={() => totalPrice > 0 && handleLockBuild()}
                className="orbitron" style={{
                width: "100%", padding: "14px",
                background: totalPrice > 0
                  ? "linear-gradient(135deg, #7c3aed, #00f5ff)"
                  : "rgba(255,255,255,0.05)",
                border: "none", borderRadius: 8,
                color: totalPrice > 0 ? "#fff" : TOKENS.textMuted,
                fontSize: 12, fontWeight: 700, letterSpacing: 3, cursor: totalPrice > 0 ? "pointer" : "default",
                boxShadow: totalPrice > 0 ? "0 0 30px rgba(124,58,237,0.4)" : "none",
                transition: "all 0.3s",
              }}>
                {totalPrice > 0 ? "LOCK IN BUILD →" : "SELECT COMPONENTS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AI FPS PREDICTOR ─────────────────────────────────────────────────────────
const GAMES = [
  { name: "Cyberpunk 2077", icon: "🌆", base: 140, rayBase: 60 },
  { name: "Apex Legends", icon: "🎯", base: 380, rayBase: 280 },
  { name: "Alan Wake 2", icon: "🔦", base: 90, rayBase: 45 },
  { name: "Microsoft Flight Sim", icon: "✈️", base: 80, rayBase: 60 },
  { name: "Valorant", icon: "💥", base: 600, rayBase: 500 },
  { name: "Black Myth: Wukong", icon: "🐒", base: 110, rayBase: 55 },
];

const GPU_PRESETS = [
  { name: "RTX 5090 Ti", mult: 1.0, price: 2899 },
  { name: "RTX 5080 SUPER", mult: 0.72, price: 1299 },
  { name: "RX 9900 XTX", mult: 0.68, price: 999 },
  { name: "RTX 4090", mult: 0.58, price: 1599 },
];

function FPSPredictor() {
  const [gpu, setGpu] = useState(0);
  const [game, setGame] = useState(0);
  const [res, setRes] = useState("1440p");
  const [rt, setRt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const resMultipliers = { "1080p": 1.5, "1440p": 1.0, "4K": 0.52, "8K": 0.18 };

  const predict = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const g = GPU_PRESETS[gpu];
      const gm = GAMES[game];
      const base = rt ? gm.rayBase : gm.base;
      const fps = Math.round(base * g.mult * resMultipliers[res]);
      const min = Math.round(fps * 0.82);
      const max = Math.round(fps * 1.12);
      const quality = fps >= 240 ? "GODLIKE" : fps >= 144 ? "ELITE" : fps >= 60 ? "SMOOTH" : "PLAYABLE";
      const qualityColor = fps >= 240 ? TOKENS.gold : fps >= 144 ? TOKENS.cyan : fps >= 60 ? "#4ade80" : TOKENS.magenta;
      setResult({ fps, min, max, quality, qualityColor });
      setLoading(false);
    }, 1200);
  };

  const tiers = [
    { label: "30 FPS", val: 30, color: TOKENS.magenta },
    { label: "60 FPS", val: 60, color: "#f97316" },
    { label: "144 FPS", val: 144, color: "#4ade80" },
    { label: "240 FPS", val: 240, color: TOKENS.cyan },
    { label: "360+ FPS", val: 360, color: TOKENS.gold },
  ];

  return (
    <section style={{
      padding: "100px 60px",
      background: `radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%), ${TOKENS.surface}`,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: 5, color: TOKENS.violet, marginBottom: 12 }}>
            ◈ NEXUS AI ENGINE
          </div>
          <h2 className="orbitron" style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1 }}>
            <span className="neon-text-cyan">AI</span> FPS PREDICTOR
          </h2>
          <p style={{ color: TOKENS.textMuted, marginTop: 12, fontSize: 15 }}>
            Our neural model trained on 2M+ benchmark data points predicts your exact frame rate.<br />
            Before you buy. Before you build. Before you regret.
          </p>
        </div>

        <div className="glass" style={{ borderRadius: 20, padding: 40, border: `1px solid ${TOKENS.border}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Left — Inputs */}
            <div>
              {/* GPU select */}
              <div style={{ marginBottom: 28 }}>
                <label className="mono" style={{ fontSize: 10, letterSpacing: 3, color: TOKENS.textMuted, display: "block", marginBottom: 12 }}>
                  SELECT GPU
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {GPU_PRESETS.map((g, i) => (
                    <div key={i} onClick={() => setGpu(i)} style={{
                      padding: "12px 16px", borderRadius: 8, cursor: "pointer",
                      border: gpu === i ? `1px solid ${TOKENS.violet}` : "1px solid rgba(99,102,241,0.15)",
                      background: gpu === i ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.02)",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      transition: "all 0.2s",
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: gpu === i ? TOKENS.textPrimary : TOKENS.textMuted }}>
                        {g.name}
                      </div>
                      <div className="mono" style={{ fontSize: 10, color: TOKENS.gold }}>${g.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Game select */}
              <div style={{ marginBottom: 28 }}>
                <label className="mono" style={{ fontSize: 10, letterSpacing: 3, color: TOKENS.textMuted, display: "block", marginBottom: 12 }}>
                  SELECT GAME
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {GAMES.map((g, i) => (
                    <div key={i} onClick={() => setGame(i)} style={{
                      padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                      border: game === i ? `1px solid ${TOKENS.cyan}` : "1px solid rgba(99,102,241,0.12)",
                      background: game === i ? "rgba(0,245,255,0.08)" : "rgba(255,255,255,0.02)",
                      fontSize: 12, fontWeight: 600,
                      color: game === i ? TOKENS.textPrimary : TOKENS.textMuted,
                      transition: "all 0.2s",
                    }}>
                      {g.icon} {g.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings row */}
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
                <div>
                  <label className="mono" style={{ fontSize: 9, letterSpacing: 3, color: TOKENS.textMuted, display: "block", marginBottom: 8 }}>
                    RESOLUTION
                  </label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["1080p","1440p","4K","8K"].map(r => (
                      <button key={r} onClick={() => setRes(r)} style={{
                        padding: "6px 12px", borderRadius: 4, cursor: "pointer",
                        border: res === r ? `1px solid ${TOKENS.cyan}` : "1px solid rgba(99,102,241,0.15)",
                        background: res === r ? "rgba(0,245,255,0.1)" : "transparent",
                        color: res === r ? TOKENS.cyan : TOKENS.textMuted,
                        fontSize: 11, fontWeight: 600, letterSpacing: 1,
                      }}>{r}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ray Tracing toggle */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div onClick={() => setRt(!rt)} style={{
                  width: 44, height: 24, borderRadius: 12, cursor: "pointer",
                  background: rt ? "linear-gradient(90deg, #7c3aed, #00f5ff)" : "rgba(255,255,255,0.1)",
                  position: "relative", transition: "all 0.3s",
                  border: `1px solid ${rt ? TOKENS.violet : "rgba(255,255,255,0.1)"}`,
                }}>
                  <div style={{
                    position: "absolute", top: 2, left: rt ? 20 : 2,
                    width: 18, height: 18, borderRadius: "50%",
                    background: "#fff", transition: "all 0.3s",
                    boxShadow: rt ? `0 0 8px ${TOKENS.cyan}` : "none",
                  }} />
                </div>
                <span style={{ fontSize: 13, color: rt ? TOKENS.textPrimary : TOKENS.textMuted, fontWeight: 600 }}>
                  Ray Tracing {rt ? "ON" : "OFF"}
                </span>
              </div>

              <button onClick={predict} disabled={loading} className="orbitron" style={{
                width: "100%", padding: "16px",
                background: "linear-gradient(135deg, #7c3aed 0%, #00f5ff 100%)",
                border: "none", borderRadius: 10,
                color: "#fff", fontSize: 14, fontWeight: 700, letterSpacing: 3,
                cursor: loading ? "wait" : "pointer",
                boxShadow: "0 0 40px rgba(124,58,237,0.4)",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.2s",
              }}>
                {loading ? "ANALYZING..." : "▶ PREDICT FPS"}
              </button>
            </div>

            {/* Right — Result */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              {!result && !loading && (
                <div style={{ textAlign: "center", opacity: 0.3 }}>
                  <div style={{ fontSize: 80, marginBottom: 16 }}>🎮</div>
                  <div className="orbitron" style={{ fontSize: 13, letterSpacing: 3, color: TOKENS.textMuted }}>
                    CONFIGURE & PREDICT
                  </div>
                </div>
              )}

              {loading && (
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    border: `3px solid rgba(124,58,237,0.2)`,
                    borderTop: `3px solid ${TOKENS.cyan}`,
                    animation: "spin-slow 0.8s linear infinite",
                    margin: "0 auto 24px",
                  }} />
                  <div className="mono" style={{ fontSize: 11, letterSpacing: 3, color: TOKENS.textMuted }}>
                    NEURAL NET PROCESSING...
                  </div>
                  {["Loading benchmark corpus...", "Cross-referencing thermal data...", "Calculating frame rate..."].map((t, i) => (
                    <div key={i} className="mono" style={{
                      fontSize: 10, color: TOKENS.textMuted, marginTop: 6, opacity: 0.5,
                    }}>› {t}</div>
                  ))}
                </div>
              )}

              {result && (
                <div style={{ textAlign: "center", animation: "fade-up 0.5s ease forwards" }}>
                  <div className="mono" style={{ fontSize: 11, letterSpacing: 4, color: TOKENS.textMuted, marginBottom: 16 }}>
                    AVG PREDICTED FPS @ {res} {rt ? "+ RT" : ""}
                  </div>

                  <div className="orbitron" style={{
                    fontSize: 96, fontWeight: 900, lineHeight: 1,
                    color: result.qualityColor,
                    textShadow: `0 0 30px ${result.qualityColor}80, 0 0 60px ${result.qualityColor}30`,
                    marginBottom: 4,
                  }}>
                    {result.fps}
                  </div>
                  <div className="mono" style={{ fontSize: 12, color: TOKENS.textMuted, marginBottom: 20 }}>
                    FRAMES PER SECOND
                  </div>

                  <div style={{
                    display: "inline-block", padding: "8px 24px", borderRadius: 20,
                    background: `${result.qualityColor}20`,
                    border: `1px solid ${result.qualityColor}50`,
                  }}>
                    <span className="orbitron" style={{ fontSize: 13, fontWeight: 900, letterSpacing: 4, color: result.qualityColor }}>
                      {result.quality}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24 }}>
                    <div>
                      <div className="mono" style={{ fontSize: 9, color: TOKENS.textMuted, letterSpacing: 2 }}>1% LOW</div>
                      <div className="orbitron" style={{ fontSize: 20, fontWeight: 900, color: TOKENS.textPrimary }}>{result.min}</div>
                    </div>
                    <div style={{ width: 1, background: "rgba(255,255,255,0.08)" }} />
                    <div>
                      <div className="mono" style={{ fontSize: 9, color: TOKENS.textMuted, letterSpacing: 2 }}>PEAK</div>
                      <div className="orbitron" style={{ fontSize: 20, fontWeight: 900, color: TOKENS.textPrimary }}>{result.max}</div>
                    </div>
                  </div>

                  {/* FPS tier comparison */}
                  <div style={{ marginTop: 28, textAlign: "left" }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: 3, color: TOKENS.textMuted, marginBottom: 12 }}>
                      PERFORMANCE TIER COMPARISON
                    </div>
                    {tiers.map(tier => (
                      <div key={tier.label} style={{ marginBottom: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                          <span className="mono" style={{ fontSize: 9, color: result.fps >= tier.val ? tier.color : TOKENS.textMuted, letterSpacing: 1 }}>
                            {tier.label}
                          </span>
                          {result.fps >= tier.val && (
                            <span style={{ fontSize: 10, color: tier.color }}>✓</span>
                          )}
                        </div>
                        <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{
                            width: result.fps >= tier.val ? "100%" : `${(result.fps / tier.val) * 100}%`,
                            height: "100%",
                            background: tier.color,
                            borderRadius: 2,
                            opacity: result.fps >= tier.val ? 1 : 0.3,
                            transition: "width 0.8s ease",
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "60px 60px 40px",
      borderTop: "1px solid rgba(99,102,241,0.1)",
      background: TOKENS.black,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
        <div>
          <div className="orbitron" style={{ fontSize: 28, fontWeight: 900, letterSpacing: 4, marginBottom: 8 }}>
            <span className="neon-text-cyan">NEX</span><span style={{ color: TOKENS.magenta }}>US</span>
          </div>
          <p style={{ fontSize: 13, color: TOKENS.textMuted, maxWidth: 280, lineHeight: 1.6 }}>
            The future of gaming hardware. Built for those who refuse to compromise on performance.
          </p>
        </div>
        <div style={{ display: "flex", gap: 60 }}>
          {[
            { label: "HARDWARE", links: ["Custom PCs", "GPUs", "Peripherals", "Displays"] },
            { label: "BUILD", links: ["PC Configurator", "Pre-builds", "Compatibility", "Guides"] },
            { label: "NEXUS", links: ["AI Lab", "Daily Drops", "Arena", "Support"] },
          ].map(col => (
            <div key={col.label}>
              <div className="mono" style={{ fontSize: 10, letterSpacing: 3, color: TOKENS.textMuted, marginBottom: 16 }}>{col.label}</div>
              {col.links.map(l => (
                <div key={l} style={{ fontSize: 13, color: "rgba(240,240,255,0.5)", marginBottom: 8, cursor: "pointer",
                  transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = TOKENS.cyan}
                  onMouseLeave={e => e.target.style.color = "rgba(240,240,255,0.5)"}>
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{
        borderTop: "1px solid rgba(99,102,241,0.08)",
        paddingTop: 24,
        display: "flex", justifyContent: "space-between",
      }}>
        <span className="mono" style={{ fontSize: 10, color: TOKENS.textMuted, letterSpacing: 1 }}>
          © 2026 NEXUS GAMING — All Rights Reserved
        </span>
        <span className="mono" style={{ fontSize: 10, color: TOKENS.textMuted, letterSpacing: 1 }}>
          Built on Next.js 14 · Powered by AI
        </span>
      </div>
    </footer>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function NexusGaming() {
  const [view, setView] = useState("home");
  const [showLogin, setShowLogin] = useState(false);
  const { user, isCartOpen, setCartOpen } = useNexusStore();

  const handleArenaClick = () => {
    if (user?.isLoggedIn) {
      setView("ARENA");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Nav setView={setView} currentView={view} onArenaClick={handleArenaClick} onLoginClick={() => setShowLogin(true)} />
      
      <main style={{ minHeight: "100vh" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {view === "home" && (
              <>
                <Hero />
                <DailyDrop />
                <PCBuilder />
                <FPSPredictor />
              </>
            )}
            {view === "HARDWARE" && <HardwareView />}
            {view === "BUILD" && <PCBuilder />}
            {view === "DROPS" && <DailyDrop />}
            {view === "AI LAB" && <FPSPredictor />}
            {view === "ARENA" && <ArenaView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {isCartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
}

function LoginModal({ onClose }) {
  const [name, setName] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const login = useNexusStore(state => state.login);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      onClose();
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      login("CYBER_CORE @google_user", true);
      setIsGoogleLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)"
    }} onClick={onClose}>
      <div className="glass" style={{
        width: 400, padding: 40, borderRadius: 16,
        animation: "fade-up 0.4s ease-out",
        position: "relative"
      }} onClick={e => e.stopPropagation()}>
        <div style={{ position: "absolute", top: 20, right: 20, cursor: "pointer", color: TOKENS.textMuted }} onClick={onClose}>✕</div>
        <h2 className="orbitron" style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>
          WELCOME <span className="neon-text-cyan">CLIENT</span>
        </h2>
        <p style={{ color: TOKENS.textMuted, fontSize: 13, marginBottom: 32 }}>Authenticate to access the Nexus grid.</p>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="mag-btn" 
          style={{
            width: "100%", padding: "14px", background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            gap: 12, marginBottom: 24, cursor: isGoogleLoading ? "wait" : "pointer",
            transition: "all 0.3s"
          }}
        >
          {isGoogleLoading ? (
             <div style={{
              width: 16, height: 16, borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.1)",
              borderTop: `2px solid ${TOKENS.cyan}`,
              animation: "spin-slow 0.8s linear infinite"
            }} />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <span className="orbitron" style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
            {isGoogleLoading ? "CONNECTING TO GOOGLE..." : "SIGN IN WITH GOOGLE"}
          </span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, opacity: 0.3 }}>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.2)" }} />
          <span className="mono" style={{ fontSize: 10 }}>OR</span>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.2)" }} />
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mono" style={{ fontSize: 10, color: TOKENS.textMuted, marginBottom: 8, letterSpacing: 2 }}>ESTABLISH CALLSIGN</div>
          <input 
            autoFocus
            type="text" 
            placeholder="USER_ID" 
            value={name}
            onChange={e => setName(e.target.value.toUpperCase())}
            style={{
              width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${TOKENS.border}`,
              padding: "12px 16px", borderRadius: 8, color: "#fff", marginBottom: 16,
              fontFamily: "Space Mono", letterSpacing: 2, fontSize: 14
            }}
          />
          <button type="submit" className="mag-btn orbitron" style={{
            width: "100%", padding: 14, background: "linear-gradient(135deg, #7c3aed, #00f5ff)",
            border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, letterSpacing: 2,
            boxShadow: "0 0 20px rgba(124,58,237,0.3)"
          }}>INITIALIZE LINK</button>
        </form>
      </div>
    </div>
  );
}

function Nav({ setView, currentView, onArenaClick, onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const { cart, user, logout, setCartOpen } = useNexusStore();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["HARDWARE", "BUILD", "DROPS", "AI LAB", "ARENA"];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: "0 40px",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled || currentView !== "home" ? "rgba(5,5,8,0.95)" : "transparent",
      backdropFilter: scrolled || currentView !== "home" ? "blur(20px)" : "none",
      borderBottom: scrolled || currentView !== "home" ? "1px solid rgba(99,102,241,0.15)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div className="orbitron" 
        onClick={() => setView("home")}
        style={{ fontSize: 20, fontWeight: 900, letterSpacing: 4, cursor: "pointer" }}>
        <span className="neon-text-cyan">NEX</span>
        <span style={{ color: TOKENS.magenta }}>US</span>
      </div>
      <div style={{ display: "flex", gap: 36, fontSize: 13, letterSpacing: 2, fontWeight: 600 }}>
        {links.map(n => (
          <span key={n} 
            onClick={() => n === "ARENA" ? onArenaClick() : setView(n)}
            style={{ 
              color: currentView === n ? TOKENS.cyan : TOKENS.textMuted, 
              cursor: "pointer", textTransform: "uppercase",
              transition: "color 0.2s" 
            }}
            onMouseEnter={e => e.target.style.color = TOKENS.cyan}
            onMouseLeave={e => e.target.style.color = currentView === n ? TOKENS.cyan : TOKENS.textMuted}>
            {n}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {user?.isLoggedIn ? (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, display: "flex", alignItems: "center" }}>
              {user.isGoogle && (
                <svg width="12" height="12" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              {user.name}
            </span>
            <span className="mag-btn" style={{ fontSize: 10, color: TOKENS.magenta, cursor: "pointer", opacity: 0.7 }} onClick={logout}>[LOGOUT]</span>
          </div>
        ) : (
          <span className="mag-btn orbitron" style={{ fontSize: 11, fontWeight: 700, cursor: "pointer", color: TOKENS.textMuted }} onClick={onLoginClick}>LOGIN</span>
        )}
        <div style={{ width: 34, height: 34, borderRadius: "50%",
          border: `1px solid ${TOKENS.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: TOKENS.textMuted, fontSize: 16, transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = TOKENS.cyan; e.currentTarget.style.color = TOKENS.cyan; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = TOKENS.border; e.currentTarget.style.color = TOKENS.textMuted; }}>
          ⌕
        </div>
        <div style={{
          padding: "8px 20px", borderRadius: 4,
          background: "linear-gradient(135deg, #7c3aed, #00f5ff)",
          fontSize: 12, fontWeight: 700, letterSpacing: 2, cursor: "pointer",
          transition: "opacity 0.2s"
        }} 
        onClick={() => setCartOpen(true)}
        className="mag-btn">CART ({cart.reduce((acc, p) => acc + (p.quantity || 1), 0)})</div>
      </div>
    </nav>
  );
}

function HardwareView() {
  const categories = ["GPU", "CPU", "Motherboards", "RAM", "Cooling", "Cases"];
  const [activeCat, setActiveCat] = useState("GPU");
  const addToCart = useNexusStore(state => state.addToCart);

  const filteredProducts = HARDWARE_CATALOG.filter(p => p.category === activeCat);

  return (
    <div style={{ padding: "120px 60px", minHeight: "100vh" }}>
      <div style={{ marginBottom: 60 }}>
        <h2 className="orbitron" style={{ fontSize: 40, fontWeight: 900, marginBottom: 12 }}>
          BROWSE <span className="neon-text-cyan">HARDWARE</span>
        </h2>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12 }}>
          {categories.map(c => (
            <button key={c} 
              onClick={() => setActiveCat(c)}
              style={{
                padding: "10px 24px", borderRadius: 4,
                background: activeCat === c ? "rgba(0,245,255,0.1)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${activeCat === c ? TOKENS.cyan : "transparent"}`,
                color: activeCat === c ? TOKENS.cyan : TOKENS.textMuted,
                cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 2,
                transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}
            >{c.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
        {filteredProducts.map(p => (
          <div key={p.id} className="glass" style={{ borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ 
              height: 200, background: "rgba(255,255,255,0.02)", 
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 80, position: "relative" 
            }}>
              <img 
  src={p.img} 
  alt={p.name} 
  style={{ width: "100%", height: "100%", objectFit: "contain" }} 
/>

      
/>
              {p.hot && (
                <div style={{ 
                  position: "absolute", top: 16, right: 16, 
                  background: TOKENS.magenta, color: "#fff", 
                  fontSize: 10, fontWeight: 900, padding: "4px 8px", borderRadius: 4,
                  letterSpacing: 1, zIndex: 1
                }}>HOT</div>
              )}
            </div>
            <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
              <div className="orbitron" style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
              <div className="mono" style={{ fontSize: 11, color: TOKENS.textMuted, marginBottom: 16 }}>{p.brand} // {p.category}</div>
              
              {p.specs && (
                <div style={{ 
                  display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, 
                  marginBottom: 24, padding: "12px", background: "rgba(255,255,255,0.03)", 
                  borderRadius: 8 
                }}>
                  {Object.entries(p.specs).map(([key, val]) => (
                    <div key={key}>
                      <div className="mono" style={{ fontSize: 8, color: TOKENS.textMuted, textTransform: "uppercase" }}>{key}</div>
                      <div className="mono" style={{ fontSize: 10 }}>{val}</div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="orbitron" style={{ fontSize: 24, fontWeight: 900, color: TOKENS.gold }}>${p.price.toLocaleString()}</span>
                <button 
                  onClick={() => addToCart(p)}
                  className="mag-btn" style={{
                    padding: "12px 24px", background: "linear-gradient(135deg, #7c3aed, #00f5ff)",
                    border: "none", borderRadius: 4, color: "#fff", fontWeight: 700, fontSize: 11,
                    letterSpacing: 1
                  }}>ADD TO CART</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArenaView() {
  const { user, currentBuild } = useNexusStore();
  const isAdmin = user?.name === "ADMIN";
  const [regStatus, setRegStatus] = useState("idle"); // idle, scanning, granted
  const [scanProgress, setScanProgress] = useState(0);

  const startRegistration = () => {
    setRegStatus("scanning");
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setRegStatus("granted"), 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh", padding: "100px 60px" }}>
      {/* Admin Dashboard Overlay */}
      {isAdmin && (
        <div style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 100,
          width: 280, padding: 20, borderRadius: 12,
          background: "rgba(5,5,8,0.9)", border: `1px solid ${TOKENS.magenta}`,
          boxShadow: `0 0 20px ${TOKENS.magenta}33`
        }}>
          <div className="orbitron" style={{ fontSize: 12, color: TOKENS.magenta, marginBottom: 16, letterSpacing: 2 }}>SYSTEM OVERLAY_v4</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span className="mono">CORE LOAD:</span>
              <span className="mono neon-text-cyan">{(scanProgress % 40 + 20).toFixed(1)}%</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span className="mono">ACTIVE NODES:</span>
              <span className="mono">1,342</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
              <span className="mono">INV. CAPACITY:</span>
              <span className="mono neon-text-magenta">88.4%</span>
            </div>
          </div>
          <div style={{ height: 2, background: TOKENS.border, margin: "12px 0" }} />
          <div className="mono" style={{ fontSize: 9, color: TOKENS.textMuted }}>PRIMARY ADMIN STATUS: <span style={{ color: TOKENS.cyan }}>VERIFIED</span></div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 40 }}>
        {/* Left Column: Register & Leaderboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div className="glass" style={{ padding: 60, borderRadius: 20, textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: 120, marginBottom: 20, animation: "float 6s ease-in-out infinite" }}>🏆</div>
            <h2 className="orbitron" style={{ fontSize: 56, fontWeight: 900, marginBottom: 16 }}>
              NEXUS <span className="neon-text-magenta">ARENA</span>
            </h2>
            <p style={{ color: TOKENS.textMuted, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6, fontSize: 18 }}>
              Level up your battlefield. Compete in high-stakes hardware duels and claim the top tier of the Nexus leaderboards.
            </p>

            <AnimatePresence mode="wait">
              {regStatus === "idle" && (
                <motion.button 
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  onClick={startRegistration}
                  className="mag-btn orbitron" style={{
                    padding: "20px 48px",
                    background: "transparent", border: `1px solid ${TOKENS.magenta}`,
                    color: TOKENS.magenta, borderRadius: 4, fontWeight: 900, letterSpacing: 4,
                    fontSize: 14, boxShadow: `0 0 30px ${TOKENS.magenta}44`
                  }}
                >
                  INITIALIZE RECRUITMENT
                </motion.button>
              )}

              {regStatus === "scanning" && (
                <motion.div 
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mono" style={{ width: 400, margin: "0 auto" }}
                >
                  <div style={{ marginBottom: 12, fontSize: 13, borderBottom: `1px solid ${TOKENS.border}`, paddingBottom: 8 }}>
                    SCANNID HARDWARE CONFIGURATION... {scanProgress}%
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
                    <motion.div 
                      style={{ height: "100%", background: TOKENS.cyan }}
                      animate={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <div style={{ marginTop: 12, fontSize: 10, color: TOKENS.textMuted, textAlign: "left" }}>
                    {scanProgress < 30 ? "> Loading micro-drivers..." : scanProgress < 70 ? "> Analyzing Battle Station Power..." : "> Syncing with Nexus Core..."}
                  </div>
                </motion.div>
              )}

              {regStatus === "granted" && (
                <motion.div 
                  key="granted"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="orbitron neon-text-cyan" 
                  style={{ fontSize: 24, fontWeight: 900 }}
                >
                  ACCESS GRANTED. WELCOME, {user?.name}.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Leaderboard />
        </div>

        {/* Right Column: Feed & Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <GlobalDropLog />
          
          <div className="glass" style={{ padding: 24, borderRadius: 12 }}>
            <h4 className="orbitron" style={{ fontSize: 13, marginBottom: 20, letterSpacing: 2 }}>YOUR STANDING</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span className="mono" style={{ fontSize: 11, color: TOKENS.textMuted }}>POWER RATING</span>
                  <span className="mono neon-text-cyan">
                    {Object.values(currentBuild).reduce((acc, c) => acc + (c?.perf || 0), 0)}
                  </span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: "45%", background: TOKENS.cyan, borderRadius: 2 }} />
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: TOKENS.textMuted, marginBottom: 4 }}>WINS</div>
                  <div className="orbitron" style={{ fontSize: 18 }}>0</div>
                </div>
                <div style={{ padding: "12px", background: "rgba(255,255,255,0.03)", borderRadius: 8 }}>
                  <div style={{ fontSize: 9, color: TOKENS.textMuted, marginBottom: 4 }}>RANK</div>
                  <div className="orbitron" style={{ fontSize: 18 }}>UNRANKED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobalDropLog() {
  const [logs, setLogs] = useState([
    { id: 1, text: "FLUX just won an RTX 5090 Ti from the Daily Drop!", time: "2m ago", type: "win" },
    { id: 2, text: "KODEX matched with a Ryzen 9 9950X", time: "5m ago", type: "match" },
    { id: 3, text: "SYS_ROOT initialized System Protocol 7", time: "12m ago", type: "sys" },
    { id: 4, text: "VOID_WALKER upgraded to Core Ultra 9", time: "15m ago", type: "upgrade" },
  ]);

  useEffect(() => {
    const names = ["ZER0", "KODEX", "FLUX", "PHANTOM", "VOX", "GHOST", "BLADE", "NEON"];
    const items = ["RTX 5090 Ti", "OLED 4K Display", "Titan Pro Mouse", "Z890 Apex Mobo"];
    
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        text: `${names[Math.floor(Math.random() * names.length)]} ${Math.random() > 0.5 ? "matched with" : "just won"} a ${items[Math.floor(Math.random() * items.length)]}!`,
        time: "Just now",
        type: "win"
      };
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass" style={{ padding: 24, borderRadius: 12, height: 320, display: "flex", flexDirection: "column" }}>
      <h4 className="orbitron" style={{ fontSize: 11, color: TOKENS.cyan, marginBottom: 20, letterSpacing: 2 }}>GLOBAL COMM_FEED</h4>
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", gap: 12 }}>
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              style={{ fontSize: 12, padding: "8px 12px", borderLeft: `2px solid ${log.type === "sys" ? TOKENS.magenta : TOKENS.cyan}`, background: "rgba(255,255,255,0.02)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span className="mono" style={{ color: TOKENS.textMuted, fontSize: 9 }}>{log.time}</span>
                <span className="mono" style={{ color: log.type === "sys" ? TOKENS.magenta : TOKENS.cyan, fontSize: 8 }}>{log.type.toUpperCase()}</span>
              </div>
              <div className="mono" style={{ color: TOKENS.textPrimary, lineHeight: 1.4 }}>{log.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Leaderboard() {
  const topBuilders = [
    { name: "ZER0_G", power: 198, build: "RTX 5090 Ti / 285K" },
    { name: "X_VOX", power: 185, build: "RTX 5080 / 7950X3D" },
    { name: "KODEX", power: 172, build: "RTX 4090 / 14900K" },
    { name: "PHANTOM", power: 148, build: "RTX 4080 / 265K" },
    { name: "SYNTH", power: 135, build: "RTX 3090 / 13900K" },
  ];

  return (
    <div className="glass" style={{ padding: 32, borderRadius: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h3 className="orbitron" style={{ fontSize: 24, fontWeight: 900 }}>TOP <span className="neon-text-cyan">BUILDERS</span></h3>
        <span className="mono" style={{ fontSize: 12, color: TOKENS.textMuted }}>RANKED BY STATION_POWER</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {topBuilders.map((b, i) => (
          <div key={b.name} style={{
            display: "grid", gridTemplateColumns: "60px 1fr 100px 180px",
            padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,0.05)",
            alignItems: "center"
          }}>
            <div style={{ fontSize: 24, fontWeight: 900, color: i === 0 ? TOKENS.gold : TOKENS.textMuted, opacity: 0.4 }}>{i+1}</div>
            <div className="orbitron" style={{ fontSize: 16, fontWeight: 700 }}>{b.name}</div>
            <div className="neon-text-magenta mono" style={{ fontSize: 18, fontWeight: 700 }}>{b.power}</div>
            <div className="mono" style={{ fontSize: 11, color: TOKENS.textMuted, textAlign: "right" }}>{b.build}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartDrawer({ onClose }) {
  const { cart, removeFromCart, updateQuantity, setCartOpen } = useNexusStore();
  const totalPrice = cart.reduce((acc, p) => acc + (p.price * (p.quantity || 1)), 0);

  return (
    <div 
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        display: "flex", justifyContent: "flex-end",
        background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)"
      }} 
      onClick={onClose}
    >
      <div 
        style={{
          width: 450, height: "100%", background: TOKENS.surface,
          borderLeft: `1px solid ${TOKENS.border}`,
          display: "flex", flexDirection: "column",
          animation: "slide-in-right 0.3s ease-out"
        }} 
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: "24px 32px", borderBottom: `1px solid ${TOKENS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="orbitron" style={{ fontSize: 20, fontWeight: 900 }}>
            YOUR <span className="neon-text-cyan">CARGO</span>
          </h2>
          <div style={{ cursor: "pointer", color: TOKENS.textMuted, fontSize: 20 }} onClick={onClose}>✕</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          {cart.length === 0 ? (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 24, opacity: 0.5 }}>📦</div>
              <div className="orbitron" style={{ fontSize: 18, color: TOKENS.textMuted, marginBottom: 24 }}>YOUR CARGO BAY IS EMPTY</div>
              <button 
                onClick={onClose}
                className="mag-btn orbitron" 
                style={{
                  padding: "12px 32px", background: "rgba(0,245,255,0.1)",
                  border: `1px solid ${TOKENS.cyan}`, color: TOKENS.cyan,
                  borderRadius: 4, fontWeight: 700, fontSize: 12, letterSpacing: 2
                }}
              >GO SHOPPING</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 16, borderBottom: `1px solid rgba(255,255,255,0.05)`, paddingBottom: 24 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 8, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                    {item.img}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: TOKENS.textPrimary, marginBottom: 4 }}>{item.name}</div>
                    <div className="mono" style={{ fontSize: 11, color: TOKENS.textMuted, marginBottom: 12 }}>{item.category}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 4 }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ background: "none", border: "none", color: TOKENS.textMuted, cursor: "pointer", fontSize: 18 }}>-</button>
                        <span className="mono" style={{ fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.quantity || 1}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ background: "none", border: "none", color: TOKENS.textMuted, cursor: "pointer", fontSize: 18 }}>+</button>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <span className="orbitron" style={{ fontSize: 16, fontWeight: 700, color: TOKENS.gold }}>
                          ${(item.price * (item.quantity || 1)).toLocaleString()}
                        </span>
                        <div 
                          onClick={() => removeFromCart(item.id)}
                          style={{ cursor: "pointer", color: TOKENS.magenta, opacity: 0.7 }}
                          onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                          onMouseLeave={e => e.currentTarget.style.opacity = "0.7"}
                        >
                          🗑️
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: "32px", borderTop: `1px solid ${TOKENS.border}`, background: "rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <span className="orbitron" style={{ fontSize: 14, color: TOKENS.textMuted }}>TOTAL ALLOCATION</span>
              <span className="orbitron" style={{ fontSize: 24, fontWeight: 900, color: TOKENS.cyan }}>
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <button className="mag-btn orbitron" style={{
              width: "100%", padding: "18px",
              background: "linear-gradient(135deg, #7c3aed, #00f5ff)",
              border: "none", borderRadius: 4, color: "#fff",
              fontWeight: 900, letterSpacing: 4, fontSize: 14
            }}>CHECKOUT SYSTEM</button>
          </div>
        )}
      </div>
    </div>
  );
}
