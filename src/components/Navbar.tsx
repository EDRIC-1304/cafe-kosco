import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/src/lib/utils";
import { Rocket, User as UserIcon } from "lucide-react";
import { useAuth } from "../lib/AuthProvider";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (clickCount >= 3) {
      setClickCount(0);
      navigate("/admin/auth");
    }
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [clickCount, navigate]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === "/auth") {
      e.preventDefault();
      setClickCount(prev => prev + 1);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full glass h-16 z-50 flex justify-between items-center px-8 border-b border-outline-variant">
      <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 text-2xl font-black tracking-tighter text-on-background">
        <Rocket className="w-6 h-6 text-primary fill-primary/20" />
        Café Kosco
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "text-sm font-medium transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]",
              location.pathname === link.path ? "text-primary border-b-2 border-primary pb-1" : "text-on-surface-variant"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {loading ? (
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        ) : !user ? (
          <>
            <Link to="/auth" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Login
            </Link>
            <Link
              to="/auth"
              className="px-5 py-2 rounded-lg bg-primary text-background font-bold text-sm transition-transform active:scale-95 hover:brightness-110"
            >
              Join
            </Link>
          </>
        ) : (
          <Link
            to="/profile"
            className="flex items-center gap-3 glass px-4 py-2 rounded-xl hover:border-primary/50 transition-all group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest leading-none mb-1">
                {profile?.loyaltyTier || "Traveler"}
              </p>
              <p className="text-xs font-bold text-on-background leading-none">
                {user.displayName?.split(' ')[0] || "Commander"}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container border border-outline-variant overflow-hidden group-hover:border-primary transition-colors">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-on-surface-variant" />
                </div>
              )}
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
