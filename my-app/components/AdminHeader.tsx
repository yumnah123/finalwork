"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import logo from "../public/Logo.svg";
import { signOut } from "next-auth/react"; 
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
    const router = useRouter();


  const { data: session } = useSession();
  const role = (session?.user as any)?.role;
 


  // Logout function using NextAuth
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/admin/login", 
        redirect: true,             
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 shadow-lg z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Image
            src={logo}
            alt="GoldStar Logo"
            width={130}
            height={100}
            priority
            className="max-w-[200px] md:max-w-[280px] xl:mt-3 h-auto"
          />
          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 border border-slate-700 hover:border-slate-600 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-slate-200 font-medium text-sm hidden sm:block">
                Admin
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
{isDropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-800 border border-slate-700 shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
    
    {role === "superadmin" && (
      <button
        onClick={() => router.push("/admin/add-admin")}
        className="w-full flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-slate-700 transition-colors duration-150 text-left cursor-pointer"
      >
        <User className="w-4 h-4 text-amber-400" />
        <span className="font-medium">Add Admin</span>
      </button>
    )}

    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 text-slate-200 hover:bg-slate-700 transition-colors duration-150 text-left cursor-pointer"
    >
      <LogOut className="w-4 h-4 text-amber-400" />
      <span className="font-medium">Logout</span>
    </button>
  </div>
)}

          </div>
        </div>
      </div>
    </header>
  );
}
