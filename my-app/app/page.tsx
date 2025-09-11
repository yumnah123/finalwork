"use client";
import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import { useGoogleMapsAutocomplete } from "../hooks/useGoogleMapsAutocomplete";
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
export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Refs for Google Maps autocomplete inputs
  const pickupInputRef = useRef<any>(null);
  const dropoffInputRef = useRef<any>(null);

  // Google Maps autocomplete hooks
  const { place: pickupPlace } = useGoogleMapsAutocomplete(pickupInputRef);
  const { place: dropoffPlace } = useGoogleMapsAutocomplete(dropoffInputRef);

  const testimonials = [
    {
      text: "A big thanks to your Executive service and their high quality car service, I was very satisfied with your car service, very friendly, The drivers have been very courteous of my schedule time and did a great job overall.",
      author: "Various Admire Customer, UK",
    },
    {
      text: "We have been using Goldstar for about 12 months now on a weekly basis to get from office to the airport and also to get the central reservation out to very convenient and friendly staff.",
      author: "Mr Parker Braking, UK",
    },
    {
      text: "A big thanks to your Executive service and their high quality car journey has been excellent since our first telephone call and from our clients with your service, The drivers have been very punctual and reliable with a smart uniform that with their customer care and service.",
      author: "Various Admire Customer, UK",
    },
    {
      text: "A big thanks to your Executive service and their high quality car service, I was very satisfied with your car service, very friendly, The drivers have been very courteous of my schedule time and did a great job overall.",
      author: "Various Admire Customer, UK",
    },
    {
      text: "We have been using Goldstar for about 12 months now on a weekly basis to get from office to the airport and also to get the central reservation out to very convenient and friendly staff.",
      author: "Mr Parker Braking, UK",
    },
    {
      text: "A big thanks to your Executive service and their high quality car journey has been excellent since our first telephone call and from our clients with your service, The drivers have been very punctual and reliable with a smart uniform that with their customer care and service.",
      author: "Various Admire Customer, UK",
    },
    {
      text: "A big thanks to your Executive service and their high quality car service, I was very satisfied with your car service, very friendly, The drivers have been very courteous of my schedule time and did a great job overall.",
      author: "Various Admire Customer, UK",
    },
    {
      text: "We have been using Goldstar for about 12 months now on a weekly basis to get from office to the airport and also to get the central reservation out to very convenient and friendly staff.",
      author: "Mr Parker Braking, UK",
    },
    {
      text: "A big thanks to your Executive service and their high quality car journey has been excellent since our first telephone call and from our clients with your service, The drivers have been very punctual and reliable with a smart uniform that with their customer care and service.",
      author: "Various Admire Customer, UK",
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
      const prevIndex = prev - 3;
      return prevIndex < 0 ? Math.max(0, testimonials.length - 3) : prevIndex;
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              />
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="flex items-center text-white text-base font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                +44 (0) 203 858 786
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors"
                >
                  HOME
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors"
                >
                  SERVICES
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors"
                >
                  OUR FLEET
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors"
                >
                  FEEDBACK
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors"
                >
                  CORPORATE ACCOUNT
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary transition-colors"
                >
                  CONTACT
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-black">
        {/* Background Images Div */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Hero2 Image with Diagonal Fade - Lower Layer */}
            <div className="absolute top-0 right-0 w-4/5 h-full z-10">
              <Image
                src={hero2}
                alt="Hero Background 2"
                fill
                className="object-cover"
                priority
              />
              {/* Diagonal fade mask using clip-path with dynamic opacity */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.05) 80%, transparent 85%, transparent 95%)`,
                }}
              ></div>
              {/* Additional fade for smoother blending */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, transparent 50%)`,
                }}
              ></div>
            </div>

            {/* Hero1 Image - Higher Layer, Vertically Centered */}
            <div className="absolute inset-0 flex items-center justify-start z-20">
              <div className="relative">
                <Image
                  src={hero1}
                  alt="Hero Background 1"
                  className="object-cover opacity-40"
                  priority
                  height={505}
                  width={920}
                />
              </div>
            </div>

            {/* Overall Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-30"></div>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-light mb-4">Welcome to</h1>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Goldstar Executive
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              An executive car and chauffeur service covering Surrey, London and
              the Home Counties
            </p>

            {/* Booking Form */}
            <div className=" p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-primary mb-6">
                QUOTE & BOOK A CAR
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                  ref={pickupInputRef}
                  type="text"
                  placeholder="Pick Up Location"
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
                <input
                  ref={dropoffInputRef}
                  type="text"
                  placeholder="Drop Off Location"
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                  type="date"
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
                <input
                  type="time"
                  className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                />
                <select className="bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20">
                  <option>Select Service</option>
                  <option>Airport Transfer</option>
                  <option>Corporate Travel</option>
                  <option>Wedding Cars</option>
                </select>
              </div>
              <button className="bg-[#235e99] text-white px-8 py-3 rounded font-semibold transition-colors">
                Get Quote
              </button>
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
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
                  <span className="text-sm text-gray-600">max: 5</span>
                  <span className="text-sm text-gray-600">max: X</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="h-64 flex items-center justify-center">
                <Image src={sls} alt="sls" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  First Class
                </h3>
                <p className="text-gray-600 mb-4">
                  A truly prestige class. Travel in supreme luxury and comfort
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm text-gray-600">max: 4</span>
                  <span className="text-sm text-gray-600">max: 2</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div className="h-64 flex items-center justify-center">
                <Image src={sls} alt="sls" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  MPV Class
                </h3>
                <p className="text-gray-600 mb-4">
                  Travel as a group without compromising on luxury & comfort
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-sm text-gray-600">max: 7</span>
                  <span className="text-sm text-gray-600">max: 7</span>
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
              className="w-full bg-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary mb-6"
            ></textarea>
            <div className="text-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-semibold transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-black text-white pt-24"
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
              <h3 className="text-lg font-bold mb-4">LINKS</h3>
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
              <h3 className="text-lg font-bold mb-4">ADDRESS</h3>
              <div className="text-sm text-gray-400 space-y-2">
                <p>Goldstar Executive Ltd</p>
                <p>2000 Cathedral Hill</p>
                <p>Guildford</p>
                <p>Surrey</p>
                <p>United Kingdom</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">CONTACT US</h3>
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
