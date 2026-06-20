"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Check,
  Mail,
  Calendar,
  HardDrive,
  Cpu,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  FileSpreadsheet
} from "lucide-react";

interface SyncStep {
  id: string;
  label: string;
  status: "idle" | "running" | "completed";
  subtext: string;
  icon: any;
}

export default function SyncPage() {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [syncPercentage, setSyncPercentage] = useState(0);
  const [emailsProcessed, setEmailProcessed] = useState(0);
  const [filesProcessed, setFilesProcessed] = useState(0);
  const [whatsappProcessed, setWhatsappProcessed] = useState(0);
  const [csvProcessed, setCsvProcessed] = useState(0);
  const [showEarlyInsights, setShowEarlyInsights] = useState(false);
  const [playbook, setPlaybook] = useState("Software House");
  const [companyName, setCompanyName] = useState("Perusahaan");

  const [hasGmail, setHasGmail] = useState(false);
  const [hasDrive, setHasDrive] = useState(false);
  const [hasWhatsapp, setHasWhatsapp] = useState(false);
  const [hasCsv, setHasCsv] = useState(false);

  const [steps, setSteps] = useState<SyncStep[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    let activeSteps: SyncStep[] = [
      { id: "auth", label: "Otorisasi API Handshake", status: "running", subtext: "Menghubungkan token otentikasi aman...", icon: Cpu }
    ];
    let googleConnected = false;
    let whatsappConnected = false;
    let csvConnected = false;
    let scopes: Record<string, boolean> = { gmail: true, calendar: true, drive: true, sheets: true };
    
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.businessType) setPlaybook(parsed.businessType);
      if (parsed.name) setCompanyName(parsed.name);
      
      googleConnected = !!parsed.googleConnected;
      whatsappConnected = !!parsed.whatsappConnected;
      csvConnected = !!parsed.csvConnected;
      if (parsed.googleScopes) {
        scopes = parsed.googleScopes;
      }
    } else {
      googleConnected = true; // fallback
    }

    const hasGmailSelected = googleConnected && scopes.gmail;
    const hasCalendarSelected = googleConnected && scopes.calendar;
    const hasDriveSelected = googleConnected && (scopes.drive || scopes.sheets);

    setHasGmail(hasGmailSelected);
    setHasDrive(hasDriveSelected);
    setHasWhatsapp(whatsappConnected);
    setHasCsv(csvConnected);

    if (hasGmailSelected) {
      activeSteps.push({ id: "gmail", label: "Sinkronisasi Gmail", status: "idle", subtext: "Memindai email historis 6 bulan terakhir...", icon: Mail });
    }
    if (hasCalendarSelected) {
      activeSteps.push({ id: "calendar", label: "Sinkronisasi Google Calendar", status: "idle", subtext: "Memetakan riwayat janji temu klien...", icon: Calendar });
    }
    if (hasDriveSelected) {
      activeSteps.push({ id: "drive", label: "Sinkronisasi Drive & Sheets", status: "idle", subtext: "Membaca dokumen projek & spreadsheet...", icon: HardDrive });
    }
    if (whatsappConnected) {
      activeSteps.push({ id: "whatsapp", label: "Sinkronisasi WhatsApp Chat", status: "idle", subtext: "Membaca komitmen & keputusan dari chat export...", icon: MessageSquare });
    }
    if (csvConnected) {
      activeSteps.push({ id: "csv", label: "Sinkronisasi CSV & Excel", status: "idle", subtext: "Menganalisis log transaksi & data keuangan...", icon: FileSpreadsheet });
    }
    
    activeSteps.push({ id: "ai", label: "Embedding Generation (pgvector)", status: "idle", subtext: "Melakukan enkripsi & pembuatan vektor AI...", icon: Sparkles });

    setSteps(activeSteps);

    // Dynamic timer sequence execution
    let timers: any[] = [];
    let intervals: any[] = [];

    const runStepSequence = (index: number) => {
      if (index >= activeSteps.length) {
        setCurrentStepIndex(activeSteps.length);
        const redirectTimer = setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
        timers.push(redirectTimer);
        return;
      }

      setCurrentStepIndex(index);
      setSteps(prev => prev.map((step, i) => {
        if (i === index) return { ...step, status: "running" };
        if (i < index) return { ...step, status: "completed" };
        return step;
      }));

      const currentStep = activeSteps[index];

      // Duration for this step
      let duration = 1200;
      if (currentStep.id === "auth") duration = 1000;
      else if (currentStep.id === "gmail") duration = 1500;
      else if (currentStep.id === "drive") duration = 1200;
      else if (currentStep.id === "whatsapp") duration = 1500;
      else if (currentStep.id === "csv") duration = 1200;

      // Handle step specific simulations
      if (currentStep.id === "gmail") {
        const gmailInterval = setInterval(() => {
          setEmailProcessed(prev => Math.min(128, prev + 16));
        }, 150);
        intervals.push(gmailInterval);
      } else if (currentStep.id === "drive") {
        const driveInterval = setInterval(() => {
          setFilesProcessed(prev => Math.min(42, prev + 6));
        }, 150);
        intervals.push(driveInterval);
      } else if (currentStep.id === "whatsapp") {
        const waInterval = setInterval(() => {
          setWhatsappProcessed(prev => Math.min(45, prev + 5));
        }, 150);
        intervals.push(waInterval);
      } else if (currentStep.id === "csv") {
        const csvInterval = setInterval(() => {
          setCsvProcessed(prev => Math.min(14, prev + 2));
        }, 150);
        intervals.push(csvInterval);
      }

      const t = setTimeout(() => {
        // First source finishes (could be gmail, whatsapp, csv) -> show early insights
        if (currentStep.id === "gmail" || currentStep.id === "whatsapp" || currentStep.id === "csv") {
          setShowEarlyInsights(true);
        }
        
        // Clean up intervals for this step
        if (currentStep.id === "gmail") setEmailProcessed(128);
        if (currentStep.id === "drive") setFilesProcessed(42);
        if (currentStep.id === "whatsapp") setWhatsappProcessed(45);
        if (currentStep.id === "csv") setCsvProcessed(14);

        setSteps(prev => prev.map((step, i) => i === index ? { ...step, status: "completed" } : step));
        runStepSequence(index + 1);
      }, duration);
      timers.push(t);
    };

    // Run the sequence starting from auth handshake
    runStepSequence(0);

    // Smooth progress bar calculation based on active steps total duration
    const stepDurations = activeSteps.map(s => {
      if (s.id === "auth") return 1000;
      if (s.id === "gmail") return 1500;
      if (s.id === "calendar") return 1200;
      if (s.id === "drive") return 1200;
      if (s.id === "whatsapp") return 1500;
      if (s.id === "csv") return 1200;
      return 1500; // ai
    });
    const totalDuration = stepDurations.reduce((a, b) => a + b, 0);
    const intervalTick = totalDuration / 50;

    const pctInterval = setInterval(() => {
      setSyncPercentage(prev => {
        if (prev >= 100) {
          clearInterval(pctInterval);
          return 100;
        }
        return prev + 2;
      });
    }, intervalTick);
    intervals.push(pctInterval);

    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);

  const getStepStatusBadge = (status: "idle" | "running" | "completed") => {
    switch (status) {
      case "completed":
        return <Badge className="bg-[#18181b] text-emerald-400 border border-slate-900 text-[10px] flex items-center gap-1 font-bold"><Check className="h-3 w-3" /> Berhasil</Badge>;
      case "running":
        return <Badge className="bg-[#18181b] text-white border border-[#2e2e33] text-[10px] flex items-center gap-1 animate-pulse font-bold"><RefreshCw className="h-3 w-3 animate-spin text-slate-400" /> Proses</Badge>;
      default:
        return <Badge variant="outline" className="text-slate-600 border-slate-900 text-[10px] bg-transparent">Menunggu</Badge>;
    }
  };

  const renderEarlyPlaybookInsight = () => {
    const entitasLabel = hasGmail ? "Gmail" : hasWhatsapp ? "WhatsApp" : "CSV";
    const detailText = hasGmail 
      ? `Terdeteksi 12 email revisi dari klien *Nexa Corp* di Gmail. Playbook ${playbook} mengindikasikan 63% risiko keterlambatan berasal dari revisi pasca-development dimulai.`
      : hasWhatsapp
      ? `Terdeteksi 4 obrolan revisi dari klien *Nexa Corp* di WhatsApp. Playbook ${playbook} mengindikasikan 63% risiko keterlambatan berasal dari revisi pasca-development dimulai.`
      : `Membaca invoice dan log keuangan dari file CSV. Playbook ${playbook} mendeteksi anomali tagihan pada *Nexa Corp*.`;

    if (playbook === "Software House") {
      return (
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-3.5 bg-[#08080a] border border-slate-900 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Peringatan Risiko Project</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {detailText}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-[#08080a] border border-slate-900 rounded-xl">
            <Sparkles className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Entitas Terpetakan ({entitasLabel})</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] text-slate-500 font-mono">
                <div>👥 12 Clients</div>
                <div>📁 3 Active Projects</div>
                <div>📍 Nexa Corp Rev</div>
                <div>🚀 Coretify Dev</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (playbook === "Agency") {
      const detailTextAgency = hasGmail 
        ? "Ditemukan korelasi percakapan padat: Klien *Aero Design* memakan 34% volume diskusi tim namun hanya berkontribusi kecil pada log milestone. Risiko efisiensi laba terdeteksi."
        : hasWhatsapp
        ? "Ditemukan korelasi percakapan padat: Klien *Aero Design* memakan 34% volume chat WhatsApp namun hanya berkontribusi kecil pada log milestone. Risiko efisiensi laba terdeteksi."
        : "Menganalisis data invoice CSV: Klien *Aero Design* menyumbang 12% revenue namun memiliki frekuensi tagihan revisi paling tinggi.";
      return (
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-3.5 bg-[#08080a] border border-slate-900 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Peringatan Efisiensi Kapasitas</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {detailTextAgency}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-[#08080a] border border-slate-900 rounded-xl">
            <Sparkles className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Entitas Terpetakan ({entitasLabel})</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] text-slate-500 font-mono">
                <div>👥 18 Creative Clients</div>
                <div>📁 8 Campaign Jobs</div>
                <div>📍 Churn Risk: Low</div>
                <div>📈 Volume: High</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // Startup or Consultant / Fallback
      const detailTextStartup = hasGmail
        ? "Menganalisis meeting calendar: 78% agenda diskusi tim internal minggu lalu tidak memiliki ringkasan tindak lanjut aksi (Action Items) yang terdeteksi di dokumen."
        : hasWhatsapp
        ? "Menganalisis chat WhatsApp: 78% diskusi tim internal di grup koordinasi tidak memiliki ringkasan tindak lanjut aksi (Action Items) yang jelas."
        : "Membaca cashflow dari file CSV: runway keuangan startup tersisa 6.5 bulan berdasarkan pengeluaran cloud server scaling dan gaji developer.";
      return (
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-3.5 bg-[#08080a] border border-slate-900 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Peringatan Meeting Efisiensi</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {detailTextStartup}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3.5 bg-[#08080a] border border-slate-900 rounded-xl">
            <Sparkles className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white">Entitas Terpetakan ({entitasLabel})</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-[10px] text-slate-500 font-mono">
                <div>👥 5 Investors/Partners</div>
                <div>📁 4 Product Epics</div>
                <div>🎯 Goal Alignment: 40%</div>
                <div>📅 Meetings Analyzed: 24</div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30">
      
      {/* Top Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[1360px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-8 py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Sync Pipeline Status */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-455 uppercase tracking-wider bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full mb-3">
                <RefreshCw className="h-3 w-3 animate-spin" /> Ingestion Pipeline Active
              </div>
              <h1 className="text-2xl font-bold text-white">Membangun Memori {companyName}</h1>
              <p className="text-slate-455 text-xs mt-1">
                Konektor aman terhubung. Memetakan graf memori secara progressive.
              </p>
            </div>

            {/* Global progress */}
            <div className="bg-[#0c0c0e] border border-slate-900 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold">Total Progress Indeksasi</span>
                <span className="font-mono text-xs font-bold text-white">{syncPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${syncPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] text-slate-550 font-mono">
                {hasGmail && <span>📧 Gmail: {emailsProcessed}/128</span>}
                {hasDrive && <span>📂 Drive: {filesProcessed}/42 files</span>}
                {hasWhatsapp && <span>💬 WhatsApp: {whatsappProcessed}/45 lines</span>}
                {hasCsv && <span>📊 CSV: {csvProcessed}/14 rows</span>}
              </div>
            </div>

            {/* Detailed Pipeline Steps */}
            <div className="space-y-3">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      step.status === "running"
                        ? "bg-[#0c0c0e] border-slate-800 shadow"
                        : step.status === "completed"
                        ? "bg-[#0c0c0e]/40 border-slate-900/60 opacity-80"
                        : "bg-transparent border-slate-950 opacity-40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8.5 w-8.5 rounded-lg flex items-center justify-center border ${
                        step.status === "running"
                          ? "bg-slate-900 border-slate-800 text-white"
                          : step.status === "completed"
                          ? "bg-[#0c0c0e] border-slate-900 text-emerald-400"
                          : "bg-slate-950 border-slate-950 text-slate-650"
                      }`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{step.label}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{step.subtext}</p>
                      </div>
                    </div>
                    {getStepStatusBadge(step.status)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Progressive Reveal UI (Wow Moment) */}
          <div className="md:col-span-5 flex flex-col h-full">
            {showEarlyInsights ? (
              <Card className="bg-[#0c0c0e] border-slate-900 flex-1 flex flex-col justify-between overflow-hidden shadow-2xl animate-in slide-in-from-right-4 duration-550 sticky top-20">
                <CardHeader className="pb-3 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-bold text-white">Wow Moment: Early Insight</CardTitle>
                      <CardDescription className="text-[10px] text-slate-555">
                        Indeksasi {hasGmail ? "Gmail" : hasWhatsapp ? "WhatsApp" : "CSV"} selesai. Menyusun hipotesis awal...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-4 space-y-4 flex-1">
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Berdasarkan {hasGmail ? `${emailsProcessed} email di Gmail` : hasWhatsapp ? `${whatsappProcessed} baris chat WhatsApp` : `${csvProcessed} baris log CSV`} yang baru saja dipindai, AI mendeteksi kecocokan dengan playbook **{playbook}**:
                  </p>
                  
                  {renderEarlyPlaybookInsight()}
                </CardContent>

                <div className="p-4 border-t border-slate-900 bg-[#08080a]/40 text-center flex flex-col gap-2">
                  {currentStepIndex === steps.length ? (
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="w-full bg-white hover:bg-slate-100 text-black font-bold text-xs py-3.5 rounded-md shadow"
                    >
                      Masuk Dashboard
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-semibold animate-pulse">
                      <RefreshCw className="h-3 w-3 animate-spin text-slate-500" />
                      <span>Menyelesaikan embedding graf...</span>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="bg-[#0c0c0e]/10 border-dashed border-slate-900 flex-1 flex flex-col items-center justify-center p-6 text-center min-h-[300px]">
                <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-650 mb-3 animate-pulse">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-500">Menganalisis Source Tercepat</h4>
                <p className="text-[10px] text-slate-600 mt-1 max-w-[180px] leading-relaxed">
                  Insight pertama dari {hasGmail ? "Gmail" : hasWhatsapp ? "WhatsApp" : "CSV"} akan muncul secara progresif dalam beberapa detik.
                </p>
              </Card>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
