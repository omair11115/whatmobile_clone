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
      <section className="bg-white border rounded-lg shadow-sm overflow-hidden border-indigo-100">
        <div className="bg-indigo-600 text-white px-4 py-2.5 text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest">
          <Smartphone className="h-3.5 w-3.5" /> Browse Brands
        </div>
        <div className="p-0 flex flex-col divide-y divide-slate-50">
          {brands.map(brand => (
            <a key={brand.id} href={`/brand/${brand.slug}`} className="px-3.5 py-2 text-[11px] font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all flex justify-between items-center group">
              <span>{brand.name}</span>
              <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>
      </section>

      {/* Search by Price */}
      {showPriceFilters && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden border-rose-100">
          <div className="bg-rose-500 text-white px-4 py-2.5 text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest">
            <Filter className="h-3.5 w-3.5" /> Search by Price
          </div>
          <div className="p-0 flex flex-col divide-y divide-slate-50">
            {priceRanges.map(range => (
              <a key={range.id} href={`/price-range?min=${range.minPrice}&max=${range.maxPrice}&label=${encodeURIComponent(range.label)}`} className="px-3.5 py-2 text-[11px] font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-700 transition-all">
                {range.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Search by Network */}
      <section className="bg-white border rounded-lg shadow-sm overflow-hidden border-cyan-100">
        <div className="bg-cyan-500 text-white px-4 py-2.5 text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest">
          <Wifi className="h-3.5 w-3.5" /> Search by Network
        </div>
        <div className="p-0 flex flex-col divide-y divide-slate-50">
          {networks.map(n => (
            <a key={n.id} href={`/network/${n.slug}`} className="px-3.5 py-2 text-[11px] font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 transition-all">
              {n.name}
            </a>
          ))}
        </div>
      </section>

      {/* Search by RAM */}
      <section className="bg-white border rounded-lg shadow-sm overflow-hidden border-amber-100">
        <div className="bg-amber-500 text-white px-4 py-2.5 text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest">
          <Cpu className="h-3.5 w-3.5" /> Search by RAM
        </div>
        <div className="p-0 flex flex-col divide-y divide-slate-50">
          {ramOptions.map(r => (
            <a key={r.id} href={`/ram/${r.slug}`} className="px-3.5 py-2 text-[11px] font-semibold text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-all">
              {r.label}
            </a>
          ))}
        </div>
      </section>

      {/* Search by Screen */}
      <section className="bg-white border rounded-lg shadow-sm overflow-hidden border-emerald-100">
        <div className="bg-emerald-500 text-white px-4 py-2.5 text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest">
          <Monitor className="h-3.5 w-3.5" /> Search by Screen
        </div>
        <div className="p-0 flex flex-col divide-y divide-slate-50">
          {screenSizes.map(s => (
            <a key={s.id} href={`/screen/${s.slug}`} className="px-3.5 py-2 text-[11px] font-semibold text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all">
              {s.label}
            </a>
          ))}
        </div>
      </section>

      {/* Search by Cam / Feature */}
      {showFeatureFilters && (
        <section className="bg-white border rounded-lg shadow-sm overflow-hidden border-violet-100">
          <div className="bg-violet-500 text-white px-4 py-2.5 text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest">
            <Zap className="h-3.5 w-3.5" /> Cam / Feature
          </div>
          <div className="p-0 flex flex-col divide-y divide-slate-50">
            {mobileFeatures.map(f => (
              <a key={f.id} href={`/feature/${f.slug}`} className="px-3.5 py-2 text-[11px] font-semibold text-slate-600 hover:bg-violet-50 hover:text-violet-700 transition-all">
                {f.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Search by OS */}
      <section className="bg-white border rounded-lg shadow-sm overflow-hidden border-blue-100">
        <div className="bg-blue-500 text-white px-4 py-2.5 text-center text-[10px] font-black uppercase flex items-center justify-center gap-2 tracking-widest">
          <Disc className="h-3.5 w-3.5" /> Search by OS
        </div>
        <div className="p-0 flex flex-col divide-y divide-slate-50">
          {osOptions.map(o => (
            <a key={o.id} href={`/os/${o.slug}`} className="px-3.5 py-2 text-[11px] font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-all">
              {o.name}
            </a>
          ))}
        </div>
      </section>
    </aside>
  );
}
