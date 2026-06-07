import { describe, it, expect, beforeEach, vi } from "vitest";

// Мокаем модуль аналитики, чтобы getVariant не дёргал реальные счётчики
vi.mock("../src/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

import { getVariant, CTA_COPY } from "../src/lib/abtest";

describe("A/B-тест CTA", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("назначает один из вариантов A или B", () => {
    const v = getVariant();
    expect(["A", "B"]).toContain(v);
  });

  it("стабилен между вызовами (запоминает вариант в localStorage)", () => {
    const first = getVariant();
    const second = getVariant();
    const third = getVariant();
    expect(second).toBe(first);
    expect(third).toBe(first);
  });

  it("уважает уже сохранённый вариант", () => {
    window.localStorage.setItem("yosa_cta_variant", "B");
    expect(getVariant()).toBe("B");
  });

  it("для каждого варианта есть тексты RU и EN", () => {
    for (const key of ["A", "B"] as const) {
      expect(CTA_COPY[key].ru).toBeTruthy();
      expect(CTA_COPY[key].en).toBeTruthy();
      expect(CTA_COPY[key].sub_ru).toBeTruthy();
      expect(CTA_COPY[key].sub_en).toBeTruthy();
    }
  });
});
