import React, { useState } from "react";
import { Shield, Lock, Mail, ArrowRight, Chrome } from "lucide-react";
import { useAuth } from "../lib/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, register, googleAdminLogin } = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleAdminLogin();
      navigate("/admin");
    } catch (error) {
      console.error("Admin Google Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password, 'admin');
      } else {
        await register(email, password, 'admin');
      }
      navigate('/admin');
    } catch (error) {
      console.error("Admin Auth Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#0B0F1A]">
      <div className="max-w-md w-full glass rounded-[2.5rem] p-10 shadow-2xl shadow-primary/20 border-primary/30">
        <div className="text-center mb-10">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-black text-on-background tracking-tighter mb-2">
            COMMAND CENTER
          </h2>
          <p className="text-on-surface-variant text-sm">
            {isLogin ? "Authenticate to access administrative controls." : "Establish new command sequence."}
          </p>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          type="button"
          disabled={loading}
          className="w-full py-4 rounded-2xl glass border-outline-variant flex items-center justify-center gap-3 text-on-background font-bold hover:bg-surface-container transition-all active:scale-[0.98] disabled:opacity-50 mb-6"
        >
          <Chrome className="w-5 h-5 text-primary" />
          Continue with Google
        </button>
        
        <div className="flex items-center gap-4 text-on-surface-variant mb-6">
          <div className="h-px flex-1 bg-outline-variant" />
          <span className="text-[10px] font-black uppercase tracking-widest">OR</span>
          <div className="h-px flex-1 bg-outline-variant" />
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Frequency</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
                className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 pl-12 pr-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-1">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-surface-container border border-outline-variant rounded-xl py-4 pl-12 pr-5 text-on-background focus:ring-2 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-primary text-background font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-primary/20 mt-4 disabled:opacity-50"
          >
            {isLogin ? "AUTHORIZE" : "ESTABLISH PROTOCOL"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary font-bold hover:underline"
          >
            {isLogin ? "Configure New Command Token?" : "Return to Authorization?"}
          </button>
        </div>
      </div>
    </div>
  );
}
