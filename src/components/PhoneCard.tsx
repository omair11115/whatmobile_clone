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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <a href={`/phone/${phone.slug}`} className="block group">
        <Card className="overflow-hidden border border-transparent bg-white shadow-none hover:shadow-aesthetic hover:border-border/50 transition-all duration-300 p-2.5 flex flex-col items-center text-center rounded-2xl">
          <div className="w-full aspect-[3/4] relative mb-3 overflow-hidden bg-slate-50/50 rounded-xl p-2 flex items-center justify-center">
            <img 
              src={phone.images[0] || 'https://picsum.photos/seed/phone/200/300'} 
              alt={phone.name}
              className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-tight">
              {brand}
            </p>
            <h3 className="text-[13px] font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight min-h-[32px]">
              {model}
            </h3>
            <p className="text-[#ef4444] font-black text-[14px] mt-1.5 antialiased">
              {phone.currency} {phone.price.toLocaleString()}
            </p>
          </div>
        </Card>
      </a>
    </motion.div>
  );
}
