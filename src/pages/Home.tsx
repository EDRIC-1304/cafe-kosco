import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Coffee, Zap, ShieldCheck, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/10 rounded-full blur-[120px] animate-pulse [animation-delay:2s]" />
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-surface-container border border-outline-variant text-xs font-bold uppercase tracking-widest text-primary mb-8">
              System Online: Precision Brewing v2.5
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-on-background mb-8 leading-[0.9]">
              FUEL YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">GALACTIC ASCENT</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
              Café Kosco merges ancient roasting rituals with futuristic extraction technology. 
              Experience coffee re-engineered for the modern traveler.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/menu"
                className="px-8 py-4 rounded-xl bg-primary text-background font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
              >
                EXPLORE MENU
              </Link>
              <Link
                to="/auth"
                className="px-8 py-4 rounded-xl glass text-on-background font-bold text-lg hover:bg-surface-container transition-colors"
              >
                JOIN THE ORBIT
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-8 bg-surface-container/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Coffee, title: "Precision Brewing", desc: "AI-monitored extraction curves for the perfect cup every time." },
            { icon: Zap, title: "Instant Sync", desc: "Order from your terminal and pick up at the nearest docking station." },
            { icon: ShieldCheck, title: "Secure Protocol", desc: "Your loyalty data is encrypted and stored in the Kosco cloud." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-8 glass rounded-3xl group hover:border-primary/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-on-background mb-4">{feature.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
        <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[4rem] text-center relative z-10 border-primary/20">
          <Star className="w-12 h-12 text-tertiary mx-auto mb-8 animate-spin-slow" />
          <h2 className="text-4xl md:text-5xl font-black text-on-background mb-8 tracking-tighter">READY TO UPGRADE YOUR FUEL?</h2>
          <p className="text-lg text-on-surface-variant mb-12 max-w-xl mx-auto">
            Join 10,000+ cosmic travelers who have optimized their daily routine with Café Kosco.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-tertiary text-background font-black text-xl hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-tertiary/20"
          >
            START YOUR MISSION
          </Link>
        </div>
      </section>
    </div>
  );
}
