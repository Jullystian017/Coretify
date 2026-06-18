"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Database, Building2, Users, Cpu, ArrowLeft } from "lucide-react";

/* ─── Steps ─────────────────────────────────────────────────── */
const STEPS = [
  { id: 1, icon: Building2, label: "Workspace",  title: "Beri nama\nworkspace Anda.",       desc: "Inisialisasi company memory dengan identitas bisnis Anda." },
  { id: 2, icon: Cpu,       label: "Playbook",   title: "Pilih vertical\nbisnis Anda.",      desc: "Coretify mengaktifkan playbook deteksi risiko yang spesifik untuk industri Anda." },
  { id: 3, icon: Users,     label: "Tim",        title: "Berapa anggota\ntim Anda?",         desc: "Menentukan alokasi memori dan kapasitas data stream workspace." },
  { id: 4, icon: Database,  label: "Koneksi",    title: "Apa yang ingin\nAnda capai?",       desc: "Pilih tools yang akan terhubung dan tantangan bisnis utama yang ingin diselesaikan." },
];

const verticals = [
  { value: "Software House", label: "Software House",      desc: "Workload, code logs & scope creep" },
  { value: "Agency",         label: "Creative Agency",     desc: "Client retention, margins & revisions" },
  { value: "Startup",        label: "Tech Startup",        desc: "Decision logs & product velocity" },
  { value: "Consultant",     label: "Professional Services", desc: "Legal audit trails & deliverables" },
  { value: "Lainnya",        label: "Lainnya / Retail",    desc: "Koordinasi operasional internal" },
];

const scales = [
  { value: "1-10",  label: "1 – 10 Orang",  desc: "Small studio / founder-led" },
  { value: "10-50", label: "10 – 50 Orang", desc: "Mid-size organization" },
  { value: "50+",   label: "50+ Orang",     desc: "Enterprise / corporate scale" },
];

const toolsList = [
  { value: "Gmail",     label: "Gmail" },
  { value: "Calendar",  label: "Google Calendar" },
  { value: "Drive",     label: "Google Drive" },
  { value: "WhatsApp",  label: "WhatsApp Chat" },
  { value: "CSV",       label: "CSV / Excel" },
];

const goalsList = [
  { value: "Project terlambat", label: "Project sering terlambat" },
  { value: "Knowledge loss",    label: "Knowledge hilang saat resign" },
  { value: "Tim monitoring",    label: "Kapasitas tim sulit dipantau" },
  { value: "Client chaos",      label: "Komunikasi client chaos" },
  { value: "Sales chaos",       label: "Invoice & sales tidak terpantau" },
];

/* ─── Aurora component ──────────────────────────────────────── */
function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Blob 1 – top-center, primary glow */}
      <motion.div
        className="absolute -top-[10%] left-[10%] w-[85%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(220,220,235,0.06) 45%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Blob 2 – bottom left */}
      <motion.div
        className="absolute -bottom-[10%] -left-[10%] w-[65%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(190,190,215,0.10) 0%, rgba(140,140,175,0.045) 50%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, -10, 0], y: [0, 8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      {/* Blob 3 – center breathing core */}
      <motion.div
        className="absolute top-[25%] left-[15%] w-[65%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.07, 0.97, 1], opacity: [0.7, 1, 0.75, 0.7] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {/* Blob 4 – top-left accent shimmer */}
      <motion.div
        className="absolute -top-[5%] -left-[5%] w-[42%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(230,230,255,0.09) 0%, transparent 60%)",
          filter: "blur(45px)",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 7 }}
      />
      {/* Edge vignette – keeps glow contained */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_35%,transparent_25%,rgba(7,7,8,0.75)_100%)]" />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<1 | -1>(1);
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [painPoints, setPainPoints] = useState<string[]>([]);

  const canAdvance =
    (step === 1 && companyName.trim() !== "" && ownerName.trim() !== "") ||
    (step === 2 && businessType !== "") ||
    (step === 3 && teamSize !== "") ||
    (step === 4 && toolsUsed.length > 0);

  const goNext = () => {
    if (!canAdvance) return;
    setDir(1);
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      localStorage.setItem("coretify_company", JSON.stringify({
        name: companyName, businessType, teamSize, toolsUsed, painPoints,
        createdAt: new Date().toISOString(),
      }));
      router.push("/connect");
    }
  };

  const goBack      = () => { if (step > 1) { setDir(-1); setStep((s) => s - 1); } };
  const pickVertical = (v: string) => { setBusinessType(v); };
  const pickScale   = (s: string) => { setTeamSize(s); };
  const toggleTool  = (t: string) => setToolsUsed((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const toggleGoal  = (g: string) => setPainPoints((p) => p.includes(g) ? p.filter((x) => x !== g) : [...p, g]);

  const current = STEPS[step - 1];

  const slide = {
    enter: (d: number) => ({ opacity: 0, y: d * 12 }),
    center: { opacity: 1, y: 0 },
    exit:  (d: number) => ({ opacity: 0, y: d * -12 }),
  };
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  /* shared option card classes */
  const optBase  = "group w-full flex items-center justify-between text-left transition-all duration-150 border rounded-xl";
  const optOn    = "border-zinc-600/70 bg-zinc-900/70 text-white";
  const optOff   = "border-zinc-800/50 bg-[#0c0c0e] hover:border-zinc-700 hover:bg-zinc-900/30 text-zinc-400 hover:text-zinc-200";
  const radioOn  = "border-white";
  const radioOff = "border-zinc-700 group-hover:border-zinc-500";
  const checkOn  = "border-white bg-white";
  const checkOff = "border-zinc-700 group-hover:border-zinc-500";

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#070708] text-slate-100 grid lg:grid-cols-[380px_1fr] font-sans antialiased">

      {/* ══ LEFT PANEL – Aurora ══════════════════════════════════ */}
      <aside className="hidden lg:flex relative flex-col border-r border-white/[0.04] p-10 overflow-hidden">
        {/* Aurora animated background */}
        <AuroraBackground />

        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="relative z-10 flex items-center gap-0.5 hover:opacity-75 transition-opacity"
        >
          <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
          <span className="text-[19px] font-semibold tracking-tight text-white">Coretify</span>
        </button>

        {/* Step navigator */}
        <nav className="relative z-10 mt-10">
          {/* Single continuous track spanning badge-center to badge-center */}
          <div
            className="absolute w-px bg-zinc-800/50"
            style={{ left: "calc(0.5rem + 18px)", top: "30px", height: "calc(100% - 60px)" }}
          />

          {STEPS.map((s) => {
            const Icon     = s.icon;
            const isDone   = step > s.id;
            const isActive = step === s.id;
            return (
              <div key={s.id} className="relative flex items-start gap-3.5 px-2 min-h-[60px]">
                {/* Badge — sits on top of track via z-10 + solid bg */}
                <div className={`shrink-0 mt-3 h-9 w-9 rounded-lg flex items-center justify-center relative z-10 transition-all duration-300 ${
                  isDone
                    ? "bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                    : isActive
                    ? "bg-zinc-800 text-white ring-1 ring-white/10"
                    : "bg-[#070708] border border-zinc-800/60 text-zinc-700"
                }`}>
                  {isDone
                    ? <Check className="h-4 w-4 stroke-[2.5px]" />
                    : <Icon className="h-4 w-4" />
                  }
                </div>
                {/* Label */}
                <div className="pt-[18px] pb-3">
                  <p className={`text-[13px] font-semibold leading-none transition-all duration-200 ${
                    isDone   ? "text-zinc-500"
                    : isActive ? "text-white"
                    : "text-zinc-700"
                  }`}>{s.label}</p>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-[11px] text-zinc-500 mt-1.5 leading-snug"
                    >
                      {s.desc}
                    </motion.p>
                  )}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Bottom quote */}
        <div className="relative z-10 mt-auto">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent mb-6" />
          <blockquote>
            <p className="text-[15px] text-zinc-300 font-medium leading-relaxed italic">
              &ldquo;Platform ini memantau komunikasi klien secara real-time, mendeteksi risiko lebih dini, dan menyelaraskan keputusan tim.&rdquo;
            </p>
            <footer className="font-mono text-[11px] font-semibold text-zinc-600 tracking-wider uppercase mt-3">
              — Julian Albertus
            </footer>
          </blockquote>
        </div>
      </aside>

      {/* ══ RIGHT PANEL ══════════════════════════════════════════ */}
      <div className="relative flex flex-col justify-center overflow-hidden px-8 sm:px-14 xl:px-20">

        {/* Subtle corner glow */}
        <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-[340px] h-[340px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 65%)" }} />

        <div className="w-full max-w-[400px] mx-auto space-y-7">

          {/* Mobile logo */}
          <div className="flex items-center gap-0.5 lg:hidden mb-2">
            <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
            <span className="text-xl font-semibold text-white">Coretify</span>
          </div>

          {/* Heading */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={`h-${step}`} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease }}>
              <p className="text-[10px] font-bold font-mono uppercase tracking-[0.22em] text-zinc-600 mb-3">
                {String(step).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
              </p>
              <h1
                className="text-[30px] sm:text-[36px] font-semibold tracking-tight text-white leading-[1.1] mb-2.5"
                style={{ whiteSpace: "pre-line" }}
              >
                {current.title}
              </h1>
              <p className="text-zinc-400 text-[13.5px] leading-relaxed">{current.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* Step body */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={`b-${step}`} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2, ease }} className="space-y-3">

              {/* ── Step 1 ── */}
              {step === 1 && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">
                      Nama Bisnis
                    </label>
                    <Input
                      autoFocus
                      placeholder="e.g. Acme Corporation"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && ownerName.trim() && goNext()}
                      className="h-11 bg-[#0c0c0e] border-zinc-800/70 text-slate-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">
                      Nama Anda
                    </label>
                    <Input
                      placeholder="e.g. Alex Henderson"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && companyName.trim() && goNext()}
                      className="h-11 bg-[#0c0c0e] border-zinc-800/70 text-slate-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-600 rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* ── Step 2 ── */}
              {step === 2 && (
                <div className="space-y-1.5">
                  {verticals.map((v) => {
                    const sel = businessType === v.value;
                    return (
                      <button key={v.value} onClick={() => pickVertical(v.value)} className={`${optBase} px-4 py-3.5 ${sel ? optOn : optOff}`}>
                        <div>
                          <p className="text-[13px] font-semibold leading-none">{v.label}</p>
                          <p className={`text-[11px] mt-1 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{v.desc}</p>
                        </div>
                        <div className={`shrink-0 ml-4 h-[18px] w-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${sel ? radioOn : radioOff}`}>
                          {sel && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ── Step 3 ── */}
              {step === 3 && (
                <div className="space-y-1.5">
                  {scales.map((s) => {
                    const sel = teamSize === s.value;
                    return (
                      <button key={s.value} onClick={() => pickScale(s.value)} className={`${optBase} px-4 py-4 ${sel ? optOn : optOff}`}>
                        <div>
                          <p className="text-[13px] font-semibold leading-none">{s.label}</p>
                          <p className={`text-[11px] mt-1 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{s.desc}</p>
                        </div>
                        <div className={`shrink-0 ml-4 h-[18px] w-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${sel ? radioOn : radioOff}`}>
                          {sel && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* ── Step 4 ── */}
              {step === 4 && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-2">Data Source</p>
                    <div className="space-y-1.5">
                      {toolsList.map((t) => {
                        const sel = toolsUsed.includes(t.value);
                        return (
                          <button key={t.value} onClick={() => toggleTool(t.value)} className={`${optBase} rounded-lg px-3.5 py-3 ${sel ? optOn : optOff}`}>
                            <span className="text-[12px] font-medium">{t.label}</span>
                            <div className={`shrink-0 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${sel ? checkOn : checkOff}`}>
                              {sel && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-2">Target Outcome</p>
                    <div className="space-y-1.5">
                      {goalsList.map((g) => {
                        const sel = painPoints.includes(g.value);
                        return (
                          <button key={g.value} onClick={() => toggleGoal(g.value)} className={`${optBase} rounded-lg px-3.5 py-3 ${sel ? optOn : optOff}`}>
                            <span className="text-[12px] font-medium">{g.label}</span>
                            <div className={`shrink-0 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${sel ? checkOn : checkOff}`}>
                              {sel && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Nav buttons ── */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={goNext}
                  disabled={!canAdvance}
                  className="w-full h-11 flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-black font-semibold text-sm rounded-xl transition-all shadow-[0_0_28px_rgba(255,255,255,0.1)] disabled:opacity-20 disabled:pointer-events-none"
                >
                  {step === 4 ? "Selesai & Lanjut" : "Lanjutkan"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                {step > 1 && (
                  <button
                    onClick={goBack}
                    className="w-full h-10 flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.03] text-zinc-500 hover:text-zinc-300 font-medium text-sm rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-all"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Kembali
                  </button>
                )}
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </main>
  );
}
