"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Mic,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Info,
  X,
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";

interface Participant {
  name: string;
  role: string;
  avatarText: string;
  avatarBg: string;
}

interface Meeting {
  id: string;
  title: string;
  time: string;
  indicatorColor: string; // "orange" | "grey" | "green"
  details: string;
  meetUrl: string;
  participantCount: number;
  participants: Participant[];
}

interface AIResponse {
  query: string;
  text: string;
  sources: { title: string; preview: string }[];
  time: string;
}

export default function AskBusinessPage() {
  const [query, setQuery] = useState("");
  const [userName, setUserName] = useState("Alex");
  const [credits, setCredits] = useState(1000);
  
  // Date State - Default to 30 June 2026
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 5, 30));
  
  // Meeting Expansion State - Default to the Greenleaf meeting ("meeting-3")
  const [expandedMeetingId, setExpandedMeetingId] = useState<string | null>("meeting-3");
  
  // AI Response View State
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load user data from localStorage
  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.ownerName) {
          setUserName(parsed.ownerName.split(" ")[0]);
        } else if (parsed.name) {
          setUserName(parsed.name.split(" ")[0]);
        }
      } catch (e) {
        // Fallback to "Alex"
      }
    }
    
    const savedCredits = localStorage.getItem("coretify_credits");
    if (savedCredits) {
      setCredits(parseInt(savedCredits, 10));
    }
  }, []);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [query]);

  // Greeting helper based on time of day
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning";
    if (hr < 17) return "Good afternoon";
    return "Good evening";
  };

  // Date formatter
  const formatDateDisplay = (date: Date) => {
    const today = new Date(2026, 5, 30);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    const formatted = date.toLocaleDateString("en-US", options);
    
    if (diffDays === 0) {
      return `Today, ${formatted}`;
    } else if (diffDays === -1) {
      return `Yesterday, ${formatted}`;
    } else if (diffDays === 1) {
      return `Tomorrow, ${formatted}`;
    } else {
      const dayNameOptions: Intl.DateTimeFormatOptions = { weekday: "short" };
      const dayName = date.toLocaleDateString("en-US", dayNameOptions);
      return `${dayName}, ${formatted}`;
    }
  };

  const handleDateChange = (direction: "prev" | "next") => {
    const nextDate = new Date(currentDate);
    if (direction === "prev") {
      nextDate.setDate(nextDate.getDate() - 1);
    } else {
      nextDate.setDate(nextDate.getDate() + 1);
    }
    setCurrentDate(nextDate);
    // Auto collapse meetings on date change to keep list clean
    setExpandedMeetingId(null);
  };

  // Simulated Mock Meetings for June 30, 2026
  const mockMeetings: Meeting[] = [
    {
      id: "meeting-1",
      title: "Basepoint x Stripe",
      time: "10:00 - 11:00 AM",
      indicatorColor: "orange",
      details: "Weekly sync meeting to discuss custom payment integrations, webhook setup, invoice statuses, and security features.",
      meetUrl: "https://meet.google.com/basepoint-stripe-sync",
      participantCount: 4,
      participants: [
        { name: "Dylan Parker", role: "CEO of Basepoint", avatarText: "DP", avatarBg: "bg-gradient-to-br from-amber-500 to-orange-600" },
        { name: "Sarah Jenkins", role: "Stripe Tech Lead", avatarText: "SJ", avatarBg: "bg-gradient-to-br from-blue-500 to-indigo-600" },
      ],
    },
    {
      id: "meeting-2",
      title: "Ashley & Martin",
      time: "10:20 - 10:40 AM",
      indicatorColor: "grey",
      details: "Quick review session of landing page UI designs, feedback from current clients, and alignment on asset delivery timelines.",
      meetUrl: "https://meet.google.com/ashley-martin-design",
      participantCount: 3,
      participants: [
        { name: "Ashley Thorne", role: "Design Director", avatarText: "AT", avatarBg: "bg-gradient-to-br from-pink-500 to-rose-600" },
        { name: "Martin Luther", role: "Product Designer", avatarText: "ML", avatarBg: "bg-gradient-to-br from-teal-500 to-emerald-600" },
      ],
    },
    {
      id: "meeting-3",
      title: "Greenleaf // Basepoint",
      time: "2:30 - 3:00 PM",
      indicatorColor: "green",
      details: "Demo call with Greenleaf team to help them get the most out of their PRO trial.",
      meetUrl: "https://meet.google.com/psn-zfzb-yaw",
      participantCount: 8,
      participants: [
        { name: "Dylan Parker", role: "CEO of Basepoint", avatarText: "DP", avatarBg: "bg-gradient-to-br from-amber-500 to-orange-600" },
        { name: "Annie Zhang", role: "Product Manager at Greenleaf", avatarText: "AZ", avatarBg: "bg-gradient-to-br from-purple-500 to-pink-600" },
      ],
    },
  ];

  // Helper to check if meetings exist on selected date (we only show mock meetings for June 30, 2026)
  const isJune30 = currentDate.getFullYear() === 2026 && currentDate.getMonth() === 5 && currentDate.getDate() === 30;

  // Text streaming simulation
  const simulateStreaming = (text: string) => {
    setTypedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 8); // Fast typing speed
  };

  const handleSend = (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim() || credits <= 0) return;

    // Deduct credit
    const nextCredits = credits - 1;
    setCredits(nextCredits);
    localStorage.setItem("coretify_credits", nextCredits.toString());

    setQuery("");
    setIsTyping(true);
    setFeedback(null);
    setAiResponse(null);

    // AI simulation logic
    setTimeout(() => {
      setIsTyping(false);
      let responseText = "";
      let responseSources: any[] = [];
      const q = text.toLowerCase();

      // Custom quick actions mapping
      if (q.includes("prep for next meeting") || q.includes("prep next meeting")) {
        responseText = `Berikut adalah persiapan untuk meeting Anda berikutnya **Greenleaf // Basepoint** (14:30 - 15:00):

• **Tujuan Meeting**: Demo call dengan tim Greenleaf untuk membantu mereka mengoptimalkan uji coba PRO trial Coretify.
• **Catatan Penting**:
  - Klien tertarik pada fitur otomatisasi sync memori WhatsApp.
  - Dylan Parker (CEO Basepoint) ingin melihat perbandingan efisiensi waktu sebelum & sesudah menggunakan playbook Coretify.
• **Action Items**:
  - Siapkan dashboard demo dengan data dummy project Software House.
  - Tunjukkan fitur WhatsApp sync & log aktivitas AI.`;
        responseSources = [
          { title: "Google Calendar: Greenleaf Sync & Demo Details", preview: "Timeline disetujui dipercepat..." },
          { title: "Slack: #client-greenleaf (Baris 18)", preview: "Dylan: Tunjukkan integrasi WhatsApp sync..." },
          { title: "Playbook: Client Onboarding Guide", preview: "Langkah-langkah setup demo dashboard..." }
        ];
      } else if (q.includes("recap last call") || q.includes("recap last")) {
        responseText = `Berikut adalah rangkuman dari call terakhir dengan **Ashley & Martin** (10:20 - 10:40 AM):

• **Diskusi Utama**: Klien menyetujui desain mockup landing page versi dark mode yang dikirim kemarin.
• **Revisi Tambahan**: Minta perubahan minor pada warna aksen tombol CTA agar menggunakan warna oklch ungu yang lebih menyala.
• **Timeline**: Penyerahan final file aset disepakati diundur ke besok sore (1 Juli 2026).
• **Status Finansial**: Invoice termin pertama (50%) telah dikonfirmasi lunas oleh sistem billing.`;
        responseSources = [
          { title: "Google Meet Recording Transcript: Ashley & Martin Sync", preview: "Ashley menyukai dark theme..." },
          { title: "WhatsApp Group: Ashley & Martin Dev", preview: "Martin: Tolong ubah CTA color..." },
          { title: "Invoices: INV-2026-089 Lunas", preview: "Invoice #089: Rp12.500.000 Lunas" }
        ];
      } else if (q.includes("terlambat") || q.includes("risiko") || q.includes("workload")) {
        responseText = `Berdasarkan email dan koordinasi chat grup WhatsApp, project **Coretify Dev** berisiko terlambat sekitar 1 minggu karena adanya permintaan revisi scope tambahan dari klien *Nexa Corp*.\n\nKapasitas kerja Alex (PM) juga terdeteksi overload karena meng-handle 3 milestone paralel secara bersamaan.`;
        responseSources = [
          { title: "WhatsApp: Nexa Corp Coordination (Baris 42)", preview: "Julian: Minta diselesaikan akhir bulan..." },
          { title: "Gmail: Nexa Dev Scope Change", preview: "Alex: Timeline disepakati diundur..." }
        ];
      } else if (q.includes("keputusan") || q.includes("meeting") || q.includes("kesepakatan")) {
        responseText = `Keputusan terakhir pada meeting tanggal **20 Juni 2026** menyepakati bahwa deadline untuk Coretify Dev dimajukan ke **25 Juli 2026** dan Alex ditugaskan menyiapkan webhook integration besok pagi.`;
        responseSources = [
          { title: "Google Calendar: Coretify Sync", preview: "Timeline disetujui dipercepat..." }
        ];
      } else if (q.includes("invoice") || q.includes("bayar") || q.includes("keuangan") || q.includes("nexa") || q.includes("run rate")) {
        responseText = `Terdapat 1 invoice *Nexa Corp* senilai **Rp45.000.000** dengan status pending sejak 14 Juni 2026.\n\nSecara umum cashflow startup masih aman untuk 6.5 bulan ke depan dengan burn rate server stabil.`;
        responseSources = [
          { title: "CSV: Nexa_Invoices_June_2026.csv", preview: "Invoice #1029: Rp45.000.000 Pending" }
        ];
      } else {
        responseText = `Saya menganalisis memori bisnis Anda untuk mencari informasi terkait *"${text}"*.\n\nSecara ringkas, tim Anda aktif mendiskusikan hal ini di Gmail minggu lalu, namun belum ada keputusan tertulis yang di-tag di memo atau kalender resmi.`;
        responseSources = [
          { title: "Gmail Inbox Search Result", preview: "Diskusi awal mengenai topik..." }
        ];
      }

      const newResponse = {
        query: text,
        text: responseText,
        sources: responseSources,
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      };

      setAiResponse(newResponse);
      simulateStreaming(responseText);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="relative flex flex-col h-screen overflow-hidden bg-[#070708] text-zinc-100">
        <SiteHeader title="Ask Assistant" />

        {/* Outer Scroll Wrapper */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-3xl w-full mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
            
            {/* Header Greeting */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full text-left mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                {getGreeting()}, {userName}
              </h1>
            </motion.div>

            {/* Redesigned Text Area Container */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="w-full bg-[#111113]/60 border border-white/[0.05] rounded-2xl p-4 shadow-[0_4px_30px_rgba(0,0,0,0.4)] focus-within:border-zinc-800 transition-all duration-300 backdrop-blur-md relative"
            >
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder="Ask anything..."
                className="w-full bg-transparent resize-none border-0 p-0 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0 text-sm md:text-base leading-relaxed max-h-[180px] pb-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={credits <= 0 || isTyping}
              />
              
              {/* Bottom Row Actions within Textarea Container */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
                {/* Model Selector Selector Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/[0.04] text-[11px] font-medium text-zinc-400 select-none pointer-events-auto cursor-pointer hover:bg-zinc-800 hover:text-zinc-300 transition-colors">
                  <span>Auto</span>
                  <ChevronDown className="h-3 w-3" />
                </div>

                {/* Right side info and send button */}
                <div className="flex items-center gap-3 pointer-events-auto">
                  <button className="text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none">
                    <Info className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => handleSend()}
                    disabled={!query.trim() || credits <= 0 || isTyping}
                    className="h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all duration-200 shadow-md disabled:opacity-20 disabled:pointer-events-none hover:scale-[1.05] active:scale-[0.95]"
                  >
                    <Send className="h-4 w-4 rotate-0" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Action Capsules */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center justify-center gap-3 mt-5 w-full flex-wrap"
            >
              <button
                onClick={() => handleSend("Prep for next meeting")}
                disabled={isTyping}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111113]/80 hover:bg-[#18181b] border border-white/[0.04] text-xs font-medium text-zinc-300 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 flex items-center justify-center">
                  <Calendar className="h-2.5 w-2.5 text-white" />
                </span>
                Prep for next meeting
              </button>
              <button
                onClick={() => handleSend("Recap last call")}
                disabled={isTyping}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111113]/80 hover:bg-[#18181b] border border-white/[0.04] text-xs font-medium text-zinc-300 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-pink-500 flex items-center justify-center">
                  <Mic className="h-2.5 w-2.5 text-white" />
                </span>
                Recap last call
              </button>
            </motion.div>

            {/* Dynamic View: AI Response OR Meetings List */}
            <div className="w-full mt-10">
              <AnimatePresence mode="wait">
                
                {/* 1. Loading typing simulation */}
                {isTyping && (
                  <motion.div
                    key="ai-loading"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full bg-[#111113]/40 border border-white/[0.03] rounded-2xl p-6 backdrop-blur-md space-y-4"
                  >
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Sparkles className="h-4.5 w-4.5 text-blue-400 animate-spin" />
                      <span className="text-xs font-medium font-mono uppercase tracking-wider">Coretify AI Brain Thinking...</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-3.5 bg-zinc-800/60 rounded w-5/6 animate-pulse" />
                      <div className="h-3.5 bg-zinc-800/60 rounded w-full animate-pulse" />
                      <div className="h-3.5 bg-zinc-800/60 rounded w-2/3 animate-pulse" />
                    </div>
                  </motion.div>
                )}

                {/* 2. AI Response output card */}
                {!isTyping && aiResponse && (
                  <motion.div
                    key="ai-output"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full bg-[#111113]/60 border border-white/[0.05] rounded-2xl p-6 backdrop-blur-md space-y-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                  >
                    {/* Panel Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-semibold text-zinc-300 font-mono uppercase tracking-wider">AI Response</span>
                      </div>
                      <button
                        onClick={() => setAiResponse(null)}
                        className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md hover:bg-zinc-900 transition-colors"
                        title="Back to meetings"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Question Bubble */}
                    <div className="bg-[#070708]/80 border border-white/[0.03] rounded-xl px-4 py-3 text-xs md:text-sm text-zinc-400">
                      <span className="font-mono text-zinc-500 mr-2">Query:</span>
                      "{aiResponse.query}"
                    </div>

                    {/* Simulated Typed Response Text */}
                    <div className="text-zinc-200 text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
                      {typedText}
                      {typedText.length < aiResponse.text.length && (
                        <span className="inline-block w-1.5 h-4 ml-0.5 bg-blue-500 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Citations/Sources Block */}
                    {aiResponse.sources && aiResponse.sources.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-white/[0.04]">
                        <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                          <span className="inline-block h-1 w-1 bg-blue-400 rounded-full" />
                          Memory Citations ({aiResponse.sources.length})
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {aiResponse.sources.map((src, i) => (
                            <div
                              key={i}
                              className="flex flex-col p-2.5 rounded-xl bg-zinc-950/80 border border-white/[0.04] text-xs space-y-1"
                            >
                              <span className="text-zinc-300 font-medium truncate flex items-center gap-1">
                                📎 {src.title}
                              </span>
                              <span className="text-zinc-500 text-[10px] truncate italic">
                                "{src.preview}"
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accuracy Feedback Panel */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-xs">
                      <span className="text-zinc-500">Apakah jawaban ini akurat?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFeedback("up")}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-medium transition-all cursor-pointer ${
                            feedback === "up"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                              : "bg-transparent border-white/[0.05] text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <ThumbsUp className="h-3 w-3" /> Yes
                        </button>
                        <button
                          onClick={() => setFeedback("down")}
                          className={`flex items-center gap-1 px-3 py-1 rounded-full border text-[11px] font-medium transition-all cursor-pointer ${
                            feedback === "down"
                              ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.15)]"
                              : "bg-transparent border-white/[0.05] text-zinc-400 hover:text-zinc-200"
                          }`}
                        >
                          <ThumbsDown className="h-3 w-3" /> No
                        </button>
                      </div>
                    </div>

                    {/* Back Button to Close and see meetings */}
                    <div className="flex justify-start">
                      <button
                        onClick={() => setAiResponse(null)}
                        className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors py-1.5 focus:outline-none cursor-pointer"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Meetings list
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 3. Meetings List */}
                {!isTyping && !aiResponse && (
                  <motion.div
                    key="meetings-panel"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full space-y-6"
                  >
                    {/* Meetings List Header */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-white">Meetings</h2>
                      <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-medium">
                        <span>{formatDateDisplay(currentDate)}</span>
                        <div className="flex items-center gap-1.5 border border-white/[0.04] rounded-lg bg-zinc-900/80 p-0.5 pointer-events-auto">
                          <button
                            onClick={() => handleDateChange("prev")}
                            className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-all cursor-pointer focus:outline-none"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDateChange("next")}
                            className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-all cursor-pointer focus:outline-none"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Meetings Stack */}
                    <div className="space-y-3">
                      {isJune30 ? (
                        mockMeetings.map((meeting) => {
                          const isExpanded = expandedMeetingId === meeting.id;
                          return (
                            <div
                              key={meeting.id}
                              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                isExpanded
                                  ? "bg-[#111113]/50 border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                                  : "bg-[#111113]/20 border-transparent hover:border-white/[0.04] hover:bg-[#111113]/30"
                              }`}
                            >
                              {/* Meeting Item Row (Clickable) */}
                              <div
                                onClick={() => setExpandedMeetingId(isExpanded ? null : meeting.id)}
                                className="flex items-center justify-between p-4 cursor-pointer select-none"
                              >
                                <div className="flex items-center gap-3">
                                  {/* Dot status indicator */}
                                  <span
                                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                      meeting.indicatorColor === "green"
                                        ? "bg-[#10b981]"
                                        : meeting.indicatorColor === "orange"
                                        ? "bg-[#f59e0b]"
                                        : "bg-[#71717a]"
                                    }`}
                                  />
                                  <span className={`text-sm md:text-base font-medium transition-colors ${
                                    isExpanded ? "text-white" : "text-zinc-300"
                                  }`}>
                                    {meeting.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                                  <span>{meeting.time}</span>
                                  <ChevronDown
                                    className={`h-4 w-4 text-zinc-650 transition-transform duration-300 ${
                                      isExpanded ? "rotate-180 text-zinc-400" : ""
                                    }`}
                                  />
                                </div>
                              </div>

                              {/* Expanded details container */}
                              <AnimatePresence initial={false}>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="border-t border-white/[0.03] overflow-hidden"
                                  >
                                    <div className="p-4 space-y-4 text-xs md:text-sm">
                                      {/* Details text */}
                                      <div className="space-y-1">
                                        <p className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px] font-mono">Details</p>
                                        <p className="text-zinc-300 leading-relaxed font-light">{meeting.details}</p>
                                      </div>

                                      {/* Meet URL */}
                                      <div className="flex items-center gap-1.5 text-zinc-400 font-mono hover:text-white transition-colors w-fit">
                                        <LinkIcon className="h-3.5 w-3.5 text-zinc-500" />
                                        <a href={meeting.meetUrl} target="_blank" rel="noreferrer" className="underline truncate max-w-[280px] sm:max-w-md">
                                          {meeting.meetUrl}
                                        </a>
                                        <ExternalLink className="h-3 w-3 text-zinc-500" />
                                      </div>

                                      {/* Participants section */}
                                      <div className="space-y-2 pt-2">
                                        <div className="flex items-center gap-2">
                                          <p className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px] font-mono">Participants</p>
                                          <span className="px-2 py-0.5 rounded-full bg-zinc-900 border border-white/[0.04] text-[10px] font-mono text-zinc-400">
                                            {meeting.participantCount}
                                          </span>
                                        </div>

                                        <div className="space-y-2">
                                          {meeting.participants.map((participant, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 shadow-sm ${participant.avatarBg}`}>
                                                {participant.avatarText}
                                              </div>
                                              <div className="flex flex-col">
                                                <span className="text-zinc-200 font-medium text-xs md:text-sm">{participant.name}</span>
                                                <span className="text-zinc-500 text-[10px] md:text-xs font-light">{participant.role}</span>
                                              </div>
                                            </div>
                                          ))}

                                          {/* Collapsed participants indicator */}
                                          {meeting.participantCount > meeting.participants.length && (
                                            <div className="flex items-center gap-3 pt-1">
                                              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/[0.04] flex items-center justify-center text-zinc-400 text-xs font-mono">
                                                +{meeting.participantCount - meeting.participants.length}
                                              </div>
                                              <span className="text-zinc-555 text-xs italic font-light">
                                                and {meeting.participantCount - meeting.participants.length} other participants
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })
                      ) : (
                        // Empty state for days other than June 30
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-full p-8 border border-dashed border-white/[0.04] rounded-2xl bg-zinc-950/20 text-center flex flex-col items-center justify-center space-y-3"
                        >
                          <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 border border-white/[0.04]">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-zinc-300 font-medium text-sm">No meetings scheduled</p>
                            <p className="text-zinc-500 text-xs font-light">Enjoy your focused time to build and design.</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Subtle Credit Info */}
            <div className="mt-12 text-zinc-650 text-[10px] font-mono uppercase tracking-wider flex items-center gap-2 select-none">
              <span>Assistant Credits: {credits} Remaining</span>
            </div>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
