import React from 'react';

function QuizSelection({ selectQuiz, isDarkMode }) {
  const logoSrc = isDarkMode ? 'public/logo.png' : 'public/darklogo.png';

  return (
    <div className="text-center">
      <div className={`inline-block p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 bg-opacity-75 text-white' : 'bg-white bg-opacity-75 text-black'}`}>
        <img src={logoSrc} alt="Marvel Quiz" className="mx-auto h-32 w-auto mb-4" />
        <p className="mb-4">Select a quiz type:</p>
        <button 
          onClick={() => selectQuiz('timed')}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 m-2"
        >
          Timed Quiz
        </button>
        <button 
          onClick={() => selectQuiz('chronological')}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 m-2"
        >
          Chronological Quiz
        </button>
        <button 
          onClick={() => selectQuiz('random')}
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-700 m-2"
        >
          Random Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizSelection;
