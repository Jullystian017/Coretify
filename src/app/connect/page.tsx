"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
  MessageSquare,
  FileSpreadsheet,
  Check,
  AlertTriangle,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  FolderLock,
  Lock
} from "lucide-react";

export default function ConnectPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("Perusahaan");
  const [googleConnected, setGoogleConnected] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [csvConnected, setCsvConnected] = useState(false);

  // File states
  const [waFile, setWaFile] = useState<string | null>(null);
  const [csvFile, setCsvFile] = useState<string | null>(null);
  const [isParsingWA, setIsParsingWA] = useState(false);
  const [isParsingCSV, setIsParsingCSV] = useState(false);

  // Folder exclusion states
  const [showDriveFolders, setShowDriveFolders] = useState(false);
  const [folders, setFolders] = useState([
    { id: 1, name: "📁 General & Projects", path: "/Projects", selected: true, autoExclude: false },
    { id: 2, name: "📁 Client Presentations", path: "/Clients", selected: true, autoExclude: false },
    { id: 3, name: "📁 HR & Payroll", path: "/HR", selected: false, autoExclude: true },
    { id: 4, name: "📁 Finance & Invoice 2026", path: "/Finance", selected: false, autoExclude: true },
    { id: 5, name: "📁 Marketing Assets", path: "/Marketing", selected: true, autoExclude: false },
  ]);

  // Google OAuth modal
  const [showOAuthModal, setShowOAuthModal] = useState(false);
  const [selectedScopes, setSelectedScopes] = useState({
    gmail: true,
    calendar: true,
    drive: true,
    sheets: true
  });

  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.name) {
        setCompanyName(parsed.name);
      }
    }
  }, []);

  const handleScopeToggle = (scope: "gmail" | "calendar" | "drive" | "sheets") => {
    setSelectedScopes((prev) => ({
      ...prev,
      [scope]: !prev[scope]
    }));
  };

  const handleOAuthApprove = () => {
    setGoogleConnected(true);
    setShowOAuthModal(false);
    
    // Save to localStorage
    const saved = localStorage.getItem("coretify_company");
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.googleConnected = true;
      parsed.excludedFolders = folders.filter(f => !f.selected).map(f => f.path);
      localStorage.setItem("coretify_company", JSON.stringify(parsed));
    }
  };

  const handleFolderToggle = (id: number) => {
    setFolders(folders.map(f => f.id === id ? { ...f, selected: !f.selected } : f));
  };

  const handleWaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsParsingWA(true);
      setTimeout(() => {
        setWaFile(file.name);
        setWhatsappConnected(true);
        setIsParsingWA(false);

        const saved = localStorage.getItem("coretify_company");
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.whatsappConnected = true;
          localStorage.setItem("coretify_company", JSON.stringify(parsed));
        }
      }, 1500);
    }
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsParsingCSV(true);
      setTimeout(() => {
        setCsvFile(file.name);
        setCsvConnected(true);
        setIsParsingCSV(false);

        const saved = localStorage.getItem("coretify_company");
        if (saved) {
          const parsed = JSON.parse(saved);
          parsed.csvConnected = true;
          localStorage.setItem("coretify_company", JSON.stringify(parsed));
        }
      }, 1500);
    }
  };

  const canProceed = googleConnected || whatsappConnected || csvConnected;

  const handleBuildMemory = () => {
    router.push("/sync");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30">
      
      {/* Top Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[1440px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="border-b border-slate-900 bg-[#070708]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-8 h-20 flex items-center justify-between">
          <span className="font-bold text-[15px] tracking-tight text-white">
            Coretify Connect
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] bg-[#0c0c0e] border border-slate-900 px-3.5 py-1.5 rounded-xl">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Read-Only Integration Garansi 100%</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-12">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Hubungkan Memori Bisnis {companyName}
          </h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Coretify bekerja dengan membaca data historis untuk memetakan entitas klien, projek, dan keputusan penting. Hubungkan minimal satu sumber untuk melanjutkan.
          </p>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Google Workspace */}
          <Card className={`bg-[#0c0c0e] border-slate-900 overflow-hidden relative flex flex-col justify-between ${googleConnected ? "ring-1 ring-slate-800" : ""}`}>
            {googleConnected && (
              <div className="absolute top-0 right-0 bg-[#18181b] border-l border-b border-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-400" /> Connected
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-white mb-3">
                <Globe className="h-5 w-5 text-blue-400" />
              </div>
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                Google Workspace
                <Badge variant="outline" className="text-[9px] text-slate-400 border-slate-900 bg-slate-950">Recommended</Badge>
              </CardTitle>
              <CardDescription className="text-slate-450 text-[11px]">
                Sinkronisasi Gmail, Google Calendar, dan Drive/Sheets secara terpadu.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="space-y-2.5 text-[11px]">
                <div className="flex items-start gap-2 text-slate-350">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Membaca email historis untuk memetakan korespondensi klien.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-350">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Memetakan timeline meeting & keputusan dari kalender.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-400">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span className="text-slate-450">Tidak ada hak akses menulis (read-only). Tidak bisa mengirim email/mengedit file.</span>
                </div>
              </div>

              {/* Collapsible Folder Select */}
              {googleConnected && (
                <div className="border border-slate-900 rounded-xl bg-[#08080a] p-3.5 mt-3 animate-in slide-in-from-top-2 duration-300">
                  <button
                    onClick={() => setShowDriveFolders(!showDriveFolders)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <FolderLock className="h-4 w-4 text-slate-400" />
                      Atur Folder Drive Ter-exclude
                    </span>
                    {showDriveFolders ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {showDriveFolders && (
                    <div className="mt-3.5 space-y-2 border-t border-slate-900 pt-3 animate-in fade-in duration-300">
                      <p className="text-[10px] text-slate-500 mb-2 leading-relaxed">
                        Kami secara otomatis mengecualikan folder bernada HR/Payroll/Finance demi keamanan data sensitif. Centang folder yang ingin dipindai:
                      </p>
                      {folders.map((folder) => (
                        <div key={folder.id} className="flex items-center justify-between p-1.5 hover:bg-slate-900/40 rounded transition-colors">
                          <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={folder.selected}
                              onChange={() => handleFolderToggle(folder.id)}
                              className="rounded border-slate-800 bg-slate-900 text-purple-600 focus:ring-0 cursor-pointer"
                            />
                            {folder.name}
                          </label>
                          {folder.autoExclude && (
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-amber-500/10 text-amber-400 border-amber-500/20 flex items-center gap-1">
                              <Lock className="h-2 w-2" /> Auto-Excluded
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2 border-t border-slate-900 bg-[#08080a]/40 px-6 py-4">
              <Button
                onClick={() => setShowOAuthModal(true)}
                className={`w-full font-semibold rounded-xl text-xs py-4.5 ${googleConnected ? "bg-[#18181b] hover:bg-[#27272a] text-slate-300 border border-[#2e2e33]" : "bg-white hover:bg-slate-100 text-black"}`}
              >
                {googleConnected ? "Hubungkan Ulang Google" : "Connect Google Workspace"}
              </Button>
            </CardFooter>
          </Card>

          {/* Card 2: WhatsApp Lite */}
          <Card className={`bg-[#0c0c0e] border-slate-900 flex flex-col justify-between overflow-hidden relative ${whatsappConnected ? "ring-1 ring-slate-800" : ""}`}>
            {whatsappConnected && (
              <div className="absolute top-0 right-0 bg-[#18181b] border-l border-b border-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-400" /> Connected
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-white mb-3">
                <MessageSquare className="h-5 w-5 text-emerald-500" />
              </div>
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                WhatsApp Lite
                <Badge variant="outline" className="text-[9px] text-slate-400 border-slate-900 bg-slate-950">No API Needed</Badge>
              </CardTitle>
              <CardDescription className="text-slate-450 text-[11px]">
                Unggah hasil ekspor obrolan `.txt` untuk ekstraksi keputusan & task.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="space-y-2 text-[11px]">
                <div className="flex items-start gap-2 text-slate-350">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Ekstraksi komitmen tindakan dan kesepakatan klien secara instan.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-350">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Keamanan penuh: Data hanya dibaca sekali untuk di-indeks.</span>
                </div>
              </div>

              {/* Drag and Drop Uploader */}
              <div className="relative border-2 border-dashed border-slate-900 rounded-xl p-4 bg-[#08080a] hover:border-slate-800 transition-all text-center flex flex-col items-center justify-center min-h-[120px]">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleWaUpload}
                  disabled={isParsingWA}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {isParsingWA ? (
                  <div className="space-y-2">
                    <div className="h-5 w-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[10px] text-slate-400 font-medium">Menganalisis chat WhatsApp...</p>
                  </div>
                ) : waFile ? (
                  <div className="space-y-1">
                    <Check className="h-7 w-7 text-emerald-500 mx-auto" />
                    <p className="text-[11px] text-white font-semibold">{waFile}</p>
                    <p className="text-[9px] text-emerald-500">Berhasil diekstrak (45 chat lines, 3 task ditemukan)</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="h-6 w-6 text-slate-600 mb-2" />
                    <p className="text-xs text-slate-300 font-semibold">Tarik & Lepas File .txt</p>
                    <p className="text-[10px] text-slate-550 mt-1">Gunakan fitur 'Export Chat' dari WA HP Anda</p>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-2 border-t border-slate-900 bg-[#08080a]/40 px-6 py-4">
              <div className="text-[10px] text-slate-500 text-center w-full">
                Sangat aman & cocok untuk mendeteksi diskusi klien yang sering terlewat.
              </div>
            </CardFooter>
          </Card>

          {/* Card 3: CSV/Excel Upload */}
          <Card className={`bg-[#0c0c0e] border-slate-900 flex flex-col justify-between overflow-hidden relative md:col-span-2 ${csvConnected ? "ring-1 ring-slate-800" : ""}`}>
            {csvConnected && (
              <div className="absolute top-0 right-0 bg-[#18181b] border-l border-b border-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-400" /> Connected
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-white mb-3">
                <FileSpreadsheet className="h-5 w-5 text-amber-500" />
              </div>
              <CardTitle className="text-sm font-bold text-white flex items-center gap-2">
                Unggah CSV/Excel (Data Keuangan/Log)
                <Badge variant="outline" className="text-[9px] text-slate-400 border-slate-900 bg-slate-950">Generic Data</Badge>
              </CardTitle>
              <CardDescription className="text-slate-450 text-[11px]">
                Membantu memetakan tagihan invoice, cashflow, atau log transaksi sebagai context pendukung Company Memory.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2 text-[11px]">
                <div className="flex items-start gap-2 text-slate-350">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Membaca log data piutang/revenue untuk korelasi profitabilitas klien.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-350">
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Kompatibel dengan ekspor spreadsheet Accurate, Jurnal, atau manual log.</span>
                </div>
              </div>

              {/* Drag and Drop Uploader */}
              <div className="relative border-2 border-dashed border-slate-900 rounded-xl p-4 bg-[#08080a] hover:border-slate-800 transition-all text-center flex flex-col items-center justify-center min-h-[110px]">
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleCsvUpload}
                  disabled={isParsingCSV}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {isParsingCSV ? (
                  <div className="space-y-2">
                    <div className="h-5 w-5 border-2 border-slate-500 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-[10px] text-slate-400 font-medium">Menganalisis tabel file...</p>
                  </div>
                ) : csvFile ? (
                  <div className="space-y-1">
                    <Check className="h-7 w-7 text-emerald-500 mx-auto" />
                    <p className="text-[11px] text-white font-semibold">{csvFile}</p>
                    <p className="text-[9px] text-emerald-550">Berhasil dipetakan (14 invoice log transaksi terdeteksi)</p>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="h-6 w-6 text-slate-600 mb-2" />
                    <p className="text-xs text-slate-300 font-semibold">Tarik & Lepas File .csv / .xlsx</p>
                    <p className="text-[10px] text-slate-550 mt-1">Format laporan penjualan/invoice bebas</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Footer Build CTA */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Kamu bisa menambah, menghapus, atau membatalkan izin data source ini kapan saja di menu Settings.
          </div>
          <Button
            onClick={handleBuildMemory}
            disabled={!canProceed}
            className={`px-8 py-6 rounded-full font-bold transition-all ${canProceed ? "bg-white hover:bg-slate-100 text-black shadow-md scale-[1.01]" : "bg-[#0c0c0e] border border-slate-900 text-slate-550 cursor-not-allowed"}`}
          >
            Bangun Company Memory
            <ArrowRight className="h-4.5 w-4.5 ml-2" />
          </Button>
        </div>
      </main>

      {/* Google Workspace OAuth Simulation Modal */}
      {showOAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-full max-w-lg bg-[#0c0c0e] border-slate-900 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6">
              {/* Google Brand Header */}
              <div className="flex items-center gap-2 mb-6">
                <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.927h6.6c-.29 1.5-1.14 2.77-2.4 3.61v3h3.86c2.26-2.09 3.56-5.17 3.56-8.47z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.27 21.27 7.37 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.29a7.18 7.18 0 0 1 0-4.58V6.62H1.29a11.94 11.94 0 0 0 0 10.76l3.98-3.09z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.27 2.73 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </svg>
                <span className="font-semibold text-slate-350 text-xs font-mono">Sign in with Google</span>
              </div>

              <h2 className="text-lg font-bold text-white mb-2">Coretify meminta izin akses data</h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Coretify Labs memerlukan otorisasi read-only pada data-data Workspace berikut untuk diekstrak menjadi satu Company Memory terpusat.
              </p>

              {/* Scopes checklist */}
              <div className="space-y-3 mb-6 text-xs">
                <div
                  onClick={() => handleScopeToggle("gmail")}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedScopes.gmail ? "bg-slate-950/40 border-slate-800" : "bg-transparent border-slate-900 opacity-60"}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedScopes.gmail}
                    readOnly
                    className="mt-0.5 rounded border-slate-800 text-purple-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Read-only akses Gmail</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Memindai isi email untuk mendeteksi diskusi projek dan klien. Coretify TIDAK BISA mengirim email.</p>
                  </div>
                </div>

                <div
                  onClick={() => handleScopeToggle("calendar")}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedScopes.calendar ? "bg-slate-950/40 border-slate-800" : "bg-transparent border-slate-900 opacity-60"}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedScopes.calendar}
                    readOnly
                    className="mt-0.5 rounded border-slate-800 text-purple-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Read-only akses Google Calendar</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Memindai riwayat meeting untuk mendeteksi timelines projek dan janji temu.</p>
                  </div>
                </div>

                <div
                  onClick={() => handleScopeToggle("drive")}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedScopes.drive ? "bg-slate-950/40 border-slate-800" : "bg-transparent border-slate-900 opacity-60"}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedScopes.drive}
                    readOnly
                    className="mt-0.5 rounded border-slate-800 text-purple-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Read-only akses Google Drive</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Membaca dokumen dan file pendukung. Folder bernada HR & Finance akan ter-exclude secara otomatis.</p>
                  </div>
                </div>

                <div
                  onClick={() => handleScopeToggle("sheets")}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${selectedScopes.sheets ? "bg-slate-950/40 border-slate-800" : "bg-transparent border-slate-900 opacity-60"}`}
                >
                  <input
                    type="checkbox"
                    checked={selectedScopes.sheets}
                    readOnly
                    className="mt-0.5 rounded border-slate-800 text-purple-600 focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">Read-only akses Google Sheets</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Membaca data spreadsheet kustom yang berisi invoice operasional atau backlog kerja.</p>
                  </div>
                </div>
              </div>

              {/* Safety warning */}
              <div className="flex gap-2.5 p-3 rounded-xl bg-[#08080a] border border-slate-900 mb-6">
                <Lock className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-450 leading-normal">
                  Coretify mematuhi Kebijakan Data Pengguna Layanan API Google, termasuk ketentuan Penggunaan Terbatas. Token Anda dienkripsi AES-256 tingkat perbankan.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowOAuthModal(false)}
                  className="text-xs text-slate-500 hover:text-white"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleOAuthApprove}
                  className="bg-white hover:bg-slate-100 text-black font-semibold text-xs px-5 py-3 rounded-full"
                >
                  Setujui & Lanjutkan
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
