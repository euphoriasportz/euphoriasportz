export interface SportConfig {
  id: string;
  name: string;
  emoji: string;
  primaryColor: string; // Tailwind color or hex
  accentColor: string;  // Secondary color
  tagline: string;
  basePrice: number;    // per hour
  peakMultiplier: number;
  dimensions: string;
  capacity: string;
  amenities: string[];
  rules: string[];
  courtLines: {
    boundary: string; // SVG path or style representation
    innerMarkings: string;
    specialZones: string[];
  };
}

export const sportConfigs: Record<string, SportConfig> = {
  football: {
    id: 'football',
    name: 'Football Mode',
    emoji: '⚽',
    primaryColor: '#39FF14', // Electric Neon Green
    accentColor: '#1A5F0C',
    tagline: 'FIFA-grade synthetic turf with high-rebound side-walls.',
    basePrice: 1500, // INR per hour
    peakMultiplier: 1.3,
    dimensions: '120ft x 80ft (7-v-7 or 6-v-6)',
    capacity: '12-14 Players Max',
    amenities: [
      'FIFA-certified synthetic grass',
      'Heavy-duty surrounding netting',
      'Professional goals & nets',
      'Premium stadium floodlights',
      'Rain-proof sub-base drainage'
    ],
    rules: [
      'Strictly flat turf shoes or studs (No metal studs allowed)',
      'Booking includes bibs and a professional match ball',
      'Standard 60-minute slots (Please vacate 5 mins early for transitions)'
    ],
    courtLines: {
      boundary: 'M 10,10 L 190,10 L 190,110 L 10,110 Z',
      innerMarkings: 'M 100,10 L 100,110 M 100,60 m -20,0 a 20,20 0 1,0 40,0 a 20,20 0 1,0 -40,0',
      specialZones: [
        // Penalty areas
        'M 10,35 L 30,35 L 30,85 L 10,85',
        'M 190,35 L 170,35 L 170,85 L 190,85'
      ]
    }
  },
  cricket: {
    id: 'cricket',
    name: 'Box Cricket Mode',
    emoji: '🏏',
    primaryColor: '#FFD700', // Cyber Yellow
    accentColor: '#5F5000',
    tagline: 'High-density pitch turf with ceiling-tension nets.',
    basePrice: 1200, // INR per hour
    peakMultiplier: 1.25,
    dimensions: '100ft x 60ft (Box format)',
    capacity: '10-12 Players Max',
    amenities: [
      'High-impact rebound mats',
      'Tension overhead netting for roof shots',
      'Automated bowling machine support',
      'Cricket bats & high-visibility balls provided',
      'Digital scoreboards'
    ],
    rules: [
      'Only soft tennis balls are allowed (No leather balls)',
      'Overhead shots touching the ceiling net are declared out',
      'Transitions require 5 mins to lock the cricket pitch mat'
    ],
    courtLines: {
      boundary: 'M 20,20 L 180,20 L 180,100 L 20,100 Z',
      innerMarkings: 'M 60,60 L 140,60 M 70,40 L 70,80 M 130,40 L 130,80', // Wickets & Crease lines
      specialZones: [
        'M 60,40 L 60,80', // Bowler crease
        'M 140,40 L 140,80' // Batter crease
      ]
    }
  },
  basketball: {
    id: 'basketball',
    name: 'Box Hoop Mode',
    emoji: '🏀',
    primaryColor: '#FFA500', // Neon Orange/Yellow
    accentColor: '#7F3F00',
    tagline: 'Shock-absorbing underlay with adjustable hoop systems.',
    basePrice: 1000, // INR per hour
    peakMultiplier: 1.2,
    dimensions: '94ft x 50ft (Standard Box Court)',
    capacity: '8-10 Players Max',
    amenities: [
      'High-grip multi-sport flooring',
      'Professional adjustable glass backboards',
      'Full perimeter cage protection',
      'Comfortable spectator seating',
      'Water dispensers & cooling fans'
    ],
    rules: [
      'Non-marking basketball shoes only',
      'No hanging on the rims or nets',
      'Dribbling matches allowed inside the cage walls'
    ],
    courtLines: {
      boundary: 'M 15,15 L 185,15 L 185,105 L 15,105 Z',
      innerMarkings: 'M 100,15 L 100,105 M 100,60 m -15,0 a 15,15 0 1,0 30,0 a 15,15 0 1,0 -30,0',
      specialZones: [
        // Three-point arcs
        'M 15,30 A 35,35 0 0,1 15,90',
        'M 185,30 A 35,35 0 0,0 185,90',
        // Keys
        'M 15,45 L 45,45 L 45,75 L 15,75',
        'M 185,45 L 155,45 L 155,75 L 185,75'
      ]
    }
  }
};
