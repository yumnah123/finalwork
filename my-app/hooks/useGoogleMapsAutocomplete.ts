"use client";
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const useGoogleMapsAutocomplete = (inputRef: React.RefObject<HTMLInputElement>) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
          version: "weekly",
          libraries: ["places"],
        });

        await loader.load();
        setIsLoaded(true);

        if (inputRef.current) {
          const autocompleteInstance = new google.maps.places.Autocomplete(
            inputRef.current,
            {
              componentRestrictions: { country: "gb" }, // Restrict to UK
              fields: ["place_id", "geometry", "name", "formatted_address"],
              types: ["establishment", "geocode"],
            }
          );

          autocompleteInstance.addListener("place_changed", () => {
            const selectedPlace = autocompleteInstance.getPlace();
            setPlace(selectedPlace);
          });

          setAutocomplete(autocompleteInstance);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initializeAutocomplete();

    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [inputRef]);

  return { autocomplete, place, isLoaded };
};