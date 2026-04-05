import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  key?: string | number;
}

export default function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl glass p-1 transition-all duration-500 neon-glow-violet">
      <div className="relative h-64 rounded-xl overflow-hidden mb-4">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full text-sm font-bold text-primary">
          ₹{item.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
        <p className="text-secondary text-sm mb-4 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-1 text-tertiary">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`size-3 ${i < Math.floor(item.rating) ? 'fill-tertiary' : ''}`} 
              />
            ))}
          </div>
          <button className="p-2 bg-primary/20 rounded-lg text-primary hover:bg-primary hover:text-background transition-all">
            <ShoppingCart className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
