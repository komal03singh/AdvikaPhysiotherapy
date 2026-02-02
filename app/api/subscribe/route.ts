import { NextRequest, NextResponse } from "next/server";
import { sheets } from "@/lib/googleSheets";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Append to Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID_THREE!,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            email,
            new Date().toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "medium",
              timeStyle: "medium",
            }),
          ],
        ],
      },
    });

    return NextResponse.json(
      { message: "Subscription saved" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Subscription DB error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
