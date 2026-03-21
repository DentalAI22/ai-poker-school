import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-02-25.clover',
    });
  }
  return _stripe;
}

// Keep backward compat — stripe may be null if no key
export const stripe = typeof process !== 'undefined' && process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2026-02-25.clover' })
  : (null as unknown as Stripe);

// Price IDs — set these after creating products in Stripe Dashboard
export const STRIPE_PRICES = {
  PRO_MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || '',
  PRO_YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID || '',
};

export const STRIPE_CONFIG = {
  successUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aipokerschool.com'}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`,
  cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aipokerschool.com'}/pricing?canceled=true`,
  portalReturnUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aipokerschool.com'}/dashboard`,
};
