import React, { useState, useEffect } from "react";
import { Coffee, Search, LogOut, Shield, Trash2, Edit3, Plus, User as UserIcon } from "lucide-react";
import { useAuth } from "../lib/AuthProvider";
import { logout, db } from "../lib/firebase";
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MenuItem, UserProfile } from "../types";
import { menuItems as defaultMenuItems } from "../constants/menu";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [items, setItems] = useState<MenuItem[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  
  const [searchMenu, setSearchMenu] = useState("");
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // HUD Data Load
  useEffect(() => {
    const fetchData = async () => {
      // Fetch Products
      const docSnap = await getDoc(doc(db, "systemSettings", "products"));
      if (docSnap.exists() && docSnap.data().items) {
        setItems(docSnap.data().items);
      } else {
        setItems(defaultMenuItems); // Fallback seed
      }
      
      // Fetch Users
      const usersSnap = await getDocs(collection(db, "users"));
      const userList: UserProfile[] = [];
      usersSnap.forEach(u => userList.push(u.data() as UserProfile));
      setUsers(userList);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const saveProductsToFirestore = async (newItems: MenuItem[]) => {
    await setDoc(doc(db, "systemSettings", "products"), { items: newItems });
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    let newItems;
    if (items.some(i => i.id === editingItem.id)) {
      newItems = items.map(i => i.id === editingItem.id ? editingItem : i);
    } else {
      newItems = [...items, editingItem];
    }
    
    setItems(newItems);
    await saveProductsToFirestore(newItems);
    setIsModalOpen(false);
  };

  const handleDeleteItem = async (id: string) => {
    const newItems = items.filter(i => i.id !== id);
    setItems(newItems);
    await saveProductsToFirestore(newItems);
  };

  const handleDeleteUser = async (uid: string) => {
    await deleteDoc(doc(db, "users", uid));
    setUsers(users.filter(u => u.uid !== uid));
  };
  
  const filteredItems = items.filter(i => i.name.toLowerCase().includes(searchMenu.toLowerCase()));
  const displayedItems = showMoreMenu ? filteredItems : filteredItems.slice(0, 4);

  return (
    <div className="min-h-screen py-24 px-8 bg-[#0B0F1A]">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header HUD */}
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
          <button onClick={handleLogout} className="px-6 py-3 rounded-xl bg-red-500/10 text-red-400 font-bold flex items-center gap-2 hover:bg-red-500/20 transition-all border border-red-500/20">
            <LogOut className="w-4 h-4" /> De-orbit
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Hub */}
          <div className="glass p-8 rounded-[2.5rem] border-outline-variant/30 flex flex-col relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-on-background tracking-tighter flex items-center gap-3">
                <Coffee className="w-5 h-5 text-primary" /> PRODUCT HUB
              </h3>
              <button 
                onClick={() => { setEditingItem({ id: Date.now().toString(), name: '', description: '', price: 0, category: 'Coffee', image: '', status: 'Stable Orbit', rating: 5.0 }); setIsModalOpen(true); }}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-primary/20 text-background"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
              <input type="text" placeholder="Search products..." value={searchMenu} onChange={(e) => setSearchMenu(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 pl-12 pr-4 text-sm text-on-background outline-none focus:ring-2 focus:ring-primary transition-all" />
            </div>

            <div className="space-y-3 flex-1">
              {displayedItems.map(item => (
                <div key={item.id} className="glass p-4 rounded-2xl flex items-center justify-between border-outline-variant/50 hover:border-primary/30 transition-colors">
                  <div>
                    <h4 className="font-bold text-on-background">{item.name}</h4>
                    <p className="text-xs text-primary font-mono tracking-widest uppercase">₹{item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 text-on-surface-variant hover:text-primary transition-colors bg-surface-container rounded-lg">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-on-surface-variant hover:text-red-400 transition-colors bg-surface-container rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && <p className="text-center text-sm py-4 text-on-surface-variant">No items found.</p>}
            </div>

            {filteredItems.length > 4 && (
              <button onClick={() => setShowMoreMenu(!showMoreMenu)} className="mt-6 w-full py-3 rounded-xl bg-surface-container text-xs font-black tracking-widest text-on-background hover:bg-outline-variant/30 transition-colors uppercase border border-outline-variant">
                {showMoreMenu ? "Collapse System" : "Show Full Inventory"}
              </button>
            )}
          </div>

          {/* User Registry */}
          <div className="glass p-8 rounded-[2.5rem] border-tertiary/20 flex flex-col">
            <h3 className="text-xl font-black text-on-background tracking-tighter flex items-center gap-3 mb-6">
              <UserIcon className="w-5 h-5 text-tertiary" /> USER REGISTRY
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2" style={{ maxHeight: '400px' }}>
              {users.length === 0 ? (
                <p className="text-sm text-on-surface-variant text-center py-4">No travelers currently docked.</p>
              ) : (
                users.map(u => (
                  <div key={u.uid} className="glass p-4 rounded-2xl flex items-center justify-between border-tertiary/10 hover:border-tertiary/30 transition-colors">
                    <div>
                      <h4 className="font-bold text-on-background">{u.email}</h4>
                      <p className="text-xs text-tertiary font-mono uppercase tracking-widest">Role: {u.role || 'customer'}</p>
                    </div>
                    {u.role !== 'admin' && (
                      <button onClick={() => handleDeleteUser(u.uid)} className="p-2 text-on-surface-variant hover:text-red-400 transition-colors bg-surface-container rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Z-Index explicitly controlled Modal */}
      {isModalOpen && editingItem && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <form onSubmit={handleSaveItem} className="glass border-primary/30 w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <h2 className="text-2xl font-black tracking-tighter text-on-background">Configure Item</h2>
            <div className="space-y-4">
              <input type="text" value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} placeholder="Item Name" required className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 px-4 text-on-background focus:ring-2 focus:ring-primary outline-none" />
              <input type="number" value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: Number(e.target.value)})} placeholder="Price" required className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 px-4 text-on-background focus:ring-2 focus:ring-primary outline-none" />
              <textarea value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} placeholder="Description" required className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 px-4 text-on-background focus:ring-2 focus:ring-primary outline-none resize-none" rows={3} />
              <select value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value as any})} className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 px-4 text-on-background focus:ring-2 focus:ring-primary outline-none appearance-none">
                <option>Coffee</option>
                <option>Beverages</option>
                <option>Snacks</option>
                <option>Desserts</option>
              </select>
              <input type="text" value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} placeholder="Image URL" className="w-full bg-surface-container border border-outline-variant rounded-xl py-3 px-4 text-on-background focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="flex gap-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl bg-surface-container text-on-background font-bold border border-outline-variant hover:bg-outline-variant/30">Cancel</button>
              <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-background font-bold shadow-lg shadow-primary/20 hover:brightness-110">Save Data</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
