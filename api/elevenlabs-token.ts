type ApiRequest = {
  method?: string;
};

type ApiResponse = {
  setHeader(name: string, value: string): void;
  status(code: number): ApiResponse;
  json(body: unknown): ApiResponse;
};

const ELEVENLABS_TOKEN_ENDPOINT =
  "https://api.elevenlabs.io/v1/convai/conversation/token";

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const agentId = process.env.ELEVENLABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return response.status(503).json({
      error: "ElevenLabs voice is not configured",
      code: "VOICE_NOT_CONFIGURED",
    });
  }

  try {
    const tokenResponse = await fetch(
      `${ELEVENLABS_TOKEN_ENDPOINT}?agent_id=${encodeURIComponent(agentId)}`,
      {
        headers: { "xi-api-key": apiKey },
      },
    );

    if (!tokenResponse.ok) {
      return response.status(502).json({
        error: "Unable to create an ElevenLabs conversation",
      });
    }

    const payload = (await tokenResponse.json()) as { token?: string };
    if (!payload.token) {
      return response.status(502).json({ error: "ElevenLabs returned no conversation token" });
    }

    response.setHeader("Cache-Control", "no-store");
    return response.status(200).json({ token: payload.token });
  } catch {
    return response.status(502).json({ error: "ElevenLabs is temporarily unavailable" });
  }
}
