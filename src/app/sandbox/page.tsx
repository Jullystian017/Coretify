"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Check,
  Building,
  Calendar,
  AlertCircle,
  FileText,
  User,
  ShieldCheck,
  Send,
} from "lucide-react";

interface Entity {
  type: "client" | "project" | "decision" | "task";
  name: string;
  desc: string;
}

export default function SandboxPage() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasProcessed, setHasProcessed] = useState(false);
  
  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [isChatTyping, setIsChatTyping] = useState(false);

  // Default sample content
  const loadSampleData = () => {
    setInputText(
      `[13:45, 20/6/2026] Owner Julian: Guys, client Nexa Corp tadi call. Mereka minta project Coretify Dev diselesaikan akhir bulan depan.
[13:46, 20/6/2026] PM Alex: Waduh, timeline asli kan sampai Agustus. Oke, deadline Coretify Dev kita undur/majukan ke 25 Juli ya. Keputusan disepakati.
[13:48, 20/6/2026] Owner Julian: Alex, tolong buat endpoint webhook Fonnte besok pagi biar bisa langsung test WA bot.
[13:49, 20/6/2026] PM Alex: Siap, segera saya kerjakan dan setup.`
    );
  };

  // Mock extracted entities
  const mockEntities: Entity[] = [
    { type: "client", name: "Nexa Corp", desc: "Klien utama yang meminta percepatan timeline proyek." },
    { type: "project", name: "Coretify Dev", desc: "Proyek pengembangan AI Memory Hub." },
    { type: "decision", name: "Deadline Coretify Dev disepakati maju ke 25 Juli 2026.", desc: "Disepakati oleh Julian (Owner) dan Alex (PM) via WhatsApp chat." },
    { type: "task", name: "Alex: Setup & coding endpoint webhook Fonnte (Deadline: Besok pagi)", desc: "Ditugaskan langsung oleh Owner Julian." },
  ];

  const handleProcess = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasProcessed(true);
      setChatMessages([
        {
          sender: "ai",
          text: "Otak Kedua Sandbox Anda sudah terbentuk dari data yang ditempel! Silakan ajukan pertanyaan di chat box bawah tentang detail percakapan tersebut.",
        },
      ]);
    }, 2000);
  };

  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    setChatMessages((prev) => [...prev, { sender: "user", text }]);
    setChatInput("");
    setIsChatTyping(true);

    setTimeout(() => {
      setIsChatTyping(false);
      let answer = "";
      
      const lowercaseQuery = text.toLowerCase();
      if (lowercaseQuery.includes("deadline") || lowercaseQuery.includes("undur") || lowercaseQuery.includes("maju")) {
        answer = "Berdasarkan chat WhatsApp yang ditempel, deadline untuk project **Coretify Dev** disepakati maju menjadi **25 Juli 2026** (sebelumnya Agustus) atas permintaan klien *Nexa Corp*.\n\n*Sumber: WhatsApp Chat (Baris 2)*";
      } else if (lowercaseQuery.includes("alex") || lowercaseQuery.includes("tugas") || lowercaseQuery.includes("webhook")) {
        answer = "Tugas untuk Alex adalah **membuat & setup endpoint webhook Fonnte** yang harus diselesaikan **besok pagi** agar bot WhatsApp bisa dites.\n\n*Sumber: WhatsApp Chat (Baris 3-4)*";
      } else if (lowercaseQuery.includes("client") || lowercaseQuery.includes("klien") || lowercaseQuery.includes("nexa")) {
        answer = "Client yang terdeteksi dalam percakapan adalah **Nexa Corp**. Mereka sempat menelpon Owner Julian untuk meminta percepatan timeline proyek.\n\n*Sumber: WhatsApp Chat (Baris 1)*";
      } else {
        answer = "Maaf, dari data Sandbox yang Anda tempel, saya tidak menemukan jawaban spesifik untuk pertanyaan itu. Coba tanyakan tentang 'deadline Coretify', 'tugas Alex', atau 'siapa kliennya'.";
      }

      setChatMessages((prev) => [...prev, { sender: "ai", text: answer }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 font-sans antialiased relative">
      {/* Background Glows */}
      <div className="pointer-events-none fixed top-0 left-0 w-[50vw] h-[50vw] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[45vw] h-[45vw] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)", filter: "blur(90px)" }} />

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-[#070708]/80 backdrop-blur-md border-b border-white/[0.02]">
        <div className="max-w-5xl mx-auto px-8 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <img src="/coretify.png" alt="Coretify" className="h-8 w-auto object-contain" />
            <span className="text-[19px] font-semibold tracking-tight text-white">Coretify</span>
            <span className="ml-2.5 px-2 py-0.5 rounded-full border border-purple-500/20 bg-purple-950/20 text-[9px] font-bold text-purple-400 uppercase tracking-wider">
              Sandbox Tryout
            </span>
          </div>
          <button
            onClick={() => router.push("/connect")}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-450 hover:text-white transition-colors"
          >
            Lewati Demo <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header Description */}
          <div className="text-center space-y-2.5">
            <h1 className="text-3xl font-semibold tracking-tight text-white leading-tight">
              Rasakan Otak Kedua Bisnis Anda.
            </h1>
            <p className="text-zinc-400 text-[13.5px] max-w-md mx-auto leading-relaxed">
              Tempel chat koordinasi tim Anda di bawah ini. AI kami akan mengekstrak entitas penting dan membangun memori instan untuk ditanya.
            </p>
          </div>

          {/* Paste Container */}
          <div className="p-5 rounded-2xl border border-zinc-800/60 bg-[#0c0c0e]/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-zinc-500">
                Pasted Chat / Document Input
              </span>
              <button
                onClick={loadSampleData}
                className="text-[10px] font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Gunakan Contoh Chat (WhatsApp)
              </button>
            </div>

            <textarea
              className="w-full min-h-[140px] p-4 bg-[#070708] border border-zinc-850 focus:border-zinc-750 focus:outline-none rounded-xl text-[12.5px] font-mono leading-relaxed placeholder:text-zinc-700 text-zinc-300 transition-all resize-none"
              placeholder="Tempel transkrip obrolan, email, atau catatan rapat di sini..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <div className="flex items-center justify-end">
              <button
                onClick={handleProcess}
                disabled={isProcessing || !inputText.trim()}
                className="h-10 px-5 flex items-center gap-2 bg-white hover:bg-zinc-200 text-black font-semibold text-xs rounded-xl disabled:opacity-20 transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)]"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    Memproses Memori AI...
                  </>
                ) : (
                  <>
                    Proses Memory <Sparkles className="h-3.5 w-3.5 text-purple-600 fill-purple-600" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Dashboard */}
          <AnimatePresence>
            {hasProcessed && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Entities extracted grid */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-500">
                    1. Entitas Memory Terekstrak
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {mockEntities.map((ent, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-zinc-850/60 bg-zinc-950/40 space-y-1.5 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-white">{ent.name}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            ent.type === "client"
                              ? "text-emerald-400 border-emerald-500/20 bg-emerald-950/20"
                              : ent.type === "project"
                              ? "text-blue-400 border-blue-500/20 bg-blue-950/20"
                              : ent.type === "decision"
                              ? "text-amber-400 border-amber-500/20 bg-amber-950/20"
                              : "text-purple-400 border-purple-500/20 bg-purple-950/20"
                          }`}>
                            {ent.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-450 leading-relaxed">{ent.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ask Sandbox Chatbox */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-zinc-500">
                    2. Coba Tanya Memory (RAG Search)
                  </h3>
                  <div className="border border-zinc-850 rounded-2xl bg-[#0c0c0e] overflow-hidden flex flex-col min-h-[260px] justify-between">
                    {/* Presets */}
                    <div className="p-3 bg-zinc-950/80 border-b border-zinc-850/60 flex flex-wrap gap-1.5">
                      <button
                        onClick={() => handleSendChat("Siapa yang memutuskan mengundur deadline Coretify?")}
                        className="text-[10px] text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        ⏱️ Siapa pembuat keputusan deadline?
                      </button>
                      <button
                        onClick={() => handleSendChat("Apa tugas Alex besok pagi?")}
                        className="text-[10px] text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        📝 Apa tugas Alex besok?
                      </button>
                      <button
                        onClick={() => handleSendChat("Siapa klien Nexa Corp?")}
                        className="text-[10px] text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-850 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        👥 Detail klien Nexa Corp
                      </button>
                    </div>

                    {/* Messages list */}
                    <div className="p-4 flex-1 space-y-4 text-[12.5px] leading-relaxed max-h-[220px] overflow-y-auto">
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                          <div className={`p-3 rounded-xl max-w-[85%] whitespace-pre-line ${
                            msg.sender === "user" ? "bg-zinc-800 text-white rounded-tr-none" : "bg-zinc-950 border border-zinc-850 text-zinc-300 rounded-tl-none"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      {isChatTyping && (
                        <div className="flex justify-start">
                          <div className="bg-zinc-950 border border-zinc-850 text-zinc-450 rounded-xl rounded-tl-none p-3 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 border-t border-zinc-850 bg-zinc-950/40 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Tanya detail tentang chat yang ditempel..."
                        className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-[12.5px] placeholder:text-zinc-700 text-zinc-350"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                      />
                      <button
                        onClick={() => handleSendChat()}
                        className="h-8 w-8 rounded-lg bg-white hover:bg-zinc-200 text-black flex items-center justify-center transition-all shrink-0"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Conversion Callout */}
                <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-950/20 to-zinc-950 p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 mt-10">
                  <div className="space-y-1">
                    <h4 className="text-[13.5px] font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-purple-400 fill-purple-400" />
                      Bagus kan? Ini Baru 1% Dari Kekuatan Coretify.
                    </h4>
                    <p className="text-[11.5px] text-zinc-450 leading-relaxed max-w-lg">
                      Hubungkan Google Workspace (Gmail, Calendar, Drive) dan WhatsApp bisnis asli Anda secara aman untuk terus melacak timeline, keputusan, dan risiko secara real-time dan otomatis.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/connect")}
                    className="h-10 px-5 flex items-center gap-2 bg-white hover:bg-zinc-100 text-black font-semibold text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.08)] whitespace-nowrap"
                  >
                    Hubungkan Data Source <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
