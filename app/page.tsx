import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="https://www.fulcrumcollective.io" className="flex items-center">
              <Image
                src="/fulcrum-logo.png"
                alt="Fulcrum Collective"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <a
              href="https://cal.com/fulcrumcollective/discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
            >
              Schedule a Strategy Call
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#1a1a1a] tracking-tight leading-tight">
            Get Your Custom Quote
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#6b7280] leading-relaxed max-w-3xl mx-auto">
            Complete our quick assessment to receive a personalized quote tailored
            to your organization&apos;s unique operational needs.
          </p>
          <div className="mt-10">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm"
            >
              Start Custom Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Features - Pastel Cards */}
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#eff6ff] rounded-xl p-8 relative">
              <span className="absolute top-6 right-6 text-sm font-medium text-[#6b7280]/50">
                01
              </span>
              <h3 className="text-lg font-semibold text-[#1a1a1a] pr-8 leading-snug">
                Comprehensive Assessment
              </h3>
              <p className="mt-4 text-[#6b7280] leading-relaxed">
                38 questions across 10 key areas to thoroughly understand your operational complexity.
              </p>
            </div>

            <div className="bg-[#f0fdf4] rounded-xl p-8 relative">
              <span className="absolute top-6 right-6 text-sm font-medium text-[#6b7280]/50">
                02
              </span>
              <h3 className="text-lg font-semibold text-[#1a1a1a] pr-8 leading-snug">
                Instant Analysis
              </h3>
              <p className="mt-4 text-[#6b7280] leading-relaxed">
                Get immediate insights into your complexity profile and recommended service tier.
              </p>
            </div>

            <div className="bg-[#fffbeb] rounded-xl p-8 relative">
              <span className="absolute top-6 right-6 text-sm font-medium text-[#6b7280]/50">
                03
              </span>
              <h3 className="text-lg font-semibold text-[#1a1a1a] pr-8 leading-snug">
                Detailed Quote & Report
              </h3>
              <p className="mt-4 text-[#6b7280] leading-relaxed">
                Receive a comprehensive PDF report with pricing estimates and recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                1
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-2">Complete the Quote Request</h4>
              <p className="text-[#6b7280]">Answer questions about your business and operational needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                2
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-2">Receive Custom Quote</h4>
              <p className="text-[#6b7280]">Get detailed pricing and insights delivered to your inbox</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#2563eb] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-semibold">
                3
              </div>
              <h4 className="font-semibold text-[#1a1a1a] mb-2">Connect with Us</h4>
              <p className="text-[#6b7280]">Discuss your specific needs with our team</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-[#6b7280] mb-8">
            The assessment takes about 10-15 minutes to complete.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm"
          >
            Start Custom Quote
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#6b7280]">
              Fulcrum Collective &middot; Building Operational Leverage
            </p>
            <a
              href="https://www.fulcrumcollective.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6b7280] hover:text-[#1a1a1a] transition-colors"
            >
              fulcrumcollective.io
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
