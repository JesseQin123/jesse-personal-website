# Jesse AI experience

The website includes a globally available Jesse AI experience. Text mode remains useful without
external credentials, while voice mode connects to a private ElevenLabs Agent when configured:

- reviewed, deterministic answers based on public website content;
- English and Chinese topic matching;
- private WebRTC voice conversations through ElevenLabs;
- live bilingual transcription and agent replies in the custom chat UI;
- an animated portrait that reflects idle, listening, thinking, and speaking states;
- explicit AI disclosure, privacy boundaries, and a handoff to the real booking flow.

## Local preview

```bash
npm install
npm run dev
```

Open the site and select **Talk to Jesse AI** in the lower-right corner. Choose **Voice**, then
select **Start voice conversation** and allow microphone access. The text experience works in all
modern browsers and remains available if ElevenLabs is not configured.

## Knowledge source

The reviewed preview knowledge lives in:

```text
src/features/jesse-ai/knowledge.ts
```

Keep this content public-safe. Do not add private contact information, customer data, credentials,
or facts that Jesse has not reviewed. Unknown questions intentionally receive a transparent
fallback instead of a fabricated answer.

## ElevenLabs production voice

The repository includes `POST /api/elevenlabs-token`, a server-only token exchange for a private
ElevenLabs Agent. Local Vite development and deployed serverless environments both use the same
handler. To enable it, add:

```text
ELEVENLABS_API_KEY=...
ELEVENLABS_AGENT_ID=...
```

Never expose `ELEVENLABS_API_KEY` through a `VITE_` variable. `VITE_` values are shipped to every
browser.

Before publishing the production agent:

1. Create a private ElevenLabs Agent.
2. Add the public Jesse knowledge documents to its knowledge base.
3. Select a stock voice for initial testing, then replace it with Jesse's verified clone.
4. Configure short spoken answers, bilingual behavior, interruption handling, and the same privacy
   boundaries as the local preview.
5. Add rate limiting at the deployment edge and set transcript/audio retention explicitly.
6. Run adversarial tests for private-data requests, prompt injection, invented credentials, and
   attempts to make commitments on Jesse's behalf.

Voice mode calls this endpoint on demand and gives the returned short-lived WebRTC token to the
ElevenLabs React SDK. The API key never enters the browser bundle.
