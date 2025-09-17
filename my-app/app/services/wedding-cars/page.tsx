"use client";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";

export default function WeddingCars() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="SERVICES" />

      <Hero
        title="Wedding"
        subtitle="Cars"
        description="Luxury wedding car hire with immaculate vehicles and professional chauffeurs to make your special day perfect."
      />

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Wedding Car Services
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                For the special occasion we can supply the special car. Speak to us now about your wedding packages.
                Make your wedding day transportation as memorable as the day itself with our luxury wedding car service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Wedding Packages</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Bridal car service with red carpet
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Wedding party transportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Guest transportation coordination
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Photography session transport
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Reception venue transfers
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Luxury Fleet</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Mercedes S-Class luxury sedans
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    BMW 7 Series executive cars
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Luxury MPVs for wedding parties
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Classic and vintage cars available
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Decorated vehicles on request
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Wedding Day Timeline</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Bridal Pickup</h3>
                  <p className="text-gray-600 text-sm">
                    Elegant arrival at the ceremony venue
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Ceremony</h3>
                  <p className="text-gray-600 text-sm">
                    Transportation to photography locations
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Photos</h3>
                  <p className="text-gray-600 text-sm">
                    Multiple location photography support
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Reception</h3>
                  <p className="text-gray-600 text-sm">
                    Grand arrival at reception venue
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Special Wedding Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Complimentary champagne for the couple
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Red carpet service at venues
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Vehicle decoration with ribbons and flowers
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Professional uniformed chauffeurs
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Flexible timing for your schedule
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Photography coordination with your photographer
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600 mb-8">
                Your wedding day is one of the most important days of your life. Let us help make it perfect with
                luxury transportation that matches the elegance and significance of your special day.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.href = '/quote'}
                  className="bg-[#235e99] hover:bg-[#1a4773] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  Book Wedding Cars
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="border border-[#235e99] text-[#235e99] hover:bg-[#235e99] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Discuss Package
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