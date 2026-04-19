import { Mobile } from '@/src/types';
import { Card } from '@/components/ui/card';

interface PhoneCardProps {
  phone: Mobile;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <a href={`/phone/${phone.slug}`} className="block group">
      <Card className="overflow-hidden border border-transparent shadow-none hover:shadow-xl hover:shadow-primary/10 hover:border-primary/10 transition-all duration-300 p-2.5 flex flex-col items-center text-center bg-white rounded-2xl group-hover:-translate-y-1">
        <div className="w-full aspect-[3/4] relative mb-3 bg-slate-50 rounded-xl overflow-hidden shadow-inner">
          <img 
            src={phone.images[0] || 'https://picsum.photos/seed/phone/200/300'} 
            alt={phone.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-1 w-full px-1">
          <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest leading-none">{phone.brand}</p>
          <h3 className="text-[11px] font-black text-slate-800 line-clamp-2 leading-tight min-h-[1.75rem] group-hover:text-primary transition-colors tracking-tight antialiased">
            {phone.name}
          </h3>
          <p className="text-secondary font-black text-xs mt-2 bg-secondary/5 py-1 px-2 rounded-lg inline-block">
            {phone.currency} {phone.price}
          </p>
        </div>
      </Card>
    </a>
  );
}
