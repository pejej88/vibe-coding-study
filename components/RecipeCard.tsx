import React from 'react';
import { Recipe } from '../types';
import StarIcon from './icons/StarIcon';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
}

const DifficultyRating: React.FC<{ difficulty: '쉬움' | '중간' | '어려움' }> = ({ difficulty }) => {
  const ratingMap = {
    '쉬움': 1,
    '중간': 2,
    '어려움': 3,
  };
  const rating = ratingMap[difficulty] || 1;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <StarIcon
          key={index}
          className={`w-4 h-4 ${index < rating ? 'text-amber-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-48">
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute bottom-0 left-0 p-4">
           <h3 className="text-white text-xl font-bold ">{recipe.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="font-semibold">{recipe.cookTime}</span>
          <DifficultyRating difficulty={recipe.difficulty} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
