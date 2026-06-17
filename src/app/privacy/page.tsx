"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ShieldCheck,
  Lock,
  Eye,
  Trash2,
  LockKeyhole,
  Check,
  Bot
} from "lucide-react";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 relative font-sans antialiased">
      
      {/* Top Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[1360px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      <header className="border-b border-slate-900 bg-[#070708]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-0 cursor-pointer" onClick={() => router.push("/")}>
            <img src="/coretify.png" alt="Coretify Logo" className="h-7.5 w-auto object-contain" />
            <span className="font-semibold text-[17px] tracking-tight text-white">
              Coretify Privacy & Trust
            </span>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Home
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        {/* Intro */}
        <div className="text-center md:text-left space-y-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 mb-2">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-white">Prinsip Keamanan & Kepercayaan Coretify</h1>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
            Coretify dirancang dari dasar dengan paradigma *Privacy-First*. Kami memperlakukan data bisnis Anda layaknya data kami sendiri. Berikut adalah rincian garansi keamanan kami.
          </p>
        </div>

        {/* Guarantee Grid */}
        <div className="space-y-6">
          
          {/* Item 1: Read only */}
          <Card className="bg-[#0c0c0e] border-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <Lock className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-sm">1. Jaminan Read-Only (Hanya Membaca)</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed pl-7">
              Token otorisasi API Google Workspace yang Anda berikan tidak memiliki izin menulis (write scopes). Coretify **TIDAK BISA** melakukan hal berikut:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-450 pl-7 font-semibold">
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Tidak bisa mengirim email</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Tidak bisa mengedit/mengubah berkas</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Tidak bisa menghapus dokumen</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Tidak bisa mengubah calendar event</div>
            </div>
          </Card>

          {/* Item 2: Folder exclusion */}
          <Card className="bg-[#0c0c0e] border-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <Eye className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-sm">2. Sensor & Exclude Folder Otomatis</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed pl-7">
              Sebelum memindai Google Drive, sistem kami menyaring folder sensitif secara default. Setiap folder dengan nama yang mengandung unsur **Finance, Payroll, HR, Gaji, Rekening, Pajak,** atau **Investasi** akan dikecualikan secara otomatis untuk menjaga kerahasiaan keuangan tim Anda. Anda juga bisa mengatur folder exclusion secara manual di menu Settings kapan saja.
            </p>
          </Card>

          {/* Item 3: Role-based */}
          <Card className="bg-[#0c0c0e] border-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <LockKeyhole className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-sm">3. Pembatasan RAG Berbasis Role (RLS)</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed pl-7">
              Semua pencarian memori AI (RAG query) dikontrol oleh Row-Level Security (RLS) di database. Apabila anggota tim bertipe role **Member** bertanya tentang keuangan atau burn rate, database secara fisik menyaring dokumen restricted tersebut agar tidak disertakan sebagai konteks AI. Pencegahan kebocoran data di-enforce pada level database, bukan prompt instructions.
            </p>
          </Card>

          {/* Item 4: Instant delete */}
          <Card className="bg-[#0c0c0e] border-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-white">
              <Trash2 className="h-5 w-5 text-slate-400" />
              <h3 className="font-bold text-sm">4. Garansi Hapus Total Tanpa Bekas (Instant Wipe)</h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed pl-7">
              Kami percaya data Anda adalah hak milik penuh Anda. Jika Anda memutuskan untuk berhenti menggunakan Coretify, Anda bisa memicu opsi "Delete Memory Workspace" di menu dashboard. Tindakan ini akan menghapus seluruh data indeks teks, graf entitas, embedding vector, dan token API terenkripsi dari server kami tanpa tersisa.
            </p>
          </Card>

        </div>

        {/* QA section */}
        <div className="border-t border-slate-900 pt-8 text-center space-y-4">
          <p className="text-xs text-slate-500 font-semibold">
            Punya pertanyaan khusus seputar compliance dan keamanan integrasi kami?
          </p>
          <Button
            onClick={() => router.push("/onboarding")}
            className="bg-white hover:bg-slate-100 text-black font-semibold text-xs rounded-md px-6 py-4.5 shadow"
          >
            Mulai Setup Coretify Sekarang
          </Button>
        </div>
      </main>
    </div>
  );
}
