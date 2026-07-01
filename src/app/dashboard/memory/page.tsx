"use client";

import { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Search,
  ExternalLink,
  Cpu,
  Bookmark,
  Network,
  Calendar,
  User,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
} from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "client" | "project" | "decision" | "task" | "source";
  x: number;
  y: number;
  details: {
    desc: string;
    source: string;
    date: string;
    extra?: string;
  };
}

interface Edge {
  from: string;
  to: string;
}

export default function MemoryGraphPage() {
  const [playbook, setPlaybook] = useState("Software House");
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("coretify_company");
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.businessType) setPlaybook(parsed.businessType);
    }
  }, []);

  // Standard static nodes layout
  const nodes: Node[] = [
    {
      id: "nexa",
      label: "Nexa Corp",
      type: "client",
      x: 180,
      y: 150,
      details: {
        desc: "Klien utama Software House yang meminta percepatan timeline proyek Coretify Dev.",
        source: "Gmail & WhatsApp group",
        date: "Last active: 20 Juni 2026",
        extra: "Kontribusi: Rp45.000.000 · Status: Aktif",
      },
    },
    {
      id: "coretify_dev",
      label: "Coretify Dev",
      type: "project",
      x: 380,
      y: 150,
      details: {
        desc: "Proyek pengembangan AI Memory Hub untuk internal Stravio Labs.",
        source: "Google Drive Proposal",
        date: "Timeline: Juni – Agustus 2026",
        extra: "Milestone: Webhook Integration, Dashboard RAG UI",
      },
    },
    {
      id: "deadline_decision",
      label: "Deadline Maju 25 Juli",
      type: "decision",
      x: 300,
      y: 280,
      details: {
        desc: "Persetujuan percepatan timeline project Coretify Dev untuk selesai 25 Juli 2026.",
        source: "WhatsApp Group Nexa Sync",
        date: "Dibuat: 20 Juni 2026",
        extra: "Diputuskan oleh: Julian (Owner) & Alex (PM)",
      },
    },
    {
      id: "webhook_task",
      label: "Alex: Setup Webhook Fonnte",
      type: "task",
      x: 520,
      y: 260,
      details: {
        desc: "Setup endpoint webhook untuk menangkap pesan WhatsApp via Fonnte Gateway.",
        source: "WhatsApp Task Assignment",
        date: "Deadline: Besok Pagi",
        extra: "Status: Pending · Assignee: Alex",
      },
    },
    {
      id: "sync_meeting",
      label: "Sprint Sync Meeting",
      type: "source",
      x: 550,
      y: 90,
      details: {
        desc: "Daily sync meeting untuk membahas backlog & sprint timeline Coretify Dev.",
        source: "Google Calendar",
        date: "20 Juni 2026 @ 09:00",
        extra: "Partisipan: Julian, Alex, Kevin",
      },
    },
  ];

  const edges: Edge[] = [
    { from: "nexa", to: "coretify_dev" },
    { from: "coretify_dev", to: "deadline_decision" },
    { from: "nexa", to: "deadline_decision" },
    { from: "coretify_dev", to: "webhook_task" },
    { from: "coretify_dev", to: "sync_meeting" },
    { from: "webhook_task", to: "deadline_decision" },
  ];

  const getNodeColor = (type: Node["type"], isActive = false) => {
    switch (type) {
      case "client":
        return isActive ? "fill-emerald-500 stroke-emerald-300" : "fill-emerald-950/80 stroke-emerald-800/60";
      case "project":
        return isActive ? "fill-blue-500 stroke-blue-300" : "fill-blue-950/80 stroke-blue-800/60";
      case "decision":
        return isActive ? "fill-amber-500 stroke-amber-300" : "fill-amber-950/80 stroke-amber-800/60";
      case "task":
        return isActive ? "fill-purple-500 stroke-purple-300" : "fill-purple-950/80 stroke-purple-800/60";
      case "source":
        return isActive ? "fill-zinc-450 stroke-white" : "fill-zinc-900 stroke-zinc-800";
    }
  };

  const getBadgeIcon = (type: Node["type"]) => {
    switch (type) {
      case "client":
        return <User className="h-4 w-4 text-emerald-400" />;
      case "project":
        return <Network className="h-4 w-4 text-blue-400" />;
      case "decision":
        return <AlertCircle className="h-4 w-4 text-amber-400" />;
      case "task":
        return <CheckCircle2 className="h-4 w-4 text-purple-400" />;
      case "source":
        return <Calendar className="h-4 w-4 text-zinc-400" />;
    }
  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title="Memory Graph" />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6 w-full">
            
            {/* Header Title aligned with other dashboard pages */}
            <div className="flex items-center justify-between border-b pb-3.5">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
                  <Network className="h-5.5 w-5.5 text-purple-400" /> Memory View
                </h1>
                <p className="text-sm text-muted-foreground">
                  Visualisasi hubungan entitas bisnis yang diekstrak dari seluruh email, dokumen, dan chat WhatsApp.
                </p>
              </div>
              <Badge variant="outline" className="px-3 py-1 text-muted-foreground text-xs">
                5 Entities · Playbook {playbook}
              </Badge>
            </div>

            {/* Graph Canvas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
              {/* SVG Graph Drawing panel using Coretify signature card styles */}
              <div className="lg:col-span-8 relative overflow-hidden min-h-[420px] flex items-center justify-center rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.015)_0%,transparent_75%)] pointer-events-none" />

                <svg className="w-full h-full min-w-[650px] min-h-[380px]">
                  {/* Draw Edges */}
                  {edges.map((edge, i) => {
                    const fromNode = nodes.find((n) => n.id === edge.from);
                    const toNode = nodes.find((n) => n.id === edge.to);
                    if (!fromNode || !toNode) return null;

                    const isHighlighted =
                      selectedNode?.id === edge.from ||
                      selectedNode?.id === edge.to ||
                      hoveredNode === edge.from ||
                      hoveredNode === edge.to;

                    return (
                      <line
                        key={i}
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        className={`transition-all duration-300 stroke-[1.5px] ${
                          isHighlighted ? "stroke-purple-500 opacity-90 stroke-[2px]" : "stroke-zinc-800 opacity-50"
                        }`}
                      />
                    );
                  })}

                  {/* Draw Nodes */}
                  {nodes.map((node) => {
                    const isSelected = selectedNode?.id === node.id;
                    const isHovered = hoveredNode === node.id;

                    return (
                      <g
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer group"
                      >
                        {/* Outer Glow halo */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isSelected || isHovered ? 26 : 22}
                          className={`transition-all duration-300 fill-transparent stroke-[1.5px] ${
                            isSelected
                              ? "stroke-purple-400 opacity-100"
                              : isHovered
                              ? "stroke-zinc-700 opacity-80"
                              : "stroke-transparent opacity-0"
                          }`}
                        />

                        {/* Main Node Circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={18}
                          className={`transition-all duration-200 stroke-[2px] ${getNodeColor(
                            node.type,
                            isSelected || isHovered
                          )}`}
                        />

                        {/* Mini Indicator */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={4}
                          className="fill-white opacity-85"
                        />

                        {/* Node Label (Standard Case Plus Jakarta Sans) */}
                        <text
                          x={node.x}
                          y={node.y + 36}
                          textAnchor="middle"
                          className={`font-sans text-[11px] font-medium tracking-wide transition-all duration-200 ${
                            isSelected ? "fill-foreground font-semibold" : "fill-muted-foreground group-hover:fill-foreground"
                          }`}
                        >
                          {node.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Helper legend (Clean regular-case standard font) */}
                <div className="absolute bottom-4 left-4 flex gap-3.5 text-[10px] text-muted-foreground border border-zinc-850 bg-zinc-950 px-3.5 py-2 rounded-xl">
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Klien</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Proyek</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Keputusan</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-purple-500" /> Tugas</span>
                </div>
              </div>

              {/* Sliding Detail Drawer Panel */}
              <div className="lg:col-span-4 flex flex-col h-full min-h-[420px]">
                <AnimatePresence mode="wait">
                  {selectedNode ? (
                    <motion.div
                      key={selectedNode.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-5 h-full flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="h-9 w-9 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center shadow-sm">
                              {getBadgeIcon(selectedNode.type)}
                            </div>
                            <div>
                              <span className="text-[10px] font-semibold text-muted-foreground">
                                {selectedNode.type} Entity
                              </span>
                              <h3 className="text-sm font-semibold text-foreground leading-none mt-1">
                                {selectedNode.label}
                              </h3>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => setSelectedNode(null)}
                            variant="ghost"
                            size="icon-xs"
                            className="text-muted-foreground hover:text-foreground h-7 w-7 rounded-lg"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="h-px bg-white/[0.04]" />

                        <div className="space-y-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                              Deskripsi Konteks
                            </p>
                            <p className="text-xs text-foreground leading-relaxed font-light">
                              {selectedNode.details.desc}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                              Metrik / Status Detail
                            </p>
                            <p className="text-xs text-muted-foreground font-light">
                              {selectedNode.details.extra}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 mt-6">
                        <div className="h-px bg-white/[0.04]" />
                        <div className="flex items-center justify-between text-xs text-muted-foreground py-0.5">
                          <span className="flex items-center gap-1.5 font-light">
                            <Database className="h-3.5 w-3.5" /> Source: {selectedNode.details.source}
                          </span>
                          <span className="flex items-center gap-1.5 font-light">
                            <Clock className="h-3.5 w-3.5" /> {selectedNode.details.date}
                          </span>
                        </div>
                        <a href="/dashboard/ask" className="w-full inline-block">
                          <Button
                            variant="outline"
                            size="lg"
                            className="w-full flex items-center justify-center gap-1.5 cursor-pointer h-9 text-xs"
                          >
                            Ask AI About This Entity <Search className="h-3.5 w-3.5" />
                          </Button>
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-6 rounded-xl border border-dashed border-white/[0.06] bg-[#0c0c0e]/10 h-full flex flex-col items-center justify-center text-center py-20">
                      <Database className="h-8 w-8 text-zinc-650 mb-3" />
                      <h4 className="text-sm font-semibold text-muted-foreground">Pilih Entitas Graf</h4>
                      <p className="text-xs text-zinc-550 mt-1 max-w-[200px] leading-relaxed font-light">
                        Klik salah satu lingkaran node pada grafik di sebelah kiri untuk melihat deskripsi, hubungan relasi, dan rujukan dokumen asal.
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Info bar using Coretify signature card styles */}
            <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[rgba(255,255,255,0.05)] via-[rgba(255,255,255,0.02)] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm p-4 flex items-center gap-3 mt-2">
              <Cpu className="h-5.5 w-5.5 text-purple-400 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed font-light">
                <strong>Cara Kerja Entity Extraction:</strong> AI memindai semua data stream untuk mengenali kata benda terstruktur (Nama Klien, Nama Project) dan menganalisis kesimpulan koordinasi (Keputusan, Agenda Kerja). Model relasi di-update berkala setiap sinkronisasi baru selesai.
              </p>
            </div>

          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
