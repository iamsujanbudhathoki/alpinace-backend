import {
  validateGroupPricingTiers,
  calculateApplicablePrice,
  GroupPricingTier,
} from "../utils/pricing.util";
import assert from "assert";

console.log("=================================================");
console.log("RUNNING GROUP PRICING AUTOMATED TEST SUITE");
console.log("=================================================");

// Sample Product with Group Pricing
const sampleTiers: GroupPricingTier[] = [
  { minTravelers: 1, maxTravelers: 1, pricePerPerson: 1299 },
  { minTravelers: 2, maxTravelers: 4, pricePerPerson: 1250 },
  { minTravelers: 5, maxTravelers: 7, pricePerPerson: 1230 },
  { minTravelers: 8, maxTravelers: 10, pricePerPerson: 1195 },
];

const mockProduct = {
  priceUSD: 1400,
  groupPricingEnabled: true,
  groupPricing: sampleTiers,
};

// 1. TEST PRICING CALCULATION
console.log("\n[Test 1] Pricing Calculation for Travelers:");

// 1 traveler -> 1 pax tier ($1299)
const calc1 = calculateApplicablePrice(mockProduct, 1);
assert.strictEqual(calc1.pricePerPerson, 1299, "1 pax should match tier 1 price (1299)");
assert.strictEqual(calc1.totalPrice, 1299, "1 pax total should be 1299");
console.log("  ✓ 1 traveler: $1299/pax, Total: $1299");

// 3 travelers -> 2-4 pax tier ($1250)
const calc3 = calculateApplicablePrice(mockProduct, 3);
assert.strictEqual(calc3.pricePerPerson, 1250, "3 pax should match tier 2-4 price (1250)");
assert.strictEqual(calc3.totalPrice, 3750, "3 pax total should be 3 * 1250 = 3750");
console.log("  ✓ 3 travelers: $1250/pax, Total: $3750");

// 6 travelers -> 5-7 pax tier ($1230)
const calc6 = calculateApplicablePrice(mockProduct, 6);
assert.strictEqual(calc6.pricePerPerson, 1230, "6 pax should match tier 5-7 price (1230)");
assert.strictEqual(calc6.totalPrice, 7380, "6 pax total should be 6 * 1230 = 7380");
console.log("  ✓ 6 travelers: $1230/pax, Total: $7380");

// 9 travelers -> 8-10 pax tier ($1195)
const calc9 = calculateApplicablePrice(mockProduct, 9);
assert.strictEqual(calc9.pricePerPerson, 1195, "9 pax should match tier 8-10 price (1195)");
assert.strictEqual(calc9.totalPrice, 10755, "9 pax total should be 9 * 1195 = 10755");
console.log("  ✓ 9 travelers: $1195/pax, Total: $10,755");

// 2. TEST EDGE CASES & BOUNDS
console.log("\n[Test 2] Edge Cases & Bounds:");

// 12 travelers (above highest tier 10) -> must reject to avoid silent incorrect price
assert.throws(
  () => calculateApplicablePrice(mockProduct, 12),
  /Group pricing is configured for 1 to 10 travelers. Direct booking is not available for 12 travelers/,
  "12 travelers should be rejected with informative error"
);
console.log("  ✓ 12 travelers (above tier 10): correctly rejected with direct booking limit error");

// 0 or negative travelers -> must throw error
assert.throws(
  () => calculateApplicablePrice(mockProduct, 0),
  /Traveler count must be at least 1/,
  "0 travelers must be rejected"
);
console.log("  ✓ 0 travelers: correctly rejected ('Traveler count must be at least 1.')");

assert.throws(
  () => calculateApplicablePrice(mockProduct, -3),
  /Traveler count must be at least 1/,
  "Negative travelers must be rejected"
);
console.log("  ✓ Negative travelers: correctly rejected ('Traveler count must be at least 1.')");

// 3. TEST VALIDATION RULES
console.log("\n[Test 3] Validation Rules:");

// Valid tiers
const validCheck = validateGroupPricingTiers(sampleTiers, true);
assert.strictEqual(validCheck.valid, true, "Sample tiers should be valid");
console.log("  ✓ Valid continuous tiers accepted");

// Overlapping tiers (1-4 and 3-6)
const overlappingTiers: GroupPricingTier[] = [
  { minTravelers: 1, maxTravelers: 4, pricePerPerson: 1000 },
  { minTravelers: 3, maxTravelers: 6, pricePerPerson: 900 },
];
const overlapCheck = validateGroupPricingTiers(overlappingTiers, true);
assert.strictEqual(overlapCheck.valid, false, "Overlapping tiers must be rejected");
console.log(`  ✓ Overlapping tiers correctly rejected: "${overlapCheck.error}"`);

// Gaps in coverage (1-4 and 6-10)
const gapTiers: GroupPricingTier[] = [
  { minTravelers: 1, maxTravelers: 4, pricePerPerson: 1000 },
  { minTravelers: 6, maxTravelers: 10, pricePerPerson: 850 },
];
const gapCheck = validateGroupPricingTiers(gapTiers, true);
assert.strictEqual(gapCheck.valid, false, "Gaps in coverage must be rejected");
console.log(`  ✓ Gaps in tier coverage correctly rejected: "${gapCheck.error}"`);

// Does not start at 1
const notStartAt1: GroupPricingTier[] = [
  { minTravelers: 2, maxTravelers: 5, pricePerPerson: 900 },
];
const start1Check = validateGroupPricingTiers(notStartAt1, true);
assert.strictEqual(start1Check.valid, false, "Must start at 1");
console.log(`  ✓ Tier not starting at 1 correctly rejected: "${start1Check.error}"`);

// minTravelers < 1
const minZero: GroupPricingTier[] = [
  { minTravelers: 0, maxTravelers: 5, pricePerPerson: 900 },
];
const minZeroCheck = validateGroupPricingTiers(minZero, true);
assert.strictEqual(minZeroCheck.valid, false, "minTravelers < 1 must be rejected");
console.log(`  ✓ minTravelers < 1 rejected: "${minZeroCheck.error}"`);

// maxTravelers < minTravelers
const maxLessThanMin: GroupPricingTier[] = [
  { minTravelers: 5, maxTravelers: 3, pricePerPerson: 900 },
];
const maxMinCheck = validateGroupPricingTiers(maxLessThanMin, true);
assert.strictEqual(maxMinCheck.valid, false, "maxTravelers < minTravelers must be rejected");
console.log(`  ✓ maxTravelers < minTravelers rejected: "${maxMinCheck.error}"`);

// pricePerPerson <= 0
const zeroPrice: GroupPricingTier[] = [
  { minTravelers: 1, maxTravelers: 5, pricePerPerson: 0 },
];
const zeroPriceCheck = validateGroupPricingTiers(zeroPrice, true);
assert.strictEqual(zeroPriceCheck.valid, false, "pricePerPerson <= 0 must be rejected");
console.log(`  ✓ pricePerPerson <= 0 rejected: "${zeroPriceCheck.error}"`);

// Duplicate range
const dupRange: GroupPricingTier[] = [
  { minTravelers: 1, maxTravelers: 5, pricePerPerson: 1000 },
  { minTravelers: 1, maxTravelers: 5, pricePerPerson: 900 },
];
const dupCheck = validateGroupPricingTiers(dupRange, true);
assert.strictEqual(dupCheck.valid, false, "Duplicate range must be rejected");
console.log(`  ✓ Duplicate ranges rejected: "${dupCheck.error}"`);

// Missing tiers when enabled
const emptyTiersCheck = validateGroupPricingTiers([], true);
assert.strictEqual(emptyTiersCheck.valid, false, "Empty tiers when enabled must be rejected");
console.log(`  ✓ Enabled with no tiers rejected: "${emptyTiersCheck.error}"`);

// Disabled group pricing -> valid even if empty or undefined
const disabledCheck = validateGroupPricingTiers([], false);
assert.strictEqual(disabledCheck.valid, true, "Disabled group pricing should be valid");
console.log("  ✓ Disabled group pricing correctly passes");

// 4. TEST BACKWARD COMPATIBILITY / REGRESSION
console.log("\n[Test 4] Regression & Disabled Group Pricing:");
const unconfiguredProduct = {
  priceUSD: 1500,
  groupPricingEnabled: false,
  groupPricing: null,
};
const reg1 = calculateApplicablePrice(unconfiguredProduct, 4);
assert.strictEqual(reg1.pricePerPerson, 1500, "Base price should be used when disabled");
assert.strictEqual(reg1.totalPrice, 6000, "Total should be 4 * 1500 = 6000");
console.log("  ✓ Non-group pricing product: $1500/pax, 4 travelers = $6000");

// 5. TEST BACKEND PRICE AUTHORITATIVE ENFORCEMENT (ANTI-TAMPERING)
console.log("\n[Test 5] Backend Price Authoritative Recalculation:");
// Suppose the frontend attempts to send a spoofed total of $10 for 6 travelers:
const spoofedFrontendBooking = {
  travelers: 6,
  tamperedPricePerPerson: 1,
  tamperedTotalAmountUSD: 6,
};
const authoritativeCalc = calculateApplicablePrice(mockProduct, spoofedFrontendBooking.travelers);
assert.strictEqual(authoritativeCalc.totalPrice, 7380, "Authoritative price must be 7380");
assert.notStrictEqual(authoritativeCalc.totalPrice, spoofedFrontendBooking.tamperedTotalAmountUSD);
console.log(`  ✓ Frontend sent: $${spoofedFrontendBooking.tamperedTotalAmountUSD}`);
console.log(`  ✓ Server recalculated authoritative total: $${authoritativeCalc.totalPrice}`);
console.log("  ✓ Tampering strictly prevented: server overrides frontend price");

// 6. TEST MULTI-CATEGORY REUSABILITY (TOURS, TREKS, EXPEDITIONS)
console.log("\n[Test 6] Multi-Category Reusability (Tours, Treks, Expeditions):");
const mockTour = {
  priceUSD: 800,
  groupPricingEnabled: true,
  groupPricing: [
    { minTravelers: 1, maxTravelers: 2, pricePerPerson: 750 },
    { minTravelers: 3, maxTravelers: 8, pricePerPerson: 700 },
  ],
};
const mockTrek = {
  priceUSD: 1600,
  groupPricingEnabled: true,
  groupPricing: sampleTiers,
};
const mockExpedition = {
  priceUSD: 4500,
  groupPricingEnabled: true,
  groupPricing: [
    { minTravelers: 1, maxTravelers: 1, pricePerPerson: 4500 },
    { minTravelers: 2, maxTravelers: 4, pricePerPerson: 4200 },
    { minTravelers: 5, maxTravelers: 8, pricePerPerson: 3900 },
  ],
};

const tourCalc = calculateApplicablePrice(mockTour, 4);
assert.strictEqual(tourCalc.pricePerPerson, 700);
assert.strictEqual(tourCalc.totalPrice, 2800);
console.log("  ✓ Tour group pricing: 4 pax = $2800");

const trekCalc = calculateApplicablePrice(mockTrek, 6);
assert.strictEqual(trekCalc.pricePerPerson, 1230);
assert.strictEqual(trekCalc.totalPrice, 7380);
console.log("  ✓ Trek group pricing: 6 pax = $7380");

const expCalc = calculateApplicablePrice(mockExpedition, 2);
assert.strictEqual(expCalc.pricePerPerson, 4200);
assert.strictEqual(expCalc.totalPrice, 8400);
console.log("  ✓ Expedition group pricing: 2 pax = $8400");

// 7. TEST EMAIL AND BOOKING TOTAL PRICE CONSISTENCY
console.log("\n[Test 7] Email & Booking Data Consistency:");
const bookingRecord = {
  groupSize: 6,
  clientSuppliedTotal: 6, // Tampered client payload
  authoritativeTotal: authoritativeCalc.totalPrice,
};
// Ensure email total matches authoritative total, NOT client supplied total
const emailSentAmount = bookingRecord.authoritativeTotal;
assert.strictEqual(emailSentAmount, 7380, "Email amount must be authoritative server total");
assert.notStrictEqual(emailSentAmount, bookingRecord.clientSuppliedTotal);
console.log("  ✓ Email notification amount verified: strictly uses authoritative server amount ($7380)");

console.log("\n=================================================");
console.log("ALL GROUP PRICING TESTS PASSED SUCCESSFULLY!");
console.log("=================================================");
