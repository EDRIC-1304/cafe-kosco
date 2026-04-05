import { motion } from "motion/react";
import { User as UserIcon, Star, Coffee, History, Settings, LogOut, Shield } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "../lib/AuthProvider";
import { logout } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <Shield className="w-16 h-16 text-primary/20 mb-6" />
        <h2 className="text-3xl font-black text-on-background tracking-tighter mb-4">ACCESS DENIED</h2>
        <p className="text-on-surface-variant max-w-xs mb-8">
          You must initiate your login sequence to access the profile orbit.
        </p>
        <button 
          onClick={() => navigate("/auth")}
          className="px-8 py-4 rounded-xl bg-primary text-background font-black text-lg"
        >
          INITIATE LOGIN
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-8 bg-[#0B0F1A]">
      <div className="max-w-xl mx-auto">
        <div className="glass p-12 rounded-[3rem] text-center border-primary/20 shadow-2xl shadow-primary/5">
          <div className="w-40 h-40 rounded-full mx-auto mb-8 border-4 border-primary p-2 bg-surface-container overflow-hidden">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-container">
                <UserIcon className="w-16 h-16 text-on-surface-variant" />
              </div>
            )}
          </div>
          <h2 className="text-3xl font-black text-on-background tracking-tighter mb-2">Callsign: {user.displayName || "Commander"}</h2>
          <p className="text-lg text-on-surface-variant font-mono mb-10">Frequency: {user.email}</p>
          
          {profile?.role === 'admin' && (
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-black uppercase tracking-widest mb-10">
              <Shield className="w-4 h-4" />
              Master Key Admin
            </div>
          )}

          <div className="glass rounded-[2rem] overflow-hidden border-outline-variant/30 text-left">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-4 px-8 py-6 text-lg font-black text-red-500 hover:bg-red-500/10 transition-all border-outline-variant"
            >
              <LogOut className="w-6 h-6" />
              De-orbit (Logout)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
