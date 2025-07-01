import React from 'react';
import ChefHatIcon from './icons/ChefHatIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto p-4 mb-4 sm:mb-8 text-center">
      <div className="flex items-center justify-center gap-3 text-amber-900">
        <ChefHatIcon className="w-8 h-8 sm:w-10 sm:h-10"/>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          오늘 뭐 먹지?
        </h1>
      </div>
      <p className="mt-2 text-md sm:text-lg text-amber-700">
        냉장고 속 재료로 최고의 집밥을 만들어보세요!
      </p>
    </header>
  );
};

export default Header;
