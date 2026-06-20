"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  MessageSquareCode,
  Network,
  MailCheck,
  ShieldAlert,
  Bot,
  User,
  Check,
  ThumbsUp,
  ThumbsDown,
  Lock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  FolderLock,
  Trash2,
  LockKeyhole,
  ExternalLink,
  Building2,
  Calendar,
  Send,
  Sparkles,
  Zap
} from "lucide-react";

// Types
type Role = "owner" | "manager" | "member";
type Playbook = "Software House" | "Agency" | "Startup";
type Tab = "snapshot" | "ask" | "graph" | "brief" | "settings";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  citations?: { source: string; type: string; date: string; linkText: string; sensitivity: string }[];
  isRestricted?: boolean;
}

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("snapshot");
  
  // Simulator States
  const [userRole, setUserRole] = useState<Role>("owner");
  const [activePlaybook, setActivePlaybook] = useState<Playbook>("Software House");
  const [companyName, setCompanyName] = useState("Stravio Labs");
  const [googleConnected, setGoogleConnected] = useState(true);
  
  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat States
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Memory Graph active node details
  const [activeGraphNode, setActiveGraphNode] = useState<{
    id: string;
    label: string;
    type: string;
    details: string;
    date: string;
    sensitivity: string;
  } | null>({
    id: "client",
    label: "Nexa Corp (Client)",
    type: "Client",
    details: "Ditemukan dari 12 email korespondensi terkait revision request & kickoff agreement.",
    date: "12 June 2026",
    sensitivity: "General",
  });

  // Settings folder list
  const [folders, setFolders] = useState([
    { name: "/Projects", selected: true, sensitive: false },
    { name: "/Clients", selected: true, sensitive: false },
    { name: "/HR-Payroll", selected: false, sensitive: true },
    { name: "/Finance-Invoices", selected: false, sensitive: true },
    { name: "/Marketing", selected: true, sensitive: false },
  ]);

  // Load configuration from localStorage
  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.name) setCompanyName(parsed.name);
      if (parsed.businessType) {
        // Map to valid playbooks
        if (parsed.businessType === "Agency" || parsed.businessType === "Software House" || parsed.businessType === "Startup") {
          setActivePlaybook(parsed.businessType as Playbook);
        } else {
          setActivePlaybook("Software House");
        }
      }
      if (parsed.googleConnected !== undefined) {
        setGoogleConnected(parsed.googleConnected);
      }
    }
    
    // Add default initial welcome chat message
    setChatMessages([
      {
        id: "init",
        sender: "bot",
        text: `Halo! Saya adalah Company Memory AI. Saya telah meresapkan data historis dari Gmail, Calendar, dan Google Sheets Anda.\n\nSilakan ajukan pertanyaan seputar operasional bisnis Anda, seperti:\n• *"Apa project yang berisiko terlambat?"*\n• *"Client mana yang butuh follow-up?"*\n• *"Berapa burn rate keuangan bulan ini?"*`,
        citations: []
      }
    ]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isAiTyping]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFeedback = (insightId: string, type: "accuracy" | "usefulness", rating: "up" | "down") => {
    showToast(`Feedback tersimpan: Marked ${type} as ${rating === "up" ? "👍 Benar" : "👎 Tidak Benar"}.`);
  };

  // Chat Query Engine (Simulated RAG with RLS Filtering)
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsAiTyping(true);

    setTimeout(() => {
      let responseText = "";
      let citations: ChatMessage["citations"] = [];
      let isRestricted = false;

      const normText = text.toLowerCase();

      // Query 1: What is the biggest issue? (Apa masalah terbesar?)
      if (normText.includes("masalah terbesar") || normText.includes("biggest issue")) {
        if (userRole === "owner") {
          responseText = `Berdasarkan Company Memory, masalah terbesar saat ini adalah penurunan revenue bulan ini sebesar 12% akibat terhambatnya *Project Nexa Corp*, ditambah dengan burn rate operasional bulanan yang menyentuh Rp45.2jt.\n\nPlaybook ${activePlaybook} mengindikasikan 63% keterlambatan projek dipicu oleh revisi berulang dari klien Nexa Corp.`;
          citations = [
            { source: "Google Sheets / Cashflow Tracker", type: "Spreadsheet", date: "10 June 2026", linkText: "Buka Spreadsheet", sensitivity: "Restricted" },
            { source: "Email Budi (Subject: Nexa Revision Request)", type: "Email", date: "12 June 2026", linkText: "Buka Email", sensitivity: "General" }
          ];
        } else {
          // Manager or Member: Restricted details filtered out
          responseText = `Berdasarkan Company Memory, masalah terbesar operasional saat ini adalah *Project Nexa Corp* yang berisiko terlambat selama 5 hari akibat adanya 4 kali revisi desain dan flow yang diajukan berulang oleh pihak klien.`;
          citations = [
            { source: "Email Budi (Subject: Nexa Revision Request)", type: "Email", date: "12 June 2026", linkText: "Buka Email", sensitivity: "General" },
            { source: "WhatsApp Group Nexa Corp Chat Export", type: "Chat", date: "11 June 2026", linkText: "Buka Chat", sensitivity: "General" }
          ];
        }
      } 
      // Query 2: Why Nexa Corp late? (Kenapa Nexa Corp telat?)
      else if (normText.includes("nexa") || normText.includes("telat") || normText.includes("late")) {
        responseText = `Project Nexa Corp terlambat dikarenakan terdapat 4 permintaan revisi desain (scope change) setelah fase development resmi berjalan. Klien meminta perubahan alur autentikasi dan integrasi API pembayaran.\n\nDetail revisi didiskusikan oleh Budi Santoso dan perwakilan Nexa Corp pada chat WhatsApp tanggal 12 Juni.`;
        citations = [
          { source: "WhatsApp Group Nexa Corp Chat Export", type: "Chat", date: "12 June 2026", linkText: "Buka Chat", sensitivity: "General" },
          { source: "Email Client Agreement Nexa", type: "Email", date: "10 May 2026", linkText: "Buka Email", sensitivity: "General" }
        ];
      } 
      // Query 3: Burn rate (Berapa burn rate?)
      else if (normText.includes("burn rate") || normText.includes("keuangan") || normText.includes("financial") || normText.includes("gaji") || normText.includes("salary")) {
        if (userRole === "owner") {
          responseText = `Burn rate operasional ${companyName} bulan ini adalah Rp45,200,000. Pengeluaran utama meliputi:\n• Server scaling & database: Rp15,400,000\n• Pembayaran kontraktor & tim dev: Rp29,800,000\n\nTrend cashflow menunjukkan kecukupan runway hingga 8 bulan ke depan jika performa closing sales stabil.`;
          citations = [
            { source: "Google Sheets / Cashflow Tracker", type: "Spreadsheet", date: "10 June 2026", linkText: "Buka Spreadsheet", sensitivity: "Restricted" },
            { source: "Invoices & Payroll June 2026.xlsx", type: "Spreadsheet", date: "05 June 2026", linkText: "Buka Invoice", sensitivity: "Restricted" }
          ];
        } else {
          // Denied access for Manager/Member
          responseText = `Akses Ditolak: Pertanyaan ini melibatkan data keuangan sensitif. Dokumen asal terklasifikasi sebagai 'RESTRICTED' (Finance/Payroll) dan disembunyikan oleh Row-Level Security (RLS) di database Supabase.\n\nRole Anda (${userRole.toUpperCase()}) tidak memiliki izin membaca data restricted.`;
          citations = [
            { source: "RLS Enforcement Policy (memory_chunks.visible_to_roles)", type: "System Policy", date: "Database Level", linkText: "Buka Aturan RLS", sensitivity: "Restricted" }
          ];
          isRestricted = true;
        }
      } 
      // Fallback response
      else {
        responseText = `Saya memahami pertanyaan Anda tentang "${text}". Sebagai Company Memory, saya mendeteksi 14 email dan 3 dokumen Drive yang membicarakan konteks tersebut.\n\nTidak ditemukan anomali risiko penting. Semua project terkait berjalan sesuai timeline.`;
        citations = [
          { source: "Gmail Archive Index", type: "Email", date: "14 June 2026", linkText: "Buka Indeks", sensitivity: "General" }
        ];
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: responseText,
          citations,
          isRestricted
        },
      ]);
      setIsAiTyping(false);
    }, 1500);
  };

  // Trigger preset questions
  const clickPresetQuestion = (q: string) => {
    handleSendMessage(q);
  };

  // Delete Workspace / Memory Reset
  const handleDeleteMemory = () => {
    const confirmDelete = window.confirm("PERINGATAN: Tindakan ini akan menghapus seluruh data Company Memory, embedding vector, entitas, dan riwayat sinkronisasi secara permanen. Apakah Anda yakin?");
    if (confirmDelete) {
      localStorage.removeItem("coretify_company");
      localStorage.removeItem("isLoggedIn");
      showToast("Company Memory berhasil dihapus secara permanen. Mereset aplikasi...");
      setTimeout(() => {
        router.push("/onboarding");
      }, 1500);
    }
  };

  // Memory Graph Nodes Info handler
  const handleGraphNodeClick = (node: typeof activeGraphNode) => {
    setActiveGraphNode(node);
  };

  return (
    <div className="flex min-h-screen bg-[#070708] text-slate-100 font-sans relative overflow-hidden antialiased">
      {/* High-performance static CSS radial glows */}
      <div aria-hidden className="pointer-events-none absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-[20%] -right-[10%] w-[50%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(200,200,220,0.015)_0%,transparent_70%)] blur-[100px]" />

      {/* Floating simulator alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c0c0e]/90 border border-white/[0.06] backdrop-blur-md text-slate-100 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="h-4.5 w-4.5 text-zinc-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/[0.04] bg-[#08080a]/60 backdrop-blur-xl flex flex-col justify-between p-5 shrink-0 z-30">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2">
            <img src="/coretify.png" alt="Coretify Logo" className="h-7 w-auto object-contain" />
            <div>
              <span className="font-semibold text-[16px] tracking-tight text-white block">
                Coretify
              </span>
              <span className="text-[9px] text-zinc-650 font-mono block tracking-wider">v1.0 (MVP)</span>
            </div>
          </div>

          {/* Sync Status Badge */}
          <div className="p-3 bg-zinc-950/40 border border-white/[0.04] rounded-xl flex items-center gap-2.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)] animate-pulse" />
            <div className="text-[10px]">
              <span className="font-semibold block text-zinc-300">Memory Synced</span>
              <span className="text-zinc-600 font-mono text-[9px] mt-0.5 block">Last sync: 3 mins ago</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: "snapshot", label: "Company Snapshot", icon: LayoutDashboard },
              { id: "ask", label: "Ask Business (RAG)", icon: MessageSquareCode },
              { id: "graph", label: "Memory Graph View", icon: Network },
              { id: "brief", label: "Daily Brief Digest", icon: MailCheck },
              { id: "settings", label: "Security & Privacy", icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                    active
                      ? "bg-white/[0.03] border border-white/[0.05] text-white"
                      : "border border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.01]"
                  }`}
                >
                  {active && (
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  )}
                  <Icon className={`h-4 w-4 ${active ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Workspace Info */}
        <div className="space-y-4">
          <div className="p-3 bg-zinc-950/40 border border-white/[0.04] rounded-xl text-center space-y-1">
            <div className="text-[9px] text-zinc-600 uppercase tracking-widest font-mono font-bold">Workspace</div>
            <div className="text-xs font-bold text-white truncate">{companyName}</div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="border-b border-white/[0.04] h-20 px-8 flex items-center justify-between bg-[#070708]/60 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xs font-bold font-mono uppercase tracking-widest text-white leading-none">
              {activeTab === "snapshot" && "Company Snapshot"}
              {activeTab === "ask" && "Ask Business AI"}
              {activeTab === "graph" && "Knowledge Graph"}
              {activeTab === "brief" && "Daily Brief Digest"}
              {activeTab === "settings" && "Security & Settings"}
            </h2>
            <Badge variant="outline" className="text-[9px] px-2 py-0.5 border-zinc-800 text-zinc-400 bg-zinc-950/60 font-medium">
              {activePlaybook} Playbook
            </Badge>
          </div>

          {/* SIMULATOR CONTROL CONSOLE */}
          <div className="flex items-center gap-3.5 bg-zinc-950/40 border border-white/[0.04] rounded-xl px-3 py-1.5 shadow-md">
            <div className="flex items-center gap-2 border-r border-white/[0.04] pr-3.5">
              <span className="text-[9px] text-zinc-500 font-bold font-mono tracking-wider uppercase flex items-center gap-1"><Zap className="h-3 w-3" /> TEST ROLE:</span>
              <div className="flex gap-1">
                {(["owner", "manager", "member"] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setUserRole(r);
                      showToast(`Role ditukar ke ${r.toUpperCase()}. RLS Policy & Insights terupdate.`);
                    }}
                    className={`text-[9px] px-2.5 py-1 rounded-lg font-semibold uppercase transition-all ${
                      userRole === r
                        ? "bg-white text-black font-bold shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                        : "bg-transparent border border-white/[0.03] text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-zinc-550 font-bold font-mono tracking-wider">PLAYBOOK:</span>
              <select
                value={activePlaybook}
                onChange={(e) => {
                  setActivePlaybook(e.target.value as Playbook);
                  showToast(`Playbook diganti ke ${e.target.value}. Widget insight disesuaikan.`);
                }}
                className="bg-transparent border border-white/[0.04] text-[10px] rounded-lg px-2.5 py-1 font-semibold text-zinc-300 focus:outline-none hover:border-zinc-800 cursor-pointer"
              >
                <option value="Software House" className="bg-[#0c0c0e]">Software House</option>
                <option value="Agency" className="bg-[#0c0c0e]">Creative Agency</option>
                <option value="Startup" className="bg-[#0c0c0e]">Startup Playbook</option>
              </select>
            </div>
          </div>
        </header>

        {/* Tab Contents Frame */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#070708]">
          {/* TAB 1: COMPANY SNAPSHOT */}
          {activeTab === "snapshot" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Summary welcome widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md p-5 flex flex-col justify-between rounded-2xl shadow-md">
                  <span className="text-[9px] text-zinc-500 font-bold font-mono tracking-widest uppercase">Memory Ingestion</span>
                  <span className="text-xl font-extrabold text-white mt-2">128 Chunks</span>
                  <span className="text-[9px] text-emerald-400 mt-3 flex items-center gap-1 font-mono"><Check className="h-3 w-3" /> Gmail, Calendar, Drive synced</span>
                </Card>
                <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md p-5 flex flex-col justify-between rounded-2xl shadow-md">
                  <span className="text-[9px] text-zinc-500 font-bold font-mono tracking-widest uppercase">Clients Mapped</span>
                  <span className="text-xl font-extrabold text-white mt-2">12 Perusahaan</span>
                  <span className="text-[9px] text-zinc-500 mt-3 font-mono">Ditemukan dari metadata email</span>
                </Card>
                <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md p-5 flex flex-col justify-between rounded-2xl shadow-md">
                  <span className="text-[9px] text-zinc-500 font-bold font-mono tracking-widest uppercase">Active Projects</span>
                  <span className="text-xl font-extrabold text-white mt-2">3 Projects</span>
                  <span className="text-[9px] text-amber-400 mt-3 font-mono">1 Project berisiko terlambat</span>
                </Card>
                <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md p-5 flex flex-col justify-between rounded-2xl shadow-md">
                  <span className="text-[9px] text-zinc-500 font-bold font-mono tracking-widest uppercase">Decisions Extracted</span>
                  <span className="text-xl font-extrabold text-white mt-2">9 Kesepakatan</span>
                  <span className="text-[9px] text-zinc-500 mt-3 font-mono">Parsed from WhatsApp & Docs</span>
                </Card>
              </div>

              {/* Playbook Specific Warnings and Wow Insights */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                  <h3 className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-zinc-400 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-zinc-550" />
                    Proactive Insights ({activePlaybook} Playbook)
                  </h3>
                  <Badge variant="outline" className="text-[9px] text-zinc-400 bg-zinc-950/60 border-zinc-800/80 font-mono">
                    Confidence Score &gt; 90%
                  </Badge>
                </div>

                {/* Software House Playbook Insights */}
                {activePlaybook === "Software House" && (
                  <div className="space-y-4">
                    {/* Insight 1: Scope revisions */}
                    <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl">
                      <div className="p-5 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-center text-zinc-350 shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">63% keterlambatan project dipicu revisi client setelah development dimulai</h4>
                            <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-amber-900/40 bg-amber-950/10 text-amber-400 font-medium">Risiko Tinggi</Badge>
                          </div>
                          <p className="text-zinc-400 text-[11px] leading-relaxed">
                            Menganalisis 4 scope change request pada email Nexa Corp. Pola pengerjaan meleset 5 hari dari kickoff awal akibat revisi autentikasi API.
                          </p>
                          <div className="flex items-center gap-3 mt-3.5 border-t border-white/[0.03] pt-3">
                            <span className="text-[9px] text-zinc-500 font-medium font-mono uppercase tracking-wider">Apakah insight ini akurat?</span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleFeedback("sh-1", "accuracy", "up")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsUp className="h-3 w-3 text-zinc-500" /> Benar</button>
                              <button onClick={() => handleFeedback("sh-1", "accuracy", "down")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsDown className="h-3 w-3 text-zinc-500" /> Salah</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Insight 2: Resource overload */}
                    <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl">
                      <div className="p-5 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-center text-zinc-350 shrink-0">
                          <TrendingUp className="h-5 w-5 text-zinc-400" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <h4 className="text-xs font-bold text-white">Budi Santoso (Lead Dev) dialokasikan pada 5 project paralel</h4>
                          <p className="text-zinc-400 text-[11px] leading-relaxed">
                            Komunikasi email & calendar menunjukkan Budi terlibat di Nexa Web App, Client Internal, Coretify Dev, Admin Panel, dan Bug-Fixing. Risiko overload & burnout tergolong sedang-tinggi.
                          </p>
                          <div className="flex items-center gap-3 mt-3.5 border-t border-white/[0.03] pt-3">
                            <span className="text-[9px] text-zinc-500 font-medium font-mono uppercase tracking-wider">Apakah insight ini berguna?</span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleFeedback("sh-2", "usefulness", "up")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsUp className="h-3 w-3 text-zinc-500" /> Berguna</button>
                              <button onClick={() => handleFeedback("sh-2", "usefulness", "down")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsDown className="h-3 w-3 text-zinc-500" /> Tidak Berguna</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Restricted (Financial) Insight - Enforced by Role */}
                    {userRole === "owner" ? (
                      <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl">
                        <div className="p-5 flex items-start gap-4">
                          <div className="h-9 w-9 rounded-xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-center text-zinc-350 shrink-0">
                            <Lock className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">Project Nexa Corp menyumbang 42% revenue namun memakan 70% tim operasional</h4>
                              <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-emerald-400 border-emerald-900/40 bg-emerald-950/10 font-medium">Owner-Only Finance</Badge>
                            </div>
                            <p className="text-zinc-400 text-[11px] leading-relaxed">
                              Disinkronisasi dengan log invoice spreadsheet. Profit margin bersih project ini berisiko turun ke 12% karena durasi kerja freelance melebihi budget.
                            </p>
                            <div className="flex items-center gap-3 mt-3.5 border-t border-white/[0.03] pt-3">
                              <span className="text-[9px] text-zinc-500 font-medium font-mono uppercase tracking-wider">Apakah insight ini akurat?</span>
                              <div className="flex gap-1.5">
                                <button onClick={() => handleFeedback("sh-3", "accuracy", "up")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsUp className="h-3 w-3 text-zinc-500" /> Benar</button>
                                <button onClick={() => handleFeedback("sh-3", "accuracy", "down")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsDown className="h-3 w-3 text-zinc-500" /> Salah</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <div className="p-3.5 bg-zinc-950/40 border border-dashed border-white/[0.04] rounded-xl text-center text-[10px] text-zinc-500 flex items-center justify-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        <span>1 insight finansial disembunyikan oleh RLS Policy untuk role {userRole.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Agency Playbook Insights */}
                {activePlaybook === "Agency" && (
                  <div className="space-y-4">
                    <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl">
                      <div className="p-5 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-center text-zinc-355 shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">Penurunan intensitas komunikasi Klien Vista Retail sebesar 45%</h4>
                            <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-amber-900/40 bg-amber-950/10 text-amber-400 font-medium">Risiko Churn</Badge>
                          </div>
                          <p className="text-zinc-400 text-[11px] leading-relaxed">
                            Log Gmail mendeteksi tidak ada pertukaran email atau approval dalam 14 hari terakhir (biasanya 3 hari sekali). Potensi risiko churn klien terdeteksi.
                          </p>
                          <div className="flex items-center gap-3 mt-3.5 border-t border-white/[0.03] pt-3">
                            <span className="text-[9px] text-zinc-500 font-medium font-mono uppercase tracking-wider">Apakah insight ini akurat?</span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleFeedback("ag-1", "accuracy", "up")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsUp className="h-3 w-3 text-zinc-500" /> Benar</button>
                              <button onClick={() => handleFeedback("ag-1", "accuracy", "down")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsDown className="h-3 w-3 text-zinc-500" /> Salah</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {userRole === "owner" ? (
                      <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl">
                        <div className="p-5 flex items-start gap-4">
                          <div className="h-9 w-9 rounded-xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-center text-zinc-355 shrink-0">
                            <Lock className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">Klien Aero Design mengonsumsi 34% kapasitas tim untuk kontribusi 12% revenue</h4>
                              <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-emerald-400 border-emerald-900/40 bg-emerald-950/10 font-medium">Owner-Only Finance</Badge>
                            </div>
                            <p className="text-zinc-400 text-[11px] leading-relaxed">
                              Frekuensi revisi desain aset media sosial melebihi batas perjanjian kontrak layanan bulanan (retainer).
                            </p>
                            <div className="flex items-center gap-3 mt-3.5 border-t border-white/[0.03] pt-3">
                              <span className="text-[9px] text-zinc-500 font-medium font-mono uppercase tracking-wider">Apakah insight ini akurat?</span>
                              <div className="flex gap-1.5">
                                <button onClick={() => handleFeedback("ag-2", "accuracy", "up")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsUp className="h-3 w-3 text-zinc-500" /> Benar</button>
                                <button onClick={() => handleFeedback("ag-2", "accuracy", "down")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsDown className="h-3 w-3 text-zinc-500" /> Salah</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <div className="p-3.5 bg-zinc-950/40 border border-dashed border-white/[0.04] rounded-xl text-center text-[10px] text-zinc-500 flex items-center justify-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        <span>1 insight profitabilitas disembunyikan oleh RLS Policy untuk role {userRole.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Startup Playbook Insights */}
                {activePlaybook === "Startup" && (
                  <div className="space-y-4">
                    <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl">
                      <div className="p-5 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-center text-zinc-355 shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">78% meeting internal minggu lalu tidak menghasilkan Action Items / Task jelas</h4>
                            <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-amber-900/40 bg-amber-950/10 text-amber-400 font-medium">Risiko Efisiensi</Badge>
                          </div>
                          <p className="text-zinc-400 text-[11px] leading-relaxed">
                            Menganalisis transkrip diskusi/file catatan yang diunggah dan sinkronisasi Google Calendar. Pertemuan tim product sinkronisasi harian berpotensi kurang terarah.
                          </p>
                          <div className="flex items-center gap-3 mt-3.5 border-t border-white/[0.03] pt-3">
                            <span className="text-[9px] text-zinc-500 font-medium font-mono uppercase tracking-wider">Apakah insight ini akurat?</span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleFeedback("st-1", "accuracy", "up")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsUp className="h-3 w-3 text-zinc-500" /> Benar</button>
                              <button onClick={() => handleFeedback("st-1", "accuracy", "down")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsDown className="h-3 w-3 text-zinc-500" /> Salah</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {userRole === "owner" ? (
                      <Card className="bg-zinc-950/40 border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl">
                        <div className="p-5 flex items-start gap-4">
                          <div className="h-9 w-9 rounded-xl bg-zinc-900/60 border border-white/[0.04] flex items-center justify-center text-zinc-355 shrink-0">
                            <Lock className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">Runway keuangan startup tersisa 6.5 bulan berdasarkan data cashflow excel</h4>
                              <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-emerald-400 border-emerald-900/40 bg-emerald-950/10 font-medium">Owner-Only Finance</Badge>
                            </div>
                            <p className="text-zinc-400 text-[11px] leading-relaxed">
                              Berdasarkan pengeluaran cloud server scaling dan gaji developer per Juni 2026. Direkomendasikan melakukan review langganan saas tak terpakai.
                            </p>
                            <div className="flex items-center gap-3 mt-3.5 border-t border-white/[0.03] pt-3">
                              <span className="text-[9px] text-zinc-500 font-medium font-mono uppercase tracking-wider">Apakah insight ini akurat?</span>
                              <div className="flex gap-1.5">
                                <button onClick={() => handleFeedback("st-2", "accuracy", "up")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsUp className="h-3 w-3 text-zinc-500" /> Benar</button>
                                <button onClick={() => handleFeedback("st-2", "accuracy", "down")} className="text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-900 px-2.5 py-1 rounded-lg border border-white/[0.04] flex items-center gap-1 transition-all"><ThumbsDown className="h-3 w-3 text-zinc-500" /> Salah</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <div className="p-3.5 bg-zinc-950/40 border border-dashed border-white/[0.04] rounded-xl text-center text-[10px] text-zinc-500 flex items-center justify-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        <span>1 insight sensitif landasan burn rate disembunyikan oleh RLS Policy untuk role {userRole.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ASK BUSINESS (RAG CHAT) */}
          {activeTab === "ask" && (
            <div className="h-[calc(100vh-14rem)] flex flex-col justify-between animate-in fade-in duration-300">              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 border border-white/[0.04] rounded-2xl bg-zinc-950/20 p-4 min-h-[300px]">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="h-8.5 w-8.5 rounded-lg bg-zinc-950 border border-white/[0.04] flex items-center justify-center text-zinc-400 shrink-0">
                        <Bot className="h-4.5 w-4.5" />
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5 max-w-[80%]">
                      <div
                        className={`rounded-2xl px-4 py-3 text-xs leading-relaxed border ${
                          msg.sender === "user"
                            ? "bg-white text-black font-medium border-transparent shadow-[0_4px_20px_rgba(255,255,255,0.06)] rounded-tr-none"
                            : msg.isRestricted
                            ? "bg-red-950/25 border-red-900/35 text-red-300 rounded-tl-none"
                            : "bg-zinc-950/60 border border-white/[0.04] backdrop-blur-md text-zinc-300 rounded-tl-none"
                        }`}
                      >
                        {msg.isRestricted && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-red-400 mb-1 font-mono tracking-wider">
                            <LockKeyhole className="h-3.5 w-3.5" /> ACCESS DENIED (RLS CONTROL)
                          </div>
                        )}
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>

                      {/* Citations block */}
                      {msg.sender === "bot" && msg.citations && msg.citations.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="text-[9px] text-zinc-550 self-center font-mono">REFERENSI:</span>
                          {msg.citations.map((cite, idx) => (
                            <div
                              key={idx}
                              onClick={() => showToast(`Membuka berkas referensi: ${cite.source}`)}
                              className={`text-[9px] font-semibold px-2 py-0.5 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                                cite.sensitivity === "Restricted"
                                  ? "bg-emerald-500/5 border-emerald-500/15 text-emerald-400 hover:bg-emerald-550/10"
                                  : "bg-zinc-900/40 border-white/[0.04] text-zinc-400 hover:border-white/[0.08] hover:text-white"
                              }`}
                            >
                              <span>{cite.source}</span>
                              <ExternalLink className="h-2 w-2" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {msg.sender === "user" && (
                      <div className="h-8.5 w-8.5 rounded-lg bg-white flex items-center justify-center text-black shrink-0 shadow-md">
                        <User className="h-4.5 w-4.5" />
                      </div>
                    )}
                  </div>
                ))}

                {isAiTyping && (
                  <div className="flex gap-3.5">
                    <div className="h-8.5 w-8.5 rounded-lg bg-zinc-950 border border-white/[0.04] flex items-center justify-center text-zinc-400 shrink-0">
                      <Bot className="h-4.5 w-4.5 animate-pulse" />
                    </div>
                    <div className="bg-zinc-950/60 border border-white/[0.04] backdrop-blur-md rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Preset buttons */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-[9px] text-zinc-500 font-bold font-mono tracking-wider uppercase">Pertanyaan Populer:</span>
                  <button
                    onClick={() => clickPresetQuestion("Apa masalah terbesar perusahaan saat ini?")}
                    className="text-[10px] bg-transparent hover:bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] px-3.5 py-1.5 rounded-full text-zinc-300 transition-all font-medium"
                  >
                    🔍 Apa masalah terbesar perusahaan?
                  </button>
                  <button
                    onClick={() => clickPresetQuestion("Kenapa Project Nexa Corp telat?")}
                    className="text-[10px] bg-transparent hover:bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] px-3.5 py-1.5 rounded-full text-zinc-300 transition-all font-medium"
                  >
                    🕒 Kenapa Project Nexa Corp telat?
                  </button>
                  <button
                    onClick={() => clickPresetQuestion("Berapa burn rate keuangan bulan ini?")}
                    className="text-[10px] bg-transparent hover:bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] px-3.5 py-1.5 rounded-full text-zinc-300 flex items-center gap-1.5 transition-all font-medium"
                  >
                    <Lock className="h-3 w-3 text-emerald-500" />
                    💰 Berapa burn rate bulan ini?
                  </button>
                </div>

                {/* Input form */}
                <div className="relative flex items-center bg-zinc-950/50 border border-white/[0.04] rounded-xl focus-within:border-white/[0.08] transition-all p-1.5">
                  <input
                    type="text"
                    placeholder="Tanyakan memori bisnis Anda disini (misal: 'siapa client yang belum dibalas?')..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    className="flex-1 bg-transparent px-3 py-2 text-xs border-0 focus:outline-none focus:ring-0 text-white placeholder-zinc-650"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim()}
                    className="bg-white hover:bg-zinc-200 text-black shrink-0 rounded-lg px-4.5 py-2 font-semibold transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KNOWLEDGE GRAPH */}
          {activeTab === "graph" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* SVG Graph Canvas */}
                <Card className="flex-1 bg-zinc-950/60 border border-white/[0.04] backdrop-blur-md p-4 relative min-h-[400px] flex items-center justify-center overflow-hidden rounded-2xl shadow-xl">
                  
                  {/* Interactive SVG Nodes */}
                  <svg className="w-full h-[360px] z-10 select-none">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#27272a" />
                      </marker>
                      <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                      <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                      <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                      <linearGradient id="amberGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="100%" stopColor="#d97706" />
                      </linearGradient>
                      <linearGradient id="roseGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#be123c" />
                      </linearGradient>
                    </defs>

                    {/* Edge Lines */}
                    <line x1="80" y1="180" x2="200" y2="100" stroke="#27272a" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrow)" />
                    <line x1="80" y1="180" x2="200" y2="260" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1="200" y1="260" x2="350" y2="260" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1="200" y1="100" x2="350" y2="100" stroke="#27272a" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1="350" y1="260" x2="200" y2="100" stroke="#1f1f23" strokeWidth="1" strokeDasharray="3" />

                    {/* Nodes Render */}
                    {/* 1. Client Node */}
                    <g
                      className="cursor-pointer group"
                      onClick={() => handleGraphNodeClick({
                        id: "client",
                        label: "Nexa Corp (Client)",
                        type: "Client Entity",
                        details: "Di-ekstrak dari 12 utas email di Gmail. Client aktif dengan nilai retainer terhitung sedang.",
                        date: "12 June 2026",
                        sensitivity: "General",
                      })}
                    >
                      <circle cx="80" cy="180" r="32" fill="url(#nodeGlow)" className="group-hover:opacity-100 opacity-60 transition-opacity" />
                      <circle cx="80" cy="180" r="24" fill="#09090b" stroke="url(#blueGlow)" strokeWidth="2" className="group-hover:stroke-cyan-300 transition-colors" />
                      <Building2 className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" x="70" y="170" />
                      <text x="80" y="222" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontWeight="bold" className="font-mono uppercase tracking-wider">Nexa Corp</text>
                    </g>

                    {/* 2. Project Node */}
                    <g
                      className="cursor-pointer group"
                      onClick={() => handleGraphNodeClick({
                        id: "project",
                        label: "Web App Dev (Project)",
                        type: "Project Entity",
                        details: "Project aktif terpantau mengalami keterlambatan 5 hari. Disebut 32 kali pada file Drive & email.",
                        date: "14 June 2026",
                        sensitivity: "General",
                      })}
                    >
                      <circle cx="200" cy="100" r="32" fill="url(#nodeGlow)" className="group-hover:opacity-100 opacity-60 transition-opacity" />
                      <circle cx="200" cy="100" r="24" fill="#09090b" stroke="url(#purpleGlow)" strokeWidth="2" className="group-hover:stroke-purple-300 transition-colors" />
                      <Bot className="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors" x="190" y="90" />
                      <text x="200" y="142" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontWeight="bold" className="font-mono uppercase tracking-wider">Nexa Web App</text>
                    </g>

                    {/* 3. Meeting Node */}
                    <g
                      className="cursor-pointer group"
                      onClick={() => handleGraphNodeClick({
                        id: "meeting",
                        label: "Kickoff Sync (Meeting)",
                        type: "Calendar Event",
                        details: "Diskusi awal lingkup kerja terdata di Calendar. Dihadiri 4 partisipan.",
                        date: "10 May 2026",
                        sensitivity: "General",
                      })}
                    >
                      <circle cx="200" cy="260" r="32" fill="url(#nodeGlow)" className="group-hover:opacity-100 opacity-60 transition-opacity" />
                      <circle cx="200" cy="260" r="24" fill="#09090b" stroke="url(#emeraldGlow)" strokeWidth="2" className="group-hover:stroke-emerald-300 transition-colors" />
                      <Calendar className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" x="190" y="250" />
                      <text x="200" y="302" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontWeight="bold" className="font-mono uppercase tracking-wider">Kickoff Sync</text>
                    </g>

                    {/* 4. Decision Node */}
                    <g
                      className="cursor-pointer group"
                      onClick={() => handleGraphNodeClick({
                        id: "decision",
                        label: "Auth Integration (Decision)",
                        type: "Decision / Agreement",
                        details: "Keputusan penting integrasi API disetujui via obrolan WA Group. Menjadi basis scope change.",
                        date: "12 June 2026",
                        sensitivity: "General",
                      })}
                    >
                      <circle cx="350" cy="260" r="32" fill="url(#nodeGlow)" className="group-hover:opacity-100 opacity-60 transition-opacity" />
                      <circle cx="350" cy="260" r="24" fill="#09090b" stroke="url(#amberGlow)" strokeWidth="2" className="group-hover:stroke-amber-300 transition-colors" />
                      <Check className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors" x="340" y="250" />
                      <text x="350" y="302" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontWeight="bold" className="font-mono uppercase tracking-wider">Auth Decision</text>
                    </g>

                    {/* 5. Task Node */}
                    <g
                      className="cursor-pointer group"
                      onClick={() => handleGraphNodeClick({
                        id: "task",
                        label: "UI Mockup Wireframe (Task)",
                        type: "Action Item",
                        details: "Task pengerjaan mockup terdeteksi dari email Budi. Status: Delay.",
                        date: "12 June 2026",
                        sensitivity: "General",
                      })}
                    >
                      <circle cx="350" cy="100" r="32" fill="url(#nodeGlow)" className="group-hover:opacity-100 opacity-60 transition-opacity" />
                      <circle cx="350" cy="100" r="24" fill="#09090b" stroke="url(#roseGlow)" strokeWidth="2" className="group-hover:stroke-rose-300 transition-colors" />
                      <Sparkles className="h-5 w-5 text-rose-400 group-hover:text-rose-300 transition-colors" x="340" y="90" />
                      <text x="350" y="142" fill="#a1a1aa" fontSize="9" textAnchor="middle" fontWeight="bold" className="font-mono uppercase tracking-wider">UI Mockup Task</text>
                    </g>
                  </svg>
                  
                  <div className="absolute bottom-3.5 left-3.5 bg-zinc-950/80 px-3 py-2 rounded-xl border border-white/[0.04] text-[10px] text-zinc-400 font-medium z-20 shadow-md">
                    💡 Klik node pada graf untuk melihat detail hubungan memori.
                  </div>
                </Card>

                {/* Sidebar Detail Card */}
                {activeGraphNode && (
                  <Card className="w-full lg:w-72 bg-zinc-950/60 border border-white/[0.04] backdrop-blur-md p-4 flex flex-col justify-between rounded-2xl shadow-xl animate-in zoom-in-95 duration-200">
                    <div className="space-y-4">
                      <div>
                        <Badge variant="outline" className="text-[9px] border-white/[0.04] bg-zinc-900/60 text-zinc-400 font-mono uppercase tracking-wider py-0.5 px-2 rounded-lg">
                          {activeGraphNode.type}
                        </Badge>
                        <h4 className="text-sm font-bold text-white mt-2.5">{activeGraphNode.label}</h4>
                        <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Mencakup timestamp: {activeGraphNode.date}</span>
                      </div>
                      
                      <div className="p-3 bg-zinc-900/20 rounded-xl border border-white/[0.04]">
                        <span className="text-[9px] text-zinc-500 font-bold font-mono uppercase tracking-wider block">Konteks Ekstraksi AI</span>
                        <p className="text-[11px] text-zinc-300 mt-1.5 leading-relaxed">
                          {activeGraphNode.details}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-zinc-450 border-t border-white/[0.03] pt-3">
                        <span className="flex items-center gap-1">
                          <Lock className="h-3 w-3 text-zinc-550" /> Sensitivitas:
                        </span>
                        <Badge variant="outline" className="text-[9px] border-white/[0.04] text-zinc-300 font-mono">
                          {activeGraphNode.sensitivity}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setActiveTab("ask");
                        handleSendMessage(`Ceritakan detail tentang ${activeGraphNode.label}`);
                      }}
                      className="mt-6 w-full bg-white hover:bg-zinc-200 text-black text-xs py-2.5 rounded-xl font-bold transition-all shadow-md"
                    >
                      Tanyakan AI RAG
                    </Button>
                  </Card>
                )}

              </div>
            </div>
          )}

          {/* TAB 4: DAILY BRIEF */}
          {activeTab === "brief" && (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
              <div className="p-3 bg-zinc-950/60 border border-white/[0.04] rounded-xl text-center text-xs text-zinc-400 font-medium">
                📧 Ini adalah representasi visual dari **Daily Brief** email digest yang dikirim otomatis ke email Owner setiap pagi pukul 07:00.
              </div>

              {/* Email Client Mockup */}
              <Card className="bg-zinc-950/60 border border-white/[0.04] backdrop-blur-md overflow-hidden rounded-2xl shadow-2xl">
                {/* Email Window Header */}
                <div className="bg-zinc-900/20 px-4 py-3 border-b border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-550">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/20 border border-red-500/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">Coretify Automated Dispatch</div>
                </div>

                <div className="p-6 space-y-6 bg-transparent">
                  {/* Email Meta */}
                  <div className="border-b border-white/[0.04] pb-4 text-xs space-y-1.5 text-zinc-400 font-mono">
                    <div><span className="text-zinc-600">Dari:</span> intelligence@coretify.ai</div>
                    <div><span className="text-zinc-600">Untuk:</span> owner@{companyName.toLowerCase().replace(/\s+/g, "")}.com</div>
                    <div><span className="text-zinc-600">Subjek:</span> ☕ Daily Brief {companyName} — 14 Juni 2026</div>
                  </div>

                  {/* Email Body */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Selamat Pagi, Owner {companyName}.</h3>
                      <p className="text-[11px] text-zinc-400 mt-1">Berikut adalah summary ringkas memori bisnismu hari ini:</p>
                    </div>

                    {/* Financial Status Widget (Visible only to Owner role simulator) */}
                    {userRole === "owner" ? (
                      <div className="p-3.5 bg-zinc-900/10 border border-white/[0.04] rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4.5 w-4.5 text-zinc-400" />
                          <span className="text-xs text-zinc-300">Revenue Bulan Ini: <strong className="text-white">Rp128.400.000</strong></span>
                        </div>
                        <Badge variant="outline" className="text-[9px] text-emerald-400 border-emerald-900/40 bg-emerald-950/10 font-mono">Stabil</Badge>
                      </div>
                    ) : (
                      <div className="p-3.5 bg-zinc-900/10 border border-white/[0.04] rounded-xl text-center text-[10px] text-zinc-555 flex items-center justify-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-zinc-600" />
                        <span>Data Finansial Tersembunyi (Filtered by Role permissions)</span>
                      </div>
                    )}

                    {/* Actionable Points list */}
                    <div className="space-y-2 text-xs">
                      
                      <div className="p-3.5 bg-zinc-900/10 border border-white/[0.04] rounded-xl flex items-start gap-2.5 justify-between hover:bg-zinc-900/20 transition-colors">
                        <div className="flex gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                          <div>
                            <span className="font-semibold block text-zinc-200">1 Project Terlambat Meleset Timeline</span>
                            <span className="text-[10px] text-zinc-500 block">Project Nexa Corp terdata telat 5 hari karena scope changes.</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab("ask");
                            handleSendMessage("Kenapa Project Nexa Corp telat?");
                          }}
                          className="text-[9px] text-white hover:text-zinc-300 font-bold self-center flex items-center gap-0.5"
                        >
                          Tanya AI <ArrowRight className="h-2.5 w-2.5" />
                        </button>
                      </div>

                      <div className="p-3.5 bg-zinc-900/10 border border-white/[0.04] rounded-xl flex items-start gap-2.5 justify-between hover:bg-zinc-900/20 transition-colors">
                        <div className="flex gap-2">
                          <User className="h-4 w-4 text-zinc-400 mt-0.5" />
                          <div>
                            <span className="font-semibold block text-zinc-200">Kapasitas Kerja Developer Overload</span>
                            <span className="text-[10px] text-zinc-500 block">Budi Santoso dialokasikan di 5 project sekaligus minggu ini.</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab("ask");
                            handleSendMessage("Siapa developer yang overload?");
                          }}
                          className="text-[9px] text-white hover:text-zinc-300 font-bold self-center flex items-center gap-0.5"
                        >
                          Tanya AI <ArrowRight className="h-2.5 w-2.5" />
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Signoff */}
                  <div className="text-[10px] text-zinc-500 border-t border-white/[0.04] pt-4 font-mono">
                    Daily Brief dibuat otomatis oleh Coretify RAG Engine. Balas email ini untuk menyisipkan feedback langsung ke model memori.
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* TAB 5: SECURITY & PRIVACY */}
          {activeTab === "settings" && (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
              
              {/* Credentials & Access control */}
              <Card className="bg-zinc-950/60 border border-white/[0.04] backdrop-blur-md rounded-2xl shadow-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <FolderLock className="h-4.5 w-4.5 text-zinc-400" />
                    Google Workspace API Integration
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400">
                    Otorisasi API Google bersifat read-only. Anda memegang kendali penuh.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Folder Checklist toggling */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-zinc-300">Granular Folder Scan Exclusions:</h5>
                    <div className="border border-white/[0.04] rounded-xl bg-zinc-950/40 p-3.5 space-y-2">
                      {folders.map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-1 hover:bg-white/[0.02] rounded-lg transition-colors">
                          <label className="text-xs text-zinc-300 flex items-center gap-2.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={f.selected}
                              onChange={() => {
                                setFolders(folders.map((fold, idx) => idx === i ? { ...fold, selected: !fold.selected } : fold));
                                showToast(`Folder exclusion diupdate.`);
                              }}
                              className="rounded border-white/[0.08] bg-zinc-900 text-zinc-300 focus:ring-0"
                            />
                            {f.name}
                          </label>
                          {f.sensitive && (
                            <Badge variant="outline" className="text-[9px] bg-amber-500/10 text-amber-400 border-amber-500/20 font-mono">
                              Auto Excluded (Finance/HR)
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/[0.04] pt-4">
                    <span className="text-xs text-zinc-400">Access Token Status: <strong className="text-emerald-500 font-bold">Active (Encrypted)</strong></span>
                    <Button
                      size="sm"
                      onClick={() => {
                        setGoogleConnected(false);
                        showToast("Koneksi Google dicabut. Token terhapus.");
                      }}
                      className="bg-transparent hover:bg-white/[0.02] text-zinc-300 hover:text-white border border-white/[0.04] hover:border-white/[0.08] text-xs py-2 px-4 rounded-xl transition-all"
                    >
                      Cabut Izin Akses
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone: Delete Memory */}
              <Card className="bg-red-950/5 border border-red-950/20 rounded-2xl shadow-xl">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-red-400 flex items-center gap-2">
                    <Trash2 className="h-4.5 w-4.5 text-red-500" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-400">
                    Tindakan ini tidak bisa dibatalkan. Menghapus seluruh memori bisnis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Menghapus Company Memory akan melenyapkan semua file indeksasi `memory_chunks`, entity graph, cache pertanyaan, dan kustom playbook dari database kami.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteMemory}
                    className="bg-[#1a0f12] border border-red-950/20 text-red-400 hover:bg-red-950/30 text-xs py-2 px-4 rounded-xl font-semibold transition-colors"
                  >
                    Hapus Seluruh Memory Workspace
                  </Button>
                </CardContent>
              </Card>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
