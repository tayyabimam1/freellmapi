import { afterEach, describe, expect, it, vi } from 'vitest';
import { getProvider, hasProvider } from '../../providers/index.js';
import { AUTH_JSON_PROVIDER_MAP, detectPlatform } from '../../lib/key-parser.js';
import { inferPoolForPlatform } from '../../services/provider-quota.js';

afterEach(() => vi.restoreAllMocks());

describe('cartesia registry', () => {
  it.each([
    ['cartesia', ['CARTESIA_'], ['cartesia']],
  ] as const)('registers %s with key import and an account-wide quota pool', (platform, prefixes, aliases) => {
    expect(hasProvider(platform)).toBe(true);
    for (const prefix of prefixes) expect(detectPlatform(prefix)).toBe(platform);
    for (const alias of aliases) expect(AUTH_JSON_PROVIDER_MAP[alias]).toBe(platform);
    expect(inferPoolForPlatform(platform, 'model-a')).toBe(inferPoolForPlatform(platform, 'model-b'));
  });

  it('validates Cartesia with its authenticated, read-only model endpoint', async () => {
    const fetch = vi.spyOn(globalThis, 'fetch').mockResolvedValue(Response.json({ data: [] }));
    await expect(getProvider('cartesia')!.validateKey('test-key')).resolves.toBe(true);
    expect(fetch.mock.calls[0][0]).toBe('https://api.cartesia.ai/models');
    const headers = new Headers(fetch.mock.calls[0][1]?.headers);
    expect(headers.get('authorization')).toBe('Bearer test-key');
    expect(headers.get('cartesia-version')).toBe('2026-08-14');
  });

  it('refuses chat requests because it is a media/search API', async () => {
    await expect(getProvider('cartesia')!.chatCompletion('test-key', [], 'model')).rejects.toMatchObject({ status: 422 });
  });
});
