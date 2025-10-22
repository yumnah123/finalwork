"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import logo from "../public/Logo.svg";
import contactIcon from "../public/assets1/contact.png";
import { useSiteSettings } from "../components/context/SiteContext"; // adjust path if needed

interface HeaderProps {
  activeSection?: string;
}

export default function Header({ activeSection = "" }: HeaderProps) {
  const router = useRouter();
  const { settings, loading } = useSiteSettings();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Scroll effect + auto close
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // ✅ Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isMobileMenuOpen) return;
      const target = e.target as HTMLElement;
      if (!target.closest("header")) setIsMobileMenuOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "OUR FLEET", href: "/fleet" },
    { name: "PRICING", href: "/pricing" },
    { name: "GET QUOTE", href: "/quote" },
    { name: "CONTACT", href: "/contact" },
  ];

  const getNavLinkClass = (itemName: string) => {
    const isActive =
      activeSection === itemName ||
      (activeSection === "PRICING" && itemName === "PRICING") ||
      (activeSection === "QUOTE" && itemName === "GET QUOTE") ||
      (activeSection === "HOME" && itemName === "HOME");

    return `transition-colors ${
      isActive
        ? "text-primary border-b-2 border-primary"
        : "text-white hover:text-primary"
    }`;
  };

  // ✅ Defaults / CMS values
  const displayPhone = settings?.phoneNumber || "+44 (0) 203 858 786";
  const displayPhoneRaw = settings?.phoneNumberRaw || "+442038587786";
  const keystoneUrl =
    process.env.NEXT_PUBLIC_KEYSTONE_URL || "http://localhost:5000";
  const logoUrl = settings?.logo?.url
    ? settings.logo.url.startsWith("http")
      ? settings.logo.url
      : `${keystoneUrl}${settings.logo.url}`
    : logo;
  const isExternalLogo = typeof logoUrl === "string";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* ✅ Logo + Navigation Row */}
        <div className="flex items-center justify-between pb-4">
          {/* Logo */}
          <div className="flex items-center mt-[5px] lg:mt-0">
            <div onClick={() => router.push("/")} className="cursor-pointer">
              {loading ? (
                <div className="w-[200px] md:w-[280px] h-[95px] bg-gray-700 animate-pulse rounded" />
              ) : (
                <Image
                  src={logoUrl as any}
                  alt={settings?.siteName || "GoldStar Logo"}
                  width={280}
                  height={95}
                  priority
                  className="max-w-[200px] md:max-w-[280px] xl:mt-6 h-auto"
                  
                  unoptimized={isExternalLogo}
                />
              )}
            </div>
          </div>

          {/* Phone + Navigation */}
          <div className="flex flex-col items-end gap-4">
            {/* Phone number */}
            {loading ? (
              <div className="hidden md:block w-48 h-6 bg-gray-700 animate-pulse rounded" />
            ) : (
              <a
                href={`tel:${displayPhoneRaw}`}
                className="hidden md:flex items-center text-white text-base xl:text-lg font-light hover:text-primary transition-colors cursor-pointer"
              >
                <Image src={contactIcon} alt="contact" className="mr-2" />
                {displayPhone}
              </a>
            )}

            {/* Navigation */}
            <div className="flex items-center gap-4">
              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center text-base font-light xl:text-base space-x-8">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={getNavLinkClass(item.name)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white hover:text-primary transition-colors p-2 cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <div className="relative">
                    <X className="w-6 h-6" />
                    {/* Pointer arrow */}
                    <div className="absolute -bottom-[33px] right-2 bg-black/95 z-10 w-4 h-4 border-l border-t border-white/10 rotate-45"></div>

                    {/* Dropdown */}
                    <div className="lg:hidden absolute right-0 top-12 w-54 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl overflow-hidden">
                      <nav className="relative bg-black/95 p-3">
                        <div className="flex flex-col">
                          {navigationItems.map((item, index) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={`text-white hover:text-primary hover:bg-white/5 transition-all duration-200 py-3 rounded-md font-medium text-sm tracking-wide ${
                                index < navigationItems.length - 1
                                  ? "border-b border-white/5"
                                  : ""
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
