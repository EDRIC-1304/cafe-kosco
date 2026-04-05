import React, { useState } from 'react';
import { 
  Rocket, 
  Menu as MenuIcon, 
  Phone, 
  User, 
  ArrowRight, 
  Stars, 
  Pizza,
  Terminal,
  Database,
  Send,
  Clock,
  Info,
  MapPin,
  Filter,
  Plus,
  Edit,
  Trash2,
  Bolt,
  ArrowUp,
  Search,
  ChevronRight,
  LogOut,
  Coffee,
  ShoppingBag,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS, MenuItem } from './types';
import AIAssistant from './components/AIAssistant';
import MenuCard from './components/MenuCard';

type Page = 'home' | 'menu' | 'contact' | 'login' | 'admin' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage onNavigate={setCurrentPage} />;
      case 'menu': return <MenuPage />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage onLogin={() => { setIsLoggedIn(true); setCurrentPage('home'); }} />;
      case 'admin': return <AdminPage />;
      case 'profile': return <ProfilePage onLogout={() => { setIsLoggedIn(false); setCurrentPage('home'); }} />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-background/40 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-8 h-16 z-50">
        <div 
          className="text-2xl font-black tracking-tighter text-[#fafafa] cursor-pointer"
          onClick={() => setCurrentPage('home')}
        >
          Café Kosco
        </div>
        <div className="hidden md:flex items-center gap-8 font-medium">
          <button 
            onClick={() => setCurrentPage('home')}
            className={`${currentPage === 'home' ? 'text-primary border-b-2 border-primary pb-1' : 'text-secondary'} hover:text-primary transition-all`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('menu')}
            className={`${currentPage === 'menu' ? 'text-primary border-b-2 border-primary pb-1' : 'text-secondary'} hover:text-primary transition-all`}
          >
            Menu
          </button>
          <button 
            onClick={() => setCurrentPage('contact')}
            className={`${currentPage === 'contact' ? 'text-primary border-b-2 border-primary pb-1' : 'text-secondary'} hover:text-primary transition-all`}
          >
            Contact
          </button>
        </div>
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <button 
              onClick={() => setCurrentPage('login')}
              className="text-secondary hover:text-primary transition-all"
            >
              Login
            </button>
          ) : (
            <button 
              onClick={() => setCurrentPage('admin')}
              className="text-secondary hover:text-primary transition-all mr-2"
            >
              Admin
            </button>
          )}
          <button 
            onClick={() => isLoggedIn ? setCurrentPage('profile') : setCurrentPage('login')}
            className="px-5 py-2 rounded-lg bg-primary text-background font-bold hover:brightness-110 transition-all"
          >
            {isLoggedIn ? 'Profile' : 'Join'}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1">
        {renderPage()}
      </div>

      {/* Footer */}
      <footer className="border-t border-outline-variant bg-surface py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-3xl font-black tracking-tighter text-white mb-6">Café Kosco</div>
            <p className="text-secondary max-w-sm">Merging traditional flavors with futuristic brewing technology. Your daily fuel source, re-engineered for the modern age.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Exploration</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li><button className="hover:text-primary transition-colors">Main Menu</button></li>
              <li><button className="hover:text-primary transition-colors">Order Tracker</button></li>
              <li><button className="hover:text-primary transition-colors">Kosco AI Help</button></li>
              <li><button className="hover:text-primary transition-colors">Franchise</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Orbit</h4>
            <ul className="space-y-4 text-secondary text-sm">
              <li><button className="hover:text-primary transition-colors">Privacy Logs</button></li>
              <li><button className="hover:text-primary transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-primary transition-colors">Carbon Offset</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary text-sm">© 2024 Café Kosco. Precision Brewed in Bengaluru.</p>
          <div className="flex gap-6">
            <Terminal className="size-5 text-secondary hover:text-primary cursor-pointer transition-colors" />
            <Database className="size-5 text-secondary hover:text-primary cursor-pointer transition-colors" />
            <Sparkles className="size-5 text-secondary hover:text-primary cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
}

// --- Pages ---

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden bg-[radial-gradient(circle_at_center,#111827_0%,#09090b_100%)]">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/10 blur-[120px] rounded-full"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-tight"
          >
            Fuel Your Day.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">The Cosmic Way.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-secondary text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Precision brewing meets astronomical flavors. Experience the next evolution of coffee and bites at Café Kosco.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => onNavigate('menu')}
              className="px-8 py-4 rounded-xl border border-primary/40 bg-primary/10 text-primary font-bold hover:bg-primary hover:text-background transition-all duration-300 shadow-[0_0_15px_rgba(167,139,250,0.15)]"
            >
              Explore Menu
            </button>
            <button className="px-8 py-4 rounded-xl border border-outline-variant text-secondary hover:text-white hover:bg-surface-container transition-all">
              Ask Assistant
            </button>
          </motion.div>
        </div>

        {/* Scrolling Banner */}
        <div className="absolute bottom-20 w-full overflow-hidden whitespace-nowrap py-4 glass border-y border-outline-variant">
          <div className="flex animate-marquee gap-12 items-center">
            {[...Array(4)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="flex items-center gap-3 text-white font-medium">
                  <Stars className="size-5 text-primary" />
                  TODAY'S SPECIAL: Caramel Frappe <span className="text-primary">₹170</span>
                </span>
                <span className="flex items-center gap-3 text-white font-medium">
                  <Pizza className="size-5 text-tertiary" />
                  HOT PICK: Chicken Tandoori Pizza <span className="text-tertiary">₹240</span>
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Celestial Selection</span>
            <h2 className="text-4xl font-bold tracking-tight text-white">Popular Across the Galaxy</h2>
          </div>
          <button 
            onClick={() => onNavigate('menu')}
            className="text-secondary hover:text-primary flex items-center gap-2 transition-colors"
          >
            View All Items <ArrowRight className="size-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENU_ITEMS.slice(0, 3).map(item => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('Coffee');
  const categories = ['Coffee', 'Beverages', 'Snacks', 'Desserts'];

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-4 text-white">Galactic Gastronomy</h1>
        <p className="text-secondary max-w-2xl mx-auto">Fuel your stellar journey with our precision-brewed elixirs and cosmic confections. Every bite is an orbit around perfection.</p>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-8 py-3 rounded-full font-bold transition-all ${
              activeCategory === cat 
                ? 'bg-primary text-background shadow-[0_0_20px_rgba(167,139,250,0.3)]' 
                : 'glass border-outline-variant text-secondary hover:text-white hover:border-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <section className="relative mb-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] opacity-50"></div>
        <div className="relative z-10 text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            Precision <span className="text-primary">Brewing</span> in Goa.
          </h1>
          <p className="text-secondary max-w-2xl mx-auto text-lg md:text-xl font-light">
            Experience the intersection of high-fidelity coffee science and the serene landscape of Bardez.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Philosophy */}
          <div className="md:col-span-8 glass rounded-2xl p-8 overflow-hidden relative group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Info className="size-5" />
                <span className="uppercase tracking-widest text-xs font-bold">The Philosophy</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">More than a cafe. A developer's sanctuary.</h2>
              <p className="text-secondary leading-relaxed mb-6">
                At Café Kosco, we treat every pour-over like a deployment. Our beans are sourced with surgical precision and roasted to highlight their unique chemical profiles. Nestled near the historic Aldona Church, we provide a high-contrast environment designed for focus, creativity, and deep work.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-surface-container px-4 py-2 rounded-lg border border-outline-variant text-sm">
                  <span className="text-tertiary font-mono">STABLE_RELEASE:</span> V2.4
                </div>
                <div className="bg-surface-container px-4 py-2 rounded-lg border border-outline-variant text-sm">
                  <span className="text-primary font-mono">LATENCY:</span> &lt; 50ms
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-1/3 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-700">
              <Rocket className="w-full h-full text-primary" />
            </div>
          </div>

          {/* Hours */}
          <div className="md:col-span-4 glass rounded-2xl p-8 flex flex-col justify-between border-primary/20">
            <div>
              <div className="flex items-center gap-2 text-tertiary mb-6">
                <Clock className="size-5" />
                <span className="uppercase tracking-widest text-xs font-bold">Uptime</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Daily Operations</span>
                  <span className="text-white font-mono">06:00 AM</span>
                </div>
                <div className="h-px bg-outline-variant w-full"></div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Shutdown</span>
                  <span className="text-white font-mono">07:00 PM</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
                <span className="text-xs text-tertiary uppercase font-bold tracking-tighter">System Status: Active</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-8">Direct Query</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase text-secondary font-bold">Identifier</label>
                  <input className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="User Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase text-secondary font-bold">Endpoint (Email)</label>
                  <input className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="user@domain.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase text-secondary font-bold">Payload (Message)</label>
                <textarea className="w-full bg-surface-container border border-outline-variant rounded-lg p-3 text-white focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Request data..." rows={4}></textarea>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-background font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2">
                <span>Execute Transmission</span>
                <Send className="size-5" />
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="md:col-span-5 glass rounded-2xl overflow-hidden flex flex-col">
            <div className="h-64 w-full bg-surface-container relative">
              <img 
                src="https://images.unsplash.com/photo-1512757776214-26d36777b513?q=80&w=800&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                alt="Goa Map"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <MapPin className="size-5 text-primary fill-primary" />
                <span className="font-bold text-sm tracking-tight">Aldona, Bardez, Goa</span>
              </div>
            </div>
            <div className="p-8 flex-1 bg-surface-container/50">
              <h4 className="text-lg font-bold mb-4">The Nexus</h4>
              <p className="text-sm text-secondary mb-6 leading-relaxed">
                Located just steps from the serene Aldona Church. Look for the black minimalist facade with the violet glow.
              </p>
              <button className="inline-flex items-center text-primary text-sm font-bold gap-1 hover:gap-2 transition-all">
                Open in Terminal Maps
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full">
      <section className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1200&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
            alt="Cosmic"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-20 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Rocket className="size-5 text-background" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">Café Kosco</span>
          </div>
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase border border-primary/40 rounded-full text-primary bg-primary/10">
              System Online
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6">
              Brewing the <span className="text-primary italic">Infinite</span>.
            </h1>
            <p className="text-secondary text-lg lg:text-xl leading-relaxed font-light">
              Step into the orbit of precision flavor. Authenticate your credentials to access the interstellar brewing guides and rewards hub.
            </p>
          </div>
          <div className="flex items-center gap-8 text-secondary">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">4.9</span>
              <span className="text-xs uppercase tracking-widest font-medium">Galaxy Rating</span>
            </div>
            <div className="h-8 w-px bg-outline-variant"></div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white">24/7</span>
              <span className="text-xs uppercase tracking-widest font-medium">Cosmic Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">Initialize Access</h2>
            <p className="text-secondary">Welcome back, Commander. Enter your coordinates.</p>
          </div>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-secondary">Identifier (Email)</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors size-5" />
                  <input className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-secondary focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="pilot@kosco.space" type="email" required />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-widest text-secondary">Cipher (Password)</label>
                  <button type="button" className="text-xs text-primary hover:underline">Lost coordinates?</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors size-5" />
                  <input 
                    className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 pl-11 pr-12 text-white placeholder:text-secondary focus:ring-2 focus:ring-primary outline-none transition-all" 
                    placeholder="••••••••" 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-outline-variant bg-surface-container text-primary focus:ring-primary" id="remember" />
              <label className="text-sm text-secondary" htmlFor="remember">Maintain persistence</label>
            </div>
            <button className="w-full bg-primary hover:brightness-110 text-background font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
              Log In <ArrowRight className="size-5" />
            </button>
          </form>
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-secondary tracking-widest">Or synchronize with</span></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-surface-container hover:bg-surface-container-high transition-colors text-white">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-outline-variant bg-surface-container hover:bg-surface-container-high transition-colors text-white">
              <Terminal className="size-5 text-primary" />
              <span className="text-sm font-medium">Github</span>
            </button>
          </div>
          <p className="text-center text-secondary text-sm">
            New to the mission? <button className="text-primary font-bold hover:underline">Register Account</button>
          </p>
        </div>
      </section>
    </main>
  );
}

function AdminPage() {
  return (
    <div className="flex min-h-screen pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-container border-r border-outline-variant hidden md:flex flex-col p-6 gap-8">
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-secondary px-2">Management</h3>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 bg-outline-variant text-primary rounded-lg font-medium">
              <MenuIcon className="size-4" /> Menu Items
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-variant rounded-lg transition-colors">
              <Stars className="size-4" /> Specials
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-variant rounded-lg transition-colors">
              <Info className="size-4" /> FAQ
            </button>
          </nav>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-secondary px-2">Analytics</h3>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-variant rounded-lg transition-colors">
              <Bolt className="size-4" /> Sales Report
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-secondary hover:bg-surface-variant rounded-lg transition-colors">
              <User className="size-4" /> Customers
            </button>
          </nav>
        </div>
        <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/20">
          <p className="text-[10px] text-primary font-bold uppercase tracking-wider mb-2">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></div>
            <span className="text-xs text-white font-medium">All Systems Nominal</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">Menu Management</h1>
            <p className="text-secondary max-w-xl">Curate your cosmic offerings. Update prices, availability, and featured items across all digital touchpoints.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-high text-white font-semibold hover:bg-surface-variant transition-colors flex items-center gap-2">
              <Filter className="size-4" /> Filters
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-primary text-background font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
              <Plus className="size-4" /> New Item
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 glass p-6 rounded-2xl relative overflow-hidden group">
            <Bolt className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform size-32" />
            <h4 className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Live Performance</h4>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white tracking-tighter">84%</span>
              <span className="text-tertiary text-sm font-bold flex items-center">
                <ArrowUp className="size-3" /> 12.5%
              </span>
            </div>
            <p className="text-secondary text-sm mt-2">Conversion rate on seasonal specials</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h4 className="text-sm font-bold text-secondary tracking-widest uppercase mb-4">Active Items</h4>
            <div className="text-4xl font-black text-white tracking-tighter">142</div>
            <div className="mt-4 h-1 w-full bg-outline-variant rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4"></div>
            </div>
          </div>
          <div className="glass p-6 rounded-2xl">
            <h4 className="text-sm font-bold text-secondary tracking-widest uppercase mb-4">Stock Alerts</h4>
            <div className="text-4xl font-black text-red-500 tracking-tighter">03</div>
            <p className="text-xs text-secondary mt-4 font-medium italic">Requires immediate restock</p>
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden mb-8">
          <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
            <h2 className="font-bold text-lg">Active Catalog</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary size-4" />
              <input className="pl-10 pr-4 py-2 bg-surface-container border border-outline-variant rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none w-64" placeholder="Search items..." />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-high/30 text-xs font-bold text-secondary uppercase tracking-widest">
                  <th className="px-6 py-4">Item Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Inventory</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {MENU_ITEMS.slice(0, 3).map(item => (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-container border border-outline-variant">
                          <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                        </div>
                        <div>
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-xs text-secondary">{item.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">{item.category}</td>
                    <td className="px-6 py-4 font-mono text-sm text-primary">₹{item.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        item.inventoryStatus === 'IN STOCK' ? 'bg-tertiary/10 text-tertiary' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {item.inventoryStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                        <span className="text-sm">Published</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:text-primary transition-colors"><Edit className="size-4" /></button>
                      <button className="p-2 hover:text-red-500 transition-colors"><Trash2 className="size-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfilePage({ onLogout }: { onLogout: () => void }) {
  return (
    <main className="pt-24 pb-12 px-6 max-w-6xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-2">Account Dashboard</h1>
        <p className="text-secondary">Manage your preferences and digital coffee wallet.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Profile Info */}
        <div className="md:col-span-8 glass rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-tertiary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-32 h-32 rounded-full border-2 border-outline-variant bg-surface-container flex items-center justify-center overflow-hidden">
              <User className="size-16 text-secondary" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Alex Rivers</h2>
                <p className="text-secondary font-medium">Gold Member since Oct 2023</p>
              </div>
              <button 
                onClick={onLogout}
                className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg font-bold tracking-tight hover:bg-red-500 hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant">
                <p className="text-xs text-secondary uppercase tracking-widest mb-1">Total Brews</p>
                <p className="text-xl font-bold text-tertiary">142</p>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant">
                <p className="text-xs text-secondary uppercase tracking-widest mb-1">Favorite Roast</p>
                <p className="text-xl font-bold text-primary">Ethio-Guji</p>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant hidden md:block">
                <p className="text-xs text-secondary uppercase tracking-widest mb-1">Loyalty Tier</p>
                <p className="text-xl font-bold text-white">Obsidian</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="md:col-span-4 glass rounded-xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="size-5 text-tertiary fill-tertiary" />
              <h3 className="text-lg font-bold text-white">Rewards</h3>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-tertiary bg-tertiary/10">
                  Progress to Free Coffee
                </span>
                <span className="text-xs font-semibold inline-block text-tertiary">85%</span>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-surface-container-high">
                <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-tertiary shadow-[0_0_12px_rgba(52,211,153,0.5)]" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
          <p className="text-sm text-secondary leading-relaxed">Only <span className="text-white font-bold">15 points</span> away from your next artisan pour-over!</p>
        </div>

        {/* Subscription */}
        <div className="md:col-span-5 glass rounded-xl p-8 border-l-4 border-l-primary flex gap-6 items-start">
          <div className="bg-primary/10 p-3 rounded-xl border border-primary/20">
            <Rocket className="size-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">Kosco+ Monthly</h3>
            <p className="text-sm text-secondary mb-4">Your subscription renews on Nov 24, 2024. Includes unlimited guide inquiries and 10% off beans.</p>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              Manage Plan <ArrowRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Orders */}
        <div className="md:col-span-7 glass rounded-xl p-8">
          <h3 className="text-lg font-bold text-white mb-6">Recent Orders</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
                  <Coffee className="size-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Cold Brew Tonic</p>
                  <p className="text-xs text-secondary">Oct 22, 10:45 AM</p>
                </div>
              </div>
              <span className="text-sm font-mono text-tertiary">₹170</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-outline-variant/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
                  <ShoppingBag className="size-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Guji Highland Beans (250g)</p>
                  <p className="text-xs text-secondary">Oct 19, 03:20 PM</p>
                </div>
              </div>
              <span className="text-sm font-mono text-tertiary">₹450</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
