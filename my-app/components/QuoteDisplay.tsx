"use client";
import dynamic from 'next/dynamic';
import { QuoteBreakdown } from '../lib/pricing-config';
import { AddressResult } from '../hooks/useAddressAutocomplete';
import { CheckCircle, Clock, X } from 'lucide-react';

// Dynamic import of MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('./MapView').then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#235e99]"></div>
    </div>
  ),
});

interface QuoteDisplayProps {
  quote: QuoteBreakdown | null;
  loading: boolean;
  pickup: AddressResult | null;
  dropoff: AddressResult | null;
  onClose: () => void;
  onBook?: () => void;
}

export const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
  quote,
  loading,
  pickup,
  dropoff,
  onClose,
  onBook,
}) => {
  if (!quote && !loading) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount);
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(1)} km (${(distance * 0.621371).toFixed(1)} miles)`;
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.round(duration / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const formatValidUntil = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {loading ? 'Calculating Quote...' : 'Your Quote'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#235e99]"></div>
            </div>
          ) : quote ? (
            <div className="grid grid-cols-1 gap-6">              
              {/* Quote Details Section */}
              <div className="space-y-6 col-span-2">
              {/* Service Type */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {quote.serviceType}
                </h3>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <span>📍 {formatDistance(quote.distance)}</span>
                  <span>⏱️ {formatDuration(quote.estimatedDuration)}</span>
                </div>
              </div>

              {pickup && dropoff && (
                <div className="lg:order-1">
                  <h4 className="font-semibold text-gray-800 mb-3">Route Map</h4>
                  <MapView 
                    pickup={pickup}
                    dropoff={dropoff}
                    className="h-80 w-full"
                  />
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <h4 className="font-semibold text-gray-800 mb-3">Price Breakdown</h4>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Base fare</span>
                  <span className="font-medium text-gray-600">{formatCurrency(quote.baseFare)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance cost</span>
                  <span className="font-medium text-gray-600">{formatCurrency(quote.distanceCost)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated waiting time</span>
                  <span className="font-medium text-gray-600">{formatCurrency(quote.waitingTimeCost)}</span>
                </div>

                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-600">{formatCurrency(quote.subtotal)}</span>
                  </div>
                </div>

                {quote.surgeMultiplier > 0 && (
                  <div className="flex justify-between text-orange-600">
                    <span>Surge ({quote.surgeMultiplier}%)</span>
                    <span className="font-medium text-gray-600">+{formatCurrency(quote.surgeAmount)}</span>
                  </div>
                )}

                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span className='text-black'>Total</span>
                    <span className="text-[#235e99]">{formatCurrency(quote.total)}</span>
                  </div>
                </div>
              </div>

              {/* Quote Validity */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">
                      Quote valid until
                    </p>
                    <p className="text-sm text-yellow-700">
                      {formatValidUntil(quote.validUntil)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Guaranteed Pick-Up</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">100% Money Back</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Professional Driver</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Free Cancellation</span>
                </div>
              </div>

              </div>
              
              {/* Action Buttons - Span both columns */}
              <div className="col-span-2 flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Get New Quote
                </button>
                {onBook && (
                  <button
                    onClick={onBook}
                    className="flex-1 px-4 py-3 bg-[#235e99] text-white rounded-lg hover:bg-[#1e4f82] transition-colors font-medium"
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Unable to generate quote. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};