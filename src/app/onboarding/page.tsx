"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  // Accumulated data
  const [companyName, setCompanyName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [painPoints, setPainPoints] = useState<string[]>([]);

  const progressPercent = (step / 4) * 100;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const companyData = {
        name: companyName || "Coretify Workspace",
        businessType: businessType || "Startup",
        teamSize: teamSize || "1-10",
        toolsUsed: toolsUsed.length > 0 ? toolsUsed : ["Gmail", "Drive"],
        painPoints: painPoints.length > 0 ? painPoints : ["Knowledge loss"],
        createdAt: new Date().toISOString()
      };
      localStorage.setItem("coretify_company", JSON.stringify(companyData));
      router.push("/connect");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleVerticalSelect = (value: string) => {
    setBusinessType(value);
    setTimeout(() => {
      setStep(3);
    }, 220);
  };

  const handleScaleSelect = (value: string) => {
    setTeamSize(value);
    setTimeout(() => {
      setStep(4);
    }, 220);
  };

  const toggleTool = (tool: string) => {
    if (toolsUsed.includes(tool)) {
      setToolsUsed(toolsUsed.filter((t) => t !== tool));
    } else {
      setToolsUsed([...toolsUsed, tool]);
    }
  };

  const toggleGoal = (goal: string) => {
    if (painPoints.includes(goal)) {
      setPainPoints(painPoints.filter((g) => g !== goal));
    } else {
      setPainPoints([...painPoints, goal]);
    }
  };

  const verticals = [
    { label: "🏢 Software House", value: "Software House", desc: "Playbook kustom untuk workload, code logs, & scope creep." },
    { label: "🎨 Creative Agency", value: "Agency", desc: "Mengoptimalkan margins, kolaborasi client, & retensi akun." },
    { label: "🚀 Tech Startup", value: "Startup", desc: "Fokus akselerasi produk & data decision logs secara otomatis." },
    { label: "💼 Professional Services", value: "Consultant", desc: "Akurasi data audit legal, konsultasi, dan timeline deliverables." },
    { label: "📦 Lainnya / Retail", value: "Lainnya", desc: "Koordinasi operasional internal & monitoring bookkeeping." }
  ];

  const scales = [
    { label: "👥 1 - 10 Orang", value: "1-10", desc: "Tim Butik / Small studio / Small business" },
    { label: "🏢 10 - 50 Orang", value: "10-50", desc: "Tim Berkembang / Mid-size organization" },
    { label: "🏛️ 50+ Orang", value: "50+", desc: "Skala Korporat / Enterprise solution" }
  ];

  const toolsList = [
    { label: "📧 Gmail", value: "Gmail" },
    { label: "📅 Google Calendar", value: "Calendar" },
    { label: "💾 Google Drive", value: "Drive" },
    { label: "💬 WhatsApp Chat", value: "WhatsApp" },
    { label: "📊 CSV/Excel", value: "CSV" }
  ];

  const goalsList = [
    { label: "⚠️ Project Delay", value: "Project terlambat" },
    { label: "🧠 Knowledge Loss", value: "Knowledge loss" },
    { label: "📊 Overcapacity", value: "Tim monitoring" },
    { label: "💬 Client Revision", value: "Client chaos" },
    { label: "💵 Sales Chaos", value: "Sales chaos" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#070708] text-zinc-100 selection:bg-white/10 selection:text-white relative overflow-hidden font-sans antialiased">
      
      {/* Background concentric rings visual decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-[0.12]">
        <div className="w-[85vw] h-[85vw] rounded-full border border-zinc-950 border-dashed animate-[spin_120s_linear_infinite]" />
        <div className="w-[55vw] h-[55vw] rounded-full border border-zinc-950 border-dashed animate-[spin_80s_linear_infinite_reverse]" />
      </div>

      {/* Atmospheric radial flows */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] aspect-square rounded-full bg-white/[0.01] blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50%] aspect-square rounded-full bg-zinc-500/[0.015] blur-[120px] pointer-events-none -z-10" />

      {/* Center Layout Container with Dashed Side Borders */}
      <div className="mx-auto max-w-[1360px] w-full min-h-screen border-l border-r border-zinc-800/10 border-dashed flex flex-col justify-between relative z-10">
        
        {/* Header bar */}
        <header className="border-b border-zinc-900/40 bg-[#070708]/85 backdrop-blur-md sticky top-0 z-50 w-full select-none">
          <div className="px-8 flex h-20 items-center justify-between">
            <div className="flex items-center gap-0 cursor-pointer" onClick={() => router.push("/")}>
              <img src="/coretify.png" alt="Coretify Logo" className="h-8 w-auto object-contain" />
              <span className="text-[19px] font-semibold tracking-tight text-white">
                Coretify
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">
                SECURE CONNECTOR · TLS 1.3
              </span>
            </div>
          </div>
        </header>

        {/* Setup wizard workspace (Flat & Borderless) */}
        <main className="flex-1 max-w-2xl w-full mx-auto px-6 py-16 md:py-24 flex flex-col justify-center">
          
          {/* Step Metadata bar */}
          <div className="flex items-center justify-between border-b border-zinc-900/40 pb-3 mb-8 select-none">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <span className="text-zinc-500">★</span> STEP {step} OF 4
            </span>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest font-mono">
              {Math.round(progressPercent)}% Completed
            </span>
          </div>

          {/* Progress bar indicator */}
          <div className="w-full h-[2px] bg-zinc-900/60 relative overflow-hidden rounded-full mb-8">
            <div
              className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Monospace Step Badge Category Tag */}
          <div className="self-start inline-block px-3 py-1 rounded-md border border-zinc-850 bg-zinc-950/20 text-[9px] font-extrabold uppercase tracking-[0.2em] text-zinc-400 font-mono mb-6">
            {step === 1 && "WORKSPACE IDENTITY"}
            {step === 2 && "VERTICAL PLAYBOOK"}
            {step === 3 && "TEAM SCALE"}
            {step === 4 && "DATA & OUTCOMES"}
          </div>

          {/* Big Typography Question Headline */}
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3 leading-tight">
            {step === 1 && "Tell us about your workspace."}
            {step === 2 && "Which vertical playbook should we deploy?"}
            {step === 3 && "How many members are in your team?"}
            {step === 4 && "Select data sources and target outcomes."}
          </h1>

          <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed mb-10 select-none">
            {step === 1 && "Enter your company name and owner details to initialize the company memory."}
            {step === 2 && "Coretify will automatically customize risk detection rules and daily brief templates."}
            {step === 3 && "This sets the data allocation and capacity thresholds for your memory stream."}
            {step === 4 && "Choose the platforms you plan to connect and the key challenges you want to solve first."}
          </p>

          {/* Steps Switcher Content Container */}
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500 font-mono block">Nama Bisnis / Perusahaan</label>
                    <Input
                      type="text"
                      placeholder="e.g. Acme Corporation"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-transparent border-zinc-900 focus:border-zinc-700 transition-all text-sm rounded-md py-6 px-4 text-white placeholder-zinc-650"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500 font-mono block">Nama Anda (Owner / Admin)</label>
                    <Input
                      type="text"
                      placeholder="e.g. Alex Henderson"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="bg-transparent border-zinc-900 focus:border-zinc-700 transition-all text-sm rounded-md py-6 px-4 text-white placeholder-zinc-650"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  {verticals.map((v) => {
                    const isSelected = businessType === v.value;
                    return (
                      <button
                        key={v.value}
                        onClick={() => handleVerticalSelect(v.value)}
                        className={`w-full flex items-center justify-between p-5 rounded-xl border text-left transition-all duration-200 select-none ${
                          isSelected
                            ? "bg-zinc-950/40 border-zinc-500 text-white shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                            : "bg-transparent border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{v.label}</div>
                          <div className="text-[11px] text-zinc-500 mt-1 font-normal leading-relaxed">{v.desc}</div>
                        </div>
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? "border-white bg-white" : "border-zinc-800 bg-transparent"
                        }`}>
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-3"
                >
                  {scales.map((s) => {
                    const isSelected = teamSize === s.value;
                    return (
                      <button
                        key={s.value}
                        onClick={() => handleScaleSelect(s.value)}
                        className={`w-full flex items-center justify-between p-5 rounded-xl border text-left transition-all duration-200 select-none ${
                          isSelected
                            ? "bg-zinc-950/40 border-zinc-500 text-white shadow-[0_0_20px_rgba(255,255,255,0.02)]"
                            : "bg-transparent border-zinc-900 hover:border-zinc-800 text-zinc-450 hover:text-white"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold">{s.label}</div>
                          <div className="text-[11px] text-zinc-500 mt-1 font-normal">{s.desc}</div>
                        </div>
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                          isSelected ? "border-white bg-white" : "border-zinc-800 bg-transparent"
                        }`}>
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
                        </div>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Left: Tools selection */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-550 font-mono block">
                      Rencana Data Source
                    </label>
                    <div className="space-y-2">
                      {toolsList.map((t) => {
                        const isSelected = toolsUsed.includes(t.value);
                        return (
                          <button
                            key={t.value}
                            onClick={() => toggleTool(t.value)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border text-xs font-semibold text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-zinc-950/40 border-zinc-500 text-white"
                                : "bg-transparent border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <span>{t.label}</span>
                            <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-all ${
                              isSelected ? "border-white bg-white text-black" : "border-zinc-800 bg-transparent"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3px]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Goals selection */}
                  <div className="space-y-3">
                    <label className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-550 font-mono block">
                      Target Outcomes Utama
                    </label>
                    <div className="space-y-2">
                      {goalsList.map((g) => {
                        const isSelected = painPoints.includes(g.value);
                        return (
                          <button
                            key={g.value}
                            onClick={() => toggleGoal(g.value)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border text-xs font-semibold text-left transition-all duration-200 ${
                              isSelected
                                ? "bg-zinc-950/40 border-zinc-500 text-white"
                                : "bg-transparent border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-white"
                            }`}
                          >
                            <span>{g.label}</span>
                            <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center transition-all ${
                              isSelected ? "border-white bg-white text-black" : "border-zinc-800 bg-transparent"
                            }`}>
                              {isSelected && <Check className="h-3 w-3 stroke-[3px]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stepper Footer actions */}
          <div className="border-t border-zinc-900/40 mt-12 pt-6 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={step === 1}
              className="bg-transparent border-zinc-900 hover:border-zinc-800 text-zinc-450 hover:text-white rounded-md text-xs py-2.5 px-4 font-semibold transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-2" />
              Kembali
            </Button>

            <Button
              size="sm"
              onClick={handleNext}
              disabled={
                (step === 1 && (!companyName.trim() || !ownerName.trim())) ||
                (step === 2 && !businessType) ||
                (step === 3 && !teamSize) ||
                (step === 4 && toolsUsed.length === 0)
              }
              className="bg-white hover:bg-zinc-100 text-black font-bold rounded-md text-xs py-2.5 px-6 shadow border-0 duration-200 transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              {step === 4 ? "Selesaikan Setup" : "Lanjut"}
              <ArrowRight className="h-3.5 w-3.5 ml-2" />
            </Button>
          </div>

        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900/40 py-6 px-8 flex items-center justify-between select-none">
          <p className="text-[10px] text-zinc-550 font-mono">
            &copy; 2026 Coretify Inc. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-550 font-mono">
            Secure Read-Only Access
          </p>
        </footer>

      </div>
    </div>
  );
}
