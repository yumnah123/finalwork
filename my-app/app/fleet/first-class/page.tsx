"use client";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import caravan from "../../../public/assets1/caravan.webp";
import dollor from "../../../public/assets1/MPV_3_Group.png";
import comm from "../../../public/assets1/MPV_2_Group.png";

export default function FirstClass() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="OUR FLEET" />

      <Hero
        title="First"
        subtitle="Class"
        description="A truly prestige class. Travel in supreme luxury and comfort with our premium first-class vehicles."
      />

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                First Class Vehicle
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience the ultimate in luxury travel. Our First Class vehicles offer supreme comfort
                and elegance for those who demand the very best.
              </p>
            </div>

            {/* Vehicle Image and Specs */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="h-64 flex items-center justify-center">
                    <Image src={caravan} alt="First Class Vehicle" className="max-w-full h-auto" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Vehicle Specifications</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={dollor}
                          alt="passengers"
                          className="w-[24px] h-[24px]"
                        />
                        <span className="text-lg font-medium text-gray-800">
                          Maximum Passengers: 4
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex gap-2 items-center">
                        <Image
                          src={comm}
                          alt="luggage"
                          className="w-[24px] h-[24px]"
                        />
                        <span className="text-lg font-medium text-gray-800">
                          Maximum Luggage: 2 Large Cases
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Luxury Features</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Premium hand-stitched leather interior
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Advanced climate control with individual zones
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    High-speed complimentary WiFi
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Premium bottled water and refreshments
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Daily newspapers and magazines
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Sound insulation for privacy
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfect For</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    VIP airport transfers
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    High-profile business meetings
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Special occasions and celebrations
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Executive roadshows
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Luxury leisure travel
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Distinguished guest transportation
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">The First Class Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Supreme Luxury</h3>
                  <p className="text-gray-600 text-sm">
                    Enjoy the finest materials and craftsmanship in every detail
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Exceptional Service</h3>
                  <p className="text-gray-600 text-sm">
                    Our most experienced chauffeurs providing white-glove service
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Absolute Privacy</h3>
                  <p className="text-gray-600 text-sm">
                    Discretion and confidentiality guaranteed at all times
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600 mb-8">
                Indulge in the ultimate luxury travel experience. Our First Class vehicles represent the pinnacle
                of automotive excellence and chauffeur service.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.href = '/quote'}
                  className="bg-[#235e99] hover:bg-[#1a4773] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg cursor-pointer"
                >
                  Book Now
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