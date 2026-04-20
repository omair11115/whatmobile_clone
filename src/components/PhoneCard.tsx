import { Mobile } from '@/src/types';
import { Card } from '@/components/ui/card';

interface PhoneCardProps {
  phone: Mobile;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  const formattedPrice = phone.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <a href={`/phone/${phone.slug}`} className="block group">
      <Card className="overflow-hidden border border-transparent hover:border-muted-foreground/20 shadow-sm hover:shadow-md transition-all p-3 flex flex-col bg-white">
        <div className="w-full aspect-[4/5] relative mb-3 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center">
          <img 
            src={phone.images[0] || 'https://picsum.photos/seed/phone/400/500'} 
            alt={phone.name}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col flex-grow text-center">
          <h3 className="text-[12px] font-bold text-slate-800 group-hover:text-primary line-clamp-2 leading-tight mb-1 min-h-[32px]">
            {phone.name}
          </h3>
          <div className="mt-auto">
            <p className="text-[#c00] font-black text-[13px]">
              {phone.currency} {formattedPrice}
            </p>
          </div>
        </div>
      </Card>
    </a>
  );
}
