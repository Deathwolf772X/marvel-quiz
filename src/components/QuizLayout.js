import React, { useState } from 'react';

const QuizLayout = ({
  children,
  question,
  hint,
  currentQuestionIndex,
  totalQuestions,
  score,
  handleAnswer,
  selectedOption,
  showHint,
  hintsUsed,
  timeLeft,
  quitQuiz,
  isDarkMode,
}) => {
  const [nextQuestionClicked, setNextQuestionClicked] = useState(false);
  const [hintClicked, setHintClicked] = useState(false);

  const totalHints = Math.ceil(totalQuestions / 5); // Calculate total hints

  const handleNextQuestionClick = () => {
    setNextQuestionClicked(true);
    setTimeout(() => {
      setNextQuestionClicked(false);
      handleAnswer();
    }, 150); // Animation duration
  };

  const handleHintClick = () => {
    setHintClicked(true);
    setTimeout(() => {
      setHintClicked(false);
      showHint();
    }, 150); // Animation duration
  };

  const logoSrc = isDarkMode ? '/logo.png' : '/darklogo.png';

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`quiz-layout w-4/5 rounded-lg shadow-lg p-8 relative z-10 ${isDarkMode ? 'bg-gray-800 bg-opacity-75 text-white' : 'bg-white bg-opacity-75 text-black'}`}>
        <button 
          className="absolute top-2 right-2 text-xl"
          onClick={quitQuiz}
        >
          <i className="fas fa-times"></i>
        </button>
        <h1 className="text-3xl mb-4 text-center quiz-header">
          <img src={logoSrc} alt="Marvel Quiz" className="hidden md:block mx-auto w-48 h-auto" /> {/* Logo for larger screens */}
          <span className="block md:hidden">Marvel Cinematic Quiz</span> {/* Text for smaller screens */}
        </h1>
        <div className="flex justify-between mb-2">
          <span>Score: {score}</span>
          <span>Question: {currentQuestionIndex + 1} / {totalQuestions}</span>
        </div>
        {timeLeft !== undefined && (
          <div className="flex justify-end mb-4">
            <span>Time Left: {timeLeft}s</span>
          </div>
        )}
        <div className={`rounded-lg p-4 text-center mb-4 ${isDarkMode ? 'bg-gray-900 bg-opacity-75 text-white' : 'bg-gray-200 bg-opacity-75 text-black'}`}>
          <p className="text-xl">{question}</p>
        </div>
        <div className="answer-grid grid grid-cols-2 gap-4 mb-4 md:grid-cols-1"> {/* Adjust grid layout for mobile */}
          {children}
        </div>
        <div className="flex justify-center space-x-4">
          <button 
            className={`py-2 px-4 rounded transform transition-transform duration-150 ${nextQuestionClicked ? 'scale-95' : ''} ${isDarkMode ? 'bg-green-500 hover:bg-green-700 text-white' : 'bg-green-500 hover:bg-green-700 text-white'}`}
            onClick={handleNextQuestionClick}
            disabled={!selectedOption}
          >
            Next Question
          </button>
          <button 
            className={`py-2 px-4 rounded transform transition-transform duration-150 ${hintClicked ? 'scale-95' : ''} ${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-700 text-white' : 'bg-yellow-500 hover:bg-yellow-700 text-white'}`}
            onClick={handleHintClick}
            disabled={hintsUsed >= totalHints}
          >
            Get Hint ({totalHints - hintsUsed} remaining)
          </button>
        </div>
        {hint && (
          <div className={`mt-4 p-4 rounded ${isDarkMode ? 'bg-gray-700 bg-opacity-75 text-white' : 'bg-gray-300 bg-opacity-75 text-black'}`}>
            <p>{hint}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizLayout;
