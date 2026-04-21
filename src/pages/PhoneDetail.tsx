import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SEO } from '@/src/components/SEO';
import { Sidebar } from '@/src/components/Sidebar';
import { PhoneCard } from '@/src/components/PhoneCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ChevronRight, Newspaper, Smartphone, Clock } from 'lucide-react';
import { Mobile, BlogPost } from '@/src/types';
import { motion } from 'motion/react';
import { useAuth } from '@/src/lib/auth';
import { StarRating } from '@/src/components/StarRating';
import { CommentSection } from '@/src/components/CommentSection';

export function PhoneDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [phone, setPhone] = useState<Mobile | null>(null);
  const [similarMobiles, setSimilarMobiles] = useState<Mobile[]>([]);
  const [brandMobiles, setBrandMobiles] = useState<Mobile[]>([]);
  const [brandNews, setBrandNews] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 800; // Roughly after the specs table
      setShowFilters(scrollY < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/mobiles/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setPhone(data);
          // Fetch additional data
          fetch(`/api/mobiles/${slug}/similar`).then(res => res.json()).then(setSimilarMobiles);
          fetch(`/api/mobiles/${slug}/brand-related`).then(res => res.json()).then(setBrandMobiles);
          fetch(`/api/posts/brand/${data.brand}`).then(res => res.json()).then(setBrandNews);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Loading phone details...</p>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Phone not found.</p>
        <a href="/" className="text-primary hover:underline mt-4 inline-block">Go back home</a>
      </div>
    );
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": phone.name,
    "image": phone.images,
    "description": phone.description,
    "brand": {
      "@type": "Brand",
      "name": phone.brand
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": phone.price.toString().replace(',', ''),
      "availability": "https://schema.org/InStock"
    }
  };

  const pkrPrice = phone.specs?.price?.pkr || phone.price.toLocaleString();
  const usdPrice = phone.specs?.price?.usd || (parseInt(phone.price.toString().replace(/,/g, '')) / 280).toFixed(0);

  const renderSpecRow = (label: string, value: string | undefined) => {
    if (!value) return null;
    return (
      <tr className="border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
        <th className="px-8 py-4 font-bold w-1/3 text-slate-400 uppercase tracking-widest text-[9px]">{label}</th>
        <td className="px-8 py-4 text-slate-700 font-semibold">{value}</td>
      </tr>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <SEO 
        title={phone.seoTitle || `${phone.name} Price in Pakistan & Specs`} 
        description={phone.seoDescription || `Complete specifications and price of ${phone.name} in Pakistan. Filter by features, compare with other mobiles, and explore latest tech specs.`}
        ogImage={phone.images[0]}
        ogType="product"
        schema={productSchema}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-black text-muted-foreground mb-8 uppercase tracking-widest">
          <a href="/" className="hover:text-primary transition-colors">Mobile Portal</a>
          <ChevronRight className="h-2 w-2" />
          <a href={`/brand/${phone.brand.toLowerCase()}`} className="hover:text-primary transition-colors">{phone.brand}</a>
          <ChevronRight className="h-2 w-2" />
          <span className="text-primary">{phone.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-12">

            {/* Product Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-100 rounded-[2.5rem] shadow-aesthetic overflow-hidden p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Left: Image */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <Badge className="bg-primary/5 text-primary border-none mb-4 font-black uppercase tracking-tighter transition-all hover:bg-primary/10 cursor-default">Official Review</Badge>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 text-center tracking-tight leading-none">{phone.name}</h1>
                  <div className="mb-6">
                    <StarRating mobileId={phone.id} />
                  </div>
                  
                  <div className="aspect-[3/4] w-full relative mb-8 group">
                    <img 
                      src={phone.images[0]} 
                      alt={phone.name} 
                      className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="bg-slate-50/50 rounded-2xl p-6 w-full text-center border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Estimated Market Price</p>
                    <p className="text-2xl font-black text-[#ef4444] leading-none mb-1">
                      Rs. {pkrPrice}
                    </p>
                    <p className="text-sm font-bold text-slate-500">${usdPrice} USD</p>
                  </div>
                </div>

                {/* Right: Info */}
                <div className="md:col-span-7 space-y-8 py-4">
                  <div className="bg-primary/5 rounded-3xl p-6 border border-primary/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                      <Smartphone className="h-24 w-24" />
                    </div>
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-3">Market Position</h3>
                    <p className="text-sm leading-relaxed text-slate-700 font-medium italic relative z-10">
                      "{phone.description}"
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                       <Badge variant="outline" className="text-[10px] bg-white">4G LTE Supported</Badge>
                       <Badge variant="outline" className="text-[10px] bg-white">Quick Charge</Badge>
                       <Badge variant="outline" className="text-[10px] bg-white">Global Warranty</Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">
                        The current price of <span className="font-black text-primary">{phone.name}</span> in Pakistan is <span className="font-black text-[#ef4444]">Rs. {pkrPrice}</span>. 
                        Price values are regulated by official dealers and warranty providers for <span className="font-black">{phone.brand}</span> mobile products.
                      </p>
                    </div>
                  </div>

                  {/* Quick Specs Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-slate-100 rounded-2xl p-4 hover:shadow-aesthetic transition-all">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Battery</h4>
                      <p className="text-xs font-bold text-slate-700 line-clamp-1">{phone.specs?.battery?.capacity || 'Standard'}</p>
                    </div>
                    <div className="border border-slate-100 rounded-2xl p-4 hover:shadow-aesthetic transition-all">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Display</h4>
                      <p className="text-xs font-bold text-slate-700 line-clamp-1">{typeof phone.specs?.display === 'object' ? phone.specs.display.size : 'Standard'}</p>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* Detailed Specifications Table */}
            <section className="bg-white border border-slate-100 rounded-[2.5rem] shadow-aesthetic overflow-hidden">
              <div className="bg-slate-900 text-white px-8 py-5 flex items-center justify-between">
                <h2 className="text-sm font-black uppercase tracking-widest">TECHNICAL SPECIFICATIONS</h2>
                <Badge className="bg-white/10 text-white border-none text-[8px]">PRO SPECS</Badge>
              </div>
              <div className="p-0">
                <table className="w-full text-left border-collapse text-xs">
                  <tbody>
                    {/* Build Section */}
                    {phone.specs?.build && (
                      <tr className="border-b border-slate-50">
                        <th className="px-8 py-6 font-black text-slate-900 w-1/4 align-top uppercase tracking-tighter text-[11px]">Build</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("OS", phone.specs.build.os)}
                              {renderSpecRow("UI", phone.specs.build.ui)}
                              {renderSpecRow("Dimensions", phone.specs.build.dimensions)}
                              {renderSpecRow("Weight", phone.specs.build.weight)}
                              {renderSpecRow("SIM", phone.specs.build.sim)}
                              {renderSpecRow("Colors", phone.specs.build.colors)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Frequency Section */}
                    {phone.specs?.frequency && (
                      <tr className="border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Frequency</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("2G Band", phone.specs.frequency['2g'])}
                              {renderSpecRow("3G Band", phone.specs.frequency['3g'])}
                              {renderSpecRow("4G Band", phone.specs.frequency['4g'])}
                              {renderSpecRow("5G Band", phone.specs.frequency['5g'])}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Processor Section */}
                    {phone.specs?.processor && (
                      <tr className="bg-[#f8f9fa] border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Processor</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("CPU", phone.specs.processor.cpu)}
                              {renderSpecRow("Chipset", phone.specs.processor.chipset)}
                              {renderSpecRow("GPU", phone.specs.processor.gpu)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Display Section */}
                    {phone.specs?.display && typeof phone.specs.display === 'object' && (
                      <tr className="border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Display</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("Technology", phone.specs.display.technology)}
                              {renderSpecRow("Size", phone.specs.display.size)}
                              {renderSpecRow("Resolution", phone.specs.display.resolution)}
                              {renderSpecRow("Protection", phone.specs.display.protection)}
                              {renderSpecRow("Extra Features", phone.specs.display.extra)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Memory Section */}
                    {phone.specs?.memory && (
                      <tr className="bg-[#f8f9fa] border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Memory</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("Built-in", phone.specs.memory.builtin)}
                              {renderSpecRow("Card Slot", phone.specs.memory.card)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Camera Section */}
                    {phone.specs?.camera && typeof phone.specs.camera === 'object' && (
                      <tr className="border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Camera</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("Main", phone.specs.camera.main)}
                              {renderSpecRow("Features", phone.specs.camera.features)}
                              {renderSpecRow("Front", phone.specs.camera.front)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Connectivity Section */}
                    {phone.specs?.connectivity && (
                      <tr className="bg-[#f8f9fa] border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Connectivity</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("WLAN", phone.specs.connectivity.wlan)}
                              {renderSpecRow("Bluetooth", phone.specs.connectivity.bluetooth)}
                              {renderSpecRow("GPS", phone.specs.connectivity.gps)}
                              {renderSpecRow("Radio", phone.specs.connectivity.radio)}
                              {renderSpecRow("USB", phone.specs.connectivity.usb)}
                              {renderSpecRow("NFC", phone.specs.connectivity.nfc)}
                              {renderSpecRow("Infrared", phone.specs.connectivity.infrared)}
                              {renderSpecRow("Data", phone.specs.connectivity.data)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Features Section */}
                    {phone.specs?.features && typeof phone.specs.features === 'object' && !Array.isArray(phone.specs.features) && (
                      <tr className="border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Features</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("Sensors", phone.specs.features.sensors)}
                              {renderSpecRow("Audio", phone.specs.features.audio)}
                              {renderSpecRow("Browser", phone.specs.features.browser)}
                              {renderSpecRow("Messaging", phone.specs.features.messaging)}
                              {renderSpecRow("Games", phone.specs.features.games)}
                              {renderSpecRow("Torch", phone.specs.features.torch)}
                              {renderSpecRow("Extra", phone.specs.features.extra)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Battery Section */}
                    {phone.specs?.battery && typeof phone.specs.battery === 'object' && (
                      <tr className="bg-[#f8f9fa] border-b">
                        <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Battery</th>
                        <td className="p-0 w-3/4">
                          <table className="w-full border-collapse">
                            <tbody>
                              {renderSpecRow("Capacity", phone.specs.battery.capacity)}
                              {renderSpecRow("Extra", phone.specs.battery.extra)}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}

                    {/* Price Section */}
                    <tr className="border-b">
                      <th className="px-4 py-3 font-bold text-[#1a3a5a] w-1/4 align-top">Price</th>
                      <td className="p-0 w-3/4">
                        <table className="w-full border-collapse">
                          <tbody>
                            <tr className="border-b last:border-0">
                              <th className="px-4 py-2 font-bold w-1/3 text-muted-foreground">Price in Rs.</th>
                              <td className="px-4 py-2 font-bold text-[#d32f2f]">Rs. {pkrPrice}</td>
                            </tr>
                            <tr className="border-b last:border-0">
                              <th className="px-4 py-2 font-bold w-1/3 text-muted-foreground">Price in USD</th>
                              <td className="px-4 py-2 font-bold text-[#d32f2f]">${usdPrice}</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Discussion Section */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-aesthetic">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">User Discussions</h2>
              </div>
              <CommentSection mobileId={phone.id} currentUser={user} />
            </div>

            {/* Disclaimer */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 text-[10px] text-slate-400 leading-relaxed">
              <p className="font-black text-slate-500 uppercase tracking-widest mb-3">Disclaimer & Verification</p>
              <p className="font-medium italic">{phone.brand} {phone.name} specifications and prices in Pakistan are gathered from reputable local retailers and official brand documentations. While we strive for absolute accuracy, market variations and human data entry are possible. We recommend verifying the final price with your nearest authorized dealership. MobiSpec is not liable for price discrepancies at the time of purchase.</p>
            </div>

            {/* Similar Phones Section */}
            {similarMobiles.length > 0 && (
              <section className="space-y-6 pt-8">
                <div className="flex items-end justify-between px-2">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">SIMILAR MODELS</h2>
                    <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-wider">Comparable Specs & Price</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {similarMobiles.map((m) => (
                    <PhoneCard key={m.id} phone={m} />
                  ))}
                </div>
              </section>
            )}

            {/* More From Brand Section */}
            {brandMobiles.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-end justify-between px-2">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">MORE FROM {phone.brand}</h2>
                    <p className="text-[10px] text-muted-foreground mt-1 font-bold uppercase tracking-wider">Explore the ecosystem</p>
                  </div>
                  <a href={`/brand/${phone.brand.toLowerCase()}`} className="text-[10px] font-black text-primary hover:underline flex items-center group uppercase tracking-widest">
                    View Catalog <ChevronRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {brandMobiles.map((m) => (
                    <PhoneCard key={m.id} phone={m} />
                  ))}
                </div>
              </section>
            )}

            {/* Brand News Section */}
            {brandNews.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Tech Insights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {brandNews.map((post) => (
                    <a key={post.id} href={`/blog/${post.slug}`} className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col sm:flex-row gap-4 p-4 hover:shadow-aesthetic transition-all group">
                      <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-50 rounded-2xl overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm font-black text-slate-800 line-clamp-3 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="secondary" className="text-[8px] bg-slate-100 text-slate-500 border-none font-black uppercase">Editorial</Badge>
                          <p className="text-[10px] text-slate-400 font-bold">{new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="">
              <Sidebar showPriceFilters={showFilters} showFeatureFilters={showFilters} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
