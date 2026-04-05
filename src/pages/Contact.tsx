import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-black tracking-tighter text-on-background mb-8">CONTACT MISSION CONTROL</h1>
            <p className="text-lg text-on-surface-variant mb-12 max-w-md">
              Need technical support or have a feedback transmission? Our team is standing by to assist your journey.
            </p>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Digital Transmission", value: "support@cafekosco.space" },
                { icon: Phone, label: "Voice Frequency", value: "+91 80 4567 8901" },
                { icon: MapPin, label: "Docking Coordinates", value: "Aldona, Bardez, Goa, near Aldona Church" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-lg font-medium text-on-background">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 glass rounded-3xl border-tertiary/20">
              <h4 className="text-tertiary font-bold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse" />
                SYSTEM STATUS: OPTIMAL
              </h4>
              <p className="text-sm text-on-surface-variant">
                Average response time: 14.2 minutes. Our AI agents are currently processing 127 active inquiries.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 rounded-[3rem] border-outline-variant/50 shadow-2xl shadow-primary/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Callsign</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 px-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Frequency</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 px-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Subject</label>
                <select className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 px-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Partnership Proposal</option>
                  <option>Technical Issue</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">Transmission Content</label>
                <textarea
                  rows={5}
                  placeholder="Your message..."
                  className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 px-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                />
              </div>
              <button className="w-full py-5 rounded-2xl bg-primary text-background font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                SEND TRANSMISSION
                <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
