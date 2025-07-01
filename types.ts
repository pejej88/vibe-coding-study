export interface Ingredient {
  name: string;
  quantity: string;
  isUserIngredient: boolean;
}

export interface Recipe {
  name: string;
  cookTime: string;
  difficulty: '쉬움' | '중간' | '어려움';
  ingredients: Ingredient[];
  steps: string[];
  imageUrl: string;
}
