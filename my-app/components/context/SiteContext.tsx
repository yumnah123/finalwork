"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getSiteSettings } from "@/app/api/get-site-settings";

// ✅ Define SiteSettings type based on your GraphQL structure
export interface SiteSettings {
  siteName?: string;
  phoneNumber?: string;
  phoneNumberRaw?: string;
  companyDescription?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  googleMapsUrl?: string;
  email?: string;
  website?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  copyrightText?: string;
  designerCredit?: string;
  logo?: {
    url?: string;
  };
}

// ✅ Define context shape
interface SiteContextType {
  settings: SiteSettings | null;
  loading: boolean;
}

// ✅ Create context
const SiteContext = createContext<SiteContextType>({
  settings: null,
  loading: true,
});

// ✅ Provider component
export function SiteProvider({
  children,
  initialSettings = null,
}: {
  children: React.ReactNode;
  initialSettings?: SiteSettings | null;
}) {
  const [settings, setSettings] = useState<SiteSettings | null>(initialSettings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only fetch if no settings were passed
    if (!initialSettings) {
      setLoading(true);
      async function fetchSettings() {
        try {
          const data = await getSiteSettings();
          setSettings(data);
        } catch (error) {
          console.error("Error fetching site settings:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchSettings();
    }
  }, [initialSettings]);

  return (
    <SiteContext.Provider value={{ settings, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSiteSettings must be used within a SiteProvider");
  }
  return context;
}
