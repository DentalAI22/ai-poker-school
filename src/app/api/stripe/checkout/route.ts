import { NextRequest, NextResponse } from 'next/server';
import { getStripe, STRIPE_PRICES, STRIPE_CONFIG } from '@/lib/stripe';
import type Stripe from 'stripe';

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json();

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured yet. Coming soon!' },
        { status: 503 }
      );
    }

    const priceId = plan === 'yearly' ? STRIPE_PRICES.PRO_YEARLY : STRIPE_PRICES.PRO_MONTHLY;

    if (!priceId) {
      return NextResponse.json(
        { error: 'Stripe price not configured. Set STRIPE_PRO_MONTHLY_PRICE_ID and STRIPE_PRO_YEARLY_PRICE_ID.' },
        { status: 503 }
      );
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: STRIPE_CONFIG.successUrl,
      cancel_url: STRIPE_CONFIG.cancelUrl,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        plan: plan || 'monthly',
      },
    };

    if (email) {
      sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
