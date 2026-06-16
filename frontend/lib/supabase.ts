// Mock database helper to simulate live bookings
export interface Booking {
  id: string;
  date: string; // YYYY-MM-DD
  slot: string; // "07:00", "08:00", etc.
  sport: string; // "football" | "cricket" | "basketball"
  name: string;
  phone: string;
  email: string;
  pricePaid: number;
  createdAt: string;
}

// Default mock bookings to populate the calendar (e.g. today and next few days)
const getInitialMockBookings = (): Booking[] => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  
  return [
    {
      id: 'mock-1',
      date: today,
      slot: '18:00',
      sport: 'football',
      name: 'Rahul Sharma',
      phone: '9876543210',
      email: 'rahul@example.com',
      pricePaid: 1950, // Football peak price (1500 * 1.3)
      createdAt: new Date().toISOString()
    },
    {
      id: 'mock-2',
      date: today,
      slot: '20:00',
      sport: 'cricket',
      name: 'Aditya Patel',
      phone: '9988776655',
      email: 'aditya@example.com',
      pricePaid: 1500, // Cricket peak price (1200 * 1.25)
      createdAt: new Date().toISOString()
    },
    {
      id: 'mock-3',
      date: tomorrow,
      slot: '19:00',
      sport: 'basketball',
      name: 'Karan Singh',
      phone: '9123456789',
      email: 'karan@example.com',
      pricePaid: 1200, // Basketball peak price (1000 * 1.2)
      createdAt: new Date().toISOString()
    }
  ];
};

class LocalDatabase {
  private key = 'euphoria_sportz_bookings';

  constructor() {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem(this.key)) {
        localStorage.setItem(this.key, JSON.stringify(getInitialMockBookings()));
      }
    }
  }

  private getBookings(): Booking[] {
    if (typeof window === 'undefined') {
      return getInitialMockBookings(); // SSR fallback
    }
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  private saveBookings(bookings: Booking[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.key, JSON.stringify(bookings));
    }
  }

  public getBookingsByDate(date: string): Booking[] {
    return this.getBookings().filter(b => b.date === date);
  }

  public createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): { success: boolean; error?: string; booking?: Booking } {
    const bookings = this.getBookings();
    
    // Double booking check: since there is only ONE physical convertible turf,
    // if a slot is booked for *any* sport, it blocks that slot for all sports.
    const isDoubleBooked = bookings.some(
      b => b.date === bookingData.date && b.slot === bookingData.slot
    );

    if (isDoubleBooked) {
      return { success: false, error: 'This time slot is already reserved for another arena setup.' };
    }

    const newBooking: Booking = {
      ...bookingData,
      id: 'book_' + Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    this.saveBookings(bookings);

    return { success: true, booking: newBooking };
  }
}

export const db = new LocalDatabase();
export const allAvailableSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export function isPeakHour(slot: string): boolean {
  // Peak hours are usually 17:00 (5 PM) onwards till 23:00 (11 PM)
  const hour = parseInt(slot.split(':')[0]);
  return hour >= 17 && hour <= 23;
}
