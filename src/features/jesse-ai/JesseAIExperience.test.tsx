// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import JesseAIExperience from "./JesseAIExperience";

afterEach(cleanup);

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

  it("explains the local template voice before microphone use", () => {
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /talk to jesse ai/i }));
    fireEvent.click(screen.getByRole("button", { name: /^voice$/i }));

    expect(screen.getByText(/browser voice preview/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /start listening/i })).toBeTruthy();
  });

  it("lets a visitor choose Chinese voice recognition", () => {
    renderExperience();

    fireEvent.click(screen.getByRole("button", { name: /talk to jesse ai/i }));
    fireEvent.click(screen.getByRole("button", { name: /^voice$/i }));
    fireEvent.click(screen.getByRole("button", { name: /use chinese voice input/i }));

    expect(screen.getByRole("button", { name: /use chinese voice input/i }).getAttribute("aria-pressed")).toBe("true");
  });
});
