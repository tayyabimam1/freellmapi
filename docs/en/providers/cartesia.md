# Cartesia

The media adapter uses the Sonic TTS bytes endpoint and batch STT endpoint.
The official Free plan includes 20,000 monthly credits shared between TTS and
STT; Sonic costs one credit per character and Ink costs three credits per
second. The free plan is for evaluation and personal use; Cartesia lists its
commercial-use license under Pro. Live checks returned WAV audio from
`sonic-3.6` and the text `Test.` from `ink-whisper`. The adapters restrict
themselves to these tested routes and leave other models to catalog review.

## Primary references

- [Cartesia TTS](https://docs.cartesia.ai/api-reference/tts/bytes), [STT](https://docs.cartesia.ai/api-reference/stt/transcribe), and [pricing](https://www.cartesia.ai/pricing)
