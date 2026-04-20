import { Mobile } from '@/src/types';
import { Card } from '@/components/ui/card';

interface PhoneCardProps {
  phone: Mobile;
}

export function PhoneCard({ phone }: PhoneCardProps) {
  return (
    <a href={`/phone/${phone.slug}`} className="block group">
      <Card className="overflow-hidden border-none shadow-none hover:shadow-md transition-shadow p-2 flex flex-col items-center text-center">
        <div className="w-full aspect-[3/4] relative mb-2">
          <img 
            src={phone.images[0] || 'https://picsum.photos/seed/phone/200/300'} 
            alt={phone.name}
            className="object-cover w-full h-full rounded"
            referrerPolicy="no-referrer"
          />
        </div>
        <h3 className="text-[10px] font-bold text-[#1a3a5a] group-hover:text-primary line-clamp-2 leading-tight h-7">
          {phone.name}
        </h3>
        <p className="text-[#d32f2f] font-bold text-[11px] mt-1">
          {phone.currency} {phone.price}
        </p>
      </Card>
    </a>
  );
}
