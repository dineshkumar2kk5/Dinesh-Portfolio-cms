import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Mail,
  Linkedin,
  Briefcase,
  Sparkles,
  Award,
  BookOpen,
  Download,
  CheckCircle2,
  Activity,
  Layers,
  Sun,
  Moon,
  X,
  Github,
  ExternalLink
} from "lucide-react";

import { dineshData } from "./data";
import { ProjectItem } from "./types";
import IdBadge from "./components/IdBadge";
import ProjectMockup from "./components/ProjectMockup";
import AiRecruiter from "./components/AiRecruiter";

export default function App() {
  const activeProfile = "dinesh";
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeCertification, setActiveCertification] = useState<any | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [projects, setProjects] = useState<ProjectItem[]>(dineshData.projects);
  const [certifications, setCertifications] = useState<any[]>(dineshData.certifications || []);
  const [cmsConnected, setCmsConnected] = useState<boolean>(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const getImageUrl = (url?: string | null) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/uploads/")) return `http://localhost:8080${url}`;
    return url;
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((apiProjects) => {
        if (Array.isArray(apiProjects) && apiProjects.length > 0) {
          const mapped: ProjectItem[] = apiProjects.map((p: any, idx: number) => ({
            id: p.id || String(idx + 1),
            number: String(idx + 1).padStart(2, "0"),
            title: p.title,
            subtitle: p.subtitle || "",
            description: p.description || "",
            techTags: p.techTags || [],
            mockupBg: p.mockupBg || (idx % 2 === 0 ? "bg-amber-600" : "bg-blue-600"),
            mockupType: p.mockupType || "laptop",
            details: {
              role: p.details?.role || p.role || "Lead Backend Architect",
              timeline: p.details?.timeline || p.timeline || "Q1 - Q4",
              challenge: p.details?.challenge || p.challengeText || p.description,
              solution: p.details?.solution || p.solutionText || "Designed Spring Boot microservices with MongoDB aggregation pipelines.",
              results: p.details?.results || p.results || ["60% database query optimization", "High concurrency throughput"],
            },
            imageUrl: p.imageUrl,
            githubUrl: p.githubUrl || "https://github.com/dineshkumar2kk5",
            liveUrl: p.liveUrl || "http://localhost:8080/admin/projects",
          }));
          setProjects(mapped);
          setCmsConnected(true);
        }
      })
      .catch((err) => console.log("CMS offline, using static projects:", err));

    fetch("http://localhost:8080/api/certifications")
      .then((res) => res.json())
      .then((apiCerts) => {
        if (Array.isArray(apiCerts) && apiCerts.length > 0) {
          setCertifications(apiCerts);
        }
      })
      .catch((err) => console.log("CMS offline, using static certs:", err));

    fetch("http://localhost:8080/api/resume")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.fileUrl) {
          const resolvedUrl = data.fileUrl.startsWith("/uploads/")
            ? `http://localhost:8080${data.fileUrl}`
            : data.fileUrl;
          setResumeUrl(resolvedUrl);
        }
      })
      .catch((err) => console.log("Resume API offline:", err));
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const data = dineshData;

  // Dynamic portfolio resume download
  const handleDownloadPortfolio = () => {
    if (resumeUrl) {
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.target = "_blank";
      link.download = "Dinesh_Kumar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`📂 Initiating developer portfolio transmission:\nFile: Dinesh_Kumar_Java_Developer_Resume_27.pdf\n\nTo replace with your custom resume file, upload it in Spring Boot Admin CMS (/admin/resume).`);
    }
  };

  return (
    <div id="portfolio-root" className={`min-h-screen transition-colors duration-300 overflow-x-hidden font-sans ${isDark
      ? "bg-[#090807] text-zinc-200 selection:bg-emerald-900 selection:text-white"
      : "bg-[#FAF8F5] text-[#1E1E1E] selection:bg-[#D5C2B1] selection:text-zinc-900"
      }`}>

      {/* Subtle Scroll Progress Indicator */}
      <motion.div
        className={`fixed top-0 left-0 right-0 h-[3px] origin-left z-50 transition-colors duration-300 ${isDark ? "bg-emerald-500" : "bg-[#8E7E70]"
          }`}
        style={{ scaleX }}
      />

      {/* ================= HEADER BRAND STRIP ================= */}
      <header id="portfolio-nav" className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${isDark
        ? "bg-[#090807]/85 border-zinc-900"
        : "bg-[#FAF8F5]/85 border-zinc-200/50"
        }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Creative Logo */}
          <div className="flex items-center gap-2 select-none">
            <span className={`font-mono text-xs md:text-sm tracking-widest font-black transition-colors ${isDark ? "text-zinc-100" : "text-zinc-800"
              }`}>
              dinesh.dev
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Navigation Links and the top-right small theme toggler */}
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#about"
                className={`text-xs uppercase tracking-widest font-black transition-colors ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-650 hover:text-zinc-950"
                  }`}
              >
                About
              </a>
              <a
                href="#projects"
                className={`text-xs uppercase tracking-widest font-black transition-colors ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-650 hover:text-zinc-950"
                  }`}
              >
                Projects
              </a>
              <a
                href="#timeline"
                className={`text-xs uppercase tracking-widest font-black transition-colors ${isDark ? "text-zinc-400 hover:text-white" : "text-zinc-650 hover:text-zinc-950"
                  }`}
              >
                Record
              </a>
              <a
                href="http://localhost:8080/admin/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-[10px] uppercase tracking-widest font-mono font-bold transition-all px-3 py-1.5 rounded-full border flex items-center gap-1.5 shadow-xs ${
                  isDark
                    ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-400 hover:bg-emerald-900/60"
                    : "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                }`}
                title="Manage projects & blog posts via Spring Boot CMS"
              >
                <Briefcase size={12} />
                {cmsConnected ? "CMS Connected" : "CMS Admin"}
              </a>
            </nav>

            {/* Micro divider vertical line */}
            <div className={`h-4 w-[1px] hidden md:block transition-colors ${isDark ? "bg-zinc-850" : "bg-zinc-300"
              }`} />

            {/* Theme Toggle Switch */}
            <button
              id="btn-theme-toggle"
              onClick={() => setIsDark(!isDark)}
              className={`px-2.5 py-2.5 md:px-1.5 rounded-lg border transition-all duration-300 text-xs flex items-center gap-1.5 cursor-pointer shadow-xs select-none ${isDark
                ? "bg-[#1E1A15] border-amber-500/30 text-amber-400 hover:bg-[#2A231C] modal-button"
                : "bg-white border-zinc-250 text-zinc-700 hover:bg-zinc-50 hover:border-[#8E7E70]/40 text-[#8E7E70]"
                }`}
              title="Toggle theme (Dark / Light)"
            >
              {isDark ? (
                <>
                  <Sun size={12} className="text-amber-400 animate-spin-slow" />
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase hidden lg:inline-block">PRESENT</span>
                </>
              ) : (
                <>
                  <Moon size={12} className="text-zinc-600" />
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase hidden lg:inline-block">DARK</span>
                </>
              )}
            </button>
          </div>

        </div>
      </header>

      {/* ================= HERO & BIO BOARD OVERVIEW ================= */}
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >

        {/* Left text column containing the primary design concept */}
        <div className="lg:col-span-7 flex flex-col justify-center">

          {/* Big Editorial Header block as seen in mockup layout */}
          <div className="relative mb-6">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-flex items-center gap-1 mb-4 select-none animate-fade-in transition-colors duration-300 ${isDark ? "bg-[#1B1815] text-[#C4B4A5]" : "bg-[#ECEAE7] text-[#8E7E70]"
              }`}>
              <Sparkles size={11} /> {activeProfile === "dinesh" ? "PORTFOLIO '27 TECHNICAL LOGIC" : "PORTFOLIO '25 CREATIVE DIRECTION"}
            </span>
            <h1 className={`text-5xl md:text-7xl font-serif font-black tracking-tight leading-none uppercase transition-colors duration-300 ${isDark ? "text-zinc-50" : "text-[#1E1E1E]"
              }`}>
              {data.name}
            </h1>
            <h2 className={`text-lg md:text-xl font-sans font-medium mt-1.5 tracking-wide select-none transition-colors duration-300 ${isDark
              ? (activeProfile === "dinesh" ? "text-emerald-400" : "text-[#C4B4A5]")
              : (activeProfile === "dinesh" ? "text-emerald-700" : "text-[#8E7E70]")
              }`}>
              {data.title}
            </h2>
          </div>

          {/* Intro Tagline */}
          <p className={`text-base md:text-lg font-sans font-medium leading-relaxed max-w-xl transition-colors duration-300 ${isDark ? "text-zinc-300" : "text-zinc-800"
            }`}>
            {data.tagline}
          </p>

          {/* Experience brief card */}
          <div className={`border rounded-2xl p-5 mt-6 max-w-xl select-none transition-all duration-300 ${isDark
            ? "border-zinc-850 bg-[#0E0D0C] shadow-none"
            : "border-zinc-200/80 bg-white shadow-xs"
            }`}>
            <p className={`text-xs leading-relaxed italic transition-colors duration-300 ${isDark ? "text-zinc-400" : "text-zinc-650"
              }`}>
              {activeProfile === "dinesh"
                ? "“Clean code is like clean logic. When you have to explain it, it means there is room to simplify. My goal is to build robust, thread-safe, and highly efficient Java microservices that map to hardware gracefully.”"
                : "“I believe that design shouldn't require instruction sheets. My goal is to build visual logic paths that reduce cognitive wear and guide human action effortlessly.”"
              }
            </p>
            <div className={`flex items-center gap-3.5 mt-4 pt-3 border-t transition-colors duration-300 ${isDark ? "border-zinc-900" : "border-zinc-100"
              }`}>
              <div className={`w-9 h-9 rounded-full overflow-hidden shrink-0 border transition-colors ${isDark ? "bg-zinc-800 border-zinc-700" : "bg-zinc-200 border-zinc-300"
                }`}>
                <img
                  src={data.avatarUrl}
                  alt={`${data.name} portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className={`text-[10px] font-mono tracking-wider font-bold block leading-none select-none uppercase transition-colors ${isDark ? "text-zinc-200" : "text-zinc-800"
                  }`}>{data.name}</span>
                <span className={`text-[9px] block mt-0.5 select-none uppercase font-sans transition-colors ${isDark ? "text-[#C4B4A5]" : "text-[#8E7E70]"
                  }`}>
                  {activeProfile === "dinesh" ? "DEPT. OF CSE, SIDDARTHA INSTITUTE OF SCIENCE AND TECHNOLOGY, PUTTUR (SISTK)" : "School of Design, UPES '25"}
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#projects"
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xs select-none ${isDark
                ? "bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
                : "bg-zinc-900 border border-zinc-950 text-white hover:bg-zinc-800 shadow-zinc-900/5"
                }`}
            >
              Inspect Project Files
            </a>
            <motion.button
              onClick={handleDownloadPortfolio}
              animate={{
                scale: [1, 1.04, 1],
                boxShadow: isDark
                  ? ["0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 14px rgba(16, 185, 129, 0.45)", "0px 0px 0px rgba(16, 185, 129, 0)"]
                  : ["0px 0px 0px rgba(142, 126, 112, 0)", "0px 0px 14px rgba(142, 126, 112, 0.45)", "0px 0px 0px rgba(142, 126, 112, 0)"],
                borderColor: isDark
                  ? ["rgba(63, 63, 70, 0.8)", "rgba(16, 185, 129, 0.8)", "rgba(63, 63, 70, 0.8)"]
                  : ["rgba(212, 212, 216, 1)", "rgba(142, 126, 112, 0.8)", "rgba(212, 212, 216, 1)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 select-none border ${isDark
                ? "bg-zinc-900 border-zinc-800 text-zinc-250 hover:bg-zinc-850"
                : "bg-white border-zinc-350 text-zinc-850 hover:bg-zinc-50"
                }`}
            >
              <Download size={13} /> {activeProfile === "dinesh" ? "Download CV PDF" : "Download Case Studies PDF"}
            </motion.button>
          </div>

        </div>

        {/* Right column: Interactive physical ID board lanyard badge hanging */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end py-6 select-none">
          <IdBadge
            name={data.name}
            title={data.title}
            portrait={data.avatarUrl}
            activeMode={activeProfile === "dinesh" ? "developer" : "designer"}
          />
        </div>

      </motion.section>

      {/* ================= BIOGRAPHIC DETAILS & BIO ESSAYS ================= */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className={`border-t border-b transition-colors duration-300 py-16 ${isDark
          ? "bg-[#11100E]/70 border-zinc-900"
          : "bg-[#FCFAF7] border-zinc-200/50"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Narrative description */}
          <div className="lg:col-span-7 space-y-5 font-sans">
            <span className={`font-mono text-[9px] tracking-widest uppercase font-bold select-none block transition-colors ${isDark ? "text-[#C4B4A5]" : "text-[#8E7E70]"
              }`}>
              {activeProfile === "dinesh" ? "01 // LOGIC & HARDWARE" : "01 // DESIGN ESSENSE"}
            </span>
            <h3 className={`font-serif text-3xl font-bold tracking-tight transition-colors ${isDark ? "text-zinc-100" : "text-[#1E1E1E]"
              }`}>
              {activeProfile === "dinesh" ? "The alignment of clean object mappings, speed, and safety." : "The harmony of form, habit, and speed."}
            </h3>
            <div className={`space-y-4 text-xs md:text-sm leading-relaxed transition-colors duration-300 ${isDark ? "text-zinc-400" : "text-zinc-650"
              }`}>
              {data.aboutParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Right column: Quick stat boxes */}
          <div className="lg:col-span-1" />
          <div className="lg:col-span-4 flex flex-col gap-4">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl p-5 select-none transition-all duration-300 ${isDark
                  ? "bg-[#0E0D0C] border-zinc-850 hover:border-emerald-800"
                  : "bg-white border-zinc-200/60 shadow-xs hover:border-[#D5C2B1]"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] tracking-widest font-mono uppercase transition-colors ${isDark ? "text-zinc-400" : "text-[#8E7E70]"
                    }`}>
                    {stat.label}
                  </span>
                  <span className={`text-xs ${isDark ? "text-emerald-500" : "text-zinc-400"}`}>✦</span>
                </div>
                <h4 className={`text-3xl font-serif font-black mt-1.5 tracking-tight leading-none transition-colors ${isDark ? "text-zinc-100" : "text-[#1E1E1E]"
                  }`}>
                  {stat.value}
                </h4>
                <p className={`text-[10.5px] leading-normal mt-1 transition-colors ${isDark ? "text-zinc-500" : "text-zinc-500"
                  }`}>
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* ================= PROJECTS GRID ================= */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="py-20 max-w-7xl mx-auto px-6"
      >

        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 select-none">
          <div className="max-w-md">
            <span className={`font-mono text-[9px] tracking-widest uppercase font-bold block mb-2 transition-colors duration-300 ${isDark ? "text-zinc-450" : "text-[#8E7E70]"
              }`}>
              {activeProfile === "dinesh" ? "02 // STACK & DECOUPLING" : "02 // STRUCTURAL EXPERIENCES"}
            </span>
            <h3 className={`font-serif text-3xl md:text-4xl font-black tracking-tight leading-none uppercase transition-colors duration-300 ${isDark ? "text-zinc-100" : "text-[#1E1E1E]"
              }`}>
              {activeProfile === "dinesh" ? "API suites & standalone logic." : "Case studies & systems."}
            </h3>
          </div>
          <span className={`text-[11px] font-mono uppercase tracking-wider block mt-3 md:mt-0 font-bold transition-colors ${isDark ? "text-zinc-400" : "text-[#8E7E70]"
            }`}>
            CLICK CARDS TO INSPECT CODE SCHEMAS & OUTCOMES
          </span>
        </div>

        {/* Dynamic Multi-column strip grid - connected to Spring Boot MongoDB backend! */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${showAllProjects ? "lg:grid-cols-3 xl:grid-cols-4" : "lg:grid-cols-3"} gap-6`}>
          {(showAllProjects ? projects : projects.slice(0, 3)).map((proj) => {
            return (
              <motion.div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                whileHover={{ y: -8 }}
                className={`rounded-3xl border cursor-pointer overflow-hidden relative group transition-all flex flex-col justify-between shadow-xs hover:shadow-md duration-300 ${isDark
                  ? "border-zinc-850 bg-[#0E0D0C] hover:border-emerald-800"
                  : "border-zinc-200 bg-white hover:border-zinc-350"
                  }`}
              >
                {/* Simulated Wireframe Display inside the primary color box */}
                <div className={`p-4 h-64 flex items-center justify-center relative overflow-hidden border-b transition-colors duration-300 ${isDark ? "bg-[#181614]/80 border-zinc-900" : `bg-zinc-50 ${proj.mockupBg}/10 border-b border-zinc-100`
                  }`}>
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/2 px-2" />
                  <ProjectMockup
                    type={proj.mockupType}
                    title={proj.title}
                    bgColor={proj.mockupBg}
                  />
                </div>

                {/* Info summary */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className={`text-[8px] font-mono tracking-widest block uppercase font-bold select-none transition-colors duration-300 ${isDark ? "text-zinc-400" : "text-[#8E7E70]"
                      }`}>
                      FILE SHEET // {proj.number}
                    </span>
                    <h4 className={`font-serif text-base font-black mt-1 transition-colors leading-tight ${isDark
                      ? "text-zinc-100 group-hover:text-emerald-400"
                      : "text-[#1E1E1E] group-hover:text-[#8E7E70]"
                      }`}>
                      {proj.title}
                    </h4>
                    <p className={`text-[10px] leading-relaxed mt-2 line-clamp-3 transition-colors ${isDark ? "text-zinc-400" : "text-zinc-550"
                      }`}>
                      {proj.description}
                    </p>
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap gap-1 mt-4 select-none">
                    {proj.techTags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[8px] font-mono px-1.5 py-0.5 rounded border transition-colors ${isDark
                          ? "bg-[#181614] border-[#22201D] text-[#C4B4A5]"
                          : "bg-zinc-100 border-zinc-200/50 text-zinc-500"
                          }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Big number transparent label at corner */}
                <div className="absolute right-4 bottom-4 select-none pointer-events-none opacity-10">
                  <span className="text-5xl font-mono font-bold text-zinc-400">
                    {proj.number}
                  </span>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* View More / View Less Toggle Button */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAllProjects(!showAllProjects)}
            className={`cursor-pointer px-6 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border-2 rounded-full transition-all flex items-center gap-2.5 select-none ${isDark
              ? "bg-[#0E0D0C] border-zinc-800 text-zinc-350 hover:text-emerald-400 hover:border-emerald-500/50 shadow-sm"
              : "bg-white border-zinc-300 text-zinc-700 hover:bg-[#FAF8F5] hover:text-[#8E7E70] hover:border-[#8E7E70] shadow-xs"
              }`}
          >
            <span>{showAllProjects ? "Collapse Projects (Show Less)" : "Load More Architectural Cases (View More)"}</span>
            <span className={isDark ? "text-emerald-500" : "text-[#8E7E70]"}>
              {showAllProjects ? "▲" : "▼"}
            </span>
          </motion.button>
        </div>

      </motion.section>

      {/* ================= SKILLS CHIP GRID ================= */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className={`border-t border-b py-16 transition-colors duration-300 ${isDark ? "bg-[#090807] border-zinc-900" : "bg-zinc-100 border-zinc-200/60"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <span className={`font-mono text-[9px] tracking-widest uppercase font-bold block mb-2 select-none transition-colors ${isDark ? "text-zinc-450" : "text-[#8E7E70]"
            }`}>
            03 // LOGICAL STACK
          </span>
          <h3 className={`font-serif text-3xl font-black leading-tight select-none uppercase mb-10 transition-colors ${isDark ? "text-zinc-100" : "text-[#1E1E1E]"
            }`}>
            Skills & workflows.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.map((category, idx) => (
              <div
                key={idx}
                className={`border rounded-2xl p-5 shadow-xs transition-colors duration-300 ${isDark
                  ? "bg-[#0E0D0C] border-zinc-850 hover:border-emerald-800"
                  : "bg-white border-zinc-200 hover:border-[#D5C2B1]"
                  }`}
              >
                <h4 className={`font-serif text-sm font-black mb-3.5 select-none flex items-center gap-1.5 transition-colors ${isDark ? "text-zinc-100" : "text-zinc-850"
                  }`}>
                  <span className="text-zinc-400">✦</span>
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-1.5 select-none">
                  {category.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`text-xs px-2.5 py-1 rounded-full transition-all cursor-default border ${isDark
                        ? "bg-[#181614] border-zinc-800 text-zinc-305 hover:bg-zinc-800"
                        : "bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100/50 hover:border-zinc-300"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Software systems list with abbreviations */}
          <div className="mt-12 select-none">
            <h4 className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 font-bold mb-4">
              {activeProfile === "dinesh" ? "IDE & Development Environments Mastered" : "Software environments mastered"}
            </h4>
            <div className="flex flex-wrap gap-3.5">
              {data.softwares.map((sw, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 border rounded-lg px-3 py-1.5 transition-all cursor-default select-none ${isDark
                    ? "bg-[#0D0C0A] border-zinc-850 text-zinc-200 shadow-none"
                    : `${sw.color} bg-white shadow-xs`
                    }`}
                >
                  <span className="text-[10px] font-mono font-black uppercase tracking-tighter">
                    {sw.abbreviation}
                  </span>
                  <div className={`h-4 w-[1px] ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`} />
                  <span className={`text-xs font-semibold tracking-wide font-sans ${isDark ? "text-zinc-305" : "text-zinc-800"
                    }`}>
                    {sw.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.section>

      {/* ================= ACADEMICS & RECRUITER VERIFICATION BADGES ================= */}
      <motion.section
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className={`max-w-3xl mx-auto w-full border p-6 md:p-8 rounded-3xl transition-colors duration-300 ${isDark
          ? "bg-[#0E0D0C] border-zinc-850 shadow-none"
          : "bg-white border-zinc-200 shadow-xs"
          }`}>

          {/* Left Block: Academic studies at school of design/computing */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5 select-none border transition-colors ${isDark
                ? "bg-[#181614] border-zinc-900 text-[#C4B4A5]"
                : "bg-zinc-105 border-zinc-200/60 text-[#8E7E70]"
                }`}>
                <BookOpen size={11} /> Institutional Studies
              </span>
              <h3 className={`font-serif text-2xl md:text-3xl font-black mt-4 leading-tight transition-colors ${isDark ? "text-zinc-105" : "text-[#1E1E1E]"
                }`}>
                {activeProfile === "dinesh" ? "Siddartha Institute of Science and Technology, Puttur (SISTK)" : "School of Design (SOD), UPES Dehradun"}
              </h3>
              <p className={`font-mono text-xs mt-2 block select-none uppercase transition-colors ${isDark ? "text-[#C4B4A5]" : "text-[#8E7E70]"
                }`}>
                {activeProfile === "dinesh" ? "Bachelor of Technology (B.Tech) — Computer Science & Engineering" : "Bachelor of Design (B.Des) — Interactive Systems & Communication"}
              </p>
            </div>

            {/* GPA Matrix stats */}
            <div className="grid grid-cols-2 gap-4 mt-2 select-none">
              <div className={`rounded-xl border p-4 flex flex-col justify-between transition-colors ${isDark ? "bg-[#141210] border-zinc-850" : "bg-[#FAF8F5] border-zinc-200"
                }`}>
                <span className="text-[9px] text-zinc-450 font-mono tracking-widest uppercase">CUMULATIVE CGPA</span>
                <div className="mt-1">
                  <span className={`text-3xl font-serif font-black transition-colors ${isDark ? "text-zinc-105" : "text-[#1E1E1E]"
                    }`}>8.14</span>
                  <span className="text-zinc-400 font-mono text-xs ml-1">/ 10.0</span>
                </div>
              </div>
              <div className={`rounded-xl border p-4 flex flex-col justify-between transition-colors ${isDark ? "bg-[#141210] border-zinc-850" : "bg-[#FAF8F5] border-zinc-200"
                }`}>
                <span className="text-[9px] text-zinc-450 font-mono tracking-widest uppercase">GRADUATION TERM</span>
                <span className={`text-sm font-serif font-bold mt-1 transition-colors ${isDark ? "text-zinc-300" : "text-zinc-850"
                  }`}>Class of {activeProfile === "dinesh" ? "2027" : "2025"}</span>
              </div>
            </div>

            <motion.button
              onClick={handleDownloadPortfolio}
              animate={{
                scale: [1, 1.02, 1],
                boxShadow: isDark
                  ? ["0px 0px 0px rgba(16, 185, 129, 0)", "0px 0px 14px rgba(16, 185, 129, 0.45)", "0px 0px 0px rgba(16, 185, 129, 0)"]
                  : ["0px 0px 0px rgba(142, 126, 112, 0)", "0px 0px 14px rgba(142, 126, 112, 0.45)", "0px 0px 0px rgba(142, 126, 112, 0)"],
                borderColor: isDark
                  ? ["rgba(63, 63, 70, 0.8)", "rgba(16, 185, 129, 0.8)", "rgba(63, 63, 70, 0.8)"]
                  : ["rgba(212, 212, 216, 1)", "rgba(142, 126, 112, 0.8)", "rgba(212, 212, 216, 1)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3.5 rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer select-none border ${isDark
                ? "bg-zinc-100 text-zinc-950 border-transparent"
                : "bg-zinc-900 text-[#FAF8F5] border-transparent"
                }`}
            >
              <Download size={14} /> {activeProfile === "dinesh" ? "Download Resume (CV) PDF" : "Download Creative Portfolio PDF"}
            </motion.button>
          </div>

        </div>
      </motion.section>

      {/* ================= CERTIFICATIONS REGISTRY WITH BLUR THEMING ================= */}
      <motion.section
        id="certifications"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className={`py-16 border-t border-b relative overflow-hidden transition-colors duration-300 ${isDark ? "bg-[#090807] border-zinc-900" : "bg-[#F5F2EE]/45 border-zinc-200/40"
          }`}
      >
        {/* Glow-blob background effects based on selected theme */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {activeProfile === "dinesh" ? (
            <>
              <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-60 transition-colors ${isDark ? "bg-emerald-800/10" : "bg-emerald-300/20"
                }`} />
              <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-60 transition-colors ${isDark ? "bg-teal-900/10" : "bg-teal-200/15"
                }`} />
            </>
          ) : (
            <>
              <div className={`absolute top-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-75 transition-colors ${isDark ? "bg-[#8E7E70]/10" : "bg-[#E5D3C3]/35"
                }`} />
              <div className={`absolute bottom-10 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-75 transition-colors ${isDark ? "bg-[#D5C2B1]/10" : "bg-[#D5C2B1]/30"
                }`} />
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 select-none">
            <div>
              <span className={`font-mono text-[9px] tracking-widest uppercase font-bold block mb-2 transition-colors ${isDark ? "text-zinc-450" : "text-[#8E7E70]"
                }`}>
                {activeProfile === "dinesh" ? "04 // BACKEND SPECIFICATIONS" : "04 // DESIGN VERIFICATIONS"}
              </span>
              <h3 className={`font-serif text-3xl font-black leading-none uppercase transition-colors ${isDark ? "text-zinc-105" : "text-[#1E1E1E]"
                }`}>
                Certifications.
              </h3>
            </div>
            <p className={`text-xs font-mono uppercase tracking-wider mt-2 md:mt-0 font-bold transition-colors ${isDark ? "text-zinc-500" : "text-[#8E7E70]"
              }`}>
              {activeProfile === "dinesh" ? "System-verified credentials" : "Creative domain endorsements"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllCertifications ? certifications : certifications?.slice(0, 3)).map((cert, idx) => {
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => setActiveCertification(cert)}
                  className={`relative p-6 rounded-2xl border backdrop-blur-md overflow-hidden shadow-xs flex flex-col justify-between min-h-[190px] transition-all duration-300 cursor-pointer ${isDark
                    ? activeProfile === "dinesh"
                      ? "bg-[#11100F]/70 border-emerald-950/45 hover:border-emerald-500/50 hover:bg-[#141211]/90 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                      : "bg-[#11100F]/70 border-zinc-900/60 hover:border-[#8E7E70]/50 hover:bg-[#141211]/90 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                    : activeProfile === "dinesh"
                      ? "bg-white/45 border-[#A7F3D0]/30 hover:border-emerald-500/50 hover:bg-white/65 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                      : "bg-[#FAF8F5]/50 border-white/60 hover:border-[#8E7E70]/50 hover:bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    }`}
                >
                  {/* Frosted glow highlight bubble */}
                  <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full blur-xl opacity-40 transition-colors ${activeProfile === "dinesh" ? "bg-emerald-400" : "bg-[#8E7E70]"
                    }`} />

                  {/* Top content */}
                  <div>
                    <div className="flex justify-between items-start mb-4 select-none">
                      <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold transition-colors ${isDark ? "bg-[#1C1A18] text-zinc-400" : "bg-zinc-200/50 text-zinc-650"
                        }`}>
                        {cert.year}
                      </span>
                      {activeProfile === "dinesh" ? (
                        <span className="text-[9px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> VERIFIED_ID
                        </span>
                      ) : (
                        <span className="text-[9px] font-serif text-[#8E7E70] italic">
                          ✦ Creative Lic.
                        </span>
                      )}
                    </div>

                    <h4 className={`text-base font-bold leading-tight tracking-tight max-w-[90%] transition-colors ${isDark ? "text-zinc-150" : "text-zinc-900"
                      } ${activeProfile === "dinesh" ? "font-sans" : "font-serif"
                      }`}>
                      {cert.name}
                    </h4>
                  </div>

                  {/* Bottom issuer block inside custom container */}
                  <div className={`mt-6 pt-3 border-t flex justify-between items-center select-none transition-colors ${isDark ? "border-zinc-850/70" : "border-zinc-200/60"
                    }`}>
                    <div>
                      <span className={`text-[9px] font-mono tracking-widest uppercase block transition-colors ${isDark ? "text-zinc-500" : "text-[#8E7E70]"
                        }`}>
                        ISSUING AUTHORITY
                      </span>
                      <span className={`text-xs font-bold block mt-0.5 transition-colors relative z-10 ${isDark ? "text-zinc-350" : "text-zinc-700"
                        }`}>
                        {cert.issuer}
                      </span>
                    </div>
                    {/* Visual Stamp/Seal badge or Uploaded Certificate Image Thumbnail */}
                    {getImageUrl(cert.certificateImage) ? (
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-emerald-500/40 shrink-0 shadow-xs">
                        <img
                          src={getImageUrl(cert.certificateImage)!}
                          alt={cert.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center opacity-70 shrink-0 transition-colors ${isDark
                        ? activeProfile === "dinesh"
                          ? "bg-emerald-950/20 border-emerald-900/35 text-emerald-400 font-mono text-[9px] font-bold"
                          : "bg-zinc-900 border-zinc-800 text-[#8E7E70] font-serif text-[10px] italic font-semibold"
                        : activeProfile === "dinesh"
                          ? "bg-emerald-50/25 border-emerald-500/20 text-emerald-600 font-mono text-[9px] font-bold"
                          : "bg-[#8E7E70]/5 border-[#8E7E70]/20 text-[#8E7E70] font-serif text-[10px] italic font-semibold"
                        }`}>
                        {activeProfile === "dinesh" ? "JVM" : "SOD"}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View More / View Less Toggle Button for Certifications */}
          {data.certifications && data.certifications.length > 3 && (
            <div className="flex justify-center mt-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllCertifications(!showAllCertifications)}
                className={`cursor-pointer px-6 py-3 font-mono text-[11px] font-bold tracking-widest uppercase border-2 rounded-full transition-all flex items-center gap-2.5 select-none ${isDark
                  ? "bg-[#0E0D0C] border-zinc-800 text-zinc-350 hover:text-emerald-400 hover:border-emerald-500/50 shadow-sm"
                  : "bg-white border-zinc-300 text-zinc-700 hover:bg-[#FAF8F5] hover:text-[#8E7E70] hover:border-[#8E7E70] shadow-xs"
                  }`}
              >
                <span>{showAllCertifications ? "Collapse Credentials (Show Less)" : "Load More Certifications (View More)"}</span>
                <span className={isDark ? "text-emerald-500" : "text-[#8E7E70]"}>
                  {showAllCertifications ? "▲" : "▼"}
                </span>
              </motion.button>
            </div>
          )}
        </div>
      </motion.section>

      {/* ================= PROFESSIONAL EXPERIENCE TIMELINE (DOUBLE COLUMN) ================= */}
      <motion.section
        id="timeline"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className={`border-t transition-colors duration-300 py-16 ${isDark ? "bg-[#090807] border-zinc-900" : "bg-[#FAF8F5] border-zinc-200/60"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <span className={`font-mono text-[9px] tracking-widest uppercase font-bold block mb-2 select-none transition-colors ${isDark ? "text-zinc-450" : "text-[#8E7E70]"
            }`}>
            05 // CHRONOLOGICAL MATRIX
          </span>
          <h3 className={`font-serif text-3xl font-black leading-none mb-10 select-none uppercase transition-colors ${isDark ? "text-zinc-100" : "text-[#1E1E1E]"
            }`}>
            Experience record.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Column 1: Internships / Project Work */}
            <div className="flex flex-col gap-6">
              <h4 className={`font-mono text-[10px] uppercase font-bold pb-2 flex items-center gap-1.5 select-none transition-colors border-b ${isDark ? "text-zinc-500 border-zinc-850" : "text-zinc-400 border-zinc-200"
                }`}>
                <Briefcase size={12} /> {activeProfile === "dinesh" ? "Developer Trainee & Track Records" : "Professional Internships"}
              </h4>
              {data.experiences1.map((exp, idx) => (
                <div
                  key={idx}
                  className={`border p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-2xs ${isDark
                    ? "bg-[#0E0D0C] border-zinc-850 hover:border-emerald-800"
                    : "bg-white border-zinc-200 hover:border-[#D5C2B1]"
                    }`}
                >
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h5 className={`text-xs font-bold transition-colors ${isDark ? "text-zinc-150" : "text-zinc-850"
                        }`}>
                        {exp.role}
                      </h5>
                      <span className={`text-[9px] font-mono rounded-full px-2.5 py-0.5 select-none transition-colors ${isDark ? "bg-[#181614] text-zinc-400" : "bg-zinc-100 text-[#8E7E70]"
                        }`}>
                        {exp.period}
                      </span>
                    </div>
                    <span className={`text-[10px] uppercase font-mono font-medium block mt-1 select-none transition-colors ${isDark ? "text-zinc-500" : "text-zinc-450"
                      }`}>
                      {exp.organization}
                    </span>
                    <p className={`text-[11px] leading-relaxed mt-3 transition-colors ${isDark ? "text-zinc-400" : "text-zinc-550"
                      }`}>
                      {exp.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2: Leadership Positions */}
            <div className="flex flex-col gap-6">
              <h4 className={`font-mono text-[10px] uppercase font-bold pb-2 flex items-center gap-1.5 select-none transition-colors border-b ${isDark ? "text-zinc-500 border-zinc-850" : "text-zinc-400 border-zinc-200"
                }`}>
                <Layers size={12} /> Community leadership
              </h4>
              {data.experiences2.map((exp, idx) => (
                <div
                  key={idx}
                  className={`border p-5 rounded-2xl flex flex-col justify-between transition-all duration-300 shadow-2xs ${isDark
                    ? "bg-[#0E0D0C] border-zinc-850 hover:border-emerald-800"
                    : "bg-white border-[#ECEAE7] hover:border-[#D5C2B1]"
                    }`}
                >
                  <div>
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h5 className={`text-xs font-bold transition-colors ${isDark ? "text-zinc-150" : "text-zinc-850"
                        }`}>
                        {exp.role}
                      </h5>
                      <span className={`text-[9px] font-mono rounded-full px-2.5 py-0.5 select-none transition-colors ${isDark ? "bg-[#181614] text-zinc-400" : "bg-zinc-100 text-[#8E7E70]"
                        }`}>
                        {exp.period}
                      </span>
                    </div>
                    <span className={`text-[10px] uppercase font-mono font-medium block mt-1 select-none transition-colors ${isDark ? "text-zinc-500" : "text-zinc-450"
                      }`}>
                      {exp.organization}
                    </span>
                    <p className={`text-[11px] leading-relaxed mt-3 transition-colors ${isDark ? "text-zinc-400" : "text-zinc-550"
                      }`}>
                      {exp.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </motion.section>

      {/* ================= CONTACT SECTION ================= */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className={`py-20 border-t transition-colors duration-300 ${isDark ? "bg-[#090807] border-zinc-900" : "bg-[#ECEAE7]/30 border-zinc-200/50"
          }`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center select-none font-sans">

          <span className={`font-mono text-[9px] tracking-widest uppercase font-bold transition-colors ${isDark ? "text-zinc-500" : "text-[#8E7E70]"
            }`}>
            06 // COLLABORATIVE DISPOSAL
          </span>

          <h2 className={`font-serif text-3xl md:text-5xl font-black mt-4 tracking-tight transition-colors ${isDark ? "text-zinc-100" : "text-[#1E1E1E]"
            }`}>
            {activeProfile === "dinesh" ? "Let's engineer modular systems." : "Let's map human experiences."} <br />
            <span className={isDark ? "text-emerald-500/80" : "text-[#8E7E70]"}>
              {activeProfile === "dinesh" ? "Let's compile robust backends." : "Let's build real solutions."}
            </span>
          </h2>

          <p className={`text-xs md:text-sm max-w-xl mx-auto mt-4 leading-relaxed transition-colors ${isDark ? "text-zinc-400" : "text-zinc-650"
            }`}>
            {activeProfile === "dinesh"
              ? "Actively looking for Java developer roles, software engineer freshener positions, or spring-boot backend integrations."
              : "Currently accepting professional junior UI/UX designer positions, high-fidelity interaction design consultations, and remote co-creation contracts."}
          </p>

          {/* Social icons display cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            {data.contacts.map((c, idx) => (
              <a
                key={idx}
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className={`p-5 rounded-2xl border transition-all duration-300 shadow-2xs hover:shadow-sm ${isDark
                  ? "bg-[#0E0D0C] border-zinc-900 hover:border-emerald-800 text-zinc-300"
                  : "bg-white border-zinc-200 hover:border-[#D5C2B1] text-zinc-850"
                  }`}
              >
                <div className="text-lg mb-2 flex items-center justify-center">
                  {c.platform.toLowerCase() === "linkedin" && <Linkedin size={18} className={isDark ? "text-zinc-450" : "text-zinc-600"} />}
                  {c.platform.toLowerCase() === "email" && <Mail size={18} className={isDark ? "text-zinc-450" : "text-zinc-600"} />}
                  {c.platform.toLowerCase() === "github" && <span className="font-bold text-sm">Git</span>}
                  {c.platform.toLowerCase() === "behance" && <span className="font-bold text-sm">Be</span>}
                </div>
                <h4 className={`text-xs font-bold leading-none uppercase transition-colors ${isDark ? "text-zinc-100" : "text-zinc-900"
                  }`}>
                  {c.platform}
                </h4>
                <span className="text-[10px] text-zinc-450 font-mono block mt-1.5 truncate">
                  {c.value}
                </span>
              </a>
            ))}
          </div>

          <div className="text-zinc-500 font-mono text-[9px] mt-16 select-none uppercase tracking-widest">
            {activeProfile === "dinesh"
              ? "Siddartha Institute of Science and Technology, Puttur (SISTK) • B.Tech CSE '27"
              : "UPES School of Design (SOD) • Communication Design '25"}
          </div>

        </div>
      </motion.section>

      {/* ================= DETAIL SPEC SHEET MODAL OVERLAY ================= */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative font-sans border transition-colors duration-300 cursor-default ${isDark
                ? "bg-[#0E0D0C] border-zinc-850 text-zinc-100"
                : "bg-[#FAF8F5] border-zinc-250 text-zinc-800"
                }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className={`absolute top-6 right-6 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer select-none z-50 hover:scale-105 active:scale-95 ${isDark ? "bg-[#181614] text-zinc-400 hover:bg-zinc-800" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                aria-label="Close"
              >
                <X size={14} />
              </button>

              {/* Cover layout banner */}
              <div className={`p-6 sm:p-8 pb-4 relative border-b ${isDark ? "border-zinc-850" : "border-zinc-200"
                }`}>
                <span className={`text-[9px] font-mono tracking-wider block uppercase font-bold select-none transition-colors ${isDark ? "text-zinc-500" : "text-[#8E7E70]"
                  }`}>
                  Core Structural Analysis // Slide #{activeProject.number}
                </span>
                <h3 className={`text-2xl sm:text-3xl font-serif font-black tracking-tight mt-1.5 uppercase transition-colors ${isDark ? "text-zinc-100" : "text-[#1E1E1E]"
                  }`}>
                  {activeProject.title}
                </h3>
                <p className={`text-xs sm:text-sm mt-1 sm:mt-2 leading-relaxed font-sans font-medium transition-colors ${isDark ? "text-zinc-400" : "text-zinc-650"
                  }`}>
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Specs detailed analysis grids */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">

                {/* Challenge, solution, outcomes metrics logs */}
                <div className="md:col-span-8 space-y-6">
                  <div>
                    <h5 className={`font-serif font-bold text-xs sm:text-sm uppercase tracking-wide select-none flex items-center gap-1.5 transition-colors ${isDark ? "text-zinc-200" : "text-[#1E1E1E]"
                      }`}>
                      <Activity size={13} className={isDark ? "text-emerald-500" : "text-[#8E7E70]"} /> {activeProfile === "dinesh" ? "Structural Engineering Challenge" : "Standard UX Challenge"}
                    </h5>
                    <p className={`text-xs sm:text-sm mt-2 leading-relaxed transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"
                      }`}>
                      {activeProject.details?.challenge}
                    </p>
                  </div>

                  <div>
                    <h5 className={`font-serif font-bold text-xs sm:text-sm uppercase tracking-wide select-none flex items-center gap-1.5 transition-colors ${isDark ? "text-zinc-200" : "text-[#1E1E1E]"
                      }`}>
                      <Sparkles size={13} className={isDark ? "text-emerald-500" : "text-[#8E7E70]"} /> {activeProfile === "dinesh" ? "Engineered Solution Strategy" : "Prototyped Solution"}
                    </h5>
                    <p className={`text-xs sm:text-sm mt-2 leading-relaxed font-sans transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"
                      }`}>
                      {activeProject.details?.solution}
                    </p>
                  </div>

                  <div>
                    <h5 className={`font-serif font-bold text-xs sm:text-sm uppercase tracking-wide select-none transition-colors ${isDark ? "text-zinc-200" : "text-[#1E1E1E]"
                      }`}>
                      ✔ Key Outcomes & Results
                    </h5>
                    <div className="flex flex-col gap-2 mt-2">
                      {activeProject.details?.results.map((outcome, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span className={`text-xs sm:text-sm leading-snug transition-colors ${isDark ? "text-zinc-400" : "text-zinc-600"
                            }`}>
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta assignment parameters */}
                <div className={`md:col-span-4 border rounded-2xl p-5 h-fit text-xs space-y-4 transition-colors ${isDark ? "bg-[#141210] border-zinc-850" : "bg-white border-zinc-200"
                  }`}>
                  <div className="select-none">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Role Assigned</span>
                    <span className={`font-bold block mt-0.5 transition-colors ${isDark ? "text-zinc-300" : "text-zinc-850"}`}>{activeProject.details?.role}</span>
                  </div>
                  <div className="select-none">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Timeline Scope</span>
                    <span className={`font-bold block mt-0.5 transition-colors ${isDark ? "text-zinc-300" : "text-zinc-850"}`}>{activeProject.details?.timeline}</span>
                  </div>
                  <div className="select-none">
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Integrations & Systems</span>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {activeProject.techTags.map((tag, tIdx) => (
                        <span key={tIdx} className={`border font-mono text-[9px] px-2 py-0.5 rounded transition-all ${isDark ? "bg-[#1C1A18] text-zinc-400 border-zinc-805" : "bg-zinc-100 text-zinc-550 border-zinc-200/50"
                          }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom ribbon with GitHub & Live Demo links */}
              <div className={`border-t px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 select-none transition-colors ${isDark ? "bg-[#141210] border-zinc-850" : "bg-[#ECEAE7]/30 border-zinc-200"
                }`}>
                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                  {activeProfile === "dinesh" ? "SISTK ACADEMIC OFFICE • VERIFIED SPEC SHEET" : "SOD UPES ACADEMIC REGION"}
                </span>

                <div className="flex items-center gap-2.5">
                  {/* GitHub Repository Link */}
                  <a
                    href={activeProject.githubUrl || "https://github.com/dineshkumar2kk5"}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-3.5 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer border ${isDark
                      ? "bg-zinc-900 hover:bg-zinc-800 border-zinc-750 text-zinc-200 hover:text-white"
                      : "bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800"
                      }`}
                  >
                    <Github size={14} className="text-emerald-500" />
                    <span>GitHub Repo</span>
                  </a>

                  {/* Live Demo Link */}
                  <a
                    href={activeProject.liveUrl || "http://localhost:8080/admin/projects"}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= CERTIFICATE DETAIL MODAL OVERLAY ================= */}
      <AnimatePresence>
        {activeCertification && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertification(null)}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-2xl w-full max-w-5xl bg-zinc-950/90 border border-zinc-800/60 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCertification(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer select-none z-50 hover:scale-105 active:scale-95 backdrop-blur-sm border border-zinc-700/50"
                aria-label="Close"
              >
                <X size={14} />
              </button>

              {getImageUrl(activeCertification.certificateImage) ? (
                /* ===== IMAGE VIEW MODE ===== */
                <div className="flex flex-col">
                  {/* Certificate Image */}
                  <div className="relative w-full flex items-center justify-center bg-zinc-900/50 p-4 sm:p-8">
                    <img
                      src={getImageUrl(activeCertification.certificateImage)!}
                      alt={`${activeCertification.name} Certificate`}
                      className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-lg select-none"
                      draggable={false}
                    />
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="px-6 py-4 border-t border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-950/80 backdrop-blur-sm">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-zinc-100 tracking-tight">{activeCertification.name}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{activeCertification.issuer}</span>
                        <span className="text-[10px] font-mono text-zinc-600">•</span>
                        <span className="text-[10px] font-mono text-zinc-500">{activeCertification.issueDate}</span>
                      </div>
                    </div>
                    {activeCertification.credentialId && (
                      <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800/50 select-none">
                        ID: {activeCertification.credentialId}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* ===== NO IMAGE - INFO CARD MODE ===== */
                <div className="p-8 sm:p-12 flex flex-col items-center text-center">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 border border-zinc-700/40 flex items-center justify-center mb-6">
                    <Award size={28} className="text-zinc-400" />
                  </div>

                  <h3 className="text-xl font-bold text-zinc-100 tracking-tight mb-2">{activeCertification.name}</h3>
                  <p className="text-sm text-zinc-400 font-mono mb-6">{activeCertification.issuer}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md mb-6">
                    <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-xl p-3 text-center">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Year</span>
                      <span className="text-sm font-bold text-zinc-200">{activeCertification.year}</span>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-xl p-3 text-center">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Issued</span>
                      <span className="text-sm font-bold text-zinc-200">{activeCertification.issueDate || "—"}</span>
                    </div>
                    <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-xl p-3 text-center col-span-2 sm:col-span-1">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">Credential</span>
                      <span className="text-xs font-bold text-zinc-200 font-mono">{activeCertification.credentialId || "—"}</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500 font-mono italic">Certificate image not available</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FLOATING AI ASSISTANT HUB ================= */}
      <AiRecruiter />

    </div>
  );
}
