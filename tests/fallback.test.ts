import { describe, it, expect } from "vitest";
import { getFallbackEstimate } from "../server";

describe("Офлайн-фолбэк оценки КБЖУ", () => {
  it("всегда помечает ответ как isFallback", () => {
    const res = getFallbackEstimate("что-то непонятное");
    expect(res.isFallback).toBe(true);
  });

  it("узнаёт борщ по русскому названию", () => {
    const res = getFallbackEstimate("борщ со сметаной");
    expect(res.foodName).toBe("Борщ");
    expect(res.calories).toBeGreaterThan(0);
  });

  it("узнаёт борщ по латинице", () => {
    const res = getFallbackEstimate("borsch with cream");
    expect(res.foodName).toBe("Борщ");
  });

  it("возвращает валидную структуру для неизвестной еды", () => {
    const res = getFallbackEstimate("марсианский стейк");
    expect(res.foodName).toBe("марсианский стейк");
    expect(res).toHaveProperty("calories");
    expect(res).toHaveProperty("proteins");
    expect(res).toHaveProperty("fats");
    expect(res).toHaveProperty("carbs");
    expect(res).toHaveProperty("commentRu");
    expect(res).toHaveProperty("commentEn");
  });

  it("не падает на пустой строке", () => {
    const res = getFallbackEstimate("");
    expect(res.isFallback).toBe(true);
    expect(res.foodName).toBeTruthy();
  });
});
