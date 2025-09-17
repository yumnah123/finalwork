"use client";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";

export default function AirportTransfer() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="SERVICES" />

      <Hero
        title="Airport"
        subtitle="Transfer"
        description="Professional door-to-door airport transfer service covering all major UK airports. Reliable, comfortable, and stress-free travel."
      />

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Airport Transfer Services
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                We provide a professional door-to-door airport transfer service in Surrey, covering all UK airports.
                Start and end your journey in comfort with our reliable and punctual service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Features</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Flight monitoring for delays and early arrivals
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Professional meet and greet service
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Complimentary waiting time included
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Luggage assistance available
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Door-to-door service from any location
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Airports Covered</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Heathrow Airport (LHR)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Gatwick Airport (LGW)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Stansted Airport (STN)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Luton Airport (LTN)
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    London City Airport (LCY)
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Book Your Transfer</h3>
                  <p className="text-gray-600 text-sm">
                    Provide your flight details and pickup/drop-off locations
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Flight Monitoring</h3>
                  <p className="text-gray-600 text-sm">
                    We track your flight and adjust pickup times accordingly
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Meet & Travel</h3>
                  <p className="text-gray-600 text-sm">
                    Your chauffeur meets you and ensures a comfortable journey
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600 mb-8">
                Travel to and from the airport in complete comfort and style. Our professional chauffeurs ensure you arrive
                refreshed and on time, every time.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.href = '/quote'}
                  className="bg-[#235e99] hover:bg-[#1a4773] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  Book Transfer
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="border border-[#235e99] text-[#235e99] hover:bg-[#235e99] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}