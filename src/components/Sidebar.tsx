import { useState, useEffect } from 'react';
import { ChevronRight, Filter, Smartphone, Wifi, Cpu, Monitor, Zap, Disc } from 'lucide-react';
import { Brand, PriceRange, Network, RamOption, ScreenSize, MobileFeature, OsOption } from '@/src/types';

interface SidebarProps {
  showPriceFilters?: boolean;
  showFeatureFilters?: boolean;
}

export function Sidebar({ showPriceFilters = true, showFeatureFilters = true }: SidebarProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [ramOptions, setRamOptions] = useState<RamOption[]>([]);
  const [screenSizes, setScreenSizes] = useState<ScreenSize[]>([]);
  const [mobileFeatures, setMobileFeatures] = useState<MobileFeature[]>([]);
  const [osOptions, setOsOptions] = useState<OsOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/brands'),
      fetch('/api/price-ranges'),
      fetch('/api/networks'),
      fetch('/api/ram-options'),
      fetch('/api/screen-sizes'),
      fetch('/api/mobile-features'),
      fetch('/api/os-options'),
    ])
      .then(async ([brandRes, priceRes, netRes, ramRes, screenRes, featRes, osRes]) => {
        const brandData = await brandRes.json();
        const priceData = await priceRes.json();
        const netData = await netRes.json();
        const ramData = await ramRes.json();
        const screenData = await screenRes.json();
        const featData = await featRes.json();
        const osData = await osRes.json();
        
        if (Array.isArray(brandData)) setBrands(brandData);
        if (Array.isArray(priceData)) setPriceRanges(priceData);
        if (Array.isArray(netData)) setNetworks(netData);
        if (Array.isArray(ramData)) setRamOptions(ramData);
        if (Array.isArray(screenData)) setScreenSizes(screenData);
        if (Array.isArray(featData)) setMobileFeatures(featData);
        if (Array.isArray(osData)) setOsOptions(osData);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <aside className="space-y-4 animate-pulse">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-40 bg-white border rounded-lg" />
        ))}
      </aside>
    );
  }

  return (
    <aside className="space-y-4">
      {/* Search by Brand */}
      <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="bg-[#1a3a5a] text-white px-4 py-2 text-center text-xs font-bold uppercase">
          Search by Brand
        </div>
        <div className="p-2 grid grid-cols-1 gap-0.5">
          {brands.length > 0 ? brands.map(brand => (
            <a key={brand.id} href={`/brand/${brand.slug}`} className="px-3 py-1.5 text-[11px] font-medium hover:bg-muted transition-colors border-b last:border-0 border-muted/50 flex justify-between items-center group">
              <span>{brand.name} Mobile</span>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          )) : (
            <div className="px-3 py-4 text-center text-[10px] text-muted-foreground italic">No brands found.</div>
          )}
        </div>
      </section>

      {/* Search by Price */}
      {showPriceFilters && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] text-white px-4 py-2 text-center text-xs font-bold uppercase">
            Search by Price
          </div>
          <div className="p-2 grid grid-cols-1 gap-0.5 text-[11px] font-medium">
            {priceRanges.length > 0 ? priceRanges.map(range => (
              <a key={range.id} href={`/price-range?min=${range.minPrice}&max=${range.maxPrice}&label=${encodeURIComponent(range.label)}`} className="px-3 py-1.5 hover:bg-muted border-b border-muted/50 block">
                {range.label}
              </a>
            )) : (
              <div className="px-3 py-4 text-center text-[10px] text-muted-foreground italic">No price ranges found.</div>
            )}
          </div>
        </section>
      )}

      {/* Search by Network */}
      {networks.length > 0 && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] text-white px-4 py-2 text-center text-xs font-bold uppercase">
            Search by Network
          </div>
          <div className="p-2 grid grid-cols-1 gap-0.5 text-[11px] font-medium">
            {networks.map(n => (
              <a key={n.id} href={`/network/${n.slug}`} className="px-3 py-1.5 hover:bg-muted border-b border-muted/50 block">
                {n.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Search by RAM */}
      {ramOptions.length > 0 && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] text-white px-4 py-2 text-center text-xs font-bold uppercase">
            Search by RAM
          </div>
          <div className="p-2 grid grid-cols-1 gap-0.5 text-[11px] font-medium">
            {ramOptions.map(r => (
              <a key={r.id} href={`/ram/${r.slug}`} className="px-3 py-1.5 hover:bg-muted border-b border-muted/50 block">
                {r.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Search by Screen */}
      {screenSizes.length > 0 && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] text-white px-4 py-2 text-center text-xs font-bold uppercase">
            Search by Screen
          </div>
          <div className="p-2 grid grid-cols-1 gap-0.5 text-[11px] font-medium">
            {screenSizes.map(s => (
              <a key={s.id} href={`/screen/${s.slug}`} className="px-3 py-1.5 hover:bg-muted border-b border-muted/50 block">
                {s.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Search by Feature */}
      {showFeatureFilters && mobileFeatures.length > 0 && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] text-white px-4 py-2 text-center text-xs font-bold uppercase">
            Search by Cam / Feature
          </div>
          <div className="p-2 grid grid-cols-1 gap-0.5 text-[11px] font-medium">
            {mobileFeatures.map(f => (
              <a key={f.id} href={`/feature/${f.slug}`} className="px-3 py-1.5 hover:bg-muted border-b border-muted/50 block">
                {f.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Search by OS */}
      {osOptions.length > 0 && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] text-white px-4 py-2 text-center text-xs font-bold uppercase">
            Search by OS
          </div>
          <div className="p-2 grid grid-cols-1 gap-0.5 text-[11px] font-medium">
            {osOptions.map(o => (
              <a key={o.id} href={`/os/${o.slug}`} className="px-3 py-1.5 hover:bg-muted border-b border-muted/50 block">
                {o.name}
              </a>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}
