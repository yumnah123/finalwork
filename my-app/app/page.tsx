"use client";
import Image from "next/image";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AddressAutocomplete } from "../components/AddressAutocomplete";
import { QuoteDisplay } from "../components/QuoteDisplay";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { AddressResult } from "../hooks/useAddressAutocomplete";
import { QuoteService } from "../lib/quote-service";
import { QuoteBreakdown } from "../lib/pricing-config";
import { CheckCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import rtl from "../public/assets1/rtl-line.png";
import airport from "../public/assets1/airport.png";
import business from "../public/assets1/business.png";
import travel from "../public/assets1/travel.png";
import wedding from "../public/assets1/wedding.png";
import sls from "../public/assets1/sls.webp";
import executiveCar from "../public/assets1/section2.webp";
import premium from "../public/assets1/section3.webp";
import banner from "../public/assets1/banner4.webp";
import testimonial from "../public/assets1/banner5.webp";
import mercedez from "../public/assets1/banner6.webp";
import comm from "../public/assets1/MPV_2_Group.png";
import dollor from "../public/assets1/MPV_3_Group.png";
import caravan from "../public/assets1/caravan.webp";
import merc from "../public/assets1/merc.webp";
import payment from "../public/assets1/payment.png";
import time from "../public/assets1/time.png";
import reading from "../public/assets1/reading.png";
import bottle from "../public/assets1/bottle.png";
import contact from "../public/assets1/contact.png";
import wifi from "../public/assets1/wifi.png";
import test from "../public/assets1/test.webp"
// Animation components
const FadeInWhenVisible = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const router = useRouter();

  // Testimonials carousel setup
  const [vehicleEmblaRef, vehicleEmblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
      dragFree: false,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      dragFree: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const vehicles = [
    {
      name: "Business Class",
      description: "Ideal for the busy executive. Punctual and professional",
      image: sls,
      passengers: 4,
      luggage: 2,
    },
    {
      name: "First Class",
      description:
        "A truly prestige class. Travel in supreme luxury and comfort",
      image: caravan,
      passengers: 4,
      luggage: 2,
    },
    {
      name: "MPV Class",
      description: "Travel as a group without compromising on luxury & comfort",
      image: merc,
      passengers: 6,
      luggage: 4,
    },
  ];

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
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    // Get the actual index within the original testimonials array
    const selectedIndex = emblaApi.selectedScrollSnap();
    setCurrentTestimonial(selectedIndex % testimonials.length);
  }, [emblaApi, testimonials.length]);

  useEffect(() => {
    if (!emblaApi) return;
    // Start at the middle set of testimonials to ensure smooth infinite scrolling
    emblaApi.scrollTo(testimonials.length, true);
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect, testimonials.length]);

  useEffect(() => {
    if (!vehicleEmblaApi) return;
    // Start at the middle set of vehicles to ensure smooth infinite scrolling
    vehicleEmblaApi.scrollTo(vehicles.length, true);
  }, [vehicleEmblaApi, vehicles.length]);

  // Form state
  const [pickupAddress, setPickupAddress] = useState<AddressResult | null>(
    null
  );
  const [dropoffAddress, setDropoffAddress] = useState<AddressResult | null>(
    null
  );
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Quote state
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const isFormValid = () => {
    return (
      pickupAddress &&
      dropoffAddress &&
      customerName.trim() &&
      customerEmail.trim() &&
      contactNumber.trim() &&
      selectedDate
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
        quoteDate
      );
      setQuote(generatedQuote);
      setShowQuote(true);
    } catch (error) {
      console.error("Error generating quote:", error);
      alert("Failed to generate quote. Please try again.");
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleCloseQuote = () => {
    setShowQuote(false);
    setQuote(null);
  };

  const handleBookNow = async () => {
    if (!quote || !customerEmail.trim()) {
      alert("Please ensure all required fields are filled.");
      return;
    }

    setBookingLoading(true);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerEmail,
          customerName,
          quote,
          pickupAddress: pickupAddress?.display_name,
          dropoffAddress: dropoffAddress?.display_name,
          selectedDate,
          contactNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Quote sent to your email successfully! Please check your inbox.");
        handleCloseQuote();
      } else {
        alert(data.error || "Failed to send quote. Please try again.");
      }
    } catch (error) {
      console.error("Error sending quote:", error);
      alert("Failed to send quote. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  // Contact form handlers
  const handleContactInputChange = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (contactError) setContactError("");
    if (contactSuccess) setContactSuccess(false);
  };

  const validateContactForm = () => {
    if (!contactForm.name.trim()) {
      setContactError("Name is required");
      return false;
    }
    if (!contactForm.email.trim()) {
      setContactError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      setContactError("Please enter a valid email address");
      return false;
    }
    if (!contactForm.message.trim()) {
      setContactError("Message is required");
      return false;
    }
    return true;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateContactForm()) return;

    if (!recaptchaValue) {
      setContactError("Please complete the reCAPTCHA verification.");
      return;
    }

    setContactLoading(true);
    setContactError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...contactForm,
          recaptchaToken: recaptchaValue,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setContactSuccess(true);
        setContactForm({ name: "", email: "", message: "" });
        setRecaptchaValue(null);
        // Auto-hide success message after 5 seconds
        setTimeout(() => setContactSuccess(false), 5000);
      } else {
        setContactError(
          data.error || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setContactError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection="HOME" />

      <Hero
        title="Welcome to"
        subtitle="Goldstar Executive"
        description="An executive car and chauffeur service covering Surrey, London and the home counties."
        showBookingForm={true}
        bookingFormProps={{
          AddressAutocomplete,
          pickupAddress,
          setPickupAddress,
          dropoffAddress,
          setDropoffAddress,
          customerName,
          setCustomerName,
          contactNumber,
          setContactNumber,
          selectedDate,
          setSelectedDate,
          customerEmail,
          setCustomerEmail,
          handleGetQuote,
          isFormValid,
          quoteLoading,
        }}
      />

      {/* Executive Car Services */}
      <section
        className="py-[20px] lg:py-[40px] relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${executiveCar.src})`,
        }}
      >
        <div className="container mx-auto px-4 max-w-[1170px]">
          <FadeInWhenVisible>
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 md:mb-1">
                Executive Car
              </h2>
              <p className="text-primary font-light text-2xl md:text-3xl">Services</p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FadeInWhenVisible delay={0.1}>
              <motion.div
                className="overflow-hidden transition-all duration-300 transform p-2 cursor-pointer hover:scale-105"
                onClick={() => router.push("/services/airport-transfer")}
              >
                <div
                  className="h-[170px]  bg-cover border-[3px] border-white bg-center relative rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundImage: `url(${airport.src})`,
                  }}
                >
                  <motion.div className="bg-gradient-to-b from-transparent to-black/80 h-full flex items-center justify-center p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold text-center">
                        Airport
                      </h3>
                      <p className="text-2xl font-bold text-center">Transfer</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6 !pl-0">
                  <p className="text-black font-medium text-base leading-relaxed">
                    We provide a professional door to door Airport transfer
                    service in Surrey, covering all UK Airports.
                  </p>
                </div>
              </motion.div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <motion.div
                className="bg-white overflow-hidden transition-all duration-300 transform p-2 cursor-pointer hover:scale-105"
                onClick={() => router.push("/services/business-events")}
              >
                <div
                  className="h-[170px] bg-cover border-[3px] border-white bg-center relative rounded-2xl overflow-hidden shadow-[0_0_4px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundImage: `url(${business.src})`,
                  }}
                >
                  <motion.div className="bg-gradient-to-b from-transparent to-black/80 h-full flex items-center justify-center p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold text-center">
                        Business &
                      </h3>
                      <p className="text-2xl font-bold text-center">
                        Social Events
                      </p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6 !pl-0">
                  <p className="text-black font-medium text-base leading-relaxed">
                    Whatever the event, big or small we will meticulously plan
                    the itinerary to ensure a seamless experience for all
                  </p>
                </div>
              </motion.div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3}>
              <motion.div
                className="bg-white overflow-hidden transition-all duration-300 transform p-2 cursor-pointer hover:scale-105"
                onClick={() => router.push("/services/corporate-travel")}
              >
                <div
                  className="h-[170px]  bg-cover border-[3px] border-white bg-center relative rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundImage: `url(${travel.src})`,
                  }}
                >
                  <motion.div className="bg-gradient-to-b from-transparent to-black/80 h-full flex items-center justify-center p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold text-center">
                        Corporate
                      </h3>
                      <p className="text-2xl font-bold text-center">Travel</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6 !pl-0">
                  <p className="text-black font-medium text-base leading-relaxed">
                    Goldstar Executive is the perfect partner for Businesses.
                    Find out more on the Corporate Accounts page
                  </p>
                </div>
              </motion.div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.4}>
              <motion.div
                className="bg-white overflow-hidden transition-all duration-300 transform p-2 cursor-pointer hover:scale-105"
                onClick={() => router.push("/services/wedding-cars")}
              >
                <div
                  className="h-[170px]  bg-cover border-[3px] border-white bg-center relative rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                  style={{
                    backgroundImage: `url(${wedding.src})`,
                  }}
                >
                  <motion.div className="bg-gradient-to-b from-transparent to-black/80 h-full flex items-center justify-center p-6">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold text-center">
                        Wedding
                      </h3>
                      <p className="text-2xl font-bold text-center">Cars</p>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6 !pl-0">
                  <p className="text-black font-medium text-base leading-relaxed">
                    For the special occasion we can supply the special car.
                    Speak to us now about your wedding packages
                  </p>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          </div>

          <FadeInWhenVisible delay={0.5}>
            <div className="text-center md-3 md:mt-6">
              <button
                onClick={() => router.push("/services")}
                className="bg-[#235e99] hover:bg-[#1a4773] lg:text-lg font-light text-white px-5 py-2 md:px-10 md:py-4 shadow-[6px_6px_15px_rgba(0,0,0,0.4)] rounded-lg transition-all duration-300 hover:shadow-[6px_6px_20px_rgba(0,0,0,0.4)] border border-white/20 cursor-pointer"
              >
                Find out more
              </button>
            </div>
          </FadeInWhenVisible>
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
        <div className="container mx-auto px-4 text-center max-w-[1170px] text-white">
          <FadeInWhenVisible>
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">
              Experience Premium Car Service
            </h2>
            <p className="text-2xl font-light mb-8 md:mb-16 text-primary">
              For those who value high quality
            </p>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-8">
              <motion.div
                className="text-center group"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-end justify-center mx-auto mb-8"
                  transition={{ duration: 0.3 }}
                >
                  <Image src={time} alt="time" />
                </motion.div>
                <h3 className="text-lg font-semibold max-w-[170px] mx-auto">
                  We are available 24/7
                </h3>
              </motion.div>

              <motion.div
                className="text-center group"

                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-end justify-center mx-auto mb-8"
                  transition={{ duration: 0.3 }}
                >
                  <Image src={payment} alt="payment" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 max-w-[170px] mx-auto">
                  Secure Payment methods
                </h3>
              </motion.div>

              <motion.div
                className="text-center group"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-end justify-center mx-auto mb-8"
                  transition={{ duration: 0.3 }}
                >
                  <Image src={bottle} alt="bottle" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 max-w-[170px] mx-auto">
                  Bottled Water
                </h3>
              </motion.div>

              <motion.div
                className="text-center group"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-end justify-center mx-auto mb-8"
                  transition={{ duration: 0.3 }}
                >
                  <Image src={wifi} alt="wifi" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">Wi-fi</h3>
              </motion.div>

              <motion.div
                className="text-center group xs:col-span-2 justify-items-center md:justify-items-start md:col-span-1"
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full flex items-end justify-center mx-auto mb-8"
                  transition={{ duration: 0.3 }}
                >
                  <Image src={reading} alt="reading" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 max-w-[170px] mx-auto">
                  Reading Materials
                </h3>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Travel Section */}
      <section
        className="py-10 lg:py-20 bg-gray-50"
        style={{
          backgroundImage: `url(${banner.src})`,
        }}
      >
        <div className="container mx-auto px-4 max-w-[1170px]">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Experience Luxury Travel
            </h2>
            <p className="text-2xl text-primary md:text-[27px] font-light">
              in Chauffeur-Driven Executive Cars 
            </p>
          </div>

          <div className="embla overflow-hidden" ref={vehicleEmblaRef}>
            <div className="embla__container flex">
              {[...vehicles, ...vehicles].map((vehicle, index) => {
                const actualIndex = index % vehicles.length;
                const vehicleSlug = vehicles[actualIndex].name.toLowerCase().replace(/\s+/g, '-');
                return (
                  <div
                    key={`vehicle-${index}`}
                    className="embla__slide min-w-0"
                  >
                    <div
                      className="overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => router.push(`/fleet/${vehicleSlug}`)}
                    >
                      <div className="h-48 md:h-64 flex items-center justify-center">
                        <Image src={vehicle.image} alt={vehicle.name} />
                      </div>
                      <div className="px-3 md:p-6">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-black">
                          {vehicle.name}
                        </h3>
                        <p className="text-black md:text-lg h-[70Spx] mb-6">
                          {vehicle.description}
                        </p>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex gap-2">
                            <div>
                              <Image
                                src={dollor}
                                alt="passengers"
                                className="w-[20px] h-[20px]"
                              />
                            </div>
                            <span className="text-base font-medium text-black">
                              max: {vehicle.passengers}
                            </span>
                          </div>
                          <div className="h-6 w-px bg-black"></div>
                          <div className="flex gap-2">
                            <div>
                              <Image
                                src={comm}
                                alt="luggage"
                                className="w-[20px] h-[20px]"
                              />
                            </div>
                            <span className="text-base font-medium text-black">
                              max: {vehicle.luggage}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <FadeInWhenVisible delay={0.3}>
            <div className="text-center mt-6 md:mt-12">
              <button
                onClick={() => router.push("/fleet")}
                className="bg-[#235e99] backdrop-blur-md hover:bg-[#1a4773] font-light lg:text-lg  shadow-[6px_6px_15px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_20px_rgba(0,0,0,0.4)] text-white px-5 py-2 md:px-10 md:py-4 rounded-lg transition-all duration-300 border border-white/20 cursor-pointer"
              >
                Find out more
              </button>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-10 lg:py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${testimonial.src})`,
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <FadeInWhenVisible>
            <h2 className="text-3xl md:text-4xl font-bold md:mb-4">We Want To Hear</h2>
            <p className="text-2xl md:text-3xl mb-3 md:mb-6">Your Opinion</p>
          </FadeInWhenVisible>

          <div className="max-w-6xl mx-auto">
            <FadeInWhenVisible delay={0.2}>
              <p className="md:text-lg leading-relaxed">
                It is our clients feedback and opinions which allow us to
                provide a truly great service.
              </p>
              <p className="text-lg mb-6 md:mb-12 leading-relaxed">
                Every good review is the finest form of appreciation of our work imagination
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="embla__container flex">
                  {/* Duplicate testimonials for seamless infinite loop */}
                  {[...testimonials, ...testimonials].map(
                    (testimonial, index) => (
                      <div
                        key={`testimonial-${index}`}
                        className="embla__slide min-w-0"
                      >
                        <div
                          className=" rounded-lg p-6 h-full"
                        >
                          <div
                            className="text-4xl flex justify-center text-white/40 mb-4"
                          >
                            <Image src={test} alt="test"/>
                          </div>
                          <p className="text-base mb-4 italic leading-relaxed text-white/90">
                            {testimonial.text}
                          </p>
                          <motion.p
                            className="font-semibold"
                            whileHover={{ scale: 1.05 }}
                          >
                            {testimonial.author}
                          </motion.p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.6}>
              <div className="flex justify-center items-center space-x-4 mt-8">
                {/* <motion.button
                  onClick={scrollPrev}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
                  whileHover={{
                    scale: 1.1,
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button> */}

                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        if (emblaApi) {
                          // Navigate to the middle set to avoid edge cases
                          const targetIndex = testimonials.length + index;
                          emblaApi.scrollTo(targetIndex);
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                        index === currentTestimonial
                          ? "bg-white scale-125"
                          : "bg-black hover:bg-white/60"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>

                {/* <motion.button
                  onClick={scrollNext}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/20"
                  whileHover={{
                    scale: 1.1,
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button> */}
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-10 lg:py-20 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${mercedez.src})`,
        }}
      >
        {/* Gradient overlay - darker at top, lighter at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeInWhenVisible>
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Talk To Us</h2>
            </div>
          </FadeInWhenVisible>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleContactSubmit}>
              <FadeInWhenVisible delay={0.2}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
                  <motion.input
                    type="text"
                    placeholder="Name"
                    value={contactForm.name}
                    onChange={(e) =>
                      handleContactInputChange("name", e.target.value)
                    }
                    className={`bg-white/90 backdrop-blur-sm text-black px-2 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all duration-300 border ${
                      contactError && !contactForm.name.trim()
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#235e99]"
                    }`}
                    disabled={contactLoading}
                    required
                  />
                  <motion.input
                    type="email"
                    placeholder="Email"
                    value={contactForm.email}
                    onChange={(e) =>
                      handleContactInputChange("email", e.target.value)
                    }
                    className={`bg-white/90 backdrop-blur-sm text-black px-2 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:bg-white transition-all duration-300 border ${
                      contactError &&
                      (!contactForm.email.trim() ||
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email))
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-[#235e99]"
                    }`}
                    disabled={contactLoading}
                    required
                  />
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.3}>
                <motion.textarea
                  placeholder="How can we help you?"
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) =>
                    handleContactInputChange("message", e.target.value)
                  }
                  className={`w-full text-black bg-white/90 backdrop-blur-sm px-2 py-2 md:px-4 md:py-3 rounded-lg focus:outline-none focus:ring-2 focus:bg-white mb-6 transition-all duration-300 border ${
                    contactError && !contactForm.message.trim()
                      ? "border-red-500 focus:ring-red-500"
                      : "border-white/20 focus:ring-[#235e99]"
                  }`}
                  disabled={contactLoading}
                  required
                ></motion.textarea>
              </FadeInWhenVisible>

              {/* Error Message */}
              {contactError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-lg text-red-100 text-center"
                >
                  {contactError}
                </motion.div>
              )}

              {/* Success Message */}
              {contactSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/50 rounded-lg text-green-100 text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      Thank you! Your message has been sent successfully. We'll
                      get back to you soon!
                    </span>
                  </div>
                </motion.div>
              )}

              <FadeInWhenVisible delay={0.3}>
                <div className="flex justify-center mb-6">
                  
                    <ReCAPTCHA
                      sitekey="6LfcgMorAAAAAEwEYVQROOhQ7UvedHoyHlJcg_aa"
                      onChange={(value) => setRecaptchaValue(value)}
                      onExpired={() => setRecaptchaValue(null)}
                      onError={() => setRecaptchaValue(null)}
                      theme="dark"
                    />
                  
                </div>
              </FadeInWhenVisible>

              <FadeInWhenVisible delay={0.4}>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={contactLoading || contactSuccess || !recaptchaValue}
                    className={`bg-[#235e99] cursor-pointer shadow-[6px_6px_15px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_20px_rgba(0,0,0,0.4)] lg:text-lg font-light text-white lg:px-12 lg:py-4 rounded-lg px-4 py-2 disabled:cursor-not-allowed"
                    `}
                  >
                    {contactLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : contactSuccess ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Sent!</span>
                      </div>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </FadeInWhenVisible>
            </form>
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
          bookingLoading={bookingLoading}
        />
      )}

      <Footer />
    </div>
  );
}
