"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Layout,
  Layers,
  Trash2,
  Plus,
  RotateCcw,
  Palette,
  Zap,
  Check,
  Code2,
  Brush,
  ArrowRight,
  Monitor,
  Heart,
} from "lucide-react";

interface Shape {
  id: number;
  type: "circle" | "rect" | "triangle" | "star";
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function Home() {
  const [shapes, setShapes] = useState<Shape[]>([
    { id: 1, type: "circle", x: 120, y: 100, color: "#a855f7", size: 60 },
    { id: 2, type: "rect", x: 260, y: 80, color: "#ec4899", size: 70 },
    { id: 3, type: "triangle", x: 180, y: 190, color: "#3b82f6", size: 65 },
  ]);
  const [activeColor, setActiveColor] = useState("#a855f7");
  const [clickCount, setClickCount] = useState(0);

  const colors = [
    "#a855f7", // Violet
    "#ec4899", // Pink
    "#3b82f6", // Blue
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#ef4444", // Red
  ];

  const addShape = (type: "circle" | "rect" | "triangle" | "star") => {
    const newShape: Shape = {
      id: Date.now(),
      type,
      x: Math.floor(Math.random() * 260) + 40,
      y: Math.floor(Math.random() * 180) + 40,
      color: activeColor,
      size: Math.floor(Math.random() * 40) + 40,
    };
    setShapes([...shapes, newShape]);
    setClickCount((c) => c + 1);
  };

  const clearCanvas = () => {
    setShapes([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20">
              <Brush className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Coretify
            </span>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Next.js 16
            </Badge>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#" className="transition-colors hover:text-white">Features</a>
            <a href="#" className="transition-colors hover:text-white">Canvas</a>
            <a href="#" className="transition-colors hover:text-white">Components</a>
            <a href="#" className="transition-colors hover:text-white">Documentation</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden sm:inline-flex text-slate-400 hover:text-white")}
            >
              <svg className="h-4 w-4 mr-2 fill-current" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </a>
            <Button className="bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-md shadow-purple-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 mb-6 animate-pulse">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-300">
              Powered by Tailwind CSS v4 & Shadcn UI
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            Unleash Your Ideas on an{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent">
              Infinite Canvas
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Coretify combines the power of structured UI components with an interactive drawing sandbox. Bootstrapped with Next.js App Router, Tailwind v4, and Shadcn UI.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-500 text-white px-8 font-semibold shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.03]">
              Explore Components
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-200 hover:bg-slate-900 hover:text-white px-8 transition-all">
              Documentation
            </Button>
          </div>
        </div>

        {/* Features Showcase / Interactive Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Column 1: Interactive Sandbox */}
          <Card className="lg:col-span-7 bg-slate-900/30 border-slate-900 backdrop-blur-xl flex flex-col h-[520px] overflow-hidden">
            <CardHeader className="border-b border-slate-900/80 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                    <Layout className="h-5 w-5 text-purple-400" />
                    Interactive Drawing Canvas
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Interact with React state and SVG shapes in real-time.
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-slate-950/60 border-slate-800 text-slate-300">
                  {shapes.length} Shapes
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 bg-slate-950/40 relative flex items-center justify-center p-4">
              {/* Drawing Board Area */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
              
              {shapes.length === 0 ? (
                <div className="text-center z-10 p-6 flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 mb-3 border border-slate-800">
                    <Brush className="h-6 w-6" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Canvas is empty</p>
                  <p className="text-xs text-slate-600 mt-1">Click the shape buttons below to create custom drawings!</p>
                </div>
              ) : (
                <svg className="w-full h-full min-h-[280px] z-10 pointer-events-none">
                  {shapes.map((shape) => {
                    const style = { fill: shape.color, filter: "drop-shadow(0px 8px 16px rgba(0,0,0,0.45))" };
                    if (shape.type === "circle") {
                      return (
                        <circle
                          key={shape.id}
                          cx={shape.x}
                          cy={shape.y}
                          r={shape.size / 2}
                          style={style}
                        />
                      );
                    } else if (shape.type === "rect") {
                      return (
                        <rect
                          key={shape.id}
                          x={shape.x - shape.size / 2}
                          y={shape.y - shape.size / 2}
                          width={shape.size}
                          height={shape.size * 0.8}
                          rx={8}
                          style={style}
                        />
                      );
                    } else if (shape.type === "triangle") {
                      const half = shape.size / 2;
                      const points = `${shape.x},${shape.y - half} ${shape.x - half},${shape.y + half} ${shape.x + half},${shape.y + half}`;
                      return (
                        <polygon
                          key={shape.id}
                          points={points}
                          style={style}
                        />
                      );
                    } else if (shape.type === "star") {
                      // Simple diamond star representation
                      const half = shape.size / 2;
                      const points = `${shape.x},${shape.y - half} ${shape.x + half * 0.3},${shape.y - half * 0.3} ${shape.x + half},${shape.y} ${shape.x + half * 0.3},${shape.y + half * 0.3} ${shape.x},${shape.y + half} ${shape.x - half * 0.3},${shape.y + half * 0.3} ${shape.x - half},${shape.y} ${shape.x - half * 0.3},${shape.y - half * 0.3}`;
                      return (
                        <polygon
                          key={shape.id}
                          points={points}
                          style={style}
                        />
                      );
                    }
                    return null;
                  })}
                </svg>
              )}
            </CardContent>

            <CardFooter className="border-t border-slate-900/80 bg-slate-950/20 px-6 py-4 flex flex-col gap-4">
              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between w-full gap-4">
                {/* Shapes Palette */}
                <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
                  <Button size="xs" variant="ghost" className="text-xs hover:text-white" onClick={() => addShape("circle")}>
                    <Plus className="h-3.5 w-3.5" />
                    Circle
                  </Button>
                  <Button size="xs" variant="ghost" className="text-xs hover:text-white" onClick={() => addShape("rect")}>
                    <Plus className="h-3.5 w-3.5" />
                    Rect
                  </Button>
                  <Button size="xs" variant="ghost" className="text-xs hover:text-white" onClick={() => addShape("triangle")}>
                    <Plus className="h-3.5 w-3.5" />
                    Triangle
                  </Button>
                  <Button size="xs" variant="ghost" className="text-xs hover:text-white" onClick={() => addShape("star")}>
                    <Plus className="h-3.5 w-3.5" />
                    Star
                  </Button>
                </div>

                {/* Brush Colors */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Palette className="h-3.5 w-3.5" />
                    Palette:
                  </span>
                  <div className="flex items-center gap-1">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setActiveColor(color)}
                        className={`h-5 w-5 rounded-full border transition-all ${
                          activeColor === color
                            ? "border-white scale-110 ring-2 ring-purple-600/30"
                            : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <Button size="xs" variant="destructive" className="h-7" onClick={clearCanvas}>
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Column 2: Component Showcase */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Component Status Card */}
            <Card className="bg-slate-900/30 border-slate-900 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-pink-400" />
                  Shadcn Components UI
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Pre-installed and styled components ready for development.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Button Showcase */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Button Variants</h4>
                  <div className="flex flex-wrap gap-2.5">
                    <Button variant="default" size="sm">Default</Button>
                    <Button variant="secondary" size="sm">Secondary</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                    <Button variant="ghost" size="sm">Ghost</Button>
                    <Button variant="destructive" size="sm">Destructive</Button>
                  </div>
                </div>

                {/* Badge Showcase */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Badge Variants</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline" className="border-slate-800 text-slate-300 bg-slate-950/20">Outline</Badge>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                </div>

                {/* Stats / Interactive Logs */}
                <div className="rounded-lg bg-slate-950/60 border border-slate-900 p-4">
                  <div className="flex justify-between items-center text-xs mb-2 text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400/10" />
                      Session Events
                    </span>
                    <span className="font-mono text-purple-400">{clickCount} clicks</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px] text-slate-500">
                    <div>&gt; npx create-next-app@latest - SUCCESS</div>
                    <div>&gt; npx shadcn@latest init - SUCCESS</div>
                    <div>&gt; button, card, badge components initialized</div>
                    {clickCount > 0 && (
                      <div className="text-purple-300 font-semibold animate-pulse">
                        &gt; {clickCount} shape(s) spawned during preview
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quickstart Card */}
            <Card className="bg-slate-900/30 border-slate-900 backdrop-blur-xl flex-1 flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-400" />
                  Technical Stack Details
                </CardTitle>
                <CardDescription className="text-slate-400">
                  The architecture backing this setup.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-900/80">
                    <div className="text-slate-500 font-medium mb-1">Routing</div>
                    <div className="text-white font-semibold">App Router (v16)</div>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-900/80">
                    <div className="text-slate-500 font-medium mb-1">Styling</div>
                    <div className="text-white font-semibold">Tailwind CSS v4</div>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-900/80">
                    <div className="text-slate-500 font-medium mb-1">State Mgmt</div>
                    <div className="text-white font-semibold">React hooks</div>
                  </div>
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-900/80">
                    <div className="text-slate-500 font-medium mb-1">Base UI</div>
                    <div className="text-white font-semibold">@base-ui/react</div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-slate-900/80 bg-slate-950/20 px-6 py-4 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                  <Monitor className="h-3.5 w-3.5 text-slate-400" />
                  <span>Coretify Workspace ready</span>
                </div>
                <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                  <span>Explore configs</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </CardFooter>
            </Card>
          </div>
          
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500/10" />
            <span>using Next.js + Tailwind + Shadcn</span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} Coretify Inc. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
