import { Mobile } from '@/src/types';

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
      <div className="bg-white border rounded p-2 flex flex-col items-center text-center hover:shadow-md transition-shadow h-full">
        <div className="w-full h-[160px] relative mb-2 flex items-center justify-center overflow-hidden">
          <img 
            src={phone.images[0] || 'https://picsum.photos/seed/phone/200/300'} 
            alt={phone.name}
            className="max-h-full w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="space-y-0.5 w-full">
          <p className="text-[12px] font-bold text-[#1a3a5a] group-hover:text-primary line-clamp-1 truncate uppercase">
            {brand}
          </p>
          <h3 className="text-[12px] font-bold text-[#1a3a5a] line-clamp-2 leading-tight min-h-[30px] group-hover:text-primary transition-colors px-1">
            {model}
          </h3>
          <p className="text-[#d32f2f] font-bold text-xs mt-1">
            {phone.currency} {phone.price.toLocaleString()}
          </p>
        </div>
      </div>
    </a>
  );
}
