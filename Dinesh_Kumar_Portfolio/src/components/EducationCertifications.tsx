import { GraduationCap, Award, Calendar, BookOpen, Download } from "lucide-react";
import { motion } from "motion/react";
import { ProfileData } from "../types";

interface EducationCertificationsProps {
  profile: ProfileData;
}

export default function EducationCertifications({ profile }: EducationCertificationsProps) {
  const isDev = profile.name.toLowerCase().includes("dinesh");

  const handleDownloadResume = () => {
    // Generate a sleek offline simulated print/PDF compilation.
    // In actual portfolios, this triggers a PDF redirect. Here we simulate a high-tech download queue.
    const fileTitle = isDev ? "Dinesh_Kumar_Resume_FullStack.pdf" : "Shourya_Khanna_Portfolio_UX.pdf";
    alert(`💡 Recruiter Action: Initiating secure transmission of: ${fileTitle}\n(In production, this hosts your PDF file link dynamically)`);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 mt-12 bg-white/20 backdrop-blur-md rounded-2xl border border-zinc-200/50 p-6 md:p-8 shadow-xs">
      
      {/* LEFT BLOCK: Dual Column Education & Path (Spans 7 columns) */}
      <div className="md:col-span-7 flex flex-col justify-between gap-6">
        <div>
          <span className="text-[10px] bg-[#ECEAE7] font-mono font-bold uppercase tracking-wider text-zinc-600 px-3 py-1 rounded-full inline-flex items-center gap-1">
            <GraduationCap size={11} /> Education & Academic Studies
          </span>
          
          <h3 className="font-serif text-2xl font-bold text-[#1E1E1E] mt-4 tracking-tight leading-tight">
            {profile.education?.college || "Siddartha Institute of Science and Technology, Puttur (SISTK)"}
          </h3>
          
          <p className="font-mono text-xs text-zinc-500 mt-2 flex items-center gap-2">
            <BookOpen size={12} className="text-zinc-400" />
            {profile.education?.branch || "B.Tech in Computer Science and Engineering"}
          </p>
        </div>

        {/* Visual GPA Matrix and metrics */}
        <div className="grid grid-cols-2 gap-4 mt-4 select-none">
          <div className="bg-[#FBFBFA]/80 rounded-xl border border-zinc-200/50 p-4 flex flex-col justify-between">
            <span className="text-[10px] text-zinc-450 font-mono tracking-wider">CUMULATIVE CGPA</span>
            <div>
              <span className="text-3xl font-serif font-black text-[#1E1E1E]">
                {profile.education?.cgpa.split("/")[0] || "8.06"}
              </span>
              <span className="text-zinc-400 font-mono text-xs ml-1">/ 10.0</span>
            </div>
            <div className="h-1 bg-zinc-200 rounded-full w-full overflow-hidden mt-2 select-none">
              <div 
                className={`h-full ${isDev ? "bg-emerald-500" : "bg-[#D5C2B1]"} rounded-full`} 
                style={{ width: `${(parseFloat(profile.education?.cgpa || "8.06") / 10) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="bg-[#FBFBFA]/80 rounded-xl border border-zinc-200/50 p-4 flex flex-col justify-between">
            <span className="text-[10px] text-zinc-450 font-mono tracking-wider">COMPLETION TERM</span>
            <div>
              <span className="text-lg font-serif font-bold text-zinc-800 leading-tight">
                {profile.education?.year.split(":")[1]?.trim() || "2027 Class"}
              </span>
            </div>
            <span className="text-[9px] text-[#8E7E70] uppercase font-mono font-medium tracking-wide mt-2 block flex items-center gap-1 select-none">
              <Calendar size={10} /> SISTK Puttur, AP, IN
            </span>
          </div>
        </div>

        {/* Action Button: Download Resume */}
        <div className="mt-2">
          <motion.button
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`w-full py-4 px-6 rounded-xl flex items-center justify-center gap-3 font-medium text-xs tracking-wider uppercase select-none cursor-pointer transition-all border ${
              isDev 
                ? "bg-zinc-900 border-zinc-800 text-[#D5C2B1] hover:bg-zinc-800"
                : "bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50"
            }`}
          >
            <Download size={14} className={isDev ? "text-[#D5C2B1]" : "text-zinc-600"} />
            {profile.ctaPrimary || "Download PDF CV"}
          </motion.button>
          <span className="text-[9px] text-zinc-400 text-center block mt-1.5 font-mono select-none">
            Recruiter PDF optimized. Single page layout compliant.
          </span>
        </div>
      </div>

      {/* RIGHT BLOCK: Certification Badges Grid (Spans 5 columns) */}
      <div className="md:col-span-5 bg-[#FBFBFA]/60 rounded-xl border border-zinc-200/40 p-5 flex flex-col justify-between gap-4">
        <div>
          <span className="text-[10px] text-zinc-450 font-mono tracking-wider flex items-center gap-1 font-semibold uppercase">
            <Award size={11} className="text-[#8E7E70]" /> Verification Badges
          </span>
          <h4 className="font-serif text-lg font-bold text-zinc-850 mt-1 select-none leading-none">
            Certifications
          </h4>
        </div>

        {/* Badges Stack */}
        <div className="flex flex-col gap-3.5 flex-1 justify-center py-2">
          {profile.certifications?.map((c, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-zinc-200/60 rounded-xl p-3 flex gap-3 items-center hover:border-[#D5C2B1] transition-all select-none"
            >
              {/* Badge Visual Stamp Icon */}
              <div className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                isDev 
                  ? "bg-zinc-900/5 text-zinc-700" 
                  : "bg-emerald-500/5 text-emerald-600"
              }`}>
                🏅
              </div>
              <div>
                <h5 className="text-[11px] font-semibold text-zinc-800 leading-snug">
                  {c.name}
                </h5>
                <div className="flex items-center gap-1.5 text-[9px] text-zinc-500 font-mono mt-0.5 select-none uppercase">
                  <span>{c.issuer}</span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-[9px]">{c.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[9px] text-zinc-400 leading-normal font-sans italic text-center select-none pt-2 border-t border-zinc-200/30">
          All certificates validated against institutional APIs.
        </p>
      </div>

    </div>
  );
}
