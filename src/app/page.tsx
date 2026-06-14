"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  ArrowRight,
  Bot,
  MessageSquare,
  ShieldCheck,
  Check,
  Zap,
  Lock,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Mail,
  Network
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [typedText, setTypedText] = useState("");
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [demoAnswer, setDemoAnswer] = useState<string | null>(null);
  const [demoCitations, setDemoCitations] = useState<any[]>([]);

  const presets = [
    {
      q: "Apa project yang berisiko terlambat?",
      a: "Berdasarkan analisis Gmail & Calendar, Project Nexa Web App terindikasi terlambat 5 hari dari timeline awal. Ditemukan 12 email revisi dari klien pasca-development berjalan.",
      c: [{ name: "Email Budi (Subject:Nex Revision Request)", type: "Email" }]
    },
    {
      q: "Client mana yang belum di-follow-up?",
      a: "Vista Retail terdeteksi belum menerima email respons sejak 14 hari yang lalu. Biasanya tim Anda berkorespondensi setiap 3 hari sekali.",
      c: [{ name: "Gmail Index / Vista Retail Inbox", type: "Email" }]
    },
    {
      q: "Kenapa Project Mobile App telat?",
      a: "Terjadi pergeseran timeline pengerjaan mockup wireframe karena 4 kali revisi layout utama yang diminta client via WhatsApp Group Chat.",
      c: [{ name: "WhatsApp Lite / Group Chat Export", type: "Chat" }]
    }
  ];

  const handleStartOnboarding = () => {
    router.push("/onboarding");
  };

  // Typing effect animation when clicking preset questions
  const clickPreset = (idx: number) => {
    setActivePreset(idx);
    setDemoAnswer(null);
    setTypedText("");
    
    const targetQ = presets[idx].q;
    let currentIdx = 0;
    
    const interval = setInterval(() => {
      setTypedText((prev) => prev + targetQ.charAt(currentIdx));
      currentIdx++;
      if (currentIdx >= targetQ.length) {
        clearInterval(interval);
        
        // Show answer after brief delay
        setTimeout(() => {
          setDemoAnswer(presets[idx].a);
          setDemoCitations(presets[idx].c);
        }, 600);
      }
    }, 45);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 relative overflow-hidden font-sans">
      {/* Background glow meshes */}
      <div className="absolute top-[-10%] left-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />
      <div className="absolute top-[30%] right-[10%] -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-[160px]" />
      <div className="absolute bottom-[-10%] left-[20%] -z-10 h-[500px] w-[500px] rounded-full bg-pink-500/5 blur-[120px]" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Coretify
            </span>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] py-0 px-2 font-mono">
              Indonesian playbooks
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#demo" className="transition-colors hover:text-white">Live Demo</a>
            <a href="#features" className="transition-colors hover:text-white">Playbooks</a>
            <a href="#security" className="transition-colors hover:text-white">Keamanan</a>
            <a href="/privacy" className="transition-colors hover:text-white">Privacy Policy</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleStartOnboarding}
              className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4.5 py-4 rounded-xl shadow-lg shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Free Trial
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl px-6 pt-16 pb-24 sm:pt-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-semibold text-purple-300">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>AI Company Memory untuk Software House, Agency, & Startup</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Tanyakan Apa Saja Pada{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
              Memori Bisnismu
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl mx-auto">
            Coretify menghubungkan Gmail, Drive, Calendar, dan WhatsApp menjadi satu Company Memory terpusat yang siap menjawab kendala operasional, risiko keterlambatan project, dan performa tim Anda.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Button
              onClick={handleStartOnboarding}
              size="lg"
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-xl shadow-purple-500/25 transition-all rounded-xl"
            >
              Mulai Bangun Memory
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <a href="#demo">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-800 bg-slate-900/50 text-slate-200 hover:bg-slate-900 hover:text-white rounded-xl transition-all"
              >
                Coba Demo Bar Pencarian
              </Button>
            </a>
          </div>
        </div>

        {/* SECTION: LIVE SEARCH BAR DEMO */}
        <section id="demo" className="max-w-2xl mx-auto mb-28 scroll-mt-24">
          <div className="text-center mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Interactive Preview</h3>
            <p className="text-slate-400 text-xs mt-1">Pilih pertanyaan di bawah untuk mensimulasikan pencarian memori</p>
          </div>

          <Card className="bg-slate-900/40 border-slate-900 p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 h-[100px] w-[100px] bg-purple-600/5 blur-3xl rounded-full" />
            
            {/* Search Input Simulation */}
            <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-850 p-3 rounded-xl mb-4">
              <Bot className="h-4.5 w-4.5 text-purple-400 shrink-0" />
              <div className="text-xs text-white flex-1 font-mono min-h-[1.2rem]">
                {typedText || <span className="text-slate-600">Klik pertanyaan di bawah...</span>}
                <span className="w-1.5 h-3 bg-purple-400 inline-block animate-pulse ml-0.5" />
              </div>
            </div>

            {/* Presets List */}
            <div className="flex flex-wrap gap-2 mb-6">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => clickPreset(idx)}
                  className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    activePreset === idx
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {preset.q}
                </button>
              ))}
            </div>

            {/* Answer Display */}
            {demoAnswer && (
              <div className="border-t border-slate-850 pt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-450">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/10 text-xs text-slate-300 leading-relaxed">
                  {demoAnswer}
                </div>
                
                {/* Citations Preview */}
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <span>Referensi terverifikasi:</span>
                  {demoCitations.map((cit, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 inline-flex items-center gap-1">
                      {cit.name} <ExternalLink className="h-2 w-2" />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </section>

        {/* PLAYBOOK VERTICAL HIGHLIGHTS */}
        <section id="features" className="mb-28 scroll-mt-24 space-y-12">
          <div className="max-w-xl mx-auto space-y-2 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Insight Spesifik Sesuai Bidang Usahamu</h2>
            <p className="text-slate-400 text-xs">
              Satu engine memori dengan 3 playbook vertical kustom. Kami tahu persis apa yang Anda cari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <Card className="bg-slate-900/30 border-slate-900 p-6 flex flex-col justify-between backdrop-blur-md">
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white">Playbook Software House</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Fokus mendeteksi project delay, resiko scope creep, kelebihan beban developer, dan hilangnya knowledge terdokumentasi akibat pergantian tim.
                </p>
              </div>
              <span className="text-[10px] text-purple-400 font-bold mt-4 flex items-center gap-0.5">Selengkapnya <ChevronRight className="h-3 w-3" /></span>
            </Card>

            <Card className="bg-slate-900/30 border-slate-900 p-6 flex flex-col justify-between backdrop-blur-md">
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                  <Mail className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white">Playbook Creative Agency</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Memantau korelasi kapasitas tim vs profit margin klien bulanan. Mendeteksi churn risk berdasarkan frekuensi obrolan email klien yang merosot.
                </p>
              </div>
              <span className="text-[10px] text-pink-400 font-bold mt-4 flex items-center gap-0.5">Selengkapnya <ChevronRight className="h-3 w-3" /></span>
            </Card>

            <Card className="bg-slate-900/30 border-slate-900 p-6 flex flex-col justify-between backdrop-blur-md">
              <div className="space-y-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <Network className="h-4.5 w-4.5" />
                </div>
                <h4 className="text-sm font-bold text-white">Playbook Startup</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Menilai efisiensi rapat tim internal, menyelaraskan target OKR dengan aktivitas aktual dokumen, serta melacak runway keuangan via spreadsheet logs.
                </p>
              </div>
              <span className="text-[10px] text-blue-400 font-bold mt-4 flex items-center gap-0.5">Selengkapnya <ChevronRight className="h-3 w-3" /></span>
            </Card>
          </div>
        </section>

        {/* SECURITY & TRUST PILLARS */}
        <section id="security" className="max-w-3xl mx-auto mb-28 p-8 rounded-2xl bg-slate-900/20 border border-slate-900/80 backdrop-blur-md text-left space-y-8">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-5.5 w-5.5 text-emerald-400" />
              Keamanan Data & Privasi adalah Prioritas Utama
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Coretify didesain dengan arsitektur privasi super ketat agar data perusahaan Anda aman 100% dan bebas dari penyalahgunaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-200">
                <Check className="h-4 w-4 text-emerald-400" /> Guaranteed Read-Only
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pl-6">
                Tidak ada connector yang meminta hak akses menulis. Coretify tidak bisa mengirim email, mengubah file Drive, atau memodifikasi data Anda.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-200">
                <Check className="h-4 w-4 text-emerald-400" /> Folder-Level Control
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pl-6">
                Pilih folder Drive mana saja yang boleh dipindai. Folder keuangan, gaji (Payroll), dan HR akan dikecualikan secara otomatis secara default.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-200">
                <Check className="h-4 w-4 text-emerald-400" /> Row-Level Security
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pl-6">
                Membatasi ekstraksi RAG berdasarkan role user (Owner, Manager, Member). Member tidak akan pernah bisa mengakses data terbatas finansial.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 font-semibold text-slate-200">
                <Check className="h-4 w-4 text-emerald-400" /> Instant Wipe Guarantee
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pl-6">
                Kapan saja Anda mencabut akses, Anda bisa memicu hapus total. Seluruh data index memori di database Supabase kami akan langsung dibersihkan.
              </p>
            </div>
          </div>
        </section>

        {/* PRICING TABLE CARD */}
        <section className="mb-24 space-y-8">
          <div className="max-w-md mx-auto text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Skema Harga & Batas Penggunaan</h2>
            <p className="text-slate-400 text-xs">Coba gratis 50 pertanyaan memori awal tanpa kartu kredit.</p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="bg-slate-900/40 border-purple-500/20 backdrop-blur-md p-6 text-left relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                MVP Tier
              </div>
              <div className="space-y-1.5 mb-6">
                <span className="text-xs font-bold text-purple-400">Free Starter Plan</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white">Rp 0</span>
                  <span className="text-xs text-slate-500">/ selamanya</span>
                </div>
              </div>

              <div className="space-y-3.5 mb-8 text-xs">
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Konektor Gmail & Calendar</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>50 Pertanyaan AI RAG per bulan</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>Kapasitas 500 berkas/dokumen memori</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500 line-through">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Konektor WhatsApp Lite (Starter pack)</span>
                </div>
                <div className="flex items-center gap-2.5 text-slate-500 line-through">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Konektor Excel/CSV upload finansial</span>
                </div>
              </div>

              <Button
                onClick={handleStartOnboarding}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all"
              >
                Mulai Uji Coba Gratis
              </Button>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-slate-400" />
            <span>&copy; {new Date().getFullYear()} Coretify Inc by Stravio Labs. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="mailto:support@coretify.ai" className="hover:text-slate-300 transition-colors">Hubungi Kami</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
