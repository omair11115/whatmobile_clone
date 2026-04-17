import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { PhoneCard } from '@/src/components/PhoneCard';
import { Sidebar } from '@/src/components/Sidebar';
import { SEO } from '@/src/components/SEO';
import { Mobile } from '@/src/types';

export function CategoryPage() {
  const { type, slug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [phones, setPhones] = useState<Mobile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchCategoryData = async () => {
      setIsLoading(true);
      try {
        let apiUrl = '/api/mobiles';
        let pageTitle = 'Mobile Phones';
        const isPriceRange = location.pathname === '/price-range';

        if (type === 'brand') {
          apiUrl += `?brand=${slug}`;
          pageTitle = `${slug?.toUpperCase()} Mobiles`;
        } else if (isPriceRange) {
          const min = searchParams.get('min');
          const max = searchParams.get('max');
          apiUrl += `?minPrice=${min}&maxPrice=${max}`;
          pageTitle = searchParams.get('label') || 'Price Range';
        } else if (type === 'network') {
          // Resolve slug to name
          const res = await fetch('/api/networks');
          const networks = await res.json();
          const target = networks.find((n: any) => n.slug === slug);
          if (target) {
            apiUrl += `?network=${ encodeURIComponent(target.name) }`;
            pageTitle = target.name;
          }
        } else if (type === 'ram') {
          const res = await fetch('/api/ram-options');
          const options = await res.json();
          const target = options.find((o: any) => o.slug === slug);
          if (target) {
            apiUrl += `?ram=${ encodeURIComponent(target.label) }`;
            pageTitle = target.label;
          }
        } else if (type === 'screen') {
          const res = await fetch('/api/screen-sizes');
          const sizes = await res.json();
          const target = sizes.find((s: any) => s.slug === slug);
          if (target) {
            apiUrl += `?screen_size=${ encodeURIComponent(target.label) }`;
            pageTitle = target.label;
          }
        } else if (type === 'os') {
          const res = await fetch('/api/os-options');
          const options = await res.json();
          const target = options.find((o: any) => o.slug === slug);
          if (target) {
            apiUrl += `?os=${ encodeURIComponent(target.name) }`;
            pageTitle = target.name;
          }
        } else if (type === 'feature') {
          const res = await fetch('/api/mobile-features');
          const features = await res.json();
          const target = features.find((f: any) => f.slug === slug);
          if (target) {
            // For features, we might need a different filtering logic if it's an array
            // But for now we'll match exactly if it's stored as a primary feature
            apiUrl += `?feature=${ encodeURIComponent(target.label) }`;
            pageTitle = target.label;
          }
        }

        const res = await fetch(apiUrl);
        const data = await res.json();
        if (Array.isArray(data)) {
          setPhones(data);
        }
        setTitle(pageTitle);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryData();
  }, [type, slug, searchParams]);

  return (
    <div className="min-h-screen bg-[#f0f2f5] pb-12">
      <SEO 
        title={`${ title } Price in Pakistan & Specs`} 
        description={`Find the latest ${ title } mobile phones with detailed specifications and updated prices in Pakistan.`}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 space-y-6">
            <div className="bg-white rounded-lg border shadow-sm items-center p-4 flex justify-between">
              <h1 className="text-xl font-bold text-[#1a3a5a]">{ title }</h1>
              <span className="text-xs text-muted-foreground">{ phones.length } phones found</span>
            </div>

            { isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : phones.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                { phones.map(phone => (
                  <PhoneCard key={ phone.id } phone={ phone } />
                )) }
              </div>
            ) : (
              <div className="bg-white rounded-lg border shadow-sm p-20 text-center">
                <p className="text-muted-foreground italic">No mobiles found in this category.</p>
              </div>
            ) }
          </div>

          <div className="lg:col-span-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
