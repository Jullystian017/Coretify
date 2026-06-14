"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollRevealAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      
      // Calculate how much we can scroll past the container, accounting for the 80px sticky navbar offset.
      const stickyHeight = viewHeight - 80;
      const totalScrollable = rect.height - stickyHeight;
      const scrolled = 80 - rect.top;
      
      const currentProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const lines = [
    "Every company creates knowledge.",
    "But most of it gets lost.",
    "We're building an AI Business Brain.",
    "This is Coretify."
  ];

  // Pre-calculate words and global indices cleanly to avoid side-effects in render
  const allWords = lines.map((line) => line.split(" "));
  const flatWords = allWords.flat();
  const totalWords = flatWords.length;

  const linesWithGlobalIndices = allWords.map((words, lineIdx) => {
    const offset = allWords.slice(0, lineIdx).reduce((acc, currentLine) => acc + currentLine.length, 0);
    return words.map((word, wordIdx) => ({
      word,
      globalIdx: offset + wordIdx
    }));
  });

  // Calculate scroll reveal progress for the last line ("This is Coretify.") to power the spotlight.
  const lastLineStartIdx = linesWithGlobalIndices[3][0].globalIdx;
  const lastLineStart = lastLineStartIdx / totalWords;
  const lastLineEnd = 1.0;
  let lastLineProgress = 0;
  if (progress > lastLineStart) {
    lastLineProgress = Math.min(1, (progress - lastLineStart) / (lastLineEnd - lastLineStart));
  }

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full">
      {/* Sticky container positioned exactly below the 80px tall sticky navbar */}
      <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center overflow-hidden bg-[#070708]">
        
        {/* Aesthetic Background Grid & Glows */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Central Glowing Backlights (Illuminates the grid from behind) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[850px] rounded-full bg-indigo-500/12 blur-[130px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[650px] rounded-full bg-purple-500/8 blur-[110px] mix-blend-screen" />
          
          {/* Outer Aurora Glows for depth */}
          <div className="absolute top-[10%] left-[5%] h-[400px] w-[500px] rounded-full bg-indigo-600/5 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[10%] right-[5%] h-[400px] w-[500px] rounded-full bg-purple-600/5 blur-[120px] mix-blend-screen" />
          
          {/* Highly Visible Grid/Dot motif */}
          <div 
            className="absolute inset-0 opacity-75"
            style={{
              backgroundImage: `
                radial-gradient(rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px),
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px, 128px 128px, 128px 128px",
              backgroundPosition: "center center",
            }}
          />
          {/* Vignette fade to solid bg at edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070708_95%)]" />
          
          {/* Central Radial Light Overlay (Make center lines/dots glow) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,transparent_60%)]" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 max-w-5xl px-6 md:px-12 w-full text-center">

          <div className="flex flex-col gap-3 md:gap-4 font-sans">
            {linesWithGlobalIndices.map((words, lineIdx) => {
              return (
                <div 
                  key={lineIdx} 
                  className="flex flex-wrap justify-center text-2xl sm:text-3xl md:text-[42px] lg:text-[46px] font-semibold leading-[1.1] tracking-tight text-center"
                >
                  {words.map(({ word, globalIdx }, wordIdx) => {
                    // Seq word highlights
                    const start = globalIdx / totalWords;
                    const end = Math.min(1, (globalIdx + 1.8) / totalWords);
                    
                    let wordProgress = 0;
                    if (progress > start) {
                      wordProgress = (progress - start) / (end - start);
                      if (wordProgress > 1) wordProgress = 1;
                    }

                    // All text now uses the same white-zinc gradient reveal
                    const revealedClass = "bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent";

                    return (
                      <span key={wordIdx} className="relative inline-block mx-[0.14em] my-[0.03em] select-none">
                        {/* Base dim text */}
                        <span className="text-white/15 transition-colors duration-300">
                          {word}
                        </span>
                        {/* Overlaid bright/gradient text revealed by scrolling */}
                        <span 
                          className={`absolute inset-0 pointer-events-none text-center ${revealedClass}`}
                          style={{ 
                            opacity: wordProgress,
                            transform: `scale(${0.98 + wordProgress * 0.02})`,
                            transition: "transform 0.15s ease-out, opacity 0.07s linear"
                          }}
                        >
                          {word}
                        </span>
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
