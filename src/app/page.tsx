"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
  Folder
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
    <div className="min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 relative overflow-hidden font-sans antialiased">
      
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
            <Button
              onClick={handleStartOnboarding}
              className="bg-[#18181b] hover:bg-[#27272a] text-white border border-[#2e2e33] text-[13px] font-medium px-5 py-4.5 rounded-xl shadow-md transition-all active:scale-[0.98]"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (No vertical grid borders, spans full width) */}
      <section className="relative border-b border-slate-900 w-full bg-[#070708]/20">
        <div className="mx-auto max-w-[1360px] px-8 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            
            {/* Left Column: Headline */}
            <div className="lg:col-span-7 pr-0 lg:pr-12 text-left space-y-6">
              <h1 className="text-4xl sm:text-[54px] font-semibold tracking-[-0.03em] text-white leading-[1.08]">
                Deploy agents that work across your company memory
              </h1>
            </div>

            {/* Spacing between hero columns (visible only on desktop) */}
            <div className="hidden lg:block lg:col-span-1 h-full min-h-[140px] self-stretch relative">
            </div>

            {/* Right Column: Description & Primary CTA */}
            <div className="lg:col-span-4 pl-0 lg:pl-6 text-left space-y-6 lg:pt-2">
              <p className="text-base sm:text-[16px] text-slate-400 leading-relaxed font-normal">
                Build, deploy, and improve your existing memory agents for every business workflow and data connector.
              </p>
              <div>
                <Button
                  onClick={handleStartOnboarding}
                  size="lg"
                  className="bg-white hover:bg-slate-100 text-black font-semibold text-[13px] px-7 py-5.5 rounded-full shadow-lg transition-all hover:scale-[1.01] active:scale-[0.98]"
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TAB NAVIGATION ROW */}
      <div className="w-full bg-[#08080a]/50">
        <div className="mx-auto max-w-[1360px] border-l border-r border-slate-800 grid grid-cols-12 text-[13px] font-semibold text-slate-400">
          {/* Left spacer column with dashed border on the right */}
          <div className="col-span-2 border-r border-dashed border-slate-800" />
          
          {/* Ask Coretify tab */}
          <button
            onClick={() => setActiveSectionTab("agent")}
            className={`col-span-2 border-r border-b border-slate-800 py-4 text-center cursor-pointer transition-all ${
              activeSectionTab === "agent"
                ? "text-white bg-white/5 font-semibold"
                : "hover:text-slate-200"
            }`}
          >
            Ask Coretify
          </button>
          
          {/* Data model tab */}
          <button
            onClick={() => setActiveSectionTab("data")}
            className={`col-span-2 border-r border-b border-slate-800 py-4 text-center cursor-pointer transition-all ${
              activeSectionTab === "data"
                ? "text-white bg-white/5 font-semibold"
                : "hover:text-slate-200"
            }`}
          >
            Data model
          </button>

          {/* Workflows tab */}
          <button
            onClick={() => setActiveSectionTab("tools")}
            className={`col-span-2 border-r border-b border-slate-800 py-4 text-center cursor-pointer transition-all ${
              activeSectionTab === "tools"
                ? "text-white bg-white/5 font-semibold"
                : "hover:text-slate-200"
            }`}
          >
            Workflows
          </button>

          {/* Reporting tab */}
          <button
            onClick={() => setActiveSectionTab("governance")}
            className={`col-span-2 border-r border-dashed border-b border-slate-800 py-4 text-center cursor-pointer transition-all ${
              activeSectionTab === "governance"
                ? "text-white bg-white/5 font-semibold"
                : "hover:text-slate-200"
            }`}
          >
            Reporting
          </button>

          {/* Right spacer column */}
          <div className="col-span-2" />
        </div>
      </div>

      {/* INTERACTIVE PRODUCT MOCKUP SECTION (No side grid lines, full width) */}
      <section className="relative border-b border-slate-900 w-full bg-[#070708]/10 pt-8 pb-16 sm:pb-20 lg:pb-24">
        <div className="mx-auto max-w-[1360px] px-8 sm:px-12 lg:px-16">

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
                    <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight mt-1.5">
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
                          className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                            expandedMeeting === "greenleaf" ? "bg-slate-900/40 border-b border-slate-900" : "bg-transparent hover:bg-slate-900/30"
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
                              <div className="text-slate-600 font-bold uppercase text-[9px] tracking-wider mb-1">Details</div>
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
                                <span className="text-slate-650 font-bold uppercase text-[9px] tracking-wider">Participants</span>
                                <Badge variant="secondary" className="bg-slate-900 text-slate-400 text-[9px] py-0 px-1 font-mono border border-slate-850">8</Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-[9px] font-black text-slate-350">DP</div>
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
      </section>

      {/* BRAND LOGOS SECTION (No side grid lines, full width) */}
      <section className="relative border-b border-slate-900 w-full bg-[#070708]/20 py-10">
        <div className="mx-auto max-w-[1360px] px-8 sm:px-12 lg:px-16">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-30 grayscale hover:opacity-50 transition-opacity duration-350 max-w-5xl mx-auto">
            {/* Granola */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <span className="text-[17px] font-extrabold tracking-tight">granola</span>
            </div>

            {/* Flow */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <div className="flex flex-col gap-[2.5px] w-3.5">
                <div className="h-[2px] w-full bg-current rounded-full" />
                <div className="h-[2px] w-3/4 bg-current rounded-full" />
                <div className="h-[2px] w-1/2 bg-current rounded-full" />
              </div>
              <span>Flow</span>
            </div>

            {/* Listen */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3.5" fill="currentColor" />
              </svg>
              <span>Listen</span>
            </div>

            {/* Obvious */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              <span>Obvious</span>
            </div>

            {/* Modal */}
            <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <svg className="h-4 w-4 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4zM9 9h6v6H9z" />
              </svg>
              <span>Modal</span>
            </div>

            {/* USV */}
            <div className="flex items-center gap-1 text-[11px] font-bold text-white uppercase tracking-wider">
              <span className="bg-white text-black px-1.5 py-0.5 rounded font-black mr-0.5">USV</span>
              <span>Union Square Ventures</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Tab Switcher (Introducing Default clone) */}
      <section className="w-full bg-[#070708]/40">
        <div className="mx-auto max-w-[1360px] border-l border-r border-b border-slate-800 relative p-8 sm:p-12 lg:p-16">
          
          {/* Top-most intersection markers */}
          <span className="absolute -top-2.5 -left-1 text-[11px] text-slate-800 font-mono select-none">+</span >
          <span className="absolute -top-2.5 -right-1.5 text-[11px] text-slate-800 font-mono select-none">+</span >

          {/* Section Intersection Markers */}
          <span className="absolute bottom-[-7.5px] -left-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >
          <span className="absolute bottom-[-7.5px] -right-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >

          {/* Section Header */}
          <div className="text-left mb-12 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
              Introducing Coretify
            </span>
            <h2 className="text-3xl sm:text-[40px] font-semibold tracking-[-0.025em] text-white leading-[1.12] max-w-2xl">
              The infrastructure agents need to run on your company memory
            </h2>
          </div>

          {/* Grid Layout (With Vertical Divider) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            
            {/* Left Column: 4 Tabs */}
            <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-8">
              
              {/* Tab 1: Data */}
              <button
                onClick={() => setActiveSectionTab("data")}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeSectionTab === "data"
                    ? "bg-[#0c0c0e]/85 border-slate-900 text-white"
                    : "bg-transparent border-transparent text-slate-500 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5 font-semibold text-xs mb-2">
                  <svg className={`h-4 w-4 ${activeSectionTab === "data" ? "text-emerald-450" : "text-slate-600"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                  </svg>
                  <span>Data</span>
                </div>
                <p className="text-[11px] text-slate-450 leading-relaxed font-normal">
                  Coretify unifies every data source into one context-resolved model.
                </p>
                {activeSectionTab === "data" && (
                  <div className="w-8 h-[2px] bg-white mt-4" />
                )}
              </button>

              {/* Tab 2: Tools */}
              <button
                onClick={() => setActiveSectionTab("tools")}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeSectionTab === "tools"
                    ? "bg-[#0c0c0e]/85 border-slate-900 text-white"
                    : "bg-transparent border-transparent text-slate-500 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5 font-semibold text-xs mb-2">
                  <Zap className={`h-4 w-4 ${activeSectionTab === "tools" ? "text-purple-400 fill-purple-400/10" : "text-slate-650"}`} />
                  <span>Tools</span>
                </div>
                <p className="text-[11px] text-slate-450 leading-relaxed font-normal">
                  Coretify gives agents and operators shared tables, workflows, and routing.
                </p>
                {activeSectionTab === "tools" && (
                  <div className="w-8 h-[2px] bg-white mt-4" />
                )}
              </button>

              {/* Tab 3: Agent */}
              <button
                onClick={() => setActiveSectionTab("agent")}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeSectionTab === "agent"
                    ? "bg-[#0c0c0e]/85 border-slate-900 text-white"
                    : "bg-transparent border-transparent text-slate-500 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5 font-semibold text-xs mb-2">
                  <Bot className={`h-4 w-4 ${activeSectionTab === "agent" ? "text-blue-400" : "text-slate-650"}`} />
                  <span>Agent</span>
                </div>
                <p className="text-[11px] text-slate-450 leading-relaxed font-normal">
                  Coretify's agents turn plain language into working systems.
                </p>
                {activeSectionTab === "agent" && (
                  <div className="w-8 h-[2px] bg-white mt-4" />
                )}
              </button>

              {/* Tab 4: Governance */}
              <button
                onClick={() => setActiveSectionTab("governance")}
                className={`w-full text-left p-6 rounded-2xl border transition-all ${
                  activeSectionTab === "governance"
                    ? "bg-[#0c0c0e]/85 border-slate-900 text-white"
                    : "bg-transparent border-transparent text-slate-500 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-2.5 font-semibold text-xs mb-2">
                  <Lock className={`h-4 w-4 ${activeSectionTab === "governance" ? "text-amber-500" : "text-slate-650"}`} />
                  <span>Governance</span>
                </div>
                <p className="text-[11px] text-slate-450 leading-relaxed font-normal">
                  Coretify's agents propose, you approve, anything rolls back.
                </p>
                {activeSectionTab === "governance" && (
                  <div className="w-8 h-[2px] bg-white mt-4" />
                )}
              </button>

            </div>

            {/* Spacing between Tab columns (desktop only) */}
            <div className="hidden lg:block lg:col-span-1 self-stretch relative">
            </div>

            {/* Right Column: Dynamic Preview Card */}
            <div className="lg:col-span-7 bg-[#0c0c0e] border border-slate-900 rounded-3xl p-8 shadow-xl relative min-h-[480px] flex flex-col justify-between overflow-hidden">
              
              {/* Card Header Info */}
              <div className="space-y-4 mb-6 text-left">
                {activeSectionTab === "data" && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <svg className="h-4.5 w-4.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                      </svg>
                      <span>Data</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">One source of truth for every agent</h3>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                      Coretify unifies data from CRM, website, forms, enrichment vendors, ad platforms, and conversation tools into a single identity-resolved model in real time.
                    </p>
                  </>
                )}

                {activeSectionTab === "tools" && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Zap className="h-4.5 w-4.5 text-purple-400 fill-purple-400/10" />
                      <span>Tools</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Equip your team with the right playbooks</h3>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                      Coretify unifies tools and playbooks into a single dashboard. Manage team workload allocations, check active client feedback loops, and query RAG memory instantly.
                    </p>
                  </>
                )}

                {activeSectionTab === "agent" && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Bot className="h-4.5 w-4.5 text-blue-400" />
                      <span>Agent</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Conversational memory at your service</h3>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                      Query your company memory in plain Bahasa Indonesia. Get structured operational answers citing exact source emails, calendar events, and chat logs.
                    </p>
                  </>
                )}

                {activeSectionTab === "governance" && (
                  <>
                    <div className="flex items-center gap-2 text-xs font-semibold text-white">
                      <Lock className="h-4.5 w-4.5 text-amber-500" />
                      <span>Governance</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">Enterprise-grade Row-Level Security</h3>
                    <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                      Enforce role-based access control (Owner, Manager, Member) at the database level. Sensitive financial records are automatically restricted from general queries.
                    </p>
                  </>
                )}

                <div>
                  <Button
                    onClick={handleStartOnboarding}
                    className="bg-[#18181b] hover:bg-[#27272a] text-white border border-[#2e2e33] text-xs font-semibold px-4.5 py-2.5 rounded-xl mt-1"
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Dynamic Mock Content below */}
              {activeSectionTab === "data" && (
                <div className="border border-slate-900 bg-[#08080a] rounded-2xl overflow-hidden shadow-inner w-full mt-4 text-left">
                  {/* Mock Window Header */}
                  <div className="h-12 border-b border-slate-900 bg-[#08080a] px-4.5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Controls */}
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/20 border border-[#ef4444]/30" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]/20 border border-[#eab308]/30" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/30" />
                      </div>
                      {/* Tabs */}
                      <div className="flex items-center gap-1.5 bg-[#121215] border border-slate-850 px-3 py-1.5 rounded-lg text-[10px] text-slate-355">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>Core Data Model</span>
                        <span className="text-slate-650 ml-1.5 font-bold">×</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pl-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
                        <span>Companies last week</span>
                      </div>
                    </div>
                    <span className="text-slate-600 text-sm font-semibold cursor-pointer pr-1">+</span>
                  </div>

                  {/* Mock Window body */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 text-xs min-h-[260px] bg-[#0c0c0e]/30">
                    {/* Left Sidebar (3 cols) */}
                    <div className="lg:col-span-3 border-r border-slate-900 p-4.5 space-y-4">
                      <button className="w-full text-left py-1.5 px-2.5 border border-slate-900 rounded-lg bg-[#0f0f12] text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                        <Plus className="h-3 w-3" /> Create new view
                      </button>
                      <div className="space-y-1.5 text-[11px] text-slate-400 font-medium">
                        <div className="flex items-center gap-2 py-1 px-2 hover:bg-slate-900/50 rounded"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500/40" /> Home</div>
                        <div className="flex items-center gap-2 py-1 px-2 hover:bg-slate-900/50 rounded"><span className="h-1.5 w-1.5 rounded-full bg-blue-500/40" /> All Contacts</div>
                        <div className="flex items-center gap-2 py-1 px-2 hover:bg-slate-900/50 rounded"><span className="h-1.5 w-1.5 rounded-full bg-blue-500/40" /> All Accounts</div>
                        <div className="flex items-center gap-2 py-1 px-2 hover:bg-slate-900/50 rounded"><span className="h-1.5 w-1.5 rounded-full bg-yellow-500/40" /> All Opportunities</div>
                        <div className="h-[1px] bg-slate-900 my-2" />
                        <div className="flex items-center gap-2 py-1.5 px-2 bg-slate-900/50 rounded text-white"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Core Data Model</div>
                      </div>
                    </div>

                    {/* Right Spreadsheet Table (9 cols) */}
                    <div className="lg:col-span-9 overflow-x-auto">
                      <div className="min-w-[500px]">
                        {/* Headers */}
                        <div className="grid grid-cols-12 bg-[#0f0f12] border-b border-slate-900 py-2 px-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          <div className="col-span-1">#</div>
                          <div className="col-span-4">Work Email</div>
                          <div className="col-span-3">Company name</div>
                          <div className="col-span-2">Headcount</div>
                          <div className="col-span-2 text-right">Mobile</div>
                        </div>
                        {/* Rows */}
                        <div className="divide-y divide-slate-900/50 font-mono text-[10.5px]">
                          <div className="grid grid-cols-12 py-2.5 px-3 text-slate-350">
                            <div className="col-span-1 text-slate-600">1</div>
                            <div className="col-span-4 text-slate-200">michelle.rivera@example.com</div>
                            <div className="col-span-3">Attio</div>
                            <div className="col-span-2">$3,385,492</div>
                            <div className="col-span-2 text-right text-slate-500">+1 (415)...</div>
                          </div>
                          <div className="grid grid-cols-12 py-2.5 px-3 text-slate-350">
                            <div className="col-span-1 text-slate-600">2</div>
                            <div className="col-span-4 text-slate-200">felicia.reid@example.com</div>
                            <div className="col-span-3">Amplemarket</div>
                            <div className="col-span-2">$5,375,784</div>
                            <div className="col-span-2 text-right text-slate-500">+1 (212)...</div>
                          </div>
                          <div className="grid grid-cols-12 py-2.5 px-3 text-slate-350">
                            <div className="col-span-1 text-slate-600">3</div>
                            <div className="col-span-4 text-slate-200">james.smith@example.com</div>
                            <div className="col-span-3">Apollo</div>
                            <div className="col-span-2">$2,140,800</div>
                            <div className="col-span-2 text-right text-slate-500">+1 (206)...</div>
                          </div>
                          <div className="grid grid-cols-12 py-2.5 px-3 text-slate-350">
                            <div className="col-span-1 text-slate-600">4</div>
                            <div className="col-span-4 text-slate-200">patricia.johnson@example.com</div>
                            <div className="col-span-3">Calendly</div>
                            <div className="col-span-2">$890,250</div>
                            <div className="col-span-2 text-right text-slate-500">+1 (404)...</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSectionTab === "tools" && (
                <div className="border border-slate-900 bg-[#08080a] rounded-2xl p-6 space-y-4 w-full mt-4 text-left">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Active Playbook Configurations</span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-[#0c0c0e] border-slate-900 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">Software House</span>
                        <Check className="h-4 w-4 text-emerald-500" />
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                        Scope creep warnings and developer overload tracking active.
                      </p>
                    </Card>
                    <Card className="bg-transparent border-slate-950 p-4 space-y-2 opacity-50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 font-sans">Creative Agency</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                        Client capacity limits and churn monitoring alerts.
                      </p>
                    </Card>
                    <Card className="bg-transparent border-slate-950 p-4 space-y-2 opacity-50">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 font-sans">Startup Playbook</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                        Goal activity tracking and cash runway logs.
                      </p>
                    </Card>
                  </div>
                </div>
              )}

              {activeSectionTab === "agent" && (
                <div className="border border-slate-900 bg-[#08080a] rounded-2xl p-6 space-y-4 w-full mt-4 text-xs text-left">
                  <div className="flex gap-3 justify-end">
                    <div className="bg-[#18181b] border border-slate-850 text-slate-200 px-4 py-2.5 rounded-2xl rounded-tr-none">
                      Kenapa Project Nexa Corp telat?
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="h-7 w-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="space-y-2 max-w-[80%]">
                      <div className="bg-[#0c0c0e] border border-slate-900 text-slate-300 px-4 py-2.5 rounded-2xl rounded-tl-none leading-relaxed">
                        Project Nexa Corp terlambat karena adanya 4 kali revisi desain autentikasi API oleh klien setelah pengerjaan dimulai.
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[9px] text-slate-500 self-center font-sans">Referensi:</span>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded border bg-slate-900 border-slate-850 text-slate-400 inline-flex items-center gap-1 font-sans">
                          Email Budi (12 June) <ExternalLink className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[9px] font-semibold px-2 py-0.5 rounded border bg-slate-900 border-slate-850 text-slate-400 inline-flex items-center gap-1 font-sans">
                          WhatsApp Group Nexa <ExternalLink className="h-2.5 w-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSectionTab === "governance" && (
                <div className="border border-slate-900 bg-[#08080a] rounded-2xl p-6 space-y-4 w-full mt-4 text-xs text-left">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block font-sans">Access Control & RLS Settings</span>
                  <div className="border border-slate-900 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-3 bg-[#0f0f12] border-b border-slate-900 py-2 px-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider font-sans">
                      <div>Role</div>
                      <div>Access Scope</div>
                      <div>Permissions status</div>
                    </div>
                    <div className="divide-y divide-slate-900/50">
                      <div className="grid grid-cols-3 py-2.5 px-3 text-slate-350 font-sans">
                        <div className="font-bold text-white">Owner</div>
                        <div>Full Read-Write</div>
                        <div><Badge variant="outline" className="text-[9px] border-emerald-500/20 text-emerald-400 bg-emerald-500/5 py-0 px-2 font-mono">Unrestricted</Badge></div>
                      </div>
                      <div className="grid grid-cols-3 py-2.5 px-3 text-slate-350 font-sans">
                        <div className="font-bold text-white">Manager</div>
                        <div>Read-Only (General)</div>
                        <div><Badge variant="outline" className="text-[9px] border-slate-800 text-slate-400 bg-slate-950 py-0 px-2 font-mono">Restricted Finance</Badge></div>
                      </div>
                      <div className="grid grid-cols-3 py-2.5 px-3 text-slate-350 font-sans">
                        <div className="font-bold text-white">Member</div>
                        <div>Read-Only (Operational)</div>
                        <div><Badge variant="outline" className="text-[9px] border-slate-800 text-slate-400 bg-slate-950 py-0 px-2 font-mono">Restricted Finance</Badge></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* SECTION: ASK YOUR BUSINESS ANYTHING (Chat UI Playground) */}
      <section className="w-full bg-[#070708]/40">
        <div className="mx-auto max-w-[1360px] border-l border-r border-b border-slate-800 relative p-8 sm:p-12 lg:p-16">
          
          {/* Section Intersection Markers */}
          <span className="absolute bottom-[-7.5px] -left-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >
          <span className="absolute bottom-[-7.5px] -right-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            
            {/* Left Column: Title & Presets */}
            <div className="lg:col-span-5 pr-0 lg:pr-8 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Interact & Query
                </span>
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
                    className={`w-full text-left p-4.5 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                      activePreset === idx
                        ? "bg-[#0c0c0e]/90 border-slate-800 text-white"
                        : "bg-transparent border-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-850"
                    }`}
                  >
                    <span className="text-xs font-semibold">{preset.q}</span>
                    <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${
                      activePreset === idx ? "translate-x-0 text-white" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-slate-450"
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
      </section>

      {/* SECTION 4: DAILY BRIEF */}
      <section className="w-full bg-[#070708]/40">
        <div className="mx-auto max-w-[1360px] border-l border-r border-b border-slate-800 relative p-8 sm:p-12 lg:p-16">
          
          {/* Section Intersection Markers */}
          <span className="absolute bottom-[-7.5px] -left-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >
          <span className="absolute bottom-[-7.5px] -right-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
            
            {/* Left Column: Title & Intro */}
            <div className="lg:col-span-5 pr-0 lg:pr-8 space-y-6 text-left">
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                  Morning Digest
                </span>
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
                      <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
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
                      <h4 className="text-sm font-bold text-white group-hover:text-rose-450 transition-colors">
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
                      <h4 className="text-sm font-bold text-white group-hover:text-rose-450 transition-colors">
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
      </section>

      {/* TRUST SIGNALS FOOTER BLOCK */}
      <section className="w-full bg-[#070708]/10">
        <div className="mx-auto max-w-[1360px] border-l border-r border-slate-800 relative p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-xs text-slate-500">
          
          <span className="absolute top-[-7.5px] -left-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >
          <span className="absolute top-[-7.5px] -right-[4.5px] text-[11px] text-slate-800 font-mono select-none">+</span >

          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-slate-400" />
            <span>&copy; {new Date().getFullYear()} Coretify Inc by Stravio Labs. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="mailto:support@coretify.ai" className="hover:text-slate-300 transition-colors">Hubungi Kami</a>
          </div>
        </div>
      </section>
    </div>
  );
}
