import herobg from "../public/assets1/banner.webp";
import { CheckCircle } from "lucide-react";

interface HeroProps {
  title: string | null;
  subtitle: string;
  description: string;
  showBookingForm?: boolean;
  bookingFormProps?: {
    AddressAutocomplete: any;
    pickupAddress: any;
    setPickupAddress: (address: any) => void;
    dropoffAddress: any;
    setDropoffAddress: (address: any) => void;
    customerName: string;
    setCustomerName: (name: string) => void;
    contactNumber: string;
    setContactNumber: (number: string) => void;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    customerEmail: string;
    setCustomerEmail: (email: string) => void;
    handleGetQuote: () => void;
    isFormValid: () => any;
    quoteLoading: boolean;
  };
}

export default function Hero({
  title,
  subtitle,
  description,
  showBookingForm = false,
  bookingFormProps,
}: HeroProps) {
  return (
    <section
      className={`${
        showBookingForm
          ? "2xl:min-h-[926px] xl:min-h-[800px]"
          : "min-h-[350px] lg:min-h-[800px]"
      } bg-cover bg-center overflow-hidden px-4 md:px-0`}
      style={{
        backgroundImage: `url(${herobg.src})`,
      }}
    >
      <div className={`inset-0 flex items-center justify-center ${showBookingForm ? "mt-[120px] md:mt-[120px] lg:mt-[200px] 2xl:mt-[200px]" : "mt-[120px] lg:mt-[320px]"}`}>
        <div className="text-center text-white">
          {title && (
            <h1 className={`${showBookingForm ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl'} lg:text-4xl xl:text-6xl font-light lg:mb-2 xl:mb-2`}>
              {title}
            </h1>
          )}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 xl:mb-6">
            {subtitle}
          </h2>
          <p className="lg:text-xl lg:font-light text-base 2xl:mb-12 mb-4 mx-auto md:max-w-2xl lg:max-w-none">
            {description}
          </p>

          {showBookingForm && bookingFormProps && (
            <div className="p-6 !pt-4 md:p-8 md:!pt-6 max-w-5xl mx-auto">
              <h3 className="text-2xl lg:text-3xl xl:text-4xl text-primary mb-4">
                QUOTE & BOOK A CAR
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 lg:text-lg font-light md:mb-6">
                <div className="md:col-span-2 ">
                  <bookingFormProps.AddressAutocomplete
                    placeholder="Pick Up Location"
                    className="bg-white/15 w-full backdrop-blur-xs text-white lg:px-4 lg:py-3 px-2 py-1.5 border border-white/70 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                    onAddressSelect={bookingFormProps.setPickupAddress}
                  /> 
                </div>
                <div className="md:col-span-2">
                  <bookingFormProps.AddressAutocomplete
                    placeholder="Drop Off Location"
                    className="bg-white/15 w-full backdrop-blur-xs text-white lg:px-4 lg:py-3 px-2 py-1.5 border border-white/70 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                    onAddressSelect={bookingFormProps.setDropoffAddress}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 lg:text-lg font-light">
                <input
                  type="text"
                  placeholder="Name"
                  value={bookingFormProps.customerName}
                  onChange={(e) =>
                    bookingFormProps.setCustomerName(e.target.value)
                  }
                  className="bg-white/15 backdrop-blur-xs text-white lg:px-4 lg:py-3 px-2 py-1.5 border border-white/70 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={bookingFormProps.contactNumber}
                  onChange={(e) =>
                    bookingFormProps.setContactNumber(e.target.value)
                  }
                  className="bg-white/15 backdrop-blur-xs text-white lg:px-4 lg:py-3 px-2 py-1.5 border border-white/70 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={bookingFormProps.customerEmail}
                  onChange={(e) =>
                    bookingFormProps.setCustomerEmail(e.target.value)
                  }
                  className="bg-white/15 backdrop-blur-xs text-white lg:px-4 lg:py-3 px-2 py-1.5 border border-white/70 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                />
                <div className="relative w-full md:w-auto">
                  <input
                    type="date"
                    value={bookingFormProps.selectedDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) =>
                      bookingFormProps.setSelectedDate(e.target.value)
                    }
                    className="bg-white/15 w-full backdrop-blur-xs text-white lg:px-4 lg:py-3 px-2 py-1.5 border border-white/70 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                    style={{ colorScheme: "dark" }}
                  />
                  {!bookingFormProps.selectedDate && (
                    <span className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none text-sm lg:text-base md:hidden">
                      Select Date
                    </span>
                  )}
                </div>
                {/* <div className="relative w-full md:w-auto">
                  <input
                    type="time"
                    value={bookingFormProps.selectedTime}
                    onChange={(e) => bookingFormProps.setSelectedTime(e.target.value)}
                    className="bg-white/10 w-full backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                    style={{ colorScheme: 'dark' }}
                  />
                  {!bookingFormProps.selectedTime && (
                    <span className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none text-sm lg:text-base md:hidden">
                      Select Time
                    </span>
                  )}
                </div> */}
              </div>
              <button
                onClick={bookingFormProps.handleGetQuote}
                disabled={
                  !bookingFormProps.isFormValid() ||
                  bookingFormProps.quoteLoading
                }
                className="bg-[#235e99] shadow-[6px_6px_15px_rgba(0,0,0,0.4)] hover:shadow-[6px_6px_20px_rgba(0,0,0,0.4)] lg:text-lg font-light text-white lg:px-12 lg:py-4 rounded-lg px-4 py-2 transition-colors disabled:cursor-not-allowed"
              >
                {bookingFormProps.quoteLoading
                  ? "Getting Quote..."
                  : "Get Quote"}
              </button>
              <div className="hidden md:flex flex-wrap justify-center gap-6 mt-8 md:mt-6 md:mb-2 lg:mb-4 2xl:mb-0 xl:mt-12 text-sm">
                <div className="flex items-center font-light">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="lg:text-xl text-sm">Guaranteed Pick-Up</span>
                </div>
                <div className="flex items-center font-light">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="lg:text-xl text-sm">100% Money Back</span>
                </div>
                <div className="flex items-center font-light">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="lg:text-xl text-sm">
                    Professional, Local Experts
                  </span>
                </div>
                <div className="flex items-center font-light">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="lg:text-xl text-sm">Free Cancellation</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
