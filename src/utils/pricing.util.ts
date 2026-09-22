export interface GroupPricingTier {
  minTravelers: number;
  maxTravelers: number;
  pricePerPerson: number;
}

export interface PricingResult {
  pricePerPerson: number;
  totalPrice: number;
  applicableTier: GroupPricingTier | null;
}

/**
 * Validates group pricing tiers according to the required business rules:
 * - minTravelers must be >= 1
 * - maxTravelers must be >= minTravelers
 * - pricePerPerson must be > 0
 * - Continuous coverage: First tier must start at 1, subsequent tiers must start at previousTier.maxTravelers + 1
 * - No overlaps or duplicate ranges
 * - If groupPricingEnabled is true, at least one valid tier is required
 */
export function validateGroupPricingTiers(
  tiers?: GroupPricingTier[] | null,
  enabled?: boolean,
): { valid: boolean; error?: string } {
  if (!enabled) {
    return { valid: true };
  }

  if (!tiers || !Array.isArray(tiers) || tiers.length === 0) {
    return {
      valid: false,
      error: 'Group pricing is enabled, but no pricing tiers were provided.',
    };
  }

  // Clone and sort tiers by minTravelers ascending
  const sorted = [...tiers].sort((a, b) => Number(a.minTravelers) - Number(b.minTravelers));

  // Check each tier values
  for (let i = 0; i < sorted.length; i++) {
    const tier = sorted[i];
    const min = Number(tier.minTravelers);
    const max = Number(tier.maxTravelers);
    const price = Number(tier.pricePerPerson);

    if (!Number.isInteger(min) || min < 1) {
      return {
        valid: false,
        error: `Tier ${i + 1}: Minimum travelers must be an integer of at least 1.`,
      };
    }

    if (!Number.isInteger(max) || max < min) {
      return {
        valid: false,
        error: `Tier ${i + 1}: Maximum travelers (${max}) must be greater than or equal to minimum travelers (${min}).`,
      };
    }

    if (isNaN(price) || price <= 0) {
      return {
        valid: false,
        error: `Tier ${i + 1}: Price per person must be greater than 0.`,
      };
    }
  }

  // Coverage rule: First tier must start at 1
  if (Number(sorted[0].minTravelers) !== 1) {
    return {
      valid: false,
      error: `The first pricing tier must start at 1 traveler (currently starts at ${sorted[0].minTravelers}).`,
    };
  }

  // Check for duplicate ranges, overlaps, and gaps
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    const prevMin = Number(prev.minTravelers);
    const prevMax = Number(prev.maxTravelers);
    const currMin = Number(curr.minTravelers);
    const currMax = Number(curr.maxTravelers);

    if (prevMin === currMin && prevMax === currMax) {
      return {
        valid: false,
        error: `Duplicate pricing range detected: [${currMin}–${currMax}].`,
      };
    }

    if (currMin <= prevMax) {
      return {
        valid: false,
        error: `Overlapping pricing tiers detected: [${prevMin}–${prevMax}] and [${currMin}–${currMax}]. Ranges must not overlap.`,
      };
    }

    if (currMin > prevMax + 1) {
      return {
        valid: false,
        error: `Gap in pricing coverage detected between [${prevMin}–${prevMax}] and [${currMin}–${currMax}]. Tiers must provide continuous coverage.`,
      };
    }
  }

  return { valid: true };
}

/**
 * Calculates the applicable per-person price and total amount based on the stored product configuration.
 * Never trust a frontend-provided price.
 */
export function calculateApplicablePrice(
  product: {
    priceUSD: number;
    groupPricingEnabled?: boolean;
    groupPricing?: GroupPricingTier[] | null;
  },
  travelerCount: number,
): PricingResult {
  const count = Number(travelerCount);
  if (isNaN(count) || count < 1) {
    throw new Error('Traveler count must be at least 1.');
  }

  const basePrice = Number(product.priceUSD) || 0;

  // If group pricing is disabled or has no tiers, use standard base price
  if (!product.groupPricingEnabled || !product.groupPricing || product.groupPricing.length === 0) {
    return {
      pricePerPerson: basePrice,
      totalPrice: Math.round(basePrice * count),
      applicableTier: null,
    };
  }

  const sorted = [...product.groupPricing].sort(
    (a, b) => Number(a.minTravelers) - Number(b.minTravelers),
  );

  const matchedTier = sorted.find(
    (t) => count >= Number(t.minTravelers) && count <= Number(t.maxTravelers),
  );

  if (!matchedTier) {
    const minConfigured = Number(sorted[0].minTravelers);
    const maxConfigured = Number(sorted[sorted.length - 1].maxTravelers);
    throw new Error(
      `Group pricing is configured for ${minConfigured} to ${maxConfigured} travelers. Direct booking is not available for ${count} travelers. Please send an inquiry for custom group arrangements.`,
    );
  }

  const unitPrice = Number(matchedTier.pricePerPerson);
  return {
    pricePerPerson: unitPrice,
    totalPrice: Math.round(unitPrice * count),
    applicableTier: matchedTier,
  };
}
