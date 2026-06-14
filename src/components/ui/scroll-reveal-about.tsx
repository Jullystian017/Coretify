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

  return (
    <div ref={containerRef} className="relative h-[250vh] w-full">
      {/* Sticky container positioned exactly below the 80px tall sticky navbar */}
      <div className="sticky top-[80px] h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center overflow-hidden bg-[#070708]">
        
        {/* Aesthetic Background Grid & Glows */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* Radial Aurora Glows */}
          <div className="absolute top-[20%] left-[10%] -translate-y-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full bg-purple-500/10 blur-[130px] mix-blend-screen opacity-70" />
          <div className="absolute bottom-[20%] right-[10%] translate-y-1/2 translate-x-1/2 h-[500px] w-[700px] rounded-full bg-blue-500/10 blur-[130px] mix-blend-screen opacity-70" />
          
          {/* Grid motif */}
          <div 
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
              backgroundPosition: "center center",
            }}
          />
          {/* Vignette fade to solid bg at edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#070708_95%)]" />
        </div>

        {/* Text Content */}
        <div className="relative z-10 max-w-4xl px-6 md:px-12 w-full text-center">
          <div className="flex flex-col gap-6 md:gap-8 font-sans">
            {linesWithGlobalIndices.map((words, lineIdx) => {
              return (
                <div 
                  key={lineIdx} 
                  className="flex flex-wrap justify-center text-3xl sm:text-4xl md:text-[52px] font-semibold leading-[1.15] tracking-tight text-center"
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

                    const isLastLine = lineIdx === 3;
                    const revealedClass = isLastLine
                      ? "bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent font-bold drop-shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                      : "bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent";

                    return (
                      <span key={wordIdx} className="relative inline-block mx-[0.16em] my-[0.05em] select-none">
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
