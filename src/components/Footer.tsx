import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="text-3xl font-black tracking-tighter text-on-background mb-6">Café Kosco</div>
          <p className="text-on-surface-variant max-w-sm">
            Merging traditional flavors with futuristic brewing technology. Your daily fuel source, re-engineered for the modern age.
          </p>
        </div>
        <div>
          <h4 className="text-on-background font-bold mb-6 uppercase tracking-widest text-xs">Exploration</h4>
          <ul className="space-y-4 text-on-surface-variant text-sm">
            <li><Link to="/menu" className="hover:text-primary transition-colors">Main Menu</Link></li>
            <li><Link to="/profile" className="hover:text-primary transition-colors">Order Tracker</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Kosco AI Help</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-on-background font-bold mb-6 uppercase tracking-widest text-xs">Orbit</h4>
          <ul className="space-y-4 text-on-surface-variant text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Privacy Protocol</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-primary transition-colors">Carbon Offset</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-outline-variant flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-on-surface-variant text-xs font-mono">
          © 2024 KOSCO_CORE_SYSTEMS. ALL_RIGHTS_RESERVED.
        </p>
        <div className="flex gap-6 text-on-surface-variant">
          <span className="text-xs font-mono uppercase tracking-widest">Precision Brewed in Aldona, Bardez, Goa</span>
        </div>
      </div>
    </footer>
  );
}
