"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CoretifyButton } from "@/components/ui/coretify-button";
import Aurora from "../components/ui/aurora";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ChevronDown,
  Play,
  ArrowRight,
  ExternalLink,
  Bot,
  Building2,
  Calendar,
  Mail,
  TrendingUp,
  AlertCircle,
  Bell,
  CheckSquare,
  FileText,
  Phone,
  BarChart2,
  Settings2,
  HelpCircle,
  Search,
  Folder,
  Cpu,
  RefreshCw,
  ShieldCheck,
  Database,
  Zap
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [activeSectionTab, setActiveSectionTab] = useState<"data" | "tools" | "agent" | "governance">("data");
  const [expandedMeeting, setExpandedMeeting] = useState<string>("greenleaf");
  const [activePlaybookTab, setActivePlaybookTab] = useState<"software_house" | "agency" | "startup">("software_house");
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [activeInfraTab, setActiveInfraTab] = useState<"data" | "tools" | "agent" | "governance">("data");
  const [infraProgress, setInfraProgress] = useState<number>(0);
  const isProgrammaticScroll = useRef<boolean>(false);

  const testimonials = [
    {
      name: "Rian Pratama",
      handle: "@rian_pratama",
      initials: "RP",
      text: "Coretify membantu kami mendeteksi scope creep 2 minggu lebih awal. Integrasi Gmail & WhatsApp RAG-nya menyelamatkan profit margin project kami."
    },
    {
      name: "Dian Sastro",
      handle: "@diansastro_vibe",
      initials: "DS",
      text: "Dulu koordinasi dengan client sangat chaos karena info tersebar di WhatsApp & email. Dengan Coretify, seluruh tim bisa mencari konteks dalam hitungan detik."
    },
    {
      name: "Budi Santoso",
      handle: "@budis_kopispace",
      initials: "BS",
      text: "Proses onboarding engineer baru menjadi 3x lebih cepat karena mereka bisa menanyakan arsitektur dan keputusan masa lalu langsung ke Company Memory."
    },
    {
      name: "Denny Siregar",
      handle: "@denny_siregar",
      initials: "DSi",
      text: "Gokil sih, RAG search nya ada kutipan (citation) langsung ke email asal. Jadi gak ada lagi alasan 'katanya si A' atau 'lupa di email mana'."
    },
    {
      name: "Sherly Annavita",
      handle: "@sherly_annavita",
      initials: "SA",
      text: "Daily Brief yang dikirim setiap jam 7 pagi ngebantu banget buat monitoring project yang overdue tanpa harus buka Jira atau Trello manual."
    },
    {
      name: "William Tanuwidjaja",
      handle: "@william_tanu",
      initials: "WT",
      text: "Sebagai investor, saya mewajibkan portfolio company kami pakai Coretify agar knowledge retention aman meskipun ada pergantian tim."
    }
  ];

  // Scroll-spy and scroll progress calculation for Section 2 mockup cards
  useEffect(() => {
    const handleScroll = () => {
      const tabs: ("data" | "tools" | "agent" | "governance")[] = ["data", "tools", "agent", "governance"];
      const windowHeight = window.innerHeight;
      const centerOfScreen = windowHeight / 2;

      // Find which card is closest to the middle of the screen
      let closestTab = activeInfraTab;
      let minDistance = Infinity;

      tabs.forEach((tab) => {
        const el = document.getElementById(`infra-card-${tab}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - centerOfScreen);
          if (distance < minDistance) {
            minDistance = distance;
            closestTab = tab;
          }
        }
      });

      // Update active tab only if not in programmatic scroll
      if (!isProgrammaticScroll.current && closestTab !== activeInfraTab) {
        setActiveInfraTab(closestTab);
      }

      // Calculate scroll progress for the active tab (how far it has scrolled relative to the viewport center)
      const activeEl = document.getElementById(`infra-card-${activeInfraTab}`);
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        
        // Progress runs from 0% when the element top is at 80% height of the screen
        // to 100% when the element bottom is at 20% height of the screen
        const startPoint = windowHeight * 0.8;
        const endPoint = windowHeight * 0.2;
        const scrollRange = rect.height + (startPoint - endPoint);
        const scrolledDistance = startPoint - rect.top;

        const percentage = (scrolledDistance / scrollRange) * 100;
        const clamped = Math.max(0, Math.min(100, percentage));
        setInfraProgress(clamped);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeInfraTab]);

  const handleInfraTabChange = (tab: "data" | "tools" | "agent" | "governance") => {
    setActiveInfraTab(tab);
    setInfraProgress(0);
    isProgrammaticScroll.current = true;
    
    const element = document.getElementById(`infra-card-${tab}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 850);
  };

  const handleStartOnboarding = () => {
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 relative font-sans antialiased">

      {/* Top light glow vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[1360px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* NAVBAR */}
      <header className="border-b border-slate-900 bg-[#070708]/85 backdrop-blur-md sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-[1360px] px-8 flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-0 cursor-pointer" onClick={() => router.push("/")}>
            <img src="/coretify.png" alt="Coretify Logo" className="h-9 w-auto object-contain" />
            <span className="text-[21px] font-semibold tracking-tight text-white">
              Coretify
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-400">
            <button className="flex items-center gap-1 transition-colors hover:text-white">
              Platform
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
            <button className="transition-colors hover:text-white" onClick={handleStartOnboarding}>
              Agent
            </button>
            <button className="transition-colors hover:text-white">
              Resources
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            <button className="text-[13px] font-medium text-slate-300 hover:text-white transition-colors">
              Login
            </button>
            <CoretifyButton
              onClick={handleStartOnboarding}
              variant="dark"
              size="default"
              className="px-5 py-4.5 font-medium"
            >
              Request a Demo
            </CoretifyButton>
          </div>
        </div>
      </header>

      {/* COMBINED HERO & DASHBOARD AREA (Spans full height of canvas) */}
      <section className="relative border-b border-slate-850/80 w-full bg-[#070708]/25 overflow-hidden">

        {/* Aurora Glowing Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {/* Subtle Grid Pattern Motif - Fading from bottom to top */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 85%, #000 45%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 80% 70% at 50% 85%, #000 45%, transparent 100%)'
            }}
          />

          {/* Spotlight Glows from Bottom-Center flowing upwards */}
          <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-t from-indigo-500/35 via-indigo-500/5 to-transparent blur-[130px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-t from-purple-500/30 via-purple-500/5 to-transparent blur-[110px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[15%] left-[48%] -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-t from-emerald-500/15 to-transparent blur-[95px] rounded-full mix-blend-screen" />

          {/* Left & Right Wing Spotlights to expand light field width */}
          <div className="absolute bottom-[15%] left-[20%] -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-t from-indigo-500/20 to-transparent blur-[130px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[15%] right-[20%] translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-t from-purple-500/20 to-transparent blur-[130px] rounded-full mix-blend-screen" />

          {/* Side & Bottom Glowing Blobs clustered near the bottom-half */}
          <div className="absolute bottom-0 -left-[20%] h-[700px] w-[900px] rounded-full bg-indigo-500/20 blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-[10%] left-[20%] h-[600px] w-[800px] rounded-full bg-emerald-500/12 blur-[130px] mix-blend-screen" />
          <div className="absolute bottom-[20%] -right-[20%] h-[700px] w-[900px] rounded-full bg-purple-500/25 blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[500px] w-[1100px] rounded-full bg-blue-500/15 blur-[140px] mix-blend-screen" />
        </div>
        {/* Aurora WebGL Background centered near bottom to glow upwards */}
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-40"
          style={{
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 75%, #000 40%, transparent 100%)',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 75%, #000 40%, transparent 100%)'
          }}
        >
          <Aurora
            colorStops={["#ffffff", "#09090b", "#94a3b8"]}
            blend={0.6}
            amplitude={1.1}
            speed={0.35}
          />
        </div>

        {/* Smooth background transition fade to prevent harsh bottom line seam */}
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#070708] via-[#070708]/85 to-transparent pointer-events-none z-0" />
        {/* Hero Copywriting Row */}
        <div className="relative z-10 w-full border-b border-slate-850/15">
          <div className="mx-auto max-w-[1360px] px-8 py-16 sm:py-20 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">

              {/* Left Column: Headline */}
              <div className="lg:col-span-8 pr-0 lg:pr-12 text-left space-y-6">
                <h1 className="text-4xl sm:text-[54px] font-semibold tracking-[-0.03em] leading-[1.08] bg-gradient-to-b from-white via-white to-zinc-400/90 bg-clip-text text-transparent pb-1 select-none">
                  The AI operating system <br className="hidden sm:inline" />for your growing companies.
                </h1>
              </div>

              {/* Right Column: Description & Primary CTA */}
              <div className="lg:col-span-4 pl-0 lg:pl-6 text-left space-y-6 lg:pt-2">
                <p className="text-base sm:text-[16px] text-zinc-400 leading-relaxed font-normal">
                  Sync your workspace tools in one click. Coretify builds<br className="hidden sm:inline" /> your company brain to query context instantly.
                </p>
                <div>
                  <CoretifyButton
                    onClick={handleStartOnboarding}
                    variant="white"
                    size="lg"
                    className="px-7 py-5.5 text-[13px] font-semibold shadow-lg"
                  >
                    Try Coretify
                  </CoretifyButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION ROW */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-[1360px] grid grid-cols-10 text-[13px] font-semibold text-slate-400">
            {/* Left spacer column with dashed border on the right */}
            <div className="col-span-1 border-r border-slate-850/15" style={{ borderRightStyle: "dashed" }} />

            {/* Ask Coretify tab */}
            <button
              onClick={() => setActiveSectionTab("agent")}
              className={`col-span-2 border-r border-b border-slate-850/15 py-3.5 text-center cursor-pointer transition-all relative ${activeSectionTab === "agent"
                ? "text-white bg-white/[0.04] font-semibold"
                : "hover:text-slate-200 hover:bg-white/[0.01]"
                }`}
            >
              <span className="relative z-10">Ask Coretify</span>
              {activeSectionTab === "agent" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 z-10" />
              )}
            </button>

            {/* Data model tab */}
            <button
              onClick={() => setActiveSectionTab("data")}
              className={`col-span-2 border-r border-b border-slate-850/15 py-3.5 text-center cursor-pointer transition-all relative ${activeSectionTab === "data"
                ? "text-white bg-white/[0.04] font-semibold"
                : "hover:text-slate-200 hover:bg-white/[0.01]"
                }`}
            >
              <span className="relative z-10">Data model</span>
              {activeSectionTab === "data" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 z-10" />
              )}
            </button>

            {/* Workflows tab */}
            <button
              onClick={() => setActiveSectionTab("tools")}
              className={`col-span-2 border-r border-b border-slate-850/15 py-3.5 text-center cursor-pointer transition-all relative ${activeSectionTab === "tools"
                ? "text-white bg-white/[0.04] font-semibold"
                : "hover:text-slate-200 hover:bg-white/[0.01]"
                }`}
            >
              <span className="relative z-10">Workflows</span>
              {activeSectionTab === "tools" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 z-10" />
              )}
            </button>

            {/* Reporting tab with dashed border on the right */}
            <button
              onClick={() => setActiveSectionTab("governance")}
              className={`col-span-2 border-r border-b border-slate-850/15 py-3.5 text-center cursor-pointer transition-all relative ${activeSectionTab === "governance"
                ? "text-white bg-white/[0.04] font-semibold"
                : "hover:text-slate-200 hover:bg-white/[0.01]"
                }`}
              style={{ borderRightStyle: "dashed" }}
            >
              <span className="relative z-10">Reporting</span>
              {activeSectionTab === "governance" && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20 z-10" />
              )}
            </button>

            {/* Right spacer column */}
            <div className="col-span-1" />
          </div>

          {/* Extension row to project vertical lines down to the dashboard */}
          <div className="mx-auto max-w-[1360px] grid grid-cols-10 h-8">
            <div className="col-span-1 border-r border-slate-850/15" style={{ borderRightStyle: "dashed" }} />
            <div className="col-span-8 border-r border-slate-850/15" style={{ borderRightStyle: "dashed" }} />
            <div className="col-span-1" />
          </div>
        </div>

        {/* INTERACTIVE PRODUCT MOCKUP SECTION (No side grid lines, full width) */}
        <div className="relative z-10 w-full pt-0 pb-0 -mb-16 lg:-mb-24">
          {/* Aurora WebGL Background at the bottom of the dashboard */}
          <div 
            className="absolute inset-0 pointer-events-none -z-10 opacity-25"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 70%, #000 10%, transparent 100%)',
              maskImage: 'radial-gradient(ellipse 80% 50% at 50% 70%, #000 10%, transparent 100%)'
            }}
          >
            <Aurora
              colorStops={["#ffffff", "#09090b", "#94a3b8"]}
              blend={0.6}
              amplitude={1.0}
              speed={0.3}
            />
          </div>
          <div className="mx-auto max-w-[1360px] px-8">

            {/* Product Window Shell (Dark Mode Basepoint/Attio Clone) */}
            <div className="relative border border-slate-900 bg-[#09090b] rounded-2xl overflow-hidden shadow-2xl">

              {/* Header bar */}
              <div className="h-12 border-b border-slate-900 bg-[#09090b] px-5 flex items-center justify-between">

                {/* macOS Dots & Workspace Switcher */}
                <div className="flex items-center gap-4.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/35" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/20 border border-[#eab308]/35" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/35" />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-350 cursor-pointer hover:text-white transition-colors">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-slate-900 border border-slate-800 text-[10px] font-black text-slate-400">
                      B
                    </div>
                    <span>Basepoint</span>
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </div>
                </div>

                {/* Configure & Help */}
                <div className="flex items-center gap-4 text-xs text-slate-450">
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                    <Settings2 className="h-3.5 w-3.5" />
                    Configure
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                    <HelpCircle className="h-3.5 w-3.5" />
                    Help
                  </button>
                </div>
              </div>

              {/* Inner Dashboard Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">

                {/* Left Sidebar (Workspace Navigation) */}
                <div className="lg:col-span-3 border-r border-slate-900 bg-[#09090b]/80 p-3.5 space-y-5 flex flex-col justify-between text-left">
                  <div className="space-y-4">

                    {/* Search box (Quick Actions) */}
                    <div className="relative flex items-center bg-[#070708] border border-slate-900 rounded-lg p-2 text-xs text-slate-500 hover:border-slate-850 transition-all cursor-pointer">
                      <Search className="h-3.5 w-3.5 mr-2 text-slate-550" />
                      <span className="flex-1">Quick Actions</span>
                      <span className="text-[9px] bg-slate-900 border border-slate-850 text-slate-450 px-1 rounded font-mono mr-1">⌘K</span>
                      <span className="text-[10px] text-slate-550 font-mono">/</span>
                    </div>

                    {/* Nav list */}
                    <nav className="space-y-1 text-slate-400 text-xs font-semibold">
                      <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-850 text-white cursor-pointer text-left">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>Home</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <Bell className="h-3.5 w-3.5 text-slate-550" />
                        <span>Notifications</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <CheckSquare className="h-3.5 w-3.5 text-slate-550" />
                        <span>Tasks</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <FileText className="h-3.5 w-3.5 text-slate-550" />
                        <span>Notes</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <Mail className="h-3.5 w-3.5 text-slate-550" />
                        <span>Emails</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <Phone className="h-3.5 w-3.5 text-slate-550" />
                        <span>Calls</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <BarChart2 className="h-3.5 w-3.5 text-slate-550" />
                        <span>Reports</span>
                      </button>
                      <button className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <div className="flex items-center gap-2.5">
                          <Folder className="h-3.5 w-3.5 text-slate-550" />
                          <span>Automations</span>
                        </div>
                        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                      </button>
                      <div className="pl-8 space-y-1 pt-0.5 text-[11px] font-medium text-slate-500">
                        <div className="hover:text-slate-300 cursor-pointer py-1">Sequences</div>
                        <div className="hover:text-slate-300 cursor-pointer py-1">Workflows</div>
                      </div>
                    </nav>
                  </div>

                  {/* Favorites & PQL workflows */}
                  <div className="space-y-3 pt-3 border-t border-slate-900/60">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Favorites</span>
                      <div className="text-xs text-slate-400 font-semibold space-y-1.5 pl-1">
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer py-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-650" />
                          <span>PQL workflows</span>
                        </div>
                        <div className="pl-3.5 space-y-1 text-[11px] text-slate-500">
                          <div className="hover:text-slate-350 cursor-pointer">PQL Pipeline Deals</div>
                          <div className="hover:text-slate-350 cursor-pointer">PQL Workspace Outreach</div>
                          <div className="hover:text-slate-355 cursor-pointer">PQL Triage</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-9 p-8 flex flex-col justify-between bg-[#09090b]/20 relative text-left">

                  {/* Visual content container */}
                  <div className="max-w-xl space-y-6">

                    {/* Greeting header */}
                    <div>
                      <h3 className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider">Home</h3>
                      <h1 className="text-2xl sm:text-[28px] font-semibold text-white tracking-tight mt-1.5">
                        Good morning, Alex
                      </h1>
                    </div>

                    {/* AI Search Card (glowing search input) */}
                    <div className="bg-[#0c0c0e] border border-slate-900 rounded-xl p-4.5 shadow-lg relative group transition-all duration-300 hover:border-slate-800">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-1 text-slate-300 font-mono text-xs">
                          <div className="min-h-[24px]">How do I win m</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button className="bg-slate-950 border border-slate-900 text-slate-450 hover:text-white px-2.5 py-1 rounded text-[10px] font-bold flex items-center gap-1">
                            Auto
                            <ChevronDown className="h-3 w-3" />
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-500 text-white h-7.5 w-7.5 rounded-full flex items-center justify-center transition-colors">
                            <ArrowRight className="h-4 w-4 -rotate-90" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Pills */}
                    <div className="flex gap-2">
                      <button className="bg-slate-900 border border-slate-850 hover:border-slate-700 text-xs font-semibold text-slate-300 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        Prep for next meeting
                      </button>
                      <button className="bg-slate-900 border border-slate-850 hover:border-slate-700 text-xs font-semibold text-slate-300 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        Recap last call
                      </button>
                    </div>

                    {/* Meetings Widget */}
                    <div className="space-y-3 pt-4">
                      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Meetings</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                          <span>Today, Jun 14</span>
                          <div className="flex gap-1">
                            <button className="p-0.5 hover:text-white cursor-pointer">&lt;</button>
                            <button className="p-0.5 hover:text-white cursor-pointer">&gt;</button>
                          </div>
                        </div>
                      </div>

                      {/* Meetings lists */}
                      <div className="space-y-2 text-xs">

                        {/* Meeting 1 */}
                        <div
                          onClick={() => setExpandedMeeting(expandedMeeting === "stripe" ? "" : "stripe")}
                          className="bg-transparent border border-slate-950/60 p-3.5 rounded-xl hover:bg-slate-900/30 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0" />
                            <span className="font-bold text-slate-200">Basepoint x Stripe</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px]">10:00 - 11:00 AM</span>
                        </div>

                        {/* Meeting 2 */}
                        <div
                          onClick={() => setExpandedMeeting(expandedMeeting === "ashley" ? "" : "ashley")}
                          className="bg-transparent border border-slate-950/60 p-3.5 rounded-xl hover:bg-slate-900/30 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-slate-650 shrink-0" />
                            <span className="font-bold text-slate-400">Ashley & Martin</span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px]">10:20 - 10:40 AM</span>
                        </div>

                        {/* Meeting 3 (Expanded active item) */}
                        <div className="border border-slate-900 rounded-xl overflow-hidden">
                          <div
                            onClick={() => setExpandedMeeting(expandedMeeting === "greenleaf" ? "" : "greenleaf")}
                            className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${expandedMeeting === "greenleaf" ? "bg-slate-900/40 border-b border-slate-900" : "bg-transparent hover:bg-slate-900/30"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                              <span className="font-bold text-slate-200">Greenleaf // Basepoint</span>
                            </div>
                            <span className="text-slate-400 font-mono text-[11px] font-semibold">2:30 - 3:00 PM</span>
                          </div>

                          {expandedMeeting === "greenleaf" && (
                            <div className="p-4 bg-slate-950/20 space-y-4 animate-in fade-in duration-200 text-[11px] text-slate-400">
                              <div>
                                <div className="text-slate-650 font-bold uppercase text-[9px] tracking-wider mb-1">Details</div>
                                <p className="leading-relaxed">
                                  Demo call with Greenleaf team to help them get the most out of their PRO trial.
                                </p>
                                <a
                                  href="https://meet.google.com/psn-zfzb-yaw"
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-400 hover:underline inline-flex items-center gap-1 mt-1.5"
                                >
                                  https://meet.google.com/psn-zfzb-yaw
                                </a>
                              </div>

                              <div className="pt-2 border-t border-slate-900/60">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-slate-655 font-bold uppercase text-[9px] tracking-wider">Participants</span>
                                  <Badge variant="secondary" className="bg-slate-900 text-slate-400 text-[9px] py-0 px-1 font-mono border border-slate-850">8</Badge>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-[9px] font-black text-slate-355">DP</div>
                                    <div>
                                      <span className="font-semibold text-slate-200">Dylan Parker</span>
                                      <span className="text-slate-550 ml-1.5 font-normal">CEO of Basepoint</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-[9px] font-black text-slate-355">AZ</div>
                                    <div>
                                      <span className="font-semibold text-slate-200">Annie Zhang</span>
                                      <span className="text-slate-550 ml-1.5 font-normal">Product Manager at Greenleaf</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Smooth Bottom Fade */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090b] via-[#09090b]/95 to-transparent pointer-events-none z-20" />

            </div>
          </div>
        </div>

      </section>

      {/* BRAND LOGOS SECTION (Inside the vertical grid lines) */}
      <section className="relative z-20 w-full bg-[#070708] border-t border-b border-slate-850/80 shadow-[0_-20px_50px_rgba(0,0,0,0.95)]">
        <div className="mx-auto max-w-[1360px] px-8 py-9 flex flex-wrap items-center justify-between gap-x-12 gap-y-6 w-full text-white">
          {/* Vercel */}
          <div className="flex items-center gap-2 select-none">
            <svg viewBox="0 0 76 65" className="h-5 w-auto fill-current">
              <polygon points="38 0 76 65 0 65" />
            </svg>
            <span className="text-[21px] font-bold tracking-tight">Vercel</span>
          </div>

          {/* Cursor */}
          <div className="flex items-center gap-2.5 select-none">
            <svg viewBox="0 0 24 24" className="h-[23px] w-auto fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
              <path d="M12 12v10" />
            </svg>
            <span className="text-[17px] font-extrabold tracking-wider font-sans">CURSOR</span>
          </div>

          {/* Oscar */}
          <div className="flex items-center select-none">
            <span className="text-[25px] font-semibold tracking-tight font-sans lowercase">oscar</span>
          </div>

          {/* OpenAI */}
          <div className="flex items-center gap-2 select-none">
            <svg viewBox="0 0 24 24" className="h-6.5 w-6.5 fill-current">
              <path d="M21.3,10.6a5.5,5.5,0,0,0-2.6-4.6,5.5,5.5,0,0,0-5.1-.3,5.5,5.5,0,0,0-5-3.8,5.6,5.6,0,0,0-5.4,3,5.5,5.5,0,0,0-2.3,4.8,5.5,5.5,0,0,0,2.6,4.6,5.5,5.5,0,0,0,5.1.3,5.5,5.5,0,0,0,5,3.8,5.5,5.5,0,0,0,5.4-3A5.5,5.5,0,0,0,21.3,10.6ZM12.7,4.3a3.5,3.5,0,0,1,1.9.5,3.6,3.6,0,0,1,1.6,2.2c-.1,0-.2,0-.3-.1L11,4.3A3.6,3.6,0,0,1,12.7,4.3ZM5.9,6.7a3.5,3.5,0,0,1,.8-1.9,3.6,3.6,0,0,1,2.5-1.1c0,.1,0,.2,0,.3V8.8A3.6,3.6,0,0,1,5.9,6.7ZM4.5,12.8a3.5,3.5,0,0,1-1.1-1.7,3.6,3.6,0,0,1,.3-2.7c.1,0,.2.1.2.1l4.9,2.8A3.6,3.6,0,0,1,4.5,12.8Zm6.8,6.9a3.5,3.5,0,0,1-1.9-.5,3.6,3.6,0,0,1-1.6-2.2c.1,0,.2,0,.3.1L13,19.7A3.6,3.6,0,0,1,11.3,19.7ZM18.1,17.3a3.5,3.5,0,0,1-.8,1.9,3.6,3.6,0,0,1-2.5,1.1c0-.1,0-.2,0-.3V15.2A3.6,3.6,0,0,1,18.1,17.3Zm1.4-6.1a3.5,3.5,0,0,1,1.1,1.7,3.6,3.6,0,0,1-.3,2.7c-.1,0-.2-.1-.2-.1l-4.9-2.8A3.6,3.6,0,0,1,19.5,11.2Z" />
            </svg>
            <span className="text-[21px] font-semibold tracking-tight">OpenAI</span>
          </div>

          {/* Coinbase */}
          <div className="flex items-center select-none">
            <span className="text-[25px] font-semibold tracking-tight font-sans lowercase">coinbase</span>
          </div>

          {/* Cash App */}
          <div className="flex items-center gap-2.5 select-none">
            <div className="flex items-center justify-center h-[23px] w-[23px] bg-white text-black font-extrabold rounded-[5px] text-[15px] leading-none">
              $
            </div>
            <span className="text-[21px] font-bold tracking-tight">Cash App</span>
          </div>

          {/* Boom */}
          <div className="flex items-center select-none">
            <svg viewBox="0 0 224 57" className="h-[27px] w-auto fill-current">
              <path d="M84.6 14.8c0-.3.2-.5.5-.5h14.7c6.2 0 9.5 2.9 9.5 7.6 0 3.1-2.1 5-4.3 5.7 2.6.8 4.9 3.1 4.9 6.8 0 4.9-3.3 8.1-9.9 8.1H85.1c-.3 0-.5-.2-.5-.5V14.8zm5.3 4.1v6.9h9.3c3.1 0 4.6-1.2 4.6-3.5 0-2.4-1.6-3.5-4.6-3.5h-9.3v.1zm0 11.4v7.8h9.5c3.5 0 5.1-1.4 5.1-3.9 0-2.6-1.7-3.9-5.1-3.9h-9.5zm26.6-1.8c0-8.5 6.4-14.6 14.8-14.6s14.8 6.1 14.8 14.6c0 8.4-6.4 14.6-14.8 14.6-8.5 0-14.8-6.1-14.8-14.6zm24.2 0c0-5.4-3.7-9.7-9.3-9.7-5.6 0-9.3 4.4-9.3 9.7 0 5.5 3.7 9.7 9.3 9.7 5.5.1 9.3-4.3 9.3-9.7zm12.2 0c0-8.5 6.4-14.6 14.8-14.6s14.8 6.1 14.8 14.6c0 8.4-6.4 14.6-14.8 14.6-8.5 0-14.8-6.1-14.8-14.6zm24.2 0c0-5.4-3.7-9.7-9.3-9.7-5.6 0-9.3 4.4-9.3 9.7 0 5.5 3.7 9.7 9.3 9.7 5.5.1 9.3-4.3 9.3-9.7zM207 35l8.4-20.3c.1-.2.2-.3.4-.3h6.9c.3 0 .5.2.5.5v27.3c0 .3-.2.5-.5.5h-4.3c-.3 0-.5-.2-.5-.5V19.5l-9.4 23c-.1.2-.2.3-.4.3h-3c-.2 0-.4-.1-.4-.3l-9.3-22.8v22.5c0 .3-.2.5-.5.5h-4.3c-.3 0-.5-.2-.5-.5V14.9c0-.3.2-.5.5-.5h7.2c.2 0 .4.1.4.3L207 35zM63.1 28.6c-.1-.8-.8-1.3-1.6-1.2l-16.2 2.2 16.7-7c.8-.3 1.2-1.3.9-2.1-.3-.8-1.3-1.2-2.1-.9l-13 5.5 12.6-9.7c.8-.6.9-1.7.3-2.5-.6-.8-1.7-.9-2.5-.3l-10.5 8.1 9.1-12c.6-.8.5-2-.4-2.7-.8-.6-2-.5-2.7.4l-7.5 9.9 5.6-13.2c.4-1 0-2.1-1-2.6-1-.4-2.1 0-2.6 1L37.3 27c-1 2.3-3.4 3.9-6.1 3.9-2.6 0-4.7-1.5-5.8-3.8L13.7.6c-.1-.3-.5-.5-.8-.3-.3.1-.5.5-.3.8L23 24.5 8.5 5.8c-.3-.3-.8-.4-1.1-.1-.3.3-.4.8-.1 1.1l14.5 18.7L4.6 12.4c-.4-.3-1-.2-1.3.2-.3.4-.2 1 .2 1.3l17.9 13.7-19-7.7c-.6-.2-1.2 0-1.5.6-.2.6 0 1.2.6 1.5l19.9 8.1-19.3-2.5c-.7-.1-1.3.4-1.4 1.1-.1.7.4 1.3 1.1 1.4l20.3 2.6-18.2 2.5c-.8.1-1.3.8-1.2 1.6.1.8.8 1.3 1.6 1.2l18.9-2.6L7.5 42c-.8.3-1.2 1.3-.9 2.1.3.8 1.3 1.2 2.1.9l16.7-7-12.6 9.8c-.8.6-.9 1.7-.3 2.5.6.8 1.7.9 2.5.3l13.1-10.1-8.7 11.4c-.6.8-.5 2 .4 2.7.8.6 2 .5 2.7-.4l8.1-10.7-4.5 10.6c-.4 1 0 2.1 1 2.6 1 .4 2.1 0 2.6-1l3.5-8.3 3.9 8.9c.1.3.5.5.8.3.3-.1.5-.5.3-.8l-4.4-10 1.3-3 8.8 11.4c.3.3.8.4 1.1.1.3-.3.4-.8.1-1.1l-9.4-12.1.7-1.8 14.1 10.8c.4.3 1 .2 1.3-.2.3-.4.2-1-.2-1.3L37.1 37.5l.3-.7L56 44.4c.6.2 1.2 0 1.5-.6.2-.6 0-1.2-.6-1.5l-17.8-7.2 20.7 2.7c.7.1 1.3-.4 1.4-1.1.1-.7-.4-1.3-1.1-1.4l-17.5-2.2 19.2-2.6c.8-.4 1.4-1.1 1.3-1.9z" />
            </svg>
          </div>

          {/* Ramp */}
          <div className="flex items-center select-none">
            <svg viewBox="0 0 96 26" className="h-[25px] w-auto fill-current">
              <g fill="currentColor">
                <path d="m6.64257 8.79302c-2.28962 0-3.41358 2.04688-3.41358 4.77998v6.8492h-3.22899v-14.45351h3.17241v3.74982h.05509c.67735-2.30551 2.0276-4.16846 4.11029-4.16846 1.46488 0 2.08269.51881 2.08269.51881l-1.45744 2.97684c0-.0015-.46447-.25268-1.32047-.25268zm39.03513 1.98408v9.6437h-3.1456v-8.47c0-2.43114-.7518-3.71846-2.6722-3.71846-1.9889 0-2.9506 1.62821-2.9506 4.75156v7.4354h-3.1173v-8.4685c0-2.33695-.7429-3.71846-2.644-3.71846-2.1705 0-3.0057 1.92876-3.0057 4.75156v7.4354h-3.1724v-14.45061h3.1724v3.27287h.0283c.4943-2.26514 1.843-3.6631 4.1193-3.6631 2.2568 0 3.7277 1.2305 4.2859 3.41192.5315-2.09919 1.9457-3.41192 4.1192-3.41192 3.0325 0 4.9827 1.92873 4.9827 5.19864zm-29.9109-5.22705c-2.9193 0-4.8293 1.39048-5.7002 3.90083l2.6871.99132c.4898-1.51462 1.511-2.37732 3.0697-2.37732 1.7537 0 2.7838.78346 2.7838 1.98552 0 1.229-.8202 1.4862-2.6722 1.7897-2.0603.3364-6.95964.4471-6.95964 4.6395 0 2.4565 2.02464 4.3045 5.06604 4.3045 2.2866 0 3.8438-.9479 4.5643-2.7122h.0283v2.3489h3.1456v-8.8887c-.0014-3.88885-1.9308-5.98205-6.0128-5.98205zm2.9223 8.06775c0 3.0307-1.4783 4.9774-3.8408 4.9774-1.6703 0-2.6722-.9509-2.6722-2.322 0-1.2858 1.0301-2.1784 3.0056-2.5462 2.0217-.3768 3.04-.8418 3.5074-1.9572zm38.1777-8.03934c-2.4058 0-3.9957 1.34114-4.676 3.3566v-2.96637h-3.3407v20.01551h3.3124v-8.5283h.0283c.7369 2.1829 2.2717 3.3835 4.676 3.3835 3.8125 0 6.5413-3.1862 6.5413-7.688-.0015-4.47052-2.7288-7.57294-6.5413-7.57294zm-.8218 12.57864c-2.6409 0-4.1058-1.9437-4.1058-4.9624s1.639-4.96236 4.1058-4.96236c2.4653 0 4.1058 2.03786 4.1058 4.96236 0 2.926-1.639 4.9624-4.1058 4.9624z" />
                <path d="m96.2197 20.3553v.0901l-12.9282.0046v-.0947c1.8642-1.068 3.151-2.1559 4.3089-3.2927h5.3085zm-3.2033-17.07889-3.277-3.2605409h-.0952s.0553 6.0764609-5.4467 11.6028309c-5.3838 5.4088-11.7151 5.421-11.7151 5.421v.0948l3.3384 3.317s6.2391.0627 11.7504-5.421c5.4913-5.46526 5.4452-11.75409 5.4452-11.75409z" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION: Tab Switcher (Introducing Default clone) */}
      <section className="w-full bg-[#070708]/40 border-b border-slate-850/80">
        <div className="mx-auto max-w-[1360px] border-l border-r relative">

          {/* Section Header Band */}
          <div className="border-b border-slate-850/80 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-450 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">01</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">06</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">FEATURES</span>
              </div>
            </div>
          </div>

          {/* Section Title Block (spanning full width) */}
          <div className="py-12 px-8 sm:px-12 lg:px-16 text-left space-y-4 bg-transparent">
            <h2 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.025em] leading-[1.12] bg-gradient-to-b from-white via-white to-zinc-400/90 bg-clip-text text-transparent pb-1 select-none">
              The intelligent system that never sleeps.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-none leading-relaxed">
              Picks up leads at 2am. Catches renewals before they slip. Hands you the answer before you ask.
            </p>
          </div>
          {/* BENTO GRID CONTAINER WITH SIDE SPACERS */}
          <div className="grid grid-cols-[1fr] lg:grid-cols-[50px_1fr_50px] w-full border-t border-slate-850/80">
            {/* Left Spacer with diagonal stripes */}
            <div
              className="hidden lg:block border-r border-slate-850/80"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px, transparent 7px)'
              }}
            />

            {/* Bento Grid Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 bg-[#09090b]/40 shadow-2xl">

              {/* Card 1: Company Memory Builder (Ingestion Layer) - spans 2 cols on lg */}
              <div className="lg:col-span-2 border-b lg:border-r border-slate-850/80 flex flex-col justify-between h-full bg-[#08080a]/20">
                <div className="grid grid-cols-1 md:grid-cols-12 h-full w-full">
                  {/* Left Column: Description */}
                  <div className="md:col-span-5 p-8 sm:p-10 flex flex-col justify-center text-left">
                    <span className="text-[10px] text-zinc-450 font-mono tracking-widest uppercase mb-2 block font-bold">01 . CLIENT RETENTION</span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug font-sans">
                      Catch Silence Before Churn
                    </h3>
                    <p className="text-[13px] text-zinc-400 mt-4 leading-relaxed font-normal font-sans">
                      Automatically monitors communication frequency across connected Gmail and WhatsApp exports. Coretify alerts managers when key client accounts go quiet for over 14 days.
                    </p>
                  </div>
                  {/* Right Column: Visualizer */}
                  <div className="md:col-span-7 p-8 sm:p-10 border-t md:border-t-0 md:border-l border-slate-850/80 bg-[#08080a]/60 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_12px] flex items-center justify-center min-h-[320px] md:min-h-0">
                    <div className="flex flex-col items-center justify-center w-full max-w-[420px] relative z-10 gap-6">
                      {/* Connected Sources (Top Grid) */}
                      <div className="grid grid-cols-4 gap-3 w-full">
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800 bg-[#09090b]/80 shadow-md">
                          <Mail className="h-5 w-5 text-indigo-400 mb-1" />
                          <span className="text-[10px] text-zinc-400 font-mono">Gmail</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800 bg-[#09090b]/80 shadow-md">
                          <Folder className="h-5 w-5 text-amber-400 mb-1" />
                          <span className="text-[10px] text-zinc-400 font-mono">Drive</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800 bg-[#09090b]/80 shadow-md">
                          <Calendar className="h-5 w-5 text-rose-400 mb-1" />
                          <span className="text-[10px] text-zinc-400 font-mono">Calendar</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-zinc-800 bg-[#09090b]/80 shadow-md">
                          <Phone className="h-5 w-5 text-emerald-400 mb-1" />
                          <span className="text-[10px] text-zinc-400 font-mono">WA Lite</span>
                        </div>
                      </div>

                      {/* Particle flow lines */}
                      <div className="h-12 w-full flex items-center justify-center relative">
                        <div className="w-[1.5px] h-full bg-indigo-500/20" />
                        <div className="absolute top-1/2 left-1/4 w-[1.5px] h-6 bg-indigo-500/20 transform rotate-45" />
                        <div className="absolute top-1/2 right-1/4 w-[1.5px] h-6 bg-indigo-500/20 transform -rotate-45" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-indigo-400 animate-ping" />
                      </div>

                      {/* Central Memory Core */}
                      <div className="border border-indigo-500/30 bg-indigo-950/20 rounded-2xl p-5 w-full shadow-lg relative group transition-all duration-300 hover:border-indigo-500/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <Bot className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <h4 className="text-[13px] font-semibold text-white">Central Company Memory</h4>
                            <p className="text-[10px] text-zinc-500 mt-0.5">Continuous semantic embedding sync</p>
                          </div>
                        </div>
                        <span className="text-[9px] bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 px-2.5 py-0.5 rounded-full font-semibold font-mono animate-pulse">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Ask Business Chat Console (Interactive Query) - spans 1 col on lg */}
              <div className="lg:col-span-1 border-b border-slate-850/80 flex flex-col justify-between h-full bg-[#08080a]/20">
                <div className="p-8 sm:p-10 pb-4 text-left">
                  <span className="text-[10px] text-zinc-455 font-mono tracking-widest uppercase mb-2 block font-bold">02 . OPERATIONAL HEALTH</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug font-sans">
                    Predict Project Delays Early
                  </h3>
                  <p className="text-[13px] text-zinc-400 mt-3 leading-relaxed font-normal font-sans">
                    Identify operational bottlenecks before deadlines slip. Ask Coretify why a project is lagging and get immediate timelines mapped to client communications.
                  </p>
                </div>
                <div className="px-8 sm:px-10 pb-10 pt-4 flex items-center justify-center bg-[#08080a]/60 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_12px] border-t border-slate-850/40 flex-1 min-h-[320px]">
                  <div className="w-full max-w-[340px] bg-[#0c0c0e]/95 border border-zinc-800 rounded-2xl p-4 shadow-xl text-left space-y-3.5 relative z-10">
                    {/* Chat Mock Header */}
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1.5 select-none">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Ask Business Console
                      </span>
                      <Badge variant="outline" className="text-[8px] border-zinc-800 text-zinc-550 bg-slate-950/40 px-2 py-0">RAG Engine</Badge>
                    </div>

                    {/* User Bubble */}
                    <div className="flex justify-end">
                      <div className="bg-zinc-800 text-white text-[11px] px-3 py-2 rounded-2xl rounded-tr-none max-w-[85%] font-medium">
                        Kenapa Project Mobile App telat?
                      </div>
                    </div>

                    {/* Bot Response Bubble */}
                    <div className="flex gap-2.5 items-start">
                      <div className="h-6 w-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                      <div className="space-y-2 max-w-[85%] font-normal">
                        <div className="bg-[#09090b]/80 border border-zinc-850 text-zinc-300 text-[10.5px] px-3.5 py-2.5 rounded-2xl rounded-tl-none leading-relaxed">
                          Project Mobile App tertunda 5 hari karena ditemukan 12 email revisi alur API autentikasi dari client di Gmail <span className="text-indigo-400 font-bold">[1]</span> serta log chat WhatsApp terkait scope creep <span className="text-indigo-400 font-bold">[2]</span>.
                        </div>
                        {/* Citations */}
                        <div className="flex gap-1.5">
                          <span className="text-[8px] text-zinc-500 self-center">Citations:</span>
                          <span className="text-[8px] bg-zinc-950 border border-zinc-850 text-zinc-400 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-mono cursor-pointer hover:text-white transition-colors">
                            Gmail <ExternalLink className="h-2 w-2" />
                          </span>
                          <span className="text-[8px] bg-zinc-950 border border-zinc-850 text-zinc-400 px-1.5 py-0.5 rounded flex items-center gap-0.5 font-mono cursor-pointer hover:text-white transition-colors">
                            WhatsApp <ExternalLink className="h-2 w-2" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Company Memory Graph (Knowledge Mapping) - spans 1 col on lg */}
              <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-850/80 flex flex-col justify-between h-full bg-[#08080a]/20">
                <div className="p-8 sm:p-10 pb-4 text-left">
                  <span className="text-[10px] text-zinc-455 font-mono tracking-widest uppercase mb-2 block font-bold">03 . DECISION AUDITING</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug font-sans">
                    Auto-Captured Commitments
                  </h3>
                  <p className="text-[13px] text-zinc-400 mt-3 leading-relaxed font-normal font-sans">
                    No more digging through endless chat backups or threads. Coretify automatically parses meeting summaries and email threads to build a historical record of what was approved.
                  </p>
                </div>
                <div className="px-8 sm:px-10 pb-10 pt-4 flex items-center justify-center bg-[#08080a]/60 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_12px] border-t border-slate-850/40 flex-1 min-h-[320px]">
                  <div className="w-full max-w-[340px] h-[240px] border border-zinc-800 rounded-2xl bg-[#0c0c0e]/95 relative overflow-hidden z-10 flex items-center justify-center">
                    {/* SVG Graph diagram */}
                    <svg className="w-full h-full" viewBox="0 0 400 280">
                      {/* Connection lines */}
                      <line x1="80" y1="140" x2="200" y2="70" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" strokeDasharray="3" />
                      <line x1="80" y1="140" x2="200" y2="210" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" />
                      <line x1="200" y1="70" x2="320" y2="70" stroke="rgba(99, 102, 241, 0.5)" strokeWidth="2" />
                      <line x1="200" y1="210" x2="320" y2="210" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" strokeDasharray="3" />
                      <line x1="320" y1="70" x2="320" y2="210" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="1.5" />

                      {/* Node 1: Client */}
                      <circle cx="80" cy="140" r="24" fill="#09090b" stroke="#6366f1" strokeWidth="2" />
                      <text x="80" y="143" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Client</text>
                      <text x="80" y="178" fill="#8890a0" fontSize="8" textAnchor="middle">Vista Retail</text>

                      {/* Node 2: Meeting */}
                      <circle cx="200" cy="70" r="22" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="200" y="73" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Meeting</text>
                      <text x="200" y="105" fill="#8890a0" fontSize="8" textAnchor="middle">Sprint Kickoff</text>

                      {/* Node 3: Project */}
                      <circle cx="200" cy="210" r="22" fill="#09090b" stroke="#eab308" strokeWidth="1.5" />
                      <text x="200" y="213" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Project</text>
                      <text x="200" y="245" fill="#8890a0" fontSize="8" textAnchor="middle">Nexa App</text>

                      {/* Node 4: Decision */}
                      <circle cx="320" cy="70" r="22" fill="#09090b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="320" y="73" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Decision</text>
                      <text x="320" y="105" fill="#8890a0" fontSize="8" textAnchor="middle">API Auth Spec</text>

                      {/* Node 5: Task */}
                      <circle cx="320" cy="210" r="22" fill="#09090b" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="320" y="213" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Task</text>
                      <text x="320" y="245" fill="#8890a0" fontSize="8" textAnchor="middle">Fix Login API</text>
                    </svg>

                    {/* Glassmorphic Inspect Card */}
                    <div className="absolute bottom-2 right-2 bg-[#09090b]/80 backdrop-blur border border-zinc-800 p-1.5 rounded-lg text-left max-w-[110px] shadow-lg">
                      <span className="text-[7px] font-bold text-zinc-550 block uppercase tracking-wider">Active Node</span>
                      <span className="text-[8.5px] font-bold text-white block mt-0.5">Vista Retail</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Daily Brief Digest (Proactive Alerts) - spans 1 col on lg */}
              <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-850/80 flex flex-col justify-between h-full bg-[#08080a]/20">
                <div className="p-8 sm:p-10 pb-4 text-left">
                  <span className="text-[10px] text-zinc-455 font-mono tracking-widest uppercase mb-2 block font-bold">04 . KNOWLEDGE RETENTION</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug font-sans">
                    Zero-Maintenance Wiki
                  </h3>
                  <p className="text-[13px] text-zinc-400 mt-3 leading-relaxed font-normal font-sans">
                    Stop forcing employees to write documentation. Coretify builds your organization's intellectual capital automatically as team members interact and work.
                  </p>
                </div>
                <div className="px-8 sm:px-10 pb-10 pt-4 flex items-center justify-center bg-[#08080a]/60 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_12px] border-t border-slate-850/40 flex-1 min-h-[320px]">
                  <div className="w-full max-w-[300px] bg-[#0c0c0e]/95 border border-zinc-800 rounded-2xl p-4 shadow-xl text-left space-y-3 relative z-10">
                    {/* Header Band */}
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-indigo-400" />
                        Morning Brief: 7:00 AM
                      </span>
                      <span className="text-[8px] text-zinc-500 font-mono">Today</span>
                    </div>

                    {/* Email Brief Body */}
                    <div className="space-y-2.5">
                      {/* Item 1 */}
                      <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/15 flex items-start gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[9px] font-bold text-white">2 clients need follow-up</h5>
                          <p className="text-[8px] text-zinc-400 mt-0.5">Vista Retail: 0 touchpoints in 14 days.</p>
                        </div>
                      </div>

                      {/* Item 2 */}
                      <div className="p-2 rounded-lg bg-rose-500/5 border border-rose-500/15 flex items-start gap-2">
                        <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[9px] font-bold text-white">1 project at risk</h5>
                          <p className="text-[8px] text-zinc-400 mt-0.5">Nexa App: delayed by 5 days from schedule.</p>
                        </div>
                      </div>

                      {/* Item 3 */}
                      <div className="p-2 rounded-lg bg-indigo-500/5 border border-indigo-500/15 flex items-start gap-2">
                        <TrendingUp className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="text-[9px] font-bold text-white">Revenue down 12%</h5>
                          <p className="text-[8px] text-zinc-400 mt-0.5">Delayed milestone invoice found.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 5: Vertical Playbooks (Industry Tailored) - spans 1 col on lg */}
              <div className="lg:col-span-1 flex flex-col justify-between h-full bg-[#08080a]/20">
                <div className="p-8 sm:p-10 pb-4 text-left">
                  <span className="text-[10px] text-zinc-455 font-mono tracking-widest uppercase mb-2 block font-bold">05 . PLAYBOOK ENGAGEMENT</span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug font-sans">
                    Tailored Operational Insights
                  </h3>
                  <p className="text-[13px] text-zinc-400 mt-3 leading-relaxed font-normal font-sans">
                    Get targeted warnings built for your business. Track developer workload and scope creep for Software Houses, or time leaks and client retention for Agencies.
                  </p>
                </div>
                <div className="px-8 sm:px-10 pb-10 pt-4 flex items-center justify-center bg-[#08080a]/60 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_12px] border-t border-slate-850/40 flex-1 min-h-[320px]">
                  <div className="w-full max-w-[340px] space-y-3 relative z-10 text-left">
                    {/* Playbook selector */}
                    <div className="flex gap-1.5 p-1 rounded-xl bg-slate-950/60 border border-zinc-800 text-[10px] font-semibold text-zinc-400">
                      <span className="flex-1 text-center py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-bold cursor-pointer">Software House</span>
                      <span className="flex-1 text-center py-1 rounded-lg hover:text-white transition-colors cursor-pointer">Agency</span>
                      <span className="flex-1 text-center py-1 rounded-lg hover:text-white transition-colors cursor-pointer">Startup</span>
                    </div>

                    {/* Software House Playbook specific stats */}
                    <div className="bg-[#0c0c0e]/95 border border-zinc-800 rounded-2xl p-4 shadow-xl space-y-2.5">
                      <div className="flex items-center gap-2 text-zinc-400 text-[10px]">
                        <Building2 className="h-3.5 w-3.5 text-indigo-400" />
                        <span className="font-bold text-white">Software House Insights</span>
                      </div>

                      <div className="space-y-2">
                        {/* Insight 1 */}
                        <div className="p-2 bg-[#09090b]/80 border border-zinc-850 rounded-xl">
                          <span className="text-[8px] font-bold text-zinc-550 uppercase tracking-wide block">Project Scope creep</span>
                          <p className="text-[9px] text-zinc-350 font-semibold mt-0.5">63% of project delays are caused by client-requested API revisions post-kickoff.</p>
                        </div>

                        {/* Insight 2 */}
                        <div className="p-2 bg-[#09090b]/80 border border-zinc-850 rounded-xl">
                          <span className="text-[8px] font-bold text-zinc-550 uppercase tracking-wide block">Developer Overload</span>
                          <p className="text-[9px] text-zinc-355 font-semibold mt-0.5">Lead Architect is tagged in 80% of active Github/Doc items.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Spacer with diagonal stripes */}
            <div
              className="hidden lg:block border-l border-slate-850/80"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px, transparent 7px)'
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION: PLATFORM INFRASTRUCTURE */}
      <section className="w-full bg-[#070708] border-b border-slate-850/80">
        <div className="mx-auto max-w-[1360px] border-l border-r relative">
          
          {/* Section Header Band */}
          <div className="border-b border-slate-850/80 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-450 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">02</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">06</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">INFRASTRUCTURE</span>
              </div>
            </div>
          </div>

          {/* Section Title Block (spanning full width) */}
          <div className="py-12 px-8 sm:px-12 lg:px-16 text-left space-y-4 border-b border-slate-850/80 bg-transparent">
            <h2 className="text-3xl sm:text-[38px] font-semibold tracking-[-0.03em] leading-[1.12] bg-gradient-to-b from-white via-white to-zinc-400/90 bg-clip-text text-transparent pb-1 select-none">
              The architecture behind your company memory.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-3xl">
              A secure, passive integration layer that processes scattered business data into a queryable knowledge graph. 100% read-only, encrypted, and role-restricted.
            </p>
          </div>
          {/* Section Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
            
            {/* Left Column: Interactive Categories Switcher (Stretches full height, border runs all the way down) */}
            <div className="lg:col-span-4 lg:border-r lg:border-slate-850/80 relative h-full">
              {/* Inner sticky content */}
              <div className="lg:sticky lg:top-28 py-12 px-6 sm:px-8 flex flex-col gap-6 text-left">
                
                {/* Tab 1: Data */}
                <button
                  onClick={() => handleInfraTabChange("data")}
                  className={`w-full text-left py-4 pl-8 pr-5 transition-all duration-250 cursor-pointer block relative rounded-xl ${
                    activeInfraTab === "data" ? "opacity-100 bg-white/[0.02]" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-900/60 rounded-full" />
                  {activeInfraTab === "data" && (
                    <div 
                      className="absolute left-0 top-0 w-[2px] bg-emerald-500 rounded-full transition-all duration-75 ease-out"
                      style={{ height: `${infraProgress}%` }}
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Database className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-xs font-semibold text-white font-sans">Connect Data</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-normal font-sans">
                      Securely link Google Workspace, WhatsApp chat exports, and CSV spreadsheets in one click.
                    </p>
                  </div>
                </button>

                {/* Tab 2: Tools */}
                <button
                  onClick={() => handleInfraTabChange("tools")}
                  className={`w-full text-left py-4 pl-8 pr-5 transition-all duration-250 cursor-pointer block relative rounded-xl ${
                    activeInfraTab === "tools" ? "opacity-100 bg-white/[0.02]" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-900/60 rounded-full" />
                  {activeInfraTab === "tools" && (
                    <div 
                      className="absolute left-0 top-0 w-[2px] bg-purple-500 rounded-full transition-all duration-75 ease-out"
                      style={{ height: `${infraProgress}%` }}
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Zap className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-xs font-semibold text-white font-sans">Company Memory</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-normal font-sans">
                      Unify scattered operational context into a central, identity-resolved RAG index.
                    </p>
                  </div>
                </button>

                {/* Tab 3: Agent */}
                <button
                  onClick={() => handleInfraTabChange("agent")}
                  className={`w-full text-left py-4 pl-8 pr-5 transition-all duration-250 cursor-pointer block relative rounded-xl ${
                    activeInfraTab === "agent" ? "opacity-100 bg-white/[0.02]" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-900/60 rounded-full" />
                  {activeInfraTab === "agent" && (
                    <div 
                      className="absolute left-0 top-0 w-[2px] bg-zinc-300 rounded-full transition-all duration-75 ease-out"
                      style={{ height: `${infraProgress}%` }}
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded bg-zinc-800 border border-zinc-750 flex items-center justify-center text-zinc-300">
                        <Cpu className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-xs font-semibold text-white font-sans">Ask Business</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-normal font-sans">
                      Query your business in plain language and get instant answers with clickable citations.
                    </p>
                  </div>
                </button>

                {/* Tab 4: Governance */}
                <button
                  onClick={() => handleInfraTabChange("governance")}
                  className={`w-full text-left py-4 pl-8 pr-5 transition-all duration-250 cursor-pointer block relative rounded-xl ${
                    activeInfraTab === "governance" ? "opacity-100 bg-white/[0.02]" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-zinc-900/60 rounded-full" />
                  {activeInfraTab === "governance" && (
                    <div 
                      className="absolute left-0 top-0 w-[2px] bg-blue-500 rounded-full transition-all duration-75 ease-out"
                      style={{ height: `${infraProgress}%` }}
                    />
                  )}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="h-4.5 w-4.5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                        <ShieldCheck className="h-2.5 w-2.5" />
                      </span>
                      <span className="text-xs font-semibold text-white font-sans">Daily Brief</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-normal font-sans">
                      Start every morning with proactive alerts customized to your industry playbook.
                    </p>
                  </div>
                </button>
              </div>
            </div>
            {/* Right Column: Stacked High-Fidelity Showcase Cards */}
            <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col gap-10 bg-[#070708]/20 w-full">
              
              {/* Showcase Card 1: Data */}
              <div id="infra-card-data" className="w-full text-left scroll-mt-28 border border-slate-900 bg-[#09090b]/40 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Header & Description */}
                <div className="p-8 pb-6 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                    <span className="h-5 w-5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Database className="h-3 w-3" />
                    </span>
                    <span className="font-sans uppercase tracking-wider text-[11px]">Connect Data</span>
                  </div>
                  <h3 className="text-3xl font-semibold text-white tracking-tight leading-[1.15] font-sans">
                    Connect your scattered business data in one click
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal font-sans">
                    Coretify securely reads and integrates Gmail, Google Drive folders, Calendar schedules, WhatsApp chat exports, and financial CSV spreadsheets without requiring any write or delete permissions.
                  </p>
                  <div>
                    <CoretifyButton
                      onClick={handleStartOnboarding}
                      variant="dark"
                      size="default"
                      className="px-5 py-2.5 text-xs font-semibold border border-zinc-800 bg-[#131316] text-white rounded-lg hover:bg-zinc-900 transition-colors"
                    >
                      Learn More
                    </CoretifyButton>
                  </div>
                </div>

                <div className="border-t border-[#1a1a1f] bg-[#0c0c0e] flex flex-col w-full">
                  {/* Mockup macOS Title Bar & Tabs */}
                  <div className="h-10 border-b border-[#1a1a1f] bg-[#08080a] flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                      </div>
                      {/* Tab Buttons */}
                      <div className="flex items-center gap-1.5 ml-4 text-[10.5px]">
                        <div className="flex items-center gap-1.5 bg-[#0c0c0e] border-t border-l border-r border-[#1a1a1f] px-3.5 py-1 rounded-t-md text-white font-medium select-none">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>Core Data Model</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-350 px-3.5 py-1 cursor-pointer select-none">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60" />
                          <span>Companies last week</span>
                        </div>
                        <span className="text-zinc-650 font-bold ml-1 text-xs cursor-pointer">+</span>
                      </div>
                    </div>
                  </div>

                  {/* Window Content Area (Split Sidebar & Table) */}
                  <div className="grid grid-cols-12 min-h-[380px] w-full">
                    {/* Left Sidebar inside Mockup */}
                    <div className="col-span-12 md:col-span-3 border-b md:border-b-0 md:border-r border-[#1a1a1f] bg-[#08080a]/60 p-3.5 space-y-4 text-left">
                      <button className="w-full flex items-center justify-center gap-1.5 border border-[#1a1a1f] bg-[#0c0c0e] hover:bg-[#131316] text-[10.5px] font-semibold text-zinc-300 py-1.5 px-3 rounded-lg transition-colors cursor-pointer">
                        <span>+</span>
                        <span>Create new view</span>
                      </button>

                      <div className="space-y-1 text-zinc-400 text-[11px] font-medium">
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                          <span className="h-3 w-3 text-emerald-500 flex items-center justify-center font-bold">⌂</span>
                          <span>Home</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                          <span className="h-3 w-3 text-blue-400 flex items-center justify-center font-bold">::</span>
                          <span>All Contacts</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                          <span className="h-3 w-3 text-blue-500 flex items-center justify-center font-bold">📁</span>
                          <span>All Accounts</span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                          <span className="h-3 w-3 text-yellow-500 flex items-center justify-center font-bold">★</span>
                          <span>All Opportunities</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[9px] font-bold text-zinc-650 uppercase tracking-wider px-2.5 py-1">My views</div>
                        <div className="space-y-0.5 text-[11px] text-zinc-400 font-medium">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#131316] text-white">
                            <span className="text-[9px]">▤</span>
                            <span className="truncate">Core Data Model</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                            <span className="text-[9px] text-zinc-600">▤</span>
                            <span className="truncate">Leads from All Booking ...</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                            <span className="text-[9px] text-zinc-600">▤</span>
                            <span className="truncate">Leads from All Forms</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                            <span className="text-[9px] text-zinc-600">▤</span>
                            <span className="truncate">New startups in NY</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer">
                            <span className="text-[9px] text-zinc-600">▤</span>
                            <span className="truncate">All Closed-Won Opps</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Table Panel inside Mockup */}
                    <div className="col-span-12 md:col-span-9 flex flex-col bg-[#0c0c0e]">
                      <div className="h-10 border-b border-[#1a1a1f] px-4.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-[#08080a] border border-[#1a1a1f] rounded-md px-2.5 py-1 text-[10.5px] text-zinc-550 w-44">
                            <Search className="h-3 w-3 mr-1.5 text-zinc-600" />
                            <span>Search records</span>
                          </div>
                          <span className="h-7 w-7 flex items-center justify-center border border-[#1a1a1f] rounded-md bg-[#08080a] text-zinc-500 hover:text-white text-[11px] cursor-pointer">⇅</span>
                          <span className="h-7 w-7 flex items-center justify-center border border-[#1a1a1f] rounded-md bg-[#08080a] text-zinc-500 hover:text-white text-[11px] cursor-pointer">☰</span>
                        </div>
                        <div className="flex items-center gap-1.5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-semibold text-[9.5px] px-2.5 py-0.5 rounded-full select-none">
                          <span className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live</span>
                        </div>
                      </div>

                      {/* Database Records Table */}
                      <div className="overflow-auto flex-1 text-[10.5px]">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                          <thead>
                            <tr className="border-b border-[#1a1a1f] text-zinc-550 font-mono bg-[#08080a]/30 h-8">
                              <th className="py-2 px-3.5 w-6"><input type="checkbox" className="rounded border-zinc-800 accent-emerald-500 bg-transparent" readOnly /></th>
                              <th className="py-2 px-3 font-normal">@ Work Email</th>
                              <th className="py-2 px-3 font-normal">Company name</th>
                              <th className="py-2 px-3 font-normal"># Headcount</th>
                              <th className="py-2 px-3 font-normal">Mobile phone</th>
                              <th className="py-2 px-3 font-normal">Job title</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#18181b] text-zinc-300">
                            <tr className="h-9 hover:bg-[#131316]/40 transition-colors">
                              <td className="py-2 px-3.5"><input type="checkbox" className="rounded border-zinc-800 bg-transparent" readOnly /></td>
                              <td className="py-2 px-3 text-white font-medium">michelle.rivera@example.com</td>
                              <td className="py-2 px-3"><span className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-zinc-900 border border-zinc-800 text-[8px] font-bold text-center text-zinc-400 flex items-center justify-center">a</span>Attio</span></td>
                              <td className="py-2 px-3 text-zinc-400">$3,385,492</td>
                              <td className="py-2 px-3 text-zinc-550">+1 (415) 555 0142</td>
                              <td className="py-2 px-3 text-zinc-450">Founding Engineer</td>
                            </tr>
                            <tr className="h-9 hover:bg-[#131316]/40 transition-colors">
                              <td className="py-2 px-3.5"><input type="checkbox" className="rounded border-zinc-800 bg-transparent" readOnly /></td>
                              <td className="py-2 px-3 text-white font-medium">felicia.reid@example.com</td>
                              <td className="py-2 px-3"><span className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-blue-900/40 border border-blue-800/40 text-[8px] font-bold text-center text-blue-400 flex items-center justify-center">a</span>Amplemarket</span></td>
                              <td className="py-2 px-3 text-zinc-400">$5,375,784</td>
                              <td className="py-2 px-3 text-zinc-550">+1 (212) 555 0118</td>
                              <td className="py-2 px-3 text-zinc-450">Head of Sales</td>
                            </tr>
                            <tr className="h-9 hover:bg-[#131316]/40 transition-colors">
                              <td className="py-2 px-3.5"><input type="checkbox" className="rounded border-zinc-800 bg-transparent" readOnly /></td>
                              <td className="py-2 px-3 text-white font-medium">james.smith@example.com</td>
                              <td className="py-2 px-3"><span className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-amber-900/30 border border-amber-800/40 text-[8px] font-bold text-center text-amber-500 flex items-center justify-center">☼</span>Apollo</span></td>
                              <td className="py-2 px-3 text-zinc-400">$2,140,800</td>
                              <td className="py-2 px-3 text-zinc-550">+1 (206) 555 0167</td>
                              <td className="py-2 px-3 text-zinc-450">Field CTO</td>
                            </tr>
                            <tr className="h-9 hover:bg-[#131316]/40 transition-colors">
                              <td className="py-2 px-3.5"><input type="checkbox" className="rounded border-zinc-800 bg-transparent" readOnly /></td>
                              <td className="py-2 px-3 text-white font-medium">patricia.johnson@example.com</td>
                              <td className="py-2 px-3"><span className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-blue-500/20 border border-blue-500/30 text-[8px] font-bold text-center text-blue-400 flex items-center justify-center">c</span>Calendly</span></td>
                              <td className="py-2 px-3 text-zinc-400">$890,250</td>
                              <td className="py-2 px-3 text-zinc-550">+1 (404) 555 01...</td>
                              <td className="py-2 px-3 text-zinc-450">Account Executive</td>
                            </tr>
                            <tr className="h-9 hover:bg-[#131316]/40 transition-colors">
                              <td className="py-2 px-3.5"><input type="checkbox" className="rounded border-zinc-800 bg-transparent" readOnly /></td>
                              <td className="py-2 px-3 text-white font-medium">robert.brown@example.com</td>
                              <td className="py-2 px-3"><span className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-cyan-950 border border-cyan-800 text-[8px] font-bold text-center text-cyan-400 flex items-center justify-center">c</span>Clearbit</span></td>
                              <td className="py-2 px-3 text-zinc-400">$1,275,310</td>
                              <td className="py-2 px-3 text-zinc-550">+1 (415) 555 0190</td>
                              <td className="py-2 px-3 text-zinc-450">Sr. AE, Mid-Market</td>
                            </tr>
                            <tr className="h-9 hover:bg-[#131316]/40 transition-colors">
                              <td className="py-2 px-3.5"><input type="checkbox" className="rounded border-zinc-800 bg-transparent" readOnly /></td>
                              <td className="py-2 px-3 text-white font-medium">elena.cortez@example.com</td>
                              <td className="py-2 px-3"><span className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-[#09090b] border border-blue-900 text-[8px] font-bold text-center text-blue-400 flex items-center justify-center">❄</span>Snowflake</span></td>
                              <td className="py-2 px-3 text-zinc-400">$8,920,400</td>
                              <td className="py-2 px-3 text-zinc-550">+1 (617) 555 0144</td>
                              <td className="py-2 px-3 text-zinc-450">VP Sales</td>
                            </tr>
                            <tr className="h-9 hover:bg-[#131316]/40 transition-colors">
                              <td className="py-2 px-3.5"><input type="checkbox" className="rounded border-zinc-800 bg-transparent" readOnly /></td>
                              <td className="py-2 px-3 text-white font-medium">marcus.lee@example.com</td>
                              <td className="py-2 px-3"><span className="inline-flex items-center gap-1"><span className="h-3.5 w-3.5 rounded bg-[#09090b] border border-zinc-800 text-[8px] font-black text-center text-white flex items-center justify-center">▲</span>Vercel</span></td>
                              <td className="py-2 px-3 text-zinc-400">$4,510,675</td>
                              <td className="py-2 px-3 text-zinc-550">+1 (737) 555 0173</td>
                              <td className="py-2 px-3 text-zinc-450">Strategic Account Executive</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showcase Card 2: Tools */}
              <div id="infra-card-tools" className="w-full text-left scroll-mt-28 border border-slate-900 bg-[#09090b]/40 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Header & Description */}
                <div className="p-8 pb-6 space-y-4">
                  <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold">
                    <span className="h-5 w-5 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Zap className="h-3 w-3" />
                    </span>
                    <span className="font-sans uppercase tracking-wider text-[11px]">Company Memory</span>
                  </div>
                  <h3 className="text-3xl font-semibold text-white tracking-tight leading-[1.15] font-sans">
                    Unify scattered operational context into a central brain
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal font-sans">
                    Our progressive ingestion pipeline analyzes documents, meetings, and communications to map entities—linking Clients, Projects, Decisions, and Tasks into an identity-resolved relational graph.
                  </p>
                  <div>
                    <CoretifyButton
                      onClick={handleStartOnboarding}
                      variant="dark"
                      size="default"
                      className="px-5 py-2.5 text-xs font-semibold border border-zinc-800 bg-[#131316] text-white rounded-lg hover:bg-zinc-900 transition-colors"
                    >
                      Learn More
                    </CoretifyButton>
                  </div>
                </div>

                {/* HIGH FIDELITY WINDOW MOCKUP (touches left, right, and bottom borders) */}
                <div className="border-t border-[#1a1a1f] bg-[#0c0c0e] flex flex-col w-full">
                  {/* Mockup macOS Title Bar */}
                  <div className="h-10 border-b border-[#1a1a1f] bg-[#08080a] flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                      </div>
                      <div className="flex items-center gap-1.5 ml-4 text-[10.5px]">
                        <div className="flex items-center gap-1.5 bg-[#0c0c0e] border-t border-l border-r border-[#1a1a1f] px-3.5 py-1 rounded-t-md text-white font-medium select-none">
                          <Zap className="h-3 w-3 text-purple-400" />
                          <span>Default Inbound Workflow</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-550 px-3.5 py-1 select-none">
                          <span>Untitled Workflow</span>
                        </div>
                        <span className="text-zinc-650 font-bold ml-1 text-xs cursor-pointer">+</span>
                      </div>
                    </div>
                  </div>

                  {/* Window Content Area (Split Sidebar & Visual Canvas) */}
                  <div className="grid grid-cols-12 min-h-[380px] w-full">
                    {/* Left Sidebar */}
                    <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-[#1a1a1f] bg-[#08080a]/60 p-4 space-y-4 text-left">
                      <div className="relative flex items-center bg-[#08080a] border border-[#1a1a1f] rounded-lg p-2 text-xs text-zinc-550">
                        <Search className="h-3.5 w-3.5 mr-2 text-zinc-600" />
                        <span>Search steps</span>
                      </div>

                      <div className="space-y-3">
                        {/* Triggers Category */}
                        <div>
                          <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-1 px-1">Logic</div>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px] text-zinc-350">
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-zinc-800 transition-colors">
                              <span className="text-orange-400">☼</span>
                              <span className="font-semibold">If / else</span>
                            </div>
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-zinc-800 transition-colors">
                              <span className="text-yellow-400">☼</span>
                              <span className="font-semibold">Multi-route</span>
                            </div>
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-zinc-800 transition-colors">
                              <span className="text-blue-400">⟳</span>
                              <span className="font-semibold">Loop</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions Category */}
                        <div>
                          <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-1 px-1">Actions</div>
                          <div className="grid grid-cols-2 gap-1.5 text-[10px] text-zinc-350">
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-purple-500/20 transition-colors">
                              <span className="text-purple-400">✉</span>
                              <span className="font-semibold truncate">Send msg</span>
                            </div>
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-purple-500/20 transition-colors">
                              <span className="text-indigo-400">⚡</span>
                              <span className="font-semibold truncate">Process RAG</span>
                            </div>
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-purple-500/20 transition-colors">
                              <span className="text-emerald-400">▤</span>
                              <span className="font-semibold truncate">Add row</span>
                            </div>
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-purple-500/20 transition-colors">
                              <span className="text-blue-400">👥</span>
                              <span className="font-semibold truncate">Route owner</span>
                            </div>
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-purple-500/20 transition-colors">
                              <span className="text-red-400">✖</span>
                              <span className="font-semibold truncate">End delay</span>
                            </div>
                            <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center gap-1.5 cursor-pointer hover:border-purple-500/20 transition-colors">
                              <span className="text-amber-500">⏰</span>
                              <span className="font-semibold truncate">Delay workflow</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Canvas Panel */}
                    <div className="col-span-12 md:col-span-8 flex flex-col bg-[#0c0c0e] p-6 items-center justify-center relative select-none min-h-[300px]">
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1.5px,transparent_1.5px)] bg-[size:18px_18px] pointer-events-none" />
                      
                      <div className="flex flex-col items-center gap-4 w-full max-w-[320px] z-10">
                        {/* Node 1: Trigger */}
                        <div className="w-full bg-[#08080a] border border-[#1a1a1f] rounded-xl p-3 flex flex-col gap-1 shadow-md text-left">
                          <span className="text-[8px] text-zinc-550 font-bold tracking-wide">TRIGGER</span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">Default Inbound</span>
                            <span className="text-[8.5px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">Live</span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="h-6 w-[1px] bg-slate-800 relative">
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-[3.5px] border-r-[3.5px] border-t-[5px] border-l-transparent border-r-transparent border-t-slate-800" />
                        </div>

                        {/* Node 2: Action logic */}
                        <div className="w-full bg-[#08080a] border border-[#1a1a1f] rounded-xl p-3 flex flex-col gap-1 shadow-md text-left relative">
                          <span className="text-[8px] text-zinc-550 font-bold tracking-wide">ACTION LOGIC</span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-white">Process RAG & Sync</span>
                            <span className="text-[8.5px] text-zinc-400">Step 2</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showcase Card 3: Agent */}
              <div id="infra-card-agent" className="w-full text-left scroll-mt-28 border border-slate-900 bg-[#09090b]/40 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Header & Description */}
                <div className="p-8 pb-6 space-y-4">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold">
                    <span className="h-5 w-5 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
                      <Cpu className="h-3 w-3" />
                    </span>
                    <span className="font-sans uppercase tracking-wider text-[11px]">Ask Business</span>
                  </div>
                  <h3 className="text-3xl font-semibold text-white tracking-tight leading-[1.15] font-sans">
                    Ask your business operational questions in plain language
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal font-sans">
                    Query decisions, project bottlenecks, and client follow-ups instantly. Every AI response includes clickable source citations linking directly back to the original emails or documents.
                  </p>
                  <div>
                    <CoretifyButton
                      onClick={handleStartOnboarding}
                      variant="dark"
                      size="default"
                      className="px-5 py-2.5 text-xs font-semibold border border-zinc-800 bg-[#131316] text-white rounded-lg hover:bg-zinc-900 transition-colors"
                    >
                      Learn More
                    </CoretifyButton>
                  </div>
                </div>

                <div className="border-t border-[#1a1a1f] bg-[#0c0c0e] flex flex-col w-full">
                  {/* Mockup macOS Title Bar */}
                  <div className="h-10 border-b border-[#1a1a1f] bg-[#08080a] flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                      </div>
                      <div className="flex items-center gap-1.5 ml-4 text-[10.5px]">
                        <div className="flex items-center gap-1.5 bg-[#0c0c0e] border-t border-l border-r border-[#1a1a1f] px-3.5 py-1 rounded-t-md text-white font-medium select-none">
                          <Bot className="h-3.5 w-3.5 text-zinc-400" />
                          <span>Coretify Agent Console</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Window Content Area (Split Sidebar & Chat Box) */}
                  <div className="grid grid-cols-12 min-h-[380px] w-full">
                    {/* Left Sidebar */}
                    <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-[#1a1a1f] bg-[#08080a]/60 p-4 space-y-4 text-left">
                      <button className="w-full flex items-center justify-center gap-1.5 border border-[#1a1a1f] bg-[#0c0c0e] hover:bg-[#131316] text-[10.5px] font-semibold text-zinc-300 py-1.5 px-3 rounded-lg transition-colors cursor-pointer">
                        <span>+</span>
                        <span>New Chat</span>
                      </button>

                      <div className="space-y-1">
                        <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider px-2.5 py-1">Chats</div>
                        <div className="space-y-0.5 text-[11px] text-zinc-400 font-medium">
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer text-zinc-300">
                            <span>▤</span>
                            <span className="truncate">Churning Leads</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer text-zinc-300">
                            <span>▤</span>
                            <span className="truncate">Leads from All Booking Links</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer text-zinc-300">
                            <span>▤</span>
                            <span className="truncate">Churning Leads</span>
                          </div>
                          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md hover:bg-zinc-900 cursor-pointer text-zinc-300">
                            <span>▤</span>
                            <span className="truncate">Leads from All Booking Links</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Chat Panel */}
                    <div className="col-span-12 md:col-span-8 flex flex-col bg-[#0c0c0e] justify-between p-6 text-left relative min-h-[300px]">
                      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                        <span className="text-zinc-600 text-3xl">💬</span>
                        <h4 className="text-lg font-semibold text-zinc-300">How can I help today?</h4>
                        
                        <div className="w-full max-w-[320px] bg-[#08080a] border border-[#1a1a1f] rounded-xl p-3.5 flex items-center justify-between text-zinc-550 text-[10.5px]">
                          <span>Type anything...</span>
                          <div className="flex items-center gap-1.5">
                            <span>📎</span>
                            <span>⎆</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Showcase Card 4: Governance */}
              <div id="infra-card-governance" className="w-full text-left scroll-mt-28 border border-slate-900 bg-[#09090b]/40 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                
                {/* Header & Description */}
                <div className="p-8 pb-6 space-y-4">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold">
                    <span className="h-5 w-5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-sans uppercase tracking-wider text-[11px]">Daily Brief</span>
                  </div>
                  <h3 className="text-3xl font-semibold text-white tracking-tight leading-[1.15] font-sans">
                    Start every morning with vertical-aware insights
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl font-normal font-sans">
                    Receive morning alerts tailored to your industry playbook (scope creep warning, client capacity risks, or stalled goals) and drill down to resolve issues in minutes.
                  </p>
                  <div>
                    <CoretifyButton
                      onClick={handleStartOnboarding}
                      variant="dark"
                      size="default"
                      className="px-5 py-2.5 text-xs font-semibold border border-zinc-800 bg-[#131316] text-white rounded-lg hover:bg-zinc-900 transition-colors"
                    >
                      Learn More
                    </CoretifyButton>
                  </div>
                </div>

                {/* HIGH FIDELITY WINDOW MOCKUP (touches left, right, and bottom borders) */}
                <div className="border-t border-[#1a1a1f] bg-[#0c0c0e] flex flex-col w-full">
                  {/* Mockup macOS Title Bar */}
                  <div className="h-10 border-b border-[#1a1a1f] bg-[#08080a] flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                        <span className="h-2.5 w-2.5 rounded-full bg-slate-800" />
                      </div>
                      <div className="flex items-center gap-1.5 ml-4 text-[10.5px]">
                        <div className="flex items-center gap-1.5 bg-[#0c0c0e] border-t border-l border-r border-[#1a1a1f] px-3.5 py-1 rounded-t-md text-white font-medium select-none">
                          <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                          <span>Inbound Workflow History</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-550 px-3.5 py-1 select-none">
                          <span>Outbound Workflow</span>
                        </div>
                        <span className="text-zinc-650 font-bold ml-1 text-xs cursor-pointer">+</span>
                      </div>
                    </div>
                  </div>

                  {/* Window Content Area (Split Sidebar & Audit Panel) */}
                  <div className="grid grid-cols-12 min-h-[380px] w-full">
                    {/* Left Sidebar (Version History) */}
                    <div className="col-span-12 md:col-span-4 border-b md:border-b-0 md:border-r border-[#1a1a1f] bg-[#08080a]/60 p-4 space-y-4 text-left">
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Version History</div>
                      
                      <div className="space-y-2 text-[10px]">
                        <div className="p-2 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-white block">Current Version</span>
                            <span className="text-zinc-500 text-[8px]">Just now</span>
                          </div>
                          <span className="text-[8px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono font-bold">Dot</span>
                        </div>

                        <div className="p-2 border border-transparent rounded-lg flex items-center justify-between text-zinc-400 hover:bg-[#131316]/30 cursor-pointer">
                          <div>
                            <span className="font-semibold block">Version 7</span>
                            <span className="text-zinc-500 text-[8px]">Yesterday, 5:30 PM</span>
                          </div>
                          <span className="text-[8px] text-zinc-500 font-mono">Dot</span>
                        </div>

                        <div className="p-2 border border-transparent rounded-lg flex items-center justify-between text-zinc-400 hover:bg-[#131316]/30 cursor-pointer">
                          <div>
                            <span className="font-semibold block">Version 6</span>
                            <span className="text-zinc-500 text-[8px]">Today, 4:15 PM</span>
                          </div>
                          <span className="text-[8px] text-zinc-500 font-mono">Dot</span>
                        </div>

                        <div className="p-2 border border-transparent rounded-lg flex items-center justify-between text-zinc-400 hover:bg-[#131316]/30 cursor-pointer">
                          <div>
                            <span className="font-semibold block">Version 5</span>
                            <span className="text-zinc-500 text-[8px]">Today, 3:00 PM</span>
                          </div>
                          <span className="text-[8px] text-zinc-500 font-mono">Dot</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Panel (Workflow Node View) */}
                    <div className="col-span-12 md:col-span-8 flex flex-col bg-[#0c0c0e] p-6 items-center justify-center relative min-h-[300px]">
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.012)_1.5px,transparent_1.5px)] bg-[size:18px_18px] pointer-events-none" />
                      
                      <div className="w-full max-w-[320px] bg-[#08080a] border border-[#1a1a1f] rounded-xl p-3 flex flex-col gap-1.5 shadow-md text-left z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-emerald-400 font-bold">● Live</span>
                          <span className="text-zinc-650 text-[10px]">Default Inbound...</span>
                        </div>
                        <div className="w-full h-px bg-slate-900" />
                        
                        <div className="flex flex-col gap-2">
                          <div className="p-2.5 bg-[#0c0c0e] border border-[#1a1a1f] rounded-lg">
                            <span className="text-[8px] text-zinc-550 font-bold block">TRIGGER</span>
                            <span className="text-[10px] text-white font-semibold block">New Form Submission 2</span>
                          </div>
                          
                          <div className="h-4 w-[1px] bg-slate-800 self-center" />
                          
                          <div className="p-2.5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                            <span className="text-[8px] text-blue-400 font-bold block">ACTION</span>
                            <span className="text-[10px] text-white font-semibold block">Deploy Scheduler</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PRICING */}
      <section className="w-full bg-[#070708]/40 border-b border-slate-850/80">
        <div className="mx-auto max-w-[1360px] border-l border-r relative">
          
          {/* Section Header Band */}
          <div className="border-b border-slate-850/80 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-450 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">03</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">06</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">PRICING</span>
              </div>
            </div>
          </div>

          {/* Centered Title block */}
          <div className="py-16 px-8 sm:px-12 lg:px-16 text-center flex flex-col items-center justify-center space-y-4 bg-transparent">
            {/* Large centered title */}
            <h2 className="text-3xl sm:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] bg-gradient-to-b from-white via-white to-zinc-400/90 bg-clip-text text-transparent pb-1 select-none max-w-3xl">
              Simple pricing that scales with you
            </h2>
            {/* Centered description */}
            <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-xl leading-relaxed">
              Choose a plan that fits your team today and upgrade anytime as your data, users, and ambitions grow.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-[1fr] lg:grid-cols-[50px_1fr_50px] w-full border-t border-slate-850/80">
              {/* Left Spacer */}
              <div
                className="hidden lg:block border-r border-slate-850/80"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px, transparent 7px)'
                }}
              />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-[#09090b]/10">
            
            {/* Free Tier */}
            <div className="p-8 flex flex-col justify-between border-b border-slate-850/80 md:border-r lg:border-b-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-200">Free</h3>
                  <p className="text-xs text-zinc-500 mt-1">Sempurna untuk uji coba personal.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white tracking-tight">Rp 0</span>
                  <span className="text-zinc-500 text-xs font-semibold ml-1">/ bulan</span>
                </div>
                <div className="w-full h-px bg-slate-850/50" />
                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Maksimal 2 konektor data (Gmail & Calendar)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>50 pertanyaan AI / bulan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Batas 500 dokumen memori</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Akses 1 pengguna saja</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <CoretifyButton
                  onClick={handleStartOnboarding}
                  variant="dark"
                  className="w-full py-5 text-xs font-semibold"
                >
                  Get Started
                </CoretifyButton>
              </div>
            </div>

            {/* Starter Tier */}
            <div className="p-8 flex flex-col justify-between border-b border-slate-850/80 lg:border-r lg:border-b-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-200">Starter</h3>
                  <p className="text-xs text-zinc-500 mt-1">Untuk tim kecil yang mulai berkolaborasi.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white tracking-tight">Rp 199k</span>
                  <span className="text-zinc-500 text-xs font-semibold ml-1">/ bulan</span>
                </div>
                <div className="w-full h-px bg-slate-850/50" />
                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hingga 5 konektor data aktif</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>500 pertanyaan AI / bulan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Batas 10.000 dokumen memori</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hingga 3 anggota tim</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Insights playbook standar</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <CoretifyButton
                  onClick={handleStartOnboarding}
                  variant="dark"
                  className="w-full py-5 text-xs font-semibold"
                >
                  Upgrade to Starter
                </CoretifyButton>
              </div>
            </div>

            {/* Growth Tier [Popular] */}
            <div className="p-8 flex flex-col justify-between border-b border-slate-850/80 md:border-r md:border-b-0 lg:border-b-0 lg:border-r relative bg-gradient-to-b from-purple-950/10 via-[#0c0c0e]/30 to-transparent">
              
              {/* Popular Badge & Glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-36 w-full max-w-[240px] bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-200">Growth</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/15 text-purple-400 border border-purple-500/20">
                    POPULAR
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white tracking-tight">Rp 499k</span>
                  <span className="text-zinc-500 text-xs font-semibold ml-1">/ bulan</span>
                </div>
                <div className="w-full h-px bg-purple-500/20" />
                <ul className="space-y-3.5 text-xs text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-slate-200">Konektor data tanpa batas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>5.000 pertanyaan AI / bulan</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-slate-200">Dokumen memori tanpa batas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Hingga 10 anggota tim</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Prioritas playbook & insight kustom</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <CoretifyButton
                  onClick={handleStartOnboarding}
                  variant="white"
                  className="w-full py-5 text-xs font-semibold shadow-lg hover:shadow-purple-500/10"
                >
                  Try Growth Free
                </CoretifyButton>
              </div>
            </div>

            {/* Business Tier */}
            <div className="p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-slate-200">Business</h3>
                  <p className="text-xs text-zinc-500 mt-1">Untuk perusahaan besar dengan tata kelola khusus.</p>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-white tracking-tight">Rp 1.99M</span>
                  <span className="text-zinc-500 text-xs font-semibold ml-1">/ bulan</span>
                </div>
                <div className="w-full h-px bg-slate-850/50" />
                <ul className="space-y-3.5 text-xs text-zinc-400">
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Konektor standard + custom API</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium text-slate-200">Pertanyaan AI tanpa batas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Anggota tim tanpa batas</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Kustomisasi kepatuhan & log audit</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <svg className="h-4 w-4 text-zinc-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Dukungan khusus & SLA 99.9%</span>
                  </li>
                </ul>
              </div>
              <div className="pt-8">
                <CoretifyButton
                  onClick={handleStartOnboarding}
                  variant="dark"
                  className="w-full py-5 text-xs font-semibold"
                >
                  Contact Sales
                </CoretifyButton>
              </div>
            </div>

            </div>
              {/* Right Spacer */}
              <div
                className="hidden lg:block border-l border-slate-850/80"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px, transparent 7px)'
                }}
              />
          </div>
        </div>
      </section>

      {/* SECTION 3: INTEGRATIONS GRID */}
      <section className="w-full bg-[#070708]/40 border-b border-slate-850/80">
        <div className="mx-auto max-w-[1360px] border-l border-r relative">
          
          {/* Section Content Area */}
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Copywriting & CTA */}
              <div className="lg:col-span-5 space-y-8 text-left">
                <div className="space-y-4">
                  <h2 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.025em] leading-[1.12] bg-gradient-to-b from-white via-white to-zinc-400/90 bg-clip-text text-transparent pb-1 select-none font-sans">
                    Connect with your favorite tools.
                  </h2>
                  <p className="text-zinc-400 text-[13px] leading-relaxed font-normal">
                    Coretify reads your operational data securely in one click. Zero write permissions, zero deletion rights—pure read-only intelligence that unifies Gmail, Drive, Calendar, WhatsApp, and spreadsheets into one central brain.
                  </p>
                </div>

                <div>
                  <CoretifyButton
                    onClick={handleStartOnboarding}
                    variant="white"
                    size="lg"
                    className="px-7 py-5.5 text-[13px] font-semibold shadow-lg"
                  >
                    Start Connecting
                  </CoretifyButton>
                </div>
              </div>

              {/* Spacing Column */}
              <div className="hidden lg:block lg:col-span-1" />

              {/* Right Column: SaaS Integrations Grid */}
              <div className="lg:col-span-6 w-full">
                
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 select-none relative">
                  
                  {/* Subtle radial glow under grid */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-indigo-500/5 to-emerald-500/5 blur-3xl rounded-full -z-10 pointer-events-none" />

                  {/* Row 1 */}
                  {/* Cell 1: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 2: WhatsApp Lite */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-emerald-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 24 24" className="h-8.5 w-8.5 fill-current text-[#25D366] group-hover:scale-110 transition-transform duration-300">
                      <path d="M12.004 2C6.51 2 2.014 6.5 2.014 12c0 2.14.68 4.18 1.97 5.9L2.03 22l4.22-1.1c1.63.9 3.5 1.4 5.75 1.4 5.5 0 10-4.5 10-10S17.5 2 12.004 2zm5.73 14.28c-.24.68-1.2 1.25-1.65 1.3-.46.06-.9.1-2.9-.7-2.55-1.03-4.2-3.6-4.32-3.77-.13-.17-1.07-1.4-1.07-2.7 0-1.28.67-1.92.9-2.2.25-.26.54-.33.72-.33.18 0 .36 0 .5.02.16 0 .37-.06.57.43.2.5.7 1.7.75 1.8.06.12.1.27.02.43-.08.16-.12.26-.25.4-.12.14-.26.3-.37.42-.12.12-.25.26-.1.5.14.24.62 1.03 1.32 1.66.9.8 1.66 1.05 1.9 1.17.24.12.38.1.52-.06.14-.16.6-1.03.77-1.37.16-.34.33-.28.56-.2.23.08 1.48.7 1.73.82.25.12.4.18.46.3.06.1.06.67-.18 1.34z"/>
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2.5 font-mono">WA Lite</span>
                  </div>

                  {/* Cell 3: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 4: Google Calendar */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 48 48" className="h-9 w-9 group-hover:scale-110 transition-transform duration-300">
                      <path d="M26 4H8C5.8 4 4 5.8 4 8v32c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V22L26 4z" fill="#4285F4"/>
                      <path d="M44 22H26V4l18 18z" fill="#1565C0"/>
                      <text x="22" y="34" fill="#FFF" fontSize="21" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">31</text>
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2 font-mono">Calendar</span>
                  </div>

                  {/* Cell 5: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 6: Notion */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-zinc-700 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(255,255,255,0.04)] group cursor-pointer">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 group-hover:scale-110 transition-transform duration-300">
                      <rect x="2" y="2" width="20" height="20" rx="4" fill="#FFF" stroke="#000" strokeWidth="1.5"/>
                      <path d="M6 6h2.5l7.5 9.5V6h2.5v12h-2.5L8.5 8.5V18H6V6z" fill="#000"/>
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2.5 font-mono">Notion</span>
                  </div>

                  {/* Row 2 */}
                  {/* Cell 7: Gmail */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-rose-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(239,68,68,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 48 48" className="h-9 w-9 group-hover:scale-110 transition-transform duration-300">
                      <path d="M4 12v24c0 2.2 1.8 4 4 4h6V18L4 12z" fill="#4285F4"/>
                      <path d="M44 12v24c0 2.2-1.8 4-4 4h-6V18l10-6z" fill="#34A853"/>
                      <path d="M14 18h20V8L24 16 14 8v10z" fill="#EA4335"/>
                      <path d="M4 12l20 15 20-15v-4L24 22 4 8v4z" fill="#FBBC05"/>
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2.5 font-mono">Gmail</span>
                  </div>

                  {/* Cell 8: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 9: Google Drive */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-amber-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(245,158,11,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 48 48" className="h-9 w-9 group-hover:scale-110 transition-transform duration-300">
                      <path d="M16 6h16l15 26H31L16 6z" fill="#FFCC00"/>
                      <path d="M32 32H2L10 18h30l-8 14z" fill="#00AA47"/>
                      <path d="M16 6L1 32l8 14 23-40H16z" fill="#4285F4"/>
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2 font-mono">Drive</span>
                  </div>

                  {/* Cell 10: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 11: Zapier */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-orange-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 48 48" className="h-8.5 w-8.5 group-hover:scale-110 transition-transform duration-300">
                      <circle cx="24" cy="24" r="22" fill="#FF4F00"/>
                      <g stroke="#FFF" strokeWidth="5.5" strokeLinecap="round">
                        <line x1="24" y1="12" x2="24" y2="36" />
                        <line x1="13.6" y1="18" x2="34.4" y2="30" />
                        <line x1="13.6" y1="30" x2="34.4" y2="18" />
                      </g>
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2.5 font-mono">Zapier</span>
                  </div>

                  {/* Cell 12: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Row 3 */}
                  {/* Cell 13: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 14: CSV/Excel */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-teal-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(20,184,166,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 48 48" className="h-9 w-9 group-hover:scale-110 transition-transform duration-300">
                      <rect x="4" y="4" width="40" height="40" rx="6" fill="#107C41" />
                      <path d="M26 14h10v20H26z" fill="#FFF" opacity="0.15" />
                      <path d="M12 14l8 10-8 10h5l5.5-7 5.5 7h5L25 24l8-10h-5l-5.5 7-5.5-7h-5z" fill="#FFF" />
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2 font-mono">Excel/CSV</span>
                  </div>

                  {/* Cell 15: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 16: Slack */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-purple-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 100 100" className="h-9 w-9 group-hover:scale-110 transition-transform duration-300">
                      <path d="M20 50a10 10 0 1 1 10-10v10H20zm10 10a10 10 0 1 1 0-20h20v20H30z" fill="#36C5F0"/>
                      <path d="M50 20a10 10 0 1 1 10 10H50V20zm10 10a10 10 0 1 1-20 0V10h20v20z" fill="#2EB67D"/>
                      <path d="M80 50a10 10 0 1 1-10 10V50h10zm-10-10a10 10 0 1 1 0 20H50V40h20z" fill="#ECB22E"/>
                      <path d="M50 80a10 10 0 1 1-10-10h10v10zm-10-10a10 10 0 1 1 20 0v10H40v-20z" fill="#E01E5A"/>
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2 font-mono">Slack</span>
                  </div>

                  {/* Cell 17: Empty */}
                  <div className="aspect-square rounded-2xl border border-slate-900/40 bg-transparent flex items-center justify-center" />

                  {/* Cell 18: Accurate/Jurnal */}
                  <div className="aspect-square rounded-2xl border border-slate-850 bg-[#0c0c0e]/80 flex flex-col items-center justify-center relative transition-all duration-305 hover:-translate-y-1 hover:border-emerald-500/20 hover:bg-[#0c0c0e] hover:shadow-[0_0_30px_rgba(16,185,129,0.08)] group cursor-pointer">
                    <svg viewBox="0 0 48 48" className="h-9 w-9 group-hover:scale-110 transition-transform duration-300">
                      <path d="M30 6L14 22v14h8V26l12-12-4-8z" fill="#007AFF" />
                      <path d="M22 36a8 8 0 0 1-8-8v-6l-6 6v8a8 8 0 0 0 8 8h12l-6-8z" fill="#0051A8" />
                      <path d="M34 14l-4-8-8 8h8a4 4 0 0 1 4 4v4l6-6v-2z" fill="#3395FF" />
                    </svg>
                    <span className="text-[9px] font-bold text-zinc-500 mt-2.5 font-mono">Jurnal.id</span>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TESTIMONIALS */}
      <section className="w-full bg-[#070708]/40 border-b border-slate-850/80">
        <div className="mx-auto max-w-[1360px] border-l border-r relative">
          
          {/* Section Header Band */}
          <div className="border-b border-slate-850/80 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-450 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">04</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">06</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">TESTIMONIALS</span>
              </div>
            </div>
          </div>

          {/* Centered Title block */}
          <div className="py-16 px-8 sm:px-12 lg:px-16 text-center flex flex-col items-center justify-center space-y-4 bg-transparent">
            {/* Large centered title */}
            <h2 className="text-3xl sm:text-[42px] font-semibold tracking-[-0.03em] leading-[1.12] bg-gradient-to-b from-white via-white to-zinc-400/90 bg-clip-text text-transparent pb-1 select-none max-w-3xl">
              Loved by forward-thinking teams.
            </h2>
            {/* Centered description */}
            <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-xl leading-relaxed">
              See how Indonesian software houses, agencies, and startups run more efficiently with Coretify.
            </p>
          </div>

          {/* Testimonials Grid Layout */}
          <div className="grid grid-cols-[1fr] lg:grid-cols-[50px_1fr_50px] w-full border-t border-slate-850/80">
              {/* Left Spacer */}
              <div
                className="hidden lg:block border-r border-slate-850/80"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px, transparent 7px)'
                }}
              />
            <div className="relative bg-[#09090b]/10 w-full overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.015)_0%,_transparent_70%)] pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 w-full">
              {testimonials.map((t, idx) => {
                const borderRightClass = (idx % 3 !== 2) ? "md:border-r border-slate-850/80" : "";
                const borderBottomClass = idx < 3 
                  ? "border-b border-slate-850/80" 
                  : (idx < 5 ? "max-md:border-b border-slate-850/80" : "");
                
                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col justify-between p-8 text-left bg-transparent group hover:bg-white/[0.015] transition-all duration-300 relative select-none ${borderRightClass} ${borderBottomClass}`}
                  >
                    {/* Left Hover Border Line (Thick unified brand silver/slate line) */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent transition-colors duration-300 group-hover:bg-slate-400" />
                    
                    {/* Card Header (Avatar + User Details + Arrow) */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-900/60">
                      <div className="flex items-center gap-3.5 truncate">
                        <div className="h-9 w-9 rounded-full bg-[#18181b] border border-slate-850 flex items-center justify-center text-[11px] font-bold text-white relative overflow-hidden shrink-0">
                          {/* Unified soft slate glow */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-slate-500/10 to-transparent blur-[2px]" />
                          {t.initials}
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-slate-200 truncate">{t.name}</div>
                          <div className="text-[10px] text-zinc-550 font-mono mt-0.5 truncate">{t.handle}</div>
                        </div>
                      </div>
                      {/* Top-Right Arrow pointing top-right - highlights in unified brand silver/slate on hover */}
                      <ArrowRight className="h-3.5 w-3.5 -rotate-45 text-zinc-700/60 transition-all duration-300 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-350" />
                    </div>
                    {/* Card Body (Quote Text) */}
                    <div className="pt-6 flex-1 flex items-start min-h-[90px]">
                      <p className="text-[12.5px] sm:text-[13.5px] text-zinc-350 leading-relaxed font-normal">
                        &ldquo;{t.text}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
              {/* Right Spacer */}
              <div
                className="hidden lg:block border-l border-slate-850/80"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px, transparent 7px)'
                }}
              />
          </div>
        </div>
      </section>

      {/* SECTION 5: FAQ */}
      <section className="w-full bg-[#070708]/40 border-b border-slate-850/80">
        <div className="mx-auto max-w-[1360px] border-l border-r relative">
          
          {/* Section Header Band */}
          <div className="border-b border-slate-850/80 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-450 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">05</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">06</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">FAQ</span>
              </div>
            </div>
          </div>

          {/* Section Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full">
            
            {/* Left Column Container (full height to make vertical line stretch) */}
            <div className="lg:col-span-5 lg:border-r border-slate-850/80 relative h-full">
              {/* Inner Sticky Content */}
              <div className="lg:sticky lg:top-28 py-16 px-8 sm:px-12 lg:pl-16 lg:pr-12 text-left space-y-5">
                <h2 className="text-4xl sm:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
                  Frequent<br />questions
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-sm">
                  All the answers you may need about Coretify to help you understand our platform.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Accordion */}
            <div className="lg:col-span-7 divide-y divide-slate-850/80 border-t lg:border-t-0 border-b border-slate-850/80">
              {[
                {
                  question: "Apakah Coretify aman dan 100% read-only?",
                  answer: "Ya, keamanan data adalah prioritas utama kami. Coretify dirancang dengan prinsip 100% read-only untuk semua integrasi tools (seperti Gmail, Slack, dan Jurnal.id). Kami tidak pernah memodifikasi, menghapus, atau menulis data ke dalam workspace asal Anda."
                },
                {
                  question: "Bagaimana Coretify melindungi data sensitif seperti gaji atau keuangan?",
                  answer: "Kami menggunakan Database-Level Row Level Security (RLS) dan Role-Based Access Control (RBAC) yang ketat. Data gaji, transaksi keuangan, atau dokumen legal terlindung di balik enkripsi tingkat tinggi dan hanya dapat diakses oleh personil yang memiliki otorisasi eksklusif."
                },
                {
                  question: "Bagaimana cara kerja WhatsApp Lite tanpa WhatsApp Business API?",
                  answer: "WhatsApp Lite memungkinkan Anda mengunggah riwayat chat penting secara manual via ekspor file .txt standar. Coretify langsung memproses, mengekstrak entitas penting, dan mengindeks konteks percakapan tersebut ke dalam memori perusahaan Anda tanpa perlu setup API yang rumit."
                },
                {
                  question: "Apakah saya bisa menghapus memori data perusahaan secara permanen?",
                  answer: "Tentu. Kami mendukung kebijakan kedaulatan data penuh. Anda dapat melakukan Instant Wipe kapan saja melalui dashboard admin. Semua data terindeks, representasi vektor, dan cache AI yang berkaitan dengan organisasi Anda akan dihapus secara permanen dari server kami dalam hitungan detik."
                },
                {
                  question: "Berapa lama waktu untuk sinkronisasi awal memori?",
                  answer: "Sinkronisasi awal biasanya selesai dalam waktu 5 hingga 15 menit, tergantung pada volume data pada email, kalender, dan dokumen yang Anda hubungkan. AI Coretify akan langsung dapat menjawab pertanyaan tentang operasional Anda setelah sinkronisasi pertama selesai."
                },
                {
                  question: "Apakah saya bisa menyesuaikan playbook operasional di Coretify?",
                  answer: "Ya. Coretify menyediakan Playbook Engine bawaan untuk Software House, Creative Agency, dan Startup. Playbook ini menyaring insight secara spesifik seperti melacak kebocoran waktu pengerjaan, potensi keterlambatan rilis, hingga kepatuhan pengerjaan task sesuai SOP tim."
                }
              ].map((faq, index) => {
                const isOpen = activeFaqIndex === index;
                return (
                  <div key={index} className="transition-all duration-300">
                    <button
                      onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                      className="w-full py-7 px-8 sm:px-12 flex items-center justify-between text-left cursor-pointer transition-colors hover:bg-white/[0.015] focus:outline-none"
                    >
                      <span className="text-[15px] sm:text-[17px] font-normal text-slate-100 pr-6">{faq.question}</span>
                      <span className="text-2xl font-light text-slate-400 select-none shrink-0">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-60 opacity-100 px-8 sm:px-12 pb-7" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-[13.5px] text-zinc-455 leading-relaxed font-normal">{faq.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="w-full bg-[#070708]/40 border-b border-slate-850/80">
        <div className="mx-auto max-w-[1360px] border-l border-r relative">
          
          {/* Section Header Band */}
          <div className="border-b border-slate-850/80 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-450 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">06</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">06</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">GET STARTED</span>
              </div>
            </div>
          </div>

          {/* CTA Banner Card Container */}
          <div className="p-8 sm:p-12 lg:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#08080a] border-b border-slate-900">
            {/* Grid Pattern Motif */}
            <div 
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
              style={{
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)'
              }}
            />
            {/* Spotlight Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[400px] bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[180px] w-[300px] bg-emerald-500/5 rounded-full blur-[70px] pointer-events-none" />

            <div className="max-w-2xl space-y-6 z-10">
              <h2 className="text-3xl sm:text-[44px] font-semibold tracking-[-0.03em] leading-[1.1] bg-gradient-to-b from-white via-white to-zinc-400/90 bg-clip-text text-transparent pb-1 select-none">
                Ready to unlock your company memory?
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 font-normal leading-relaxed max-w-lg mx-auto">
                Bergabunglah dengan ratusan perusahaan Indonesia yang telah mengintegrasikan memori tim mereka secara terpusat dan aman. Mulai uji coba gratis 14 hari sekarang.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <CoretifyButton
                  onClick={handleStartOnboarding}
                  variant="white"
                  size="lg"
                  className="px-8 py-5.5 text-[13px] font-semibold shadow-lg hover:shadow-indigo-500/10 w-full sm:w-auto"
                >
                  Try Coretify Free
                </CoretifyButton>
                <CoretifyButton
                  onClick={handleStartOnboarding}
                  variant="dark"
                  size="lg"
                  className="px-8 py-5.5 text-[13px] font-semibold w-full sm:w-auto"
                >
                  Request a Demo
                </CoretifyButton>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUST SIGNALS FOOTER BLOCK */}
      <section className="w-full bg-[#070708]">
        <div className="mx-auto max-w-[1360px] border-l border-r border-slate-850/80 relative pt-20 pb-12 px-8 sm:px-12 lg:px-16 flex flex-col gap-14">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start w-full">

            {/* Left Column: Brand, Desc, Watch button */}
            <div className="md:col-span-5 space-y-6 text-left">
              <div className="flex items-center gap-0 select-none cursor-pointer" onClick={() => router.push("/")}>
                <img src="/coretify.png" alt="Coretify Logo" className="h-9 w-auto object-contain" />
                <span className="text-[24px] font-semibold tracking-tight text-white">
                  Coretify
                </span>
              </div>
              <p className="text-[13px] text-zinc-400 leading-relaxed font-normal max-w-sm">
                Deploy agents that work across your company memory.
              </p>
              <div className="pt-1">
                <button className="inline-flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900 hover:border-zinc-700 text-[12px] font-medium text-zinc-300 transition-all duration-200 cursor-pointer select-none">
                  <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-zinc-100 text-black">
                    <Play className="h-2 w-2 fill-current ml-0.5" />
                  </span>
                  <span>Watch the launch</span>
                </button>
              </div>
            </div>

            {/* Right Columns: Links Grid */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 text-left">

              {/* Column 1: Platform */}
              <div className="space-y-4.5">
                <h5 className="text-[13px] font-medium text-zinc-500">Platform</h5>
                <ul className="space-y-3.5 text-[13px] text-zinc-400 font-normal">
                  <li><a href="#" className="hover:text-white transition-colors">Data</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Agent</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tools</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                </ul>
              </div>

              {/* Column 2: Tools */}
              <div className="space-y-4.5">
                <h5 className="text-[13px] font-medium text-zinc-500">Tools</h5>
                <ul className="space-y-3.5 text-[13px] text-zinc-400 font-normal">
                  <li><a href="#" className="hover:text-white transition-colors">Tables</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Routing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Scheduling</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Workflows</a></li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div className="space-y-4.5">
                <h5 className="text-[13px] font-medium text-zinc-500">Company</h5>
                <ul className="space-y-3.5 text-[13px] text-zinc-400 font-normal">
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
                </ul>
              </div>

              {/* Column 4: Legal */}
              <div className="space-y-4.5">
                <h5 className="text-[13px] font-medium text-zinc-500">Legal</h5>
                <ul className="space-y-3.5 text-[13px] text-zinc-400 font-normal">
                  <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Sub-processors</a></li>
                </ul>
              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-px bg-slate-850/80" />

          {/* Bottom Bar: Copyright & Socials */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-[13px] text-zinc-500 w-full">
            <span className="font-normal select-none">
              &copy; {new Date().getFullYear()} Coretify. All rights reserved.
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href="#" className="h-9.5 w-9.5 rounded-xl bg-zinc-900/30 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-200" aria-label="LinkedIn">
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="h-9.5 w-9.5 rounded-xl bg-zinc-900/30 border border-zinc-800/80 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-200" aria-label="X (Twitter)">
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
