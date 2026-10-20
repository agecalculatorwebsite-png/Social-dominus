import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractPostEntities,
  extractFirstUrl,
  getLinkPreviewMetadata,
  calculatePlatformStats,
  isMediaVideo,
  formatFileSize,
  validatePlatformMedia,
} from './preview.ts';

test('extractPostEntities identifies hashtags, mentions, URLs, and plain text', () => {
  const sample = 'Launching our new tool! Check https://techcrunch.com/launch #startup @socialdominus';
  const entities = extractPostEntities(sample);

  const hashtags = entities.filter(e => e.type === 'hashtag');
  const mentions = entities.filter(e => e.type === 'mention');
  const urls = entities.filter(e => e.type === 'url');

  assert.equal(hashtags.length, 1);
  assert.equal(hashtags[0].value, '#startup');

  assert.equal(mentions.length, 1);
  assert.equal(mentions[0].value, '@socialdominus');

  assert.equal(urls.length, 1);
  assert.equal(urls[0].value, 'https://techcrunch.com/launch');
});

test('extractFirstUrl retrieves first URL or null if absent', () => {
  assert.equal(extractFirstUrl('No links here! Just #goodvibes'), null);
  assert.equal(
    extractFirstUrl('Visit https://github.com/project and https://example.com'),
    'https://github.com/project'
  );
});

test('getLinkPreviewMetadata returns structured OpenGraph data with domain', () => {
  const meta = getLinkPreviewMetadata('https://github.com/facebook/react');
  assert.equal(meta.domain, 'github.com');
  assert.ok(meta.title.includes('GitHub'));
  assert.ok(meta.imageUrl);
});

test('calculatePlatformStats respects Twitter 280 and LinkedIn 3000 constraints', () => {
  const tweetStats = calculatePlatformStats('Hello world', 'twitter');
  assert.equal(tweetStats.maxChars, 280);
  assert.equal(tweetStats.currentChars, 11);
  assert.equal(tweetStats.remainingChars, 269);
  assert.equal(tweetStats.isOverLimit, false);

  const longContent = 'A'.repeat(285);
  const overStats = calculatePlatformStats(longContent, 'twitter');
  assert.equal(overStats.isOverLimit, true);
  assert.equal(overStats.remainingChars, -5);

  const linkedinStats = calculatePlatformStats(longContent, 'linkedin');
  assert.equal(linkedinStats.isOverLimit, false);
  assert.equal(linkedinStats.maxChars, 3000);
});

test('isMediaVideo accurately recognizes video types and extensions', () => {
  assert.equal(isMediaVideo('video/mp4'), true);
  assert.equal(isMediaVideo('video/quicktime'), true);
  assert.equal(isMediaVideo('video/webm'), true);
  assert.equal(isMediaVideo('clip.mp4'), true);
  assert.equal(isMediaVideo('promo.mov'), true);
  assert.equal(isMediaVideo('image/png'), false);
  assert.equal(isMediaVideo('photo.jpg'), false);
  assert.equal(isMediaVideo('https://images.unsplash.com/photo-1'), false);
});

test('formatFileSize formats bytes cleanly', () => {
  assert.equal(formatFileSize(0), '0 B');
  assert.equal(formatFileSize(1024), '1.0 KB');
  assert.equal(formatFileSize(1048576 * 2.5), '2.5 MB');
});

test('validatePlatformMedia enforces platform-specific video, image, and size limits', () => {
  // Twitter allows max 4 images
  const twitterValid = validatePlatformMedia(
    [
      { type: 'image/jpeg', size: 1000 },
      { type: 'image/png', size: 2000 },
    ],
    'twitter'
  );
  assert.equal(twitterValid.isValid, true);

  // Twitter rejects 5 images
  const twitterOver = validatePlatformMedia(
    Array(5).fill({ type: 'image/jpeg', size: 1000 }),
    'twitter'
  );
  assert.equal(twitterOver.isValid, false);
  assert.ok(twitterOver.error?.includes('maximum of 4 images'));

  // Twitter rejects mixed image and video
  const twitterMixed = validatePlatformMedia(
    [
      { type: 'image/jpeg', size: 1000 },
      { type: 'video/mp4', size: 5000 },
    ],
    'twitter'
  );
  assert.equal(twitterMixed.isValid, false);
  assert.ok(twitterMixed.error?.includes('mixing images and videos'));
});
