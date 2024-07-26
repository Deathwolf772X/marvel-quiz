import React from 'react';
import withQuizLogic from './withQuizLogic';

function RandomQuiz({ settings, showResults, resetQuiz, correctAnswers, answeredQuestions, onNextQuestion }) {
  const handleNextQuestionClick = () => {
    onNextQuestion(answeredQuestions);
  };

  return (
    <div onNextQuestion={handleNextQuestionClick}>
      {/* Render your quiz questions and UI here */}
    </div>
  );
}

export default withQuizLogic(RandomQuiz);
