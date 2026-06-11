import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Setup Google Gen AI client with User-Agent header for telemetry
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. API calls will fail.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

app.use(express.json());

/**
 * Чистая функция офлайн-фолбэка оценки КБЖУ.
 * Вынесена отдельно, чтобы быть покрытой юнит-тестами без сети и без Gemini.
 * Возвращает валидную структуру даже когда ИИ недоступен (офлайн / нет ключа).
 */
export function getFallbackEstimate(food: string) {
  const query = (food || "").toLowerCase();
  const base = {
    isFallback: true as const,
    proteins: 6,
    fats: 8,
    carbs: 22,
  };

  if (query.includes("борщ") || query.includes("borsch")) {
    return {
      ...base,
      foodName: "Борщ",
      calories: 140,
      proteins: 5,
      fats: 6,
      carbs: 16,
      portionEstimation: "1 порция (250г)",
      commentRu:
        "Мяу! Я сейчас офлайн, но борщ узнаю с закрытыми глазами — вот примерные значения.",
      commentEn:
        "Meow! I'm offline right now, but I'd recognize borsch anywhere — here's an estimate.",
    };
  }

  return {
    ...base,
    foodName: food || "Неизвестное блюдо",
    calories: 180,
    portionEstimation: "1 порция (примерно 150г)",
    commentRu:
      "Мур! Сейчас нет связи с ИИ, поэтому показал средние значения. Подключись к интернету для точного расчёта.",
    commentEn:
      "Meow! No AI connection right now, so I estimated a typical portion. Reconnect for an exact result.",
  };
}

// API route: Estimate KBJU for a given food description
app.post("/api/estimate", async (req, res) => {
  try {
    const { food, language } = req.body;
    if (!food || typeof food !== "string" || food.trim() === "") {
      return res.status(400).json({ error: "Food description is required." });
    }

    const ai = getAiClient();
    
    const prompt = `Analyze the food item or dish described below. Estimate its weight/portion size, and calculate Calories (kcal), Proteins (g), Fats (g), and Carbohydrates (g). Provide a humorous and cute feedback comment as Yosa (Йося), a playful helper cat who is also a friendly virtual nutritionist. Under no circumstances say 'I cannot do this'. If the query is nonsense, identify it as such but still output standard structured JSON with 0 calories and a cute comment from the cat saying the cat doesn't eat non-food items.
    
    Food item: "${food}"
    Preferred Language: ${language || "ru"}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the core calorie-estimation service for Yosa (Йося) calorie-tracker app. Output strictly structured JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: {
              type: Type.STRING,
              description: "The normalized name of the food in Russian or English based on the input."
            },
            calories: {
              type: Type.INTEGER,
              description: "Total estimated calories (kcal)."
            },
            proteins: {
              type: Type.INTEGER,
              description: "Estimated protein in grams."
            },
            fats: {
              type: Type.INTEGER,
              description: "Estimated fat in grams."
            },
            carbs: {
              type: Type.INTEGER,
              description: "Estimated carbohydrates in grams."
            },
            portionEstimation: {
              type: Type.STRING,
              description: "The assumed default portion and weight of this item (e.g., '1 plate (350g)' or '1 piece (80g)')."
            },
            commentRu: {
              type: Type.STRING,
              description: "A cute, witty, encouraging feedback comment in Russian from Yosa the cat."
            },
            commentEn: {
              type: Type.STRING,
              description: "A cute, witty, encouraging feedback comment in English from Yosa the cat."
            }
          },
          required: ["foodName", "calories", "proteins", "fats", "carbs", "portionEstimation", "commentRu", "commentEn"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response text received from Gemini.");
    }

    const data = JSON.parse(responseText.trim());
    // Помечаем как «живой» ответ ИИ, чтобы фронт мог отличать от офлайн-фолбэка
    return res.json({ ...data, isFallback: false });
  } catch (error: any) {
    console.error("API Error in /api/estimate:", error);
    // Возвращаем валидную структуру с пометкой isFallback даже при сбое/офлайне
    return res.json(getFallbackEstimate(req.body?.food || ""));
  }
});

// Setup health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// Vite middleware development / production serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev middleware mounted.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        etag: true,
        maxAge: "7d",
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html")) {
            res.setHeader("Cache-Control", "no-cache");
            return;
          }

          if (filePath.includes(`${path.sep}assets${path.sep}`)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        },
      }),
    );
    // Express v4 wildcard routing for SPA
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production build from dist.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://0.0.0.0:${PORT}`);
  });
}

if (process.env.NODE_ENV !== "test" && process.env.VITEST !== "true") {
  setupServer();
}
