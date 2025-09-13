"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Phone,
  Menu,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  User,
  MapPin,
} from "lucide-react";
import logo from "../../public/Logo.svg";
import herobg from "../../public/assets1/banner.jpg";
import testimonial from "../../public/assets1/banner5.jpg";
import Footer from "../../components/Footer";

export default function Feedback() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('FEEDBACK');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Exceptional service from start to finish! The driver was punctual, professional, and the vehicle was immaculate. Will definitely use Goldstar again for future business trips.",
      author: "Sarah Mitchell",
      location: "London",
      rating: 5,
      service: "Corporate Travel"
    },
    {
      text: "We have been using Goldstar for about 12 months now on a weekly basis to get from office to the airport and also to get the central reservation out to very convenient and friendly staff.",
      author: "Mr Parker Braking",
      location: "UK",
      rating: 5,
      service: "Airport Transfer"
    },
    {
      text: "Outstanding chauffeur service! The booking process was seamless, and our driver went above and beyond to ensure we arrived on time for our important meeting. Highly recommended!",
      author: "David Thompson",
      location: "Manchester",
      rating: 5,
      service: "Business Travel"
    },
    {
      text: "Perfect for corporate events. Our clients were impressed with the luxury vehicles and professional service. The drivers are always smartly dressed and courteous.",
      author: "Emma Richardson",
      location: "Birmingham",
      rating: 5,
      service: "Corporate Events"
    },
    {
      text: "Reliable and luxurious! I've used Goldstar multiple times for airport transfers and they never disappoint. Clean cars, friendly drivers, and always on time.",
      author: "James Wilson",
      location: "Leeds",
      rating: 5,
      service: "Airport Transfer"
    },
    {
      text: "First-class service at competitive prices. The Mercedes was spotless and the driver was knowledgeable about the best routes. Made our wedding day even more special.",
      author: "Lisa & Mark Johnson",
      location: "Liverpool",
      rating: 5,
      service: "Wedding Cars"
    },
    {
      text: "Excellent customer service and attention to detail. From the initial booking to the final destination, everything was handled professionally. Will use again.",
      author: "Robert Chen",
      location: "Bristol",
      rating: 5,
      service: "Corporate Travel"
    },
    {
      text: "Goldstar exceeded our expectations! The driver was patient with our elderly parents and helped with luggage. A truly caring and professional service.",
      author: "Michelle Adams",
      location: "Glasgow",
      rating: 5,
      service: "Personal Travel"
    },
    {
      text: "Top-notch executive travel service. The vehicles are luxurious, drivers are professional, and the booking system is user-friendly. Perfect for business travel.",
      author: "Andrew Foster",
      location: "Edinburgh",
      rating: 5,
      service: "Executive Travel"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => {
      const nextIndex = prev + 3;
      return nextIndex >= testimonials.length ? 0 : nextIndex;
    });
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => {
      if (prev === 0) {
        const lastCompleteSet = Math.floor((testimonials.length - 1) / 3) * 3;
        return lastCompleteSet;
      }
      return prev - 3;
    });
  };

  const getCurrentTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(currentTestimonial + i) % testimonials.length]);
    }
    return result;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
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
                <nav className="hidden lg:flex items-center space-x-8">
                  <a
                    href="/"
                    className="transition-colors text-white hover:text-primary"
                  >
                    HOME
                  </a>
                  <a
                    href="/services"
                    className="transition-colors text-white hover:text-primary"
                  >
                    SERVICES
                  </a>
                  <a
                    href="/fleet"
                    className="transition-colors text-white hover:text-primary"
                  >
                    OUR FLEET
                  </a>
                  <a
                    href="/feedback"
                    className={`transition-colors ${
                      activeSection === 'FEEDBACK'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
                  >
                    FEEDBACK
                  </a>
                  <a
                    href="/corporate"
                    className="transition-colors text-white hover:text-primary"
                  >
                    CORPORATE ACCOUNT
                  </a>
                  <a
                    href="/contact"
                    className="transition-colors text-white hover:text-primary"
                  >
                    CONTACT
                  </a>
                </nav>
                
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
        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
            <nav className="container mx-auto px-4 py-4 max-w-[1440px]">
              <div className="flex flex-col space-y-4">
                <a href="/" className="text-white hover:text-primary transition-colors py-2 border-b border-white/10">
                  HOME
                </a>
                <a href="/services" className="text-white hover:text-primary transition-colors py-2 border-b border-white/10">
                  SERVICES
                </a>
                <a href="/fleet" className="text-white hover:text-primary transition-colors py-2 border-b border-white/10">
                  OUR FLEET
                </a>
                <a href="/feedback" className="text-white hover:text-primary transition-colors py-2 border-b border-white/10">
                  FEEDBACK
                </a>
                <a href="/corporate" className="text-white hover:text-primary transition-colors py-2 border-b border-white/10">
                  CORPORATE ACCOUNT
                </a>
                <a href="/contact" className="text-white hover:text-primary transition-colors py-2">
                  CONTACT
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="min-h-screen bg-cover bg-center overflow-hidden px-4 md:px-0" style={{
        backgroundImage: `url(${herobg.src})`
      }}>
        <div className="inset-0 flex items-center justify-center mt-[100px] md:mt-[170px] lg:mt-[200px] 2xl:mt-[400px]">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-6xl font-light lg:mb-4">Customer</h1>
            <h2 className="text-2xl md:text-5xl font-bold text-primary mb-6">
              Feedback
            </h2>
            <p className="md:text-xl text-base lg:mb-12 mb-4 max-w-2xl mx-auto">
              Read what our valued customers have to say about their experience with Goldstar Executive
            </p>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${testimonial.src})`,
        }}
      >
        <div className="container mx-auto px-4 text-center text-white max-w-[1440px]">
          <h2 className="text-4xl font-bold mb-4">We Want To Hear</h2>
          <p className="text-xl mb-16">Your Opinion</p>

          <div className="max-w-6xl mx-auto">
            <p className="text-lg mb-12 leading-relaxed">
              It is important to us that our customers are 100% satisfied - that
              is why we are great service. Every single customer is the future
              form of advertisement and all our work based on it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {getCurrentTestimonials().map((testimonial, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm rounded-lg p-6 bg-white/10 hover:bg-white/20 transition-all"
                >
                  <div className="text-6xl text-primary/30 mb-4">
                    <Quote className="w-12 h-12 mx-auto" />
                  </div>
                  <div className="flex justify-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-base mb-6 italic leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex items-center justify-center mb-2">
                      <User className="w-4 h-4 mr-2" />
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <p className="text-sm text-gray-300">{testimonial.location}</p>
                    </div>
                    <p className="text-xs text-primary">{testimonial.service}</p>
                  </div>
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

      {/* Statistics */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Track Record
            </h2>
            <p className="text-primary text-xl">
              Numbers that speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">500+</div>
              <p className="text-xl text-gray-600">Happy Customers</p>
              <p className="text-sm text-gray-500 mt-2">Satisfied clients who trust our service</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">98%</div>
              <p className="text-xl text-gray-600">Satisfaction Rate</p>
              <p className="text-sm text-gray-500 mt-2">Customer satisfaction rating</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">5000+</div>
              <p className="text-xl text-gray-600">Successful Trips</p>
              <p className="text-sm text-gray-500 mt-2">Completed journeys with excellence</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-4">4.9/5</div>
              <p className="text-xl text-gray-600">Average Rating</p>
              <p className="text-sm text-gray-500 mt-2">Based on customer reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Share Your Experience
            </h2>
            <p className="text-primary text-xl mb-12">
              We'd love to hear about your journey with us
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Location"
                  className="bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                />
                <select className="bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200">
                  <option>Service Used</option>
                  <option>Airport Transfer</option>
                  <option>Corporate Travel</option>
                  <option>Wedding Cars</option>
                  <option>Business Events</option>
                  <option>Personal Travel</option>
                </select>
              </div>
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  <span className="text-gray-600 mr-4">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Tell us about your experience with Goldstar Executive..."
                rows={6}
                className="w-full text-black bg-gray-50 px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
              ></textarea>
              <div className="text-center">
                <button className="bg-[#235e99] hover:bg-[#235e99] text-white px-8 py-3 rounded font-semibold transition-colors">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#235e99] text-white">
        <div className="container mx-auto px-4 max-w-[1440px] text-center">
          <h2 className="text-4xl font-bold mb-6">Experience the Service Our Customers Love</h2>
          <p className="text-xl mb-8">Join our satisfied customers and book your premium journey today</p>
          <div className="space-x-4">
            <button className="bg-white text-[#235e99] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Book Now
            </button>
            <button className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-[#235e99] transition-colors">
              Get Quote
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}