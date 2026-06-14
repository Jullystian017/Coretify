"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  ArrowRight,
  Bot,
  User,
  Check
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  options?: string[] | { label: string; value: string }[];
  multipleSelect?: boolean;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState(1);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  // Accumulated data
  const [companyName, setCompanyName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [toolsUsed, setToolsUsed] = useState<string[]>([]);
  const [painPoints, setPainPoints] = useState<string[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial bot message
  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => {
      setMessages([
        {
          id: "1",
          sender: "bot",
          text: "Halo! Selamat datang di Coretify. Saya adalah AI Memory Manager yang akan membantu menyatukan seluruh memori bisnismu.\n\nMari kita mulai dengan perkenalan singkat. Siapa nama Anda dan apa nama perusahaan/bisnis Anda?",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() && selectedOptions.length === 0) return;

    let finalUserText = text;
    if (selectedOptions.length > 0) {
      finalUserText = selectedOptions.join(", ");
    }

    // Add user message
    const userMsgId = Date.now().toString();
    const newMessages = [
      ...messages,
      {
        id: userMsgId,
        sender: "user",
        text: finalUserText,
        timestamp: new Date(),
      } as Message,
    ];
    setMessages(newMessages);
    setInputText("");
    setSelectedOptions([]);
    setIsTyping(true);

    // AI logic response based on current step
    setTimeout(() => {
      let responseText = "";
      let nextOptions: any = undefined;
      let nextStep = step + 1;

      if (step === 1) {
        setCompanyName(text);
        responseText = `Senang bertemu dengan Anda! ${text} terdengar seperti bisnis yang menarik.\n\nSelanjutnya, apa jenis/vertical bisnis Anda? Ini akan menentukan **Vertical Playbook** yang kami gunakan untuk menganalisis data Anda secara spesifik.`;
        nextOptions = [
          { label: "🏢 Software House (Tech/Dev)", value: "Software House" },
          { label: "🎨 Creative Agency (Design/Marketing)", value: "Agency" },
          { label: "🚀 Startup (Tech Product)", value: "Startup" },
          { label: "💼 Professional Consultant / Legal / HR", value: "Consultant" },
          { label: "📦 Lainnya / Retail / Dagang", value: "Lainnya" }
        ];
      } else if (step === 2) {
        const selectedVal = text;
        setBusinessType(selectedVal);
        responseText = `Pilihan bagus. Playbook **${selectedVal}** akan diaktifkan untuk menyesuaikan deteksi risiko dan insight operasional.\n\nBerapa jumlah anggota tim di perusahaan Anda?`;
        nextOptions = [
          { label: "👥 1 - 10 orang (Tim Kecil/Butik)", value: "1-10" },
          { label: "🏢 10 - 50 orang (Berkembang)", value: "10-50" },
          { label: "🏛️ 50+ orang (Skala Menengah/Besar)", value: "50+" }
        ];
      } else if (step === 3) {
        setTeamSize(text);
        responseText = "Paham. Mari kita petakan data source Anda. Tools apa saja yang digunakan tim Anda sehari-hari? (Bisa pilih lebih dari satu, lalu klik Kirim)";
        nextOptions = [
          { label: "📧 Gmail (Email Komunikasi)", value: "Gmail" },
          { label: "📅 Google Calendar (Jadwal Meeting)", value: "Calendar" },
          { label: "💾 Google Drive / Sheets (Dokumen)", value: "Drive" },
          { label: "💬 WhatsApp Chat (Komunikasi Internal/Client)", value: "WhatsApp" },
          { label: "📊 CSV/Excel (Bookkeeping/Keuangan)", value: "CSV" }
        ];
      } else if (step === 4) {
        const tools = selectedOptions.length > 0 ? selectedOptions : [text];
        setToolsUsed(tools);
        responseText = "Luar biasa. Tools ini akan terhubung sebagai memory source. Pertanyaan terakhir:\n\nApa pain point atau tantangan terbesar bisnis yang ingin Anda selesaikan lewat Company Memory ini? (Bisa pilih lebih dari satu)";
        nextOptions = [
          { label: "⚠️ Project sering terlambat / Missed deadline", value: "Project terlambat" },
          { label: "🧠 Knowledge hilang saat tim resign / Tersebar", value: "Knowledge loss" },
          { label: "📊 Sulit memantau performa & kapasitas tim", value: "Tim monitoring" },
          { label: "💬 Komunikasi client chaos / Revisi berlebihan", value: "Client chaos" },
          { label: "💵 Invoice & sales follow-up tidak terpantau", value: "Sales chaos" }
        ];
      } else if (step === 5) {
        const pains = selectedOptions.length > 0 ? selectedOptions : [text];
        setPainPoints(pains);
        
        // Save to localStorage
        const companyData = {
          name: companyName,
          businessType: businessType,
          teamSize: teamSize,
          toolsUsed: toolsUsed,
          painPoints: pains,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("coretify_company", JSON.stringify(companyData));

        responseText = `Konfigurasi selesai! 🎉\n\nKami telah menyiapkan playbook kustom untuk **${companyName}** (${businessType}) dengan fokus pada penyelesaian *${pains.join(", ")}*.\n\nSekarang, mari hubungkan data source Anda agar otak Coretify mulai memindai dan membangun Company Memory pertama Anda.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: "bot",
          text: responseText,
          timestamp: new Date(),
          options: nextOptions,
          multipleSelect: nextStep === 4 || nextStep === 5
        },
      ]);
      setStep(nextStep);
      setIsTyping(false);
    }, 1200);
  };

  const handleOptionClick = (optionValue: string, isMultiple: boolean) => {
    if (isMultiple) {
      if (selectedOptions.includes(optionValue)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== optionValue));
      } else {
        setSelectedOptions([...selectedOptions, optionValue]);
      }
    } else {
      handleSend(optionValue);
    }
  };

  const proceedToConnect = () => {
    router.push("/connect");
  };

  const progressPercent = Math.min((step / 6) * 100, 100);

  return (
    <div className="flex flex-col min-h-screen bg-[#070708] text-slate-100 selection:bg-purple-500/30">
      
      {/* Top Background radial gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-[1440px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="border-b border-slate-900 bg-[#070708]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-350">
              <Bot className="h-4.5 w-4.5" />
            </div>
            <span className="font-bold text-[15px] tracking-tight text-white">
              Coretify Setup
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            Step {Math.min(step, 5)} of 5
          </div>
        </div>

        {/* Progress Bar (Subtle white line progress) */}
        <div className="w-full h-[2px] bg-slate-900">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Conversation Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 flex flex-col justify-between">
        
        {/* Messages List */}
        <div className="flex-1 space-y-6 mb-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {/* Bot Avatar */}
              {msg.sender === "bot" && (
                <div className="h-8.5 w-8.5 rounded-lg bg-[#0c0c0e] border border-slate-900 flex items-center justify-center text-slate-450 shrink-0">
                  <Bot className="h-4.5 w-4.5" />
                </div>
              )}

              {/* Message Bubble */}
              <div className="flex flex-col gap-2.5 max-w-[85%]">
                <div
                  className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed border ${
                    msg.sender === "user"
                      ? "bg-[#18181b] border-slate-850 text-white rounded-tr-none self-end"
                      : "bg-[#0c0c0e]/80 border-slate-900 text-slate-300 rounded-tl-none backdrop-blur-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Render Interactive Options */}
                {msg.sender === "bot" && msg.options && (
                  <div className="mt-1 flex flex-wrap gap-2 animate-in fade-in duration-300 delay-75">
                    {msg.options.map((opt: any) => {
                      const value = typeof opt === "object" ? opt.value : opt;
                      const label = typeof opt === "object" ? opt.label : opt;
                      const isSelected = selectedOptions.includes(value);
                      const isMultiple = !!msg.multipleSelect;

                      return (
                        <button
                          key={value}
                          onClick={() => handleOptionClick(value, isMultiple)}
                          className={`text-xs px-3.5 py-2.5 rounded-xl border font-semibold transition-all ${
                            isSelected
                              ? "bg-white border-transparent text-black shadow-md scale-[1.01]"
                              : "bg-[#0c0c0e] border-slate-900 text-slate-300 hover:border-slate-800 hover:bg-[#121215] hover:text-white"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {isMultiple && isSelected && <Check className="h-3.5 w-3.5" />}
                            {label}
                          </span>
                        </button>
                      );
                    })}

                    {/* Show Kirim button for multiple selection */}
                    {msg.multipleSelect && (
                      <Button
                        size="sm"
                        onClick={() => handleSend()}
                        disabled={selectedOptions.length === 0}
                        className="bg-white hover:bg-slate-100 text-black rounded-xl font-semibold shadow border-0"
                      >
                        Kirim
                        <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.sender === "user" && (
                <div className="h-8.5 w-8.5 rounded-lg bg-[#18181b] border border-slate-850 flex items-center justify-center text-slate-300 shrink-0">
                  <User className="h-4.5 w-4.5" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-4">
              <div className="h-8.5 w-8.5 rounded-lg bg-[#0c0c0e] border border-slate-900 flex items-center justify-center text-slate-450 shrink-0">
                <Bot className="h-4.5 w-4.5" />
              </div>
              <div className="bg-[#0c0c0e]/80 border border-slate-900 rounded-2xl rounded-tl-none px-4 py-3 backdrop-blur-md flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {/* Complete Final Step Action */}
          {step > 5 && !isTyping && (
            <div className="flex justify-center pt-8 animate-in zoom-in-95 duration-500">
              <Card className="bg-[#0c0c0e] border border-slate-900 max-w-md w-full p-6 text-center backdrop-blur-md relative overflow-hidden shadow-xl">
                <div className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-300 mb-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2">Company Memory Siap Dibangun</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Playbook kustom telah dikonfigurasi berdasarkan vertical industri Anda. Langkah berikutnya adalah menyambungkan data source bisnis Anda.
                </p>
                <Button
                  onClick={proceedToConnect}
                  className="w-full bg-white hover:bg-slate-100 text-black font-semibold text-xs py-4.5 rounded-full shadow transition-all hover:scale-[1.01]"
                >
                  Hubungkan Data Source
                  <ArrowRight className="h-3.5 w-3.5 ml-2" />
                </Button>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Box Area (Only shown for active text inputs, i.e., step 1 or fallbacks) */}
        {step === 1 && !isTyping && (
          <div className="border-t border-slate-900 pt-4 bg-[#070708]/80 backdrop-blur-md sticky bottom-0">
            <div className="relative flex items-center bg-[#0c0c0e] border border-slate-900 rounded-xl focus-within:border-slate-800 transition-all p-1.5">
              <input
                type="text"
                placeholder="Ketik nama Anda & nama bisnis..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="flex-1 bg-transparent px-3 py-2 text-xs border-0 focus:outline-none focus:ring-0 text-white"
              />
              <Button
                size="sm"
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="bg-white hover:bg-slate-100 text-black font-semibold rounded-lg shadow px-4 py-2"
              >
                Kirim
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
