import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAnnualSavings,
  applyCoupon,
  validatePostContent,
  INITIAL_PLANS,
} from './pricing.ts';

test('calculateAnnualSavings correctly calculates percentage and monthly equivalent', () => {
  // Starter: $15/mo vs $144/yr
  const starter = calculateAnnualSavings(15, 144);
  assert.equal(starter.monthlyEquivalent, 12);
  assert.equal(starter.totalSaved, 36);
  assert.equal(starter.savingsPercentage, 20); // 36 / 180 = 20%

  // Growth: $39/mo vs $372/yr
  const growth = calculateAnnualSavings(39, 372);
  assert.equal(growth.monthlyEquivalent, 31);
  assert.equal(growth.totalSaved, 96);
  assert.equal(growth.savingsPercentage, 21); // 96 / 468 = ~20.5% -> 21%
});

test('applyCoupon applies percentage discount correctly', () => {
  const coupon = {
    code: 'LAUNCH25',
    discountType: 'percentage' as const,
    discountValue: 25,
  };
  const result = applyCoupon(100, coupon, 'growth');
  assert.equal(result.isValid, true);
  assert.equal(result.discountAmount, 25);
  assert.equal(result.finalPrice, 75);
});

test('applyCoupon rejects expired coupons', () => {
  const expiredCoupon = {
    code: 'OLD',
    discountType: 'fixed' as const,
    discountValue: 10,
    expiresAt: '2020-01-01',
  };
  const result = applyCoupon(50, expiredCoupon, 'growth');
  assert.equal(result.isValid, false);
  assert.equal(result.finalPrice, 50);
});

test('validatePostContent validates empty posts and character limits per platform', () => {
  const emptyCheck = validatePostContent('', ['twitter']);
  assert.equal(emptyCheck.isValid, false);
  assert.ok(emptyCheck.errors.general);

  const noChannelCheck = validatePostContent('Hello world', []);
  assert.equal(noChannelCheck.isValid, false);
  assert.ok(noChannelCheck.errors.platforms);

  const longTweet = 'A'.repeat(300);
  const tweetCheck = validatePostContent(longTweet, ['twitter', 'facebook']);
  assert.equal(tweetCheck.isValid, false);
  assert.ok(tweetCheck.errors.twitter);
  assert.equal(tweetCheck.errors.facebook, undefined); // fits on FB

  const validPost = validatePostContent('Hello Social Dominus!', ['twitter', 'linkedin']);
  assert.equal(validPost.isValid, true);
});

test('INITIAL_PLANS has 5 tiers with valid limits', () => {
  assert.equal(INITIAL_PLANS.length, 5);
  const planIds = INITIAL_PLANS.map(p => p.id);
  assert.deepEqual(planIds, ['free', 'starter', 'growth', 'agency', 'enterprise']);
});
