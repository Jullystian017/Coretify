"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
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
  MessageSquare,
  FileText,
  CheckSquare,
  HelpCircle,
  Database,
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
  indicatorColor: string;
  details: string;
  meetUrl: string;
  participantCount: number;
  participants: Participant[];
}

interface WhatsAppChat {
  id: string;
  groupName: string;
  lastMessage: string;
  sender: string;
  time: string;
  unread: boolean;
  transcript: string[];
}

interface FileMemory {
  id: string;
  name: string;
  type: "csv" | "excel" | "docx" | "pdf";
  size: string;
  syncedAt: string;
  summary: string;
  extractedData?: { [key: string]: string }[];
}

interface ProjectDecision {
  id: string;
  project: string;
  decision: string;
  owner: string;
  date: string;
  source: string;
  sourceType: "whatsapp" | "email" | "meeting";
}

interface AIResponse {
  query: string;
  text: string;
  sources: { title: string; preview: string; type: "whatsapp" | "email" | "calendar" | "document" }[];
  time: string;
}

export default function AskBusinessPage() {
  const [query, setQuery] = useState("");
  const [userName, setUserName] = useState("Alex");
  const [credits, setCredits] = useState(1000);
  
  // Ask Mode: 'business' vs 'anything'
  const [askMode, setAskMode] = useState<string>("business");
  
  // Active Dashboard Tab
  const [activeTab, setActiveTab] = useState<string>("meetings");
  
  // Date State for Calendar - Default to 30 June 2026
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 5, 30));
  
  // Expanded ID states
  const [expandedMeetingId, setExpandedMeetingId] = useState<string | null>("meeting-3");
  const [expandedChatId, setExpandedChatId] = useState<string | null>(null);
  const [expandedFileId, setExpandedFileId] = useState<string | null>(null);
  const [expandedDecisionId, setExpandedDecisionId] = useState<string | null>(null);
  
  // AI Response states
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load user details
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
        // Fallback
      }
    }
    
    const savedCredits = localStorage.getItem("coretify_credits");
    if (savedCredits) {
      setCredits(parseInt(savedCredits, 10));
    }
  }, []);

  // Textarea auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [query]);

  // Smooth scroll-to-bottom helper
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  // Automatically scroll down when AI is typing or text updates
  useEffect(() => {
    if (isTyping || typedText) {
      scrollToBottom();
    }
  }, [isTyping, typedText]);

  const isJune30 = currentDate.getFullYear() === 2026 && currentDate.getMonth() === 5 && currentDate.getDate() === 30;

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
    }, 8);
  };

  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 12) return "Good morning";
    if (hr < 17) return "Good afternoon";
    return "Good evening";
  };

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
    setExpandedMeetingId(null);
  };

  // Mock Meetings
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
        { name: "Dylan Parker", role: "CEO of Basepoint", avatarText: "DP", avatarBg: "bg-amber-500/20 text-amber-400 border border-amber-500/10" },
        { name: "Sarah Jenkins", role: "Stripe Tech Lead", avatarText: "SJ", avatarBg: "bg-blue-500/20 text-blue-400 border border-blue-500/10" },
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
        { name: "Ashley Thorne", role: "Design Director", avatarText: "AT", avatarBg: "bg-pink-500/20 text-pink-400 border border-pink-500/10" },
        { name: "Martin Luther", role: "Product Designer", avatarText: "ML", avatarBg: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10" },
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
        { name: "Dylan Parker", role: "CEO of Basepoint", avatarText: "DP", avatarBg: "bg-amber-500/20 text-amber-400 border border-amber-500/10" },
        { name: "Annie Zhang", role: "Product Manager at Greenleaf", avatarText: "AZ", avatarBg: "bg-purple-500/20 text-purple-400 border border-purple-500/10" },
      ],
    },
  ];

  // Mock WhatsApp Chats
  const mockWhatsAppChats: WhatsAppChat[] = [
    {
      id: "chat-1",
      groupName: "Group Nexa Corp Dev",
      lastMessage: "Julian: Minta diselesaikan akhir bulan...",
      sender: "Julian",
      time: "11:42 AM",
      unread: true,
      transcript: [
        "Alex: Milestone 2 webhook integration sudah deploy ke staging.",
        "Julian: Oke sip. Tapi revisi scope login kemarin gmn ya?",
        "Alex: Sudah digabung, tinggal nunggu approval design.",
        "Julian: Sip, tolong dikejar ya. Minta diselesaikan akhir bulan deadline barunya."
      ]
    },
    {
      id: "chat-2",
      groupName: "Group Aero Design Client",
      lastMessage: "Ashley: Desain landing page dark mode disetujui",
      sender: "Ashley",
      time: "Yesterday",
      unread: false,
      transcript: [
        "Martin: Halo Ashley, berikut link Figma draft dark mode.",
        "Ashley: Wah cakep ini, saya suka perpaduan warna neon violet-nya.",
        "Ashley: Desain landing page dark mode disetujui. Silakan lanjut ke slicing."
      ]
    },
    {
      id: "chat-3",
      groupName: "Alex Chen (Direct)",
      lastMessage: "Alex: Webhook integration siap besok pagi",
      sender: "Alex Chen",
      time: "2 days ago",
      unread: false,
      transcript: [
        "Alex: Pagi pak, saya butuh API credentials Stripe terbaru.",
        "Alex: Nanti saya tes webhook lokal dulu.",
        "Alex: Webhook integration siap besok pagi kalau kredensial aman."
      ]
    }
  ];

  // Mock Files & Spreadsheets
  const mockFiles: FileMemory[] = [
    {
      id: "file-1",
      name: "Nexa_Invoices_June_2026.csv",
      type: "csv",
      size: "42 KB",
      syncedAt: "30 Jun 2026, 09:15 AM",
      summary: "Mengandung data tagihan invoice bulanan untuk klien Nexa Corp selama bulan Juni 2026.",
      extractedData: [
        { "Invoice ID": "INV-2026-1028", "Client": "Nexa Corp", "Amount": "Rp35.000.000", "Status": "Lunas" },
        { "Invoice ID": "INV-2026-1029", "Client": "Nexa Corp", "Amount": "Rp45.000.000", "Status": "Pending" }
      ]
    },
    {
      id: "file-2",
      name: "Aero Design Scope.docx",
      type: "docx",
      size: "1.2 MB",
      syncedAt: "28 Jun 2026, 04:30 PM",
      summary: "Dokumen ruang lingkup pengerjaan proyek rebranding website Aero Design, mencakup 3 halaman utama (Landing Page, pricing, blog)."
    },
    {
      id: "file-3",
      name: "Server_Cost_Startup.xlsx",
      type: "excel",
      size: "185 KB",
      syncedAt: "25 Jun 2026, 11:00 AM",
      summary: "Pengeluaran cloud server startup di AWS, GCP dan Vercel. Total run rate saat ini tercatat Rp12.500.000 per bulan."
    }
  ];

  // Mock Decisions & Projects
  const mockDecisions: ProjectDecision[] = [
    {
      id: "dec-1",
      project: "Coretify Dev",
      decision: "Deadline penyerahan milestone diundur menjadi 25 Juli 2026.",
      owner: "Alex Chen",
      date: "20 Jun 2026",
      source: "Gmail: Nexa Dev Scope Change",
      sourceType: "email"
    },
    {
      id: "dec-2",
      project: "Aero Design",
      decision: "Mockup desain landing page versi dark theme resmi disetujui klien.",
      owner: "Ashley Thorne",
      date: "29 Jun 2026",
      source: "WhatsApp: Group Aero Design Client",
      sourceType: "whatsapp"
    },
    {
      id: "dec-3",
      project: "Infrastructure",
      decision: "Migrasi serverless database AWS Aurora ke Supabase Postgres disepakati.",
      owner: "Alex Chen",
      date: "15 Jun 2026",
      source: "Calendar: Database Migration Sync",
      sourceType: "meeting"
    }
  ];

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

      // Check Ask Mode first
      if (askMode === "anything") {
        responseText = `Saya adalah AI Asisten Coretify. Karena Anda bertanya menggunakan mode **Ask Anything** (Umum), saya menjawab menggunakan database pengetahuan eksternal saya (tanpa mengakses memori email, WhatsApp, atau kalender bisnis Anda):\n\nUntuk mengoptimalkan konversi di platform SaaS Anda, pastikan proses onboarding user dibuat seringkas mungkin, kurangi kolom pengisian formulir yang tidak krusial, berikan tutorial interaktif, dan implementasikan nilai penawaran (value proposition) yang langsung terlihat dalam 30 detik pertama.`;
        responseSources = [];
      } else {
        // Ask Your Business (RAG Mode) - parses data sources
        if (q.includes("prep for next meeting") || q.includes("prep next meeting")) {
          responseText = `Berikut adalah persiapan rapat Anda berikutnya **Greenleaf // Basepoint** (14:30 - 15:00):

• **Tujuan Rapat**: Demo call dengan tim Greenleaf untuk membantu mereka mengoptimalkan uji coba PRO trial Coretify.
• **Konteks Memori**:
  - Berdasarkan log WhatsApp, Dylan Parker (CEO Basepoint) ingin melihat perbandingan efisiensi sebelum dan sesudah menggunakan playbook Coretify.
  - Klien sangat tertarik pada fitur otomatisasi sinkronisasi memori WhatsApp group chat.
• **Rekomendasi Tindakan**:
  - Siapkan dashboard demo dengan data playbook Software House.
  - Tunjukkan fitur penarikan entity otomatis dari chat WhatsApp.`;
          responseSources = [
            { title: "Google Calendar: Greenleaf Sync & Demo Details", preview: "Tujuan: Membantu tim Greenleaf mengoptimalkan...", type: "calendar" },
            { title: "WhatsApp: Group Aero Design Client (Baris 14)", preview: "Dylan: Tolong tunjukkan sinkronisasi WhatsApp...", type: "whatsapp" },
            { title: "Drive: Playbook Software House Guide", preview: "Setup dashboard demo untuk sandbox trial...", type: "document" }
          ];
        } else if (q.includes("recap last call") || q.includes("recap last")) {
          responseText = `Berikut adalah rangkuman dari call terakhir dengan **Ashley & Martin** (10:20 - 10:40 AM):

• **Keputusan Disetujui**: Desain mockup landing page versi dark mode resmi disetujui oleh Ashley.
• **Permintaan Revisi**: Mengubah warna aksen tombol CTA di Figma agar menggunakan warna ungu neon yang lebih menyala.
• **Timeline**: Penyerahan final aset diundur menjadi besok sore tanggal 1 Juli 2026.
• **Keuangan**: Berdasarkan CSV invoice, termin pertama (50%) senilai Rp12.500.000 telah terkonfirmasi lunas.`;
          responseSources = [
            { title: "WhatsApp: Group Aero Design Client (Baris 3)", preview: "Ashley: Desain landing page dark mode disetujui...", type: "whatsapp" },
            { title: "Gmail: Ashley & Martin Design Feedback", preview: "Revisi CTA color minta diganti ke violet...", type: "email" },
            { title: "CSV: Nexa_Invoices_June_2026.csv", preview: "Invoice #1028: Lunas Rp12.500.000", type: "document" }
          ];
        } else if (q.includes("terlambat") || q.includes("risiko") || q.includes("workload")) {
          responseText = `Berdasarkan deteksi memori dari Gmail dan WhatsApp Group, proyek **Coretify Dev** berisiko terlambat 1 minggu:

• **Penyebab**: Adanya permintaan revisi tambahan untuk scope login dari Julian (klien Nexa Corp) di grup chat WhatsApp.
• **Keputusan Sebelumnya**: Deadline milstone telah disepakati diundur ke 25 Juli 2026 (tercatat di Gmail).
• **Analisis Beban Kerja**: Beban kerja Alex Chen terdeteksi overload karena meng-handle migrasi database secara bersamaan.`;
          responseSources = [
            { title: "WhatsApp: Group Nexa Corp Dev (Baris 4)", preview: "Julian: Minta diselesaikan akhir bulan...", type: "whatsapp" },
            { title: "Gmail: Nexa Dev Scope Change", preview: "Decision: Deadline diundur ke 25 Juli...", type: "email" }
          ];
        } else if (q.includes("invoice") || q.includes("bayar") || q.includes("nexa") || q.includes("keuangan")) {
          responseText = `Berdasarkan analisis file **Nexa_Invoices_June_2026.csv** di Google Drive Anda:

• **Invoice Pending**: Terdapat 1 invoice pending atas nama **Nexa Corp** senilai **Rp45.000.000** (INV-2026-1029).
• **Invoice Lunas**: Invoice sebelumnya (INV-2026-1028) senilai **Rp35.000.000** sudah lunas.
• **Kontak WhatsApp**: Anda dapat menanyakan status ini langsung ke Julian di grup Nexa Corp Dev.`;
          responseSources = [
            { title: "CSV: Nexa_Invoices_June_2026.csv", preview: "INV-2026-1029 | Nexa Corp | Rp45.000.000 | Pending", type: "document" },
            { title: "WhatsApp: Group Nexa Corp Dev (Baris 2)", preview: "Julian: Pembayaran invoice kedua segera diproses...", type: "whatsapp" }
          ];
        } else {
          responseText = `Saya telah menganalisis memori bisnis Anda (WhatsApp, Gmail, Dokumen, dan Kalender) terkait *"${text}"*.\n\nSecara ringkas, topik ini dibahas oleh Alex Chen di grup WhatsApp dua hari yang lalu mengenai webhook integration, namun belum ada catatan keputusan tertulis yang diunggah ke dokumen resmi.`;
          responseSources = [
            { title: "WhatsApp: Alex Chen (Direct Chat)", preview: "Alex: Webhook integration siap besok pagi...", type: "whatsapp" }
          ];
        }
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
      <SidebarInset>
        <SiteHeader title="Ask Assistant" />

        {/* Spacious, widescreen layout wrapper matching /dashboard */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6 py-6 md:py-8 px-6 lg:px-8 max-w-5xl w-full mx-auto">
            
            {/* Header Greeting */}
            <div className="flex flex-col gap-1.5 mb-2">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                {getGreeting()}, {userName}
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tanyakan status proyek, berkas drive, spreadsheet keuangan, atau percakapan WhatsApp yang tersambung di memori Coretify.
              </p>
            </div>

            {/* Signature Coretify Cards - Scrollbar hidden to prevent Windows native scroll overlaps */}
            <div 
              className={`relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-5 transition-all duration-300 ${
                isFocused ? "border-foreground/20" : ""
              }`}
            >
              <textarea
                ref={textareaRef}
                rows={1}
                placeholder={askMode === "business" ? "Tanyakan status project, keputusan client, invoice, timeline..." : "Tanyakan pertanyaan umum di luar memori bisnis..."}
                className="w-full bg-transparent resize-none border-0 p-0 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 text-sm md:text-base leading-relaxed max-h-[180px] pb-12 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={credits <= 0 || isTyping}
              />
              
              {/* Bottom Actions Row */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                <Tabs value={askMode} onValueChange={setAskMode} className="w-fit pointer-events-auto">
                  <TabsList className="h-9 p-0.5 bg-zinc-950/80 border border-white/[0.02] rounded-lg">
                    <TabsTrigger value="business" className="text-xs h-8 px-3.5 flex items-center gap-1.5 data-[state=active]:bg-zinc-900">
                      <Database className="size-3.5 text-blue-400" />
                      Memory Search
                    </TabsTrigger>
                    <TabsTrigger value="anything" className="text-xs h-8 px-3.5 flex items-center gap-1.5 data-[state=active]:bg-zinc-900">
                      <HelpCircle className="size-3.5 text-purple-400" />
                      Ask Anything
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-4 pointer-events-auto">
                  <button className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none cursor-pointer">
                    <Info className="h-5 w-5" />
                  </button>
                  <Button
                    onClick={() => handleSend()}
                    disabled={!query.trim() || credits <= 0 || isTyping}
                    size="lg"
                    className="h-9 w-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center transition-all shadow-sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAskMode("business");
                  handleSend("Prep for next meeting");
                }}
                disabled={isTyping}
                className="flex items-center gap-2"
              >
                <Calendar className="size-4 text-blue-400" />
                Prep next meeting
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAskMode("business");
                  handleSend("Recap last call");
                }}
                disabled={isTyping}
                className="flex items-center gap-2"
              >
                <Mic className="size-4 text-pink-400" />
                Recap last call
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setAskMode("business");
                  handleSend("Cek invoice Nexa Corp yang belum terbayar");
                }}
                disabled={isTyping}
                className="flex items-center gap-2"
              >
                <FileText className="size-4 text-emerald-400" />
                Cek invoice pending
              </Button>
            </div>

            {/* Dynamic View Panel */}
            <div className="w-full mt-2">
              <AnimatePresence mode="wait">
                
                {/* 1. Loading Panel */}
                {isTyping && (
                  <motion.div
                    key="ai-loading"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="w-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] p-6 space-y-4"
                  >
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Sparkles className="h-4.5 w-4.5 text-blue-400 animate-spin" />
                      <span className="text-xs font-semibold">Coretify AI is thinking...</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-3 bg-muted rounded w-5/6 animate-pulse" />
                      <div className="h-3 bg-muted rounded w-full animate-pulse" />
                      <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
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
                    className="w-full relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] p-6 space-y-6"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-semibold text-zinc-300">AI Response ({askMode === "business" ? "Memory Search" : "General Search"})</span>
                      </div>
                      <button
                        onClick={() => setAiResponse(null)}
                        className="text-muted-foreground hover:text-foreground p-1.5 rounded-md hover:bg-muted transition-colors cursor-pointer"
                        title="Back to memories"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Query */}
                    <div className="bg-zinc-950/40 border border-white/[0.03] rounded-xl px-4 py-3 text-xs md:text-sm text-zinc-400">
                      <span className="text-zinc-550 font-medium mr-2">Query:</span>
                      "{aiResponse.query}"
                    </div>

                    {/* Typed Response */}
                    <div className="text-foreground text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
                      {typedText}
                      {typedText.length < aiResponse.text.length && (
                        <span className="inline-block w-1.5 h-4 ml-0.5 bg-blue-500 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Citations Block */}
                    {aiResponse.sources && aiResponse.sources.length > 0 && (
                      <div className="space-y-2 pt-4 border-t border-white/[0.04]">
                        <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                          <span className="inline-block h-1.5 w-1.5 bg-blue-500 rounded-full" />
                          Memory Citations ({aiResponse.sources.length})
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {aiResponse.sources.map((src, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                if (src.type === "calendar") setActiveTab("meetings");
                                else if (src.type === "whatsapp") setActiveTab("whatsapp");
                                else if (src.type === "document") setActiveTab("files");
                                setAiResponse(null);
                              }}
                              className="flex flex-col p-3.5 rounded-xl bg-zinc-950/30 border border-white/[0.04] text-xs space-y-1 hover:border-white/[0.1] transition-colors cursor-pointer group"
                            >
                              <span className="text-foreground font-medium truncate flex items-center gap-1.5">
                                {src.type === "whatsapp" && <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />}
                                {src.type === "calendar" && <Calendar className="h-3.5 w-3.5 text-blue-500" />}
                                {src.type === "email" && <Mic className="h-3.5 w-3.5 text-pink-500" />}
                                {src.type === "document" && <FileText className="h-3.5 w-3.5 text-zinc-400" />}
                                <span className="group-hover:underline">{src.title}</span>
                              </span>
                              <span className="text-muted-foreground text-[10px] truncate italic font-light">
                                "{src.preview}"
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Feedback */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-xs">
                      <span className="text-muted-foreground">Apakah jawaban ini akurat?</span>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => setFeedback("up")}
                          variant={feedback === "up" ? "secondary" : "outline"}
                          size="lg"
                          className="h-9 px-4 text-[11px] font-medium"
                        >
                          <ThumbsUp className="h-3.5 w-3.5 mr-1" /> Yes
                        </Button>
                        <Button
                          onClick={() => setFeedback("down")}
                          variant={feedback === "down" ? "secondary" : "outline"}
                          size="lg"
                          className="h-9 px-4 text-[11px] font-medium"
                        >
                          <ThumbsDown className="h-3.5 w-3.5 mr-1" /> No
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <Button
                        onClick={() => setAiResponse(null)}
                        variant="ghost"
                        size="lg"
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Memory Dashboard
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* 3. Company Memory Dashboard (Unified shadcn Tabs & Tables matching /dashboard page) */}
                {!isTyping && !aiResponse && (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-col justify-start gap-4">
                    
                    {/* Header bar and navigation controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold tracking-tight text-foreground">Company Memory</h2>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">LIVE SYNC</Badge>
                      </div>
                      
                      {activeTab === "meetings" && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                          <span>{formatDateDisplay(currentDate)}</span>
                          <div className="flex items-center gap-1 border rounded bg-zinc-950 p-0.5">
                            <button onClick={() => handleDateChange("prev")} className="p-1 hover:text-foreground hover:bg-muted rounded transition-all cursor-pointer">
                              <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleDateChange("next")} className="p-1 hover:text-foreground hover:bg-muted rounded transition-all cursor-pointer">
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Segmented Tabs List exactly like DataTable.tsx */}
                    <TabsList className="grid grid-cols-4 w-full md:w-[600px] bg-muted/40 h-10 p-1">
                      <TabsTrigger value="meetings" className="data-[state=active]:bg-background text-xs py-1.5 h-8">
                        <Calendar className="mr-1.5 size-3.5" />
                        Meetings
                      </TabsTrigger>
                      <TabsTrigger value="whatsapp" className="data-[state=active]:bg-background text-xs py-1.5 h-8">
                        <MessageSquare className="mr-1.5 size-3.5" />
                        WhatsApp
                      </TabsTrigger>
                      <TabsTrigger value="files" className="data-[state=active]:bg-background text-xs py-1.5 h-8">
                        <FileText className="mr-1.5 size-3.5" />
                        Files
                      </TabsTrigger>
                      <TabsTrigger value="decisions" className="data-[state=active]:bg-background text-xs py-1.5 h-8">
                        <CheckSquare className="mr-1.5 size-3.5" />
                        Decisions
                      </TabsTrigger>
                    </TabsList>

                    {/* TAB CONTENTS */}
                    
                    {/* 1. MEETINGS */}
                    <TabsContent value="meetings" className="w-full mt-2">
                      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                        <Table>
                          <TableHeader className="bg-muted/40">
                            <TableRow>
                              <TableHead className="w-[40px] px-4 py-3"></TableHead>
                              <TableHead className="px-4 py-3">Meeting Subject</TableHead>
                              <TableHead className="px-4 py-3">Time Range</TableHead>
                              <TableHead className="text-right px-4 py-3">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {isJune30 ? (
                              mockMeetings.map((meeting) => {
                                const isExpanded = expandedMeetingId === meeting.id;
                                return (
                                  <Fragment key={meeting.id}>
                                    <TableRow 
                                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                                      onClick={() => setExpandedMeetingId(isExpanded ? null : meeting.id)}
                                    >
                                      <TableCell className="w-[40px] px-4 py-3.5">
                                        <span className={`block w-2.5 h-2.5 rounded-full ${
                                          meeting.indicatorColor === "green"
                                            ? "bg-[#10b981]"
                                            : meeting.indicatorColor === "orange"
                                            ? "bg-[#f59e0b]"
                                            : "bg-[#71717a]"
                                        }`} />
                                      </TableCell>
                                      <TableCell className="font-semibold text-foreground px-4 py-3.5">{meeting.title}</TableCell>
                                      <TableCell className="text-muted-foreground px-4 py-3.5">{meeting.time}</TableCell>
                                      <TableCell className="text-right px-4 py-3.5">
                                        <Button variant="ghost" size="icon" className="size-8.5">
                                          <ChevronDown className={`h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                    {isExpanded && (
                                      <TableRow className="bg-muted/10 hover:bg-muted/10">
                                        <TableCell colSpan={4} className="p-5 border-t">
                                          <div className="space-y-4 text-xs md:text-sm">
                                            <div className="space-y-1">
                                              <p className="text-muted-foreground font-semibold text-[11px]">Details</p>
                                              <p className="text-foreground leading-relaxed font-light">{meeting.details}</p>
                                            </div>

                                            <div>
                                              <a href={meeting.meetUrl} target="_blank" rel="noreferrer" className="cursor-pointer inline-block">
                                                <Button variant="outline" size="lg" className="flex items-center gap-2 pointer-events-none">
                                                  <LinkIcon className="h-3.5 w-3.5" />
                                                  Join Google Meet
                                                  <ExternalLink className="h-3.5 w-3.5 ml-0.5 text-muted-foreground" />
                                                </Button>
                                              </a>
                                            </div>

                                            <div className="space-y-3 pt-2">
                                              <div className="flex items-center gap-2">
                                                <p className="text-muted-foreground font-semibold text-[11px]">Participants</p>
                                                <Badge variant="secondary" className="px-2 py-0.5 rounded text-[10px]">
                                                  {meeting.participantCount}
                                                </Badge>
                                              </div>

                                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                                {meeting.participants.map((participant, index) => (
                                                  <div key={index} className="flex items-center gap-3">
                                                    <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0 shadow-sm ${participant.avatarBg}`}>
                                                      {participant.avatarText}
                                                    </div>
                                                    <div className="flex flex-col">
                                                      <span className="text-foreground font-medium text-xs md:text-sm">{participant.name}</span>
                                                      <span className="text-muted-foreground text-[10px] md:text-xs font-light">{participant.role}</span>
                                                    </div>
                                                  </div>
                                                ))}
                                                {meeting.participantCount > meeting.participants.length && (
                                                  <div className="flex items-center gap-3 pt-1">
                                                    <div className="w-8.5 h-8.5 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-medium">
                                                      +{meeting.participantCount - meeting.participants.length}
                                                    </div>
                                                    <span className="text-muted-foreground text-xs italic font-light">
                                                      and {meeting.participantCount - meeting.participants.length} other participants
                                                    </span>
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    )}
                                  </Fragment>
                                );
                              })
                            ) : (
                              <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground px-4 py-3">
                                  No meetings scheduled for this day.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* 2. WHATSAPP CHATS */}
                    <TabsContent value="whatsapp" className="w-full mt-2">
                      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                        <Table>
                          <TableHeader className="bg-muted/40">
                            <TableRow>
                              <TableHead className="w-[40px] px-4 py-3"></TableHead>
                              <TableHead className="px-4 py-3">Chat Group / Channel</TableHead>
                              <TableHead className="px-4 py-3">Last Message</TableHead>
                              <TableHead className="px-4 py-3">Time</TableHead>
                              <TableHead className="text-right px-4 py-3">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockWhatsAppChats.map((chat) => {
                              const isExpanded = expandedChatId === chat.id;
                              return (
                                <Fragment key={chat.id}>
                                  <TableRow
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => setExpandedChatId(isExpanded ? null : chat.id)}
                                  >
                                    <TableCell className="w-[40px] px-4 py-3.5">
                                      <span className={`block w-2.5 h-2.5 rounded-full ${chat.unread ? "bg-emerald-500" : "bg-muted-foreground/35"}`} />
                                    </TableCell>
                                    <TableCell className="font-semibold text-foreground px-4 py-3.5">{chat.groupName}</TableCell>
                                    <TableCell className="text-muted-foreground truncate max-w-[200px] px-4 py-3.5">{chat.lastMessage}</TableCell>
                                    <TableCell className="text-muted-foreground px-4 py-3.5">{chat.time}</TableCell>
                                    <TableCell className="text-right px-4 py-3.5">
                                      <Button variant="ghost" size="icon" className="size-8.5">
                                        <ChevronDown className={`h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                  {isExpanded && (
                                    <TableRow className="bg-muted/10 hover:bg-muted/10">
                                      <TableCell colSpan={5} className="p-5 border-t">
                                        <div className="space-y-4 text-xs md:text-sm">
                                          <p className="text-muted-foreground font-semibold text-[11px] uppercase tracking-wider font-mono">Synced Message Thread (Latest)</p>
                                          
                                          {/* Message Log list has thin scroll bars as well */}
                                          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                            {chat.transcript.map((line, idx) => {
                                              const [sender, content] = line.split(": ");
                                              return (
                                                <div key={idx} className="flex flex-col gap-0.5 rounded-lg bg-zinc-950/40 p-3 border border-white/[0.02]">
                                                  <span className="text-[10px] font-semibold text-emerald-500">{sender}</span>
                                                  <span className="text-foreground text-xs md:text-sm font-light leading-relaxed">{content}</span>
                                                </div>
                                              );
                                            })}
                                          </div>

                                          <Button
                                            onClick={() => {
                                              setAskMode("business");
                                              handleSend(`Rangkum chat WhatsApp group ${chat.groupName}`);
                                            }}
                                            size="lg"
                                            className="flex items-center gap-2 cursor-pointer mt-2"
                                          >
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Rangkum dengan AI
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* 3. FILES & SHEETS */}
                    <TabsContent value="files" className="w-full mt-2">
                      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                        <Table>
                          <TableHeader className="bg-muted/40">
                            <TableRow>
                              <TableHead className="px-4 py-3">File Name</TableHead>
                              <TableHead className="px-4 py-3">Type</TableHead>
                              <TableHead className="px-4 py-3">File Size</TableHead>
                              <TableHead className="px-4 py-3">Last Synced</TableHead>
                              <TableHead className="text-right px-4 py-3">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockFiles.map((file) => {
                              const isExpanded = expandedFileId === file.id;
                              return (
                                <Fragment key={file.id}>
                                  <TableRow
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => setExpandedFileId(isExpanded ? null : file.id)}
                                  >
                                    <TableCell className="font-semibold text-foreground flex items-center gap-2 px-4 py-3.5">
                                      <FileText className={`h-4.5 w-4.5 ${file.type === "csv" ? "text-amber-500" : "text-muted-foreground"}`} />
                                      {file.name}
                                    </TableCell>
                                    <TableCell className="uppercase text-muted-foreground text-xs font-mono px-4 py-3.5">{file.type}</TableCell>
                                    <TableCell className="text-muted-foreground px-4 py-3.5">{file.size}</TableCell>
                                    <TableCell className="text-muted-foreground px-4 py-3.5">{file.syncedAt}</TableCell>
                                    <TableCell className="text-right px-4 py-3.5">
                                      <Button variant="ghost" size="icon" className="size-8.5">
                                        <ChevronDown className={`h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                  {isExpanded && (
                                    <TableRow className="bg-muted/10 hover:bg-muted/10">
                                      <TableCell colSpan={5} className="p-5 border-t">
                                        <div className="space-y-4 text-xs md:text-sm">
                                          <div className="space-y-1">
                                            <p className="text-muted-foreground font-semibold text-[11px]">AI File Summary</p>
                                            <p className="text-foreground leading-relaxed font-light">{file.summary}</p>
                                          </div>

                                          {/* Parsed spreadsheet rows */}
                                          {file.extractedData && file.extractedData.length > 0 && (
                                            <div className="space-y-2 mt-2">
                                              <p className="text-muted-foreground font-semibold text-[11px] uppercase tracking-wider font-mono">Parsed Data Rows ({file.extractedData.length})</p>
                                              <div className="border rounded-lg overflow-x-auto bg-zinc-950/40 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                                <table className="w-full text-xs text-left border-collapse">
                                                  <thead>
                                                    <tr className="border-b bg-muted/40">
                                                      {Object.keys(file.extractedData[0]).map((key) => (
                                                        <th key={key} className="p-2.5 text-muted-foreground font-medium">{key}</th>
                                                      ))}
                                                    </tr>
                                                  </thead>
                                                  <tbody className="divide-y">
                                                    {file.extractedData.map((row, idx) => (
                                                      <tr key={idx} className="hover:bg-white/[0.01]">
                                                        {Object.values(row).map((val, colIdx) => (
                                                          <td key={colIdx} className="p-2.5 text-foreground font-light">{val}</td>
                                                        ))}
                                                      </tr>
                                                    ))}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          )}

                                          <Button
                                            onClick={() => {
                                              setAskMode("business");
                                              handleSend(`Analisis file ${file.name} dan beri insight`);
                                            }}
                                            size="lg"
                                            className="flex items-center gap-2 cursor-pointer mt-2"
                                          >
                                            <Sparkles className="h-3.5 w-3.5" />
                                            Analisis File dengan AI
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* 4. DECISIONS */}
                    <TabsContent value="decisions" className="w-full mt-2">
                      <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                        <Table>
                          <TableHeader className="bg-muted/40">
                            <TableRow>
                              <TableHead className="px-4 py-3">Project</TableHead>
                              <TableHead className="px-4 py-3">Decision Context</TableHead>
                              <TableHead className="px-4 py-3">Date Logged</TableHead>
                              <TableHead className="text-right px-4 py-3">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {mockDecisions.map((dec) => {
                              const isExpanded = expandedDecisionId === dec.id;
                              return (
                                <Fragment key={dec.id}>
                                  <TableRow
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => setExpandedDecisionId(isExpanded ? null : dec.id)}
                                  >
                                    <TableCell className="w-[120px] px-4 py-3.5">
                                      <Badge variant="outline" className="px-2 py-0.5 text-muted-foreground text-xs">
                                        {dec.project}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-md px-4 py-3.5">{dec.decision}</TableCell>
                                    <TableCell className="text-muted-foreground px-4 py-3.5">{dec.date}</TableCell>
                                    <TableCell className="text-right px-4 py-3.5">
                                      <Button variant="ghost" size="icon" className="size-8.5">
                                        <ChevronDown className={`h-4.5 w-4.5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                  {isExpanded && (
                                    <TableRow className="bg-muted/10 hover:bg-muted/10">
                                      <TableCell colSpan={4} className="p-5 border-t">
                                        <div className="space-y-4 text-xs md:text-sm">
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                              <p className="text-muted-foreground font-semibold text-[11px]">Keputusan Penting</p>
                                              <p className="text-foreground leading-relaxed font-normal">{dec.decision}</p>
                                            </div>
                                            <div className="space-y-2.5">
                                              <div className="space-y-0.5">
                                                <p className="text-muted-foreground font-semibold text-[11px]">Decision Maker</p>
                                                <p className="text-foreground font-light">{dec.owner}</p>
                                              </div>
                                              <div className="space-y-0.5">
                                                <p className="text-muted-foreground font-semibold text-[11px]">Asal Referensi Memori</p>
                                                <p className="text-foreground font-light flex items-center gap-1.5">
                                                  {dec.sourceType === "whatsapp" && <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />}
                                                  {dec.sourceType === "email" && <Mic className="h-3.5 w-3.5 text-pink-500" />}
                                                  {dec.sourceType === "meeting" && <Calendar className="h-3.5 w-3.5 text-blue-500" />}
                                                  {dec.source}
                                                </p>
                                              </div>
                                            </div>
                                          </div>

                                          <Button
                                            onClick={() => {
                                              setAskMode("business");
                                              handleSend(`Tunjukkan detail rujukan untuk keputusan "${dec.decision}"`);
                                            }}
                                            size="lg"
                                            className="flex items-center gap-2 cursor-pointer mt-2"
                                          >
                                            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                                            Telusuri Sumber Memori
                                          </Button>
                                        </div>
                                      </TableCell>
                                    </TableRow>
                                  )}
                                </Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                  </Tabs>
                )}
              </AnimatePresence>
            </div>
            
            {/* Subtle Credit Info Badge */}
            <div className="mt-6 flex items-center justify-center select-none">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/[0.03] text-muted-foreground text-[11px] font-medium transition-all hover:text-foreground hover:border-white/[0.06] duration-200 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                <span>Assistant credits: {credits} remaining</span>
              </div>
            </div>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
