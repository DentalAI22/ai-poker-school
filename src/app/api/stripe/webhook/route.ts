import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { createServerClient } from '@/lib/supabase';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

async function updateUserSubscription(
  email: string | null,
  stripeCustomerId: string,
  tier: string,
  expiresAt: Date | null
) {
  if (!email) return;
  const supabase = createServerClient();

  // Find user by email
  const { data: user } = await supabase
    .from('poker_users')
    .select('id')
    .eq('email', email)
    .single();

  if (user) {
    await supabase
      .from('poker_users')
      .update({
        subscription_tier: tier,
        subscription_expires_at: expiresAt?.toISOString() || null,
        stripe_customer_id: stripeCustomerId,
      })
      .eq('id', user.id);
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('✅ Checkout completed:', {
          customer: session.customer,
          email: session.customer_email,
          subscription: session.subscription,
        });

        // Get subscription details for expiry date
        let expiresAt: Date | null = null;
        if (session.subscription) {
          const subResponse = await stripe.subscriptions.retrieve(session.subscription as string);
          const sub = subResponse as unknown as { current_period_end: number };
          expiresAt = new Date(sub.current_period_end * 1000);
        }

        await updateUserSubscription(
          session.customer_email || session.customer_details?.email || null,
          session.customer as string,
          'pro',
          expiresAt
        );
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('📝 Subscription updated:', {
          customer: subscription.customer,
          status: subscription.status,
        });

        // Get customer email
        const customerResponse = await stripe.customers.retrieve(subscription.customer as string);
        const customer = customerResponse as unknown as { deleted?: boolean; email: string | null };
        if (customer && !customer.deleted) {
          const sub = subscription as unknown as { status: string; current_period_end: number; customer: string };
          const tier = sub.status === 'active' ? 'pro' : 'free';
          const expiresAt = new Date(sub.current_period_end * 1000);
          await updateUserSubscription(
            customer.email,
            sub.customer as string,
            tier,
            expiresAt
          );
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('❌ Subscription canceled:', {
          customer: subscription.customer,
        });

        const delCustomerResponse = await stripe.customers.retrieve(subscription.customer as string);
        const delCustomer = delCustomerResponse as unknown as { deleted?: boolean; email: string | null };
        if (delCustomer && !delCustomer.deleted) {
          await updateUserSubscription(
            delCustomer.email,
            subscription.customer as string,
            'free',
            null
          );
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('⚠️ Payment failed:', {
          customer: invoice.customer,
          amount: invoice.amount_due,
        });
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
