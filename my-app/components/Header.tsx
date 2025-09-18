"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "../public/Logo.svg";
import contact from "../public/assets1/contact.png";

interface HeaderProps {
  activeSection?: string;
}

export default function Header({ activeSection = "" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Close mobile menu on scroll
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest("header")) {
          setIsMobileMenuOpen(false);
        }
      }
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Logo and Navigation - Bottom Row */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="GoldStar Logo"
              width={280}
              height={95}
              priority
              className="max-w-[200px] md:max-w-[280px] xl:mt-6 h-auto"
            />
          </div>
          <div className="flex flex-col items-end gap-4">
            <a
              href="tel:+442038587786"
              className="hidden md:flex items-center text-white text-base xl:text-lg font-light hover:text-primary transition-colors cursor-pointer"
            >
              <Image src={contact} alt="contact" className="mr-2" />
              +44 (0) 203 858 786
            </a>
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
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

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white hover:text-primary transition-colors p-2"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <div className="relative">
                    <X className="w-6 h-6" />
                    <div className="absolute -bottom-[33px] right-2 bg-black/95 z-10 w-4 h-4 bg-border border-l border-t border-white/10 rotate-45"></div>
                    <div className="lg:hidden absolute right-0 top-12 w-54 bg-black/95 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl overflow-hidden">
                      {/* Pointer Arrow */}

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
