export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Beverages' | 'Snacks' | 'Desserts';
  image: string;
  status: 'Stable Orbit' | 'Fueling...' | 'Gravity Well' | 'Refreshing' | 'Balanced' | 'Light Mass';
  rating: number;
}

export const menuItems: MenuItem[] = [
  // Coffee
  { id: 'c1', name: 'Espresso', description: 'Pure and intense galactic fuel.', price: 100, category: 'Coffee', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1000&auto=format&fit=crop', status: 'Stable Orbit', rating: 4.8 },
  { id: 'c2', name: 'Cappuccino', description: 'Frothy clouds of textured milk over espresso.', price: 120, category: 'Coffee', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1000&auto=format&fit=crop', status: 'Stable Orbit', rating: 4.9 },
  { id: 'c3', name: 'Latte', description: 'Smooth and creamy cosmic blend.', price: 140, category: 'Coffee', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1000&auto=format&fit=crop', status: 'Balanced', rating: 4.7 },
  { id: 'c4', name: 'Americano', description: 'Diluted espresso for a longer mission.', price: 110, category: 'Coffee', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop', status: 'Stable Orbit', rating: 4.6 },
  { id: 'c5', name: 'Mocha', description: 'Chocolate infused energy source.', price: 160, category: 'Coffee', image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?q=80&w=1000&auto=format&fit=crop', status: 'Stable Orbit', rating: 4.8 },
  { id: 'c6', name: 'Cold Coffee', description: 'Chilled caffeine for high-temp environments.', price: 150, category: 'Coffee', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop', status: 'Refreshing', rating: 4.9 },
  
  // Beverages
  { id: 'b1', name: 'Iced Tea', description: 'Refreshing botanical infusion.', price: 90, category: 'Beverages', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop', status: 'Refreshing', rating: 4.5 },
  { id: 'b2', name: 'Lemon Soda', description: 'Effervescent citrus hydration.', price: 70, category: 'Beverages', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000&auto=format&fit=crop', status: 'Refreshing', rating: 4.4 },
  { id: 'b3', name: 'Hot Chocolate', description: 'Rich and warm cocoa nebula.', price: 130, category: 'Beverages', image: 'https://images.unsplash.com/photo-1544787210-228394c3d3e2?q=80&w=1000&auto=format&fit=crop', status: 'Stable Orbit', rating: 4.9 },
  { id: 'b4', name: 'Fresh Lime Juice', description: 'Pure citrus energy.', price: 80, category: 'Beverages', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1000&auto=format&fit=crop', status: 'Refreshing', rating: 4.6 },

  // Snacks
  { id: 's1', name: 'Chicken Sandwich', description: 'Classic fuel with tender chicken.', price: 110, category: 'Snacks', image: 'https://images.unsplash.com/photo-1567234665766-7748e80a2105?q=80&w=1000&auto=format&fit=crop', status: 'Fueling...', rating: 4.7 },
  { id: 's2', name: 'Grilled Chicken Sandwich', description: 'Seared chicken for extra propulsion.', price: 140, category: 'Snacks', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop', status: 'Fueling...', rating: 4.8 },
  { id: 's3', name: 'Chicken Wrap', description: 'Portable protein for explorers.', price: 160, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1000&auto=format&fit=crop', status: 'Fueling...', rating: 4.7 },
  { id: 's4', name: 'French Fries', description: 'Golden potato rods.', price: 100, category: 'Snacks', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop', status: 'Light Mass', rating: 4.5 },
  { id: 's5', name: 'Garlic Bread', description: 'Infused with aromatic herbs.', price: 110, category: 'Snacks', image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=1000&auto=format&fit=crop', status: 'Light Mass', rating: 4.6 },
  { id: 's6', name: 'Chicken Burger', description: 'Hearty galactic patty.', price: 150, category: 'Snacks', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop', status: 'Fueling...', rating: 4.8 },

  // Desserts
  { id: 'd1', name: 'Brownie', description: 'Dense chocolate matter.', price: 120, category: 'Desserts', image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1000&auto=format&fit=crop', status: 'Gravity Well', rating: 4.9 },
  { id: 'd2', name: 'Cheesecake', description: 'Velvety moon-slice.', price: 180, category: 'Desserts', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000&auto=format&fit=crop', status: 'Gravity Well', rating: 5.0 },
  { id: 'd3', name: 'Chocolate Muffin', description: 'Soft cocoa core.', price: 90, category: 'Desserts', image: 'https://images.unsplash.com/photo-1582760933250-81871df63f23?q=80&w=1000&auto=format&fit=crop', status: 'Light Mass', rating: 4.7 },
  { id: 'd4', name: 'Ice Cream Sundae', description: 'Multi-layered frozen delight.', price: 150, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop', status: 'Refreshing', rating: 4.8 },

  // Specials
  { id: 'sp1', name: 'Caramel Frappe', description: 'Swirling vortex of salted caramel.', price: 170, category: 'Coffee', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000&auto=format&fit=crop', status: 'Stable Orbit', rating: 5.0 },
  { id: 'sp2', name: 'Peri Peri Fries', description: 'Spicy ignited potato rods.', price: 120, category: 'Snacks', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1000&auto=format&fit=crop', status: 'Fueling...', rating: 4.9 },
  { id: 'sp3', name: 'Chicken Tandoori Pizza', description: 'Cosmic spices and smoky chicken.', price: 240, category: 'Snacks', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop', status: 'Fueling...', rating: 5.0 },
];
