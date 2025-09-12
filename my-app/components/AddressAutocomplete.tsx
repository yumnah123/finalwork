"use client";
import { useState, useRef, useEffect } from 'react';
import { useAddressAutocomplete, AddressResult } from '../hooks/useAddressAutocomplete';

interface AddressAutocompleteProps {
  placeholder: string;
  className?: string;
  onAddressSelect: (address: AddressResult | null) => void;
  value?: string;
  onChange?: (value: string) => void;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  placeholder,
  className = "",
  onAddressSelect,
  value = "",
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    suggestions,
    loading,
    selectedAddress,
    searchAddress,
    selectAddress,
    clearSuggestions,
  } = useAddressAutocomplete();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (selectedAddress) {
      setInputValue(selectedAddress.display_name);
      setShowSuggestions(false);
      onAddressSelect(selectedAddress);
    }
  }, [selectedAddress, onAddressSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    
    if (newValue.trim()) {
      searchAddress(newValue);
      setShowSuggestions(true);
    } else {
      clearSuggestions();
      setShowSuggestions(false);
      onAddressSelect(null);
    }
  };

  const handleSuggestionClick = (address: AddressResult) => {
    selectAddress(address);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setShowSuggestions(false);
      }
    }, 150);
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      
      {showSuggestions && (suggestions.length > 0 || loading) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {loading && (
            <div className="px-4 py-3 text-gray-500 text-sm">
              Searching...
            </div>
          )}
          
          {!loading && suggestions.map((address) => (
            <button
              key={address.place_id}
              onClick={() => handleSuggestionClick(address)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none border-b border-gray-100 last:border-b-0"
            >
              <div className="text-sm text-gray-900 truncate">
                {address.display_name}
              </div>
            </button>
          ))}
          
          {!loading && suggestions.length === 0 && inputValue.length >= 3 && (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No addresses found
            </div>
          )}
        </div>
      )}
    </div>
  );
};