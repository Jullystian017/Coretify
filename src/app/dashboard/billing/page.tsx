"use client";

import { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Coins,
  CreditCard,
  History,
  Mail,
  MessageSquare,
  Clock,
  Sparkles,
  Check,
  Clock3,
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
      <SidebarInset>
        <SiteHeader title="Billing & Credits" />

        {/* Unified layout container matching dashboard columns */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-6 py-6 md:py-8 px-6 lg:px-8 max-w-5xl w-full mx-auto">
            
            {/* Top Header Aligned */}
            <div className="flex flex-col gap-1.5 border-b pb-4">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-purple-400" /> Billing & Daily Brief
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Kelola sisa kredit AI, riwayat transaksi, konfigurasi brief harian, dan paket langganan {companyName}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Credits and Configuration */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Credit Balance Card - Premium Gradient styled */}
                <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-5 flex items-center justify-between shadow-sm">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.02)_0%,transparent_60%)] pointer-events-none" />
                  
                  <div className="space-y-1.5 relative z-10">
                    <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                      <Coins className="h-3.5 w-3.5 text-yellow-500" /> Saldo Kredit AI
                    </span>
                    <p className="text-3xl font-bold text-foreground tracking-tight">
                      {credits.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">Credits</span>
                    </p>
                    <p className="text-xs text-muted-foreground font-light max-w-[280px] leading-relaxed">
                      Dipakai untuk Ask Business (1 credit), sync data, dan daily briefs harian.
                    </p>
                  </div>

                  <Button
                    onClick={handleTopUp}
                    disabled={isToppingUp}
                    size="lg"
                    className="relative z-10 flex items-center gap-1.5 font-semibold text-xs h-9 cursor-pointer"
                  >
                    {isToppingUp ? "Processing..." : "Top Up 1k Credits (Rp50k)"}
                  </Button>
                </div>

                {/* Daily Brief Config panel - Coretify Card styled */}
                <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-5 space-y-4 shadow-sm">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-400" /> Penjadwalan Daily Brief
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    Coretify merangkum agenda kerja, risiko delay, dan chat WhatsApp klien penting untuk dikirim setiap pagi.
                  </p>

                  <div className="h-px bg-white/[0.04]" />

                  <div className="space-y-4">
                    {/* Channels Selection */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-muted-foreground">
                        Channel Pengiriman
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          variant={sendEmail ? "secondary" : "outline"}
                          onClick={() => setSendEmail(!sendEmail)}
                          className="p-4 h-11 flex items-center justify-between text-xs font-medium cursor-pointer rounded-xl border-white/[0.04]"
                        >
                          <span className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email Brief</span>
                          <div className={`h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                            sendEmail ? "border-foreground bg-foreground" : "border-muted-foreground/45"
                          }`}>
                            {sendEmail && <Check className="h-[9px] w-[9px] text-background stroke-[3.5px]" />}
                          </div>
                        </Button>

                        <Button
                          variant={sendWa ? "secondary" : "outline"}
                          onClick={() => setSendWa(!sendWa)}
                          className="p-4 h-11 flex items-center justify-between text-xs font-medium cursor-pointer rounded-xl border-white/[0.04]"
                        >
                          <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /> WhatsApp Brief</span>
                          <div className={`h-[14px] w-[14px] rounded-[3px] border flex items-center justify-center transition-all ${
                            sendWa ? "border-foreground bg-foreground" : "border-muted-foreground/45"
                          }`}>
                            {sendWa && <Check className="h-[9px] w-[9px] text-background stroke-[3.5px]" />}
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Time & Phone Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-muted-foreground">
                          Waktu Pengiriman
                        </label>
                        <Input
                          type="time"
                          className="w-full h-9 bg-zinc-950/80 border border-zinc-850 text-xs text-foreground transition-all rounded-lg"
                          value={briefTime}
                          onChange={(e) => setBriefTime(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-muted-foreground">
                          Nomor WhatsApp Penerima
                        </label>
                        <Input
                          type="text"
                          className="w-full h-9 bg-zinc-950/80 border border-zinc-850 text-xs text-foreground transition-all rounded-lg"
                          value={targetPhone}
                          onChange={(e) => setTargetPhone(e.target.value)}
                          disabled={!sendWa}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.04]" />

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-light">
                      <Sparkles className="h-3.5 w-3.5 text-purple-400" /> Biaya: 2 Credits per brief
                    </span>
                    <Button
                      onClick={handleSaveBrief}
                      variant="outline"
                      size="lg"
                      className="px-4 text-xs h-9 cursor-pointer"
                    >
                      Simpan Jadwal
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing & Subscription */}
              <div className="md:col-span-5 space-y-6">
                
                {/* Subscription Card - Premium Styled */}
                <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-5 space-y-4 shadow-sm">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Paket Langganan Aktif
                  </span>
                  
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-foreground">
                      Coretify {tier} Plan
                    </h3>
                    <Badge className="bg-purple-500/10 text-purple-500 border border-purple-500/20 text-[10px] font-semibold uppercase tracking-wider py-0.5 px-2.5">
                      Aktif
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    Workspace Anda memiliki batas 10.000 dokumen tersimpan di indeks memori dan 1 active WA gateway.
                  </p>

                  <div className="h-px bg-white/[0.04]" />

                  {/* Tier Comparison grid */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-muted-foreground">
                      Bandingkan & Upgrade
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors">
                        <span className="font-medium text-muted-foreground">Starter (Rp199k/bln)</span>
                        <Button
                          variant={tier === "Starter" ? "secondary" : "ghost"}
                          size="xs"
                          onClick={() => handleUpgrade("Starter")}
                          disabled={tier === "Starter"}
                          className="text-xs font-semibold text-purple-400 disabled:opacity-100 disabled:text-muted-foreground"
                        >
                          {tier === "Starter" ? "Aktif" : "Upgrade"}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors">
                        <span className="font-medium text-foreground">Growth (Rp599k/bln)</span>
                        <Button
                          variant={tier === "Growth" ? "secondary" : "ghost"}
                          size="xs"
                          onClick={() => handleUpgrade("Growth")}
                          disabled={tier === "Growth"}
                          className="text-xs font-semibold text-purple-400 disabled:opacity-100 disabled:text-muted-foreground"
                        >
                          {tier === "Growth" ? "Aktif" : "Upgrade"}
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-950/60 border border-zinc-900 hover:border-zinc-800 transition-colors">
                        <span className="font-medium text-muted-foreground">Business (Rp1.49M/bln)</span>
                        <Button
                          variant={tier === "Business" ? "secondary" : "ghost"}
                          size="xs"
                          onClick={() => handleUpgrade("Business")}
                          disabled={tier === "Business"}
                          className="text-xs font-semibold text-purple-400 disabled:opacity-100 disabled:text-muted-foreground"
                        >
                          {tier === "Business" ? "Aktif" : "Upgrade"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel: Transaction Log using Coretify Table components */}
            <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-5 space-y-4 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <History className="h-4 w-4 text-purple-400" /> Riwayat Transaksi Kredit
              </h3>
              
              <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="px-4 py-3">ID Transaksi</TableHead>
                      <TableHead className="px-4 py-3">Tanggal</TableHead>
                      <TableHead className="px-4 py-3">Tipe</TableHead>
                      <TableHead className="px-4 py-3">Deskripsi</TableHead>
                      <TableHead className="text-right px-4 py-3">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="px-4 py-3.5 font-light text-muted-foreground text-xs">{tx.id}</TableCell>
                        <TableCell className="px-4 py-3.5 text-xs text-foreground font-light">{tx.date}</TableCell>
                        <TableCell className="px-4 py-3.5 text-xs text-foreground font-medium">{tx.type}</TableCell>
                        <TableCell className="px-4 py-3.5 text-xs text-muted-foreground font-light">{tx.description}</TableCell>
                        <TableCell className={`px-4 py-3.5 text-right font-semibold text-xs ${
                          tx.amount > 0 ? "text-emerald-500" : "text-foreground"
                        }`}>
                          {tx.amount > 0 ? `+${tx.amount.toLocaleString()}` : tx.amount.toLocaleString()} Cr
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
