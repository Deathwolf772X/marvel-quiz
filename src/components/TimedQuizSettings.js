import React from 'react';

function TimedQuizSettings({ localTimedQuizSettings, handleTimedQuizChange, handleTimedQuestionsSliderChange, handleTimeSliderChange, maxQuestions, isDarkMode }) {
  const validateQuestionAmount = (e) => {
    const { name, value } = e.target;
    const val = parseInt(value, 10);
    const min = 1;
    const max = maxQuestions;
    const validValue = Math.max(min, Math.min(max, val));

    handleTimedQuizChange({ target: { name, value: validValue } });
  };

  const validateTimeAllocated = (e) => {
    const { name, value } = e.target;
    const val = parseInt(value, 10);
    const min = 5; // Set minimum time to 5 seconds
    const validValue = Math.max(min, val);

    handleTimedQuizChange({ target: { name, value: validValue } });
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">Timed Quiz</h3>
      <label className="block my-2">
        <span>Question Amount</span>
        <div className="flex items-center">
          <input 
            type="range" 
            min="1" 
            max={maxQuestions} 
            value={localTimedQuizSettings.questionAmount} 
            onChange={handleTimedQuestionsSliderChange}
            className="mr-2"
          />
          <input 
            type="number" 
            name="questionAmount" 
            value={localTimedQuizSettings.questionAmount} 
            onChange={handleTimedQuizChange}
            onBlur={validateQuestionAmount}
            min="1"
            max={maxQuestions}
            className={`p-1 border w-20 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          />
        </div>
      </label>
      <label className="block my-2">
        <span>Time Allocated (seconds)</span>
        <div className="flex items-center">
          <input 
            type="range" 
            min="5" // Set minimum time to 5 seconds
            max="300" 
            step="10" 
            value={localTimedQuizSettings.timeAllocated} 
            onChange={handleTimeSliderChange}
            className="mr-2"
          />
          <input 
            type="number" 
            name="timeAllocated" 
            value={localTimedQuizSettings.timeAllocated} 
            onChange={handleTimedQuizChange}
            onBlur={validateTimeAllocated}
            min="5" // Set minimum time to 5 seconds
            className={`p-1 border w-20 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          />
        </div>
      </label>
      <label className="block my-2">
        <span>Randomize Questions</span>
        <label className="switch ml-2">
          <input 
            type="checkbox" 
            name="randomize" 
            checked={localTimedQuizSettings.randomize} 
            onChange={handleTimedQuizChange}
          />
          <span className="slider round"></span>
        </label>
      </label>
    </div>
  );
}

export default TimedQuizSettings;
