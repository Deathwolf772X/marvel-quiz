import React, { useState, useEffect } from 'react';
import withQuizLogic from './withQuizLogic';

function TimedQuiz({ settings, showResults, resetQuiz, correctAnswers, answeredQuestions, onNextQuestion }) {
  const [timeLeft, setTimeLeft] = useState(settings.timeAllocated);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          showResults({
            answeredQuestions,
            correctAnswers,
            totalQuestions: settings.questionAmount,
            timeTaken: settings.timeAllocated,
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.timeAllocated, showResults, answeredQuestions, correctAnswers]);

  const handleNextQuestionClick = () => {
    onNextQuestion(answeredQuestions);
  };

  return <div timeLeft={timeLeft} onNextQuestion={handleNextQuestionClick} />;
}

export default withQuizLogic(TimedQuiz);
