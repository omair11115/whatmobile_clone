import { Smartphone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Brand } from '@/src/types';

export function Footer() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    fetch('/api/brands')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBrands(data.slice(0, 10));
        }
      })
      .catch(err => console.error("Error fetching brands for footer:", err));
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-linear-to-br from-primary to-secondary rounded-lg text-white">
                <Smartphone className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white">
                Mobi<span className="text-primary">Spec</span><span className="text-slate-500 text-xs lowercase ml-0.5 opacity-70">.com</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-medium">
              Your ultimate destination for the latest mobile phone specifications, prices, and news. Stay updated with the fast-moving mobile world.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-primary transition-all"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-primary transition-all"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-primary transition-all"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-primary transition-all"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-xs uppercase text-white mb-6 tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-4 text-sm">
              <li><a href="/" className="text-slate-400 hover:text-secondary font-semibold transition-colors flex items-center gap-1 group">
                <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Home
              </a></li>
              <li><a href="/news" className="text-slate-400 hover:text-secondary font-semibold transition-colors flex items-center gap-1 group">
                <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Latest News
              </a></li>
              <li><a href="/search?q=" className="text-slate-400 hover:text-secondary font-semibold transition-colors flex items-center gap-1 group">
                <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> All Mobile Phones
              </a></li>
              <li><a href="/contact" className="text-slate-400 hover:text-secondary font-semibold transition-colors flex items-center gap-1 group">
                <ChevronRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Contact Us
              </a></li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h3 className="font-black text-xs uppercase text-white mb-6 tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              Popular Brands
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              {brands.length > 0 ? brands.map(brand => (
                <li key={brand.id}>
                  <a href={`/brand/${brand.slug}`} className="text-slate-400 hover:text-primary font-semibold transition-colors flex items-center gap-1 group">
                    <div className="w-1 h-1 bg-slate-700 rounded-full group-hover:bg-primary transition-colors"></div>
                    {brand.name}
                  </a>
                </li>
              )) : (
                <li className="text-slate-500 text-xs">Loading brands...</li>
              )}
              <li className="col-span-2 pt-2">
                <a href="/search?q=" className="text-primary font-black uppercase text-[10px] tracking-widest hover:underline transition-all">
                  Browse All Brands →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
          <p>© {new Date().getFullYear()} MobiSpec. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
