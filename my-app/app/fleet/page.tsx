"use client";
import Image from "next/image";
import {
  Users,
  Briefcase,
  Star,
  CheckCircle,
  Fuel,
  Calendar,
} from "lucide-react";
import banner from "../../public/assets1/banner4.jpg";
import sls from "../../public/assets1/sls.png";
import caravan from "../../public/assets1/caravan.png";
import merc from "../../public/assets1/merc.png";
import comm from "../../public/assets1/MPV_2_Group.png";
import dollor from "../../public/assets1/MPV_3_Group.png";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

export default function Fleet() {

  const fleetVehicles = [
    {
      id: 1,
      name: "Mercedes S-Class",
      category: "Business Class",
      image: sls,
      passengers: "Up to 4 passengers",
      luggage: "Up to 2 large bags",
      features: ["Leather seats", "Climate control", "Wi-Fi", "Bottled water"],
      description: "Ideal for the busy executive. Punctual and professional service in luxury comfort.",
      price: "From £2.50 per mile"
    },
    {
      id: 2,
      name: "Mercedes V-Class",
      category: "First Class",
      image: caravan,
      passengers: "Up to 6 passengers",
      luggage: "Up to 4 large bags",
      features: ["Premium leather", "Individual seating", "Entertainment system", "Refreshments"],
      description: "A truly prestige class. Travel in supreme luxury and comfort with extra space.",
      price: "From £3.50 per mile"
    },
    {
      id: 3,
      name: "Mercedes Vito",
      category: "MPV Class",
      image: merc,
      passengers: "Up to 8 passengers",
      luggage: "Up to 6 large bags",
      features: ["Spacious interior", "Group seating", "Air conditioning", "Luggage compartment"],
      description: "Travel as a group without compromising on luxury & comfort. Perfect for larger parties.",
      price: "From £3.00 per mile"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header activeSection="OUR FLEET" />
      <Hero 
        title="Our Luxury"
        subtitle="Fleet"
        description="Experience ultimate comfort and elegance in our meticulously maintained fleet of premium vehicles"
      />

      {/* Fleet Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Experience Luxury Travel
            </h2>
            <p className="text-primary text-xl">
              in Chauffeur-Driven Executive Cars
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fleetVehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 flex items-center justify-center bg-gray-50">
                  <Image src={vehicle.image} alt={vehicle.name} className="max-h-48 w-auto object-contain" />
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2 text-gray-600">
                      {vehicle.category}
                    </h3>
                    <h4 className="text-lg font-semibold text-gray-800">{vehicle.name}</h4>
                  </div>
                  <p className="text-gray-600 mb-6">
                    {vehicle.description}
                  </p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex gap-2">
                      <div>
                        <Image src={comm} alt="passengers" className="w-[20px] h-[20px]"/>
                      </div>
                      <span className="text-sm text-gray-600">{vehicle.passengers}</span>
                    </div>
                    <div className="flex gap-2">
                      <div>
                        <Image src={dollor} alt="luggage" className="w-[20px] h-[20px]"/>
                      </div>
                      <span className="text-sm text-gray-600">{vehicle.luggage}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-800 mb-2">Features:</h5>
                    <ul className="space-y-1">
                      {vehicle.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-primary">{vehicle.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Features */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <div className="container mx-auto px-4 text-center max-w-[1440px] text-white">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why Choose Our Fleet?
          </h2>
          <p className="text-xl mb-16 text-primary">
            Premium vehicles with exceptional standards
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg text-gray-600 font-bold mb-2">Luxury Standards</h3>
              <p className="text-gray-600 text-sm">All vehicles maintained to the highest luxury standards</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Fuel className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg text-gray-600 font-bold mb-2">Latest Models</h3>
              <p className="text-gray-600 text-sm">Modern fleet with the latest safety and comfort features</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg text-gray-600 font-bold mb-2">Fully Maintained</h3>
              <p className="text-gray-600 text-sm">Regular servicing and cleaning for optimal performance</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold text-gray-600 mb-2">Always Available</h3>
              <p className="text-gray-600 text-sm">Fleet availability 24/7 for your transportation needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Specifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Vehicle Specifications
            </h2>
            <p className="text-primary text-xl">
              Detailed information about our fleet
            </p>
          </div>

          <div className="space-y-12">
            {/* Business Class Details */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Business Class</h3>
                  <p className="text-gray-600 mb-6">Perfect for executive travel and business meetings. Our Business Class vehicles offer comfort, reliability, and professional presentation.</p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Maximum 4 passengers</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">2 large suitcases + hand luggage</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Premium leather interior</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Climate control system</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Image src={sls} alt="Business Class" className="max-w-full h-auto" />
                </div>
              </div>
            </div>

            {/* First Class Details */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1 flex justify-center">
                  <Image src={caravan} alt="First Class" className="max-w-full h-auto" />
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">First Class</h3>
                  <p className="text-gray-600 mb-6">The ultimate in luxury travel. Our First Class vehicles provide exceptional comfort and space for the most discerning travelers.</p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Maximum 6 passengers</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">4 large suitcases + hand luggage</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Individual luxury seating</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Entertainment system</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MPV Class Details */}
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">MPV Class</h3>
                  <p className="text-gray-600 mb-6">Ideal for group travel and family journeys. Our MPV Class vehicles combine space and luxury for comfortable group transportation.</p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Maximum 8 passengers</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">6 large suitcases + hand luggage</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Spacious group seating</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary mr-3" />
                      <span className="text-gray-600">Large luggage compartment</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Image src={merc} alt="MPV Class" className="max-w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#235e99] text-white">
        <div className="container mx-auto px-4 max-w-[1440px] text-center">
          <h2 className="text-4xl font-bold mb-6">Experience Our Luxury Fleet</h2>
          <p className="text-xl mb-8">Book your premium vehicle today and travel in style</p>
          <div className="space-x-4">
            <button className="bg-white text-[#235e99] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Book Now
            </button>
            <button className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-[#235e99] transition-colors">
              View Prices
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}