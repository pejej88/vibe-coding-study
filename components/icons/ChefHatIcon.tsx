import React from 'react';

const ChefHatIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a5 5 0 0 0-5 5v1.5a1.5 1.5 0 0 0 3 0V7a2 2 0 0 1 4 0v1.5a1.5 1.5 0 0 0 3 0V7a5 5 0 0 0-5-5z" />
    <path d="M4 12a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1z" />
  </svg>
);

export default ChefHatIcon;
