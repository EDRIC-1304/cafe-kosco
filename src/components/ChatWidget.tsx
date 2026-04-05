import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      text: "Greetings, cosmic traveler! I am Kosco AI, your precision brewing guide. How can I assist your caffeine optimization today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: data.text || "Transmission error. Please try again."
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: "Mission Control is unreachable. Please check your frequency."
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 md:w-96 h-[500px] glass rounded-2xl flex flex-col overflow-hidden shadow-2xl shadow-primary/10 z-50 pt-0"
          >
            {/* Header */}
            <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container/50 relative z-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-background leading-tight">Kosco AI</h3>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">Precision Brewing Guide</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-on-surface-variant hover:text-on-background transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex items-start gap-2", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border",
                    msg.role === 'bot' ? "bg-primary/10 border-primary/20" : "bg-surface-container border-outline-variant"
                  )}>
                    {msg.role === 'bot' ? <Bot className="w-4 h-4 text-primary" /> : <User className="w-4 h-4 text-on-surface-variant" />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'bot' 
                      ? "bg-surface-container text-on-background rounded-tl-none border border-outline-variant/50 shadow-[0_0_15px_rgba(167,139,250,0.05)]" 
                      : "bg-primary text-background rounded-tr-none font-medium"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-surface-container p-3 rounded-2xl rounded-tl-none border border-outline-variant/50">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-outline-variant bg-surface-container/30">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your inquiry..."
                  className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 pl-4 pr-12 text-sm text-on-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary text-background rounded-lg flex items-center justify-center hover:brightness-110 transition-all active:scale-90"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-background flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 transition-transform active:scale-95 relative group"
      >
        <div className="absolute -inset-1 bg-primary rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
}
