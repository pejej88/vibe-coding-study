import React, { useState } from 'react';

interface IngredientInputProps {
  onFindRecipes: (ingredients: string[]) => void;
  isLoading: boolean;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onFindRecipes, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      e.preventDefault();
      addIngredient();
    }
  };

  const addIngredient = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !ingredients.includes(trimmedInput) && ingredients.length < 5) {
      setIngredients([...ingredients, trimmedInput]);
      setInputValue('');
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (ingredients.length > 0) {
      onFindRecipes(ingredients);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <label htmlFor="ingredient-input" className="block text-lg font-semibold text-gray-700 mb-2">
        가지고 있는 재료를 알려주세요 (최대 5개)
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="ingredient-input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="예: 돼지고기, 김치, 양파"
          className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          disabled={ingredients.length >= 5 || isLoading}
        />
        <button
          onClick={addIngredient}
          disabled={!inputValue.trim() || ingredients.length >= 5 || isLoading}
          className="px-4 py-3 bg-amber-800 text-white font-semibold rounded-lg hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          추가
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 min-h-[40px]">
        {ingredients.map((ing, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            <span>{ing}</span>
            <button onClick={() => removeIngredient(index)} className="text-amber-600 hover:text-amber-800">
              &#x2715;
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleSubmit}
          disabled={ingredients.length === 0 || isLoading}
          className="w-full py-4 bg-amber-500 text-white font-bold text-lg rounded-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? '로딩중...' : '맛있는 레시피 찾기!'}
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;
