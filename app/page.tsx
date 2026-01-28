import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-[#e5e7eb]">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Image
            src="/fulcrum-logo.png"
            alt="Fulcrum"
            width={120}
            height={30}
            className="h-8 w-auto"
            priority
          />
          <Link
            href="/quote"
            className="px-6 py-2 bg-[#1a1a1a] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors"
          >
            Start Assessment
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-semibold text-[#1a1a1a] mb-6">
            Get Your Custom Quote
          </h1>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto mb-8">
            Complete our quick assessment to receive a personalized quote tailored
            to your organization&apos;s unique operational needs.
          </p>
          <Link
            href="/quote"
            className="inline-flex px-8 py-4 bg-[#1a1a1a] text-white rounded-lg font-medium text-lg hover:bg-[#2a2a2a] transition-colors"
          >
            Start Your Assessment
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 bg-[#f9fafb] rounded-lg">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
              Comprehensive Assessment
            </h3>
            <p className="text-[#6b7280]">
              38 questions across 10 key areas to thoroughly understand your operational complexity.
            </p>
          </div>

          <div className="p-6 bg-[#f9fafb] rounded-lg">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
              Instant Analysis
            </h3>
            <p className="text-[#6b7280]">
              Get immediate insights into your complexity profile and recommended service tier.
            </p>
          </div>

          <div className="p-6 bg-[#f9fafb] rounded-lg">
            <div className="w-12 h-12 bg-[#1a1a1a] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">
              Detailed Report
            </h3>
            <p className="text-[#6b7280]">
              Receive a comprehensive PDF report with pricing estimates and recommendations.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-[#f9fafb] rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] text-center mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
                1
              </div>
              <h4 className="font-medium text-[#1a1a1a] mb-1">Complete Assessment</h4>
              <p className="text-sm text-[#6b7280]">Answer questions about your business</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
                2
              </div>
              <h4 className="font-medium text-[#1a1a1a] mb-1">Get Analysis</h4>
              <p className="text-sm text-[#6b7280]">We analyze your complexity profile</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
                3
              </div>
              <h4 className="font-medium text-[#1a1a1a] mb-1">Receive Report</h4>
              <p className="text-sm text-[#6b7280]">Get detailed quote and insights</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-semibold">
                4
              </div>
              <h4 className="font-medium text-[#1a1a1a] mb-1">Connect With Us</h4>
              <p className="text-sm text-[#6b7280]">Discuss your specific needs</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#1a1a1a] mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-[#6b7280] mb-6">
            The assessment takes about 10-15 minutes to complete.
          </p>
          <Link
            href="/quote"
            className="inline-flex px-8 py-4 bg-[#1a1a1a] text-white rounded-lg font-medium text-lg hover:bg-[#2a2a2a] transition-colors"
          >
            Begin Assessment
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] mt-16">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Image
              src="/fulcrum-logo.png"
              alt="Fulcrum"
              width={100}
              height={25}
              className="h-6 w-auto"
            />
            <p className="text-sm text-[#9ca3af]">
              Building Operational Leverage
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
