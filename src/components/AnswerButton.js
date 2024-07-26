import React, { useState } from 'react';

const AnswerButton = ({ option, isSelected, isCorrect, onClick, isAnswerShown, isDarkMode }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
      onClick();
    }, 150); // Animation duration
  };

  let buttonClass = `w-full py-2 rounded text-center transform transition-transform duration-150 ${
    isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-black hover:bg-gray-300'
  }`;

  if (isSelected) {
    buttonClass = `w-full py-2 rounded text-center transform transition-transform duration-150 ${
      isDarkMode ? 'bg-yellow-500 text-white' : 'bg-yellow-500 text-white'
    }`;
  }

  if (isAnswerShown) {
    if (isCorrect) {
      buttonClass = `w-full py-2 rounded text-center transform transition-transform duration-150 ${
        isDarkMode ? 'bg-green-500 text-white' : 'bg-green-500 text-white'
      }`;
    } else if (isSelected && !isCorrect) {
      buttonClass = `w-full py-2 rounded text-center transform transition-transform duration-150 ${
        isDarkMode ? 'bg-red-500 text-white' : 'bg-red-500 text-white'
      }`;
    }
  }

  if (isClicked) {
    buttonClass += ' scale-95'; // Shrink slightly
  }

  return (
    <button onClick={handleClick} className={buttonClass}>
      {option}
    </button>
  );
};

export default AnswerButton;
