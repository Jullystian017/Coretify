"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Database, Building2, Users, Cpu, ArrowLeft, Send, Sparkles } from "lucide-react";

/* ─── Types & Options ───────────────────────────────────────── */
interface Message {
  id: string;
  sender: "ai" | "user";
  text: string;
  options?: { value: string; label: string; desc?: string }[];
  isMultiSelect?: boolean;
}

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
      <motion.div
        className="absolute -top-[10%] left-[10%] w-[85%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.13) 0%, rgba(220,220,235,0.06) 45%, transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{ scale: [1, 1.1, 1], x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[10%] -left-[10%] w-[65%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(190,190,215,0.10) 0%, rgba(140,140,175,0.045) 50%, transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{ scale: [1, 1.08, 1], x: [0, -10, 0], y: [0, 8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
      <motion.div
        className="absolute top-[25%] left-[15%] w-[65%] aspect-square rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.07, 0.97, 1], opacity: [0.7, 1, 0.75, 0.7] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_75%_at_50%_35%,transparent_25%,rgba(7,7,8,0.75)_100%)]" />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function OnboardingPage() {
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Profile states
  const [ownerName, setOwnerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [painPoints, setPainPoints] = useState<string[]>([]);

  // Conversational flow states
  const [currentStep, setCurrentStep] = useState(1);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Halo! Selamat datang di Coretify. Saya Coretify AI, asisten virtual yang akan membantu merancang Otak Kedua bisnis Anda.\n\nMari mulai dengan nama Anda dan nama bisnis/workspace Anda.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Multi-select current state
  const [tempMultiSelect, setTempMultiSelect] = useState<string[]>([]);

  // Input fields for step 1
  const [inputOwner, setInputOwner] = useState("");
  const [inputCompany, setInputCompany] = useState("");

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateAiTyping = (text: string, nextOptions?: any[], isMulti?: boolean, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "ai",
          text,
          options: nextOptions,
          isMultiSelect: isMulti,
        },
      ]);
    }, delay);
  };

  // Step 1: Submit Name & Workspace
  const handleStep1Submit = () => {
    if (!inputOwner.trim() || !inputCompany.trim()) return;
    setOwnerName(inputOwner);
    setCompanyName(inputCompany);

    // Add user response to chat
    setMessages((prev) => [
      ...prev,
      {
        id: "step1-user",
        sender: "user",
        text: `Saya ${inputOwner}, nama bisnis saya ${inputCompany}.`,
      },
    ]);

    setCurrentStep(2);
    simulateAiTyping(
      `Salam kenal, ${inputOwner}! Senang bisa membantu ${inputCompany}.\n\nBisnis ${inputCompany} bergerak di bidang apa ya? Playbook AI Coretify akan disesuaikan khusus untuk bidang ini.`,
      verticals
    );
  };

  // Step 2: Choose Vertical
  const handleSelectVertical = (value: string, label: string) => {
    setBusinessType(value);
    setMessages((prev) => [
      ...prev,
      {
        id: "step2-user",
        sender: "user",
        text: `Kami adalah ${label}.`,
      },
    ]);

    setCurrentStep(3);
    simulateAiTyping(
      `Keren! Bidang ${label} memiliki kompleksitas data tersendiri.\n\nBerapa banyak orang yang aktif bekerja di tim ${companyName} saat ini?`,
      scales
    );
  };

  // Step 3: Choose Team Size
  const handleSelectScale = (value: string, label: string) => {
    setTeamSize(value);
    setMessages((prev) => [
      ...prev,
      {
        id: "step3-user",
        sender: "user",
        text: `Tim kami berukuran sekitar ${label}.`,
      },
    ]);

    setCurrentStep(4);
    simulateAiTyping(
      `Sip, kami akan menyesuaikan kapasitas pemrosesan memory index untuk ukuran tim Anda.\n\nSekarang, pilih tools yang saat ini aktif digunakan oleh tim Anda sehari-hari untuk berkomunikasi atau menyimpan data. (Pilih semua yang sesuai)`,
      toolsList,
      true
    );
  };

  // Step 4: Multi-select Tools
  const handleToggleTool = (value: string) => {
    setTempMultiSelect((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleConfirmTools = () => {
    if (tempMultiSelect.length === 0) return;
    setToolsUsed(tempMultiSelect);
    const selectedLabels = tempMultiSelect.map(
      (v) => toolsList.find((t) => t.value === v)?.label || v
    );

    setMessages((prev) => [
      ...prev,
      {
        id: "step4-user",
        sender: "user",
        text: `Kami menggunakan: ${selectedLabels.join(", ")}.`,
      },
    ]);

    setTempMultiSelect([]);
    setCurrentStep(5);
    simulateAiTyping(
      `Sangat lengkap! Kami akan menyiapkan pipeline sinkronisasi untuk data stream tersebut.\n\nTerakhir, apa tantangan bisnis terbesar saat ini yang ingin Anda selesaikan menggunakan Coretify?`,
      goalsList,
      true
    );
  };

  // Step 5: Multi-select Goals & Finish
  const handleToggleGoal = (value: string) => {
    setTempMultiSelect((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleConfirmGoals = () => {
    if (tempMultiSelect.length === 0) return;
    setPainPoints(tempMultiSelect);
    const selectedLabels = tempMultiSelect.map(
      (v) => goalsList.find((g) => g.value === v)?.label || v
    );

    setMessages((prev) => [
      ...prev,
      {
        id: "step5-user",
        sender: "user",
        text: `Tantangan kami: ${selectedLabels.join(", ")}.`,
      },
    ]);

    // Save final state
    const configData = {
      name: companyName,
      ownerName: ownerName,
      businessType: businessType,
      teamSize: teamSize,
      toolsUsed: toolsUsed,
      painPoints: tempMultiSelect,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("coretify_company", JSON.stringify(configData));

    setTempMultiSelect([]);
    setCurrentStep(6);
    simulateAiTyping(
      `Analisis profil bisnis Anda telah selesai! Playbook *${businessType}* telah terkonfigurasi untuk mendeteksi risiko projek & komunikasi.\n\nSekarang Anda siap mencoba Sandbox demo selama 3 menit untuk melihat cara Coretify bekerja, atau langsung menghubungkan data source real Anda!`,
      [
        { value: "sandbox", label: "Coba Sandbox Demo (3 Menit)" },
        { value: "connect", label: "Hubungkan Data Source Anda" },
      ]
    );
  };

  // Step 6: Redirect Choices
  const handleFinishRedirect = (value: string) => {
    if (value === "sandbox") {
      router.push("/sandbox");
    } else {
      router.push("/connect");
    }
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#070708] text-slate-100 grid lg:grid-cols-[380px_1fr] font-sans antialiased">
      {/* ── LEFT PANEL ────────────────────────────────────────── */}
      <aside className="hidden lg:flex relative flex-col border-r border-white/[0.04] p-10 overflow-hidden">
        <AuroraBackground />

        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="relative z-10 flex items-center gap-0.5 hover:opacity-75 transition-opacity"
        >
          <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
          <span className="text-[19px] font-semibold tracking-tight text-white">Coretify</span>
        </button>

        {/* Dynamic Checklist / Pipeline Indicator */}
        <div className="relative z-10 mt-16 space-y-6">
          <p className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] text-zinc-500">
            Workspace Configuration
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`h-6 w-6 rounded-md flex items-center justify-center border text-[11px] ${ownerName ? "bg-white border-white text-black font-bold" : "border-zinc-800 text-zinc-600 bg-transparent"}`}>
                {ownerName ? <Check className="h-3.5 w-3.5 stroke-[3px]" /> : "1"}
              </div>
              <span className={`text-[12px] font-medium ${ownerName ? "text-zinc-300" : "text-zinc-650"}`}>
                {ownerName ? companyName : "workspace info"}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`h-6 w-6 rounded-md flex items-center justify-center border text-[11px] ${businessType ? "bg-white border-white text-black font-bold" : "border-zinc-800 text-zinc-600 bg-transparent"}`}>
                {businessType ? <Check className="h-3.5 w-3.5 stroke-[3px]" /> : "2"}
              </div>
              <span className={`text-[12px] font-medium ${businessType ? "text-zinc-300" : "text-zinc-650"}`}>
                {businessType ? businessType : "business vertical"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`h-6 w-6 rounded-md flex items-center justify-center border text-[11px] ${teamSize ? "bg-white border-white text-black font-bold" : "border-zinc-800 text-zinc-600 bg-transparent"}`}>
                {teamSize ? <Check className="h-3.5 w-3.5 stroke-[3px]" /> : "3"}
              </div>
              <span className={`text-[12px] font-medium ${teamSize ? "text-zinc-300" : "text-zinc-650"}`}>
                {teamSize ? `${teamSize} Orang` : "team size"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className={`h-6 w-6 rounded-md flex items-center justify-center border text-[11px] ${toolsUsed.length > 0 ? "bg-white border-white text-black font-bold" : "border-zinc-800 text-zinc-600 bg-transparent"}`}>
                {toolsUsed.length > 0 ? <Check className="h-3.5 w-3.5 stroke-[3px]" /> : "4"}
              </div>
              <span className={`text-[12px] font-medium ${toolsUsed.length > 0 ? `${toolsUsed.length} Tools Terhubung` : "data sources"}`}>
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic active vertical badge */}
        {businessType && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 mt-8 p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 flex items-start gap-3"
          >
            <Cpu className="h-4 w-4 text-purple-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[11px] font-semibold text-white">Active Playbook</p>
              <p className="text-[10px] text-zinc-400 mt-1 font-mono uppercase tracking-wider">
                {businessType} Active Engine
              </p>
            </div>
          </motion.div>
        )}

        <div className="relative z-10 mt-auto">
          <p className="text-[11px] text-zinc-600 italic leading-relaxed">
            Otak kedua bisnis yang terus belajar dari koordinasi tim Anda.
          </p>
        </div>
      </aside>

      {/* ── RIGHT PANEL: CONVERSATIONAL CHAT INTERFACE ─────────── */}
      <div className="relative flex flex-col justify-between h-full overflow-hidden bg-[#0a0a0c]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-14 lg:px-20 space-y-6 scrollbar-thin">
          <div className="max-w-2xl mx-auto space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-zinc-800 text-white rounded-tr-none"
                        : "bg-zinc-900/60 border border-zinc-800/50 text-zinc-300 rounded-tl-none"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="flex items-center gap-1.5 mb-1.5 font-bold font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                        <Sparkles className="h-3 w-3 text-purple-400" /> Coretify AI
                      </div>
                    )}
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-zinc-900/60 border border-zinc-800/50 text-zinc-400 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input & Option Picker area */}
        <div className="border-t border-white/[0.04] bg-[#0c0c0e]/80 backdrop-blur-md px-6 py-6 sm:px-14 lg:px-20">
          <div className="max-w-2xl mx-auto">
            {/* Step 1 input */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">
                      Nama Anda
                    </label>
                    <Input
                      autoFocus
                      placeholder="e.g. Julian Albertus"
                      value={inputOwner}
                      onChange={(e) => setInputOwner(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && inputCompany.trim() && handleStep1Submit()}
                      className="h-10 bg-[#070708] border-zinc-800 text-slate-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-700 rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">
                      Nama Bisnis / Workspace
                    </label>
                    <Input
                      placeholder="e.g. Stravio Labs"
                      value={inputCompany}
                      onChange={(e) => setInputCompany(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && inputOwner.trim() && handleStep1Submit()}
                      className="h-10 bg-[#070708] border-zinc-800 text-slate-100 placeholder:text-zinc-700 focus-visible:ring-0 focus-visible:border-zinc-700 rounded-xl"
                    />
                  </div>
                </div>
                <button
                  onClick={handleStep1Submit}
                  disabled={!inputOwner.trim() || !inputCompany.trim()}
                  className="w-full h-11 flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.08)] disabled:opacity-20 disabled:pointer-events-none"
                >
                  Kirim Profil <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Step 2 options: Vertical playbooks */}
            {currentStep === 2 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-2">Pilih Vertical Bisnis</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {verticals.map((v) => (
                    <button
                      key={v.value}
                      onClick={() => handleSelectVertical(v.value, v.label)}
                      className="w-full text-left p-3 border border-zinc-850 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 rounded-xl group transition-all"
                    >
                      <p className="text-[12px] font-semibold text-white group-hover:text-purple-300 transition-colors">{v.label}</p>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{v.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 options: Team scale */}
            {currentStep === 3 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-2">Berapa ukuran tim Anda?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {scales.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => handleSelectScale(s.value, s.label)}
                      className="w-full text-left p-3.5 border border-zinc-850 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 rounded-xl group transition-all"
                    >
                      <p className="text-[12px] font-semibold text-white group-hover:text-purple-300 transition-colors">{s.label}</p>
                      <p className="text-[10px] text-zinc-500 mt-1 leading-snug">{s.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4 options: Multi-select tools */}
            {currentStep === 4 && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">Pilih Data Source Utama</p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {toolsList.map((t) => {
                    const isSelected = tempMultiSelect.includes(t.value);
                    return (
                      <button
                        key={t.value}
                        onClick={() => handleToggleTool(t.value)}
                        className={`p-2.5 text-center border rounded-xl transition-all text-[12px] font-medium flex flex-col items-center justify-between gap-2 ${
                          isSelected
                            ? "border-white bg-zinc-900 text-white"
                            : "border-zinc-850 bg-zinc-900/30 hover:bg-zinc-900/50 text-zinc-450 hover:text-zinc-200"
                        }`}
                      >
                        <span>{t.label}</span>
                        <div className={`h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                          isSelected ? "border-white bg-white" : "border-zinc-700"
                        }`}>
                          {isSelected && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={handleConfirmTools}
                  disabled={tempMultiSelect.length === 0}
                  className="w-full h-10 mt-2 flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl disabled:opacity-20 transition-all"
                >
                  Konfirmasi Pilihan Data Source <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Step 5 options: Multi-select goals */}
            {currentStep === 5 && (
              <div className="space-y-3">
                <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500">Pilih Target Outcome / Masalah Utama</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {goalsList.map((g) => {
                    const isSelected = tempMultiSelect.includes(g.value);
                    return (
                      <button
                        key={g.value}
                        onClick={() => handleToggleGoal(g.value)}
                        className={`text-left p-3 border rounded-xl transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-white bg-zinc-900 text-white"
                            : "border-zinc-850 bg-zinc-900/30 hover:bg-zinc-900/50 text-zinc-450 hover:text-zinc-200"
                        }`}
                      >
                        <span className="text-[12px] font-semibold">{g.label}</span>
                        <div className={`shrink-0 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                          isSelected ? "border-white bg-white" : "border-zinc-700"
                        }`}>
                          {isSelected && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={handleConfirmGoals}
                  disabled={tempMultiSelect.length === 0}
                  className="w-full h-10 mt-2 flex items-center justify-center gap-1.5 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl disabled:opacity-20 transition-all"
                >
                  Konfirmasi Target Outcome <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Step 6 options: Redirects */}
            {currentStep === 6 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold font-mono uppercase tracking-[0.15em] text-zinc-500 mb-2">Tindakan Selanjutnya</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleFinishRedirect("sandbox")}
                    className="h-11 flex items-center justify-center gap-2 border border-zinc-750 bg-zinc-900/40 hover:bg-zinc-900/80 text-zinc-200 font-semibold text-xs rounded-xl transition-all"
                  >
                    <Sparkles className="h-4 w-4 text-purple-400" /> Coba Sandbox Demo (3 Menit)
                  </button>
                  <button
                    onClick={() => handleFinishRedirect("connect")}
                    className="h-11 flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.08)]"
                  >
                    Hubungkan Data Source <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
