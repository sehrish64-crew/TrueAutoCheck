import { NextResponse } from 'next/server';
import { insertReview, getAllReviews } from '@/lib/database';

export async function GET() {
  try {
    const reviews = await getAllReviews();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, rating, comment } = body;

    console.log('Received review submission:', { name, email, rating, comment });

    if (!name || !email || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const review = await insertReview({ name, email, rating, comment });
    console.log('Review created successfully:', review);

    // Notify admin about new review
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'review_notification',
          reviewId: review.id,
          name: review.name,
          email: review.email,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.created_at,
        }),
      })

      try {
        const json = await resp.json()
        if (!resp.ok || json?.success === false) {
          console.error('Review notification email failed:', resp.status, json)
        }
      } catch (e) {
        const text = await resp.text().catch(() => null)
        console.error('Failed to parse send-email response for review_notification:', resp.status, text)
      }
    } catch (err) {
      console.error('Failed to send review notification:', err)
    }

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create review';
    return NextResponse.json(
      { error: errorMessage, details: error },
      { status: 500 }
    );
  }
}
