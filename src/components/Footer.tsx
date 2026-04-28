import { Smartphone, Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Brand } from '@/src/types';

export function Footer() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/brands`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBrands(data.slice(0, 10));
        }
      })
      .catch(err => console.error("Error fetching brands for footer:", err));
  }, []);

  return (
    <footer className="bg-muted/50 border-t pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-[#1a3a5a] rounded-lg text-white">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-[#1a3a5a]">
                MobiSpec<span className="text-muted-foreground text-xs lowercase">.com</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Your ultimate destination for the latest mobile phone specifications, prices, and news. Stay updated with the fast-moving mobile world.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-[#1a3a5a] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-[#1a3a5a] transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-[#1a3a5a] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-[#1a3a5a] transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase text-[#1a3a5a] mb-5 tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="text-muted-foreground hover:text-[#1a3a5a] font-medium transition-colors">Home</a></li>
              <li><a href="/news" className="text-muted-foreground hover:text-[#1a3a5a] font-medium transition-colors">Latest News</a></li>
              <li><a href="/search?q=" className="text-muted-foreground hover:text-[#1a3a5a] font-medium transition-colors">All Mobile Phones</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-[#1a3a5a] font-medium transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h3 className="font-bold text-sm uppercase text-[#1a3a5a] mb-5 tracking-wider">Popular Brands</h3>
            <ul className="grid grid-cols-2 gap-3 text-sm">
              {brands.length > 0 ? brands.map(brand => (
                <li key={brand.id}>
                  <a href={`/brand/${brand.slug}`} className="text-muted-foreground hover:text-[#1a3a5a] font-medium transition-colors">
                    {brand.name}
                  </a>
                </li>
              )) : (
                <li className="text-muted-foreground text-xs">Loading brands...</li>
              )}
              <li><a href="/search?q=" className="text-[#1a3a5a] font-bold hover:underline transition-colors mt-1 block">All Brands</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium text-muted-foreground">
          <p>© {new Date().getFullYear()} MobiSpec. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-[#1a3a5a] transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#1a3a5a] transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-[#1a3a5a] transition-colors">Contact Us</a>
            <a href="/sitemap.xml" className="hover:text-[#1a3a5a] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
