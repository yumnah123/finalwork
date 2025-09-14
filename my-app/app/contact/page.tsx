"use client";
import Image from "next/image";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Users,
  Car,
} from "lucide-react";
import mercedez from "../../public/assets1/banner6.jpg";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    serviceType: ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header activeSection="CONTACT" />

      <Hero 
        title="Get In"
        subtitle="Touch"
        description="Contact our team for bookings, inquiries, or to discuss your transportation requirements"
      />

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>
            <p className="text-primary text-xl">
              We're here to help you 24/7
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Contact */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Phone Booking</h3>
              <p className="text-gray-600 mb-4">Call us for immediate booking and assistance</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-primary">+44 (0) 203 858 786</p>
                <p className="text-sm text-gray-500">Available 24/7</p>
              </div>
              <button className="mt-4 bg-[#235e99] text-white px-6 py-2 rounded font-semibold hover:bg-[#1e4d82] transition-colors">
                Call Now
              </button>
            </div>

            {/* Email Contact */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us a message for detailed inquiries</p>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-primary">booking@goldstarexecutive.com</p>
                <p className="text-sm text-gray-500">Response within 2 hours</p>
              </div>
              <button className="mt-4 bg-[#235e99] text-white px-6 py-2 rounded font-semibold hover:bg-[#1e4d82] transition-colors">
                Send Email
              </button>
            </div>

            {/* Office Location */}
            <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Visit Our Office</h3>
              <p className="text-gray-600 mb-4">Come meet our team in person</p>
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-800">Goldstar Executive Ltd</p>
                <p className="text-gray-600">2000 Cathedral Hill</p>
                <p className="text-gray-600">Guildford, Surrey</p>
                <p className="text-gray-600">United Kingdom</p>
              </div>
              <button className="mt-4 bg-[#235e99] text-white px-6 py-2 rounded font-semibold hover:bg-[#1e4d82] transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Business Hours
            </h2>
            <p className="text-primary text-xl">
              When you can reach us
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="text-center mb-8">
                <Clock className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-black" />
                <h3 className="text-2xl font-bold text-gray-800">Operating Hours</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Booking Service</span>
                  <span className="text-primary font-semibold">24/7 Available</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Phone Support</span>
                  <span className="text-gray-600">24/7 Available</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Office Hours</span>
                  <span className="text-gray-600">Mon-Fri: 8:00-18:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-semibold text-gray-800">Weekend Office</span>
                  <span className="text-gray-600">Sat-Sun: 9:00-17:00</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-800">Emergency Service</span>
                  <span className="text-primary font-semibold">24/7 Available</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Note:</strong> Our vehicles operate 24/7, including weekends and holidays. 
                  Emergency bookings and urgent requests are always accommodated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${mercedez.src})`,
        }}
      >
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Send Us a Message</h2>
            <p className="text-white text-xl">We'd love to hear from you</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-lg p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                    placeholder="+44 20 1234 5678"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Service Interest
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                  >
                    <option value="">Select a service</option>
                    <option value="airport-transfer">Airport Transfer</option>
                    <option value="corporate-travel">Corporate Travel</option>
                    <option value="wedding-cars">Wedding Cars</option>
                    <option value="business-events">Business Events</option>
                    <option value="corporate-account">Corporate Account</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full bg-white text-black px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-primary border border-gray-200"
                  placeholder="Tell us about your requirements, dates, destinations, or any questions you have..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-[#235e99] hover:bg-[#1e4d82] text-white px-12 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center mx-auto"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
                <p className="text-sm text-gray-600 mt-4">
                  We typically respond within 2 hours during business hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Quick Contact Options
            </h2>
            <p className="text-primary text-xl">
              Choose the best way to reach us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Immediate Booking</h3>
              <p className="text-gray-600 text-sm mb-4">Call for instant quotes and bookings</p>
              <button className="bg-green-500 text-white px-4 py-2 rounded font-semibold hover:bg-green-600 transition-colors text-sm">
                Call Now
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Live Chat</h3>
              <p className="text-gray-600 text-sm mb-4">Get instant answers to your questions</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded font-semibold hover:bg-blue-600 transition-colors text-sm">
                Start Chat
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Schedule Callback</h3>
              <p className="text-gray-600 text-sm mb-4">Book a convenient time for us to call you</p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded font-semibold hover:bg-purple-600 transition-colors text-sm">
                Schedule
              </button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">Emergency Service</h3>
              <p className="text-gray-600 text-sm mb-4">24/7 emergency transportation</p>
              <button className="bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 transition-colors text-sm">
                Emergency
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-primary text-xl">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">How far in advance should I book?</h3>
              <p className="text-gray-600">We recommend booking at least 24 hours in advance for regular services. However, we can accommodate same-day bookings subject to availability. For airport transfers, we suggest booking as soon as you have your flight details.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit cards, bank transfers, cash, and for corporate accounts, we offer monthly invoicing with 30-day payment terms.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Do you provide child seats?</h3>
              <p className="text-gray-600">Yes, we can provide child seats and booster seats upon request. Please specify the age and weight of children when booking to ensure we have the appropriate safety equipment.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What areas do you cover?</h3>
              <p className="text-gray-600">We primarily cover Surrey, London, and the Home Counties. For destinations outside these areas, please contact us to discuss your requirements and any additional charges that may apply.</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">What is your cancellation policy?</h3>
              <p className="text-gray-600">Free cancellation up to 2 hours before the scheduled pickup time. Cancellations within 2 hours may incur charges. No-shows will be charged the full fare. Corporate accounts may have different terms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-[#235e99] text-white">
        <div className="container mx-auto px-4 max-w-[1440px] text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience Premium Service?</h2>
          <p className="text-xl mb-8">Contact us today for your next journey</p>
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