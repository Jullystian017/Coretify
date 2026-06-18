"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Database,
  Building2,
  Users,
  Cpu,
  ArrowLeft,
} from "lucide-react";

/* ─── Step metadata ─────────────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    icon: Building2,
    label: "Workspace",
    title: "Beri nama\nworkspace Anda.",
    desc: "Inisialisasi company memory dengan identitas bisnis Anda.",
  },
  {
    id: 2,
    icon: Cpu,
    label: "Playbook",
    title: "Pilih vertical\nbisnis Anda.",
    desc: "Coretify mengaktifkan playbook deteksi risiko yang spesifik untuk industri Anda.",
  },
  {
    id: 3,
    icon: Users,
    label: "Tim",
    title: "Berapa jumlah\nanggota tim Anda?",
    desc: "Menentukan alokasi memori dan kapasitas data stream workspace.",
  },
  {
    id: 4,
    icon: Database,
    label: "Koneksi",
    title: "Apa yang ingin\nAnda capai?",
    desc: "Pilih tools yang akan terhubung dan tantangan bisnis utama yang ingin diselesaikan.",
  },
];

/* ─── Data ──────────────────────────────────────────────────── */
const verticals = [
  { value: "Software House", label: "Software House", desc: "Workload, code logs & scope creep" },
  { value: "Agency", label: "Creative Agency", desc: "Client retention, margins & revisions" },
  { value: "Startup", label: "Tech Startup", desc: "Decision logs & product velocity" },
  { value: "Consultant", label: "Professional Services", desc: "Legal audit trails & deliverables" },
  { value: "Lainnya", label: "Lainnya / Retail", desc: "Koordinasi operasional internal" },
];

const scales = [
  { value: "1-10", label: "1 – 10 Orang", desc: "Small studio / founder-led" },
  { value: "10-50", label: "10 – 50 Orang", desc: "Mid-size organization" },
  { value: "50+", label: "50+ Orang", desc: "Enterprise / corporate scale" },
];

const toolsList = [
  { value: "Gmail", label: "Gmail" },
  { value: "Calendar", label: "Google Calendar" },
  { value: "Drive", label: "Google Drive" },
  { value: "WhatsApp", label: "WhatsApp Chat" },
  { value: "CSV", label: "CSV / Excel" },
];

const goalsList = [
  { value: "Project terlambat", label: "Project sering terlambat" },
  { value: "Knowledge loss", label: "Knowledge hilang saat resign" },
  { value: "Tim monitoring", label: "Kapasitas tim sulit dipantau" },
  { value: "Client chaos", label: "Komunikasi client chaos" },
  { value: "Sales chaos", label: "Invoice & sales tidak terpantau" },
];

/* ─── FloatingPaths (same as login) ────────────────────────── */
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-95">
      <svg className="h-full w-full text-zinc-400" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.2 + path.id * 0.022}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.5, 1, 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
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
      localStorage.setItem(
        "coretify_company",
        JSON.stringify({ name: companyName, businessType, teamSize, toolsUsed, painPoints, createdAt: new Date().toISOString() })
      );
      router.push("/connect");
    }
  };

  const goBack = () => {
    if (step > 1) { setDir(-1); setStep((s) => s - 1); }
  };

  const pickVertical = (v: string) => { setBusinessType(v); setDir(1); setTimeout(() => setStep(3), 180); };
  const pickScale    = (s: string) => { setTeamSize(s);     setDir(1); setTimeout(() => setStep(4), 180); };
  const toggleTool   = (t: string) => setToolsUsed((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const toggleGoal   = (g: string) => setPainPoints((p) => p.includes(g) ? p.filter((x) => x !== g) : [...p, g]);

  const current = STEPS[step - 1];

  const slide = {
    enter: (d: number) => ({ opacity: 0, y: d * 14 }),
    center: { opacity: 1, y: 0 },
    exit:   (d: number) => ({ opacity: 0, y: d * -14 }),
  };
  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#070708] text-slate-100 grid lg:grid-cols-2 font-sans antialiased">

      {/* ══ LEFT PANEL (matches login) ══════════════════════════ */}
      <aside className="hidden lg:flex relative flex-col border-r border-slate-900 p-10 overflow-hidden bg-[#070708]">

        {/* Center glow */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.035)_0%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
        </div>

        {/* Floating path SVG */}
        <div className="absolute inset-0 z-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>

        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="z-10 flex items-center gap-1 hover:opacity-75 transition-opacity"
        >
          <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
          <span className="text-[19px] font-semibold tracking-tight text-white">Coretify</span>
        </button>

        {/* Step navigator */}
        <nav className="z-10 mt-12 space-y-1">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isDone   = step > s.id;
            const isActive = step === s.id;
            return (
              <div
                key={s.id}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${isActive ? "bg-white/[0.04]" : ""}`}
              >
                <div className={`shrink-0 h-7 w-7 rounded-md flex items-center justify-center transition-all duration-200 ${
                  isDone   ? "bg-white text-black"
                  : isActive ? "bg-zinc-800 text-white"
                  : "border border-zinc-800 text-zinc-700"
                }`}>
                  {isDone
                    ? <Check className="h-3.5 w-3.5 stroke-[3px]" />
                    : <Icon className="h-3.5 w-3.5" />
                  }
                </div>
                <span className={`text-[13px] font-medium transition-all duration-200 ${
                  isDone   ? "text-zinc-500 line-through decoration-zinc-700"
                  : isActive ? "text-white"
                  : "text-zinc-600"
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </nav>

        {/* Bottom quote */}
        <div className="z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-zinc-200 font-medium leading-relaxed italic">
              &ldquo;Platform ini memantau komunikasi klien secara real-time, mendeteksi risiko lebih dini, dan menyelaraskan keputusan tim.&rdquo;
            </p>
            <footer className="font-mono text-xs font-semibold text-zinc-500 tracking-wider uppercase mt-2">
              — Julian Albertus
            </footer>
          </blockquote>
        </div>
      </aside>

      {/* ══ RIGHT PANEL ══════════════════════════════════════════ */}
      <div className="relative flex flex-col justify-center overflow-hidden">

        {/* Subtle right-side radial glows */}
        <div aria-hidden className="absolute inset-0 -z-10 opacity-60">
          <div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(255,255,255,0.02)_0,hsla(0,0%,55%,0.005)_50%,transparent_80%)] absolute top-0 right-0 h-[320px] w-[140px] -translate-y-[350px] rounded-full" />
          <div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.015)_0,transparent_80%)] absolute top-0 right-0 h-[320px] w-[60px] [translate:5%_-50%] rounded-full" />
        </div>

        {/* Scrollable inner area — centred */}
        <div className="mx-auto w-full max-w-sm px-6 py-10 space-y-8">

          {/* Mobile logo */}
          <div className="flex items-center gap-1 lg:hidden">
            <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
            <span className="text-xl font-semibold text-white">Coretify</span>
          </div>

          {/* ── Heading ── */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`h-${step}`}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease }}
            >
              <p className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-zinc-500 mb-3">
                {String(step).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
              </p>
              <h1
                className="text-[28px] sm:text-[32px] font-semibold tracking-tight text-white leading-[1.15] mb-2"
                style={{ whiteSpace: "pre-line" }}
              >
                {current.title}
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">{current.desc}</p>
            </motion.div>
          </AnimatePresence>

          {/* ── Body ── */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`b-${step}`}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease }}
              className="space-y-6"
            >
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
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
                      className="bg-zinc-950 border-zinc-800 text-slate-100 placeholder:text-zinc-600 focus-visible:ring-slate-800 focus-visible:border-zinc-700"
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
                      className="bg-zinc-950 border-zinc-800 text-slate-100 placeholder:text-zinc-600 focus-visible:ring-slate-800 focus-visible:border-zinc-700"
                    />
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-2">
                  {verticals.map((v) => {
                    const sel = businessType === v.value;
                    return (
                      <button
                        key={v.value}
                        onClick={() => pickVertical(v.value)}
                        className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-left transition-all duration-150 ${
                          sel
                            ? "border-zinc-600/80 bg-zinc-900/80 text-white"
                            : "border-zinc-800/60 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div>
                          <p className="text-[13px] font-semibold">{v.label}</p>
                          <p className={`text-[11px] mt-0.5 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{v.desc}</p>
                        </div>
                        <div className={`shrink-0 ml-4 h-[18px] w-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                          sel ? "border-white" : "border-zinc-700 group-hover:border-zinc-500"
                        }`}>
                          {sel && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-2">
                  {scales.map((s) => {
                    const sel = teamSize === s.value;
                    return (
                      <button
                        key={s.value}
                        onClick={() => pickScale(s.value)}
                        className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-left transition-all duration-150 ${
                          sel
                            ? "border-zinc-600/80 bg-zinc-900/80 text-white"
                            : "border-zinc-800/60 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div>
                          <p className="text-[13px] font-semibold">{s.label}</p>
                          <p className={`text-[11px] mt-0.5 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{s.desc}</p>
                        </div>
                        <div className={`shrink-0 ml-4 h-[18px] w-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                          sel ? "border-white" : "border-zinc-700 group-hover:border-zinc-500"
                        }`}>
                          {sel && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-2">Data Source</p>
                    <div className="space-y-1.5">
                      {toolsList.map((t) => {
                        const sel = toolsUsed.includes(t.value);
                        return (
                          <button
                            key={t.value}
                            onClick={() => toggleTool(t.value)}
                            className={`group w-full flex items-center justify-between px-3.5 py-3 rounded-lg border text-[12px] font-medium transition-all duration-150 ${
                              sel
                                ? "border-zinc-600/80 bg-zinc-900/80 text-white"
                                : "border-zinc-800/60 bg-zinc-950 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            <span>{t.label}</span>
                            <div className={`shrink-0 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                              sel ? "border-white bg-white" : "border-zinc-700 group-hover:border-zinc-500"
                            }`}>
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
                          <button
                            key={g.value}
                            onClick={() => toggleGoal(g.value)}
                            className={`group w-full flex items-center justify-between px-3.5 py-3 rounded-lg border text-[12px] font-medium transition-all duration-150 ${
                              sel
                                ? "border-zinc-600/80 bg-zinc-900/80 text-white"
                                : "border-zinc-800/60 bg-zinc-950 hover:border-zinc-700 text-zinc-500 hover:text-zinc-300"
                            }`}
                          >
                            <span>{g.label}</span>
                            <div className={`shrink-0 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                              sel ? "border-white bg-white" : "border-zinc-700 group-hover:border-zinc-500"
                            }`}>
                              {sel && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Navigation buttons (inline, below form) ── */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={goNext}
                  disabled={!canAdvance}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-black font-semibold text-sm h-11 rounded-lg transition-all shadow-lg disabled:opacity-25 disabled:pointer-events-none"
                >
                  {step === 4 ? "Selesai & Lanjut" : "Lanjutkan"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                {step > 1 && (
                  <button
                    onClick={goBack}
                    className="w-full flex items-center justify-center gap-2 bg-transparent hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-200 font-medium text-sm h-11 rounded-lg border border-zinc-800/60 hover:border-zinc-700 transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
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
