"use client";

import { useState } from "react";
import { Calculator, Clock, MapPin, Calendar, User, Mail, PhoneCall } from "lucide-react";
import { AddressAutocomplete } from '../../components/AddressAutocomplete';
import { QuoteDisplay } from '../../components/QuoteDisplay';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { AddressResult } from '../../hooks/useAddressAutocomplete';
import { QuoteService } from '../../lib/quote-service';
import { QuoteBreakdown } from '../../lib/pricing-config';
import Hero from "@/components/Hero";

export default function QuotePage() {
  // Form state
  const [pickupAddress, setPickupAddress] = useState<AddressResult | null>(null);
  const [dropoffAddress, setDropoffAddress] = useState<AddressResult | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceType, setServiceType] = useState('Select Service');
  const [waitingTime, setWaitingTime] = useState<number>(0); // Optional waiting time input
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Quote state
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const serviceOptions = [
    'Select Service',
    'Airport Transfer',
    'Corporate Travel',
    'Wedding Cars',
    'Business & Social Events'
  ];

  const isFormValid = () => {
    return (
      pickupAddress &&
      dropoffAddress &&
      customerName.trim() &&
      customerEmail.trim() &&
      contactNumber.trim() &&
      selectedDate &&
      selectedTime &&
      serviceType !== 'Select Service'
    );
  };

  const handleGetQuote = async () => {
    if (!isFormValid() || !pickupAddress || !dropoffAddress) return;

    setQuoteLoading(true);
    try {
      const quoteDate = new Date(selectedDate);
      const generatedQuote = await QuoteService.generateQuote(
        pickupAddress,
        dropoffAddress,
        serviceType,
        quoteDate,
      );
      setQuote(generatedQuote);
      setShowQuote(true);
    } catch (error) {
      console.error('Error generating quote:', error);
      alert('Failed to generate quote. Please try again.');
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleCloseQuote = () => {
    setShowQuote(false);
    setQuote(null);
  };

  const handleSubmitEnquiry = () => {
    if (!quote) return;

    // Prepare enquiry data
    const enquiryData = {
      customer: {
        name: customerName,
        email: customerEmail,
        phone: contactNumber
      },
      journey: {
        pickup: pickupAddress?.display_name,
        dropoff: dropoffAddress?.display_name,
        date: selectedDate,
        time: selectedTime,
        serviceType,
        waitingTime,
        additionalNotes
      },
      quote: {
        total: quote.total,
        breakdown: {
          baseFare: quote.baseFare,
          distanceCost: quote.distanceCost,
          waitingTimeCost: quote.waitingTimeCost,
          surgeAmount: quote.surgeAmount
        },
        distance: quote.distance,
        duration: quote.estimatedDuration,
        validUntil: quote.validUntil
      }
    };

    // For now, we'll just show an alert with the enquiry data
    // In a real application, this would be sent to your backend
    console.log('Enquiry submitted:', enquiryData);
    alert('Enquiry submitted successfully! We will contact you shortly to confirm your booking.');

    // Reset form
    setPickupAddress(null);
    setDropoffAddress(null);
    setCustomerName('');
    setCustomerEmail('');
    setContactNumber('');
    setSelectedDate('');
    setSelectedTime('');
    setServiceType('Select Service');
    setWaitingTime(0);
    setAdditionalNotes('');
    handleCloseQuote();
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="QUOTE" />

      {/* Hero Section */}
      {/* <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get Your Instant Quote
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Calculate your fare in seconds. Enter your journey details below and receive an accurate quote based on distance, time, and service type.
            </p>
          </div>
        </div>
      </section> */}

                  <Hero
                    title="Get Your"
                    subtitle="Instant Quote"
                    description="Calculate your fare in seconds. Enter your journey details below and receive an accurate quote based on distance, time, and service type."
                  />
      

      {/* Quote Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
              <div className="flex items-center mb-6">
                <Calculator className="w-8 h-8 text-[#235e99] mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Quote Calculator</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Address */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Pickup Address *
                  </label>
                  <AddressAutocomplete
                    onAddressSelect={setPickupAddress}
                    placeholder="Enter pickup location"
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  />
                </div>

                {/* Dropoff Address */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    Destination Address *
                  </label>
                  <AddressAutocomplete
                    onAddressSelect={setDropoffAddress}
                    placeholder="Enter destination"
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  />
                </div>

                {/* Customer Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  />
                </div>

                {/* Customer Email */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <PhoneCall className="w-4 h-4 mr-1" />
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  >
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    Journey Date *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    Journey Time *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    {generateTimeSlots().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Waiting Time */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    Additional Waiting Time (Optional)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={waitingTime}
                      onChange={(e) => setWaitingTime(parseInt(e.target.value) || 0)}
                      className="w-24 p-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                    />
                    <span className="text-gray-600">minutes</span>
                    <span className="text-sm text-gray-500">
                      (Standard waiting time is included based on service type)
                    </span>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any special requirements or additional information"
                    rows={3}
                    className="w-full p-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#235e99] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Get Quote Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleGetQuote}
                  disabled={!isFormValid() || quoteLoading}
                  className={`px-8 py-4 rounded-lg font-semibold text-white transition-colors ${
                    !isFormValid() || quoteLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#235e99] hover:bg-[#1e4f82]'
                  }`}
                >
                  {quoteLoading ? 'Calculating...' : 'Get Instant Quote'}
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  * Required fields must be filled to calculate quote
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Quote Calculator Works</h2>
            <p className="text-lg text-gray-600">Our pricing is calculated using real-time data for maximum accuracy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Distance Calculation</h3>
              <p className="text-gray-600">
                We use postcode-to-postcode distance lookup via OpenRoute Service for accurate route calculation
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Time-Based Pricing</h3>
              <p className="text-gray-600">
                Surge pricing applies based on day of the week and time of day for fair availability pricing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#235e99] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent Breakdown</h3>
              <p className="text-gray-600">
                See exactly how your quote is calculated with a detailed breakdown of all charges
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Display Modal */}
      {showQuote && (
        <QuoteDisplay
          quote={quote}
          loading={quoteLoading}
          pickup={pickupAddress}
          dropoff={dropoffAddress}
          onClose={handleCloseQuote}
          onBook={handleSubmitEnquiry}
          bookButtonText="Submit Enquiry"
        />
      )}

      <Footer />
    </div>
  );
}