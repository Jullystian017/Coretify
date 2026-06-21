"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
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
      <SidebarInset className="bg-[#070708] text-zinc-150">
        <SiteHeader />

        <div className="flex flex-1 flex-col overflow-hidden max-w-4xl w-full mx-auto px-6 py-6 md:py-8 justify-between relative h-[calc(100vh-var(--header-height))]">
          {/* Top Info Bar */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 shrink-0">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-purple-400" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">
                Playbook: {playbook} Engine Active
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-850 bg-[#0c0c0e]">
              <Coins className="h-3.5 w-3.5 text-yellow-500" />
              <span className="text-[11px] font-mono font-bold text-zinc-300">
                {credits} / 1000 Credits
              </span>
            </div>
          </div>

          {/* Unified Feed Chat Log */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6 scrollbar-thin">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4 border-b border-zinc-900/30 pb-6 last:border-b-0"
                >
                  {/* Avatar */}
                  <div className={`h-8.5 w-8.5 rounded-xl border flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                    msg.sender === "user"
                      ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                      : "bg-purple-950/40 border-purple-900/30 text-purple-400"
                  }`}>
                    {msg.sender === "user" ? <User className="h-4 w-4 text-zinc-400" /> : <Sparkles className="h-4 w-4" />}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 space-y-2">
                    {/* Header */}
                    <div className="flex items-center gap-2.5">
                      <span className="text-[12.5px] font-bold text-white leading-none">
                        {msg.sender === "user" ? "Anda" : "Coretify AI Brain"}
                      </span>
                      <span className="text-[10px] text-zinc-600 font-mono tracking-wider">
                        {msg.time}
                      </span>
                    </div>

                    {/* Styled Message card */}
                    <div className={`p-4 rounded-xl border leading-relaxed text-[12.5px] whitespace-pre-line text-zinc-300 ${
                      msg.sender === "user"
                        ? "bg-zinc-950/20 border-zinc-900"
                        : "bg-zinc-900/20 border-zinc-850 shadow-[0_4px_20px_rgba(0,0,0,0.15)] space-y-4"
                    }`}>
                      <p>{msg.text}</p>

                      {/* Citations block for AI */}
                      {msg.sender === "ai" && msg.sources && msg.sources.length > 0 && (
                        <div className="pt-3 border-t border-zinc-850/60 space-y-2">
                          <p className="text-[9.5px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                            Sitasi Rujukan Memori ({msg.sources.length})
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {msg.sources.map((src, i) => (
                              <a
                                key={i}
                                href={src.url}
                                className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all text-[11px] group"
                              >
                                <span className="text-zinc-350 truncate max-w-[180px] font-medium">
                                  📎 {src.title}
                                </span>
                                <span className="text-zinc-650 group-hover:text-zinc-400 flex items-center gap-0.5 text-[9.5px]">
                                  Buka <ExternalLink className="h-2.5 w-2.5" />
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Feedback systems for AI */}
                    {msg.sender === "ai" && msg.id !== "intro" && (
                      <div className="flex items-center gap-4 text-[10px] text-zinc-550 pt-0.5">
                        <span className="font-mono uppercase tracking-wider text-[9px] text-zinc-650">
                          Apakah data ini akurat?
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleFeedback(msg.id, "accuracy", "up")}
                            className={`flex items-center gap-1 transition-colors hover:text-white ${
                              msg.feedback?.accuracy === "up" ? "text-emerald-400" : ""
                            }`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" /> Benar
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, "accuracy", "down")}
                            className={`flex items-center gap-1 transition-colors hover:text-white ${
                              msg.feedback?.accuracy === "down" ? "text-red-400" : ""
                            }`}
                          >
                            <ThumbsDown className="h-3.5 w-3.5" /> Salah
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
                  <div className="h-8.5 w-8.5 rounded-xl border border-purple-900/30 bg-purple-950/40 flex items-center justify-center shrink-0 text-purple-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] font-bold text-white">Coretify AI Brain</span>
                      <span className="text-[10px] text-zinc-600 font-mono">Proses...</span>
                    </div>
                    <div className="bg-zinc-900/20 border border-zinc-850 px-4 py-3.5 rounded-xl flex items-center gap-1.5 w-16">
                      <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>

          {/* Input & suggestions footer */}
          <div className="space-y-3 shrink-0 pt-4 bg-[#070708] border-t border-zinc-900">
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                {presetQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[11px] text-zinc-450 hover:text-white bg-zinc-900 border border-zinc-850 px-3 py-2 rounded-xl transition-colors hover:bg-zinc-900/80 text-left font-medium"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>
            )}

            <div className="relative border border-zinc-850 rounded-2xl bg-[#0c0c0e] flex items-center p-3">
              <input
                type="text"
                placeholder="Tanyakan status project, keputusan client, invoice, timeline..."
                className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-[13px] placeholder:text-zinc-700 text-zinc-300 pr-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={credits <= 0}
              />
              <button
                onClick={() => handleSend()}
                disabled={!query.trim() || credits <= 0}
                className="absolute right-3 h-8 w-8 rounded-lg bg-white hover:bg-zinc-200 text-black flex items-center justify-center transition-all disabled:opacity-20 shrink-0 shadow-[0_0_12px_rgba(255,255,255,0.06)] cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            
            {credits <= 0 && (
              <p className="text-[10px] text-red-500 font-bold text-center animate-pulse">
                ⚠️ Saldo kredit Anda habis! Silakan top-up di halaman Billing untuk terus menggunakan Ask Business.
              </p>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
