import React, { useState, useEffect } from "react";
import { Coffee, Star, LogOut, Shield, CheckCircle } from "lucide-react";
import { useAuth } from "../lib/AuthProvider";
import { logout, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const [menu, setMenu] = useState({
    espresso: "100",
    americano: "110",
    chicken_burger: "150",
  });

  const [specials, setSpecials] = useState({
    caramel_frappe: "170",
    chicken_tandoori_pizza: "240",
  });

  useEffect(() => {
    const fetchConfig = async () => {
      const docRef = doc(db, "systemSettings", "menuConfig");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.menu) setMenu(data.menu);
        if (data.specials) setSpecials(data.specials);
      }
    };
    fetchConfig();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "systemSettings", "menuConfig"), { menu, specials });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen py-24 px-8 bg-[#0B0F1A]">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header / Profile Module */}
        <div className="glass p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center border-primary/20 gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-on-background tracking-tighter">Command Center</h2>
              <p className="text-sm font-mono text-primary">Admin: {user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold flex items-center gap-2 hover:bg-red-500/20 transition-all border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            De-orbit
          </button>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Menu Control Hub */}
          <div className="glass p-8 rounded-[2.5rem] border-outline-variant/30">
            <h3 className="text-xl font-black text-on-background tracking-tighter flex items-center gap-3 mb-6">
              <Coffee className="w-5 h-5 text-primary" />
              MENU CONTROL HUB
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center glass p-4 rounded-2xl">
                <span className="font-bold text-on-surface-variant">Espresso (₹)</span>
                <input value={menu.espresso} onChange={(e) => setMenu({...menu, espresso: e.target.value})} type="number" className="w-24 bg-surface-container rounded-lg p-2 text-center text-on-background font-mono outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex justify-between items-center glass p-4 rounded-2xl">
                <span className="font-bold text-on-surface-variant">Americano (₹)</span>
                <input value={menu.americano} onChange={(e) => setMenu({...menu, americano: e.target.value})} type="number" className="w-24 bg-surface-container rounded-lg p-2 text-center text-on-background font-mono outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="flex justify-between items-center glass p-4 rounded-2xl">
                <span className="font-bold text-on-surface-variant">Chicken Burger (₹)</span>
                <input value={menu.chicken_burger} onChange={(e) => setMenu({...menu, chicken_burger: e.target.value})} type="number" className="w-24 bg-surface-container rounded-lg p-2 text-center text-on-background font-mono outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
          </div>

          {/* Specials Terminal */}
          <div className="glass p-8 rounded-[2.5rem] border-tertiary/20 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-on-background tracking-tighter flex items-center gap-3 mb-6">
                <Star className="w-5 h-5 text-tertiary" />
                SPECIALS TERMINAL
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center glass p-4 rounded-2xl border-tertiary/10">
                  <span className="font-bold text-on-surface-variant">Caramel Frappe (₹)</span>
                  <input value={specials.caramel_frappe} onChange={(e) => setSpecials({...specials, caramel_frappe: e.target.value})} type="number" className="w-24 bg-surface-container rounded-lg p-2 text-center text-on-background font-mono outline-none focus:ring-2 focus:ring-tertiary" />
                </div>
                <div className="flex justify-between items-center glass p-4 rounded-2xl border-tertiary/10">
                  <span className="font-bold text-on-surface-variant">Chicken Tandoori Pizza (₹)</span>
                  <input value={specials.chicken_tandoori_pizza} onChange={(e) => setSpecials({...specials, chicken_tandoori_pizza: e.target.value})} type="number" className="w-24 bg-surface-container rounded-lg p-2 text-center text-on-background font-mono outline-none focus:ring-2 focus:ring-tertiary" />
                </div>
              </div>
            </div>
            
            <button disabled={saving} className="w-full mt-8 py-5 rounded-2xl bg-primary text-background font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-primary/20">
              {saving ? "TRANSMITTING..." : success ? <><CheckCircle className="w-5 h-5" /> SYNCHRONIZED</> : "SYNC TO NETWORK"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
