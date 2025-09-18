"use client";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";
import Image from "next/image";
import merc from "../../../public/assets1/merc.webp";
import dollor from "../../../public/assets1/MPV_3_Group.png";
import comm from "../../../public/assets1/MPV_2_Group.png";

export default function MPVClass() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="OUR FLEET" />

      <Hero
        title="MPV"
        subtitle="Class"
        description="Travel as a group without compromising on luxury and comfort. Perfect for larger parties and extended journeys."
      />

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                MPV Class Vehicle
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Spacious and luxurious multi-passenger vehicle designed for group travel.
                Enjoy premium comfort with room for up to 6 passengers and ample luggage space.
              </p>
            </div>

            {/* Vehicle Image and Specs */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="h-64 flex items-center justify-center">
                    <Image src={merc} alt="MPV Class Vehicle" className="max-w-full h-auto" />
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
                          Maximum Passengers: 6
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
                          Maximum Luggage: 4 Large Cases
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Spacious Features</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Premium leather captain's chairs
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Individual climate control zones
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Panoramic sunroof
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Multiple USB charging ports
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Complimentary WiFi for all passengers
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Ample legroom and headspace
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Group Travel Solutions</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Corporate team transportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Airport group transfers
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Wedding party transportation
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Family leisure travel
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Conference and event transport
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Sightseeing tours
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Group Travel Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Cost Effective</h3>
                  <p className="text-gray-600 text-sm">
                    Travel together and share the cost while enjoying luxury service
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Together</h3>
                  <p className="text-gray-600 text-sm">
                    Keep your group together throughout the journey
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-[#235e99] text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Luggage Space</h3>
                  <p className="text-gray-600 text-sm">
                    Generous luggage capacity for extended trips
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600 mb-8">
                Perfect for group travel without compromising on comfort or luxury. Our MPV Class vehicles
                offer the ideal solution for larger parties who value quality and convenience.
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