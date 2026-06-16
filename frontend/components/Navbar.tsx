"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Layers, Activity } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#060709]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-[#39FF14] to-[#FFD700] p-[2px] shadow-[0_0_15px_rgba(57,255,20,0.2)]">
            <div className="w-full h-full bg-[#060709] rounded-[6px] flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#39FF14] group-hover:text-[#FFD700] transition-colors duration-300" />
            </div>
          </div>
          <span className="font-['Orbitron'] font-black text-xl tracking-wider text-white">
            EUPHORIA<span className="text-[#39FF14] group-hover:text-[#FFD700] transition-colors duration-300">SPORTZ</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={`text-sm font-semibold tracking-wide hover:text-white transition-colors relative py-1 ${
              pathname === "/" ? "text-[#39FF14]" : "text-gray-400"
            }`}
          >
            THE ARENA
            {pathname === "/" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#39FF14] rounded shadow-[0_0_8px_#39FF14]" />
            )}
          </Link>
          <Link 
            href="/#features" 
            className="text-sm font-semibold tracking-wide text-gray-400 hover:text-white transition-colors"
          >
            SPECIFICATIONS
          </Link>
          <Link 
            href="/#dimensions" 
            className="text-sm font-semibold tracking-wide text-gray-400 hover:text-white transition-colors"
          >
            DIMENSIONS
          </Link>
          <Link 
            href="/book" 
            className={`text-sm font-semibold tracking-wide hover:text-white transition-colors relative py-1 ${
              pathname === "/book" ? "text-[#FFD700]" : "text-gray-400"
            }`}
          >
            SCHEDULER
            {pathname === "/book" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD700] rounded shadow-[0_0_8px_#FFD700]" />
            )}
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/book"
            className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-black transition-all duration-300 ease-out bg-gradient-to-r from-[#39FF14] to-[#FFD700] rounded-lg shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105 active:scale-95"
          >
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm font-bold uppercase tracking-wider">Book Arena</span>
          </Link>
        </div>

      </div>
    </header>
  );
}
