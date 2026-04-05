import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  ReceiptText, 
  Sparkles, 
  Settings, 
  Plus, 
  X, 
  Send,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'orders' | 'rewards' | 'settings'>('chat');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Greetings, Pilot. Need help navigating the cosmic menu or checking your brewing stats?' }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Analyzing your request... I've updated your coordinates. Anything else?" 
      }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 transition-transform z-50"
      >
        <Bot className="text-background" />
      </button>
    );
  }

  return (
    <motion.aside 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="fixed bottom-6 right-6 w-80 h-[480px] glass rounded-2xl shadow-2xl shadow-violet-500/10 flex flex-col p-4 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Bot className="text-primary size-5" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface"></div>
          </div>
          <div>
            <h3 className="text-lg font-bold leading-none">Kosco AI</h3>
            <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">Precision Brewing Guide</span>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-secondary hover:text-white transition-colors">
          <X className="size-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-4 gap-1 mb-4">
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'chat' ? 'bg-outline-variant text-tertiary' : 'text-secondary hover:bg-surface-container'}`}
        >
          <Bot className="size-4" />
          <span className="text-[9px] uppercase font-bold">Chat</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-outline-variant text-tertiary' : 'text-secondary hover:bg-surface-container'}`}
        >
          <ReceiptText className="size-4" />
          <span className="text-[9px] uppercase font-bold">Orders</span>
        </button>
        <button 
          onClick={() => setActiveTab('rewards')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'rewards' ? 'bg-outline-variant text-tertiary' : 'text-secondary hover:bg-surface-container'}`}
        >
          <Sparkles className="size-4" />
          <span className="text-[9px] uppercase font-bold">Rewards</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-outline-variant text-tertiary' : 'text-secondary hover:bg-surface-container'}`}
        >
          <Settings className="size-4" />
          <span className="text-[9px] uppercase font-bold">Settings</span>
        </button>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-primary/20 text-primary border border-primary/20 rounded-tr-none' 
                : 'bg-outline-variant text-[#fafafa] rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-auto space-y-3">
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type inquiry..."
            className="w-full bg-surface-container border border-outline-variant rounded-xl py-2 pl-4 pr-10 text-sm focus:ring-1 focus:ring-primary outline-none"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors"
          >
            <Send className="size-4" />
          </button>
        </div>
        <button className="w-full bg-primary text-background py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
          <Plus className="size-4" />
          New Inquiry
        </button>
      </div>
    </motion.aside>
  );
}
