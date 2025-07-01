import React from 'react';
import { Recipe } from '../types';
import StarIcon from './icons/StarIcon';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const DifficultyDisplay: React.FC<{ difficulty: '쉬움' | '중간' | '어려움' }> = ({ difficulty }) => {
  const ratingMap = {
    '쉬움': 1,
    '중간': 2,
    '어려움': 3,
  };
  const rating = ratingMap[difficulty] || 1;

  return (
    <div className="flex items-center gap-1.5">
      <span className="font-medium text-gray-700">{difficulty}</span>
      <div className="flex">
        {Array.from({ length: 3 }).map((_, index) => (
          <StarIcon key={index} className={`w-5 h-5 ${index < rating ? 'text-amber-400' : 'text-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  const userIngredients = recipe.ingredients.filter(ing => ing.isUserIngredient);
  const additionalIngredients = recipe.ingredients.filter(ing => !ing.isUserIngredient);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
      <div className="relative">
        <img src={recipe.imageUrl} alt={recipe.name} className="w-full h-64 object-cover" />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/70 backdrop-blur-sm text-gray-800 rounded-full p-2 hover:bg-white transition"
          aria-label="Back to recipes"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-gray-900">{recipe.name}</h2>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DifficultyDisplay difficulty={recipe.difficulty} />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2 mb-4">필요 재료</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <h4 className="font-semibold text-amber-800 mb-2">보유 재료</h4>
              <ul className="space-y-1.5 text-gray-700">
                {userIngredients.map((ing, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{ing.name}</span>
                    <span className="font-mono text-gray-500">{ing.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            {additionalIngredients.length > 0 && (
              <div>
                <h4 className="font-semibold text-rose-700 mb-2">추가 필요 재료</h4>
                <ul className="space-y-1.5 text-gray-700">
                  {additionalIngredients.map((ing, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{ing.name}</span>
                      <span className="font-mono text-gray-500">{ing.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-amber-200 pb-2 mb-4">간단한 조리 순서</h3>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-amber-500 text-white font-bold rounded-full">{index + 1}</span>
                <p className="pt-1 text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
