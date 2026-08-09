import { motion } from "motion/react";

interface ProjectMockupProps {
  type: "phone" | "tablet" | "laptop" | "dual-phone";
  title: string;
  bgColor: string; // Background of parent container to coordinate contrasts
}

export default function ProjectMockup({ type, title, bgColor }: ProjectMockupProps) {
  // We'll render stunning wireframe components for each project
  const renderPhoneScreen = (projectTitle: string) => {
    if (projectTitle.toLowerCase().includes("traalo")) {
      return (
        <div className="w-full h-full bg-slate-900 text-white p-3 flex flex-col text-[10px] select-none font-sans justify-between">
          <div className="flex justify-between items-center border-b border-white/10 pb-1.5 shrink-0">
            <span className="font-semibold text-sky-400 font-display select-none">traalo.</span>
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping select-none" />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-1.5 mt-2 py-1 overflow-hidden">
            <div className="font-semibold text-[11px] leading-tight text-white font-display">Special Access Flight</div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-2 flex flex-col gap-1">
              <div className="flex justify-between font-mono text-[8px] text-zinc-400">
                <span>NEW DELHI (DEL)</span>
                <span>⟶</span>
                <span>ZURICH (ZRH)</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mt-1 select-none">
                <div className="h-full bg-sky-400 w-2/3" />
              </div>
              <div className="flex justify-between items-center text-[7px] text-zinc-400 mt-1 select-none">
                <span>ADA Wheelchair Reserved</span>
                <span className="text-emerald-400">Verified</span>
              </div>
            </div>
            
            <div className="bg-sky-500/10 border border-sky-450/20 rounded-lg p-2 text-[8px] flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold">ℹ</div>
              <div>
                <div className="font-semibold text-sky-300">Hub Support Hub</div>
                <div className="text-zinc-400">Terminal A Host assigned</div>
              </div>
            </div>
          </div>
          <div className="h-7 bg-zinc-850 border border-white/10 rounded-full flex items-center justify-between px-3 text-[8px] font-medium shrink-0">
            <span className="text-zinc-400">Scan Airport QR</span>
            <span className="text-sky-400">Open Pass</span>
          </div>
        </div>
      );
    }

    if (projectTitle.toLowerCase().includes("balanceify")) {
      return (
        <div className="w-full h-full bg-[#131A1F] text-white p-3 flex flex-col text-[10px] justify-between font-sans relative overflow-hidden">
          {/* Calming visual circles in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-teal-500/5 blur-xl pointer-events-none" />
          
          <div className="flex justify-between items-center shrink-0">
            <span className="font-medium text-teal-400 font-display text-[9px]">balanceify</span>
            <span className="text-zinc-500 text-[8px] font-mono">Streak: 12d</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-2">
            {/* Calming visual breathing circular waveform */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-teal-500/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border border-teal-400/30 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-teal-500/10 border border-teal-400/40 flex flex-col items-center justify-center text-center">
                <span className="text-[7px] text-teal-300 font-mono tracking-widest uppercase">Inhale</span>
                <span className="text-[14px] font-bold text-white font-display">4s</span>
              </div>
            </div>
            
            <p className="text-[8px] text-zinc-400 text-center max-w-44 leading-normal mt-1">
              Let's slow things down. Daily focus: Breathing Loop
            </p>
          </div>
          
          <div className="flex justify-around items-center h-8 bg-white/5 border border-white/10 rounded-xl shrink-0 text-[7px] text-zinc-400 select-none">
            <span className="text-teal-400 font-medium">Breathe</span>
            <span>Focus</span>
            <span>History</span>
          </div>
        </div>
      );
    }

    // Default template
    return (
      <div className="w-full h-full bg-zinc-950 p-3 text-white flex flex-col justify-between text-[10px]">
        <div className="text-zinc-500 text-[8px] font-mono">APP PREVIEW</div>
        <div className="flex-1 flex items-center justify-center text-center text-zinc-400 font-display">
          {projectTitle} UI
        </div>
        <div className="h-1.5 w-1/2 bg-zinc-800 rounded-full mx-auto" />
      </div>
    );
  };

  const renderTabletScreen = (projectTitle: string) => {
    return (
      <div className="w-full h-full bg-[#1C1A18] text-zinc-200 p-4 flex flex-col text-[10px] justify-between font-sans">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
          <span className="font-serif text-[12px] font-bold tracking-tight text-amber-500 select-none">SAHARA PREMIUM</span>
          <span className="font-mono text-[8px] text-zinc-500 select-none">CRAFT DESIGN 2025</span>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2 mt-3 overflow-hidden">
          {/* Left item info */}
          <div className="flex flex-col justify-between py-1">
            <div>
              <span className="bg-amber-500/10 text-amber-400 text-[7px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold">Tundra Edition</span>
              <h4 className="font-serif text-[11px] font-semibold text-white mt-1 leading-tight">Reinforced Exo-Parka v4</h4>
              <p className="text-zinc-400 text-[8px] leading-normal mt-1">
                Industrial spec utility meets premium tailored fitting. Made for hazardous Arctic climates.
              </p>
            </div>
            <div className="text-[9px] font-semibold text-white mt-1">$480.00 <span className="text-zinc-500 font-normal line-through text-[7px]">$590.00</span></div>
          </div>
          
          {/* Right visual image outline mockup */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center p-3 text-center text-zinc-500 relative">
            {/* Outline mock coat */}
            <div className="absolute inset-3 border border-dashed border-zinc-800 rounded flex flex-col items-center justify-center">
              <span className="text-zinc-600 text-[7px] font-mono select-none">GEO-GRID DETECTED</span>
              <div className="w-6 h-10 border border-zinc-700 rounded-lg flex items-center justify-center mt-1">
                <span className="text-zinc-700 text-[8px]">🧥</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-zinc-800 pt-2 text-[8px] text-zinc-500 font-mono select-none">
          <span>SECURE EXOCHAIN CHECKOUT</span>
          <span className="text-amber-500 font-semibold cursor-pointer">PRE-ORDER →</span>
        </div>
      </div>
    );
  };

  const renderLaptopScreen = (projectTitle: string) => {
    let titleHeader = "API METRICS CONSOLE";
    let highlightColor = "text-blue-400";
    let outlineColor = "border-blue-500/20";
    let bgLayer = "bg-[#0B0D11]";
    
    if (projectTitle.toLowerCase().includes("agoda")) {
      titleHeader = "AGODA VACATION CLOUD";
      highlightColor = "text-rose-400";
      outlineColor = "border-rose-500/20";
      bgLayer = "bg-[#1E1110]";
    }

    return (
      <div className={`w-full h-full ${bgLayer} text-zinc-300 p-4 flex flex-col text-[10px] justify-between font-sans`}>
        {/* Browser Top bar */}
        <div className="flex justify-between items-center border-b border-white/5 pb-2 shrink-0">
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <div className="bg-white/5 border border-white/10 rounded px-4 py-0.5 text-[8px] text-zinc-500 select-all font-mono">
            https://api.{projectTitle.toLowerCase().replace(/ /g, "")}.org
          </div>
          <div className={`w-2 h-2 rounded-full ${projectTitle.toLowerCase().includes("agoda") ? "bg-rose-500" : "bg-blue-500 animate-pulse"}`} />
        </div>

        {/* Dashboard inner layout */}
        <div className="flex-1 flex gap-2.5 mt-2.5 overflow-hidden">
          {/* Small sidebar */}
          <div className="w-14 border-r border-white/5 flex flex-col gap-1 text-[8px] text-zinc-500 py-1 font-mono select-none">
            <span className={`${highlightColor} font-semibold`}>Overview</span>
            <span>Analytics</span>
            <span>Logs</span>
            <span>Key Managers</span>
          </div>

          {/* Grid metrics content */}
          <div className="flex-1 grid grid-cols-3 gap-2 py-0.5">
            {[
              { label: "Request Velocity", value: "54.2k/s", sub: "+12%" },
              { label: "Server Latency", value: "3.84ms", sub: "Optimal" },
              { label: "System Health", value: "99.99%", sub: "Stable" }
            ].map((stat, idx) => (
              <div key={idx} className={`bg-white/5 border ${outlineColor} rounded p-2 flex flex-col justify-between`}>
                <span className="text-[7px] text-zinc-500 leading-none truncate select-none">{stat.label}</span>
                <div>
                  <h5 className="text-[12px] font-bold text-white tracking-tight mt-1">{stat.value}</h5>
                  <span className={`text-[7px] block font-mono mt-0.5 ${idx === 1 ? "text-emerald-400" : "text-sky-450"}`}>{stat.sub}</span>
                </div>
              </div>
            ))}

            {/* Large layout charts area representing dense statistics */}
            <div className="col-span-3 bg-white/5 border border-white/5 rounded p-2 flex flex-col justify-between overflow-hidden">
              <span className="text-[7px] text-zinc-500 font-mono select-none">Live Telemetry Queue (60 FPS Stream)</span>
              <div className="h-9 flex gap-1.5 items-end justify-between px-1 border-b border-white/10 select-none mt-2">
                {[4,3,5,6,3,2,6,8,7,5,4,6,7,9,11,8,7,9,12,10,13,8,9,7].map((height, hidx) => (
                  <div
                    key={hidx}
                    className={`rounded-t-xs flex-1 transition-all duration-300 ${
                      projectTitle.toLowerCase().includes("agoda") 
                        ? "bg-rose-500/80 hover:bg-rose-400" 
                        : "bg-blue-500/80 hover:bg-blue-400"
                    }`}
                    style={{ height: `${(height / 14) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDualPhoneScreen = (projectTitle: string) => {
    return (
      <div className="w-full h-full bg-[#142318] text-[#D5C2B1] p-3 flex flex-col text-[10px] justify-between font-sans overflow-hidden select-none">
        <div className="flex justify-between items-center border-b border-emerald-500/20 pb-1.5 shrink-0">
          <span className="text-emerald-400 font-bold tracking-widest text-[9px]">FACTORY_FLOW</span>
          <span className="bg-emerald-950 text-emerald-400 text-[7px] px-1.5 py-0.5 rounded-full select-none font-mono">GATE-F6</span>
        </div>
        
        <div className="flex-1 flex flex-col justify-center gap-1.5 py-1">
          <div className="text-[11px] font-bold text-white font-display">Active Telemetry Panel</div>
          
          <div className="bg-emerald-950/40 border border-emerald-500/20 rounded p-1.5 flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-[7px] text-emerald-400 font-mono">CO2 VENTILATION DETECTOR</span>
              <span className="text-white font-medium">384 PPM</span>
            </div>
            <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/80 px-1 rounded">SAFE</span>
          </div>
          
          <div className="bg-amber-950/40 border border-amber-500/20 rounded p-1.5 flex justify-between items-center">
            <div className="flex flex-col gap-0.5">
              <span className="text-[7px] text-amber-400 font-mono">THERMAL SENSOR BLOCK B</span>
              <span className="text-white font-medium">96.8°C</span>
            </div>
            <span className="text-[8px] font-mono text-amber-500 bg-amber-950/80 px-1 rounded animate-pulse">WARN</span>
          </div>
        </div>

        <div className="text-[7px] text-zinc-500 text-center font-mono py-1 border-t border-emerald-555/10 shrink-0">
          SECURE PROTOCOL ACTUATION CAPABLE
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 mt-4">
      {/* Dynamic Render based on Screen Type */}
      {type === "phone" && (
        <div className="w-[180px] h-[360px] bg-[#1E1E1E] rounded-[36px] p-2.5 shadow-2xl border-4 border-[#3A3A3A] relative overflow-hidden flex flex-col pt-4">
          {/* iPhone Dynamic Island */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-black rounded-full z-40 flex items-center justify-between px-2 select-none">
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
          </div>
          {/* Inner Phone Screen Content */}
          <div className="w-full h-full rounded-[26px] overflow-hidden bg-zinc-950 relative border border-black z-30 shadow-inner">
            {renderPhoneScreen(title)}
          </div>
        </div>
      )}

      {type === "tablet" && (
        <div className="w-[280px] h-[200px] bg-[#2A2A2A] rounded-[24px] p-2.5 shadow-2xl border-4 border-[#424242] relative overflow-hidden flex flex-col">
          {/* Home Button notch bar or bezel details */}
          <div className="absolute top-1/2 -left-0.5 -translate-y-1/2 w-1.5 h-8 bg-zinc-700/80 rounded-r-sm z-40 select-none" />
          {/* Bezel dot webcam */}
          <div className="absolute top-1/2 right-1.5 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zinc-900 z-40" />
          {/* Inner screen content */}
          <div className="w-full h-full rounded-[14px] overflow-hidden bg-zinc-900 relative border border-black z-30 shadow-inner">
            {renderTabletScreen(title)}
          </div>
        </div>
      )}

      {type === "laptop" && (
        <div className="w-[320px] h-[210px] flex flex-col items-center justify-center select-none relative mb-2">
          {/* Laptop Screen Lid */}
          <div className="w-[305px] h-[190px] bg-[#222] rounded-t-xl p-2 shadow-2xl border-2 border-zinc-700 relative overflow-hidden">
            {/* Screen bezel thin lines */}
            <div className="w-full h-full bg-[#111] rounded-xs overflow-hidden relative border border-zinc-900 shadow-inner flex flex-col">
              {renderLaptopScreen(title)}
            </div>
            {/* Camera dot at top */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-zinc-900" />
          </div>
          {/* Laptop Keyboard Bevel Deck */}
          <div className="w-[335px] h-[10px] bg-zinc-400 border border-zinc-500 rounded-t-xs shadow-md z-45" />
          <div className="w-[335px] h-[12px] bg-zinc-300 border-x border-b border-zinc-400 rounded-b-md shadow-lg z-45 relative flex justify-center">
            {/* Laptop opening tab groove */}
            <div className="w-14 h-1.5 bg-zinc-400 rounded-b-md shadow-inner" />
          </div>
        </div>
      )}

      {type === "dual-phone" && (
        <div className="w-[180px] h-[340px] bg-[#2C2C2B] rounded-[36px] p-2.5 shadow-2xl border-4 border-[#3D3D3C] relative overflow-hidden flex flex-col pt-3">
          {/* Webcam dot block */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-45 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
          </div>
          {/* Screen area */}
          <div className="w-full h-full rounded-[26px] overflow-hidden bg-zinc-950 relative border border-black z-30 shadow-inner">
            {renderDualPhoneScreen(title)}
          </div>
        </div>
      )}
    </div>
  );
}
