import React from 'react';

function RandomQuizSettings({ localRandomQuizSettings, handleRandomQuizChange, handleRandomQuestionsSliderChange, maxQuestions, isDarkMode }) {
  const validateQuestionAmount = (e) => {
    const { name, value } = e.target;
    const val = parseInt(value, 10);
    const min = 1;
    const max = maxQuestions;
    const validValue = Math.max(min, Math.min(max, val));

    handleRandomQuizChange({ target: { name, value: validValue } });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">Random Quiz</h3>
      <label className="block my-2">
        <span>Question Amount</span>
        <div className="flex items-center">
          <input 
            type="range" 
            min="1" 
            max={maxQuestions} 
            value={localRandomQuizSettings.questionAmount} 
            onChange={handleRandomQuestionsSliderChange}
            className="mr-2"
          />
          <input 
            type="number" 
            name="questionAmount" 
            value={localRandomQuizSettings.questionAmount} 
            onChange={handleRandomQuizChange}
            onBlur={validateQuestionAmount}
            min="1"
            max={maxQuestions}
            className={`p-1 border w-20 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          />
        </div>
      </label>
    </div>
  );
}

export default RandomQuizSettings;
