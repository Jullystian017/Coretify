"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CoretifyButton } from "@/components/ui/coretify-button";
import { GLSLHills } from "../components/ui/glsl-hills";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ChevronDown,
  Play,
  Plus,
  ArrowRight,
  ShieldCheck,
  Check,
  Lock,
  ExternalLink,
  Bot,
  Building2,
  Calendar,
  Mail,
  Network,
  TrendingUp,
  MoreHorizontal,
  Zap,
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
  Database
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [typedText, setTypedText] = useState("");
  const [activePreset, setActivePreset] = useState<number | null>(null);
  const [demoAnswer, setDemoAnswer] = useState<string | null>(null);
  const [demoCitations, setDemoCitations] = useState<any[]>([]);
  const [activeSectionTab, setActiveSectionTab] = useState<"data" | "tools" | "agent" | "governance">("data");
  const [expandedMeeting, setExpandedMeeting] = useState<string>("greenleaf");

  const handleStartOnboarding = () => {
    router.push("/onboarding");
  };

  const presets = [
    {
      q: "Which clients are at risk?",
      a: "Vista Retail is flagged as a high-churn risk. Gmail logs indicate zero correspondence or follow-ups for the past 14 days, whereas your team normally schedules touchpoints every 3 days. Aero Design is also marked as a medium risk due to invoice payment delays.",
      c: [
        { name: "Gmail Inbox / Vista Retail", type: "Email" },
        { name: "Invoices & Accounts Receivable", type: "Spreadsheet" }
      ]
    },
    {
      q: "What decisions were made last week?",
      a: "Three key decisions were finalized last week:\n\n1. **Authentication API Flow**: Client approved the revised API schema for Nexa Corp via WhatsApp on June 12.\n2. **Runway Optimization**: Owner decided to reduce server scaling costs by 15% starting next billing cycle.\n3. **Vista Retainer Renewal**: Retainer terms agreed upon on June 10.",
      c: [
        { name: "WhatsApp Group Chat / Nexa Corp", type: "Chat" },
        { name: "Internal Team Minutes", type: "Document" },
        { name: "Email Budi / Retainer terms", type: "Email" }
      ]
    },
    {
      q: "Which projects are delayed?",
      a: "Project **Nexa Web App** is currently delayed by 5 days from its initial kickoff timeline. The delay was triggered by 4 successive authentication flow revision requests requested by the client after development began.",
      c: [
        { name: "Email Budi (Subject: Nexa Revision Request)", type: "Email" },
        { name: "Google Calendar kickoff details", type: "Calendar" }
      ]
    }
  ];

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

        setTimeout(() => {
          setDemoAnswer(presets[idx].a);
          setDemoCitations(presets[idx].c);
        }, 600);
      }
    }, 45);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 relative font-sans antialiased">

      {/* Top light glow vignette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[1360px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* NAVBAR */}
      <header className="border-b border-slate-900 bg-[#070708]/85 backdrop-blur-md sticky top-0 z-50 w-full">
        <div className="mx-auto max-w-[1360px] px-8 flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/")}>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-350">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-white">
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
      <section className="relative border-b border-slate-900 w-full bg-[#070708]/25 overflow-hidden">

        {/* Aurora Glowing Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-[10%] -left-[15%] h-[550px] w-[750px] rounded-full bg-indigo-500/20 blur-[130px] mix-blend-screen" />
          <div className="absolute top-[20%] left-[20%] h-[500px] w-[700px] rounded-full bg-emerald-500/15 blur-[110px] mix-blend-screen" />
          <div className="absolute -top-[10%] -right-[15%] h-[550px] w-[750px] rounded-full bg-purple-500/25 blur-[130px] mix-blend-screen" />
          <div className="absolute bottom-[10%] left-[30%] h-[500px] w-[750px] rounded-full bg-blue-500/15 blur-[120px] mix-blend-screen" />
        </div>

        {/* GLSL 3D Shader Hills Background spanning the entire combined height */}
        <GLSLHills width="100%" height="100%" cameraZ={125} planeSize={256} speed={0.35} />

        {/* Hero Copywriting Row */}
        <div className="relative z-10 w-full border-b border-slate-900/40">
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
        <div className="relative z-10 w-full bg-[#08080a]/35">
          <div className="mx-auto max-w-[1360px] grid grid-cols-10 text-[13px] font-semibold text-slate-400">
            {/* Left spacer column with dashed border on the right */}
            <div className="col-span-1 border-r border-slate-850/40" style={{ borderRightStyle: "dashed" }} />

            {/* Ask Coretify tab */}
            <button
              onClick={() => setActiveSectionTab("agent")}
              className={`col-span-2 border-r border-b border-slate-850/40 py-6 text-center cursor-pointer transition-all ${activeSectionTab === "agent"
                  ? "text-white bg-white/5 font-semibold"
                  : "hover:text-slate-200"
                }`}
            >
              Ask Coretify
            </button>

            {/* Data model tab */}
            <button
              onClick={() => setActiveSectionTab("data")}
              className={`col-span-2 border-r border-b border-slate-850/40 py-6 text-center cursor-pointer transition-all ${activeSectionTab === "data"
                  ? "text-white bg-white/5 font-semibold"
                  : "hover:text-slate-200"
                }`}
            >
              Data model
            </button>

            {/* Workflows tab */}
            <button
              onClick={() => setActiveSectionTab("tools")}
              className={`col-span-2 border-r border-b border-slate-850/40 py-6 text-center cursor-pointer transition-all ${activeSectionTab === "tools"
                  ? "text-white bg-white/5 font-semibold"
                  : "hover:text-slate-200"
                }`}
            >
              Workflows
            </button>

            {/* Reporting tab with dashed border on the right */}
            <button
              onClick={() => setActiveSectionTab("governance")}
              className={`col-span-2 border-r border-b border-slate-850/40 py-6 text-center cursor-pointer transition-all ${activeSectionTab === "governance"
                  ? "text-white bg-white/5 font-semibold"
                  : "hover:text-slate-200"
                }`}
              style={{ borderRightStyle: "dashed" }}
            >
              Reporting
            </button>

            {/* Right spacer column */}
            <div className="col-span-1" />
          </div>

          {/* Extension row to project vertical lines down to the dashboard */}
          <div className="mx-auto max-w-[1360px] grid grid-cols-10 h-8">
            <div className="col-span-1 border-r border-slate-850/40" style={{ borderRightStyle: "dashed" }} />
            <div className="col-span-8 border-r border-slate-850/40" style={{ borderRightStyle: "dashed" }} />
            <div className="col-span-1" />
          </div>
        </div>

        {/* INTERACTIVE PRODUCT MOCKUP SECTION (No side grid lines, full width) */}
        <div className="relative z-10 w-full pt-0 pb-16 sm:pb-20 lg:pb-24">
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
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">

                {/* Left Sidebar (Workspace Navigation) */}
                <div className="lg:col-span-3 border-r border-slate-900 bg-[#09090b]/80 p-4.5 space-y-6 flex flex-col justify-between text-left">
                  <div className="space-y-5">

                    {/* Search box (Quick Actions) */}
                    <div className="relative flex items-center bg-[#070708] border border-slate-900 rounded-lg p-2 text-xs text-slate-500 hover:border-slate-850 transition-all cursor-pointer">
                      <Search className="h-3.5 w-3.5 mr-2 text-slate-550" />
                      <span className="flex-1">Quick Actions</span>
                      <span className="text-[9px] bg-slate-900 border border-slate-850 text-slate-450 px-1 rounded font-mono mr-1">⌘K</span>
                      <span className="text-[10px] text-slate-550 font-mono">/</span>
                    </div>

                    {/* Nav list */}
                    <nav className="space-y-1 text-slate-400 text-xs font-semibold">
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-850 text-white cursor-pointer text-left">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        <span>Home</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <Bell className="h-3.5 w-3.5 text-slate-550" />
                        <span>Notifications</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <CheckSquare className="h-3.5 w-3.5 text-slate-550" />
                        <span>Tasks</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <FileText className="h-3.5 w-3.5 text-slate-550" />
                        <span>Notes</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <Mail className="h-3.5 w-3.5 text-slate-550" />
                        <span>Emails</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <Phone className="h-3.5 w-3.5 text-slate-550" />
                        <span>Calls</span>
                      </button>
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
                        <BarChart2 className="h-3.5 w-3.5 text-slate-550" />
                        <span>Reports</span>
                      </button>
                      <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-900/50 hover:text-slate-200 cursor-pointer text-left">
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
                  <div className="space-y-4 pt-4 border-t border-slate-900/60">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Favorites</span>
                      <div className="text-xs text-slate-400 font-semibold space-y-1.5 pl-1">
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer py-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-650" />
                          <span>PQL workflows</span>
                        </div>
                        <div className="pl-3.5 space-y-1.5 text-[11px] text-slate-500">
                          <div className="hover:text-slate-350 cursor-pointer">PQL Pipeline Deals</div>
                          <div className="hover:text-slate-350 cursor-pointer">PQL Workspace Outreach</div>
                          <div className="hover:text-slate-355 cursor-pointer">PQL Triage</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider block">Reports</span>
                      <div className="text-[11px] text-slate-500 font-semibold space-y-2 pl-1">
                        <div className="hover:text-slate-350 cursor-pointer">Revenue</div>
                        <div className="hover:text-slate-355 cursor-pointer">Attribution</div>
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

            </div>
          </div>
        </div>

      </section>

      {/* BRAND LOGOS SECTION (No side grid lines, full width) */}
      <section className="relative border-b border-slate-900 w-full bg-[#070708]/20 py-10">
        <div className="mx-auto max-w-[1360px] px-8">
          <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-6 w-full text-white">
            {/* Vercel */}
            <div className="flex items-center gap-2 select-none">
              <svg viewBox="0 0 76 65" className="h-3.5 w-auto fill-current">
                <polygon points="38 0 76 65 0 65" />
              </svg>
              <span className="text-[17px] font-bold tracking-tight">Vercel</span>
            </div>

            {/* Cursor */}
            <div className="flex items-center gap-2 select-none">
              <svg viewBox="0 0 24 24" className="h-[18px] w-auto fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
                <path d="M12 12v10" />
              </svg>
              <span className="text-[14px] font-extrabold tracking-wider font-sans">CURSOR</span>
            </div>

            {/* Oscar */}
            <div className="flex items-center select-none">
              <span className="text-[20px] font-semibold tracking-tight font-sans lowercase">oscar</span>
            </div>

            {/* OpenAI */}
            <div className="flex items-center gap-1.5 select-none">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M21.3,10.6a5.5,5.5,0,0,0-2.6-4.6,5.5,5.5,0,0,0-5.1-.3,5.5,5.5,0,0,0-5-3.8,5.6,5.6,0,0,0-5.4,3,5.5,5.5,0,0,0-2.3,4.8,5.5,5.5,0,0,0,2.6,4.6,5.5,5.5,0,0,0,5.1.3,5.5,5.5,0,0,0,5,3.8,5.5,5.5,0,0,0,5.4-3A5.5,5.5,0,0,0,21.3,10.6ZM12.7,4.3a3.5,3.5,0,0,1,1.9.5,3.6,3.6,0,0,1,1.6,2.2c-.1,0-.2,0-.3-.1L11,4.3A3.6,3.6,0,0,1,12.7,4.3ZM5.9,6.7a3.5,3.5,0,0,1,.8-1.9,3.6,3.6,0,0,1,2.5-1.1c0,.1,0,.2,0,.3V8.8A3.6,3.6,0,0,1,5.9,6.7ZM4.5,12.8a3.5,3.5,0,0,1-1.1-1.7,3.6,3.6,0,0,1,.3-2.7c.1,0,.2.1.2.1l4.9,2.8A3.6,3.6,0,0,1,4.5,12.8Zm6.8,6.9a3.5,3.5,0,0,1-1.9-.5,3.6,3.6,0,0,1-1.6-2.2c.1,0,.2,0,.3.1L13,19.7A3.6,3.6,0,0,1,11.3,19.7ZM18.1,17.3a3.5,3.5,0,0,1-.8,1.9,3.6,3.6,0,0,1-2.5,1.1c0-.1,0-.2,0-.3V15.2A3.6,3.6,0,0,1,18.1,17.3Zm1.4-6.1a3.5,3.5,0,0,1,1.1,1.7,3.6,3.6,0,0,1-.3,2.7c-.1,0-.2-.1-.2-.1l-4.9-2.8A3.6,3.6,0,0,1,19.5,11.2Z" />
              </svg>
              <span className="text-[17px] font-semibold tracking-tight">OpenAI</span>
            </div>

            {/* Coinbase */}
            <div className="flex items-center select-none">
              <span className="text-[20px] font-semibold tracking-tight font-sans lowercase">coinbase</span>
            </div>

            {/* Cash App */}
            <div className="flex items-center gap-2 select-none">
              <div className="flex items-center justify-center h-[18px] w-[18px] bg-white text-black font-extrabold rounded-[4px] text-[11.5px] leading-none">
                $
              </div>
              <span className="text-[17px] font-bold tracking-tight">Cash App</span>
            </div>

            {/* Boom */}
            <div className="flex items-center select-none">
              <svg viewBox="0 0 224 57" className="h-[21px] w-auto fill-current">
                <path d="M84.6 14.8c0-.3.2-.5.5-.5h14.7c6.2 0 9.5 2.9 9.5 7.6 0 3.1-2.1 5-4.3 5.7 2.6.8 4.9 3.1 4.9 6.8 0 4.9-3.3 8.1-9.9 8.1H85.1c-.3 0-.5-.2-.5-.5V14.8zm5.3 4.1v6.9h9.3c3.1 0 4.6-1.2 4.6-3.5 0-2.4-1.6-3.5-4.6-3.5h-9.3v.1zm0 11.4v7.8h9.5c3.5 0 5.1-1.4 5.1-3.9 0-2.6-1.7-3.9-5.1-3.9h-9.5zm26.6-1.8c0-8.5 6.4-14.6 14.8-14.6s14.8 6.1 14.8 14.6c0 8.4-6.4 14.6-14.8 14.6-8.5 0-14.8-6.1-14.8-14.6zm24.2 0c0-5.4-3.7-9.7-9.3-9.7-5.6 0-9.3 4.4-9.3 9.7 0 5.5 3.7 9.7 9.3 9.7 5.5.1 9.3-4.3 9.3-9.7zm12.2 0c0-8.5 6.4-14.6 14.8-14.6s14.8 6.1 14.8 14.6c0 8.4-6.4 14.6-14.8 14.6-8.5 0-14.8-6.1-14.8-14.6zm24.2 0c0-5.4-3.7-9.7-9.3-9.7-5.6 0-9.3 4.4-9.3 9.7 0 5.5 3.7 9.7 9.3 9.7 5.5.1 9.3-4.3 9.3-9.7zM207 35l8.4-20.3c.1-.2.2-.3.4-.3h6.9c.3 0 .5.2.5.5v27.3c0 .3-.2.5-.5.5h-4.3c-.3 0-.5-.2-.5-.5V19.5l-9.4 23c-.1.2-.2.3-.4.3h-3c-.2 0-.4-.1-.4-.3l-9.3-22.8v22.5c0 .3-.2.5-.5.5h-4c-.3 0-.5-.2-.5-.5V14.9c0-.3.2-.5.5-.5h7.2c.2 0 .4.1.4.3L207 35zM63.1 28.6c-.1-.8-.8-1.3-1.6-1.2l-16.2 2.2 16.7-7c.8-.3 1.2-1.3.9-2.1-.3-.8-1.3-1.2-2.1-.9l-13 5.5 12.6-9.7c.8-.6.9-1.7.3-2.5-.6-.8-1.7-.9-2.5-.3l-10.5 8.1 9.1-12c.6-.8.5-2-.4-2.7-.8-.6-2-.5-2.7.4l-7.5 9.9 5.6-13.2c.4-1 0-2.1-1-2.6-1-.4-2.1 0-2.6 1L37.3 27c-1 2.3-3.4 3.9-6.1 3.9-2.6 0-4.7-1.5-5.8-3.8L13.7.6c-.1-.3-.5-.5-.8-.3-.3.1-.5.5-.3.8L23 24.5 8.5 5.8c-.3-.3-.8-.4-1.1-.1-.3.3-.4.8-.1 1.1l14.5 18.7L4.6 12.4c-.4-.3-1-.2-1.3.2-.3.4-.2 1 .2 1.3l17.9 13.7-19-7.7c-.6-.2-1.2 0-1.5.6-.2.6 0 1.2.6 1.5l19.9 8.1-19.3-2.5c-.7-.1-1.3.4-1.4 1.1-.1.7.4 1.3 1.1 1.4l20.3 2.6-18.2 2.5c-.8.1-1.3.8-1.2 1.6.1.8.8 1.3 1.6 1.2l18.9-2.6L7.5 42c-.8.3-1.2 1.3-.9 2.1.3.8 1.3 1.2 2.1.9l16.7-7-12.6 9.8c-.8.6-.9 1.7-.3 2.5.6.8 1.7.9 2.5.3l13.1-10.1-8.7 11.4c-.6.8-.5 2 .4 2.7.8.6 2 .5 2.7-.4l8.1-10.7-4.5 10.6c-.4 1 0 2.1 1 2.6 1 .4 2.1 0 2.6-1l3.5-8.3 3.9 8.9c.1.3.5.5.8.3.3-.1.5-.5.3-.8l-4.4-10 1.3-3 8.8 11.4c.3.3.8.4 1.1.1.3-.3.4-.8.1-1.1l-9.4-12.1.7-1.8 14.1 10.8c.4.3 1 .2 1.3-.2.3-.4.2-1-.2-1.3L37.1 37.5l.3-.7L56 44.4c.6.2 1.2 0 1.5-.6.2-.6 0-1.2-.6-1.5l-17.8-7.2 20.7 2.7c.7.1 1.3-.4 1.4-1.1.1-.7-.4-1.3-1.1-1.4l-17.5-2.2 19.2-2.6c.8-.4 1.4-1.1 1.3-1.9z" />
              </svg>
            </div>

            {/* Ramp */}
            <div className="flex items-center select-none">
              <svg viewBox="0 0 96 26" className="h-[19px] w-auto fill-current">
                <g fill="currentColor">
                  <path d="m6.64257 8.79302c-2.28962 0-3.41358 2.04688-3.41358 4.77998v6.8492h-3.22899v-14.45351h3.17241v3.74982h.05509c.67735-2.30551 2.0276-4.16846 4.11029-4.16846 1.46488 0 2.08269.51881 2.08269.51881l-1.45744 2.97684c0-.0015-.46447-.25268-1.32047-.25268zm39.03513 1.98408v9.6437h-3.1456v-8.47c0-2.43114-.7518-3.71846-2.6722-3.71846-1.9889 0-2.9506 1.62821-2.9506 4.75156v7.4354h-3.1173v-8.4685c0-2.33695-.7429-3.71846-2.644-3.71846-2.1705 0-3.0057 1.92876-3.0057 4.75156v7.4354h-3.1724v-14.45061h3.1724v3.27287h.0283c.4943-2.26514 1.843-3.6631 4.1193-3.6631 2.2568 0 3.7277 1.2305 4.2859 3.41192.5315-2.09919 1.9457-3.41192 4.1192-3.41192 3.0325 0 4.9827 1.92873 4.9827 5.19864zm-29.9109-5.22705c-2.9193 0-4.8293 1.39048-5.7002 3.90083l2.6871.99132c.4898-1.51462 1.511-2.37732 3.0697-2.37732 1.7537 0 2.7838.78346 2.7838 1.98552 0 1.229-.8202 1.4862-2.6722 1.7897-2.0603.3364-6.95964.4471-6.95964 4.6395 0 2.4565 2.02464 4.3045 5.06604 4.3045 2.2866 0 3.8438-.9479 4.5643-2.7122h.0283v2.3489h3.1456v-8.8887c-.0014-3.88885-1.9308-5.98205-6.0128-5.98205zm2.9223 8.06775c0 3.0307-1.4783 4.9774-3.8408 4.9774-1.6703 0-2.6722-.9509-2.6722-2.322 0-1.2858 1.0301-2.1784 3.0056-2.5462 2.0217-.3768 3.04-.8418 3.5074-1.9572zm38.1777-8.03934c-2.4058 0-3.9957 1.34114-4.676 3.3566v-2.96637h-3.3407v20.01551h3.3124v-8.5283h.0283c.7369 2.1829 2.2717 3.3835 4.676 3.3835 3.8125 0 6.5413-3.1862 6.5413-7.688-.0015-4.47052-2.7288-7.57294-6.5413-7.57294zm-.8218 12.57864c-2.6409 0-4.1058-1.9437-4.1058-4.9624s1.639-4.96236 4.1058-4.96236c2.4653 0 4.1058 2.03786 4.1058 4.96236 0 2.926-1.639 4.9624-4.1058 4.9624z" />
                  <path d="m96.2197 20.3553v.0901l-12.9282.0046v-.0947c1.8642-1.068 3.151-2.1559 4.3089-3.2927h5.3085zm-3.2033-17.07889-3.277-3.2605409h-.0952s.0553 6.0764609-5.4467 11.6028309c-5.3838 5.4088-11.7151 5.421-11.7151 5.421v.0948l3.3384 3.317s6.2391.0627 11.7504-5.421c5.4913-5.46526 5.4452-11.75409 5.4452-11.75409z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Tab Switcher (Introducing Default clone) */}
      <section className="w-full bg-[#070708]/40">
        <div className="mx-auto max-w-[1360px] border-l border-r border-b border-slate-850/40 relative">

          {/* Section Header Band */}
          <div className="border-b border-slate-850/40 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-450 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">01</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">03</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">FEATURES</span>
              </div>
            </div>
          </div>

          {/* Section Content Area */}
          <div className="p-8 sm:p-12 lg:p-16">
            {/* Section Header */}
            <div className="text-left mb-12 space-y-4">
              <h2 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.025em] text-white leading-[1.12]">
                The intelligent system that never sleeps.
              </h2>
              <p className="text-lg sm:text-2xl text-zinc-400 font-normal max-w-3xl leading-relaxed">
                Picks up leads at 2am. Catches renewals before they slip. Hands you the answer before you ask.
              </p>
            </div>

            {/* 3-Column Visual Features Layout (Dark Mode Playbook version) */}
            <div className="border border-slate-900 bg-[#09090b]/40 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 w-full shadow-2xl">
              
              {/* Column 1: Revenue agents text */}
              <div className="lg:col-span-4 p-8 sm:p-10 flex flex-col justify-center text-left border-b lg:border-b-0 lg:border-r border-slate-900 bg-[#08080a]/20">
                <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                  Revenue agents at your command.
                </h3>
                <p className="text-[13px] text-zinc-400 mt-4 leading-relaxed font-normal">
                  It's your playbook. Agents work every account, capture every signal, and move every deal forward.
                </p>
              </div>

              {/* Column 2: Interactive workflow visualizer */}
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-900 relative min-h-[420px] bg-[#08080a]/60 bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:20px_20px]">
                
                {/* Node 1 */}
                <div className="w-full max-w-[290px] relative z-10">
                  <div className="flex items-center justify-between w-full mb-2 px-1">
                    <span className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1.5 select-none">
                      <Settings2 className="h-3 w-3 text-zinc-650" /> Trigger
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1 select-none">
                      <Check className="h-2.5 w-2.5" /> Triggered
                    </span>
                  </div>
                  
                  <div className="border border-emerald-500/25 bg-[#09090b]/90 rounded-xl p-4 w-full shadow-lg relative group transition-all duration-300 hover:border-emerald-500/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#0e0e11] border border-zinc-800 flex items-center justify-center text-zinc-400">
                          <Database className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[12px] font-semibold text-white">When Deal updated</span>
                      </div>
                      <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">Deals</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-2.5 font-normal leading-normal">
                      Trigger when a Deal's status is updated
                    </p>
                  </div>
                </div>

                {/* Connection Line */}
                <div className="flex flex-col items-center justify-center my-3.5 h-12 w-full relative z-10">
                  <div className="w-[1.5px] h-full bg-emerald-500/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950 shadow-md shadow-emerald-500/20" />
                </div>

                {/* Node 2 */}
                <div className="w-full max-w-[290px] relative z-10">
                  <div className="flex items-center justify-between w-full mb-2 px-1">
                    <span className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1.5 opacity-0">
                      <Settings2 className="h-3 w-3" /> Dummy
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1 select-none">
                      <Check className="h-2.5 w-2.5" /> Completed
                    </span>
                  </div>
                  
                  <div className="border border-emerald-500/25 bg-[#09090b]/90 rounded-xl p-4 w-full shadow-lg relative group transition-all duration-300 hover:border-emerald-500/40">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-lg bg-[#0e0e11] border border-zinc-800 flex items-center justify-center text-zinc-400">
                          <Network className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[12px] font-semibold text-white">Switch</span>
                      </div>
                      <span className="text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">Condition</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-2.5 font-normal leading-normal">
                      Route to upsell or nurture
                    </p>
                  </div>
                </div>

                {/* Split branching lines at bottom */}
                <div className="flex flex-col items-center justify-center mt-3.5 w-full relative z-10">
                  <div className="w-[1.5px] h-6 bg-emerald-500/30" />
                  <div className="flex justify-between w-[220px] border-t border-dashed border-emerald-500/25 pt-2 text-[9px] text-zinc-500 font-mono">
                    <span className="flex items-center gap-1 select-none"><span className="h-1 w-1 rounded-full bg-emerald-500/50" /> Upsell</span>
                    <span className="flex items-center gap-1 select-none"><span className="h-1 w-1 rounded-full bg-zinc-500/50" /> Nurture</span>
                  </div>
                </div>

              </div>

              {/* Column 3: Playbooks list */}
              <div className="lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center gap-3 bg-[#08080a]/30 relative overflow-hidden">
                
                {/* Pill 1: Re-engage cold leads */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-850/20 bg-zinc-950/20 text-[11px] text-zinc-450 opacity-30 select-none">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span>Re-engage cold leads</span>
                </div>
                
                {/* Pill 2: MQL lead routing */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-850/20 bg-zinc-950/20 text-[11px] text-zinc-450 opacity-30 select-none">
                  <Zap className="h-3.5 w-3.5 shrink-0" />
                  <span>MQL lead routing</span>
                </div>
                
                {/* Pill 3: Onboarding hand-off */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-850/40 bg-zinc-950/40 text-[11px] text-zinc-350 opacity-60 select-none">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <span>Onboarding hand-off</span>
                </div>
                
                {/* Pill 4: New Deal email campaign (ACTIVE HIGHLIGHT) */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-emerald-500/35 bg-emerald-500/5 text-[11.5px] text-white font-semibold shadow-[0_0_15px_rgba(16,185,129,0.08)] select-none">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <Mail className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>New Deal email campaign</span>
                </div>
                
                {/* Pill 5: Lead form submissions */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-850/50 bg-zinc-950/40 text-[11px] text-zinc-350 opacity-70 select-none">
                  <FileText className="h-3.5 w-3.5 shrink-0" />
                  <span>Lead form submissions</span>
                </div>
                
                {/* Pill 6: Monitor customer health */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-850/20 bg-zinc-950/20 text-[11px] text-zinc-450 opacity-40 select-none">
                  <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                  <span>Monitor customer health</span>
                </div>
                
                {/* Pill 7: Identify expansion opportunity */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-zinc-850/20 bg-zinc-950/20 text-[11px] text-zinc-450 opacity-30 select-none">
                  <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                  <span>Identify expansion opportunity</span>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ASK YOUR BUSINESS ANYTHING (Chat UI Playground) */}
      <section className="w-full bg-[#070708]/40">
        <div className="mx-auto max-w-[1360px] border-l border-r border-b border-slate-850/40 relative">

          {/* Section Header Band */}
          <div className="border-b border-slate-850/40 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-455 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">02</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">03</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">PLAYGROUND</span>
              </div>
            </div>
          </div>

          {/* Section Content Area */}
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">

              {/* Left Column: Title & Presets */}
              <div className="lg:col-span-5 pr-0 lg:pr-8 space-y-6 text-left">
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.025em] text-white leading-[1.12]">
                    Ask your business anything
                  </h2>
                  <p className="text-slate-400 text-xs leading-relaxed font-normal">
                    Query your company memory in plain English. Coretify resolves identities, details, and context across tools to give you direct answers with exact source references.
                  </p>
                </div>

                {/* Clickable Preset Cards */}
                <div className="space-y-3 pt-2">
                  {presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => clickPreset(idx)}
                      className={`w-full text-left p-4.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${activePreset === idx
                          ? "bg-[#0c0c0e]/90 border-slate-800 text-white"
                          : "bg-transparent border-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-850"
                        }`}
                    >
                      <span className="text-xs font-semibold">{preset.q}</span>
                      <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${activePreset === idx ? "translate-x-0 text-white" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-slate-450"
                        }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacing Column */}
              <div className="hidden lg:block lg:col-span-1 self-stretch relative">
              </div>

              {/* Right Column: Chat UI Window */}
              <div className="lg:col-span-6 bg-[#0c0c0e] border border-slate-900 rounded-3xl p-6 shadow-xl relative min-h-[440px] flex flex-col justify-between overflow-hidden">

                {/* Chat Header */}
                <div className="flex justify-between items-center border-b border-slate-900 pb-3.5 mb-4">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Coretify Memory AI
                  </span>
                  <Badge variant="outline" className="text-[9px] border-slate-850 text-slate-500 bg-slate-950 px-2 py-0.5 font-mono">
                    RAG pgvector
                  </Badge>
                </div>

                {/* Chat Conversation Area */}
                <div className="flex-1 space-y-4 mb-4 text-xs">

                  {/* Initial bot message */}
                  <div className="flex gap-3 items-start justify-start">
                    <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-[#08080a]/60 border border-slate-900 text-slate-450 px-3.5 py-2.5 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed text-left">
                      Hello! Ask me anything about your business memory. I can search through calendar schedules, email correspondence, chat exports, and document files.
                    </div>
                  </div>

                  {/* User Typed Query */}
                  {typedText && (
                    <div className="flex gap-3 items-start justify-end animate-in fade-in duration-200">
                      <div className="bg-[#18181b] border border-slate-850 text-white px-3.5 py-2.5 rounded-2xl rounded-tr-none max-w-[85%] leading-relaxed text-left">
                        {typedText}
                      </div>
                    </div>
                  )}

                  {/* Loading/Typing Indicator */}
                  {typedText && !demoAnswer && (
                    <div className="flex gap-3 items-start justify-start animate-in fade-in duration-100">
                      <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                        <Bot className="h-4.5 w-4.5 animate-pulse" />
                      </div>
                      <div className="bg-[#08080a]/60 border border-slate-900 rounded-2xl rounded-tl-none px-3.5 py-2 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}

                  {/* AI Answer & Citations */}
                  {demoAnswer && (
                    <div className="flex gap-3 items-start justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                        <Bot className="h-4.5 w-4.5" />
                      </div>
                      <div className="space-y-2 max-w-[85%] text-left">
                        <div className="bg-[#08080a] border border-slate-900 text-slate-300 px-3.5 py-2.5 rounded-2xl rounded-tl-none leading-relaxed whitespace-pre-line">
                          {demoAnswer}
                        </div>

                        {/* Citations list */}
                        {demoCitations && demoCitations.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-0.5">
                            <span className="text-[9px] text-slate-500 self-center">Sources:</span>
                            {demoCitations.map((cite, cIdx) => (
                              <span
                                key={cIdx}
                                className="text-[9px] font-semibold px-2 py-0.5 rounded border bg-slate-900 border-slate-850 text-slate-400 inline-flex items-center gap-1 font-sans cursor-pointer hover:text-white transition-colors"
                              >
                                {cite.name} <ExternalLink className="h-2.5 w-2.5" />
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Chat Input Bar */}
                <div className="border border-slate-900 bg-[#08080a] p-1.5 rounded-xl text-xs text-slate-650 flex items-center justify-between mt-4">
                  <span className="pl-2.5 select-none">Ask a question...</span>
                  <button className="bg-slate-900 border border-slate-800 text-slate-400 p-1.5 rounded-lg hover:text-white transition-colors">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: DAILY BRIEF */}
      <section className="w-full bg-[#070708]/40">
        <div className="mx-auto max-w-[1360px] border-l border-r border-b border-slate-850/40 relative">

          {/* Section Header Band */}
          <div className="border-b border-slate-850/40 py-4 px-8 sm:px-12 lg:px-16 flex items-center select-none bg-[#0c0c0e]/20">
            <div className="flex items-center gap-2">
              <div className="w-[3px] h-3.5 bg-slate-455 rounded-full" />
              <div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-500">
                <span className="text-slate-700">[</span>
                <span className="text-white font-bold">03</span>
                <span className="text-slate-700">/</span>
                <span className="text-slate-600">03</span>
                <span className="text-slate-700">]</span>
                <span className="text-slate-650 mx-0.5">·</span>
                <span className="uppercase text-slate-400 font-bold">PROACTIVE</span>
              </div>
            </div>
          </div>

          {/* Section Content Area */}
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">

              {/* Left Column: Title & Intro */}
              <div className="lg:col-span-5 pr-0 lg:pr-8 space-y-6 text-left">
                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.025em] text-white leading-[1.12]">
                    Daily Brief
                  </h2>
                  <p className="text-slate-400 text-xs leading-relaxed font-normal">
                    Stay ahead of operational issues with Coretify's proactive morning briefs. We automatically scan communications, calendars, and accounting sheets to alert you about key action points before your day starts.
                  </p>
                </div>
              </div>

              {/* Spacing Column */}
              <div className="hidden lg:block lg:col-span-1 self-stretch relative">
              </div>

              {/* Right Column: Cards List */}
              <div className="lg:col-span-6 space-y-4 w-full">

                {/* Card 1: 2 clients need follow-up */}
                <Card className="bg-[#0c0c0e]/80 border-slate-900 p-5 shadow-lg relative group transition-all duration-300 hover:border-slate-850 hover:bg-[#0c0c0e]">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                          2 clients need follow-up
                        </h4>
                        <Badge variant="secondary" className="bg-amber-500/5 text-amber-500 border border-amber-500/10 text-[9px] py-0 px-2 font-mono">
                          High Priority
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-normal">
                        Vista Retail has had 0 email responses in 14 days (Playbook target is every 3 days). Aero Design retainer amendment proposal is awaiting your reply.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Card 2: 1 project at risk */}
                <Card className="bg-[#0c0c0e]/80 border-slate-900 p-5 shadow-lg relative group transition-all duration-300 hover:border-slate-850 hover:bg-[#0c0c0e]">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white group-hover:text-rose-450 transition-colors">
                          1 project at risk
                        </h4>
                        <Badge variant="secondary" className="bg-rose-500/5 text-rose-500 border border-rose-500/10 text-[9px] py-0 px-2 font-mono">
                          Timeline Delay
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-normal">
                        Nexa Web App is projected to be delayed by 5 days from the kickoff schedule. Ditemukan 12 email revisi alur API autentikasi dari client di Gmail.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Card 3: Revenue down 12% */}
                <Card className="bg-[#0c0c0e]/80 border-slate-900 p-5 shadow-lg relative group transition-all duration-300 hover:border-slate-850 hover:bg-[#0c0c0e]">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-rose-500/5 border border-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                      <TrendingUp className="h-5 w-5 rotate-180" />
                    </div>
                    <div className="flex-1 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-white group-hover:text-rose-450 transition-colors">
                          Revenue down 12%
                        </h4>
                        <Badge variant="secondary" className="bg-rose-500/5 text-rose-450 border border-rose-500/10 text-[9px] py-0 px-2 font-mono">
                          Financial Impact
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed font-normal">
                        Monthly revenue dropped due to the delayed Nexa milestone invoice. Current operational burn rate is Rp45.2M/month, with runway estimated at 6.5 months.
                      </p>
                    </div>
                  </div>
                </Card>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS FOOTER BLOCK */}
      <section className="w-full bg-[#070708]">
        <div className="mx-auto max-w-[1360px] border-l border-r border-slate-850/40 relative pt-20 pb-12 px-8 sm:px-12 lg:px-16 flex flex-col gap-14">

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start w-full">

            {/* Left Column: Brand, Desc, Watch button */}
            <div className="md:col-span-5 space-y-6 text-left">
              <div className="flex items-center gap-3 select-none cursor-pointer" onClick={() => router.push("/")}>
                {/* Modern minimalist logo inspired by the screenshot's squircle shape */}
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 shadow-md">
                  <div className="h-5 w-5 rounded-lg border-2 border-zinc-700 bg-zinc-950 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  </div>
                </div>
                <span className="text-[21px] font-semibold tracking-tight text-white">
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
          <div className="w-full h-px bg-slate-850/40" />

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
