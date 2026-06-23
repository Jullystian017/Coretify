"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Globe,
  MessageSquare,
  FileSpreadsheet,
  Check,
  ShieldCheck,
  UploadCloud,
  ChevronDown,
  FolderLock,
  Lock,
  QrCode,
  X,
  Phone,
  RefreshCw,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────── */
type Scope = "gmail" | "calendar" | "drive" | "sheets";

interface Folder {
  id: number;
  name: string;
  path: string;
  selected: boolean;
  autoExclude: boolean;
}

const SCOPES: { key: Scope; label: string; desc: string }[] = [
  { key: "gmail",    label: "Read-only Gmail",          desc: "Memindai isi email untuk mendeteksi diskusi projek dan klien. Coretify tidak bisa mengirim email." },
  { key: "calendar", label: "Read-only Google Calendar", desc: "Memindai riwayat meeting untuk mendeteksi timelines projek dan janji temu." },
  { key: "drive",    label: "Read-only Google Drive",    desc: "Membaca dokumen dan file pendukung. Folder HR & Finance ter-exclude secara otomatis." },
  { key: "sheets",   label: "Read-only Google Sheets",   desc: "Membaca spreadsheet kustom yang berisi invoice atau backlog kerja." },
];

const DEFAULT_FOLDERS: Folder[] = [
  { id: 1, name: "General & Projects",     path: "/Projects",  selected: true,  autoExclude: false },
  { id: 2, name: "Client Presentations",   path: "/Clients",   selected: true,  autoExclude: false },
  { id: 3, name: "HR & Payroll",           path: "/HR",        selected: false, autoExclude: true  },
  { id: 4, name: "Finance & Invoice 2026", path: "/Finance",   selected: false, autoExclude: true  },
  { id: 5, name: "Marketing Assets",       path: "/Marketing", selected: true,  autoExclude: false },
];

/* ─── Page ───────────────────────────────────────────────────── */
export default function ConnectPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("Perusahaan");
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [googleConnected,   setGoogleConnected]   = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [csvConnected,      setCsvConnected]      = useState(false);

  // States
  const [csvFile,      setCsvFile]      = useState<string | null>(null);
  const [isParsingCSV, setIsParsingCSV] = useState(false);
  const [showFolders,  setShowFolders]  = useState(false);
  const [folders,      setFolders]      = useState<Folder[]>(DEFAULT_FOLDERS);
  const [showModal,    setShowModal]    = useState(false);
  const [scopes, setScopes] = useState<Record<Scope, boolean>>({
    gmail: true, calendar: true, drive: true, sheets: true,
  });

  // WhatsApp connection modal state
  const [showWaModal, setShowWaModal] = useState(false);
  const [isWaLinking, setIsWaLinking] = useState(false);

  const canProceed = googleConnected || whatsappConnected || csvConnected;

  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      const p = JSON.parse(data);
      if (p.name) setCompanyName(p.name);
      if (p.toolsUsed && Array.isArray(p.toolsUsed)) {
        setToolsUsed(p.toolsUsed);
        
        // Match scopes to onboarding selection
        const hasGmail = p.toolsUsed.includes("Gmail");
        const hasCalendar = p.toolsUsed.includes("Calendar");
        const hasDrive = p.toolsUsed.includes("Drive");
        const hasCSV = p.toolsUsed.includes("CSV");
        
        if (hasGmail || hasCalendar || hasDrive || hasCSV) {
          setScopes({
            gmail: hasGmail,
            calendar: hasCalendar,
            drive: hasDrive,
            sheets: hasCSV || hasDrive,
          });
        }
      }
      if (p.googleConnected) setGoogleConnected(true);
      if (p.whatsappConnected) setWhatsappConnected(true);
      if (p.csvConnected) {
        setCsvConnected(true);
        if (p.csvFile) setCsvFile(p.csvFile);
      }
    }
  }, []);

  const approveOAuth = () => {
    setGoogleConnected(true);
    setShowModal(false);
    const saved = localStorage.getItem("coretify_company");
    if (saved) {
      const p = JSON.parse(saved);
      p.googleConnected = true;
      p.googleScopes = scopes;
      p.excludedFolders = folders.filter((f) => !f.selected).map((f) => f.path);
      localStorage.setItem("coretify_company", JSON.stringify(p));
    }
  };

  // WhatsApp Fonnte QR Scanner simulator
  const handleConnectWhatsApp = () => {
    setShowWaModal(true);
    setIsWaLinking(true);
    
    // Simulate Fonnte gateway QR scanning
    setTimeout(() => {
      setIsWaLinking(false);
      setWhatsappConnected(true);
      
      const saved = localStorage.getItem("coretify_company");
      if (saved) {
        const p = JSON.parse(saved);
        p.whatsappConnected = true;
        p.whatsappPhone = "+62 812-3456-7890";
        localStorage.setItem("coretify_company", JSON.stringify(p));
      }
      setTimeout(() => {
        setShowWaModal(false);
      }, 1000);
    }, 2800);
  };

  const handleDisconnectWhatsApp = () => {
    setWhatsappConnected(false);
    const saved = localStorage.getItem("coretify_company");
    if (saved) {
      const p = JSON.parse(saved);
      p.whatsappConnected = false;
      delete p.whatsappPhone;
      localStorage.setItem("coretify_company", JSON.stringify(p));
    }
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsParsingCSV(true);
    setTimeout(() => {
      setCsvFile(file.name); 
      setCsvConnected(true); 
      setIsParsingCSV(false);
      
      const saved = localStorage.getItem("coretify_company");
      if (saved) {
        const p = JSON.parse(saved);
        p.csvConnected = true;
        p.csvFile = file.name;
        localStorage.setItem("coretify_company", JSON.stringify(p));
      }
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 font-sans antialiased relative">

      {/* ── Glows ──────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed top-0 left-0 w-[55vw] h-[55vw] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)", filter: "blur(80px)", transform: "translate(-25%, -30%)" }} />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[45vw] h-[45vw] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, rgba(200,200,220,0.04) 0%, transparent 65%)", filter: "blur(90px)", transform: "translate(25%, 30%)" }} />

      {/* ── Navbar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-[#070708]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-8 h-[68px] flex items-center">
          <button onClick={() => router.push("/")} className="flex items-center gap-0.5 hover:opacity-75 transition-opacity">
            <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
            <span className="text-[19px] font-semibold tracking-tight text-white">Coretify</span>
          </button>
        </div>
      </header>

      {/* ── Main ───────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-8 py-14">

        {/* Page heading */}
        <div className="mb-10">
          <h1 className="text-[32px] font-semibold tracking-tight text-white leading-tight mb-2">
            Hubungkan memori<br />bisnis {companyName}.
          </h1>
          <p className="text-zinc-400 text-[13px] max-w-lg leading-relaxed">
            Coretify membaca data historis untuk memetakan klien, proyek, dan keputusan penting.
            Hubungkan minimal satu sumber untuk melanjutkan.
          </p>
        </div>

        {/* ── Integration cards ─────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">

          {/* ─── Google Workspace ─── */}
          <IntegrationCard
            connected={googleConnected}
            selectedInOnboarding={toolsUsed.includes("Gmail") || toolsUsed.includes("Calendar") || toolsUsed.includes("Drive")}
            label="Google Workspace"
            badge="Recommended"
            icon={<Globe className="h-5 w-5" />}
            desc="Gmail, Calendar, Drive & Sheets — satu koneksi, empat data stream."
            bullets={[
              "Korespondensi klien dari Gmail",
              "Timeline meeting dari Calendar",
              "Dokumen & spreadsheet dari Drive",
            ]}
          >
            {/* Post-connect: folder selector */}
            {googleConnected && (
              <div className="mt-4 rounded-xl border border-zinc-800/60 bg-zinc-950/60 overflow-hidden">
                <button
                  onClick={() => setShowFolders(!showFolders)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[12px] font-medium text-zinc-300 hover:text-white transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FolderLock className="h-3.5 w-3.5 text-zinc-550" />
                    Atur folder yang di-exclude
                  </span>
                  <ChevronDown className={`h-3.5 w-3.5 text-zinc-550 transition-transform ${showFolders ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showFolders && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 border-t border-zinc-800/50 space-y-1.5">
                        <p className="text-[10px] text-zinc-600 mb-3 leading-relaxed">
                          HR & Finance folder otomatis ter-exclude demi keamanan data sensitif.
                        </p>
                        {folders.map((f) => (
                          <label key={f.id} className="flex items-center justify-between cursor-pointer group">
                            <span className="flex items-center gap-2 text-[12px] text-zinc-400 group-hover:text-zinc-200 transition-colors">
                              <div className={`h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                                f.selected ? "border-white bg-white" : "border-zinc-800"
                              }`}>
                                {f.selected && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                              </div>
                              {f.name}
                            </span>
                            {f.autoExclude && (
                              <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-650 border border-zinc-850 rounded px-1.5 py-0.5">
                                <Lock className="h-2 w-2" /> Auto-excluded
                              </span>
                            )}
                            <input type="checkbox" className="sr-only" checked={f.selected}
                              onChange={() => setFolders(folders.map((x) => x.id === f.id ? { ...x, selected: !x.selected } : x))} />
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() => setShowModal(true)}
              className={`mt-4 w-full h-10 flex items-center justify-center gap-2 rounded-xl text-[12px] font-semibold transition-all cursor-pointer ${
                googleConnected
                  ? "bg-zinc-900 hover:bg-zinc-850 text-zinc-300 border border-zinc-850"
                  : "bg-white hover:bg-zinc-150 text-black shadow-[0_0_20px_rgba(255,255,255,0.06)]"
              }`}
            >
              {googleConnected ? "Hubungkan Ulang" : "Connect Google Workspace"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </IntegrationCard>

          {/* ─── WhatsApp ─── */}
          <IntegrationCard
            connected={whatsappConnected}
            selectedInOnboarding={toolsUsed.includes("WhatsApp")}
            label="WhatsApp Gateway"
            badge="Fonnte QR Scan"
            icon={<MessageSquare className="h-5 w-5" />}
            desc="Tautkan nomor WhatsApp bisnis Anda secara langsung via Fonnte Gateway."
            bullets={[
              "Membaca isi chat grup koordinasi projek",
              "Melacak komitmen actions & revisi dari klien",
            ]}
          >
            {whatsappConnected ? (
              <div className="mt-4 space-y-3">
                <div className="p-3.5 rounded-xl border border-zinc-850 bg-zinc-950/60 flex items-start gap-3">
                  <Phone className="h-4.5 w-4.5 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-bold text-white leading-none">Linked Device</p>
                    <p className="text-[10px] text-zinc-500 mt-1 font-mono">Julian A. (+62 812-3456-7890)</p>
                  </div>
                </div>
                <button
                  onClick={handleDisconnectWhatsApp}
                  className="w-full h-10 flex items-center justify-center border border-zinc-850 hover:border-zinc-750 bg-zinc-900/40 text-zinc-400 hover:text-zinc-200 text-[12px] font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Disconnect Gateway
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnectWhatsApp}
                className="mt-4 w-full h-10 flex items-center justify-center gap-2 bg-white hover:bg-zinc-150 text-black font-semibold text-[12px] rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all cursor-pointer"
              >
                Connect WhatsApp Device
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </IntegrationCard>

          {/* ─── CSV ─── */}
          <IntegrationCard
            connected={csvConnected}
            selectedInOnboarding={toolsUsed.includes("CSV")}
            label="CSV / Excel"
            badge="Generic Data"
            icon={<FileSpreadsheet className="h-5 w-5" />}
            desc="Memetakan invoice, cashflow, atau log transaksi sebagai pendukung memory."
            bullets={[
              "Korelasi profitabilitas klien dari data piutang",
              "Kompatibel dengan Accurate, Jurnal, atau spreadsheet manual",
            ]}
          >
            {/* File drop zone */}
            <div className={`relative mt-4 border border-dashed rounded-xl flex flex-col items-center justify-center min-h-[100px] text-center transition-all ${
              csvConnected ? "border-zinc-750 bg-zinc-900/40" : "border-zinc-850 bg-zinc-950/60 hover:border-zinc-750"
            }`}>
              <input type="file" accept=".csv,.xlsx" onChange={handleCsvUpload} disabled={isParsingCSV}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
              {isParsingCSV ? (
                <div className="space-y-2">
                  <div className="h-5 w-5 border-2 border-zinc-650 border-t-zinc-200 rounded-full animate-spin mx-auto" />
                  <p className="text-[11px] text-zinc-500">Menganalisis tabel...</p>
                </div>
              ) : csvFile ? (
                <div className="space-y-1 px-4">
                  <Check className="h-5 w-5 text-white mx-auto" />
                  <p className="text-[12px] text-white font-semibold truncate">{csvFile}</p>
                  <p className="text-[10px] text-zinc-550">14 invoice log terdeteksi</p>
                </div>
              ) : (
                <>
                  <UploadCloud className="h-5 w-5 text-zinc-655 mb-2" />
                  <p className="text-[12px] text-zinc-400 font-medium">Drop file .csv / .xlsx</p>
                  <p className="text-[10px] text-zinc-650 mt-0.5">Format laporan bebas</p>
                </>
              )}
            </div>
          </IntegrationCard>
        </div>

        {/* ── Bottom CTA ────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-6">
          <p className="text-[12px] text-zinc-600 max-w-sm leading-relaxed">
            Kamu bisa menambah atau mencabut akses data source ini kapan saja di menu <span className="text-zinc-400">Settings → Integrations</span>.
          </p>
          <button
            onClick={() => router.push("/sync")}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-white hover:bg-zinc-150 text-black font-semibold text-sm px-6 h-11 rounded-xl transition-all shadow-[0_0_28px_rgba(255,255,255,0.1)] disabled:opacity-20 disabled:pointer-events-none whitespace-nowrap cursor-pointer"
          >
            Bangun Company Memory
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>

      {/* ── OAuth Google Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-[#0c0c0e] border border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-5">
                  <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.927h6.6c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.56-5.17 3.56-8.47z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.27 21.27 7.37 24 12 24z" />
                    <path fill="#FBBC05" d="M5.27 14.29a7.18 7.18 0 0 1 0-4.58V6.62H1.29a11.94 11.94 0 0 0 0 10.76l3.98-3.09z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.27 2.73 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                  </svg>
                  <span className="text-[11px] font-mono text-zinc-550">accounts.google.com</span>
                </div>

                <h2 className="text-[17px] font-semibold text-white mb-1.5">Coretify meminta izin akses</h2>
                <p className="text-zinc-500 text-[12px] leading-relaxed mb-5">
                  Otorisasi read-only pada Workspace Anda untuk diekstrak menjadi Company Memory terpusat.
                </p>

                <div className="space-y-2 mb-5">
                  {SCOPES.map((s) => (
                    <div
                      key={s.key}
                      onClick={() => setScopes((p) => ({ ...p, [s.key]: !p[s.key] }))}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                        scopes[s.key]
                          ? "border-zinc-700/80 bg-zinc-900/50"
                          : "border-zinc-850 bg-transparent opacity-50"
                      }`}
                    >
                      <div className={`shrink-0 mt-0.5 h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                        scopes[s.key] ? "border-white bg-white" : "border-zinc-800"
                      }`}>
                        {scopes[s.key] && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-zinc-200">{s.label}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2.5 p-3 rounded-xl bg-zinc-950/80 border border-zinc-900/40 mb-5">
                  <ShieldCheck className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-500 leading-relaxed">
                    Coretify mematuhi Kebijakan Data API Google. Token dienkripsi AES-256. Tidak ada data yang ditulis ke Workspace Anda.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 h-10 rounded-xl border border-zinc-850 text-zinc-500 hover:text-zinc-350 hover:border-zinc-750 text-[12px] font-medium transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={approveOAuth}
                    className="flex-1 h-10 rounded-xl bg-white hover:bg-zinc-150 text-black text-[12px] font-semibold transition-all cursor-pointer"
                  >
                    Setujui & Lanjutkan
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WhatsApp Fonnte QR Scanner Modal ────────────────────── */}
      <AnimatePresence>
        {showWaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm bg-[#0c0c0e] border border-zinc-800/60 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 text-center space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10.5px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                    WhatsApp Gateway QR Sync
                  </span>
                  {!isWaLinking && (
                    <button
                      onClick={() => setShowWaModal(false)}
                      className="text-zinc-650 hover:text-zinc-300"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <h3 className="text-[16px] font-bold text-white">Tautkan Perangkat WhatsApp</h3>
                <p className="text-zinc-450 text-[11.5px] leading-relaxed max-w-xs mx-auto">
                  Buka WhatsApp di HP Anda &gt; Pengaturan &gt; Perangkat Tertaut &gt; Scan QR Code di bawah untuk sinkronisasi.
                </p>

                {/* QR Code Scan Zone */}
                <div className="relative h-44 w-44 mx-auto bg-zinc-950 border border-zinc-850 rounded-xl flex items-center justify-center overflow-hidden">
                  {/* Styled mock QR grid pixels */}
                  <QrCode className={`h-32 w-32 ${isWaLinking ? "text-zinc-350 opacity-40" : "text-emerald-400 opacity-90"}`} />
                  
                  {isWaLinking && (
                    <>
                      {/* Scanning vertical line animation */}
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"
                        animate={{ top: ["5%", "95%", "5%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <span className="text-[10px] font-bold font-mono text-white bg-black/85 border border-zinc-800 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 animate-pulse">
                          <RefreshCw className="h-3 w-3 animate-spin text-emerald-400" />
                          Menunggu Pemindaian...
                        </span>
                      </div>
                    </>
                  )}

                  {!isWaLinking && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
                      <div className="bg-[#0c0c0e] border border-emerald-500/25 p-2 rounded-xl flex flex-col items-center gap-1">
                        <Check className="h-6 w-6 text-emerald-400 stroke-[3px] bg-emerald-950/30 rounded-full p-1" />
                        <span className="text-[10px] font-bold text-emerald-400">Tersambung!</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-[10.5px] text-zinc-550 font-medium">
                  Status Device: {isWaLinking ? "Mencari tautan..." : "Linked: Julian Albertus"}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── IntegrationCard component ────────────────────────────── */
function IntegrationCard({
  connected, label, badge, icon, desc, bullets, children, selectedInOnboarding,
}: {
  connected: boolean;
  label: string;
  badge: string;
  icon: React.ReactNode;
  desc: string;
  bullets: string[];
  children?: React.ReactNode;
  selectedInOnboarding?: boolean;
}) {
  return (
    <div className={`relative flex flex-col rounded-2xl border bg-[#0c0c0e] p-5 transition-all duration-300 ${
      connected 
        ? "border-zinc-750/70 shadow-[0_0_30px_rgba(255,255,255,0.03)]" 
        : selectedInOnboarding
        ? "border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.03)] bg-[#0e0d0b]/40"
        : "border-zinc-850"
    }`}>
      {/* Connected / Onboarding Badge */}
      {connected ? (
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 text-[10px] font-semibold text-zinc-350 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full">
          <Check className="h-3 w-3" /> Connected
        </div>
      ) : selectedInOnboarding ? (
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/40 border border-amber-500/20 px-2 py-0.5 rounded-full">
          Terpilih di Onboarding
        </div>
      ) : null}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-9 w-9 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-300 shrink-0">
          {icon}
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white leading-none">{label}</p>
          <span className="text-[10px] font-mono text-zinc-650 uppercase tracking-wider">{badge}</span>
        </div>
      </div>

      {/* Desc */}
      <p className="text-[12px] text-zinc-500 leading-relaxed mb-4">{desc}</p>

      {/* Bullets */}
      <div className="space-y-2 mb-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-500">
            <div className="shrink-0 h-[14px] w-[14px] rounded-[3px] border border-zinc-800 bg-zinc-900/50 flex items-center justify-center mt-0.5">
              <Check className="h-[9px] w-[9px] text-zinc-450 stroke-[3px]" />
            </div>
            {b}
          </div>
        ))}
      </div>

      {/* Slot for actions */}
      <div className="mt-auto">{children}</div>
    </div>
  );
}
