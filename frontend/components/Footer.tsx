import Link from "next/link";
import { Mail, Phone, MapPin, ShieldAlert, Award, Globe, Star, Trophy, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#090b0e] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-['Orbitron'] font-black text-2xl tracking-wider text-white">
              EUPHORIA<span className="text-[#39FF14]">SPORTZ</span>
            </span>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              A premium 14,000-square-foot multi-purpose sports arena in Virar West. Recognized as the largest turf in the Vasai-Virar region, it features a synthetic artificial grass surface with three pitches suitable for Box Cricket, Football, and tournaments.
            </p>
            <div className="flex gap-4 items-center pt-2">
              <span className="text-xs font-semibold px-2 py-1 rounded bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/20">FIFA-Grade</span>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20">Tension Netting</span>
            </div>
          </div>

          {/* Quick Contact & Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest text-white uppercase font-['Orbitron']">The Location</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#39FF14] shrink-0 mt-1" />
                <span>Jyoti, Dhobi Talav, Agashi, Virar West, Patilgaon, Maharashtra 401302</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFD700]" />
                <span>+91 98500 16911 / +91 88980 00886</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#39FF14]" />
                <span>book@euphoriasportz.com</span>
              </li>
            </ul>
          </div>

          {/* Verified Directories / Listings */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest text-white uppercase font-['Orbitron']">Verified Listings</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                <a href="https://www.instagram.com/euphoriasportz/" target="_blank" rel="noopener noreferrer" className="hover:text-[#39FF14] transition-colors">
                  Instagram Profile
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                <a href="https://www.justdial.com/Palghar/Euphoria-Sportz-Turf-Virar-West/022PXX22-XX22-220310103732-A9D9_BZDET" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors">
                  Justdial Business Listing
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                <a href="https://www.justdial.com/Palghar/Euphoria-Sportz-Turf-Virar-West/022PXX22-XX22-220310103732-A9D9_BZDET/reviews" target="_blank" rel="noopener noreferrer" className="hover:text-[#39FF14] transition-colors">
                  Justdial Reviews Hub
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                <a href="https://cricheroes.com/cricket-ground-detail/380619/virar/euphoria-turf-arnala" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors">
                  CricHeroes Match Portal
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                <a href="https://www.playspots.in/sports-venues/palghar/sports-complexes-in-palghar/" target="_blank" rel="noopener noreferrer" className="hover:text-[#39FF14] transition-colors">
                  Playspots Catalog
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#FFD700] shrink-0" />
                <a href="https://www.trip.com/travel-guide/attraction/virar/euphoria-sportz-turf-147474310/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD700] transition-colors">
                  Trip.com Attraction Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Rules Summary */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest text-white uppercase font-['Orbitron']">Arena Rules</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-[#FFD700] shrink-0 mt-0.5" />
                <span>Non-studded sports shoes recommended. No spiked boots.</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#39FF14] shrink-0 mt-0.5" />
                <span>3 Pitches available for box cricket and large football games.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} EuphoriaSportz. All rights reserved. All reservations synced in real-time.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/book" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
