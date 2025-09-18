"use client";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Hero from "../../../components/Hero";

export default function BusinessEvents() {
  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="SERVICES" />

      <Hero
        title="Business &"
        subtitle="Social Events"
        description="Meticulously planned transportation for corporate events and social gatherings. Seamless coordination for events of any size."
      />

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Business & Social Events
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Whatever the event, big or small, we will meticulously plan the itinerary to ensure a seamless experience for all.
                From corporate conferences to social celebrations, we make transportation the least of your worries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Business Events</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Corporate conferences and seminars
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Business meetings and presentations
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Trade shows and exhibitions
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Corporate hospitality events
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Board meetings and AGMs
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Social Events</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Private parties and celebrations
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Charity events and galas
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Cultural events and shows
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Sporting events and hospitality
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Anniversary celebrations
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Event Planning Services</h2>
              <p className="text-gray-600 mb-6">
                Our experienced team works closely with event organizers to coordinate transportation logistics,
                ensuring every guest arrives on time and in comfort.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Route Planning</h3>
                  <p className="text-gray-600 text-sm">
                    Optimized routes and timing for multiple pickup locations
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Group Coordination</h3>
                  <p className="text-gray-600 text-sm">
                    Managing transportation for groups of all sizes
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Event Support</h3>
                  <p className="text-gray-600 text-sm">
                    On-site coordination and real-time adjustments
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us for Events?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Dedicated event coordinator
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Fleet of vehicles for any group size
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Professional uniformed chauffeurs
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Real-time tracking and communication
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Flexible scheduling and last-minute changes
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#235e99] mr-2">•</span>
                    Comprehensive event transportation planning
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-600 mb-8">
                Make your next event a memorable success with professional transportation that matches the caliber
                of your occasion. Contact us to discuss your event transportation needs.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => window.location.href = '/quote'}
                  className="bg-[#235e99] hover:bg-[#1a4773] text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                >
                  Plan Event Transport
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