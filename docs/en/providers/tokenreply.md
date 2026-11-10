# TokenReply

Chat, JSON response formatting, and tool calls were live-checked on the
OpenAI-compatible `https://api.tokenreply.com/v1` endpoint. The public model
roster also contains trial and paid routes; only explicitly free models belong
in the hosted catalog. The observed account limit was three requests in a
minute during a short smoke check; treat this as an observation, not a published
provider-wide guarantee. Streaming is implemented by the common adapter but
remains under investigation after inconsistent responses in the live check.

## Primary references

- [TokenReply docs](https://www.tokenreply.com/docs) and [free-model guide](https://www.tokenreply.com/guides/free-ai-api?client=app&format=openai&platform=janitorai)
