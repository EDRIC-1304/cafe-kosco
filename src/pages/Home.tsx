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

    </div>
  );
}
