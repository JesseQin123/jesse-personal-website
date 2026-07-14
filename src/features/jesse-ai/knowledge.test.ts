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

  it("presents SoloUnicorn as Jesse's original theory", () => {
    const result = answerJesseQuestion("What is Jesse's SoloUnicorn theory?");

    expect(result.kind).toBe("grounded");
    expect(result.answer).toContain("Jesse's original SoloUnicorn theory");
    expect(result.answer).toContain("AI-native organization");
    expect(result.answer).toContain("not a promise of valuation");
  });

  it("connects context graphs to founder judgment in Chinese", () => {
    const result = answerJesseQuestion("为什么一人独角兽需要上下文图谱？");

    expect(result.kind).toBe("grounded");
    expect(result.answer).toContain("决策轨迹");
    expect(result.answer).toContain("创始人的判断");
    expect(result.answer).toContain("组织记忆");
  });
});
