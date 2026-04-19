import { SEO } from '@/src/components/SEO';
import { Card, CardContent } from '@/components/ui/card';

export function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title="Terms of Service - MobiSpec" 
        description="Read our terms of service to understand the rules and guidelines for using MobiSpec."
      />
      <Card className="max-w-4xl mx-auto border-none shadow-sm overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8 text-[#1a3a5a]">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using MobiSpec, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on MobiSpec's web site for personal, non-commercial transitory viewing only.
              </p>
              <p>
                This license shall automatically terminate if you violate any of these restrictions and may be terminated by MobiSpec at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">3. Disclaimer</h2>
              <p>
                The materials on MobiSpec's web site are provided "as is". MobiSpec makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">4. Limitations</h2>
              <p>
                In no event shall MobiSpec or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MobiSpec's Internet site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#1a3a5a] mb-3">5. Revisions and Errata</h2>
              <p>
                The materials appearing on MobiSpec's web site could include technical, typographical, or photographic errors. MobiSpec does not warrant that any of the materials on its web site are accurate, complete, or current.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
