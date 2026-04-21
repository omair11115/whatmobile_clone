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
    <aside className="space-y-6">
      {/* Search by Brand */}
      <section className="bg-white border border-slate-100 rounded-2xl shadow-aesthetic overflow-hidden transition-all duration-300">
        <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Phone Brands</h3>
        </div>
        <div className="p-2 grid grid-cols-1 gap-1">
          {brands.length > 0 ? brands.map(brand => (
            <a key={brand.id} href={`/brand/${brand.slug}`} className="px-3 py-2 text-[11px] font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all flex justify-between items-center group">
              <span>{brand.name}</span>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          )) : (
            <div className="px-3 py-4 text-center text-[10px] text-muted-foreground italic">No brands found.</div>
          )}
        </div>
      </section>

      {/* Search by Price */}
      {showPriceFilters && priceRanges.length > 0 && (
        <section className="bg-white border border-slate-100 rounded-2xl shadow-aesthetic overflow-hidden transition-all duration-300">
          <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Price Range</h3>
          </div>
          <div className="p-2 grid grid-cols-1 gap-1 font-semibold">
            {priceRanges.map(range => (
              <a key={range.id} href={`/price-range?min=${range.minPrice}&max=${range.maxPrice}&label=${encodeURIComponent(range.label)}`} className="px-3 py-2 text-[11px] text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all group flex justify-between items-center">
                <span>{range.label}</span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Other Filters (Consolidated for cleaner sidebar) */}
      <section className="bg-white border border-slate-100 rounded-2xl shadow-aesthetic overflow-hidden transition-all duration-300">
        <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Specific Filters</h3>
        </div>
        <div className="p-2 space-y-1">
          {networks.length > 0 && (
            <div className="pb-2">
              <p className="px-3 py-1 text-[10px] font-black text-muted-foreground uppercase tracking-tighter flex items-center gap-1">
                <Wifi className="h-3 w-3" /> Network
              </p>
              <div className="grid grid-cols-1 gap-0.5">
                {networks.map(n => (
                  <a key={n.id} href={`/network/${n.slug}`} className="px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all block">
                    {n.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          {ramOptions.length > 0 && (
            <div className="pb-2">
              <p className="px-3 py-1 text-[10px] font-black text-muted-foreground uppercase tracking-tighter flex items-center gap-1">
                <Cpu className="h-3 w-3" /> RAM
              </p>
              <div className="grid grid-cols-1 gap-0.5">
                {ramOptions.map(r => (
                  <a key={r.id} href={`/ram/${r.slug}`} className="px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-all block">
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </aside>
  );
}
