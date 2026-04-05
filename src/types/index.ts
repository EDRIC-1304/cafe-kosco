export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Beverages' | 'Snacks' | 'Desserts';
  image: string;
  status: string;
  rating: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  loyaltyTier: string;
  totalBrews: number;
  favoriteRoast: string;
  role?: 'admin' | 'customer';
}
