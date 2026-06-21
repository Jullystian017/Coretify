"use client";

import { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { motion, AnimatePresence } from "framer-motion";
import {
  Coins,
  CreditCard,
  History,
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
  Check,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string;
  description: string;
}

export default function BillingPage() {
  const [credits, setCredits] = useState(1000);
  const [companyName, setCompanyName] = useState("Perusahaan");
  const [tier, setTier] = useState("Growth");
  
  // Daily Brief config states
  const [briefTime, setBriefTime] = useState("08:00");
  const [sendEmail, setSendEmail] = useState(true);
  const [sendWa, setSendWa] = useState(true);
  const [targetPhone, setTargetPhone] = useState("+62 812-3456-7890");

  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isToppingUp, setIsToppingUp] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.name) setCompanyName(parsed.name);
    }

    const savedCredits = localStorage.getItem("coretify_credits");
    if (savedCredits) {
      setCredits(parseInt(savedCredits, 10));
    }
  }, []);

  // Credit top up pack simulator
  const handleTopUp = () => {
    setIsToppingUp(true);
    setTimeout(() => {
      const nextCredits = credits + 1000;
      setCredits(nextCredits);
      localStorage.setItem("coretify_credits", nextCredits.toString());
      setIsToppingUp(false);
      toast.success("Top Up 1.000 Credits Berhasil!", {
        description: "Pembayaran Rp50.000 via Xendit Simulator berhasil dikonfirmasi.",
      });
    }, 1500);
  };

  const handleSaveBrief = () => {
    toast.success("Pengaturan Daily Brief Diperbarui!", {
      description: `Brief terjadwal setiap hari pukul ${briefTime} via ${
        sendEmail && sendWa ? "Email & WhatsApp" : sendEmail ? "Email" : "WhatsApp"
      }.`,
    });
  };

  const handleUpgrade = (selectedTier: string) => {
    setIsUpgrading(true);
    setTimeout(() => {
      setTier(selectedTier);
      setIsUpgrading(false);
      toast.success(`Berhasil upgrade ke plan ${selectedTier}!`, {
        description: "Status langganan Anda aktif mulai hari ini.",
      });
    }, 1500);
  };

  const transactions: Transaction[] = [
    { id: "TX1001", date: "21 Juni 2026", amount: -1, type: "Ask Business", description: "RAG Query: 'Project terlambat'" },
    { id: "TX1002", date: "21 Juni 2026", amount: -12.8, type: "Data Ingestion", description: "Sync: Gmail (128 emails processed)" },
    { id: "TX1003", date: "21 Juni 2026", amount: -4.5, type: "Data Ingestion", description: "Sync: WhatsApp Lite (.txt export)" },
    { id: "TX1004", date: "20 Juni 2026", amount: -2, type: "Daily Brief", description: "Automated schedule Daily Brief" },
    { id: "TX1005", date: "19 Juni 2026", amount: 1000, type: "Top Up", description: "Top Up Pack: Rp50.000 (Payment #8291)" },
  ];

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-[#070708] text-zinc-150">
        <SiteHeader />

        <div className="flex-1 p-6 md:p-8 max-w-5xl w-full mx-auto space-y-8 overflow-y-auto">
          {/* Top Header */}
          <div className="border-b border-zinc-900 pb-3">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-400" /> Pengaturan Billing & Daily Brief
            </h1>
            <p className="text-xs text-zinc-500">
              Kelola sisa kredit AI, riwayat transaksi, konfigurasi brief harian, dan paket langganan {companyName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column: Credits and Configuration */}
            <div className="md:col-span-7 space-y-6">
              {/* Credit Balance Card */}
              <div className="p-5 rounded-2xl border border-zinc-850 bg-[#0c0c0e] flex items-center justify-between shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.03)_0%,transparent_60%)] pointer-events-none" />
                <div className="space-y-1 relative z-10">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                    <Coins className="h-3 w-3 text-yellow-500" /> Saldo Kredit AI
                  </span>
                  <p className="text-3xl font-extrabold text-white font-mono tracking-tight">
                    {credits.toLocaleString()} <span className="text-xs font-semibold text-zinc-450">Credits</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                    Dipakai untuk Ask Business (1 credit), sync data, dan daily briefs harian.
                  </p>
                </div>
                <button
                  onClick={handleTopUp}
                  disabled={isToppingUp}
                  className="h-10 px-5 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all shrink-0 relative z-10 flex items-center gap-1.5"
                >
                  {isToppingUp ? "Processing..." : "Top Up 1k Credit (Rp50k)"}
                </button>
              </div>

              {/* Daily Brief Config panel */}
              <div className="p-5 rounded-2xl border border-zinc-850 bg-[#0c0c0e] space-y-4 shadow-xl">
                <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-purple-400" /> Penjadwalan Daily Brief
                </h3>
                <p className="text-[11.5px] text-zinc-450 leading-relaxed">
                  Coretify merangkum agenda kerja, risiko delay, dan chat WhatsApp klien penting untuk dikirim setiap pagi.
                </p>

                <div className="h-px bg-zinc-900" />

                <div className="space-y-4.5">
                  {/* Channels selection */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.1em] text-zinc-500">
                      Channel Pengiriman
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSendEmail(!sendEmail)}
                        className={`p-3 rounded-xl border text-[12px] font-medium flex items-center justify-between transition-all ${
                          sendEmail
                            ? "border-zinc-700 bg-zinc-900/50 text-white"
                            : "border-zinc-850 bg-transparent text-zinc-550 hover:text-zinc-400"
                        }`}
                      >
                        <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email Brief</span>
                        <div className={`h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                          sendEmail ? "border-white bg-white" : "border-zinc-700"
                        }`}>
                          {sendEmail && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                        </div>
                      </button>

                      <button
                        onClick={() => setSendWa(!sendWa)}
                        className={`p-3 rounded-xl border text-[12px] font-medium flex items-center justify-between transition-all ${
                          sendWa
                            ? "border-zinc-700 bg-zinc-900/50 text-white"
                            : "border-zinc-850 bg-transparent text-zinc-550 hover:text-zinc-400"
                        }`}
                      >
                        <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> WhatsApp Brief</span>
                        <div className={`h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                          sendWa ? "border-white bg-white" : "border-zinc-700"
                        }`}>
                          {sendWa && <Check className="h-[9px] w-[9px] text-black stroke-[3.5px]" />}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Time and Phone inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.1em] text-zinc-500">
                        Waktu Pengiriman
                      </label>
                      <input
                        type="time"
                        className="w-full h-10 px-3 bg-[#070708] border border-zinc-850 focus:border-zinc-750 focus:outline-none rounded-xl text-[12.5px] font-mono text-zinc-300 transition-all"
                        value={briefTime}
                        onChange={(e) => setBriefTime(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-bold font-mono uppercase tracking-[0.1em] text-zinc-500">
                        Nomor WhatsApp Penerima
                      </label>
                      <input
                        type="text"
                        className="w-full h-10 px-3 bg-[#070708] border border-zinc-850 focus:border-zinc-750 focus:outline-none rounded-xl text-[12.5px] text-zinc-300 transition-all"
                        value={targetPhone}
                        onChange={(e) => setTargetPhone(e.target.value)}
                        disabled={!sendWa}
                      />
                    </div>
                  </div>
                </div>

                <div className="h-px bg-zinc-900" />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-zinc-550 flex items-center gap-1 font-mono">
                    <Sparkles className="h-3.5 w-3.5 text-purple-400" /> Biaya: 2 Credits per brief
                  </span>
                  <button
                    onClick={handleSaveBrief}
                    className="h-9 px-4 bg-zinc-850 hover:bg-zinc-750 border border-zinc-800 text-zinc-300 font-semibold text-xs rounded-lg transition-all"
                  >
                    Simpan Jadwal
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Subscription */}
            <div className="md:col-span-5 space-y-6">
              {/* Subscription Info */}
              <div className="p-5 rounded-2xl border border-zinc-850 bg-[#0c0c0e] space-y-3.5 shadow-xl">
                <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                  Paket Langganan Aktif
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-bold text-white flex items-center gap-2">
                    Coretify {tier} Plan
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-purple-500/25 bg-purple-950/20 text-purple-400 rounded-full">
                    Aktif
                  </span>
                </div>
                <p className="text-[11.5px] text-zinc-500 leading-relaxed">
                  Workspace Anda memiliki batas 10.000 dokumen tersimpan di indeks memori dan 1 active WA gateway.
                </p>

                <div className="h-px bg-zinc-900" />

                <div className="space-y-2">
                  <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                    Bandingkan & Upgrade
                  </p>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
                      <span className="font-medium">Starter (Rp199k/bln)</span>
                      <button
                        onClick={() => handleUpgrade("Starter")}
                        className="text-purple-400 font-semibold hover:text-purple-300"
                        disabled={tier === "Starter"}
                      >
                        {tier === "Starter" ? "Aktif" : "Upgrade"}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
                      <span className="font-medium text-white">Growth (Rp599k/bln)</span>
                      <button
                        onClick={() => handleUpgrade("Growth")}
                        className="text-purple-400 font-semibold hover:text-purple-300"
                        disabled={tier === "Growth"}
                      >
                        {tier === "Growth" ? "Aktif" : "Upgrade"}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-colors">
                      <span className="font-medium">Business (Rp1.49M/bln)</span>
                      <button
                        onClick={() => handleUpgrade("Business")}
                        className="text-purple-400 font-semibold hover:text-purple-300"
                        disabled={tier === "Business"}
                      >
                        {tier === "Business" ? "Aktif" : "Upgrade"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Panel: Transaction Log */}
          <div className="p-5 rounded-2xl border border-zinc-850 bg-[#0c0c0e] space-y-4 shadow-xl">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <History className="h-3.5 w-3.5 text-purple-400" /> Riwayat Transaksi Kredit
            </h3>
            
            <div className="overflow-x-auto rounded-xl border border-zinc-900">
              <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="bg-zinc-950/80 border-b border-zinc-900 text-zinc-500 font-mono uppercase tracking-wider text-[9px]">
                    <th className="p-3">ID Transaksi</th>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Tipe</th>
                    <th className="p-3">Deskripsi</th>
                    <th className="p-3 text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-350">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="p-3 font-mono text-[11px] text-zinc-500">{tx.id}</td>
                      <td className="p-3">{tx.date}</td>
                      <td className="p-3 font-medium text-zinc-300">{tx.type}</td>
                      <td className="p-3 text-zinc-450">{tx.description}</td>
                      <td className={`p-3 text-right font-mono font-bold ${
                        tx.amount > 0 ? "text-emerald-400" : "text-zinc-300"
                      }`}>
                        {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()} Cr
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
