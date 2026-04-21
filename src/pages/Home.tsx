import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCard } from '@/src/components/PhoneCard';
import { BlogCard } from '@/src/components/BlogCard';
import { BrandGrid } from '@/src/components/BrandGrid';
import { Sidebar } from '@/src/components/Sidebar';
import { SEO } from '@/src/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Zap, Star, Clock, Smartphone, Newspaper } from 'lucide-react';
import { motion } from 'motion/react';
import { Mobile, BlogPost, Brand, PriceRange, Network, RamOption, ScreenSize, MobileFeature, OsOption } from '@/src/types';
import { BRANDS } from '@/src/constants';

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
          <div className="lg:col-span-9 space-y-12">
            
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[21/9] bg-slate-900 rounded-[2rem] overflow-hidden relative flex items-center shadow-2xl shadow-slate-200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech/1200/600?blur=10')] bg-cover bg-center mix-blend-overlay opacity-50" />
              
              <div className="relative z-20 px-8 md:px-16 w-full max-w-2xl">
                <Badge className="bg-primary/20 text-primary-foreground border-none mb-4 px-3 py-1 text-[10px] uppercase tracking-widest font-black">Market Alert</Badge>
                <h2 className="text-4xl md:text-6xl font-black text-white leading-[0.9] tracking-tight mb-4">
                  DAILY <br />
                  <span className="text-primary-foreground/80">PRICE UPDATE</span>
                </h2>
                <p className="text-lg text-white/60 font-medium max-w-md">
                  Browse the most accurate smartphone catalog in Pakistan. Updated every hour.
                </p>
              </div>
            </motion.div>

            {/* Latest Mobile Phones Section */}
            <section className="space-y-4">
              <div className="flex items-end justify-between px-2">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">LATEST MODELS</h2>
                  <p className="text-xs text-muted-foreground mt-1 font-semibold uppercase tracking-wider">Freshly added to our catalog</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-bold text-primary group">
                  View All <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {displayPhones.slice(0, 12).map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
                {displayPhones.length === 0 && (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                    <Smartphone className="h-8 w-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm font-medium italic">No models found in this shelf.</p>
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
            <section className="bg-white rounded-[2rem] border border-slate-100 shadow-aesthetic overflow-hidden">
              <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Price Snapshot</h2>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Live Market Rates</p>
                </div>
                <Clock className="h-5 w-5 text-slate-300" />
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30 border-b border-slate-100">
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Model Name</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Official Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayPhones.slice(0, 10).map(phone => (
                      <tr key={phone.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-4">
                          <a href={`/phone/${phone.slug}`} className="text-xs font-bold text-slate-700 group-hover:text-primary flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors" />
                            {phone.name}
                          </a>
                        </td>
                        <td className="px-8 py-4 text-xs text-right font-black text-[#ef4444]">
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
