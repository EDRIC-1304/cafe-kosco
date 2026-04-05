import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, ShoppingCart, Star } from "lucide-react";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { MenuItem } from "../types";
import { cn } from "@/src/lib/utils";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const docSnap = await getDoc(doc(db, "systemSettings", "products"));
        if (docSnap.exists() && docSnap.data().items) {
          setItems(docSnap.data().items);
        } else {
          const { menuItems } = await import("@/src/constants/menu");
          setItems(menuItems);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const categories = ["All", "Coffee", "Beverages", "Snacks", "Desserts"];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-24 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-on-background mb-4">GALACTIC MENU</h1>
            <p className="text-on-surface-variant max-w-md">
              Browse our curated selection of high-performance fuel sources and cosmic treats.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-surface-container border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-sm text-on-background focus:ring-2 focus:ring-primary outline-none w-full md:w-64 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all border",
                activeCategory === cat 
                  ? "bg-primary text-background border-primary shadow-lg shadow-primary/20" 
                  : "bg-surface-container text-on-surface-variant border-outline-variant hover:border-primary/50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 flex justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-[2rem] overflow-hidden group flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-on-background uppercase tracking-widest">
                    {item.status}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-on-background group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star className="w-3 h-3 fill-tertiary" />
                      <span className="text-xs font-bold">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-6 flex-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-on-background">₹{item.price}</span>
                    <button className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-background transition-all active:scale-90">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        )}

        {!loading && filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-on-surface-variant text-lg">No items found matching your search coordinates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
