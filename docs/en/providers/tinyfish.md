# TinyFish

Search and Fetch are separate APIs. This change registers TinyFish for search
and exposes a guarded `POST /api/search/fetch` endpoint for 1–10 HTTP(S) URLs.
It authenticates with `X-API-Key`, returns TinyFish's per-URL result/error
shape, records usage, and uses the existing provider key budget and cooldown
plumbing. TinyFish currently documents Search at 30 requests/minute and 500/hour
and Fetch at 150 URLs/minute and 1,000/day; its pricing page says both remain
free at any wallet balance and do not draw wallet funds. Upstream limits and
eligibility may change, so model/catalog support remains host-managed.

## Primary references

- [TinyFish Search API](https://docs.tinyfish.ai/search-api/reference), [Fetch API](https://docs.tinyfish.ai/fetch-api/reference), and [pricing](https://www.tinyfish.ai/pricing)
