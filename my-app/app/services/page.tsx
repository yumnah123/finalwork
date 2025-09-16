"use client";
import {
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Calendar,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import executiveCar from "../../public/assets1/section2.jpg";
import premium from "../../public/assets1/section3.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

export default function Services() {
  const router = useRouter();

  const handleGetQuote = () => {
    router.push('/quote');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="SERVICES" />

      <Hero 
        title="Our Premium"
        subtitle="Services"
        description="Experience luxury and professionalism with our comprehensive range of executive transport services"
      />

      {/* Services Overview */}
      <section
        className="py-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${executiveCar.src})`,
        }}
      >
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Executive Car
            </h2>
            <p className="text-primary text-xl">Services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                }}
              >
                <div className="bg-black/60 h-full flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Airport</h3>
                    <p className="text-sm">Transfer</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional door-to-door airport transfer service to all major UK airports with flight monitoring and meet & greet service
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                }}
              >
                <div className="bg-black/60 h-full flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Business &</h3>
                    <p className="text-sm">Social Events</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Meticulously planned transportation for corporate events, conferences, and social gatherings with seamless coordination
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1108100/pexels-photo-1108100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                }}
              >
                <div className="bg-black/60 h-full flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Corporate</h3>
                    <p className="text-sm">Travel</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dedicated corporate accounts with priority booking, flexible billing, and regular service for business professionals
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                }}
              >
                <div className="bg-black/60 h-full flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Wedding</h3>
                    <p className="text-sm">Cars</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Luxury wedding car hire with immaculate vehicles and professional chauffeurs to make your special day perfect
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${premium.src})`,
        }}
      >
        <div className="container mx-auto px-4 text-center max-w-[1440px] text-white">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose Goldstar Executive?
          </h2>
          <p className="text-xl mb-16 text-gray-300">
            Experience the difference with our premium service features
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-300 text-sm">Round-the-clock service for all your transportation needs</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Door-to-Door</h3>
              <p className="text-gray-300 text-sm">Complete pickup and drop-off service at your convenience</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Fully Licensed</h3>
              <p className="text-gray-300 text-sm">All drivers are licensed, insured, and background-checked</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Group Travel</h3>
              <p className="text-gray-300 text-sm">Accommodate groups of all sizes with our fleet options</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Descriptions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Service Details
            </h2>
            <p className="text-primary text-xl">
              Everything you need to know about our services
            </p>
          </div>

          <div className="space-y-12">
            {/* Airport Transfers */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-6">
                  <MapPin className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Airport Transfers</h3>
                  <p className="text-gray-600">Professional airport transportation</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Features Include:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Flight monitoring</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Meet & greet service</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Luggage assistance</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Free waiting time</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Airports Covered:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Heathrow Airport</li>
                    <li>• Gatwick Airport</li>
                    <li>• Stansted Airport</li>
                    <li>• Luton Airport</li>
                    <li>• London City Airport</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Corporate Travel */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-6">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Corporate Travel</h3>
                  <p className="text-gray-600">Executive business transportation</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Business Benefits:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Corporate accounts</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Priority booking</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Monthly invoicing</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Regular drivers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Perfect For:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Client meetings</li>
                    <li>• Conference transport</li>
                    <li>• Executive travel</li>
                    <li>• Site visits</li>
                    <li>• Business events</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wedding Cars */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mr-6">
                  <Calendar className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Wedding Cars</h3>
                  <p className="text-gray-600">Make your special day perfect</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Wedding Services:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Bridal car service</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Wedding party transport</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Guest transportation</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 mr-2" />Photography coordination</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Luxury Options:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Mercedes S-Class</li>
                    <li>• BMW 7 Series</li>
                    <li>• Luxury MPVs</li>
                    <li>• Classic cars available</li>
                    <li>• Decorated vehicles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#235e99] text-white">
        <div className="container mx-auto px-4 max-w-[1440px] text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Premium Service?</h2>
          <p className="text-xl mb-8">Get your quote today and discover the Goldstar difference</p>
          <div className="space-x-4">
            <button
              onClick={handleGetQuote}
              className="bg-white text-[#235e99] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Quote
            </button>
            {/* <button className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-[#235e99] transition-colors">
              Call Now
            </button> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}