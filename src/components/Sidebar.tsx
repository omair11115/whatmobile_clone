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
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/brands`),
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/price-ranges`),
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/networks`),
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/ram-options`),
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/screen-sizes`),
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/mobile-features`),
      fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/os-options`),
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
      <section className="bg-white border rounded shadow-sm overflow-hidden">
        <div className="bg-[#1a3a5a] px-3 py-2 border-b">
          <h3 className="text-xs font-bold text-white uppercase tracking-tight">Search by Brand</h3>
        </div>
        <div className="p-1 grid grid-cols-1 gap-0.5">
          {brands.length > 0 ? brands.map(brand => (
            <a key={brand.id} href={`/brand/${brand.slug}`} className="px-3 py-1 text-xs text-[#1a3a5a] hover:bg-muted transition-colors flex justify-between items-center group">
              <span>{brand.name}</span>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          )) : (
            <div className="px-3 py-2 text-center text-[10px] text-muted-foreground italic">No brands found.</div>
          )}
        </div>
      </section>

      {/* Search by Price */}
      {showPriceFilters && priceRanges.length > 0 && (
        <section className="bg-white border rounded shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] px-3 py-2 border-b">
            <h3 className="text-xs font-bold text-white uppercase tracking-tight">Search by Price</h3>
          </div>
          <div className="p-1 grid grid-cols-1 gap-0.5">
            {priceRanges.map(range => (
              <a key={range.id} href={`/price-range?min=${range.minPrice}&max=${range.maxPrice}&label=${encodeURIComponent(range.label)}`} className="px-3 py-1 text-xs text-[#1a3a5a] hover:bg-muted transition-colors group flex justify-between items-center">
                <span>{range.label}</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Network Filters */}
      {networks.length > 0 && (
        <section className="bg-white border rounded shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] px-3 py-2 border-b">
            <h3 className="text-xs font-bold text-white uppercase tracking-tight">Search by Network</h3>
          </div>
          <div className="p-1 grid grid-cols-1 gap-0.5">
            {networks.map(n => (
              <a key={n.id} href={`/network/${n.slug}`} className="px-3 py-1 text-xs text-[#1a3a5a] hover:bg-muted transition-colors block">
                {n.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* RAM Filters */}
      {ramOptions.length > 0 && (
        <section className="bg-white border rounded shadow-sm overflow-hidden">
          <div className="bg-[#1a3a5a] px-3 py-2 border-b">
            <h3 className="text-xs font-bold text-white uppercase tracking-tight">Search by RAM</h3>
          </div>
          <div className="p-1 grid grid-cols-1 gap-0.5">
            {ramOptions.map(r => (
              <a key={r.id} href={`/ram/${r.slug}`} className="px-3 py-1 text-xs text-[#1a3a5a] hover:bg-muted transition-colors block">
                {r.label}
              </a>
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}
