import { NextRequest, NextResponse } from 'next/server';
import { sheets } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const { service, date, time, name, phone, email, notes } =
      await request.json();

    // Basic validation
    if (!service || !date || !time || !name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Append to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          service,
          date,
          time,
          name,
          phone,
          email,
          notes || '',
          new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "medium",
              timeStyle: "medium",
            }),
        ]],
      },
    });

    return NextResponse.json(
      { message: 'Booking saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Google Sheet Error:', error);
    return NextResponse.json(
      { error: 'Failed to save booking' },
      { status: 500 }
    );
  }
}
