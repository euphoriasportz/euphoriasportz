"use client";

import { sportConfigs } from "@/utils/sportConfigs";
import { Trophy, Swords, Target } from "lucide-react";

interface SportToggleProps {
  currentSportId: string;
  onSportChange: (sportId: string) => void;
}

const sportIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  football: Trophy,
  cricket: Swords,
  basketball: Target,
};

export default function SportToggle({ currentSportId, onSportChange }: SportToggleProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-1.5 rounded-xl bg-white/5 border border-white/10 max-w-2xl mx-auto">
      {Object.values(sportConfigs).map((sport) => {
        const isActive = sport.id === currentSportId;
        const color = sport.primaryColor;
        const Icon = sportIcons[sport.id] || Trophy;
        
        return (
          <button
            key={sport.id}
            onClick={() => onSportChange(sport.id)}
            style={{
              borderColor: isActive ? color : "transparent",
              color: isActive ? "#ffffff" : "#9ca3af",
              boxShadow: isActive ? `0 0 15px ${color}33` : "none",
            }}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-lg font-['Orbitron'] font-bold text-sm tracking-wide uppercase transition-all duration-300 border hover:bg-white/5 ${
              isActive 
                ? "bg-white/10" 
                : "bg-transparent border-transparent"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{sport.name.split(" ")[0]}</span>
            {isActive && (
              <span 
                className="w-1.5 h-1.5 rounded-full animate-ping"
                style={{ backgroundColor: color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
