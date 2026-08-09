import { motion } from "motion/react";
import { Sparkles, Calendar, Bookmark, MapPin } from "lucide-react";

interface IdBadgeProps {
  name: string;
  title: string;
  portrait: string;
  activeMode: "developer" | "designer";
}

export default function IdBadge({ name, title, portrait, activeMode }: IdBadgeProps) {
  const isDev = activeMode === "developer";

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Lanyard neck strap loop coming down */}
      <div className="absolute -top-36 w-6 h-36 border-x-4 border-[#ECEAE7] rounded-b-xl drop-shadow select-none z-10" />
      
      {/* Lanyard Clip Attachment (Acrylic + Silver Metal Ring) */}
      <motion.div 
        whileHover={{ scale: 1.15, rotate: 15 }}
        whileTap={{ scale: 0.85, rotate: -20 }}
        transition={{ type: "spring", stiffness: 600, damping: 10 }}
        className="absolute -top-10 flex flex-col items-center select-none z-20 cursor-pointer"
      >
        {/* Silver loop ring */}
        <div className="w-8 h-8 rounded-full border-4 border-zinc-400 bg-zinc-300 shadow-inner flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
        </div>
        {/* Transparent plastic lock clasp */}
        <div className="w-5 h-7 bg-white/70 border border-zinc-300 rounded shadow-sm flex items-center justify-center -mt-1">
          <div className="w-3 h-4 bg-[#ECEAE7] rounded-sm border border-zinc-400/50" />
        </div>
      </motion.div>

      {/* Main Physical Board ID Card Frame */}
      <motion.div
        key={name}
        initial={{ y: 20, rotate: -2, opacity: 0 }}
        animate={{ y: 0, rotate: isDev ? 1 : -1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 10 }}
        drag={true}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.8}
        dragTransition={{ bounceStiffness: 450, bounceDamping: 8 }}
        style={{ transformOrigin: "top center" }}
        whileHover={{ 
          scale: 1.05, 
          y: -10,
          rotate: isDev ? [1, -2, 2, -1, 1, 1] : [-1, -2, 2, -1, 1, -1],
          transition: {
            rotate: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3,
              ease: "easeInOut"
            },
            type: "spring",
            stiffness: 400,
            damping: 15
          }
        }}
        whileTap={{ 
          scale: 0.94, 
          rotate: 0,
          y: 10,
          cursor: "grabbing",
          transition: { type: "spring", stiffness: 500, damping: 8 }
        }}
        className="w-72 bg-white rounded-2xl border-4 border-[#ECEAE7] shadow-[0_20px_40px_rgba(0,0,0,0.12)] p-4 select-none relative overflow-hidden mt-2 z-10 cursor-grab active:cursor-grabbing"
      >
        {/* Glass reflection shine layer */}
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-white/40 pointer-events-none z-30" />
        
        {/* Punch Hole for clip */}
        <div className="w-8 h-3 rounded-full bg-zinc-100 border border-zinc-300 mx-auto -mt-1 mb-3 shadow-inner" />

        {/* Badge Header Area */}
        <div className="flex items-center justify-between mb-3 text-[10px] text-zinc-400 font-mono tracking-wider font-semibold uppercase">
          <span className="flex items-center gap-1">
            <Sparkles size={10} className="text-[#D5C2B1]" /> {isDev ? "COR-017-DEV" : "SOD-12-DES"}
          </span>
          <span className={`${isDev ? "text-emerald-500" : "text-amber-600"}`}>
            ● {isDev ? "Active Console" : "Ready Studio"}
          </span>
        </div>

        {/* Card Portrait Box */}
        <div className="w-full h-64 bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden relative shadow-inner mb-4 group">
          <img
            src={portrait}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Watermark badge badge info */}
          <div className="absolute bottom-2 left-2 bg-[#1E1E1E]/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded-full select-none">
            {isDev ? "DINESH.DEV" : "SHOURYA.WORK"}
          </div>
          {/* Holographic icon overlay */}
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-linear-to-br from-indigo-500/20 via-purple-500/10 to-amber-500/30 backdrop-blur-xs flex items-center justify-center border border-white/20">
            <span className="text-[10px] text-white/80 font-bold font-serif italic">25</span>
          </div>
        </div>

        {/* Name and Designation */}
        <div className="text-center mb-4">
          <h3 className="font-serif text-xl font-bold tracking-tight text-[#1E1E1E]">
            {name}
          </h3>
          <p className="font-mono text-xs text-zinc-500 bg-[#F5F5F3] py-1 px-3.5 rounded-full inline-block mt-1 border border-zinc-200/50">
            {title}
          </p>
        </div>

        {/* Details Grid */}
        <div className="divide-y divide-zinc-100 text-[11px] text-zinc-600 font-sans mb-4">
          <div className="flex justify-between py-2">
            <span className="text-zinc-400 flex items-center gap-1 font-mono"><MapPin size={10} /> ACCESS LEVEL:</span>
            <span className="font-semibold text-zinc-800">{isDev ? "Full-Stack Core" : "Director Design"}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-400 flex items-center gap-1 font-mono"><Calendar size={10} /> ISSUED:</span>
            <span className="font-semibold text-zinc-800">2026/06 REG</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-zinc-400 flex items-center gap-1 font-mono"><Bookmark size={10} /> COMMUNITY:</span>
            <span className="font-semibold text-[#8E7E70] uppercase tracking-wider">{isDev ? "SISTK Alumnus" : "UPES SOD '25"}</span>
          </div>
        </div>

        {/* Barcode representation */}
        <div className="flex flex-col items-center bg-[#FBFBFA] p-2 rounded-lg border border-zinc-100 font-mono mt-1 select-none">
          {/* Mock Barcode lines in pure CSS */}
          <div className="w-full h-8 flex gap-[2px] items-stretch justify-center opacity-85">
            {[1,3,1,2,1,4,2,1,3,1,2,1,1,3,2,1,1,4,1,2,1,3,2,1,3,1,2,2].map((w, idx) => (
              <div
                key={idx}
                className="bg-black"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <span className="text-[8px] text-zinc-400 tracking-widest mt-1">
            *DINESH25SHOURYALS*
          </span>
        </div>
      </motion.div>
    </div>
  );
}
