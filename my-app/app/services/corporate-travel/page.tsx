"use client";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";

export default function CorporateTravel() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="SERVICES" />

      <Hero
        title="Corporate"
        subtitle="Travel"
        description="Professional executive transportation for businesses. Reliable, punctual, and discreet service for all your corporate needs."
      />

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Corporate Travel Services
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Goldstar Executive is the perfect partner for businesses seeking reliable, professional transportation solutions.
                Our corporate travel services are designed to meet the demanding schedules and high standards of business professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Our Corporate Service?</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Dedicated corporate accounts with priority booking
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Flexible billing and monthly invoicing options
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Regular, trusted chauffeurs for consistency
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    24/7 availability for urgent business travel
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Discrete and professional service
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfect For</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Client meetings and presentations
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Conference and seminar transportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Executive travel between offices
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Site visits and inspections
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Corporate events and functions
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Corporate Fleet</h2>
              <p className="text-gray-600 mb-6">
                Our executive vehicles are meticulously maintained and equipped with modern amenities to ensure your journey is comfortable and productive.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Business Class</h3>
                  <p className="text-gray-600 text-sm">Mercedes S-Class, BMW 7 Series</p>
                  <p className="text-gray-600 text-sm">Up to 4 passengers</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">First Class</h3>
                  <p className="text-gray-600 text-sm">Luxury executive vehicles</p>
                  <p className="text-gray-600 text-sm">Premium comfort for 4</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">MPV Class</h3>
                  <p className="text-gray-600 text-sm">Mercedes V-Class, luxury MPVs</p>
                  <p className="text-gray-600 text-sm">Up to 6 passengers</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600 mb-8">
                Ready to elevate your corporate transportation? Contact us today to discuss your business requirements
                and discover how our corporate travel services can enhance your professional image and productivity.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.href = '/quote'}
                  className="bg-[#235e99] hover:bg-[#1a4773] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg cursor-pointer"
                >
                  Get Corporate Quote
                </button>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="border border-[#235e99] text-[#235e99] hover:bg-[#235e99] hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors cursor-pointer"
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