// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import JesseAIExperience from "./JesseAIExperience";

const elevenLabs = vi.hoisted(() => ({
  endSession: vi.fn(),
  sendUserMessage: vi.fn(),
  startSession: vi.fn(),
}));

vi.mock("@elevenlabs/react", () => ({
  ConversationProvider: ({ children }: { children: React.ReactNode }) => children,
  useConversation: () => ({
    ...elevenLabs,
    isListening: false,
    isSpeaking: false,
    status: "disconnected",
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ token: "private-conversation-token" }),
    }),
  );
  Object.defineProperty(navigator, "mediaDevices", {
    configurable: true,
    value: { getUserMedia: vi.fn().mockResolvedValue({}) },
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const renderExperience = () =>
  render(
    <MemoryRouter>
      <JesseAIExperience />
    </MemoryRouter>,
  );

describe("JesseAIExperience", () => {
  it("lets a visitor open the assistant and ask a grounded question", async () => {
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /talk to jesse ai/i }));
    fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
      target: { value: "What is Jesse's background?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/Rutgers University/i)).toBeTruthy();
  });

  it("starts a private ElevenLabs voice conversation", async () => {
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /talk to jesse ai/i }));
    fireEvent.click(screen.getByRole("button", { name: /^voice$/i }));
    fireEvent.click(screen.getByRole("button", { name: /start voice conversation/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/elevenlabs-token", { method: "POST" });
      expect(elevenLabs.startSession).toHaveBeenCalledWith({
        connectionType: "webrtc",
        conversationToken: "private-conversation-token",
        overrides: {
          agent: {
            language: "en",
          },
        },
      });
    });
  });

  it("starts Chinese voice with the ElevenLabs Chinese language preset", async () => {
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /talk to jesse ai/i }));
    fireEvent.click(screen.getByRole("button", { name: /^voice$/i }));
    fireEvent.click(screen.getByRole("button", { name: /use chinese voice/i }));
    fireEvent.click(screen.getByRole("button", { name: /start voice conversation/i }));

    await waitFor(() => {
      expect(elevenLabs.startSession).toHaveBeenCalledWith({
        connectionType: "webrtc",
        conversationToken: "private-conversation-token",
        overrides: {
          agent: {
            language: "zh",
          },
        },
      });
    });
  });

  it("cancels a pending answer when the conversation is reset", () => {
    vi.useFakeTimers();
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /talk to jesse ai/i }));
    fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
      target: { value: "What is Jesse's background?" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));
    fireEvent.click(screen.getByRole("button", { name: /reset conversation/i }));
    act(() => vi.advanceTimersByTime(500));

    expect(screen.queryByText(/Rutgers University/i)).toBeNull();
  });
});
