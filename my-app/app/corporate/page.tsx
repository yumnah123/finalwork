"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Phone,
  Menu,
  X,
  Building,
  CheckCircle,
  Clock,
  CreditCard,
  Users,
  Calendar,
  FileText,
  Shield,
  TrendingUp,
  Calculator,
  Briefcase,
} from "lucide-react";
import logo from "../../public/Logo.svg";
import executiveCar from "../../public/assets1/section2.jpg";
import premium from "../../public/assets1/section3.jpg";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";

export default function Corporate() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('CORPORATE ACCOUNT');

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
                    className="transition-colors text-white hover:text-primary"
                  >
                    FEEDBACK
                  </a>
                  <a
                    href="/corporate"
                    className={`transition-colors ${
                      activeSection === 'CORPORATE ACCOUNT'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-white hover:text-primary'
                    }`}
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

      <Hero 
        title="Corporate"
        subtitle="Account Services"
        description="Streamlined transportation solutions for businesses with dedicated account management and flexible billing"
      />

      {/* Corporate Benefits */}
      <section
        className="py-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${executiveCar.src})`,
        }}
      >
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Corporate Account
            </h2>
            <p className="text-primary text-xl">Benefits & Features</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Dedicated Account</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Personal account manager for all your corporate transportation needs
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Monthly Invoicing</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Consolidated monthly billing with detailed trip reports and expense tracking
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Priority Booking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fast-track booking system with guaranteed vehicle availability
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Volume Discounts</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Competitive rates with volume-based discounts for regular bookings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Corporate Account */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${premium.src})`,
        }}
      >
        <div className="container mx-auto px-4 text-center max-w-[1440px] text-white">
          <h2 className="text-4xl font-bold mb-4">
            Why Choose Corporate Account?
          </h2>
          <p className="text-xl mb-16 text-gray-300">
            Streamline your business transportation with our corporate solutions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Cost Control</h3>
              <p className="text-gray-300 text-sm">Better budget management with predictable monthly expenses</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Risk Management</h3>
              <p className="text-gray-300 text-sm">Fully insured and licensed drivers for peace of mind</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Employee Satisfaction</h3>
              <p className="text-gray-300 text-sm">Comfortable and reliable transport for your team</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-10 h-10 text-black" />
              </div>
              <h3 className="text-lg font-bold mb-2">Professional Image</h3>
              <p className="text-gray-300 text-sm">Enhance your company's professional image with premium vehicles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Corporate Service Packages
            </h2>
            <p className="text-primary text-xl">
              Choose the package that best fits your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Starter Package */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-100 p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Starter</h3>
                <p className="text-gray-600">Perfect for small businesses</p>
                <div className="text-3xl font-bold text-primary mt-4">£2.50</div>
                <p className="text-gray-500">per mile</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Monthly invoicing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Online booking system</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Trip reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Email support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">5% volume discount (20+ trips)</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-200 text-gray-800 py-3 rounded font-semibold mt-6 hover:bg-gray-300 transition-colors">
                  Get Started
                </button>
              </div>
            </div>

            {/* Business Package */}
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-primary">
              <div className="bg-primary p-6 text-center text-black">
                <div className="bg-black text-white text-xs px-3 py-1 rounded-full inline-block mb-2">MOST POPULAR</div>
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p>Ideal for growing companies</p>
                <div className="text-3xl font-bold mt-4">£2.25</div>
                <p className="text-gray-700">per mile</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Everything in Starter</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Priority booking</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Dedicated phone support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Regular driver assignment</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">10% volume discount (50+ trips)</span>
                  </li>
                </ul>
                <button className="w-full bg-[#235e99] text-white py-3 rounded font-semibold mt-6 hover:bg-[#1e4d82] transition-colors">
                  Choose Business
                </button>
              </div>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p>For large organizations</p>
                <div className="text-3xl font-bold text-primary mt-4">Custom</div>
                <p className="text-gray-300">pricing</p>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Everything in Business</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">24/7 phone support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Custom reporting</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-600">Up to 20% volume discount</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-800 text-white py-3 rounded font-semibold mt-6 hover:bg-gray-700 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How Corporate Accounts Work
            </h2>
            <p className="text-primary text-xl">
              Simple setup, seamless operation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Apply Online</h3>
              <p className="text-gray-600">Complete our simple corporate account application form</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Account Setup</h3>
              <p className="text-gray-600">We'll set up your account within 24 hours and provide login credentials</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Start Booking</h3>
              <p className="text-gray-600">Use our online platform or call to book your corporate transportation</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-black font-bold text-xl">
                4
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Monthly Billing</h3>
              <p className="text-gray-600">Receive consolidated monthly invoices with detailed trip information</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Apply for Corporate Account
              </h2>
              <p className="text-primary text-xl">
                Get started with your business transportation solution
              </p>
            </div>

            <form className="bg-white rounded-lg shadow-lg p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="Your Company Ltd"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Industry
                  </label>
                  <select className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200">
                    <option>Select Industry</option>
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Legal</option>
                    <option>Consulting</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="Office Manager"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="+44 20 1234 5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Company Address *
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                  placeholder="123 Business Street, London, SW1A 1AA"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company Size
                  </label>
                  <select className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200">
                    <option>Select Size</option>
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>201-500 employees</option>
                    <option>500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Expected Monthly Usage
                  </label>
                  <select className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200">
                    <option>Select Usage</option>
                    <option>1-10 trips</option>
                    <option>11-25 trips</option>
                    <option>26-50 trips</option>
                    <option>51-100 trips</option>
                    <option>100+ trips</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Additional Requirements
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-50 text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                  placeholder="Tell us about any specific requirements or questions you have..."
                ></textarea>
              </div>

              <div className="text-center">
                <button className="bg-[#235e99] hover:bg-[#1e4d82] text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Submit Application
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  We'll contact you within 24 hours to confirm your account setup
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#235e99] text-white">
        <div className="container mx-auto px-4 max-w-[1440px] text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Streamline Your Business Transportation?</h2>
          <p className="text-xl mb-8">Join hundreds of businesses who trust Goldstar Executive for their corporate travel needs</p>
          <div className="space-x-4">
            <button className="bg-white text-[#235e99] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
              Apply Now
            </button>
            <button className="border border-white text-white px-8 py-3 rounded font-semibold hover:bg-white hover:text-[#235e99] transition-colors">
              Call Sales Team
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}