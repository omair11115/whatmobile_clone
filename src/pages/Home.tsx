import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PhoneCard } from '@/src/components/PhoneCard';
import { BlogCard } from '@/src/components/BlogCard';
import { BrandGrid } from '@/src/components/BrandGrid';
import { Sidebar } from '@/src/components/Sidebar';
import { SEO } from '@/src/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Zap, Star, Clock, Smartphone } from 'lucide-react';
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

      {/* Hero Slider Placeholder */}
      <div className="bg-linear-to-br from-primary via-indigo-600 to-secondary py-16 text-white border-b shadow-lg relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-3 py-1">
              <Zap className="h-3 w-3 mr-1 fill-current" /> Daily Price Updates
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black uppercase mb-4 leading-[0.95] tracking-tighter">
              Discover the <span className="text-accent underline decoration-4 underline-offset-4">Perfect</span> Smartphone
            </h1>
            <p className="text-lg md:text-xl opacity-90 font-medium mb-8 max-w-xl">
              Compare detailed specs, real-time prices, and stay ahead with the latest mobile news in Pakistan.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100 font-bold px-8 rounded-xl shadow-xl transition-all hover:-translate-y-1">
                Explore Mobile Phones
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white/30 hover:bg-white/10 font-bold px-8 rounded-xl backdrop-blur-sm transition-all hover:border-white">
                Today's News
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-10">
            
            {/* Latest Mobile Phones Section */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="bg-slate-50/50 border-b px-5 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-primary rounded-full"></div>
                  <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">Latest Mobile Phones & Prices</h2>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Updated Today</Badge>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {displayPhones.slice(0, 6).map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
                {displayPhones.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted-foreground text-sm italic">
                    No latest mobile phones found.
                  </div>
                )}
              </div>
            </section>

            {/* Price Row 1: > 50,000 */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:border-indigo-200 transition-all">
              <div className="bg-indigo-50/30 border-b border-indigo-50 px-5 py-3 flex justify-between items-center group-hover:bg-indigo-50 transition-all">
                <h2 className="text-sm font-black text-indigo-900 uppercase tracking-tight flex items-center gap-2">
                  <Star className="h-4 w-4 text-indigo-500 fill-indigo-500" />
                  Premium Phones {'>'} 50,000 PKR
                </h2>
                <a href="#" className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest flex items-center gap-1 group/link">
                  View All <ChevronRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-all" />
                </a>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {pkr50kPlus.slice(0, 6).map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </div>
            </section>

            {/* Price Row 2: 40k - 50k - Rose theme */}
            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group hover:border-rose-200 transition-all">
              <div className="bg-rose-50/30 border-b border-rose-50 px-5 py-3 flex justify-between items-center group-hover:bg-rose-50 transition-all">
                <h2 className="text-sm font-black text-rose-900 uppercase tracking-tight flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-rose-500" />
                  Mid-Range (40k - 50k PKR)
                </h2>
                <a href="#" className="text-[10px] font-black text-rose-600 hover:text-rose-800 uppercase tracking-widest flex items-center gap-1 group/link">
                  View All <ChevronRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-all" />
                </a>
              </div>
              <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {pkr40kTo50k.slice(0, 6).map(phone => (
                  <PhoneCard key={phone.id} phone={phone} />
                ))}
              </div>
            </section>

            {/* Price Table Section - Emerald Theme */}
            <section className="bg-white rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-500/5 overflow-hidden">
              <div className="bg-emerald-600 px-5 py-4 text-center">
                <h2 className="text-md font-black text-white uppercase tracking-widest">Today's Market Prices in Pakistan</h2>
                <p className="text-xs text-white/70 font-medium">Daily updated smartphone price index</p>
              </div>
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-emerald-50 border-b border-emerald-100">
                      <th className="px-6 py-4 text-[10px] font-black text-emerald-800 uppercase tracking-widest">Mobile Model</th>
                      <th className="px-6 py-4 text-[10px] font-black text-emerald-800 uppercase tracking-widest text-right">Market Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayPhones.slice(0, 10).map(phone => (
                      <tr key={phone.id} className="border-b border-slate-50 hover:bg-emerald-50/50 transition-colors group">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                          <a href={`/phone/${phone.slug}`} className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                            <span>{phone.name}</span>
                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all text-emerald-400" />
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-black text-emerald-600">
                          {phone.currency} {phone.price.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Coming Soon Section - Amber Theme */}
            <section className="bg-white rounded-2xl border border-amber-100 shadow-sm overflow-hidden">
              <div className="bg-amber-50/50 border-b border-amber-100 px-5 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-amber-900 uppercase tracking-tight leading-none mb-1">Coming Soon</h2>
                  <p className="text-[10px] text-amber-600/70 font-bold uppercase tracking-wider">Anticipated Releases</p>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                {comingSoonPhones.length > 0 ? comingSoonPhones.map(phone => (
                  <div key={phone.id} className="flex flex-col items-center text-center group">
                    <div className="aspect-[3/4] w-28 relative mb-3 bg-slate-50 rounded-2xl p-2 group-hover:scale-105 transition-all shadow-sm">
                      <img src={phone.images?.[0]} alt={phone.name} className="object-cover w-full h-full rounded-xl" referrerPolicy="no-referrer" />
                    </div>
                    <h3 className="text-xs font-black text-slate-800 leading-tight mb-1 group-hover:text-amber-600 transition-colors uppercase">{phone.name}</h3>
                    <div className="bg-amber-100/50 px-2 py-0.5 rounded text-[9px] text-amber-700 font-black uppercase mb-1">Expected Price</div>
                    <p className="text-sm font-black text-slate-900">
                      {phone.currency} {phone.price}
                    </p>
                  </div>
                )) : (
                  <div className="col-span-full py-12 text-center text-muted-foreground text-sm italic">
                    No coming soon mobiles announced yet.
                  </div>
                )}
              </div>
            </section>

            {/* Latest News Section - Violet Theme */}
            <section className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden">
              <div className="bg-violet-50/50 border-b border-violet-100 px-5 py-4 flex justify-between items-center">
                <h2 className="text-sm font-black text-violet-900 uppercase tracking-tight flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-violet-500" />
                  Tech Community & News
                </h2>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-violet-600 hover:text-violet-700 hover:bg-violet-100 uppercase tracking-widest" onClick={() => navigate('/news')}>
                  All News
                </Button>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <a key={post.id} href={`/blog/${post.slug}`} className="group block border border-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <img src={post.image} alt={post.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="p-4 bg-white">
                      <div className="h-1 w-12 bg-violet-600 rounded-full mb-3 group-hover:w-20 transition-all duration-500"></div>
                      <h3 className="text-sm font-black text-slate-800 line-clamp-2 leading-tight group-hover:text-violet-600 transition-colors uppercase antialiased tracking-tight">{post.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
