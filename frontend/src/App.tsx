import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { PhoneDetail } from '@/pages/PhoneDetail';
import { Admin } from '@/pages/Admin';
import { Search } from '@/pages/Search';
import { CategoryPage } from '@/pages/CategoryPage';
import { BlogDetail } from '@/pages/BlogDetail';
import Contact from '@/pages/Contact';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { TermsOfService } from '@/pages/TermsOfService';
import { AuthProvider } from '@/lib/auth';

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans antialiased">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/phone/:slug" element={<PhoneDetail />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/search" element={<Search />} />
              <Route path="/:type/:slug" element={<CategoryPage />} />
              <Route path="/price-range" element={<CategoryPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  </HelmetProvider>
  );
}
