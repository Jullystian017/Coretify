"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Send,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Coins,
  Cpu,
  User,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  sources?: { title: string; url: string; preview: string }[];
  feedback?: { accuracy?: "up" | "down"; usefulness?: "up" | "down" };
  time: string;
}

export default function AskBusinessPage() {
  const [query, setQuery] = useState("");
  const [playbook, setPlaybook] = useState("Software House");
  const [companyName, setCompanyName] = useState("Perusahaan");
  const [credits, setCredits] = useState(1000);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const formatTime = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  // Load configuration from local storage
  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.businessType) setPlaybook(parsed.businessType);
      if (parsed.name) setCompanyName(parsed.name);
    }
    
    // Manage credits state in local storage
    const savedCredits = localStorage.getItem("coretify_credits");
    if (savedCredits) {
      setCredits(parseInt(savedCredits, 10));
    } else {
      localStorage.setItem("coretify_credits", "1000");
    }

    // Default intro message
    setMessages([
      {
        id: "intro",
        sender: "ai",
        text: `Halo! Saya Coretify AI, Otak Kedua bisnis Anda.\n\nMemori untuk **${companyName}** sudah aktif dengan playbook **${playbook}**. Tanyakan apa saja tentang project yang berisiko terlambat, histori revisi klien, komitmen tim di WhatsApp, atau invoice tertunggak.`,
        time: formatTime(),
      },
    ]);
  }, [companyName, playbook]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const presetQuestions =
    playbook === "Software House"
      ? [
          "Project apa yang berisiko terlambat?",
          "Apa keputusan meeting Coretify Dev terakhir?",
          "Berapa invoice Nexa Corp yang belum terbayar?",
        ]
      : playbook === "Agency"
      ? [
          "Client mana yang paling sering minta revisi?",
          "Bagaimana kapasitas workload tim design minggu ini?",
          "Ada feedback klien Aero Design di WhatsApp?",
        ]
      : [
          "Berapa run rate / pengeluaran cloud server startup?",
          "Apa komitmen Alex untuk sprint kali ini?",
          "Rangkum pembicaraan meeting investor kemarin.",
        ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim() || credits <= 0) return;

    // Deduct credit
    const nextCredits = credits - 1;
    setCredits(nextCredits);
    localStorage.setItem("coretify_credits", nextCredits.toString());

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: Math.random().toString(), sender: "user", text, time: formatTime() },
    ]);
    setQuery("");
    setIsTyping(true);

    // AI answer simulation
    setTimeout(() => {
      setIsTyping(false);
      let answerText = "";
      let mockSources: any[] = [];

      const q = text.toLowerCase();
      if (q.includes("terlambat") || q.includes("risiko") || q.includes("workload")) {
        answerText = `Berdasarkan email dan koordinasi chat grup WhatsApp, project **Coretify Dev** berisiko terlambat sekitar 1 minggu karena adanya permintaan revisi scope tambahan dari klien *Nexa Corp*.\n\nKapasitas kerja Alex (PM) juga terdeteksi overload karena meng-handle 3 milestone paralel secara bersamaan.`;
        mockSources = [
          { title: "WhatsApp: Nexa Corp Coordination (Baris 42)", url: "#", preview: "Julian: Minta diselesaikan akhir bulan..." },
          { title: "Gmail: Nexa Dev Scope Change", url: "#", preview: "Alex: Timeline disepakati diundur..." }
        ];
      } else if (q.includes("keputusan") || q.includes("meeting") || q.includes("kesepakatan")) {
        answerText = `Keputusan terakhir pada meeting tanggal **20 Juni 2026** menyepakati bahwa deadline untuk Coretify Dev dimajukan ke **25 Juli 2026** dan Alex ditugaskan menyiapkan webhook integration besok pagi.`;
        mockSources = [
          { title: "Google Calendar: Coretify Sync", url: "#", preview: "Timeline disetujui dipercepat..." }
        ];
      } else if (q.includes("invoice") || q.includes("bayar") || q.includes("keuangan") || q.includes("nexa") || q.includes("run rate")) {
        answerText = `Terdapat 1 invoice *Nexa Corp* senilai **Rp45.000.000** dengan status pending sejak 14 Juni 2026.\n\nSecara umum cashflow startup masih aman untuk 6.5 bulan ke depan dengan burn rate server stabil.`;
        mockSources = [
          { title: "CSV: Nexa_Invoices_June_2026.csv", url: "#", preview: "Invoice #1029: Rp45.000.000 Pending" }
        ];
      } else {
        answerText = `Saya menganalisis memori bisnis Anda untuk mencari informasi terkait *"${text}"*.\n\nSecara ringkas, tim Anda aktif mendiskusikan hal ini di Gmail minggu lalu, namun belum ada keputusan tertulis yang di-tag di memo atau kalender resmi.`;
        mockSources = [
          { title: "Gmail Inbox Search Result", url: "#", preview: "Diskusi awal mengenai topik..." }
        ];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "ai",
          text: answerText,
          sources: mockSources,
          time: formatTime(),
        },
      ]);
    }, 1200);
  };

  const handleFeedback = (msgId: string, type: "accuracy" | "usefulness", score: "up" | "down") => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          const fb = msg.feedback || {};
          fb[type] = score;
          return { ...msg, feedback: fb };
        }
        return msg;
      })
    );
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="relative flex flex-col h-screen overflow-hidden">
        <SiteHeader title="Ask Business AI" />

        <div className="flex-1 flex flex-col min-h-0 @container/main">
          <div className="flex flex-1 flex-col p-4 md:p-6 min-h-0 max-w-5xl w-full mx-auto justify-between overflow-hidden">
            {/* The beautiful console card */}
            <Card className="flex flex-col flex-1 overflow-hidden relative bg-gradient-to-br from-[rgba(255,255,255,0.03)] via-[rgba(255,255,255,0.01)] to-transparent border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
              
              {/* Card Header: Top info bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 bg-white/[0.01] shrink-0">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <Cpu className="h-4 w-4 text-purple-400" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    Playbook: {playbook} Engine Active
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.02]">
                  <Coins className="h-3.5 w-3.5 text-yellow-500" />
                  <span className="text-[11px] font-mono font-bold text-zinc-300">
                    {credits} / 1000 Credits
                  </span>
                </div>
              </div>

              {/* Unified Feed Chat Log */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4 border-b border-white/[0.02] pb-6 last:border-b-0"
                    >
                      {/* Avatar */}
                      <div className={`h-9 w-9 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                        msg.sender === "user"
                          ? "bg-zinc-900 border-zinc-800 text-zinc-450 ring-2 ring-zinc-500/10"
                          : "bg-purple-950/40 border-purple-900/30 text-purple-450 ring-2 ring-purple-500/25 shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                      }`}>
                        {msg.sender === "user" ? <User className="h-4.5 w-4.5" /> : <Sparkles className="h-4.5 w-4.5 animate-pulse" />}
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 space-y-2 min-w-0">
                        {/* Header */}
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-white leading-none">
                            {msg.sender === "user" ? "Anda" : "Coretify AI Brain"}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {msg.time}
                          </span>
                        </div>

                        {/* Styled Message card */}
                        <div className={`p-4 rounded-2xl border leading-relaxed text-[13px] whitespace-pre-line text-zinc-350 ${
                          msg.sender === "user"
                            ? "bg-zinc-900/30 border-white/[0.04]"
                            : "bg-purple-500/[0.01] border-purple-500/10 shadow-[0_4px_24px_rgba(0,0,0,0.15)] space-y-4"
                        }`}>
                          <p className="font-normal text-zinc-200">{msg.text}</p>

                          {/* Citations block for AI */}
                          {msg.sender === "ai" && msg.sources && msg.sources.length > 0 && (
                            <div className="pt-4 border-t border-white/[0.04] space-y-2">
                              <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-550 flex items-center gap-1.5">
                                <span className="inline-block h-1 w-1 bg-purple-400 rounded-full" />
                                Sitasi Rujukan Memori ({msg.sources.length})
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {msg.sources.map((src, i) => (
                                  <a
                                    key={i}
                                    href={src.url}
                                    className="flex items-center justify-between p-3 rounded-xl bg-[#0c0c0e]/80 border border-white/[0.04] hover:border-purple-500/30 hover:bg-purple-500/[0.03] hover:scale-[1.01] transition-all duration-200 text-xs group"
                                  >
                                    <span className="text-zinc-300 truncate max-w-[200px] font-medium flex items-center gap-1.5">
                                      📎 {src.title}
                                    </span>
                                    <span className="text-zinc-500 group-hover:text-purple-400 flex items-center gap-1 text-[10px] font-mono">
                                      open <ExternalLink className="h-3 w-3" />
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Feedback systems for AI */}
                        {msg.sender === "ai" && msg.id !== "intro" && (
                          <div className="flex items-center gap-4 text-xs text-zinc-550 pt-2 border-t border-white/[0.03]">
                            <span className="font-mono uppercase tracking-wider text-[10px] text-zinc-500">
                              Apakah data ini akurat?
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleFeedback(msg.id, "accuracy", "up")}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] transition-all duration-200 cursor-pointer ${
                                  msg.feedback?.accuracy === "up"
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)] font-semibold"
                                    : "bg-white/[0.01] border-white/[0.04] text-zinc-400 hover:text-white hover:border-white/[0.1]"
                                }`}
                              >
                                <ThumbsUp className="h-3 w-3" /> Benar
                              </button>
                              <button
                                onClick={() => handleFeedback(msg.id, "accuracy", "down")}
                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] transition-all duration-200 cursor-pointer ${
                                  msg.feedback?.accuracy === "down"
                                    ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.15)] font-semibold"
                                    : "bg-white/[0.01] border-white/[0.04] text-zinc-400 hover:text-white hover:border-white/[0.1]"
                                }`}
                              >
                                <ThumbsDown className="h-3 w-3" /> Salah
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-4"
                    >
                      <div className="h-9 w-9 rounded-xl border border-purple-500/25 bg-purple-950/40 flex items-center justify-center shrink-0 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
                        <Sparkles className="h-4.5 w-4.5 animate-pulse" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[13px] font-bold text-white">Coretify AI Brain</span>
                          <span className="text-[10px] text-zinc-550 font-mono">Proses...</span>
                        </div>
                        <div className="bg-purple-500/[0.01] border border-purple-500/10 px-4 py-3.5 rounded-2xl flex items-center gap-1.5 w-16 shadow-[0_4px_24px_rgba(0,0,0,0.15)]">
                          <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-1.5 w-1.5 bg-purple-400 rounded-full animate-bounce" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Input & suggestions footer */}
              <div className="p-4 border-t border-white/[0.06] bg-white/[0.01] space-y-4 shrink-0">
                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {presetQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="text-xs text-zinc-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.04] hover:border-white/[0.1] px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer font-medium"
                      >
                        💡 {q}
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative border border-white/[0.08] rounded-xl bg-[#0c0c0e]/60 flex items-center p-2.5 focus-within:border-purple-500/40 focus-within:ring-2 focus-within:ring-purple-500/25 transition-all duration-200 shadow-inner">
                  <input
                    type="text"
                    placeholder="Tanyakan status project, keputusan client, invoice, timeline..."
                    className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-[13px] placeholder:text-zinc-500 text-zinc-200 pr-12 px-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={credits <= 0}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!query.trim() || credits <= 0}
                    className="absolute right-2.5 h-8.5 w-8.5 rounded-lg bg-white hover:bg-zinc-250 text-black flex items-center justify-center transition-all disabled:opacity-20 shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.06)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                {credits <= 0 && (
                  <p className="text-[10px] text-red-500 font-bold text-center animate-pulse">
                    ⚠️ Saldo kredit Anda habis! Silakan top-up di halaman Billing untuk terus menggunakan Ask Business.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
