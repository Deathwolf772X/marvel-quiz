import React from 'react';

function ChronologicalQuizSettings({ localChronologicalQuizSettings, handleChronologicalQuizChange, handleChronologicalQuestionsSliderChange, currentMediaTitle, maxQuestions, isDarkMode }) {
  const validateQuestionAmount = (e) => {
    const { name, value } = e.target;
    const val = parseInt(value, 10);
    const min = 5;
    const max = maxQuestions - (maxQuestions % 5);
    const validValue = Math.max(min, Math.min(max, val));

    handleChronologicalQuizChange({ target: { name, value: validValue } });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">Chronological Quiz</h3>
      <label className="block my-2">
        <span>Question Amount</span>
        <div className="flex items-center">
          <input 
            type="range" 
            min="5" 
            max={maxQuestions - (maxQuestions % 5)} 
            step="5" 
            value={localChronologicalQuizSettings.questionAmount} 
            onChange={handleChronologicalQuestionsSliderChange}
            className="mr-2"
          />
          <input 
            type="number" 
            name="questionAmount" 
            value={localChronologicalQuizSettings.questionAmount} 
            onChange={handleChronologicalQuizChange}
            onBlur={validateQuestionAmount}
            step="5"
            min="5"
            max={maxQuestions - (maxQuestions % 5)}
            className={`p-1 border w-20 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          />
        </div>
      </label>
      {currentMediaTitle && (
        <p className="mt-2 truncate">
          Quiz stops at: <strong>{currentMediaTitle}</strong>
        </p>
      )}
      <label className="block my-2">
        <span>Randomize Questions</span>
        <label className="switch ml-2">
          <input 
            type="checkbox" 
            name="randomize" 
            checked={localChronologicalQuizSettings.randomize} 
            onChange={handleChronologicalQuizChange}
          />
          <span className="slider round"></span>
        </label>
      </label>
    </div>
  );
}

export default ChronologicalQuizSettings;
