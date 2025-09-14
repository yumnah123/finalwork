"use client";

import { CheckCircle, Clock, Star, CreditCard } from "lucide-react";
import { pricingConfig } from "../../lib/pricing-config";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "@/components/Hero";

export default function PricingPage() {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const serviceFeatures = {
    "Airport Transfer": [
      "Meet and greet service",
      "Flight monitoring included",
      "Free waiting time included",
      "Professional chauffeur"
    ],
    "Corporate Travel": [
      "Executive vehicles",
      "Wi-Fi available",
      "Phone charging facilities",
      "Flexible scheduling"
    ],
    "Wedding Cars": [
      "Luxury vehicle decoration",
      "Red carpet service",
      "Complimentary champagne",
      "Professional photography assistance"
    ],
    "Business & Social Events": [
      "Event coordination",
      "Multiple vehicle options",
      "Group discounts available",
      "Flexible timing"
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="PRICING" />

            <Hero
              title="Transparent"
              subtitle="Pricing"
              description="No hidden fees, no surprises. Our clear pricing structure ensures you know exactly what you're paying for."
            />

      {/* Hero Section
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              No hidden fees, no surprises. Our clear pricing structure ensures you know exactly what you're paying for.
            </p>
          </div>
        </div>
      </section> */}

      {/* Pricing Structure Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Pricing Works</h2>
            <p className="text-lg text-gray-600">Every quote consists of three main components</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center bg-gray-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">£</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Base Fare</h3>
              <p className="text-gray-600 mb-4">Starting price that varies by service type</p>
              <div className="text-2xl font-bold text-[#235e99]">
                From {formatCurrency(Math.min(...Object.values(pricingConfig.baseFare)))}
              </div>
            </div>

            <div className="text-center bg-gray-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">📍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Distance Cost</h3>
              <p className="text-gray-600 mb-4">Calculated based on actual route distance</p>
              <div className="text-2xl font-bold text-[#235e99]">
                {formatCurrency(pricingConfig.costPerMile)}/mile
              </div>
            </div>

            <div className="text-center bg-gray-50 rounded-lg p-8">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Waiting Time</h3>
              <p className="text-gray-600 mb-4">Estimated based on service type</p>
              <div className="text-2xl font-bold text-[#235e99]">
                {formatCurrency(pricingConfig.costPerMinuteWaiting)}/min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types & Base Fares */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Types & Base Fares</h2>
            <p className="text-lg text-gray-600">Different services have different base rates to reflect their unique requirements</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(pricingConfig.baseFare).filter(([key]) => key !== "Select Service").map(([service, fare]) => (
              <div key={service} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service}</h3>
                  <div className="text-3xl font-bold text-[#235e99] mb-4">
                    {formatCurrency(fare)}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Base fare</p>
                  <div className="space-y-2">
                    {serviceFeatures[service as keyof typeof serviceFeatures]?.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surge Pricing Rules */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Surge Pricing Rules</h2>
            <p className="text-lg text-gray-600">Additional charges may apply during peak times to ensure service availability</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📊</span>
                </div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">Weekday Peak Hours</h3>
                <p className="text-orange-700 mb-4">
                  Monday - Friday<br />
                  7:00 AM - 9:00 AM<br />
                  5:00 PM - 7:00 PM
                </p>
                <div className="text-2xl font-bold text-orange-600">
                  +{pricingConfig.surgeRules.weekdayPeakPercentage}%
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">📅</span>
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">Saturday</h3>
                <p className="text-blue-700 mb-4">
                  All day Saturday<br />
                  High demand day
                </p>
                <div className="text-2xl font-bold text-blue-600">
                  +{pricingConfig.surgeRules.saturdayPercentage}%
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">🗓️</span>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Sunday</h3>
                <p className="text-green-700 mb-4">
                  All day Sunday<br />
                  Weekend premium
                </p>
                <div className="text-2xl font-bold text-green-600">
                  +{pricingConfig.surgeRules.sundayPercentage}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
              <p className="text-yellow-800 font-medium">
                💡 Surge pricing ensures driver availability during high-demand periods
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Our Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Transparent Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">What you see is what you pay. No surprise charges.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fixed Rates</h3>
              <p className="text-gray-600">Your quote is guaranteed for 30 minutes.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Service</h3>
              <p className="text-gray-600">Professional drivers and luxury vehicles included.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Available</h3>
              <p className="text-gray-600">Round-the-clock service with consistent pricing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#235e99]">
        <div className="container mx-auto px-4 max-w-[1440px] text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Your Quote?</h2>
          <p className="text-xl text-gray-200 mb-8">
            Use our instant quote calculator to see exactly what your journey will cost
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quote"
              className="bg-white text-[#235e99] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Instant Quote
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}