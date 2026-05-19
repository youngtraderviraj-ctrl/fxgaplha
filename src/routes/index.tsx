import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Activity, ArrowRight, BarChart3, Bot, Brain, CheckCircle2, ChevronDown,
  Cpu, Gauge, Globe, LineChart, Lock, MailIcon, PlayCircle, Send, Shield, ShieldCheck,
  Sparkles, Target, Timer, TrendingUp, Users, Zap, Instagram, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { LeadForm } from "@/components/site/LeadForm";
import logo from "@/assets/fxgalphamain.png";

export const Route = createFileRoute("/")({ component: Index });

/* ───────── helpers ───────── */
function useCountUp(end: number, duration = 1800, suffix = "") {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          setVal(Math.floor(end * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, [end, duration]);
  return { ref, display: `${val.toLocaleString()}${suffix}` };
}

function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const { ref, display } = useCountUp(end, 1800, suffix);
  return <span ref={ref}>{prefix}{display}</span>;
}

/* ───────── sections ───────── */

function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-ink text-white">
      {/* Enhanced layered background */}
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 grid-bg-animated opacity-50" />
      <div className="absolute inset-0 noise pointer-events-none opacity-50" />

      {/* Multiple glowing orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full animate-pulse-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.22 235 / 0.4), transparent 70%)", filter: "blur(80px)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[280px] h-[280px] sm:w-[500px] sm:h-[500px] rounded-full animate-pulse-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.65 0.2 260 / 0.3), transparent 70%)", filter: "blur(70px)", animationDelay: "1s" }}
      />

      <div className="relative w-full mx-auto max-w-5xl px-5 sm:px-4 pt-20 sm:pt-16 pb-12 sm:pb-16 text-center flex flex-col items-center">
            <div className="animate-fade-up relative h-44 w-44 sm:h-60 sm:w-60 lg:h-72 lg:w-72 mt-4 sm:mt-0 mb-1 sm:mb-2 overflow-hidden flex items-center justify-center drop-shadow-[0_0_55px_oklch(0.72_0.2_235/0.65)]">
              <img
                src={logo}
                alt="FXG Alpha"
                className="h-full w-full object-cover object-center scale-150"
              />
            </div>
            <div className="animate-fade-up inline-flex items-center gap-2 glass-premium rounded-full pl-1.5 pr-3 py-1.5 text-[11px] sm:text-xs text-white/90 mb-10 sm:mb-8"
                 style={{ animationDelay: "60ms" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Live AI engine • Trading XAU/USD now
            </div>

            <h2 className="animate-fade-up font-display text-[2.4rem] sm:text-7xl lg:text-[5.4rem] font-bold leading-[1.05] sm:leading-[0.92] tracking-tighter mx-auto"
                style={{ animationDelay: "80ms" }}>
              <span className="block">
                Trade  with{" "}
                <span className="relative inline-block">
                  <span className="text-gradient-blue animate-gradient-shift">AI</span>
                  <svg className="absolute -bottom-2 sm:-bottom-3 left-0 w-full" height="16" viewBox="0 0 300 16" fill="none" preserveAspectRatio="none">
                    <path d="M2 8 Q 75 -2 150 8 T 298 6" stroke="url(#grad)" strokeWidth="3" strokeLinecap="round" className="animate-draw" />
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="oklch(0.65 0.18 240)" />
                        <stop offset="100%" stopColor="oklch(0.78 0.16 220)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
              <span className="block mt-3 sm:mt-2 text-white/90">
                built to <span className="text-gradient-blue animate-gradient-shift">compound</span> gains
              </span>
            </h2>

            <p className="animate-fade-up mt-7 sm:mt-8 text-base sm:text-xl text-white/70 max-w-2xl leading-relaxed mx-auto"
               style={{ animationDelay: "160ms" }}>
              Automated forex trading with disciplined risk management.
            </p>

            <div className="animate-fade-up mt-8 sm:mt-10 flex items-center justify-center gap-6 sm:gap-12"
                 style={{ animationDelay: "220ms" }}>
              <div className="text-center">
                <div className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[oklch(0.96_0.04_235)] drop-shadow-[0_0_18px_oklch(0.78_0.18_235/0.45)]">30–40%</div>
                <div className="mt-1 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-[0.16em] sm:tracking-[0.2em] whitespace-nowrap">Monthly Target Return</div>
              </div>
              <div className="h-10 sm:h-12 w-px bg-white/15" />
              <div className="text-center">
                <div className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[oklch(0.96_0.04_235)] drop-shadow-[0_0_18px_oklch(0.78_0.18_235/0.45)]">150+</div>
                <div className="mt-1 text-[10px] sm:text-xs font-medium text-white/60 uppercase tracking-[0.16em] sm:tracking-[0.2em] whitespace-nowrap">Active Users</div>
              </div>
            </div>

            <div className="animate-fade-up mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto"
                 style={{ animationDelay: "320ms" }}>
              <Button asChild variant="hero" size="xl" className="relative overflow-hidden animate-shine text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 w-full sm:w-auto">
                <a href="#claim">Start Trading <ArrowRight className="ml-2" /></a>
              </Button>
              <Button variant="glass" size="xl" className="text-base sm:text-lg h-12 sm:h-14 px-6 sm:px-8 hover-glow w-full sm:w-auto">
                <PlayCircle className="h-5 w-5 text-[oklch(0.78_0.18_230)]" /> Watch Demo
              </Button>
            </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: TrendingUp, value: "30–40%", label: "Monthly Target" },
    { icon: ShieldCheck, value: "< 8%", label: "Max Drawdown" },
    { icon: Timer, value: "5 min", label: "Setup Time" },
    { icon: Zap, value: "70/30", label: "Profit Split" },
  ];
  return (
    <section className="bg-ink border-y border-white/5 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          {items.map((it) => (
            <div key={it.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-2 sm:px-4 py-3 sm:py-4 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center md:justify-start">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-gradient-blue/20 grid place-items-center shrink-0">
                  <it.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[oklch(0.78_0.18_230)]" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-xl font-bold tracking-tight text-white whitespace-nowrap">{it.value}</div>
                  <div className="text-[9px] sm:text-xs font-medium text-white/65 uppercase tracking-[0.1em] sm:tracking-[0.16em] whitespace-nowrap">{it.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="bg-background py-16 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-blue rounded-full blur-3xl opacity-10" />
      </div>
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> How it works
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            How <span className="text-gradient-blue">FXG ALPHA BOT</span> Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A complete trading engine built on AI-driven analysis, institutional risk management and emotion-free execution.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { i: Brain, t: "AI Market Analysis", d: "Continuous scanning of price action, volatility and market context." },
            { i: Target, t: "Smart Entry System", d: "Confluence-based filtering to qualify only high-probability setups." },
            { i: Shield, t: "Multi-layer Risk", d: "Adaptive stops, position sizing and exposure caps on every trade." },
            { i: Zap, t: "Auto Execution", d: "Low-latency order placement with zero hesitation or emotion." },
            { i: Gauge, t: "Live Monitoring", d: "Real-time visibility into open positions and ongoing trade behavior." },
          ].map((s, idx) => (
            <div
              key={s.t}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent backdrop-blur-xl p-5 sm:p-7 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_20px_60px_-15px_oklch(0.65_0.2_240/0.5)] animate-scale-in"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* glossy highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-60" />
              {/* radial accent that follows hover */}
              <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-blue/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* top hairline */}
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

              <div className="relative flex items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-blue grid place-items-center shadow-glow group-hover:shadow-[0_0_30px_oklch(0.65_0.2_240/0.6)] transition-all duration-500 shrink-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-60" />
                  <s.i className="h-5 w-5 text-white relative z-10" />
                </div>
                <span className="rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-md px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-primary">
                  Step {idx + 1}
                </span>
              </div>
              <h3 className="relative text-lg sm:text-xl font-semibold tracking-tight">{s.t}</h3>
              <p className="relative mt-2.5 sm:mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Performance() {
  const stats = [
    { label: "Monthly Target Return", value: 40, suffix: "%", prefix: "30–" },
    { label: "Win Rate", value: 78, suffix: "%" },
    { label: "Avg Risk-Reward", value: 0, suffix: "", custom: "1 : 2.4", hideOnMobile: true },
    { label: "Active Trading Days", value: 420 },
    { label: "Total Users", value: 5800, suffix: "+" },
  ];
  return (
    <section id="performance" className="relative bg-ink text-white py-16 sm:py-32 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full animate-pulse-glow pointer-events-none"
           style={{ background: "var(--gradient-glow)", filter: "blur(80px)", opacity: 0.6 }} />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full animate-pulse-glow pointer-events-none"
           style={{ background: "radial-gradient(circle, oklch(0.65 0.2 260 / 0.3), transparent 70%)", filter: "blur(70px)", animationDelay: "1.5s" }} />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold text-[oklch(0.78_0.18_230)] uppercase tracking-widest mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Performance
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Verified, consistent, <span className="text-gradient">institutional-level</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 mb-10 sm:mb-12">
          {stats.map((s, idx) => (
            <div key={s.label} className={`glass rounded-2xl p-4 sm:p-5 hover:bg-white/[0.1] transition-smooth hover:border-white/30 hover-lift group animate-scale-in ${s.hideOnMobile ? "hidden md:block" : ""}`} style={{ animationDelay: `${idx * 80}ms` }}>
              <div className="text-2xl sm:text-4xl font-display font-bold text-gradient group-hover:text-white transition-colors">
                {s.custom ?? <><span>{s.prefix ?? ""}</span><Counter end={s.value} suffix={s.suffix ?? ""} /></>}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 mt-2 uppercase tracking-wider font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="animate-scale-in rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,oklch(0.16_0.02_250/0.96),oklch(0.11_0.02_250/0.98))] p-4 sm:p-6 shadow-elevated" style={{ animationDelay: "400ms" }}>
          <div>
            <div className="rounded-[1.25rem] sm:rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-6">
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[oklch(0.78_0.18_230)]">Performance summary</div>
              <h3 className="mt-3 text-xl sm:text-3xl font-semibold tracking-tight text-white">A clearer, more believable view of results</h3>
              <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-white/65">
                We focus on steady execution, controlled downside, and transparent risk parameters instead of flashy dashboard visuals.
              </p>

              <div className="mt-5 sm:mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { title: "Trading style", text: "System-led forex execution with rule-based entries and exits." },
                  { title: "Risk control", text: "Strict drawdown limits, exposure caps, and predefined invalidation." },
                  { title: "Reporting window", text: "Performance reviewed over practical rolling periods, not isolated spikes." },
                  { title: "Goal", text: "Smoother capital growth with consistency prioritized over hype." },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-white/8 bg-black/10 p-4">
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="mt-1.5 text-sm leading-relaxed text-white/60">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfitSplit() {
  const compare = [
    { title: "Manual Trading", tone: "bad", items: [
      "Emotional mistakes & FOMO",
      "Requires hours of screen time",
      "Inconsistent results",
      "Manual order execution",
      "Inconsistent risk management",
    ]},
    { title: "FXG ALPHA BOT", tone: "good", items: [
      "Emotion-free systematic logic",
      "Fully hands-free, set & forget",
      "Consistent rules every trade",
      "Instant automated execution",
      "Multi-layer adaptive risk engine",
    ]},
  ];
  return (
    <section className="bg-background py-16 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-blue rounded-full blur-3xl opacity-10" />
      </div>
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Zap className="h-4 w-4" /> Profit Split
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Trade With Us. <span className="text-gradient-blue">Profit Together.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            A transparent partnership model — we only win when you win.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="relative rounded-3xl bg-ink p-6 sm:p-8 text-white overflow-hidden shadow-elevated border border-white/10 group hover:border-white/20 transition-smooth animate-scale-in">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full animate-pulse-glow" style={{ background: "var(--gradient-glow)", filter: "blur(60px)" }} />
            <div className="relative">
              <div className="text-xs sm:text-sm text-white/70 uppercase tracking-widest font-semibold">Profit Split Model</div>
              <div className="mt-3 sm:mt-4 font-display text-5xl sm:text-7xl font-bold text-gradient">70 / 30</div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/75 leading-relaxed">Minimum account size is $5,000. There is a one-time $550 setup fee and no monthly fee beyond the 70/30 profit split.</p>
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 text-center">
                {[{l:"Setup fee",v:"$550"},{l:"Min. account",v:"$5,000"},{l:"Monthly fee",v:"$0"}].map(x => (
                  <div key={x.l} className="glass-dark rounded-xl py-3 sm:py-4 px-1 border border-white/10 group-hover:border-white/20 transition-smooth">
                    <div className="text-base sm:text-2xl font-bold text-white">{x.v}</div>
                    <div className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider mt-1">{x.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {compare.map((c, idx) => (
            <div
              key={c.title}
              className={`rounded-2xl sm:rounded-3xl p-4 sm:p-8 border transition-smooth hover-lift ${idx === 0 ? "animate-slide-in-left" : "animate-slide-in-right"} ${c.tone === "good" ? "border-primary/40 bg-gradient-to-br from-primary/5 to-card shadow-glow hover:shadow-elevated" : "border-border bg-secondary/30 hover:border-border/80"}`}
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <h3 className="font-display text-base sm:text-2xl font-semibold mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
                {c.title}
                {c.tone === "good" && <span className="hidden sm:inline-flex text-xs px-3 py-1 rounded-full bg-gradient-blue text-white font-semibold">Recommended</span>}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {c.items.map((it, i) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm animate-fade-up"
                    style={{ animationDelay: `${idx * 120 + 200 + i * 70}ms` }}
                  >
                    {c.tone === "good"
                      ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0 mt-0.5" />
                      : <span className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-muted-foreground/40 shrink-0 mt-0.5" />}
                    <span className={c.tone === "good" ? "text-foreground font-medium" : "text-muted-foreground"}>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { i: Bot, t: "Fully Automated Trading", d: "Hands-free execution across active market sessions.", tag: "Automation" },
    { i: Brain, t: "AI Market Analysis", d: "Structured setup filtering based on price action and market context.", tag: "Intelligence" },
    { i: Shield, t: "Smart Risk Control", d: "Adaptive stop logic and exposure protection on every position.", tag: "Protection" },
    { i: Activity, t: "Live Monitoring", d: "Real-time visibility into execution and ongoing trade behavior.", tag: "Transparency" },
    { i: Globe, t: "Forex & Gold Coverage", d: "Focused coverage across major FX pairs and XAUUSD conditions.", tag: "Markets" },
    { i: Zap, t: "Fast Execution", d: "Low-latency order handling designed for disciplined entry timing.", tag: "Speed" },
  ];
  return (
    <section id="features" className="relative bg-ink text-white py-16 sm:py-32 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full animate-pulse-glow pointer-events-none"
           style={{ background: "radial-gradient(circle, oklch(0.65 0.2 260 / 0.2), transparent 70%)", filter: "blur(80px)" }} />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="text-xs font-semibold text-[oklch(0.78_0.18_230)] uppercase tracking-widest mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Features
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Why traders choose <span className="text-gradient">FXG ALPHA</span>
          </h2>
        </div>
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((f, idx) => (
            <div key={f.t} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7 transition-smooth hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07] animate-slide-in-right" style={{ animationDelay: `${idx * 60}ms` }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.78_0.18_230/0.8)] to-transparent opacity-70" />
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-gradient-blue/20 grid place-items-center group-hover:shadow-glow transition-smooth shrink-0">
                  <f.i className="h-5 w-5 text-[oklch(0.78_0.18_230)]" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/45">
                  {f.tag}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white">{f.t}</h3>
              <p className="mt-2.5 sm:mt-3 text-sm leading-relaxed text-white/68">{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { n: "Saurav Yadav", r: "Forex trader", q: "FXGAlpha has completely improved my trading discipline. The entries are clean and risk management is solid." },
    { n: "Dhanashree More", r: "Copy investor", q: "I've tested multiple forex bots, but FXGAlpha feels more stable and consistent than most." },
    { n: "Shravan Jagtap", r: "Swing trader", q: "The signals are accurate and easy to follow. Great for both beginners and experienced traders." },
    { n: "Soham Chaudhari", r: "Part-time trader", q: "What I like most is the low drawdown and smart trade execution. Definitely worth trying." },
    { n: "Harshal Sawant", r: "Beginner", q: "FXGAlpha helped me save time while still staying active in the forex market." },
    { n: "Bhavesh Sawant", r: "Funded trader", q: "One of the few bots that actually focuses on risk management instead of overtrading." },
    { n: "Soham Shinde", r: "Algo enthusiast", q: "The strategy behind this bot is impressive. Trades feel calculated, not random." },
    { n: "Pranav Gadhe", r: "VPS user", q: "I've been running FXGAlpha on my VPS and performance has been reliable." },
    { n: "Vighnesh", r: "Passive trader", q: "This bot made forex trading less stressful for me. Highly recommended for passive traders." },
  ];
  return (
    <section className="bg-background py-16 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-blue rounded-full blur-3xl opacity-10" />
      </div>
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
            <Star className="h-4 w-4 fill-primary" /> Testimonials
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
            Trusted by traders worldwide
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {t.map((x, idx) => (
            <div key={x.n} className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-card hover:shadow-elevated transition-smooth hover:-translate-y-2 hover:border-primary/50 group animate-bounce-in" style={{ animationDelay: `${idx * 80}ms` }}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed mb-6 italic">"{x.q}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-blue grid place-items-center text-white font-semibold text-sm group-hover:shadow-glow transition-smooth">
                  {x.n.split(" ").map(s => s[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{x.n}</div>
                  <div className="text-xs text-muted-foreground">{x.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How does the bot work?", a: "FXG ALPHA BOT analyzes the forex market with AI models, identifies high-probability setups, and executes trades automatically through your connected broker with strict risk parameters." },
    { q: "Is trading fully automated?", a: "Yes. Once connected, the bot trades 24/5 without any manual input. You can monitor everything live from your broker dashboard." },
    { q: "What brokers are supported?", a: "We integrate with most major MT4/MT5 brokers. After signup we'll guide you through connecting your account in under 5 minutes." },
    { q: "How does profit split work?", a: "Profits are split 70/30 — you keep 70%. The minimum account size is $5,000 with a one-time $550 setup fee, and there is no monthly fee beyond the profit split." },
    { q: "Is there risk management?", a: "Multi-layer: adaptive stop-loss on every trade, position sizing tied to account equity, exposure caps, and a daily drawdown circuit breaker." },
    { q: "Can beginners use it?", a: "Absolutely. No trading knowledge required. If you can connect a broker account, the bot handles everything else." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-background py-16 sm:py-32">
      <div className="mx-auto max-w-3xl px-4">
        <div className="text-center mb-10 sm:mb-12">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">FAQ</div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 text-left hover:bg-secondary/40 transition-smooth"
              >
                <span className="font-medium text-sm sm:text-base">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-muted-foreground text-sm leading-relaxed animate-fade-up">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-blue rounded-full blur-3xl opacity-10" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-20 relative">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="FXG Alpha" className="h-12 w-12 object-contain drop-shadow-[0_0_18px_oklch(0.72_0.2_235/0.5)]" />
              <span className="font-display font-bold text-xl">FXG ALPHA BOT</span>
            </div>
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              AI-driven automated forex trading with institutional risk management. Built for consistency, designed for partnership.
            </p>
            <div className="flex gap-3 mt-8">
              <a href="#" className="h-11 w-11 grid place-items-center rounded-full glass-dark hover:bg-white/15 transition-smooth hover:shadow-glow group">
                <Send className="h-4 w-4 group-hover:text-[oklch(0.78_0.18_230)]" />
              </a>
              <a href="#" className="h-11 w-11 grid place-items-center rounded-full glass-dark hover:bg-white/15 transition-smooth hover:shadow-glow group">
                <Instagram className="h-4 w-4 group-hover:text-[oklch(0.78_0.18_230)]" />
              </a>
              <a href="mailto:hello@fxgalpha.bot" className="h-11 w-11 grid place-items-center rounded-full glass-dark hover:bg-white/15 transition-smooth hover:shadow-glow group">
                <MailIcon className="h-4 w-4 group-hover:text-[oklch(0.78_0.18_230)]" />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/50 mb-6 font-semibold">Product</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#how" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#performance" className="hover:text-white transition-colors">Performance</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-white/50 mb-6 font-semibold">Contact</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="hover:text-white transition-colors">hello@fxgalpha.bot</li>
              <li className="hover:text-white transition-colors">Telegram: @fxgalpha</li>
              <li className="hover:text-white transition-colors">Instagram: @fxgalpha</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-white/10 flex flex-col md:flex-row gap-4 sm:gap-6 justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} FXG ALPHA BOT. All rights reserved.</p>
          <p className="max-w-2xl md:text-right leading-relaxed">
            Risk disclaimer: Trading forex involves substantial risk and is not suitable for every investor. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Performance />
      <ProfitSplit />
      <Features />
      <Testimonials />
      <FAQ />
      <LeadForm />
      <Footer />
    </main>
  );
}
