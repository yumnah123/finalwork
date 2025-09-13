"use client";
import { useState, useEffect, useRef } from "react";

export interface AddressResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
  address?: {
    house_number?: string;
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    town?: string;
    village?: string;
    postcode?: string;
    country?: string;
    county?: string;
    state?: string;
  };
  class?: string;
  type?: string;
  extratags?: Record<string, string>;
}

export interface UseAddressAutocompleteReturn {
  suggestions: AddressResult[];
  loading: boolean;
  selectedAddress: AddressResult | null;
  searchAddress: (query: string) => void;
  selectAddress: (address: AddressResult) => void;
  clearSuggestions: () => void;
}

// Helper function to detect UK postal codes
const isUKPostalCode = (query: string): boolean => {
  // UK postal code regex pattern (supports formats like: SW1A 1AA, B33 8TH, M1 1AA, etc.)
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s*[0-9][A-Z]{2}$/i;
  return ukPostcodeRegex.test(query.trim());
};

// Helper function to detect partial UK postal codes (outward code only)
const isPartialUKPostalCode = (query: string): boolean => {
  // Matches outward codes like: SW1A, B33, M1, etc.
  const partialPostcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?$/i;
  return partialPostcodeRegex.test(query.trim());
};

// Helper function to calculate address priority for sorting
const calculateAddressPriority = (result: AddressResult, searchQuery?: string): number => {
  let score = 0;
  
  // Extra high priority for exact postal code matches when searching by postal code
  if (searchQuery && (isUKPostalCode(searchQuery) || isPartialUKPostalCode(searchQuery))) {
    const searchPostcode = searchQuery.trim().replace(/\s+/g, '').toUpperCase();
    const resultPostcode = result.address?.postcode?.replace(/\s+/g, '').toUpperCase();
    
    if (resultPostcode === searchPostcode) {
      score += 200; // Highest priority for exact postal code match
    } else if (resultPostcode?.startsWith(searchPostcode)) {
      score += 150; // High priority for partial postal code match
    }
  }
  
  // Prioritize results with house numbers and roads (actual addresses)
  if (result.address?.house_number && result.address?.road) {
    score += 100;
  }
  
  // Medium priority for results with roads but no house number (streets)
  if (result.address?.road && !result.address?.house_number) {
    score += 50;
  }
  
  // Lower priority for buildings without specific addresses
  if (result.class === "building") {
    score += 30;
  }
  
  // Bonus points for postcodes (indicates specific location)
  if (result.address?.postcode) {
    score += 20;
  }
  
  // Penalize very general locations (countries, states)
  if (result.class === "boundary" || result.type === "administrative") {
    score -= 50;
  }
  
  // Penalize results that are just cities/towns without streets
  if ((result.address?.city || result.address?.town || result.address?.village) && 
      !result.address?.road && !result.address?.house_number) {
    score -= 30;
  }
  
  return score;
};

export const useAddressAutocomplete = (
  countryCode: string = "gb"
): UseAddressAutocompleteReturn => {
  const [suggestions, setSuggestions] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>(null);

  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce the search
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        let url: string;
        
        // Check if query is a postal code and use structured query for better results
        if (isUKPostalCode(query) || isPartialUKPostalCode(query)) {
          // Use structured query for postal codes
          url = `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              postalcode: query.trim(),
              format: "jsonv2",
              countrycodes: countryCode,
              limit: "15", // More results for postal code areas
              addressdetails: "1",
              extratags: "1",
            });
        } else {
          // Use free-form query for general searches
          url = `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              q: query,
              format: "jsonv2",
              countrycodes: countryCode,
              limit: "10",
              addressdetails: "1",
              extratags: "1",
            });
        }
        
        const response = await fetch(url);

        if (response.ok) {
          const data: AddressResult[] = await response.json();
          
          // Filter and sort results to prioritize specific addresses
          const filteredData = data
            .map(result => ({
              ...result,
              // Calculate priority score for sorting
              priority: calculateAddressPriority(result, query)
            }))
            .sort((a, b) => b.priority - a.priority)
            .map(({ priority, ...result }) => result);
          
          setSuggestions(filteredData);
        } else {
          console.error("Failed to fetch address suggestions");
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching address suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const selectAddress = (address: AddressResult) => {
    setSelectedAddress(address);
    setSuggestions([]);
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return {
    suggestions,
    loading,
    selectedAddress,
    searchAddress,
    selectAddress,
    clearSuggestions,
  };
};