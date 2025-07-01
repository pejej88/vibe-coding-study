import React, { useState, useCallback } from 'react';
import { Recipe } from './types';
import { fetchRecipesFromIngredients } from './services/geminiService';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userIngredients, setUserIngredients] = useState<string[]>([]);

  const handleFindRecipes = useCallback(async (ingredients: string[]) => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);
    setUserIngredients(ingredients);
    try {
      const fetchedRecipes = await fetchRecipesFromIngredients(ingredients);
      setRecipes(fetchedRecipes);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const handleReset = () => {
    setRecipes([]);
    setSelectedRecipe(null);
    setError(null);
    setUserIngredients([]);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return (
        <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">오류 발생!</p>
          <p>{error}</p>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            다시 시도
          </button>
        </div>
      );
    }

    if (selectedRecipe) {
      return <RecipeDetail recipe={selectedRecipe} onBack={handleBack} />;
    }

    if (recipes.length > 0) {
      return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-amber-900">추천 레시피</h2>
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-amber-200 text-amber-800 font-semibold rounded-lg hover:bg-amber-300 transition"
                >
                    재료 다시 입력
                </button>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} onSelect={() => handleSelectRecipe(recipe)} />
            ))}
          </div>
        </div>
      );
    }

    return <IngredientInput onFindRecipes={handleFindRecipes} isLoading={isLoading} />;
  };

  return (
    <div className="min-h-screen bg-amber-50 text-gray-800 p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-4xl mx-auto flex justify-center">
        {renderContent()}
      </main>
      <footer className="w-full max-w-4xl mx-auto mt-12 text-center text-amber-600 text-sm">
        <p>AI Recipe Assistant</p>
      </footer>
    </div>
  );
};

export default App;
