import { useEffect, useState } from "react";
import { Terminal, Play, CircleDot, CheckCircle, RefreshCcw } from "lucide-react";

interface TerminalLogProps {
  onRunSuccess?: () => void;
}

export default function TerminalLog({ onRunSuccess }: TerminalLogProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(100);

  const initialSequence = [
    "❯ init dinesh.dev --profile=fullstack",
    "⚙ Resolving package dependencies...",
    "✔ lucide-react-icons fetched in 12ms",
    "✔ framer-motion compiler initialized",
    "⚒ Preparing system metadata parameters...",
    "ℹ Profiling stats: [84 DSA solved] [17 live projects] [8+ companies]",
    "⬤ Compiling Applet core routes...",
    "✔ Index.html integrated with styled theme mappings",
    "✔ Client Hot-Module-Replacement linked successfully",
    "🚀 Server listening on host: 0.0.0.0, port: 3000",
    "✔ Live production build ready (100% stable)"
  ];

  useEffect(() => {
    // Show static complete logs at start
    setLogs(initialSequence);
  }, []);

  const triggerSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs(["❯ npx jest --verify-metrics"]);
    setProgress(0);

    const testSteps = [
      "⚙ Booting Jest Environment v29.7...",
      "⚡ Starting test suite covering: SystemDesign.spec.ts, Algorithms.spec.ts",
      "⏳ Checking database latency metrics [PgSQL & Redis Node]...",
      "✔ Connection Latency: 4ms - PASS",
      "📦 Benchmarking server throughput parameters...",
      "✔ Metrics: 54,200 req/sec at <12ms overhead - PASS",
      "🔍 Loading LeetCode analytics database...",
      "✔ Verified: 84 advanced DSA problems verified on LeetCode API - PASS",
      "☕ Compiling active production outputs in dist/...",
      "✔ Build size: 142.4 KB (optimized) - PASS",
      "🎉 SUMMARY: 12 tests passed, 0 failed. Uptime 99.99%. Ready for production deployment."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < testSteps.length) {
        setLogs(prev => [...prev, testSteps[currentStep]]);
        setProgress(Math.min(100, Math.floor(((currentStep + 1) / testSteps.length) * 100)));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        if (onRunSuccess) onRunSuccess();
      }
    }, 600);
  };

  return (
    <div id="developer-terminal" className="w-full bg-[#1A1A19]/95 text-[#A5C261] font-mono text-xs rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#242423] border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          <span className="text-zinc-400 text-xs ml-2 font-sans select-none flex items-center gap-1">
            <Terminal size={12} className="text-zinc-500" /> dinesh.dev — build.log
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-emerald-950 text-emerald-400 font-sans font-medium px-2 py-0.5 rounded-full flex items-center gap-1 select-none">
            <CircleDot size={8} className="animate-pulse" /> Live Status: OK
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-[240px] overflow-y-auto flex flex-col gap-1.5 scrollbar-thin scrollbar-thumb-zinc-700 select-all">
        {logs.map((log, index) => {
          let textClass = "text-zinc-300";
          if (log.startsWith("❯")) textClass = "text-white font-semibold";
          else if (log.startsWith("✔") || log.startsWith("🎉")) textClass = "text-emerald-400";
          else if (log.startsWith("⚙") || log.startsWith("⏳")) textClass = "text-zinc-400 animate-pulse";
          else if (log.startsWith("⚒") || log.startsWith("⚡")) textClass = "text-amber-400";
          else if (log.startsWith("ℹ")) textClass = "text-[#3D85C6]";

          return (
            <div key={index} className={`leading-relaxed whitespace-pre-wrap ${textClass}`}>
              {log}
            </div>
          );
        })}
        {isRunning && (
          <div className="text-emerald-500 flex items-center gap-1 mt-1">
            <span className="terminal-cursor">█</span> Running test runner...
          </div>
        )}
      </div>

      {/* Terminal Controls Bar */}
      <div className="px-4 py-3 bg-[#111110] border-t border-zinc-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={triggerSimulation}
            disabled={isRunning}
            className={`w-full sm:w-auto px-3.5 py-1.5 rounded text-[11px] font-sans font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
              isRunning
                ? "bg-zinc-800 text-zinc-500 border border-zinc-700"
                : "bg-[#719E37] text-white hover:bg-[#83B346] border border-[#83B346]/20 shadow"
            }`}
          >
            {isRunning ? (
              <>
                <RefreshCcw size={12} className="animate-spin" /> Verifying metrics...
              </>
            ) : (
              <>
                <Play size={12} fill="currentColor" /> Run Test Runner
              </>
            )}
          </button>
          
          <span className="text-[10px] text-zinc-500 hidden sm:inline select-none font-sans">
            Press to compile and verify all full-stack metrics.
          </span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 w-full sm:w-40">
          <div className="h-1.5 bg-zinc-800 rounded-full w-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-zinc-400 shrink-0 w-8 text-right select-none">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
