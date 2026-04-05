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
    <div className="min-h-screen py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass p-8 rounded-[2.5rem] text-center border-primary/20">
              <div className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary p-1 bg-surface-container overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container">
                    <UserIcon className="w-12 h-12 text-on-surface-variant" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-black text-on-background tracking-tighter mb-1">{user.displayName || "Commander"}</h2>
              <p className="text-sm text-on-surface-variant font-mono mb-6">{user.email}</p>
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
                <Shield className="w-3 h-3" />
                {profile?.loyaltyTier || "Nebula"} Tier
              </div>
            </div>

            <div className="glass rounded-[2.5rem] overflow-hidden border-outline-variant/50">
              {[
                { icon: UserIcon, label: "Profile Settings", active: true },
                { icon: History, label: "Order History" },
                { icon: Star, label: "Loyalty Rewards" },
                { icon: Settings, label: "System Config" },
                { icon: LogOut, label: "Terminate Session", danger: true, onClick: handleLogout },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={item.onClick}
                  className={cn(
                    "w-full flex items-center gap-4 px-8 py-5 text-sm font-bold transition-all border-b border-outline-variant last:border-0",
                    item.active ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-container/50",
                    item.danger && "text-red-400 hover:bg-red-400/10"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-[2.5rem] border-tertiary/20">
                <div className="flex items-center justify-between mb-4">
                  <Coffee className="w-8 h-8 text-tertiary" />
                  <span className="text-xs font-black text-tertiary uppercase tracking-widest">Total Fuel</span>
                </div>
                <div className="text-4xl font-black text-on-background mb-1">{profile?.totalBrews || 0}</div>
                <p className="text-sm text-on-surface-variant">Precision Brews Consumed</p>
              </div>
              <div className="glass p-8 rounded-[2.5rem] border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <Star className="w-8 h-8 text-primary" />
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Favorite Roast</span>
                </div>
                <div className="text-xl font-black text-on-background mb-1 truncate">{profile?.favoriteRoast || "None yet"}</div>
                <p className="text-sm text-on-surface-variant">Primary Energy Source</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="glass p-8 rounded-[2.5rem] border-outline-variant/50">
              <h3 className="text-xl font-black text-on-background tracking-tighter mb-8 flex items-center gap-3">
                <History className="w-6 h-6 text-primary" />
                RECENT TRANSMISSIONS
              </h3>
              
              <div className="py-12 text-center">
                <p className="text-on-surface-variant text-sm">No recent fuel transmissions found in your orbit.</p>
                <button 
                  onClick={() => navigate("/menu")}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  EXPLORE MENU
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
