import React from "react";

interface QuantitySelectorProps {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  className?: string;
  minusIcon: React.ReactNode;
  plusIcon: React.ReactNode;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max,
  className = "",
  minusIcon,
  plusIcon,
}) => {
  const handleDecrement = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (!max || value < max) onChange(value + 1);
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={handleDecrement}
        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-1 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
      >
        {minusIcon}
      </button>
      <input
        value={value}
        type="text"
        inputMode="numeric"
        readOnly
        className="bg-gray-50 border-x-0 border-gray-300 text-center text-xm focus:ring-blue-500 focus:border-blue-500 block w-[2.5rem] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={handleIncrement}
        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-1 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
      >
        {plusIcon}
      </button>
    </div>
  );
};
