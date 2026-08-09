import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, CornerDownLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function AiRecruiter({ isDark = false }: { isDark?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      content: "Hello! I am shifting context to guide you through this dynamic showcase. Ask me anything about our academic standings, backend architectures, UI guidelines, or professional experience records!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about MedSync",
    "Java concurrency experience?",
    "Where did Dinesh study?",
    "Oracle Java Certifications?",
    "Core Spring Boot skills?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map state messages to API format
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      if (!response.ok) {
        throw new Error("Local API connection failed.");
      }

      const data = await response.json();
      
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (e) {
      console.warn("API Error, falling back to heuristic answers:", e);
      // Simulate slow local thinking
      setTimeout(() => {
        const botMsg: Message = {
          id: `b-${Date.now()}`,
          role: "assistant",
          content: "I'm having trouble reaching my neural brain right now, but feel free to review all my Spring Boot backend projects on this page, or download my developer CV resume! You can also reach me directly at dineshkumar2kk5@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      }, 800);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Dynamic Bubble Launch Button */}
      <motion.button
        id="ai-bot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#1E1E1E] hover:bg-[#2C2C2B] text-white flex items-center justify-center shadow-2xl cursor-pointer relative group-hover:border group"
      >
        <div className="absolute inset-0.5 rounded-full border border-dashed border-white/20 group-hover:border-white/50 transition-colors" />
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
        
        {/* Animated small indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </motion.button>

      {/* Expandable Chat Hub Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-bot-container"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className={`absolute bottom-18 right-0 w-80 sm:w-96 h-[480px] border rounded-2xl overflow-hidden flex flex-col transition-colors duration-300 ${
              isDark 
                ? "bg-[#0F0E0C] border-zinc-800 shadow-[0_24px_48px_rgba(0,0,0,0.45)]" 
                : "bg-white border-zinc-200 shadow-[0_24px_48px_rgba(0,0,0,0.15)]"
            }`}
          >
            {/* Header */}
            <div className={`p-4 flex items-center justify-between select-none border-b transition-colors ${
              isDark ? "bg-[#1C1A17] border-zinc-850 text-white" : "bg-[#1E1E1E] border-zinc-900 text-white"
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                  isDark ? "bg-zinc-800 text-[#D5C2B1]" : "bg-linear-to-tr from-[#D5C2B1] to-[#D5C2B1]/60 text-zinc-900"
                }`}>
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-display tracking-tight uppercase flex items-center gap-1.5 leading-none">
                    Recruiter Assistant
                  </h4>
                  <span className={`text-[9px] font-mono leading-none block mt-1 ${isDark ? "text-[#C4B4A5]" : "text-[#D5C2B1]"}`}>
                    AGENT VER-2.5 ● GEMINI
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Conversation Feed */}
            <div
              ref={scrollRef}
              className={`flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin ${
                isDark 
                  ? "bg-[#131210] scrollbar-thumb-zinc-800 text-zinc-200" 
                  : "bg-zinc-50 scrollbar-thumb-zinc-200 text-zinc-800"
              }`}
            >
              {messages.map((m) => {
                const isBot = m.role === "assistant";
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2 max-w-[85%] ${isBot ? "self-start" : "self-end flex-row-reverse"}`}
                  >
                    {/* Visual avatar badge */}
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] uppercase font-bold select-none ${
                      isBot 
                        ? (isDark ? "bg-zinc-800 text-[#C4B4A5]" : "bg-zinc-850 text-[#D5C2B1]")
                        : (isDark ? "bg-zinc-900 text-zinc-450" : "bg-zinc-200 text-zinc-650")
                    }`}>
                      {isBot ? <Bot size={12} /> : <User size={12} />}
                    </div>
                    {/* Bubble box */}
                    <div className="flex flex-col gap-1">
                      <div className={`p-3 text-[11.5px] leading-relaxed rounded-2xl shadow-xs border ${
                        isBot 
                          ? (isDark 
                            ? "bg-[#1B1A17] text-zinc-200 rounded-tl-xs border-zinc-850" 
                            : "bg-white text-zinc-800 rounded-tl-xs border-zinc-200/50") 
                          : (isDark
                            ? "bg-emerald-950/40 text-emerald-100 rounded-tr-xs border-emerald-900/30"
                            : "bg-zinc-900 text-white rounded-tr-xs border-zinc-950")
                      }`}>
                        {m.content}
                      </div>
                      <span className={`text-[8px] text-zinc-400 font-mono ${isBot ? "text-left" : "text-right"}`}>
                        {m.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Loader representation */}
              {isLoading && (
                <div className="flex gap-2 max-w-[85%] self-start animate-pulse">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isDark ? "bg-zinc-800 text-[#C4B4A5]" : "bg-zinc-850 text-[#D5C2B1]"
                  }`}>
                    <Bot size={12} />
                  </div>
                  <div className={`p-3 text-xs rounded-2xl rounded-tl-xs border ${
                    isDark ? "bg-[#1B1A17] border-zinc-850 text-zinc-400" : "bg-white border-zinc-100 text-zinc-400"
                  }`}>
                    <div className="flex gap-1 items-center justify-center h-4 py-1 select-none">
                      <div className="w-1.5 h-1.5 bg-zinc-450 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 bg-zinc-455 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 bg-zinc-455 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions Shelf */}
            <div className={`px-4 py-2 border-t select-none whitespace-nowrap overflow-x-auto scrollbar-none flex gap-2 ${
              isDark ? "border-zinc-850 bg-[#100F0D]" : "border-zinc-100 bg-white"
            }`}>
              {suggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(s)}
                  className={`px-2.5 py-1 text-[10px] rounded-full transition-colors cursor-pointer inline-block border ${
                    isDark 
                      ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700" 
                      : "bg-zinc-100 border-zinc-200 text-zinc-650 hover:bg-[#ECEAE7] hover:border-zinc-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Input form */}
            <div className={`p-3 border-t  ${
              isDark ? "border-zinc-850 bg-[#0F0E0C]" : "border-zinc-250 bg-white"
            }`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(inputValue);
                }}
                className={`flex items-center rounded-xl px-3 py-1 border transition-all ${
                  isDark 
                    ? "bg-[#141210] border-zinc-800 focus-within:ring-zinc-705 focus-within:border-zinc-705" 
                    : "bg-zinc-50 border-zinc-200 focus-within:ring-1 focus-within:ring-zinc-400 focus-within:border-zinc-400"
                }`}
              >
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={`flex-1 bg-transparent py-2.5 text-xs outline-hidden border-none ${
                    isDark ? "text-zinc-250 placeholder-zinc-500" : "text-zinc-800 placeholder-zinc-400"
                  }`}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    inputValue.trim() && !isLoading
                      ? (isDark ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-zinc-900 text-white hover:bg-zinc-800")
                      : "text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={12} />
                </button>
              </form>
              <div className="flex items-center justify-between text-[8px] text-zinc-400 mt-2 px-1 select-none font-mono">
                <span>PRESS ENTER TO SEND</span>
                <span className="flex items-center gap-0.5"><CornerDownLeft size={8} /> SEND</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
