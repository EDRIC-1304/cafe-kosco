import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Beverages' | 'Snacks' | 'Desserts';
  image: string;
  rating: number;
  status: 'Stable Orbit' | 'Fueling...' | 'Gravity Well' | 'Balanced' | 'Light Mass' | 'Refreshing';
  inventoryStatus: 'IN STOCK' | 'LOW STOCK' | 'DRAFT';
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Caramel Nebula Frappe',
    description: 'A swirling vortex of salted caramel, cold-brew concentrate, and velvety stardust cream.',
    price: 170,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1572286258217-315822c3f424?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    status: 'Stable Orbit',
    inventoryStatus: 'IN STOCK'
  },
  {
    id: '2',
    name: 'Solar Flare Pizza',
    description: 'Smoky tandoori chicken chunks ignited with cosmic spices and spicy makhani sauce.',
    price: 240,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    rating: 4.5,
    status: 'Fueling...',
    inventoryStatus: 'IN STOCK'
  },
  {
    id: '3',
    name: 'Emerald Supernova',
    description: 'Ceremonial grade matcha blended with sweet vanilla and textured oat milk clouds.',
    price: 190,
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1515823662273-ad95251cb884?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    status: 'Refreshing',
    inventoryStatus: 'IN STOCK'
  },
  {
    id: '4',
    name: 'Espresso',
    description: 'A concentrated burst of dark matter. Intense, complex, and essential for early mission starts.',
    price: 100,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    status: 'Stable Orbit',
    inventoryStatus: 'IN STOCK'
  },
  {
    id: '5',
    name: 'Chicken Wrap',
    description: 'Roasted nebula-seasoned chicken tightly contained in a soft tortilla field. High protein for long voyages.',
    price: 160,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800&auto=format&fit=crop',
    rating: 4,
    status: 'Fueling...',
    inventoryStatus: 'IN STOCK'
  },
  {
    id: '6',
    name: 'Cheesecake',
    description: 'A velvet moon-slice of pure indulgence. Topped with a reduction of black-hole berries.',
    price: 180,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop',
    rating: 5,
    status: 'Gravity Well',
    inventoryStatus: 'LOW STOCK'
  }
];
