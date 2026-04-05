import { motion } from "motion/react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen py-24 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-black tracking-tighter text-on-background mb-8">CONTACT MISSION CONTROL</h1>
          <p className="text-lg text-on-surface-variant mb-12 mx-auto max-w-lg">
            Need technical support or have a feedback transmission? Our team is standing by to assist your journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: Mail, label: "Digital Transmission", value: "support@cafekosco.space" },
              { icon: Phone, label: "Voice Frequency", value: "+91 80 4567 8901" },
              { icon: MapPin, label: "Docking Coordinates", value: "Aldona, Bardez, Goa" },
            ].map((item, i) => (
              <div key={i} className="glass p-8 rounded-[2rem] border-outline-variant/30 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-sm font-medium text-on-background">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
