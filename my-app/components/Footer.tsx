"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../public/Logo.svg";
import footerBg from "../public/assets1/banner7.webp";
import twitter from "../public/assets1/twitter.png";
import facebook from "../public/assets1/facebook.png";
import linkedln from "../public/assets1/linkdln.png";
import dot from "../public/assets1/dot.png";
import adress from "../public/assets1/adress.png";
import contact from "../public/assets1/contact.png";
import email from "../public/assets1/email.png";
import world from "../public/assets1/world.png";
import { getSiteSettings } from "../app/api/get-site-settings";

interface SiteSettings {
  siteName: string;
  phoneNumber: string;
  phoneNumberRaw: string;
  companyDescription: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  googleMapsUrl: string;
  email: string;
  website: string;
  websiteUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  copyrightText: string;
  designerCredit: string;
  logo?: {
    url: string;
  };
}

export default function Footer() {
  const router = useRouter();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error("Error loading site settings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const defaultSettings: SiteSettings = {
    siteName: "Gold Star Executive",
    phoneNumber: "+44 (0) 1483 765 765",
    phoneNumberRaw: "+442038587786",
    companyDescription:
      "An executive car and chauffeur service covering Surrey, London and the Home Counties.",
    addressLine1: "Goldstar Executive Ltd",
    addressLine2: "3000 Cathedral Hill,",
    city: "Guildford,",
    postalCode: "GU2 7YB",
    country: "United Kingdom",
    googleMapsUrl:
      "https://maps.google.com/?q=Goldstar+Executive+Ltd,+3000+Cathedral+Hill,+Guildford,+GU2+7YB,+United+Kingdom",
    email: "bookings@goldstarexecutive.com",
    website: "www.goldstarexecutive.com",
    websiteUrl: "https://www.goldstarexecutive.co.uk",
    facebookUrl: "https://facebook.com",
    twitterUrl: "https://twitter.com",
    linkedinUrl: "https://www.linkedin.com/",
    copyrightText:
      "Copyright © 2025 Gold Star Executive. All Rights Reserved.",
    designerCredit: "Web Design UK by myteamscot.",
  };

  const displaySettings = settings || defaultSettings;

  const keystoneUrl =
    process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:5000";
   const logoUrl = settings?.logo?.url
   ? settings.logo.url.startsWith("http")
     ? settings.logo.url
      : `${keystoneUrl}${settings.logo.url}`
    : logo;
const isExternalLogo = typeof logoUrl === "string";
  return (
    <footer
      className="bg-black text-gray-300 bg-cover bg-center lg:h-[485px] pt-12 xl:pt-24 pb-4 lg:px-6 md:pb-8 2xl:pb-0 2xl:px-0"
      style={{ backgroundImage: `url(${footerBg.src})` }}
    >
      <div className="container mx-auto max-w-[1170px] lg:gap-16 flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-between mt-4 xl:ml-6 mb-10 lg:mb-0 gap-8 xl:gap-24">
          {/* Logo and About */}
          <div className="max-w-[280px] flex flex-col justify-start items-start gap-5">
            <div
              className="cursor-pointer"
              onClick={() => router.push("/")}
            >
              {loading ? (
                <div className="w-[280px] h-[95px] bg-gray-700 animate-pulse rounded" />
              ) : (
               
             
                <Image
                  src={logoUrl as any}
                  alt={settings?.siteName || "GoldStar Logo"}
                  width={280}
                  height={95}
                  priority
                  
                />
              )}
            </div>

            {loading ? (
              <div className="w-full h-20 bg-gray-700 animate-pulse rounded" />
            ) : (
              <p className="text-gray-300 2xl:text-lg text-center lg:text-left leading-relaxed lg:mb-4">
                {displaySettings.companyDescription}
              </p>
            )}

            {/* Socials (Desktop) */}
            <div className="gap-4 hidden lg:flex">
              <a
                href={displaySettings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-[32px] h-[32px] flex justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
              >
                <Image src={facebook} alt="facebook" />
              </a>
              <a
                href={displaySettings.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-[32px] h-[32px] flex justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
              >
                <Image src={twitter} alt="twitter" />
              </a>
              <a
                href={displaySettings.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-[32px] h-[32px] flex justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
              >
                <Image src={linkedln} alt="linkedin" />
              </a>
            </div>
          </div>

          {/* Links, Address, Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-rows-1 lg:grid-cols-[140px_minmax(240px,_1fr)_300px] gap-8 lg:gap-0 xl:gap-8">
            {/* LINKS */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-center lg:text-left text-primary">
                LINKS
              </h3>
              <ul className="space-y-2 xl:text-lg text-gray-300">
                {[
                  { name: "Home", href: "/" },
                  { name: "Services", href: "/services" },
                  { name: "Our Fleet", href: "/fleet" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="hover:text-primary flex gap-2 lg:justify-normal justify-center transition-colors"
                    >
                      <div className="flex items-center">
                        <Image src={dot} alt="dot" />
                      </div>
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ADDRESS */}
            <div>
              <h3 className="text-lg font-bold mb-4 text-primary text-center lg:text-left">
                ADDRESS
              </h3>
              <a
                href={displaySettings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="xl:text-lg text-gray-300 lg:text-left text-center space-y-2 ml-4 hover:text-primary transition-colors cursor-pointer block"
              >
                <div className="relative">
                  <div className="absolute left-6 lg:-left-4.5 top-2">
                    <Image src={adress} alt="adress" />
                  </div>
                  <p>{displaySettings.addressLine1}</p>
                </div>
                <p>{displaySettings.addressLine2}</p>
                <p>{displaySettings.city}</p>
                <p>{displaySettings.postalCode}</p>
                <p>{displaySettings.country}</p>
              </a>
            </div>

            {/* CONTACT */}
            <div className="sm:justify-self-center lg:justify-self-start sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 text-primary text-center lg:text-left">
                CONTACT US
              </h3>
              <div className="xl:text-lg text-gray-300 space-y-2">
                <a
                  href={`tel:${displaySettings.phoneNumberRaw}`}
                  className="flex gap-2 lg:justify-normal justify-center hover:text-primary"
                >
                  <div className="flex items-center">
                    <Image src={contact} alt="contact" />
                  </div>
                  <p>{displaySettings.phoneNumber}</p>
                </a>
                <a
                  href={`mailto:${displaySettings.email}`}
                  className="flex gap-2 hover:text-primary lg:justify-normal justify-center transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <Image src={email} alt="email" />
                  </div>
                  <p>{displaySettings.email}</p>
                </a>
                <a
                  href={displaySettings.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 hover:text-primary lg:justify-normal justify-center transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <Image src={world} alt="website" />
                  </div>
                  <p>{displaySettings.website}</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Socials */}
        <div className="gap-4 flex justify-center mb-10 lg:hidden">
          {[displaySettings.facebookUrl, displaySettings.twitterUrl, displaySettings.linkedinUrl].map((url, i) => (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary w-[32px] h-[32px] flex justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
            >
              <Image
                src={[facebook, twitter, linkedln][i]}
                alt="social"
              />
            </a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="flex lg:flex-row flex-col gap-4 justify-between text-center text-gray-300">
          <p>{displaySettings.copyrightText}</p>
          <p>{displaySettings.designerCredit}</p>
        </div>
      </div>
    </footer>
  );
}
