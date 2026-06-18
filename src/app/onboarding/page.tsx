"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [painPoints, setPainPoints] = useState<string[]>([]);
  const [dir, setDir] = useState<1 | -1>(1);

  const TOTAL_STEPS = 4;
  const progressPercent = (step / TOTAL_STEPS) * 100;

  const goNext = () => {
    setDir(1);
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      localStorage.setItem(
        "coretify_company",
        JSON.stringify({
          name: companyName || "Coretify Workspace",
          businessType: businessType || "Startup",
          teamSize: teamSize || "1-10",
          toolsUsed: toolsUsed.length > 0 ? toolsUsed : ["Gmail", "Drive"],
          painPoints: painPoints.length > 0 ? painPoints : ["Knowledge loss"],
          createdAt: new Date().toISOString(),
        })
      );
      router.push("/connect");
    }
  };

  const goBack = () => {
    setDir(-1);
    if (step > 1) setStep(step - 1);
  };

  const selectVertical = (v: string) => {
    setBusinessType(v);
    setDir(1);
    setTimeout(() => setStep(3), 200);
  };

  const selectScale = (s: string) => {
    setTeamSize(s);
    setDir(1);
    setTimeout(() => setStep(4), 200);
  };

  const toggleTool = (t: string) =>
    setToolsUsed((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const toggleGoal = (g: string) =>
    setPainPoints((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const canAdvance =
    (step === 1 && companyName.trim() !== "" && ownerName.trim() !== "") ||
    (step === 2 && businessType !== "") ||
    (step === 3 && teamSize !== "") ||
    (step === 4 && toolsUsed.length > 0);

  const verticals = [
    { label: "Software House", value: "Software House", desc: "Workload, code logs & scope creep monitoring" },
    { label: "Creative Agency", value: "Agency", desc: "Client retention, margins & revision tracking" },
    { label: "Tech Startup", value: "Startup", desc: "Decision logs, product velocity & sprint analytics" },
    { label: "Professional Services", value: "Consultant", desc: "Legal audit trails, deliverable timelines" },
    { label: "Lainnya / Retail / Dagang", value: "Lainnya", desc: "Operational coordination & bookkeeping sync" },
  ];

  const scales = [
    { label: "1 – 10 Orang", value: "1-10", desc: "Small studio, founder-led, or boutique team" },
    { label: "10 – 50 Orang", value: "10-50", desc: "Growing mid-size organization" },
    { label: "50+ Orang", value: "50+", desc: "Corporate or enterprise-scale deployment" },
  ];

  const toolsList = [
    { label: "Gmail", value: "Gmail" },
    { label: "Google Calendar", value: "Calendar" },
    { label: "Google Drive", value: "Drive" },
    { label: "WhatsApp Chat", value: "WhatsApp" },
    { label: "CSV / Excel", value: "CSV" },
  ];

  const goalsList = [
    { label: "Project sering terlambat", value: "Project terlambat" },
    { label: "Knowledge hilang saat resign", value: "Knowledge loss" },
    { label: "Kapasitas tim sulit dipantau", value: "Tim monitoring" },
    { label: "Komunikasi client chaos", value: "Client chaos" },
    { label: "Invoice & sales tidak terpantau", value: "Sales chaos" },
  ];

  const stepMeta = [
    { tag: "Workspace", title: "Tell us about your workspace.", desc: "Enter your company name and your name to initialize the memory space." },
    { tag: "Playbook", title: "Which vertical should we configure?", desc: "Coretify activates specialized risk detection rules and prompts based on your industry." },
    { tag: "Team Size", title: "How large is your team?", desc: "This configures data allocation thresholds and memory capacity for your workspace." },
    { tag: "Connect", title: "What do you want to achieve?", desc: "Choose the tools you'll connect and the top business challenges to resolve first." },
  ];

  const current = stepMeta[step - 1];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 18, y: 4 }),
    center: { opacity: 1, x: 0, y: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -18, y: -4 }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#070708] text-zinc-100 font-sans antialiased relative flex flex-col">

      {/* ── Hero-style glows ─────────────────────────────── */}
      {/* Top-left atmospheric glow */}
      <div className="pointer-events-none absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-white/[0.028] blur-[140px] -z-10" />
      {/* Bottom-right atmospheric glow */}
      <div className="pointer-events-none absolute -bottom-[20%] -right-[10%] w-[55vw] h-[55vw] rounded-full bg-zinc-400/[0.025] blur-[130px] -z-10" />
      {/* Center radial soft spotlight */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] h-[45vw] rounded-full bg-white/[0.012] blur-[160px] -z-10" />

      {/* Subtle grid-dot background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Navbar ──────────────────────────────────────── */}
      <header className="shrink-0 border-b border-zinc-900/50 bg-[#070708]/80 backdrop-blur-md z-50 select-none">
        <div className="max-w-[1360px] mx-auto px-8 flex h-[68px] items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-0 hover:opacity-80 transition-opacity"
          >
            <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
            <span className="text-[19px] font-semibold tracking-tight text-white">Coretify</span>
          </button>

          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i + 1 === step
                    ? "w-4 h-1.5 bg-white"
                    : i + 1 < step
                    ? "w-1.5 h-1.5 bg-zinc-500"
                    : "w-1.5 h-1.5 bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Progress line */}
        <div className="w-full h-[1px] bg-zinc-900/60">
          <div
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* ── Main content ────────────────────────────────── */}
      <main className="flex-1 overflow-hidden flex items-center justify-center px-6">
        <div className="w-full max-w-[560px]">

          {/* Tag + headline */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`head-${step}`}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-8"
            >
              <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 font-mono border border-zinc-900 rounded px-2.5 py-1">
                {current.tag}
              </span>
              <h1 className="text-[26px] sm:text-[30px] font-semibold tracking-tight text-white leading-[1.18] mb-3">
                {current.title}
              </h1>
              <p className="text-zinc-400 text-[13px] leading-relaxed">
                {current.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Step content */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`body-${step}`}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 font-mono">
                      Nama Bisnis
                    </label>
                    <Input
                      autoFocus
                      type="text"
                      placeholder="e.g. Acme Corporation"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && ownerName.trim() && goNext()}
                      className="bg-zinc-950/60 border-zinc-800/80 focus:border-zinc-600 text-white placeholder:text-zinc-600 text-sm rounded-lg py-5.5 px-4 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 font-mono">
                      Nama Anda
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Alex Henderson"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && companyName.trim() && goNext()}
                      className="bg-zinc-950/60 border-zinc-800/80 focus:border-zinc-600 text-white placeholder:text-zinc-600 text-sm rounded-lg py-5.5 px-4 transition-all"
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
                        onClick={() => selectVertical(v.value)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all duration-150 ${
                          sel
                            ? "border-zinc-600 bg-zinc-900/60 text-white"
                            : "border-zinc-900 bg-transparent hover:border-zinc-800 hover:bg-zinc-950/30 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div>
                          <p className="text-[13px] font-semibold">{v.label}</p>
                          <p className={`text-[11px] mt-0.5 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{v.desc}</p>
                        </div>
                        <div className={`shrink-0 h-4 w-4 rounded-full border flex items-center justify-center ml-4 transition-all ${
                          sel ? "border-white bg-white" : "border-zinc-700 bg-transparent"
                        }`}>
                          {sel && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
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
                        onClick={() => selectScale(s.value)}
                        className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border text-left transition-all duration-150 ${
                          sel
                            ? "border-zinc-600 bg-zinc-900/60 text-white"
                            : "border-zinc-900 bg-transparent hover:border-zinc-800 hover:bg-zinc-950/30 text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        <div>
                          <p className="text-[13px] font-semibold">{s.label}</p>
                          <p className={`text-[11px] mt-0.5 ${sel ? "text-zinc-400" : "text-zinc-600"}`}>{s.desc}</p>
                        </div>
                        <div className={`shrink-0 h-4 w-4 rounded-full border flex items-center justify-center ml-4 transition-all ${
                          sel ? "border-white bg-white" : "border-zinc-700 bg-transparent"
                        }`}>
                          {sel && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 font-mono mb-2">Data Source</p>
                    {toolsList.map((t) => {
                      const sel = toolsUsed.includes(t.value);
                      return (
                        <button
                          key={t.value}
                          onClick={() => toggleTool(t.value)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-[12px] font-medium text-left transition-all duration-150 ${
                            sel
                              ? "border-zinc-600 bg-zinc-900/60 text-white"
                              : "border-zinc-900 bg-transparent hover:border-zinc-800 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <span>{t.label}</span>
                          <div className={`shrink-0 h-3.5 w-3.5 rounded border flex items-center justify-center transition-all ${
                            sel ? "border-white bg-white" : "border-zinc-700 bg-transparent"
                          }`}>
                            {sel && <Check className="h-2.5 w-2.5 text-black stroke-[3px]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500 font-mono mb-2">Target Outcome</p>
                    {goalsList.map((g) => {
                      const sel = painPoints.includes(g.value);
                      return (
                        <button
                          key={g.value}
                          onClick={() => toggleGoal(g.value)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-[12px] font-medium text-left transition-all duration-150 ${
                            sel
                              ? "border-zinc-600 bg-zinc-900/60 text-white"
                              : "border-zinc-900 bg-transparent hover:border-zinc-800 text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <span>{g.label}</span>
                          <div className={`shrink-0 h-3.5 w-3.5 rounded border flex items-center justify-center transition-all ${
                            sel ? "border-white bg-white" : "border-zinc-700 bg-transparent"
                          }`}>
                            {sel && <Check className="h-2.5 w-2.5 text-black stroke-[3px]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer nav */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 1}
              className="flex items-center gap-1.5 text-[12px] text-zinc-500 hover:text-zinc-300 font-medium transition-all disabled:opacity-25 disabled:pointer-events-none"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </button>

            <Button
              onClick={goNext}
              disabled={!canAdvance}
              className="bg-white hover:bg-zinc-100 text-black font-bold rounded-lg text-[12px] px-6 py-2.5 border-0 shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              {step === TOTAL_STEPS ? "Finish Setup" : "Continue"}
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>

        </div>
      </main>

      {/* ── Bottom step counter ──────────────────────────── */}
      <div className="shrink-0 h-12 flex items-center justify-center border-t border-zinc-900/40 select-none">
        <span className="text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
          Step {step} of {TOTAL_STEPS}
        </span>
      </div>

    </div>
  );
}
