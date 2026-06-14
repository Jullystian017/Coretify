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
  MoreHorizontal
} from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleStartOnboarding = () => {
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200 relative overflow-hidden font-sans antialiased">
      {/* Background radial gradient mesh for premium visual effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-full max-w-7xl rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#070708]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-8">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/")}>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-300 shadow-inner">
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

      {/* HERO SECTION */}
      <main className="mx-auto max-w-7xl px-8 pt-12 pb-24">
        
        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-start mb-16">
          
          {/* Left Column: Headline */}
          <div className="lg:col-span-7 max-w-2xl text-left">
            <h1 className="text-4xl sm:text-[56px] font-semibold tracking-[-0.03em] text-white leading-[1.08] lg:pr-6">
              Deploy agents that work across your company memory
            </h1>
          </div>

          {/* Right Column: Description & Primary CTA */}
          <div className="lg:col-span-5 text-left lg:pt-3 space-y-6">
            <p className="text-base sm:text-[17px] text-slate-400 leading-relaxed font-normal">
              Build, deploy, and improve your existing memory agents for every business workflow and data connector.
            </p>
            <div>
              <Button
                onClick={handleStartOnboarding}
                size="lg"
                className="bg-white hover:bg-slate-100 text-black font-semibold text-[14px] px-7 py-5 rounded-full shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Request a Demo
              </Button>
            </div>
          </div>
        </div>

        {/* LOGOS ROW (Greyscale, low opacity) */}
        <div className="border-t border-slate-900/60 pt-8 pb-16">
          <div className="flex flex-wrap items-center justify-between gap-6 opacity-35 grayscale hover:opacity-60 transition-opacity duration-300">
            {/* Airbyte */}
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white">
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0L2 6v12l10 6 10-6V6L12 0zm0 3.2L19 7.3v9.4l-7 4.1-7-4.1V7.3l7-4.1z" />
              </svg>
              <span>Airbyte</span>
            </div>

            {/* Tailscale */}
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white">
              <div className="grid grid-cols-3 gap-[2.5px] w-4 h-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-[3px] h-[3px] rounded-full bg-current" />
                ))}
              </div>
              <span>tailscale</span>
            </div>

            {/* Listen */}
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white">
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="4" />
              </svg>
              <span>Listen</span>
            </div>

            {/* Profound */}
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white">
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 12h20L12 2zm0 4.5L17.5 12H6.5L12 6.5zM2 14h20v2H2v-2zm0 4h20v2H2v-2z" />
              </svg>
              <span>Profound</span>
            </div>

            {/* Flow */}
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white">
              <div className="flex flex-col gap-[3px] w-4">
                <div className="h-[2px] w-full bg-current rounded-full" />
                <div className="h-[2px] w-3/4 bg-current rounded-full" />
                <div className="h-[2px] w-1/2 bg-current rounded-full" />
              </div>
              <span>Flow</span>
            </div>

            {/* Fal */}
            <div className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-white">
              <span className="font-mono text-base font-extrabold uppercase">fal</span>
            </div>

            {/* Perplexity */}
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white">
              <svg className="h-4.5 w-4.5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>perplexity</span>
            </div>

            {/* WorkOS */}
            <div className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-white">
              <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8z" />
              </svg>
              <span>WorkOS</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE MOCK PRODUCT WINDOW */}
        <div className="relative border border-slate-900 bg-[#0c0c0e] rounded-2xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
          
          {/* Mock Window Header */}
          <div className="h-14 border-b border-slate-900 bg-[#08080a] px-6 flex items-center justify-between">
            
            {/* macOS Window Controls */}
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ef4444]/25 border border-[#ef4444]/35" />
                <span className="h-3 w-3 rounded-full bg-[#eab308]/25 border border-[#eab308]/35" />
                <span className="h-3 w-3 rounded-full bg-[#22c55e]/25 border border-[#22c55e]/35" />
              </div>
              
              {/* Tab navigation */}
              <div className="flex items-center gap-1.5 bg-[#121215] border border-slate-850 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Inbound Form Routing</span>
                <span className="text-slate-600 ml-1.5 font-bold cursor-pointer">×</span>
              </div>
              <button className="text-slate-600 hover:text-slate-400 text-sm font-semibold">+</button>
            </div>

            {/* Profile pictures & action buttons */}
            <div className="flex items-center gap-4">
              {/* Profile group */}
              <div className="flex -space-x-1.5 overflow-hidden">
                <div className="h-6 w-6 rounded-full bg-slate-800 border-2 border-[#08080a] flex items-center justify-center text-[9px] font-bold text-purple-400">EM</div>
                <div className="h-6 w-6 rounded-full bg-purple-900/30 border-2 border-[#08080a] flex items-center justify-center text-[9px] font-bold text-pink-400">BS</div>
              </div>

              {/* Action Buttons */}
              <button className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-850 bg-[#0f0f12]">
                Share
              </button>
              <button className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-850 bg-[#0f0f12] flex items-center gap-1">
                <Play className="h-3 w-3 fill-current text-slate-500" />
                Test
              </button>
              <button className="text-xs text-white bg-slate-900 border border-slate-850 px-3.5 py-1.5 rounded-lg font-semibold">
                Publish
              </button>
            </div>
          </div>

          {/* Mock Window Main Panel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
            
            {/* Left Side: Chat Panel (4 cols) */}
            <div className="lg:col-span-4 border-r border-slate-900 p-6 flex flex-col justify-between bg-[#08080a]/60">
              <div className="space-y-6">
                {/* Chat bubble 1 */}
                <div className="flex justify-end">
                  <div className="bg-[#18181b] border border-slate-800 text-xs text-slate-200 px-4 py-2.5 rounded-2xl rounded-tr-none max-w-[90%]">
                    Show me all Inbound sourced pipeline
                  </div>
                </div>

                {/* Chat bubble 2 */}
                <div className="space-y-2.5">
                  <div className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase">Searched through records...</div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    OK. Here's a list of opportunities that came from inbound demos.
                  </div>
                </div>

                {/* Simulated Table */}
                <div className="border border-slate-900 rounded-xl overflow-hidden text-xs">
                  <div className="grid grid-cols-3 bg-[#0f0f12] border-b border-slate-900 px-3 py-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <div>Name</div>
                    <div>Company</div>
                    <div className="text-right">Amount</div>
                  </div>
                  <div className="divide-y divide-slate-900 bg-slate-950/20">
                    <div className="grid grid-cols-3 px-3 py-2.5 text-slate-350">
                      <div className="font-medium text-slate-200">Emma</div>
                      <div>Airtable</div>
                      <div className="text-right font-mono text-slate-400">$125,000</div>
                    </div>
                    <div className="grid grid-cols-3 px-3 py-2.5 text-slate-350">
                      <div className="font-medium text-slate-200">Budi</div>
                      <div>Nexa Corp</div>
                      <div className="text-right font-mono text-slate-400">$84,000</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Prompt bar */}
              <div className="border border-slate-900 bg-[#0f0f12] p-2.5 rounded-xl text-xs text-slate-600 flex items-center justify-between">
                <span>Ask your memory agents...</span>
                <ArrowRight className="h-4 w-4 text-slate-600" />
              </div>
            </div>

            {/* Center Canvas Area: Workflow Graph (5 cols) */}
            <div className="lg:col-span-5 p-6 flex flex-col justify-center items-center relative bg-[#0c0c0e]">
              <div className="absolute inset-0 bg-[radial-gradient(#18181b_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />
              
              <div className="w-full max-w-sm space-y-6 z-10">
                {/* Title badge selection */}
                <div className="flex justify-between items-center bg-[#08080a] border border-slate-900 px-3.5 py-2 rounded-xl text-xs">
                  <span className="flex items-center gap-2 text-slate-200 font-medium">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Inbound Form Routing
                  </span>
                  <ChevronDown className="h-4 w-4 text-slate-600" />
                </div>

                {/* Workflow Trigger Card */}
                <Card className="bg-[#121215]/80 border-slate-850 p-4.5 shadow-xl relative group">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Trigger
                      </div>
                      <h4 className="text-xs font-bold text-white mt-1">New Form Submission</h4>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-slate-600" />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Triggers this workflow whenever a visitor submits a form on your website.
                  </p>
                  <div className="mt-3.5">
                    <Badge variant="secondary" className="bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 text-[9px] py-0 px-2 font-mono">
                      Inbound Demo Form
                    </Badge>
                  </div>
                  
                  {/* Cursor representation */}
                  <div className="absolute -bottom-2 -right-2 bg-white text-black p-1 rounded-full shadow-lg shadow-black/45 border border-slate-300 pointer-events-none transform translate-y-2">
                    <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                      <path d="M4 2v20l6.5-6.5h8.5z" />
                    </svg>
                  </div>
                </Card>

                {/* Connecting arrow / line */}
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-8 bg-slate-900" />
                  <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                </div>

                {/* Workflow Action Card */}
                <Card className="bg-[#121215]/80 border-slate-850 p-4.5 shadow-xl">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Action</div>
                      <h4 className="text-xs font-bold text-white mt-1">Add to Sequence</h4>
                    </div>
                    <MoreHorizontal className="h-4 w-4 text-slate-600" />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Enrolls the contact into the specified outreach campaign sequence.
                  </p>
                  <div className="mt-3.5">
                    <Badge variant="secondary" className="bg-purple-500/5 text-purple-400 border border-purple-500/10 text-[9px] py-0 px-2 font-mono">
                      Amplemarket Seq
                    </Badge>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Side: Inspector Panel (3 cols) */}
            <div className="lg:col-span-3 border-l border-slate-900 p-6 space-y-6 bg-[#08080a]/60">
              <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-purple-400" />
                  Add to Sequence
                </span>
                <span className="text-slate-600 text-xs font-semibold cursor-pointer">×</span>
              </div>

              {/* Form group 1 */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Name</label>
                <div className="bg-[#0f0f12] border border-slate-900 px-3 py-2 rounded-xl text-xs text-slate-300 font-mono">
                  Add to Sequence
                </div>
              </div>

              {/* Info alert box */}
              <div className="p-3 bg-[#121215] border border-slate-850 rounded-xl">
                <p className="text-[10px] text-slate-400 leading-normal">
                  Checks for a matching tag to delete or update the item within the sequence manager automatically.
                </p>
              </div>

              {/* Form group 2 */}
              <div className="space-y-4 pt-2">
                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inputs</h5>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-semibold text-slate-400 block">Provider</label>
                  <div className="bg-[#0f0f12] border border-slate-900 px-3 py-2 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500" /> Amplemarket
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-600" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-semibold text-slate-400 block">Sequence</label>
                  <div className="bg-[#0f0f12] border border-slate-900 px-3 py-2 rounded-xl text-xs text-slate-600">
                    Select...
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* TRUST SIGNALS FOOTER BLOCK */}
        <section className="mt-28 border-t border-slate-900/60 pt-16 flex flex-col md:flex-row items-center justify-between gap-8 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-slate-400" />
            <span>&copy; {new Date().getFullYear()} Coretify Inc by Stravio Labs. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="mailto:support@coretify.ai" className="hover:text-slate-300 transition-colors">Hubungi Kami</a>
          </div>
        </section>

      </main>
    </div>
  );
}
