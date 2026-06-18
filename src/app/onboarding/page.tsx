"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Database, Building2, Users, Cpu } from "lucide-react";

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
        JSON.stringify({
          name: companyName,
          businessType,
          teamSize,
          toolsUsed,
          painPoints,
          createdAt: new Date().toISOString(),
        })
      );
      router.push("/connect");
    }
  };

  const goBack = () => {
    if (step > 1) {
      setDir(-1);
      setStep((s) => s - 1);
    }
  };

  const pickVertical = (v: string) => {
    setBusinessType(v);
    setDir(1);
    setTimeout(() => setStep(3), 200);
  };

  const pickScale = (s: string) => {
    setTeamSize(s);
    setDir(1);
    setTimeout(() => setStep(4), 200);
  };

  const toggleTool = (t: string) =>
    setToolsUsed((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const toggleGoal = (g: string) =>
    setPainPoints((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));

  const current = STEPS[step - 1];

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, y: d * 12 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d * -12 }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#070708] text-zinc-100 font-sans antialiased flex">

      {/* ── Atmospheric glows ──────────────────────────── */}
      <div className="pointer-events-none fixed -top-[30%] -left-[15%] w-[70vw] h-[70vw] rounded-full bg-white/[0.022] blur-[160px] z-0" />
      <div className="pointer-events-none fixed -bottom-[30%] -right-[15%] w-[60vw] h-[60vw] rounded-full bg-zinc-300/[0.018] blur-[150px] z-0" />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ══ LEFT PANEL ═══════════════════════════════════ */}
      <aside className="relative z-10 flex-shrink-0 w-[300px] xl:w-[340px] flex flex-col justify-between border-r border-zinc-900/50 bg-[#070708]/60 backdrop-blur-sm px-8 py-10 select-none">
        
        {/* Logo */}
        <div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-0 hover:opacity-75 transition-opacity mb-14"
          >
            <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
            <span className="text-[19px] font-semibold tracking-tight text-white">Coretify</span>
          </button>

          {/* Step navigator */}
          <nav className="space-y-1">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isDone = step > s.id;
              const isActive = step === s.id;
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive ? "bg-zinc-900/60" : ""
                  }`}
                >
                  {/* Icon / check circle */}
                  <div
                    className={`shrink-0 h-7 w-7 rounded-md flex items-center justify-center transition-all duration-200 ${
                      isDone
                        ? "bg-white text-black"
                        : isActive
                        ? "bg-zinc-800 text-white"
                        : "bg-transparent border border-zinc-800 text-zinc-700"
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-3.5 w-3.5 stroke-[3px]" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className={`text-[13px] font-medium transition-all duration-200 ${
                      isDone
                        ? "text-zinc-500 line-through decoration-zinc-700"
                        : isActive
                        ? "text-white"
                        : "text-zinc-600"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom context */}
        <div className="space-y-3">
          <div className="h-px bg-zinc-900/60" />
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            Data Anda diproses secara lokal dan tidak pernah dikirim ke pihak ketiga tanpa izin eksplisit.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-600 animate-pulse" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Read-only · TLS 1.3</span>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT PANEL ══════════════════════════════════ */}
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden">

        {/* Content area */}
        <div className="flex-1 flex items-center justify-center px-10 xl:px-20 overflow-hidden">
          <div className="w-full max-w-[520px]">

            {/* Heading */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`h-${step}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="mb-8"
              >
                <p className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">
                  {String(step).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
                </p>
                <h1
                  className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-white leading-[1.15] mb-3"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {current.title}
                </h1>
                <p className="text-zinc-400 text-[13px] leading-relaxed max-w-sm">
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Step body */}
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={`b-${step}`}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* ── Step 1: Identity ── */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">
                        Nama Bisnis
                      </label>
                      <Input
                        autoFocus
                        type="text"
                        placeholder="e.g. Acme Corporation"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && ownerName.trim() && goNext()}
                        className="h-12 bg-zinc-950/50 border-zinc-800/70 focus:border-zinc-600 text-white placeholder:text-zinc-700 text-[14px] rounded-xl px-4 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">
                        Nama Anda
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Alex Henderson"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && companyName.trim() && goNext()}
                        className="h-12 bg-zinc-950/50 border-zinc-800/70 focus:border-zinc-600 text-white placeholder:text-zinc-700 text-[14px] rounded-xl px-4 transition-colors"
                      />
                    </div>
                  </div>
                )}

                {/* ── Step 2: Vertical ── */}
                {step === 2 && (
                  <div className="space-y-2">
                    {verticals.map((v) => {
                      const sel = businessType === v.value;
                      return (
                        <button
                          key={v.value}
                          onClick={() => pickVertical(v.value)}
                          className={`group w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all duration-150 ${
                            sel
                              ? "border-zinc-600/80 bg-zinc-900/70 text-white"
                              : "border-zinc-900 bg-transparent hover:border-zinc-800 hover:bg-zinc-950/40 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <div>
                            <p className="text-[13px] font-semibold">{v.label}</p>
                            <p className={`text-[11px] mt-0.5 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{v.desc}</p>
                          </div>
                          <div
                            className={`shrink-0 ml-4 h-[18px] w-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                              sel ? "border-white" : "border-zinc-700 group-hover:border-zinc-600"
                            }`}
                          >
                            {sel && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── Step 3: Scale ── */}
                {step === 3 && (
                  <div className="space-y-2">
                    {scales.map((s) => {
                      const sel = teamSize === s.value;
                      return (
                        <button
                          key={s.value}
                          onClick={() => pickScale(s.value)}
                          className={`group w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all duration-150 ${
                            sel
                              ? "border-zinc-600/80 bg-zinc-900/70 text-white"
                              : "border-zinc-900 bg-transparent hover:border-zinc-800 hover:bg-zinc-950/40 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <div>
                            <p className="text-[13px] font-semibold">{s.label}</p>
                            <p className={`text-[11px] mt-0.5 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{s.desc}</p>
                          </div>
                          <div
                            className={`shrink-0 ml-4 h-[18px] w-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-all ${
                              sel ? "border-white" : "border-zinc-700 group-hover:border-zinc-600"
                            }`}
                          >
                            {sel && <div className="h-[7px] w-[7px] rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* ── Step 4: Connect ── */}
                {step === 4 && (
                  <div className="grid grid-cols-2 gap-5">
                    {/* Tools */}
                    <div>
                      <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-3">Data Source</p>
                      <div className="space-y-1.5">
                        {toolsList.map((t) => {
                          const sel = toolsUsed.includes(t.value);
                          return (
                            <button
                              key={t.value}
                              onClick={() => toggleTool(t.value)}
                              className={`group w-full flex items-center justify-between px-4 py-[11px] rounded-lg border text-[12px] font-medium transition-all duration-150 ${
                                sel
                                  ? "border-zinc-600/80 bg-zinc-900/70 text-white"
                                  : "border-zinc-900 bg-transparent hover:border-zinc-800 hover:bg-zinc-950/40 text-zinc-500 hover:text-zinc-300"
                              }`}
                            >
                              <span>{t.label}</span>
                              <div
                                className={`shrink-0 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                                  sel ? "border-white bg-white" : "border-zinc-700 group-hover:border-zinc-600"
                                }`}
                              >
                                {sel && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Goals */}
                    <div>
                      <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-3">Target Outcome</p>
                      <div className="space-y-1.5">
                        {goalsList.map((g) => {
                          const sel = painPoints.includes(g.value);
                          return (
                            <button
                              key={g.value}
                              onClick={() => toggleGoal(g.value)}
                              className={`group w-full flex items-center justify-between px-4 py-[11px] rounded-lg border text-[12px] font-medium transition-all duration-150 ${
                                sel
                                  ? "border-zinc-600/80 bg-zinc-900/70 text-white"
                                  : "border-zinc-900 bg-transparent hover:border-zinc-800 hover:bg-zinc-950/40 text-zinc-500 hover:text-zinc-300"
                              }`}
                            >
                              <span>{g.label}</span>
                              <div
                                className={`shrink-0 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                                  sel ? "border-white bg-white" : "border-zinc-700 group-hover:border-zinc-600"
                                }`}
                              >
                                {sel && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* ── Bottom nav bar ──────────────────────────── */}
        <div className="shrink-0 border-t border-zinc-900/50 px-10 xl:px-20 h-16 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={step === 1}
            className="text-[12px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-20 disabled:pointer-events-none"
          >
            ← Kembali
          </button>

          <button
            onClick={goNext}
            disabled={!canAdvance}
            className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-black font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-all shadow-[0_0_24px_rgba(255,255,255,0.07)] disabled:opacity-25 disabled:pointer-events-none"
          >
            {step === 4 ? "Selesai & Lanjut" : "Lanjutkan"}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </main>
    </div>
  );
}
