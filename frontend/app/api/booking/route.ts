import { NextResponse } from "next/server";

// Simple API handler that simulates edge processing
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { date, slot, sport, name, phone, email, pricePaid } = body;

    // Validate inputs
    if (!date || !slot || !sport || !name || !phone || !email) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    console.log(`[API EDGE HANDLER] Incoming Reservation Request:`, {
      date,
      slot,
      sport,
      name,
      phone,
      email,
      pricePaid
    });

    // Simulate database lookup & insertion latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulate background automation pipeline (Google Apps Script Webhook)
    // In a live environment, this would call:
    // fetch('https://script.google.com/macros/s/.../exec', { method: 'POST', body: ... })
    console.log(`[API EDGE HANDLER] Triggered Google Sheets ledger sync and automated confirmation email dispatch via Apps Script.`);

    return NextResponse.json({
      success: true,
      booking: {
        id: 'book_api_' + Math.random().toString(36).substring(2, 9),
        date,
        slot,
        sport,
        name,
        pricePaid,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
