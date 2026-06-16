"use client";

import { useEffect, useState } from "react";
import { sportConfigs } from "@/utils/sportConfigs";

interface InteractiveArenaProps {
  currentSportId: string;
}

export default function InteractiveArena({ currentSportId }: InteractiveArenaProps) {
  const [activeConfig, setActiveConfig] = useState(sportConfigs.football);

  useEffect(() => {
    if (sportConfigs[currentSportId]) {
      setActiveConfig(sportConfigs[currentSportId]);
    }
  }, [currentSportId]);

  return (
    <div className="relative w-full max-w-3xl mx-auto glass-panel rounded-2xl overflow-hidden p-6 border border-white/10 shadow-2xl">
      
      {/* HUD Bar */}
      <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: activeConfig.primaryColor }} />
          <span className="font-['Orbitron'] text-xs font-bold text-gray-400 tracking-widest uppercase">
            Active Layout: {activeConfig.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500 font-medium">Court Scale: {activeConfig.dimensions}</span>
        </div>
      </div>

      {/* SVG Arena Display */}
      <div className="relative aspect-[16/10] bg-[#0c0d10] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-2">
        
        {/* Grass Texture Overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Arena boundary guides */}
        <svg 
          viewBox="0 0 200 120" 
          className="w-full h-full relative z-10 transition-all duration-700 ease-in-out"
        >
          {/* Base Chassis Outline */}
          <rect 
            x="5" 
            y="5" 
            width="190" 
            height="110" 
            rx="4" 
            fill="none" 
            stroke="#1d2127" 
            strokeWidth="1.5" 
            strokeDasharray="4,2" 
          />

          {/* ==================== FOOTBALL LINES ==================== */}
          <g className="transition-opacity duration-700" style={{ opacity: currentSportId === 'football' ? 1 : 0.05 }}>
            {/* Outlines */}
            <path
              d={sportConfigs.football.courtLines.boundary}
              fill="none"
              stroke="#39FF14"
              strokeWidth={currentSportId === 'football' ? "1.5" : "0.5"}
              className="transition-all duration-700"
            />
            {/* Center Circle & Line */}
            <path
              d={sportConfigs.football.courtLines.innerMarkings}
              fill="none"
              stroke="#39FF14"
              strokeWidth={currentSportId === 'football' ? "1.2" : "0.5"}
              className="transition-all duration-700"
            />
            {/* Goal Areas */}
            {sportConfigs.football.courtLines.specialZones.map((path, idx) => (
              <path
                key={`fb-zone-${idx}`}
                d={path}
                fill="none"
                stroke="#39FF14"
                strokeWidth={currentSportId === 'football' ? "1" : "0.5"}
                className="transition-all duration-700"
              />
            ))}
            {/* Goal Posts */}
            <rect x="1" y="47" width="9" height="26" fill="none" stroke="#39FF14" strokeWidth="1" opacity={currentSportId === 'football' ? 0.8 : 0.1} />
            <rect x="190" y="47" width="9" height="26" fill="none" stroke="#39FF14" strokeWidth="1" opacity={currentSportId === 'football' ? 0.8 : 0.1} />
          </g>

          {/* ==================== CRICKET LINES ==================== */}
          <g className="transition-opacity duration-700" style={{ opacity: currentSportId === 'cricket' ? 1 : 0.05 }}>
            {/* Boundary */}
            <path
              d={sportConfigs.cricket.courtLines.boundary}
              fill="none"
              stroke="#FFD700"
              strokeWidth={currentSportId === 'cricket' ? "1.5" : "0.5"}
              className="transition-all duration-700"
            />
            {/* Pitch Mat */}
            <rect 
              x="65" 
              y="45" 
              width="70" 
              height="30" 
              fill={currentSportId === 'cricket' ? "#FFD70015" : "none"} 
              stroke="#FFD700" 
              strokeWidth="0.8" 
              className="transition-all duration-700"
            />
            {/* Stumps Lines */}
            <path
              d={sportConfigs.cricket.courtLines.innerMarkings}
              fill="none"
              stroke="#FFD700"
              strokeWidth={currentSportId === 'cricket' ? "1.2" : "0.5"}
              className="transition-all duration-700"
            />
            {/* Bowling and Batting creases */}
            {sportConfigs.cricket.courtLines.specialZones.map((path, idx) => (
              <path
                key={`cr-zone-${idx}`}
                d={path}
                fill="none"
                stroke="#FFD700"
                strokeWidth={currentSportId === 'cricket' ? "1.2" : "0.5"}
                className="transition-all duration-700"
              />
            ))}
          </g>

          {/* ==================== BASKETBALL LINES ==================== */}
          <g className="transition-opacity duration-700" style={{ opacity: currentSportId === 'basketball' ? 1 : 0.05 }}>
            {/* Boundary */}
            <path
              d={sportConfigs.basketball.courtLines.boundary}
              fill="none"
              stroke="#FFA500"
              strokeWidth={currentSportId === 'basketball' ? "1.5" : "0.5"}
              className="transition-all duration-700"
            />
            {/* Center court */}
            <path
              d={sportConfigs.basketball.courtLines.innerMarkings}
              fill="none"
              stroke="#FFA500"
              strokeWidth={currentSportId === 'basketball' ? "1.2" : "0.5"}
              className="transition-all duration-700"
            />
            {/* Keys & 3-point arcs */}
            {sportConfigs.basketball.courtLines.specialZones.map((path, idx) => (
              <path
                key={`bb-zone-${idx}`}
                d={path}
                fill="none"
                stroke="#FFA500"
                strokeWidth={currentSportId === 'basketball' ? "1.2" : "0.5"}
                className="transition-all duration-700"
              />
            ))}
            {/* Hoops */}
            <circle cx="23" cy="60" r="3" fill="none" stroke="#FFA500" strokeWidth="1" opacity={currentSportId === 'basketball' ? 0.9 : 0.1} />
            <circle cx="177" cy="60" r="3" fill="none" stroke="#FFA500" strokeWidth="1" opacity={currentSportId === 'basketball' ? 0.9 : 0.1} />
          </g>

        </svg>

        {/* Physical Netting Indicator */}
        <div className="absolute inset-y-0 left-2 w-1 border-r border-dashed border-white/20 z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-2 w-1 border-l border-dashed border-white/20 z-20 pointer-events-none" />
        
        {/* Mode Info Overlay */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/85 border border-white/10 rounded-lg px-4 py-2">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-['Orbitron']">Specifications</p>
          <p className="text-xs text-gray-200 mt-0.5">{activeConfig.tagline}</p>
        </div>
      </div>
    </div>
  );
}
