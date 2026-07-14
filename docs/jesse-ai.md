# Jesse AI experience

The website includes a globally available Jesse AI preview. It is intentionally useful without
external credentials:

- reviewed, deterministic answers based on public website content;
- English and Chinese topic matching;
- browser speech recognition for voice input when supported;
- a browser-provided template voice for spoken replies;
- an animated portrait that reflects idle, listening, thinking, and speaking states;
- explicit AI disclosure, privacy boundaries, and a handoff to the real booking flow.

## Local preview

```bash
npm install
npm run dev
```

Open the site and select **Talk to Jesse AI** in the lower-right corner. Chrome or Safari provide
the best browser voice-input support. The text experience works in all modern browsers.

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
ElevenLabs Agent. To enable it in a deployed environment, add:

```text
ELEVENLABS_API_KEY=...
ELEVENLABS_AGENT_ID=...
```

Never expose `ELEVENLABS_API_KEY` through a `VITE_` variable. `VITE_` values are shipped to every
browser.

Before connecting the production agent to the custom UI:

1. Create a private ElevenLabs Agent.
2. Add the public Jesse knowledge documents to its knowledge base.
3. Select a stock voice for initial testing, then replace it with Jesse's verified clone.
4. Configure short spoken answers, bilingual behavior, interruption handling, and the same privacy
   boundaries as the local preview.
5. Add rate limiting at the deployment edge and set transcript/audio retention explicitly.
6. Run adversarial tests for private-data requests, prompt injection, invented credentials, and
   attempts to make commitments on Jesse's behalf.

The current preview does not call this endpoint. That keeps the branch fully runnable until the
private Agent exists and its real conversation lifecycle can be tested end to end.
