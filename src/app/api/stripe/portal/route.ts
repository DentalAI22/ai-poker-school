import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_CONFIG } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { customerId } = await req.json();

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured yet.' },
        { status: 503 }
      );
    }

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID required' },
        { status: 400 }
      );
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: STRIPE_CONFIG.portalReturnUrl,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error('Stripe portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
