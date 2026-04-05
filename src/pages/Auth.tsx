import { useState } from "react";
import { motion } from "motion/react";
import { Rocket, Mail, Lock, User, ArrowRight, Chrome } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { signInWithGoogle } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/profile");
    } catch (error) {
      console.error("Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 glass rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 border-outline-variant/50">
        {/* Left Side: Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-primary/20 to-tertiary/10 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary/20" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-2xl font-black tracking-tighter text-on-background mb-12">
              <Rocket className="w-8 h-8 text-primary fill-primary/20" />
              Café Kosco
            </div>
            <h2 className="text-5xl font-black tracking-tighter text-on-background leading-tight mb-6">
              JOIN THE <br />
              <span className="text-primary">COSMIC</span> NETWORK
            </h2>
            <p className="text-on-surface-variant max-w-xs">
              Access your personalized brewing dashboard, track loyalty points, and unlock exclusive galactic rewards.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surface-container overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
              +12K Travelers Online
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h3 className="text-3xl font-black text-on-background tracking-tighter mb-2">
              {isLogin ? "WELCOME BACK" : "START MISSION"}
            </h3>
            <p className="text-on-surface-variant">
              {isLogin ? "Enter your credentials to re-sync." : "Create your account to join the orbit."}
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-4 rounded-2xl glass border-outline-variant flex items-center justify-center gap-3 text-on-background font-bold hover:bg-surface-container transition-all active:scale-[0.98] disabled:opacity-50"
            >
              <Chrome className="w-5 h-5 text-primary" />
              Continue with Google
            </button>
            
            <div className="flex items-center gap-4 text-on-surface-variant px-4">
              <div className="h-px flex-1 bg-outline-variant" />
              <span className="text-[10px] font-black uppercase tracking-widest">OR USE FREQUENCY</span>
              <div className="h-px flex-1 bg-outline-variant" />
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Callsign</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 pl-12 pr-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Frequency</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 pl-12 pr-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Access Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 pl-12 pr-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <button className="w-full py-5 rounded-2xl bg-primary text-background font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 mt-4">
              {isLogin ? "INITIATE LOGIN" : "COMPLETE REGISTRATION"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-outline-variant text-center">
            <p className="text-sm text-on-surface-variant">
              {isLogin ? "New to the system?" : "Already have a callsign?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                {isLogin ? "Join the Orbit" : "Initiate Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
