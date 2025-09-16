"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
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
  CheckCircle,
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

  // Form states
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear errors when user starts typing
    if (contactError) setContactError('');
    if (contactSuccess) setContactSuccess(false);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setContactError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setContactError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setContactError('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      setContactError('Subject is required');
      return false;
    }
    if (!formData.message.trim()) {
      setContactError('Message is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setContactLoading(true);
    setContactError('');

    try {
      // Create enhanced message with all form data
      const enhancedMessage = `
        ${formData.message}

        Additional Details:
        ${formData.phone ? `Phone: ${formData.phone}` : ''}
        ${formData.serviceType ? `Service Interest: ${formData.serviceType}` : ''}
        ${formData.subject ? `Subject: ${formData.subject}` : ''}
      `.trim();

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: enhancedMessage,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setContactSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          serviceType: ''
        });
        // Auto-hide success message after 8 seconds
        setTimeout(() => setContactSuccess(false), 8000);
      } else {
        setContactError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setContactError('Network error. Please check your connection and try again.');
    } finally {
      setContactLoading(false);
    }
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
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-8 space-y-6 border border-white/20 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Error Message */}
              {contactError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-lg text-red-700 text-center"
                >
                  {contactError}
                </motion.div>
              )}

              {/* Success Message */}
              {contactSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/50 rounded-lg text-green-700 text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Thank you! Your message has been sent successfully. We'll get back to you within 2 hours!</span>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name *
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={contactLoading}
                    className={`w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 border ${
                      contactError && !formData.name.trim()
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-[#235e99]'
                    }`}
                    placeholder="Your full name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email *
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={contactLoading}
                    className={`w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 border ${
                      contactError && (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-[#235e99]'
                    }`}
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <motion.input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={contactLoading}
                    className="w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235e99] border border-gray-200 transition-all duration-300"
                    placeholder="+44 20 1234 5678"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Service Interest
                  </label>
                  <motion.select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    disabled={contactLoading}
                    className="w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#235e99] border border-gray-200 transition-all duration-300"
                    whileFocus={{ scale: 1.02 }}
                  >
                    <option value="">Select a service</option>
                    <option value="airport-transfer">Airport Transfer</option>
                    <option value="corporate-travel">Corporate Travel</option>
                    <option value="wedding-cars">Wedding Cars</option>
                    <option value="business-events">Business Events</option>
                    <option value="corporate-account">Corporate Account</option>
                    <option value="other">Other</option>
                  </motion.select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Subject *
                </label>
                <motion.input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={contactLoading}
                  className={`w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 border ${
                    contactError && !formData.subject.trim()
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:ring-[#235e99]'
                  }`}
                  placeholder="Brief description of your inquiry"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Message *
                </label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  disabled={contactLoading}
                  className={`w-full bg-white text-black px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 border ${
                    contactError && !formData.message.trim()
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:ring-[#235e99]'
                  }`}
                  placeholder="Tell us about your requirements, dates, destinations, or any questions you have..."
                  whileFocus={{ scale: 1.01 }}
                ></motion.textarea>
              </div>

              <div className="text-center">
                <motion.button
                  type="submit"
                  disabled={contactLoading || contactSuccess}
                  className={`px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center mx-auto backdrop-blur-md border border-white/20 shadow-lg ${
                    contactLoading || contactSuccess
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-[#235e99] hover:bg-[#1e4d82] text-white hover:shadow-2xl'
                  }`}
                  whileHover={!contactLoading && !contactSuccess ? {
                    scale: 1.05,
                    boxShadow: "0 20px 40px -12px rgba(35, 94, 153, 0.4)"
                  } : {}}
                  whileTap={!contactLoading && !contactSuccess ? { scale: 0.98 } : {}}
                >
                  {contactLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </div>
                  ) : contactSuccess ? (
                    <div className="flex items-center space-x-2 text-white">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
                <p className="text-sm text-gray-600 mt-4">
                  {contactSuccess
                    ? "We'll get back to you as soon as possible!"
                    : "We typically respond within 2 hours during business hours"}
                </p>
              </div>
            </motion.form>
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

      <Footer />
    </div>
  );
}