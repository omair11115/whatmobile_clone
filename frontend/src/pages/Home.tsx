import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCard } from '@/components/PhoneCard';
import { BlogCard } from '@/components/BlogCard';
import { BrandGrid } from '@/components/BrandGrid';
import { Sidebar } from '@/components/Sidebar';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Zap, Star, Clock, Smartphone, Newspaper } from 'lucide-react';
import { motion } from 'motion/react';
import { Mobile, BlogPost, Brand, PriceRange, Network, RamOption, ScreenSize, MobileFeature, OsOption } from '@/types';
import { BRANDS } from '@/constants';

// Removed Mock Data Constants

export function Home() {
  const navigate = useNavigate();
  const [phones, setPhones] = useState<Mobile[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([]);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [ramOptions, setRamOptions] = useState<RamOption[]>([]);
  const [screenSizes, setScreenSizes] = useState<ScreenSize[]>([]);
  const [mobileFeatures, setMobileFeatures] = useState<MobileFeature[]>([]);
  const [osOptions, setOsOptions] = useState<OsOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/mobiles'),
      fetch('/api/brands'),
      fetch('/api/price-ranges'),
      fetch('/api/networks'),
      fetch('/api/ram-options'),
      fetch('/api/screen-sizes'),
      fetch('/api/mobile-features'),
      fetch('/api/os-options'),
      fetch('/api/posts')
    ])
      .then(async ([mobRes, brandRes, priceRes, netRes, ramRes, screenRes, featRes, osRes, postRes]) => {
        const mobData = await mobRes.json();
        const brandData = await brandRes.json();
        const priceData = await priceRes.json();
        const netData = await netRes.json();
        const ramData = await ramRes.json();
        const screenData = await screenRes.json();
        const featData = await featRes.json();
        const osData = await osRes.json();
        const postData = await postRes.json();
        
        if (Array.isArray(mobData)) setPhones(mobData);
        if (Array.isArray(brandData)) setBrands(brandData);
        if (Array.isArray(priceData)) setPriceRanges(priceData);
        if (Array.isArray(netData)) setNetworks(netData);
        if (Array.isArray(ramData)) setRamOptions(ramData);
        if (Array.isArray(screenData)) setScreenSizes(screenData);
        if (Array.isArray(featData)) setMobileFeatures(featData);
        if (Array.isArray(osData)) setOsOptions(osData);
        if (Array.isArray(postData)) setPosts(postData);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const displayPhones = phones;

  // Grouping by price for sections
  const pkr50kPlus = displayPhones.filter(p => {
    const price = parseInt(p.price.toString().replace(/,/g, ''));
    return price > 50000; 
  });
  
  const pkr40kTo50k = displayPhones.filter(p => {
    const price = parseInt(p.price.toString().replace(/,/g, ''));
    return price <= 50000 && price > 40000;
  });

  const pkr30kTo40k = displayPhones.filter(p => {
    const price = parseInt(p.price.toString().replace(/,/g, ''));
    return price <= 40000 && price > 30000;
  });

  const pkr20kTo30k = displayPhones.filter(p => {
    const price = parseInt(p.price.toString().replace(/,/g, ''));
    return price <= 30000 && price > 20000;
  });

  const pkrUnder10k = displayPhones.filter(p => {
    const price = parseInt(p.price.toString().replace(/,/g, ''));
    return price <= 10000;
  });

  const comingSoonPhones = displayPhones.filter(p => p.comingSoon); 

  return (
    <div className="min-h-screen bg-background pb-12">
      <SEO 
        title="Latest Mobile Phone Specs & Prices in Pakistan" 
        description="Find detailed specifications, prices, and reviews of the latest mobile phones from Samsung, Apple, Xiaomi, Vivo, and more."
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Ad Banner or Promo */}
            <div className="bg-[#1a3a5a] text-white p-6 rounded shadow-sm text-center">
              <h1 className="text-xl font-bold uppercase tracking-tight">Mobile Phone Prices in Pakistan</h1>
              <p className="text-[10px] mt-1 font-medium uppercase tracking-widest text-slate-300">Find latest mobile prices, specs and comparisons</p>
            </div>

            {/* Latest Mobile Phones Section */}
            <section className="bg-white rounded border shadow-sm overflow-hidden">
              <div className="bg-[#f8f9fa] border-b px-4 py-2 flex justify-between items-center">
                <h2 className="text-sm font-bold text-[#d32f2f] uppercase tracking-tight">Latest Mobile Phones & Prices</h2>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {displayPhones.slice(0, 6).map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
                {displayPhones.length === 0 && (
                  <div className="col-span-full py-8 text-center text-muted-foreground text-xs italic">
                    No latest mobile phones found.
                  </div>
                )}
              </div>
            </section>

            {/* Price Row 1: > 50,000 */}
            <section className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-[#f8f9fa] border-b px-4 py-2 flex justify-between items-center">
                <h2 className="text-sm font-bold text-[#1a3a5a] uppercase tracking-tight">Mobile phones Price in Pakistan {'>'} 50,000 Rs.</h2>
                <a href="#" className="text-[10px] font-bold text-[#d32f2f] hover:underline">More {">>"}</a>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {pkr50kPlus.slice(0, 6).map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </div>
            </section>

            {/* Price Row 2: 40k - 50k */}
            <section className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-[#f8f9fa] border-b px-4 py-2 flex justify-between items-center">
                <h2 className="text-sm font-bold text-[#1a3a5a] uppercase tracking-tight">Mobile Prices Between 40,000 and 50,000 Rs.</h2>
                <a href="#" className="text-[10px] font-bold text-[#d32f2f] hover:underline">More {">>"}</a>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {pkr40kTo50k.slice(0, 6).map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </div>
            </section>

            {/* Price Table Section */}
            <section className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-[#f8f9fa] border-b px-4 py-2 text-center">
                <h2 className="text-sm font-bold text-[#1a3a5a] uppercase tracking-tight">Mobile Phones Price in Pakistan</h2>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b">
                      <th className="px-4 py-2 text-xs font-bold text-[#1a3a5a] uppercase">Latest Mobile Phones Models</th>
                      <th className="px-4 py-2 text-xs font-bold text-[#1a3a5a] uppercase text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayPhones.slice(0, 10).map(phone => (
                      <tr key={phone.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2 text-xs">
                          <a href={`/phone/${phone.slug}`} className="text-[#1a3a5a] hover:text-primary">{phone.name}</a>
                        </td>
                        <td className="px-4 py-2 text-xs text-right font-bold text-[#d32f2f]">
                          {phone.currency} {phone.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Coming Soon Section */}
            <section className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-[#f8f9fa] border-b px-4 py-2">
                <h2 className="text-sm font-bold text-[#1a3a5a] uppercase tracking-tight">Coming Soon Mobiles Prices in Pakistan</h2>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {comingSoonPhones.length > 0 ? comingSoonPhones.map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                )) : (
                  <div className="col-span-full py-8 text-center text-muted-foreground text-xs italic">
                    No coming soon mobiles announced yet.
                  </div>
                )}
              </div>
            </section>

            {/* Latest News Section */}
            <section className="bg-white rounded-lg border shadow-sm overflow-hidden">
              <div className="bg-[#f8f9fa] border-b px-4 py-2">
                <h2 className="text-sm font-bold text-[#1a3a5a] uppercase tracking-tight">Latest News</h2>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                  <a key={post.id} href={`/blog/${post.slug}`} className="group block border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-video relative overflow-hidden">
                      <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-xs font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
