import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateImage = async (recipeName: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: `A vibrant, delicious-looking, photorealistic image of ${recipeName}. The dish should be beautifully plated on a clean, modern dish. The background should be a simple, bright kitchen setting. High-quality food photography style.`,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });
    
    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    return 'https://picsum.photos/512/512';
  } catch(error) {
    console.error(`Error generating image for ${recipeName}:`, error);
    // Return a placeholder if image generation fails
    return 'https://picsum.photos/512/512';
  }
};

export const fetchRecipesFromIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  const ingredientsList = ingredients.join(', ');
  const prompt = `
    You are a creative and practical home cooking expert. Your goal is to help users cook delicious meals with the ingredients they already have, reducing food waste.

    The user has the following ingredients: ${ingredientsList}.

    Assume the user has basic Korean pantry staples like soy sauce, sugar, salt, pepper, gochujang, doenjang, and cooking oil. You don't need to list these as 'additional ingredients' unless a very specific type or large quantity is needed.

    Suggest 3 diverse recipes using these ingredients. It's okay to suggest recipes that require one or two additional common ingredients. Be creative with substitutions (e.g., pork can be substituted with spam or bacon).

    Your response MUST be a valid JSON array. Do not include any text, notes, or explanations outside of the JSON array. Each object in the array represents a single recipe and must follow this exact structure:
    [
      {
        "name": "Recipe Name in Korean",
        "cookTime": "약 XX분",
        "difficulty": "쉬움" | "중간" | "어려움",
        "ingredients": [
          { "name": "Ingredient Name", "quantity": "e.g., 200g or 1/2개", "isUserIngredient": true },
          { "name": "Additional Ingredient", "quantity": "e.g., 1큰술", "isUserIngredient": false }
        ],
        "steps": [
          "Step 1...",
          "Step 2...",
          "Step 3..."
        ]
      }
    ]
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    let parsedRecipes: Omit<Recipe, 'imageUrl'>[] = JSON.parse(jsonStr);

    const recipesWithImages: Recipe[] = await Promise.all(
      parsedRecipes.map(async (recipe) => {
        const imageUrl = await generateImage(recipe.name);
        return { ...recipe, imageUrl };
      })
    );
    
    return recipesWithImages;

  } catch (error) {
    console.error("Failed to fetch or parse recipes:", error);
    throw new Error("레시피를 생성하는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
  }
};
