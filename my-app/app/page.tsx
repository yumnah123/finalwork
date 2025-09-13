"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { AddressAutocomplete } from '../components/AddressAutocomplete';
import { QuoteDisplay } from '../components/QuoteDisplay';
import { AddressResult } from '../hooks/useAddressAutocomplete';
import { QuoteService } from '../lib/quote-service';
import { QuoteBreakdown } from '../lib/pricing-config';
import {
  Phone,
  Star,
  CheckCircle,
  Clock,
  CreditCard,
  Coffee,
  Wifi,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import hero1 from "../public/assets1/hero-11.png";
import hero2 from "../public/assets1/hero-2.png";
import rtl from "../public/assets1/rtl-line.png";
import ltr from "../public/assets1/ltr-line.png";
import logo from "../public/Logo.svg";
import airport from "../public/assets1/airport.png";
import business from "../public/assets1/business.png";
import travel from "../public/assets1/travel.png";
import wedding from "../public/assets1/wedding.png";
import comfortable from "../public/assets1/comfortable.png";
import sls from "../public/assets1/sls.png";
import executiveCar from "../public/assets1/section2.jpg";
import premium from "../public/assets1/section3.jpg";
import banner from "../public/assets1/banner4.jpg";
import testimonial from "../public/assets1/banner5.jpg";
import mercedez from "../public/assets1/banner6.jpg";
import footer from "../public/assets1/banner7.jpg";
import herobg from "../public/assets1/banner.jpg";
import comm from "../public/assets1/MPV_2_Group.png"
import dollor from "../public/assets1/MPV_3_Group.png"
import caravan from "../public/assets1/caravan.png"
import merc from "../public/assets1/merc.png";
export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('HOME');

  // Form state
  const [pickupAddress, setPickupAddress] = useState<AddressResult | null>(null);
  const [dropoffAddress, setDropoffAddress] = useState<AddressResult | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceType, setServiceType] = useState('Select Service');

  // Quote state
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const testimonials = [
    {
      text: "Exceptional service from start to finish! The driver was punctual, professional, and the vehicle was immaculate. Will definitely use Goldstar again for future business trips.",
      author: "Sarah Mitchell, London",
    },
    {
      text: "We have been using Goldstar for about 12 months now on a weekly basis to get from office to the airport and also to get the central reservation out to very convenient and friendly staff.",
      author: "Mr Parker Braking, UK",
    },
    {
      text: "Outstanding chauffeur service! The booking process was seamless, and our driver went above and beyond to ensure we arrived on time for our important meeting. Highly recommended!",
      author: "David Thompson, Manchester",
    },
    {
      text: "Perfect for corporate events. Our clients were impressed with the luxury vehicles and professional service. The drivers are always smartly dressed and courteous.",
      author: "Emma Richardson, Birmingham",
    },
    {
      text: "Reliable and luxurious! I've used Goldstar multiple times for airport transfers and they never disappoint. Clean cars, friendly drivers, and always on time.",
      author: "James Wilson, Leeds",
    },
    {
      text: "First-class service at competitive prices. The Mercedes was spotless and the driver was knowledgeable about the best routes. Made our wedding day even more special.",
      author: "Lisa & Mark Johnson, Liverpool",
    },
    {
      text: "Excellent customer service and attention to detail. From the initial booking to the final destination, everything was handled professionally. Will use again.",
      author: "Robert Chen, Bristol",
    },
    {
      text: "Goldstar exceeded our expectations! The driver was patient with our elderly parents and helped with luggage. A truly caring and professional service.",
      author: "Michelle Adams, Glasgow",
    },
    {
      text: "Top-notch executive travel service. The vehicles are luxurious, drivers are professional, and the booking system is user-friendly. Perfect for business travel.",
      author: "Andrew Foster, Edinburgh",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => {
      const nextIndex = prev + 3;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => {
      if (prev === 0) {
        // Go to the last complete set of 3 testimonials
        const lastCompleteSet = Math.floor((testimonials.length - 1) / 3) * 3;
        return lastCompleteSet;
      }
      return prev - 3;
    });
  };

  // Get current three testimonials
  const getCurrentTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(currentTestimonial + i) % testimonials.length]);
    }
    return result;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('header')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  const isFormValid = () => {
    return (
      pickupAddress &&
      dropoffAddress &&
      customerName.trim() &&
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
        selectedTime
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

  const handleBookNow = () => {
    // TODO: Implement booking functionality
    alert('Booking functionality will be implemented next!');
    handleCloseQuote();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 max-w-[1440px]">
          {/* Logo and Navigation - Bottom Row */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="GoldStar Logo"
                width={280}
                height={95}
                priority
                className="max-w-[200px] md:max-w-[280px] h-auto"
              />
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="hidden md:flex items-center text-white text-base font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                +44 (0) 203 858 786
              </div>
              <div className="flex items-center gap-4">
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                  <a
                    href="#"
                    onClick={() => setActiveSection('HOME')}
                    className={`transition-colors ${
                      activeSection === 'HOME'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
                  >
                    HOME
                  </a>
                  <a
                    href="#"
                    onClick={() => setActiveSection('SERVICES')}
                    className={`transition-colors ${
                      activeSection === 'SERVICES'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
                  >
                    SERVICES
                  </a>
                  <a
                    href="#"
                    onClick={() => setActiveSection('OUR FLEET')}
                    className={`transition-colors ${
                      activeSection === 'OUR FLEET'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
                  >
                    OUR FLEET
                  </a>
                  <a
                    href="#"
                    onClick={() => setActiveSection('FEEDBACK')}
                    className={`transition-colors ${
                      activeSection === 'FEEDBACK'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
                  >
                    FEEDBACK
                  </a>
                  <a
                    href="#"
                    onClick={() => setActiveSection('CORPORATE ACCOUNT')}
                    className={`transition-colors ${
                      activeSection === 'CORPORATE ACCOUNT'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
                  >
                    CORPORATE ACCOUNT
                  </a>
                  <a
                    href="#"
                    onClick={() => setActiveSection('CONTACT')}
                    className={`transition-colors ${
                      activeSection === 'CONTACT'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
                  >
                    CONTACT
                  </a>
                </nav>
                
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden text-white hover:text-primary transition-colors p-2"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
            <nav className="container mx-auto px-4 py-4 max-w-[1440px]">
              <div className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors py-2 border-b border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors py-2 border-b border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SERVICES
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors py-2 border-b border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  OUR FLEET
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors py-2 border-b border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FEEDBACK
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors py-2 border-b border-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CORPORATE ACCOUNT
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className=" h-screen bg-cover bg-center overflow-hidden px-4 md:px-0" style={{
        backgroundImage: `url(${herobg.src})`
      }}>
        {/* Background Images Div */}

        <div className=" inset-0 flex items-center justify-center mt-[100px] md:mt-[170px] lg:mt-[200px]">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-6xl font-light lg:mb-4">Welcome to</h1>
            <h2 className="text-2xl md:text-5xl font-bold text-primary mb-6">
              Goldstar Executive
            </h2>
            <p className="md:text-xl text-base lg:mb-12 mb-4 max-w-2xl mx-auto">
              An executive car and chauffeur service covering Surrey, London and
              the Home Counties
            </p>

            {/* Booking Form */}
            <div className=" p-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-primary mb-4">
                QUOTE & BOOK A CAR
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 md:mb-6">
                <AddressAutocomplete
                  placeholder="Pick Up Location"
                  className="bg-white/10 w-full lg:max-w-[200px] backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                  onAddressSelect={setPickupAddress}
                />
                <AddressAutocomplete
                  placeholder="Drop Off Location"
                  className="bg-white/10 w-full lg:max-w-[200px] backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                  onAddressSelect={setDropoffAddress}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                >
                  <option value="Select Service" className='text-black'>Select Service</option>
                  <option value="Airport Transfer" className='text-black'>Airport Transfer</option>
                  <option value="Corporate Travel" className='text-black'>Corporate Travel</option>
                  <option value="Wedding Cars" className='text-black'>Wedding Cars</option>
                  <option value="Business & Social Events" className='text-black'>Business & Social Events</option>
                </select>
              </div>
              <button 
                onClick={handleGetQuote}
                disabled={!isFormValid() || quoteLoading}
                className="bg-[#235e99] text-white lg:px-8 lg:py-3 px-4 py-1.5 rounded lg:font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {quoteLoading ? 'Getting Quote...' : 'Get Quote'}
              </button>
              <div className="hidden md:flex flex-wrap justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Guaranteed Pick-Up</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>100% Money Back</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Professional, Local Experts</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Free Cancellation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Car Services */}
      <section
        className="py-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${executiveCar.src})`,
        }}
      >
        <div className="absolute -top-4 z-50">
          <Image src={ltr} alt="ltr" className="w-full" />
        </div>
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
                  We provide a professional door to door Airport transfer
                  service to Gatwick, including all surrounding areas
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
                  Whatever the event, big or small we will meticulously plan the
                  itinerary to ensure a seamless experience for all
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
                  Goldstar Executive is the perfect partner for Businesses. Find
                  out more on the Corporate Accounts page
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
                  For the special occasion we can supply the perfect car. Speak
                  to us now about your wedding requirements
                </p>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button className="bg-[#235e99] hover:bg-[#235e99] text-white px-8 py-3 rounded font-semibold transition-colors">
              Find out more
            </button>
          </div>
        </div>
      </section>

      {/* Premium Service Features */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${premium.src})`,
        }}
      >
        <div className="absolute top-0 right-0 z-50">
          <Image src={rtl} alt="ltr" className="w-full" />
        </div>
        <div className="container mx-auto px-4 text-center max-w-[1440px] text-white">
          <h2 className="text-4xl font-bold mb-4">
            Experience Premium Car Service
          </h2>
          <p className="text-xl mb-16 text-gray-300">
            For those who value high quality
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold max-w-[170px] mx-auto">
                We are available 24/7
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2 max-w-[170px] mx-auto">
                Secure Payment methods
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2 max-w-[170px] mx-auto">
                Bottled Water
              </h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Wi-fi</h3>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2 max-w-[170px] mx-auto">
                Reading Materials
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Travel Section */}
      <section
        className="py-20 bg-gray-50"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Experience Luxury Travel
            </h2>
            <p className="text-primary text-xl">
              in Chauffeur-Driven Executive Cars
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="overflow-hidden">
              <div className="h-64 flex items-center justify-center">
                <Image src={sls} alt="sls" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  Business Class
                </h3>
                <p className="text-gray-600 mb-8">
                  Ideal for the busy executive Punctual and professional
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex gap-2">
                    <div>
                      <Image src={comm} alt="comm" className="w-[20px] h-[20px]"/>
                    </div>
                  <span className="text-sm text-gray-600">max: 4</span>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <Image src={dollor} alt="comm" className="w-[20px] h-[20px]"/>
                    </div>
                  <span className="text-sm text-gray-600">max: 2</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="h-64 flex items-center justify-center">
                <Image src={caravan} alt="sls" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  First Class
                </h3>
                <p className="text-gray-600 mb-4">
                  A truly prestige class. Travel in supreme luxury and comfort
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex gap-2">
                    <div>
                      <Image src={comm} alt="comm" className="w-[20px] h-[20px]"/>
                    </div>
                  <span className="text-sm text-gray-600">max: 4</span>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <Image src={dollor} alt="comm" className="w-[20px] h-[20px]"/>
                    </div>
                  <span className="text-sm text-gray-600">max: 2</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="h-64 flex items-center justify-center">
                <Image src={merc} alt="sls" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  MPV Class
                </h3>
                <p className="text-gray-600 mb-4">
                  Travel as a group without compromising on luxury & comfort
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex gap-2">
                    <div>
                      <Image src={comm} alt="comm" className="w-[20px] h-[20px]"/>
                    </div>
                  <span className="text-sm text-gray-600">max: 4</span>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      <Image src={dollor} alt="comm" className="w-[20px] h-[20px]"/>
                    </div>
                  <span className="text-sm text-gray-600">max: 2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#235e99] hover:bg-[#235e99] text-white px-8 py-3 rounded font-semibold transition-colors">
              Find out more
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${testimonial.src})`,
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">We Want To Hear</h2>
          <p className="text-xl mb-16">Your Opinion</p>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-8 leading-relaxed">
              It is important to us that our customers are 100% satisfied - that
              is why we are great service. Every single customer is the future
              form of advertisement and all our work based on it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getCurrentTestimonials().map((testimonial, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm rounded-lg p-6 bg-white/10"
                >
                  <div className="text-4xl text-white/30 mb-4">"</div>
                  <p className="text-base mb-4 italic leading-relaxed">
                    {testimonial.text}
                  </p>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex space-x-2">
                {Array.from(
                  { length: Math.ceil(testimonials.length / 3) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index * 3)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        Math.floor(currentTestimonial / 3) === index
                          ? "bg-white"
                          : "bg-white/40"
                      }`}
                    />
                  )
                )}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${mercedez.src})`,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Talk To Us</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <input
                type="text"
                placeholder="Name"
                className="bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <textarea
              placeholder="How can we help you?"
              rows={6}
              className="w-full text-black bg-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary mb-6"
            ></textarea>
            <div className="text-center">
              <button className="bg-[#235e99] hover:bg-[#235e99] text-white px-8 py-3 rounded font-semibold transition-colors">
                Send
              </button>
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
          onBook={handleBookNow}
        />
      )}

      {/* Footer */}
      <footer
        className="bg-black text-white bg-cover bg-center pt-24"
        style={{
          backgroundImage: `url(${footer.src})`,
        }}
      >
        <div className="container mx-auto px-4 max-w-[1240px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="max-w-[280px] flex flex-col justify-start items-start gap-5">
              <div className="flex items-center">
                <Image
                  src={logo}
                  alt="GoldStar Logo"
                  width={280}
                  height={95}
                  priority
                />
              </div>
              <p className="text-gray-400 text-sm text-left leading-relaxed mb-4">
                An executive car and chauffeur service covering Surrey, London
                and the Home Counties.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">LINKS</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Our Fleet
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Feedback
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Corporate Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">ADDRESS</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>Goldstar Executive Ltd</p>
                <p>2000 Cathedral Hill</p>
                <p>Guildford</p>
                <p>Surrey</p>
                <p>United Kingdom</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-primary">CONTACT US</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>+44 (0) 203 858 786</p>
                <p>booking@goldstarexecutive.com</p>
                <p>www.goldstarexecutive.com</p>
                <div className="mt-4">
                  <p>Terms & Conditions</p>
                  <p>Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            <p>Copyright © 2023 Gold Star Executive. All Rights Reserved.</p>
            <p className="mt-2">Web Design UK by myteamscot.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
