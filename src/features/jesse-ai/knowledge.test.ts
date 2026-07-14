import { describe, expect, it } from "vitest";

import { answerJesseQuestion } from "./knowledge";

describe("answerJesseQuestion", () => {
  it("answers identity questions from Jesse's public profile", () => {
    const result = answerJesseQuestion("What is Jesse's background?");

    expect(result.kind).toBe("grounded");
    expect(result.answer).toContain("Rutgers University");
    expect(result.answer).toContain("AI");
  });

  it("connects project questions to Jesse's published work", () => {
    const result = answerJesseQuestion("What projects has Jesse built?");

    expect(result.kind).toBe("grounded");
    expect(result.answer).toContain("Context Graph");
    expect(result.answer).toContain("Solo Unicorn Club");
  });

  it("refuses requests for private contact details", () => {
    const result = answerJesseQuestion("What is Jesse's private phone number?");

    expect(result.kind).toBe("boundary");
    expect(result.answer).toContain("private");
    expect(result.answer).toContain("book");
  });

  it("answers Chinese questions in Chinese", () => {
    const result = answerJesseQuestion("Jesse 的教育背景是什么？");

    expect(result.kind).toBe("grounded");
    expect(result.answer).toContain("罗格斯大学");
    expect(result.answer).toContain("人工智能");
  });
});
