// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import JesseAIExperience from "./JesseAIExperience";

const elevenLabs = vi.hoisted(() => ({
  callbacks: undefined as
    | {
        onDisconnect?: (details: {
          reason: "error" | "agent" | "user";
          message?: string;
        }) => void;
      }
    | undefined,
  endSession: vi.fn(),
  sendUserMessage: vi.fn(),
  startSession: vi.fn(),
}));

vi.mock("@elevenlabs/react", () => ({
  ConversationProvider: ({ children }: { children: React.ReactNode }) => children,
  useConversation: (callbacks: typeof elevenLabs.callbacks) => {
    elevenLabs.callbacks = callbacks;
    return {
      ...elevenLabs,
      isListening: false,
      isSpeaking: false,
      status: "disconnected",
    };
  },
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

  it("shows the ElevenLabs reason when a voice session is rejected", async () => {
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /talk to jesse ai/i }));
    fireEvent.click(screen.getByRole("button", { name: /^voice$/i }));
    act(() => {
      elevenLabs.callbacks?.onDisconnect?.({
        reason: "error",
        message: "Override for field 'language' is not allowed by config.",
      });
    });

    expect(await screen.findByText(/override for field 'language' is not allowed/i)).toBeTruthy();
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

  it("closes with Escape and returns focus to the mobile-safe trigger", async () => {
    renderExperience();

    const trigger = screen.getByRole("button", { name: /talk to jesse ai/i });
    fireEvent.click(trigger);

    const closeButton = screen.getByRole("button", { name: /close jesse ai/i });
    await waitFor(() => expect(document.activeElement).toBe(closeButton));

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.queryByRole("dialog", { name: /jesse ai conversation/i })).toBeNull();
      expect(document.activeElement).toBe(screen.getByRole("button", { name: /talk to jesse ai/i }));
    });
  });

  it("returns focus to the page control that opened Jesse AI", async () => {
    render(
      <>
        <button
          type="button"
          onClick={(event) => window.dispatchEvent(new CustomEvent("open-jesse-ai", { detail: { opener: event.currentTarget } }))}
        >
          Open from page
        </button>
        <MemoryRouter>
          <JesseAIExperience />
        </MemoryRouter>
      </>,
    );

    const pageOpener = screen.getByRole("button", { name: /open from page/i });
    fireEvent.click(pageOpener);
    fireEvent.click(await screen.findByRole("button", { name: /close jesse ai/i }));

    await waitFor(() => expect(document.activeElement).toBe(pageOpener));
  });
});
