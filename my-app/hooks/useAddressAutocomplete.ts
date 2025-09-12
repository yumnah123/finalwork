"use client";
import { useState, useEffect, useRef } from "react";

export interface AddressResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
}

export interface UseAddressAutocompleteReturn {
  suggestions: AddressResult[];
  loading: boolean;
  selectedAddress: AddressResult | null;
  searchAddress: (query: string) => void;
  selectAddress: (address: AddressResult) => void;
  clearSuggestions: () => void;
}

export const useAddressAutocomplete = (
  countryCode: string = "gb"
): UseAddressAutocompleteReturn => {
  const [suggestions, setSuggestions] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?` +
            new URLSearchParams({
              q: query,
              format: "json",
              countrycodes: countryCode,
              limit: "5",
              addressdetails: "1",
            })
        );

        if (response.ok) {
          const data: AddressResult[] = await response.json();
          setSuggestions(data);
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