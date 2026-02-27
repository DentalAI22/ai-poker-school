'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, X } from 'lucide-react';

interface PricingCardProps {
  tier: 'free' | 'pro';
  features: string[];
  price?: number;
  yearlyPrice?: number;
  highlighted?: boolean;
  ctaText: string;
  ctaHref: string;
}

export default function PricingCard({
  tier,
  features,
  price = 0,
  yearlyPrice,
  highlighted = false,
  ctaText,
  ctaHref,
}: PricingCardProps) {
  const isPro = tier === 'pro';
  const monthlySavings =
    yearlyPrice !== undefined ? Math.round(price - yearlyPrice / 12) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-2xl p-[1px] ${
        highlighted || isPro
          ? 'bg-gradient-to-b from-gold via-gold-dark to-gold/20'
          : 'bg-card-border'
      }`}
    >
      {/* Most Popular badge */}
      {isPro && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className="px-4 py-1 rounded-full bg-gradient-to-r from-gold to-gold-dark text-dark-bg text-xs font-bold uppercase tracking-wider">
            Most Popular
          </span>
        </div>
      )}

      <div className="rounded-2xl bg-card-bg p-8 h-full flex flex-col">
        {/* Tier name */}
        <h3
          className={`text-lg font-semibold mb-2 ${
            isPro ? 'text-gold' : 'text-white'
          }`}
        >
          {tier === 'free' ? 'Free' : 'Pro'}
        </h3>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">
              ${price}
            </span>
            {price > 0 && (
              <span className="text-gray-500 text-sm">/month</span>
            )}
          </div>

          {/* Yearly price with savings */}
          {yearlyPrice !== undefined && yearlyPrice > 0 && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm text-gray-400">
                ${yearlyPrice}/year
              </span>
              {monthlySavings !== null && monthlySavings > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-felt/20 text-felt-light font-medium">
                  Save ${monthlySavings}/mo
                </span>
              )}
            </div>
          )}
        </div>

        {/* Feature list */}
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, i) => {
            const isExcluded = feature.startsWith('~');
            const label = isExcluded ? feature.slice(1) : feature;

            return (
              <li key={i} className="flex items-start gap-3">
                {isExcluded ? (
                  <X className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <Check className="w-4 h-4 text-felt-light mt-0.5 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${
                    isExcluded ? 'text-gray-600' : 'text-gray-300'
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ul>

        {/* CTA button */}
        <Link
          href={ctaHref}
          className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
            isPro
              ? 'bg-gradient-to-r from-gold to-gold-dark text-dark-bg hover:shadow-lg hover:shadow-gold/20'
              : 'border border-white/10 text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          {ctaText}
        </Link>
      </div>
    </motion.div>
  );
}
