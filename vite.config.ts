import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

import elevenLabsTokenHandler from "./api/elevenlabs-token";

const elevenLabsLocalApi = (): Plugin => ({
  name: "elevenlabs-local-api",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/elevenlabs-token", async (request, response) => {
      response.setHeader("Content-Type", "application/json");
      const apiResponse = {
        setHeader(name: string, value: string) {
          response.setHeader(name, value);
        },
        status(code: number) {
          response.statusCode = code;
          return apiResponse;
        },
        json(body: unknown) {
          response.end(JSON.stringify(body));
          return apiResponse;
        },
      };

      await elevenLabsTokenHandler(request, apiResponse);
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.ELEVENLABS_API_KEY ||= env.ELEVENLABS_API_KEY;
  process.env.ELEVENLABS_AGENT_ID ||= env.ELEVENLABS_AGENT_ID;

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "^/api/ai-usage$": {
          target: "https://www.jesseqin.me",
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      elevenLabsLocalApi(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
