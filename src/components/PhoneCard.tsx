import { Mobile } from '@/src/types';
import { Card } from '@/components/ui/card';

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
      <Card className="overflow-hidden border-none shadow-none hover:shadow-md transition-shadow p-2 flex flex-col items-center text-center">
        <div className="w-full aspect-[3/4] relative mb-2">
          <img 
            src={phone.images[0] || 'https://picsum.photos/seed/phone/200/300'} 
            alt={phone.name}
            className="object-cover w-full h-full rounded"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-0.5">
          <p className="text-[9px] font-medium text-[#1a3a5a]/70 uppercase tracking-tight">
            {brand}
          </p>
          <h3 className="text-[10px] font-bold text-[#1a3a5a] group-hover:text-primary line-clamp-2 leading-tight min-h-[20px]">
            {model}
          </h3>
          <p className="text-[#d32f2f] font-bold text-[11px] mt-1">
            {phone.currency} {phone.price.toLocaleString()}
          </p>
        </div>
      </Card>
    </a>
  );
}
