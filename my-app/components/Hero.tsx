import herobg from "../public/assets1/banner.jpg";
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
    selectedTime: string;
    setSelectedTime: (time: string) => void;
    serviceType: string;
    setServiceType: (type: string) => void;
    handleGetQuote: () => void;
    isFormValid: () => any;
    quoteLoading: boolean;
  };
}

export default function Hero({ title, subtitle, description, showBookingForm = false, bookingFormProps }: HeroProps) {
  return (
    <section className={`${showBookingForm ? 'min-h-screen' : 'min-h-[350px] lg:min-h-[900px]'} bg-cover bg-center overflow-hidden px-4 md:px-0`} style={{
      backgroundImage: `url(${herobg.src})`
    }}>
      <div className="inset-0 flex items-center justify-center mt-[120px] md:mt-[170px] lg:mt-[200px] 2xl:mt-[400px]">
        <div className="text-center text-white">
          {title && <h1 className="text-3xl md:text-6xl font-light lg:mb-4">{title}</h1>}
          <h2 className="text-2xl md:text-5xl font-bold text-primary mb-6">
            {subtitle}
          </h2>
          <p className="md:text-xl text-base lg:mb-12 mb-4 max-w-2xl mx-auto">
            {description}
          </p>

          {showBookingForm && bookingFormProps && (
            <div className="p-8 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-primary mb-4">
                QUOTE & BOOK A CAR
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 md:mb-6">
                <bookingFormProps.AddressAutocomplete
                  placeholder="Pick Up Location"
                  className="bg-white/10 w-full lg:max-w-[200px] backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                  onAddressSelect={bookingFormProps.setPickupAddress}
                />
                <bookingFormProps.AddressAutocomplete
                  placeholder="Drop Off Location"
                  className="bg-white/10 w-full lg:max-w-[200px] backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                  onAddressSelect={bookingFormProps.setDropoffAddress}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={bookingFormProps.customerName}
                  onChange={(e) => bookingFormProps.setCustomerName(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                />
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={bookingFormProps.contactNumber}
                  onChange={(e) => bookingFormProps.setContactNumber(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20 placeholder-white/70"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="relative w-full md:w-auto">
                  <input
                    type="date"
                    value={bookingFormProps.selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => bookingFormProps.setSelectedDate(e.target.value)}
                    className="bg-white/10 w-full backdrop-blur-sm text-white lg:px-4 lg:py-3 px-2 py-1.5 rounded border border-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/20"
                    style={{ colorScheme: 'dark' }}
                  />
                  {!bookingFormProps.selectedDate && (
                    <span className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none text-sm lg:text-base md:hidden">
                      Select Date
                    </span>
                  )}
                </div>
                <div className="relative w-full md:w-auto">
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
                </div>
                <select 
                  value={bookingFormProps.serviceType}
                  onChange={(e) => bookingFormProps.setServiceType(e.target.value)}
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
                onClick={bookingFormProps.handleGetQuote}
                disabled={!bookingFormProps.isFormValid() || bookingFormProps.quoteLoading}
                className="bg-[#235e99] text-white lg:px-8 lg:py-3 px-4 py-1.5 rounded lg:font-semibold transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {bookingFormProps.quoteLoading ? 'Getting Quote...' : 'Get Quote'}
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
          )}
        </div>
      </div>
    </section>
  );
}