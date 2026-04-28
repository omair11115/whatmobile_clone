import { SEO } from '@/src/components/SEO';
import { Card, CardContent } from '@/components/ui/card';

export function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title="Privacy Policy - MobiSpec" 
        description="Read our privacy policy to understand how we collect, use, and protect your data."
      />
      <Card className="max-w-4xl mx-auto border-none shadow-sm overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8 text-[#1a3a5a]">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">1. Information We Collect</h2>
              <p>
                At MobiSpec, we collect personal information that you provide to us, such as your name and email address when you sign in via Google or subscribe to our newsletter. We also collect non-personal information like your browser type and IP address through cookies to improve our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">2. How We Use Your Information</h2>
              <p>
                We use your information to provide our services, communicate with you, and personalize your experience. Your data helps us improve the functionality of our website and develop new features like customized news feeds and price alerts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">3. Data Protection</h2>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">4. Cookies</h2>
              <p>
                Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser. We use cookies to help us remember and process your preferences for future visits.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">5. Third-Party Links</h2>
              <p>
                Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
