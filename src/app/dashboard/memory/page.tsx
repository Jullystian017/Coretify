"use client";

import { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
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

  // Standard static nodes layout for premium look
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
        return isActive ? "fill-emerald-500 stroke-emerald-300" : "fill-emerald-950/80 stroke-emerald-555";
      case "project":
        return isActive ? "fill-blue-500 stroke-blue-300" : "fill-blue-950/80 stroke-blue-555";
      case "decision":
        return isActive ? "fill-amber-500 stroke-amber-300" : "fill-amber-950/80 stroke-amber-555";
      case "task":
        return isActive ? "fill-purple-500 stroke-purple-300" : "fill-purple-950/80 stroke-purple-555";
      case "source":
        return isActive ? "fill-zinc-450 stroke-white" : "fill-zinc-900 stroke-zinc-800";
    }
  };

  const getBadgeIcon = (type: Node["type"]) => {
    switch (type) {
      case "client":
        return <User className="h-4.5 w-4.5 text-emerald-400" />;
      case "project":
        return <Network className="h-4.5 w-4.5 text-blue-400" />;
      case "decision":
        return <AlertCircle className="h-4.5 w-4.5 text-amber-400" />;
      case "task":
        return <CheckCircle2 className="h-4.5 w-4.5 text-purple-400" />;
      case "source":
        return <Calendar className="h-4.5 w-4.5 text-zinc-400" />;
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
      <SidebarInset className="bg-[#070708] text-zinc-150 relative overflow-hidden flex flex-col h-screen">
        <SiteHeader />

        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3 shrink-0">
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Network className="h-5 w-5 text-purple-400 animate-pulse" /> Memory View
              </h1>
              <p className="text-xs text-zinc-500">
                Visualisasi hubungan entitas bisnis yang diekstrak dari seluruh email, dokumen, dan chat WA.
              </p>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-850">
              5 Entities · Playbook {playbook}
            </div>
          </div>

          {/* Graph View area */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 overflow-hidden relative">
            {/* SVG Graph Drawing panel */}
            <div className="lg:col-span-8 bg-[#0c0c0e]/80 border border-zinc-900 rounded-2xl relative overflow-hidden min-h-[360px] flex items-center justify-center">
              {/* Radial gradient background behind graph */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.02)_0%,transparent_70%)] pointer-events-none" />

              <svg className="w-full h-full min-w-[650px] min-h-[350px]">
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
                      {/* Outer Glow / Halo ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected || isHovered ? 26 : 22}
                        className={`transition-all duration-300 fill-transparent stroke-[1.5px] ${
                          isSelected
                            ? "stroke-purple-400 opacity-100"
                            : isHovered
                            ? "stroke-zinc-650 opacity-80"
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

                      {/* Mini Icon indicator in node */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={4}
                        className="fill-white opacity-85"
                      />

                      {/* Node Label Text */}
                      <text
                        x={node.x}
                        y={node.y + 36}
                        textAnchor="middle"
                        className={`font-sans text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                          isSelected ? "fill-white font-bold" : "fill-zinc-450 group-hover:fill-zinc-200"
                        }`}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Helper legend */}
              <div className="absolute bottom-4 left-4 flex gap-3 text-[9px] font-mono uppercase tracking-wider text-zinc-550 border border-zinc-850 bg-zinc-950/80 px-3 py-2 rounded-xl">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Klien</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Proyek</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Keputusan</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-purple-500" /> Tugas</span>
              </div>
            </div>

            {/* Sliding Detail Drawer Panel */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <AnimatePresence mode="wait">
                {selectedNode ? (
                  <motion.div
                    key={selectedNode.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-5 rounded-2xl border border-zinc-850 bg-[#0c0c0e] h-full flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8.5 w-8.5 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center">
                            {getBadgeIcon(selectedNode.type)}
                          </div>
                          <div>
                            <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                              {selectedNode.type} Entity
                            </span>
                            <h3 className="text-[13px] font-bold text-white leading-none">
                              {selectedNode.label}
                            </h3>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedNode(null)}
                          className="h-6 w-6 rounded-md hover:bg-zinc-900 border border-zinc-850 flex items-center justify-center text-zinc-500 hover:text-zinc-300"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="h-px bg-zinc-900" />

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                            Deskripsi Konteks
                          </p>
                          <p className="text-[12px] text-zinc-350 leading-relaxed font-sans">
                            {selectedNode.details.desc}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                            Metrik / Status Detail
                          </p>
                          <p className="text-[11px] text-zinc-400 font-mono">
                            {selectedNode.details.extra}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="h-px bg-zinc-900" />
                      <div className="flex items-center justify-between text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1 font-mono">
                          <Database className="h-3 w-3" /> Source: {selectedNode.details.source}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3" /> {selectedNode.details.date}
                        </span>
                      </div>
                      <a
                        href="/dashboard/ask"
                        className="w-full h-10 flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 font-semibold text-xs rounded-xl transition-all"
                      >
                        Ask AI About This Entity <Search className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-6 rounded-2xl border border-dashed border-zinc-900 bg-transparent h-full flex flex-col items-center justify-center text-center">
                    <Database className="h-9 w-9 text-zinc-700 mb-3 animate-pulse" />
                    <h4 className="text-xs font-bold text-zinc-500">Pilih Entitas Graf</h4>
                    <p className="text-[10px] text-zinc-650 mt-1 max-w-[180px] leading-relaxed">
                      Klik salah satu lingkaran node pada grafik di sebelah kiri untuk melihat deskripsi, hubungan relasi, dan rujukan dokumen asal.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Info bar */}
          <div className="p-4 rounded-xl border border-zinc-850/60 bg-zinc-950/60 flex items-center gap-3 shrink-0">
            <Cpu className="h-5 w-5 text-purple-400 shrink-0" />
            <p className="text-[11px] text-zinc-450 leading-normal">
              **Cara Kerja Entity Extraction:** AI memindai semua data stream untuk mengenali kata benda terstruktur (Nama Klien, Nama Project) dan menganalisis kesimpulan koordinasi (Keputusan, Agenda Kerja). Model relasi di-update berkala setiap sinkronisasi baru selesai.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
