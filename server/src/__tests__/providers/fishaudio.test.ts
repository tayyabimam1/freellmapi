import { afterEach, describe, expect, it, vi } from 'vitest';
import { getProvider, hasProvider } from '../../providers/index.js';
import { AUTH_JSON_PROVIDER_MAP, detectPlatform } from '../../lib/key-parser.js';
import { inferPoolForPlatform } from '../../services/provider-quota.js';

afterEach(() => vi.restoreAllMocks());

describe('fishaudio registry', () => {
  it.each([
    ['fishaudio', ['FISHAUDIO_', 'FISH_AUDIO_'], ['fishaudio', 'fish-audio']],
  ] as const)('registers %s with key import and an account-wide quota pool', (platform, prefixes, aliases) => {
    expect(hasProvider(platform)).toBe(true);
    for (const prefix of prefixes) expect(detectPlatform(prefix)).toBe(platform);
    for (const alias of aliases) expect(AUTH_JSON_PROVIDER_MAP[alias]).toBe(platform);
    expect(inferPoolForPlatform(platform, 'model-a')).toBe(inferPoolForPlatform(platform, 'model-b'));
  });

  it('refuses chat requests because it is a media/search API', async () => {
    await expect(getProvider('fishaudio')!.chatCompletion('test-key', [], 'model')).rejects.toMatchObject({ status: 422 });
  });
});
