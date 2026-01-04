import { GoogleGenAI } from "@google/genai";
import { type LanguageType, OccasionType, ToneType } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const generateGreeting = async (
  occasion: OccasionType,
  name: string,
  age: string,
  interests: string,
  tone: ToneType,
  language: LanguageType,
): Promise<string> => {
  try {
    const prompt = `
      Напиши уникальное поздравление на языке :${language}
      Повод: ${occasion},
      Для кого: ${name},
      Возраст: ${age},
      Ингтересы/хобби: ${interests ? interests : "Не указаны"},
      Тон: ${tone},
     
      Иструменты по стилю (адаптируй под культурный контест языка ${language}):
      - Офциальный: Сдержанный, уважительный.
      - Дружеский: Тёплый, неформальный.
      - Юмористический: Весёлый, забавный, с доброй шуткой.
      - Романтический: Нежный, любящий, чувственный.
      - Трогательный: Душевный, эмоцианальный.
      - 18+: Дерзкое, с перчинкой, сарказмом или взрослыми шутками. (Только если уместно для онтекста 18+). 
      
      Общие требования: 
      - Обязательно учтивай возраст и интересы человека.     
      - Длина: От 2 до 5 предложений. 
      - Используй 2-3 подходящих по смыслу эмодзи. 
      - Форматирование: Просто текст, без markdown заголовков. 
      - Язык ответа СТРОГО: ${language}. 
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: tone === ToneType.ADULT ? 0.9 : 0.8,
      },
    });

    console.log(response);
    if (response.text) {
      return response.text;
    } else {
      throw new Error("Не удалось сгенерировать текст.");
    }
  } catch (error) {
    console.error("Gemini text API error", error);
    throw new Error("[generateGreeting] Ошибка генерации");
  }
};
