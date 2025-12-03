import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if already subscribed
    const existing = await db.collection('subscribers').findOne({ email });

    if (existing) {
      return NextResponse.json(
        { message: 'Already subscribed' },
        { status: 200 }
      );
    }

    // Store subscriber
    const result = await db.collection('subscribers').insertOne({
      email,
      subscribedAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Subscription saved', id: result.insertedId },
      { status: 200 }
    );

  } catch (error) {
    console.error('Subscription DB error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
