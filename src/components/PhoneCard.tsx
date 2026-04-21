import { Mobile } from '@/src/types';
import { Card } from '@/components/ui/card';

import { motion } from 'motion/react';

interface PhoneCardProps {
  phone: Mobile;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const brand = phone.brand || '';
  const model = phone.name.toLowerCase().startsWith(brand.toLowerCase()) 
    ? phone.name.substring(brand.length).trim() 
    : phone.name;

  return (
    <a href={`/phone/${phone.slug}`} className="block group">
      <div className="bg-white border rounded p-2 flex flex-col items-center text-center hover:shadow-md transition-shadow">
        <div className="w-full aspect-[3/4] relative mb-2 flex items-center justify-center p-1">
          <img 
            src={phone.images[0] || 'https://picsum.photos/seed/phone/200/300'} 
            alt={phone.name}
            className="object-contain w-full h-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-0.5">
          <p className="text-[12px] font-bold text-[#1a3a5a] group-hover:text-primary line-clamp-2 leading-tight min-h-[20px]">
            {brand}
          </p>
          <h3 className="text-[12px] font-bold text-[#1a3a5a] line-clamp-2 leading-tight min-h-[30px] group-hover:text-primary transition-colors">
            {model}
          </h3>
          <p className="text-[#d32f2f] font-bold text-xs">
            {phone.currency} {phone.price.toLocaleString()}
          </p>
        </div>
      </div>
    </a>
  );
}
