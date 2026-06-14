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
      {/* Background subtle top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[1360px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/30 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Floating simulator alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c0c0e] border border-slate-800 text-slate-100 text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="h-4.5 w-4.5 text-slate-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-900 bg-[#08080a] flex flex-col justify-between p-5 shrink-0 z-30">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-350">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                Coretify
              </span>
              <span className="text-[9px] text-slate-600 font-mono block">v1.0 (MVP)</span>
            </div>
          </div>

          {/* Sync Status Badge */}
          <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="text-[10px]">
              <span className="font-semibold block text-slate-300">Memory Synced</span>
              <span className="text-slate-600">Last sync: 3 mins ago</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("snapshot")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "snapshot"
                  ? "bg-[#121215] border border-slate-850 text-white"
                  : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#121215]/50"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Company Snapshot
            </button>

            <button
              onClick={() => setActiveTab("ask")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "ask"
                  ? "bg-[#121215] border border-slate-850 text-white"
                  : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#121215]/50"
              }`}
            >
              <MessageSquareCode className="h-4 w-4" />
              Ask Business (RAG)
            </button>

            <button
              onClick={() => setActiveTab("graph")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "graph"
                  ? "bg-[#121215] border border-slate-850 text-white"
                  : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#121215]/50"
              }`}
            >
              <Network className="h-4 w-4" />
              Memory Graph View
            </button>

            <button
              onClick={() => setActiveTab("brief")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "brief"
                  ? "bg-[#121215] border border-slate-850 text-white"
                  : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#121215]/50"
              }`}
            >
              <MailCheck className="h-4 w-4" />
              Daily Brief Digest
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-[#121215] border border-slate-850 text-white"
                  : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#121215]/50"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              Security & Privacy
            </button>
          </nav>
        </div>

        {/* Workspace Info & Simulator Indicator */}
        <div className="space-y-4">
          <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl text-center space-y-1">
            <div className="text-[10px] text-slate-650 uppercase tracking-widest font-mono">Workspace</div>
            <div className="text-xs font-bold text-white truncate">{companyName}</div>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="border-b border-slate-900 h-20 px-8 flex items-center justify-between bg-[#070708]/85 backdrop-blur-sm z-20 shrink-0">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm font-bold text-white capitalize">
              {activeTab === "snapshot" && "Company Snapshot Dashboard"}
              {activeTab === "ask" && "Ask Business AI RAG"}
              {activeTab === "graph" && "Knowledge Graph Visualization"}
              {activeTab === "brief" && "Morning Daily Brief digest"}
              {activeTab === "settings" && "Security & Workspace Data Settings"}
            </h2>
            <Badge variant="outline" className="text-[9px] px-2 py-0.5 border-slate-850 text-slate-400 bg-slate-950">
              {activePlaybook} Playbook
            </Badge>
          </div>

          {/* SIMULATOR CONTROL CONSOLE (Production Testing UX) */}
          <div className="flex items-center gap-3 bg-[#0c0c0e] border border-slate-900 rounded-xl px-3 py-1.5 shadow-md">
            <div className="flex items-center gap-1.5 border-r border-slate-900 pr-3">
              <span className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Zap className="h-3 w-3" /> TEST ROLE:</span>
              <div className="flex gap-1">
                {(["owner", "manager", "member"] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setUserRole(r);
                      showToast(`Role ditukar ke ${r.toUpperCase()}. RLS Policy & Insights terupdate.`);
                    }}
                    className={`text-[9px] px-2.5 py-1 rounded font-bold uppercase transition-all ${
                      userRole === r
                        ? "bg-white text-black"
                        : "bg-slate-950 text-slate-550 hover:text-slate-350"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-500 font-bold">PLAYBOOK:</span>
              <select
                value={activePlaybook}
                onChange={(e) => {
                  setActivePlaybook(e.target.value as Playbook);
                  showToast(`Playbook diganti ke ${e.target.value}. Widget insight disesuaikan.`);
                }}
                className="bg-slate-950 border border-slate-900 text-[10px] rounded-lg px-2 py-1 font-semibold text-slate-300 focus:outline-none"
              >
                <option value="Software House">Software House</option>
                <option value="Agency">Creative Agency</option>
                <option value="Startup">Startup Playbook</option>
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
                <Card className="bg-[#0c0c0e] border-slate-900 p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Memory Ingestion</span>
                  <span className="text-xl font-extrabold text-white mt-1">128 Chunks</span>
                  <span className="text-[9px] text-emerald-500 mt-2 flex items-center gap-1"><Check className="h-3 w-3" /> Gmail, Calendar, Drive synced</span>
                </Card>
                <Card className="bg-[#0c0c0e] border-slate-900 p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Clients Mapped</span>
                  <span className="text-xl font-extrabold text-white mt-1">12 Perusahaan</span>
                  <span className="text-[9px] text-slate-500 mt-2">Ditemukan dari metadata email</span>
                </Card>
                <Card className="bg-[#0c0c0e] border-slate-900 p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Active Projects</span>
                  <span className="text-xl font-extrabold text-white mt-1">3 Projects</span>
                  <span className="text-[9px] text-amber-500 mt-2">1 Project berisiko terlambat</span>
                </Card>
                <Card className="bg-[#0c0c0e] border-slate-900 p-4 flex flex-col justify-between">
                  <span className="text-[10px] text-slate-500 font-semibold uppercase">Decisions Extracted</span>
                  <span className="text-xl font-extrabold text-white mt-1">9 Kesepakatan</span>
                  <span className="text-[9px] text-slate-500 mt-2">Parsed from WhatsApp & Docs</span>
                </Card>
              </div>

              {/* Playbook Specific Warnings and Wow Insights */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-slate-500" />
                    Proactive Insights ({activePlaybook} Playbook)
                  </h3>
                  <Badge variant="outline" className="text-[9px] text-slate-400 bg-[#0c0c0e] border-slate-850">
                    Confidence Score &gt; 90%
                  </Badge>
                </div>

                {/* Software House Playbook Insights */}
                {activePlaybook === "Software House" && (
                  <div className="space-y-4">
                    {/* Insight 1: Scope revisions */}
                    <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden">
                      <div className="p-4 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-350 shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">63% keterlambatan project dipicu revisi client setelah development dimulai</h4>
                            <Badge variant="outline" className="text-[9px] py-0 px-1.5 border-slate-800 bg-transparent text-slate-400">Risiko Tinggi</Badge>
                          </div>
                          <p className="text-slate-450 text-[11px] leading-relaxed">
                            Menganalisis 4 scope change request pada email Nexa Corp. Pola pengerjaan meleset 5 hari dari timeline kickoff awal akibat revisi autentikasi API.
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-[9px] text-slate-550">Apakah insight ini akurat?</span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleFeedback("sh-1", "accuracy", "up")} className="text-[10px] text-slate-400 hover:text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-900 flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-slate-500" /> Benar</button>
                              <button onClick={() => handleFeedback("sh-1", "accuracy", "down")} className="text-[10px] text-slate-400 hover:text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-900 flex items-center gap-1"><ThumbsDown className="h-3 w-3 text-slate-500" /> Salah</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Insight 2: Resource overload */}
                    <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden">
                      <div className="p-4 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-350 shrink-0">
                          <TrendingUp className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-bold text-white">Budi Santoso (Lead Dev) dialokasikan pada 5 project paralel</h4>
                          <p className="text-slate-450 text-[11px] leading-relaxed">
                            Komunikasi email & calendar menunjukkan Budi terlibat di Nexa Web App, Client Internal, Coretify Dev, Admin Panel, dan Bug-Fixing. Risiko overload & burnout tergolong sedang-tinggi.
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-[9px] text-slate-550">Apakah insight ini berguna?</span>
                            <div className="flex gap-1.5">
                              <button onClick={() => handleFeedback("sh-2", "usefulness", "up")} className="text-[10px] text-slate-400 hover:text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-900 flex items-center gap-1"><ThumbsUp className="h-3 w-3 text-slate-500" /> Berguna</button>
                              <button onClick={() => handleFeedback("sh-2", "usefulness", "down")} className="text-[10px] text-slate-400 hover:text-white bg-slate-950 px-2 py-0.5 rounded border border-slate-900 flex items-center gap-1"><ThumbsDown className="h-3 w-3 text-slate-500" /> Tidak Berguna</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Restricted (Financial) Insight - Enforced by Role */}
                    {userRole === "owner" ? (
                      <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden">
                        <div className="p-4 flex items-start gap-4">
                          <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-350 shrink-0">
                            <Lock className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">Project Nexa Corp menyumbang 42% revenue namun memakan 70% tim operasional</h4>
                              <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-emerald-400 border-slate-800 bg-slate-950">Owner-Only Finance</Badge>
                            </div>
                            <p className="text-slate-450 text-[11px] leading-relaxed">
                              Disinkronisasi dengan log invoice spreadsheet. Profit margin bersih project ini berisiko turun ke 12% karena durasi kerja freelance melebihi budget.
                            </p>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <div className="p-3.5 bg-slate-950 border border-dashed border-slate-900 rounded-xl text-center text-[10px] text-slate-500 flex items-center justify-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        <span>1 insight finansial disembunyikan oleh RLS Policy untuk role {userRole.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Agency Playbook Insights */}
                {activePlaybook === "Agency" && (
                  <div className="space-y-4">
                    <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden">
                      <div className="p-4 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-355 shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-bold text-white">Penurunan intensitas komunikasi Klien Vista Retail sebesar 45%</h4>
                          <p className="text-slate-450 text-[11px] leading-relaxed">
                            Log Gmail mendeteksi tidak ada pertukaran email atau approval dalam 14 hari terakhir (biasanya 3 hari sekali). Potensi risiko churn klien terdeteksi.
                          </p>
                        </div>
                      </div>
                    </Card>

                    {userRole === "owner" ? (
                      <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden">
                        <div className="p-4 flex items-start gap-4">
                          <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-355 shrink-0">
                            <Lock className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">Klien Aero Design mengonsumsi 34% kapasitas tim untuk kontribusi 12% revenue</h4>
                              <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-emerald-400 border-slate-800 bg-slate-950">Owner-Only Finance</Badge>
                            </div>
                            <p className="text-slate-455 text-[11px] leading-relaxed">
                              Frekuensi revisi desain aset media sosial melebihi batas perjanjian kontrak layanan bulanan (retainer).
                            </p>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <div className="p-3.5 bg-slate-950 border border-dashed border-slate-900 rounded-xl text-center text-[10px] text-slate-500 flex items-center justify-center gap-2">
                        <Lock className="h-3.5 w-3.5" />
                        <span>1 insight profitabilitas disembunyikan oleh RLS Policy untuk role {userRole.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Startup Playbook Insights */}
                {activePlaybook === "Startup" && (
                  <div className="space-y-4">
                    <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden">
                      <div className="p-4 flex items-start gap-4">
                        <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-355 shrink-0">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-bold text-white">78% meeting internal minggu lalu tidak menghasilkan Action Items / Task jelas</h4>
                          <p className="text-slate-455 text-[11px] leading-relaxed">
                            Menganalisis transkrip diskusi/file catatan yang diunggah dan sinkronisasi Google Calendar. Pertemuan tim product sinkronisasi harian berpotensi kurang terarah.
                          </p>
                        </div>
                      </div>
                    </Card>

                    {userRole === "owner" ? (
                      <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden">
                        <div className="p-4 flex items-start gap-4">
                          <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-355 shrink-0">
                            <Lock className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-white">Runway keuangan startup tersisa 6.5 bulan berdasarkan data cashflow excel</h4>
                              <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-emerald-400 border-slate-800 bg-slate-950">Owner-Only Finance</Badge>
                            </div>
                            <p className="text-slate-455 text-[11px] leading-relaxed">
                              Berdasarkan pengeluaran cloud server scaling dan gaji developer per Juni 2026. Direkomendasikan melakukan review langganan saas tak terpakai.
                            </p>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <div className="p-3.5 bg-slate-950 border border-dashed border-slate-900 rounded-xl text-center text-[10px] text-slate-500 flex items-center justify-center gap-2">
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
            <div className="h-[calc(100vh-14rem)] flex flex-col justify-between animate-in fade-in duration-300">
              
              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 border border-slate-900/60 rounded-2xl bg-slate-950/20 p-4 min-h-[300px]">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "bot" && (
                      <div className="h-8.5 w-8.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-350 shrink-0">
                        <Bot className="h-4.5 w-4.5" />
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5 max-w-[80%]">
                      <div
                        className={`rounded-2xl px-4 py-3 text-xs leading-relaxed border ${
                          msg.sender === "user"
                            ? "bg-[#18181b] border-slate-850 text-white rounded-tr-none"
                            : msg.isRestricted
                            ? "bg-rose-950/10 border-rose-900/20 text-rose-350 rounded-tl-none"
                            : "bg-[#0c0c0e]/80 border-slate-900 text-slate-300 rounded-tl-none"
                        }`}
                      >
                        {msg.isRestricted && (
                          <div className="flex items-center gap-1 text-[10px] font-bold text-rose-400 mb-1">
                            <LockKeyhole className="h-3.5 w-3.5" /> ACCESS DENIED (RLS CONTROL)
                          </div>
                        )}
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      </div>

                      {/* Citations block */}
                      {msg.sender === "bot" && msg.citations && msg.citations.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          <span className="text-[9px] text-slate-550 self-center">Referensi:</span>
                          {msg.citations.map((cite, idx) => (
                            <div
                              key={idx}
                              onClick={() => showToast(`Membuka berkas referensi: ${cite.source}`)}
                              className={`text-[9px] font-semibold px-2 py-0.5 rounded border flex items-center gap-1 cursor-pointer transition-colors ${
                                cite.sensitivity === "Restricted"
                                  ? "bg-emerald-500/5 border-emerald-500/15 text-emerald-400 hover:bg-emerald-550/10"
                                  : "bg-slate-900 border-slate-800 text-slate-450 hover:border-slate-700 hover:text-white"
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
                      <div className="h-8.5 w-8.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-350 shrink-0">
                        <User className="h-4.5 w-4.5" />
                      </div>
                    )}
                  </div>
                ))}

                {isAiTyping && (
                  <div className="flex gap-3.5">
                    <div className="h-8.5 w-8.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-355 shrink-0">
                      <Bot className="h-4.5 w-4.5 animate-pulse" />
                    </div>
                    <div className="bg-[#0c0c0e]/80 border border-slate-900 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Preset buttons */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] text-slate-500 self-center">Pertanyaan Populer:</span>
                  <button
                    onClick={() => clickPresetQuestion("Apa masalah terbesar perusahaan saat ini?")}
                    className="text-[10px] bg-[#0c0c0e] hover:bg-[#121215] border border-slate-900 px-3.5 py-1.5 rounded-xl text-slate-300 font-semibold"
                  >
                    🔍 Apa masalah terbesar perusahaan?
                  </button>
                  <button
                    onClick={() => clickPresetQuestion("Kenapa Project Nexa Corp telat?")}
                    className="text-[10px] bg-[#0c0c0e] hover:bg-[#121215] border border-slate-900 px-3.5 py-1.5 rounded-xl text-slate-300 font-semibold"
                  >
                    🕒 Kenapa Project Nexa Corp telat?
                  </button>
                  <button
                    onClick={() => clickPresetQuestion("Berapa burn rate keuangan bulan ini?")}
                    className="text-[10px] bg-[#0c0c0e] hover:bg-[#121215] border border-slate-900 px-3.5 py-1.5 rounded-xl text-slate-300 flex items-center gap-1 font-semibold"
                  >
                    <Lock className="h-2.5 w-2.5 text-emerald-500" />
                    💰 Berapa burn rate bulan ini?
                  </button>
                </div>

                {/* Input form */}
                <div className="relative flex items-center bg-[#0c0c0e] border border-slate-900 rounded-xl focus-within:border-slate-800 transition-all p-1.5">
                  <input
                    type="text"
                    placeholder="Tanyakan memori bisnis Anda disini (misal: 'siapa client yang belum dibalas?')..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendMessage();
                    }}
                    className="flex-1 bg-transparent px-3 py-2 text-xs border-0 focus:outline-none focus:ring-0 text-white"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim()}
                    className="bg-white hover:bg-slate-100 text-black shrink-0 rounded-lg px-4.5 py-2 font-semibold"
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
                <Card className="flex-1 bg-[#0c0c0e] border-slate-900 p-4 relative min-h-[400px] flex items-center justify-center overflow-hidden">
                  
                  
                  {/* Interactive SVG Nodes */}
                  <svg className="w-full h-[360px] z-10 select-none">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="24" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#1e293b" />
                      </marker>
                    </defs>

                    {/* Edge Lines */}
                    <line x1="80" y1="180" x2="200" y2="100" stroke="#334155" strokeWidth="1.5" strokeDasharray="4" markerEnd="url(#arrow)" />
                    <line x1="80" y1="180" x2="200" y2="260" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1="200" y1="260" x2="350" y2="260" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1="200" y1="100" x2="350" y2="100" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1="350" y1="260" x2="200" y2="100" stroke="#1e293b" strokeWidth="1" strokeDasharray="3" />

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
                      <circle cx="80" cy="180" r="28" fill="#0c0c0e" stroke="#27272a" strokeWidth="2" className="group-hover:stroke-slate-400 transition-all" />
                      <Building2 className="h-5 w-5 text-slate-400" x="70" y="170" />
                      <text x="80" y="225" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Nexa Corp</text>
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
                      <circle cx="200" cy="100" r="26" fill="#0c0c0e" stroke="#27272a" strokeWidth="2" className="group-hover:stroke-slate-400 transition-all" />
                      <Bot className="h-5 w-5 text-slate-400" x="190" y="90" />
                      <text x="200" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Nexa Web App</text>
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
                      <circle cx="200" cy="260" r="26" fill="#0c0c0e" stroke="#27272a" strokeWidth="2" className="group-hover:stroke-slate-400 transition-all" />
                      <Calendar className="h-5 w-5 text-slate-400" x="190" y="250" />
                      <text x="200" y="305" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Kickoff Sync</text>
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
                      <circle cx="350" cy="260" r="26" fill="#0c0c0e" stroke="#27272a" strokeWidth="2" className="group-hover:stroke-slate-400 transition-all" />
                      <Check className="h-5 w-5 text-slate-400" x="340" y="250" />
                      <text x="350" y="305" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Auth Decision</text>
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
                      <circle cx="350" cy="100" r="26" fill="#0c0c0e" stroke="#27272a" strokeWidth="2" className="group-hover:stroke-slate-400 transition-all" />
                      <Sparkles className="h-5 w-5 text-slate-400" x="340" y="90" />
                      <text x="350" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">UI Mockup Task</text>
                    </g>
                  </svg>
                  
                  <div className="absolute bottom-3.5 left-3.5 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-900 text-[10px] text-slate-550 z-20">
                    💡 Klik node pada graf untuk melihat detail hubungan memori.
                  </div>
                </Card>

                {/* Sidebar Detail Card */}
                {activeGraphNode && (
                  <Card className="w-full lg:w-72 bg-[#0c0c0e] border-slate-900 p-4 flex flex-col justify-between animate-in zoom-in-95 duration-200">
                    <div className="space-y-4">
                      <div>
                        <Badge variant="outline" className="text-[9px] border-slate-800 bg-slate-950 text-slate-400 uppercase tracking-wider py-0.5 px-2">
                          {activeGraphNode.type}
                        </Badge>
                        <h4 className="text-sm font-bold text-white mt-1.5">{activeGraphNode.label}</h4>
                        <span className="text-[10px] text-slate-500 block mt-0.5">Mencakup timestamp: {activeGraphNode.date}</span>
                      </div>
                      
                      <div className="p-3 bg-[#08080a] rounded-lg border border-slate-900">
                        <span className="text-[9px] text-slate-500 font-semibold uppercase block">Konteks Ekstraksi AI</span>
                        <p className="text-[11px] text-slate-350 mt-1 leading-normal">
                          {activeGraphNode.details}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-900 pt-3">
                        <span className="flex items-center gap-1">
                          <Lock className="h-3 w-3 text-slate-500" /> Sensitivitas:
                        </span>
                        <Badge variant="outline" className="text-[9px] border-slate-900 text-slate-300">
                          {activeGraphNode.sensitivity}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        setActiveTab("ask");
                        handleSendMessage(`Ceritakan detail tentang ${activeGraphNode.label}`);
                      }}
                      className="mt-6 w-full bg-[#18181b] hover:bg-[#27272a] text-white border border-[#2e2e33] text-xs py-2 rounded-xl"
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
              <div className="p-3 bg-[#0c0c0e] border border-slate-900 rounded-xl text-center text-xs text-slate-450">
                📧 Ini adalah representasi visual dari **Daily Brief** email digest yang dikirim otomatis ke email Owner setiap pagi pukul 07:00.
              </div>

              {/* Email Client Mockup */}
              <Card className="bg-[#0c0c0e] border-slate-900 overflow-hidden shadow-2xl">
                {/* Email Window Header */}
                <div className="bg-[#08080a] px-4 py-3 border-b border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/30" />
                  </div>
                  <div>Coretify Automated Dispatch</div>
                </div>

                <div className="p-6 space-y-6 bg-transparent">
                  {/* Email Meta */}
                  <div className="border-b border-slate-900 pb-4 text-xs space-y-1 text-slate-400">
                    <div><span className="text-slate-500">Dari:</span> intelligence@coretify.ai</div>
                    <div><span className="text-slate-500">Untuk:</span> owner@{companyName.toLowerCase().replace(/\s+/g, "")}.com</div>
                    <div><span className="text-slate-500">Subjek:</span> ☕ Daily Brief {companyName} — 14 Juni 2026</div>
                  </div>

                  {/* Email Body */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Selamat Pagi, Owner {companyName}.</h3>
                      <p className="text-[11px] text-slate-455 mt-0.5">Berikut adalah summary ringkas memori bisnismu hari ini:</p>
                    </div>

                    {/* Financial Status Widget (Visible only to Owner role simulator) */}
                    {userRole === "owner" ? (
                      <div className="p-3.5 bg-[#08080a] border border-slate-900 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4.5 w-4.5 text-slate-400" />
                          <span className="text-xs text-slate-300">Revenue Bulan Ini: <strong className="text-white">Rp128.400.000</strong></span>
                        </div>
                        <Badge variant="outline" className="text-[9px] text-slate-400 border-slate-900">Stabil</Badge>
                      </div>
                    ) : (
                      <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl text-center text-[10px] text-slate-600">
                        🔒 Data Finansial Tersembunyi (Filtered by Role permissions)
                      </div>
                    )}

                    {/* Actionable Points list */}
                    <div className="space-y-2 text-xs">
                      
                      <div className="p-3.5 bg-[#08080a] border border-slate-900 rounded-xl flex items-start gap-2.5 justify-between">
                        <div className="flex gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                          <div>
                            <span className="font-semibold block text-slate-200">1 Project Terlambat Meleset Timeline</span>
                            <span className="text-[10px] text-slate-500 block">Project Nexa Corp terdata telat 5 hari karena scope changes.</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab("ask");
                            handleSendMessage("Kenapa Project Nexa Corp telat?");
                          }}
                          className="text-[9px] text-white hover:text-slate-350 font-bold self-center flex items-center gap-0.5"
                        >
                          Tanya AI <ArrowRight className="h-2.5 w-2.5" />
                        </button>
                      </div>

                      <div className="p-3.5 bg-[#08080a] border border-slate-900 rounded-xl flex items-start gap-2.5 justify-between">
                        <div className="flex gap-2">
                          <User className="h-4 w-4 text-slate-400 mt-0.5" />
                          <div>
                            <span className="font-semibold block text-slate-200">Kapasitas Kerja Developer Overload</span>
                            <span className="text-[10px] text-slate-500 block">Budi Santoso dialokasikan di 5 project sekaligus minggu ini.</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab("ask");
                            handleSendMessage("Siapa developer yang overload?");
                          }}
                          className="text-[9px] text-white hover:text-slate-350 font-bold self-center flex items-center gap-0.5"
                        >
                          Tanya AI <ArrowRight className="h-2.5 w-2.5" />
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Signoff */}
                  <div className="text-[10px] text-slate-600 border-t border-slate-900 pt-4">
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
              <Card className="bg-[#0c0c0e] border-slate-900">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                    <FolderLock className="h-4.5 w-4.5 text-slate-400" />
                    Google Workspace API Integration
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-405">
                    Otorisasi API Google bersifat read-only. Anda memegang kendali penuh.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Folder Checklist toggling */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-bold text-slate-300">Granular Folder Scan Exclusions:</h5>
                    <div className="border border-slate-900 rounded-xl bg-[#08080a] p-3.5 space-y-2">
                      {folders.map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-1 hover:bg-slate-900/20 rounded">
                          <label className="text-xs text-slate-300 flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={f.selected}
                              onChange={() => {
                                setFolders(folders.map((fold, idx) => idx === i ? { ...fold, selected: !fold.selected } : fold));
                                showToast(`Folder exclusion diupdate.`);
                              }}
                              className="rounded border-slate-900 bg-slate-900 text-purple-600 focus:ring-0"
                            />
                            {f.name}
                          </label>
                          {f.sensitive && (
                            <Badge variant="outline" className="text-[9px] bg-amber-500/10 text-amber-400 border-amber-500/20">
                              Auto Excluded (Finance/HR)
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-slate-900 pt-4">
                    <span className="text-xs text-slate-500">Access Token Status: <strong className="text-emerald-500 font-bold">Active (Encrypted)</strong></span>
                    <Button
                      size="sm"
                      onClick={() => {
                        setGoogleConnected(false);
                        showToast("Koneksi Google dicabut. Token terhapus.");
                      }}
                      className="bg-[#18181b] hover:bg-[#27272a] text-slate-300 hover:text-white border border-[#2e2e33] text-xs py-2 rounded-xl"
                    >
                      Cabut Izin Akses
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone: Delete Memory */}
              <Card className="bg-[#1a0f12]/30 border-red-900/30">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-red-400 flex items-center gap-2">
                    <Trash2 className="h-4.5 w-4.5 text-red-500" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-400">
                    Tindakan ini tidak bisa dibatalkan. Menghapus seluruh memori bisnis.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-slate-455 leading-relaxed">
                    Menghapus Company Memory akan melenyapkan semua file indeksasi `memory_chunks`, entity graph, cache pertanyaan, dan kustom playbook dari database kami.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteMemory}
                    className="bg-[#1a0f12] border border-red-900/40 text-red-400 hover:bg-red-950 text-xs py-2 px-4 rounded-xl font-semibold transition-colors"
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
