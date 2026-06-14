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
  const [showEarlyInsights, setShowEarlyInsights] = useState(false);
  const [playbook, setPlaybook] = useState("Software House");
  const [companyName, setCompanyName] = useState("Perusahaan");

  const [steps, setSteps] = useState<SyncStep[]>([
    { id: "auth", label: "Otorisasi API Handshake", status: "running", subtext: "Menghubungkan token otentikasi aman...", icon: Cpu },
    { id: "gmail", label: "Sinkronisasi Gmail", status: "idle", subtext: "Memindai email historis 6 bulan terakhir...", icon: Mail },
    { id: "calendar", label: "Sinkronisasi Google Calendar", status: "idle", subtext: "Memetakan riwayat janji temu klien...", icon: Calendar },
    { id: "drive", label: "Sinkronisasi Drive & Sheets", status: "idle", subtext: "Membaca dokumen projek & spreadsheet...", icon: HardDrive },
    { id: "ai", label: "Embedding Generation (pgvector)", status: "idle", subtext: "Melakukan enkripsi & pembuatan vektor AI...", icon: Sparkles }
  ]);

  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.businessType) setPlaybook(parsed.businessType);
      if (parsed.name) setCompanyName(parsed.name);
    }
  }, []);

  useEffect(() => {
    // Stage 1: Auth handshake (1s)
    const t1 = setTimeout(() => {
      updateStep(0, "completed");
      updateStep(1, "running");
      setCurrentStepIndex(1);
    }, 1000);

    // Stage 2: Gmail sync (simulate fast count update) (2s)
    const gmailInterval = setInterval(() => {
      setEmailProcessed(prev => {
        if (prev >= 128) {
          clearInterval(gmailInterval);
          return 128;
        }
        return prev + 16;
      });
    }, 200);

    const t2 = setTimeout(() => {
      updateStep(1, "completed");
      updateStep(2, "running");
      setCurrentStepIndex(2);
      // Reveal Gmail partial insights (Wow Moment)
      setShowEarlyInsights(true);
    }, 2500);

    // Stage 3: Calendar sync (1s)
    const t3 = setTimeout(() => {
      updateStep(2, "completed");
      updateStep(3, "running");
      setCurrentStepIndex(3);
    }, 3800);

    // Stage 4: Drive sync
    const driveInterval = setInterval(() => {
      setFilesProcessed(prev => {
        if (prev >= 42) {
          clearInterval(driveInterval);
          return 42;
        }
        return prev + 6;
      });
    }, 150);

    const t4 = setTimeout(() => {
      updateStep(3, "completed");
      updateStep(4, "running");
      setCurrentStepIndex(4);
    }, 5000);

    // Stage 5: Ingestion / vector embedding (1s)
    const t5 = setTimeout(() => {
      updateStep(4, "completed");
      setCurrentStepIndex(5);
    }, 6500);

    // Global percentage simulation
    const pctInterval = setInterval(() => {
      setSyncPercentage(prev => {
        if (prev >= 100) {
          clearInterval(pctInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 120);

    // Redirect to dashboard after completed
    const redirectTimer = setTimeout(() => {
      router.push("/dashboard");
    }, 8500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearInterval(gmailInterval);
      clearInterval(driveInterval);
      clearInterval(pctInterval);
      clearTimeout(redirectTimer);
    };
  }, []);

  const updateStep = (index: number, status: "idle" | "running" | "completed") => {
    setSteps(prev => prev.map((step, i) => i === index ? { ...step, status } : step));
  };

  const getStepStatusBadge = (status: "idle" | "running" | "completed") => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] flex items-center gap-1"><Check className="h-3 w-3" /> Berhasil</Badge>;
      case "running":
        return <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] flex items-center gap-1 animate-pulse"><RefreshCw className="h-3 w-3 animate-spin" /> Proses</Badge>;
      default:
        return <Badge variant="outline" className="text-slate-500 border-slate-900 text-[10px]">Menunggu</Badge>;
    }
  };

  const renderEarlyPlaybookInsight = () => {
    if (playbook === "Software House") {
      return (
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-3 bg-slate-950/40 border border-amber-500/20 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Peringatan Risiko Project</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Terdeteksi 12 email revisi dari klien *Nexa Corp* di Gmail. Playbook Software House mengindikasikan 63% risiko keterlambatan berasal dari revisi pasca-development dimulai.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-950/40 border border-purple-500/20 rounded-xl">
            <Sparkles className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-purple-400">Entitas Terpetakan (Gmail)</h4>
              <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-slate-400 font-mono">
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
      return (
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-3 bg-slate-950/40 border border-amber-500/20 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Peringatan Efisiensi Kapasitas</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Ditemukan korelasi percakapan padat: Klien *Aero Design* memakan 34% volume diskusi tim namun hanya berkontribusi kecil pada log milestone. Risiko efisiensi laba terdeteksi.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-950/40 border border-purple-500/20 rounded-xl">
            <Sparkles className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-purple-400">Entitas Terpetakan (Gmail)</h4>
              <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-slate-400 font-mono">
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
      return (
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 p-3 bg-slate-950/40 border border-amber-500/20 rounded-xl">
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-400">Peringatan Meeting Efisiensi</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Menganalisis meeting calendar: 78% agenda diskusi tim internal minggu lalu tidak memiliki ringkasan tindak lanjut aksi (Action Items) yang terdeteksi di dokumen.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-slate-950/40 border border-purple-500/20 rounded-xl">
            <Sparkles className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-purple-400">Entitas Terpetakan (Gmail)</h4>
              <div className="grid grid-cols-2 gap-2 mt-1.5 text-[10px] text-slate-400 font-mono">
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
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30">
      {/* Background glow animations */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px] animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse duration-[8000ms]" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-16 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Sync Pipeline Status */}
          <div className="md:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-400 uppercase tracking-widest bg-purple-500/5 border border-purple-500/15 px-3 py-1 rounded-full mb-3">
                <RefreshCw className="h-3 w-3 animate-spin" /> Ingestion Pipeline Active
              </div>
              <h1 className="text-2xl font-extrabold text-white">Membangun Memori {companyName}</h1>
              <p className="text-slate-400 text-xs mt-1">
                Konektor aman terhubung. Memetakan graf memori secara progressive.
              </p>
            </div>

            {/* Global progress */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400 font-semibold">Total Progress Indeksasi</span>
                <span className="font-mono text-xs font-bold text-purple-400">{syncPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${syncPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500 font-mono">
                <span>📧 Gmail: {emailsProcessed}/128</span>
                <span>📂 Drive: {filesProcessed}/42 files</span>
              </div>
            </div>

            {/* Detailed Pipeline Steps */}
            <div className="space-y-3.5">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      step.status === "running"
                        ? "bg-purple-950/10 border-purple-500/20 shadow-md"
                        : step.status === "completed"
                        ? "bg-slate-900/20 border-slate-900 opacity-80"
                        : "bg-slate-950/20 border-slate-950 opacity-40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center border ${
                        step.status === "running"
                          ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                          : step.status === "completed"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-slate-900 border-slate-800 text-slate-600"
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
              <Card className="bg-slate-900/40 border-purple-500/20 backdrop-blur-md flex-1 flex flex-col justify-between overflow-hidden shadow-2xl animate-in slide-in-from-right-4 duration-500 sticky top-20">
                <CardHeader className="pb-3 border-b border-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-bold text-white">Wow Moment: Early Insight</CardTitle>
                      <CardDescription className="text-[10px] text-slate-500">
                        Indeksasi Gmail selesai. Menyusun hipotesis awal...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="py-4 space-y-4 flex-1">
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Berdasarkan 128 email di Gmail yang baru saja dipindai (dokumen Drive masih diproses), AI mendeteksi kecocokan dengan playbook **{playbook}**:
                  </p>
                  
                  {renderEarlyPlaybookInsight()}
                </CardContent>

                <div className="p-4 border-t border-slate-900 bg-slate-950/20 text-center flex flex-col gap-2">
                  {currentStepIndex === 5 ? (
                    <Button
                      onClick={() => router.push("/dashboard")}
                      className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg"
                    >
                      Masuk Dashboard
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-[10px] text-purple-400 font-medium animate-pulse">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      <span>Menyelesaikan embedding graf...</span>
                    </div>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="bg-slate-900/10 border-dashed border-slate-800 flex-1 flex flex-col items-center justify-center p-6 text-center min-h-[300px] backdrop-blur-sm">
                <div className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mb-3 animate-pulse">
                  <Cpu className="h-5 w-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-400">Menganalisis Source Tercepat</h4>
                <p className="text-[10px] text-slate-600 mt-1 max-w-[180px] leading-relaxed">
                  Insight pertama dari Gmail akan muncul secara progresif dalam beberapa detik.
                </p>
              </Card>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
