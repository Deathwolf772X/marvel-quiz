import React, { useState, useEffect } from 'react';
import { shuffleArray } from '../utils';
import AnswerButton from './AnswerButton';
import QuizLayout from './QuizLayout';

const withQuizLogic = (WrappedComponent) => {
  return function QuizComponent({ questions, resetQuiz, settings, showResults, isDarkMode, isMuted, onNextQuestion }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptions, setCurrentOptions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [isQuizOver, setIsQuizOver] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [isAnswerShown, setIsAnswerShown] = useState(null);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [hint, setHint] = useState('');
    const [timeLeft, setTimeLeft] = useState(settings.timeAllocated);
    const [nextQuestionClicked, setNextQuestionClicked] = useState(false); // Lock state
    const [hintClicked, setHintClicked] = useState(false); // Lock state for hint

    useEffect(() => {
      let quizQuestions = [...questions];
      if (settings.randomize || settings.isRandomQuiz) {
        quizQuestions = shuffleArray(quizQuestions);
      }
      quizQuestions = quizQuestions.slice(0, settings.questionAmount);
      setShuffledQuestions(quizQuestions);
      setCurrentQuestionIndex(0);
      setIsQuizOver(false);
      setTimeLeft(settings.timeAllocated); // Ensure timeLeft is reset
      setAnsweredQuestions(0); // Reset answered questions
      setCorrectAnswers(0); // Reset correct answers
      setNextQuestionClicked(false); // Reset lock
      setHintClicked(false); // Reset lock for hint
    }, [questions, settings]);

    useEffect(() => {
      if (shuffledQuestions.length > 0 && currentQuestionIndex < shuffledQuestions.length) {
        setCurrentOptions(shuffleArray([...shuffledQuestions[currentQuestionIndex].options]));
      }
    }, [currentQuestionIndex, shuffledQuestions]);

    useEffect(() => {
      if (isAnswerShown !== null && !isMuted) {
        const audio = new Audio(
          isAnswerShown ? './sounds/correct.mp3' : './sounds/incorrect.mp3'
        );
        audio.play();
      }
    }, [isAnswerShown, isMuted]);

    useEffect(() => {
      if (settings.timeAllocated) {
        const timer = setInterval(() => {
          setTimeLeft(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timer);
              handleTimeExpired();
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [settings.timeAllocated]);

    const handleTimeExpired = () => {
      // End the quiz when the timer expires
      setIsQuizOver(true);
      showResults({
        answeredQuestions,
        correctAnswers,
        totalQuestions: settings.questionAmount,
        timeTaken: settings.timeAllocated,
      });
    };

    const handleAnswer = () => {
      if (nextQuestionClicked) return; // Prevent handling answer if locked
      setNextQuestionClicked(true); // Lock the answer processing

      const isCorrect = selectedOption === shuffledQuestions[currentQuestionIndex].correct_answer;
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
      setIsAnswerShown(isCorrect);

      setTimeout(() => {
        setIsAnswerShown(null);
        setAnsweredQuestions(prev => prev + 1);
        setHintClicked(false); // Reset hint lock for the next question
        if (currentQuestionIndex + 1 >= settings.questionAmount || currentQuestionIndex + 1 >= shuffledQuestions.length) {
          setIsQuizOver(true);
        } else {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          setSelectedOption(null);
          setNextQuestionClicked(false); // Unlock for the next question
          onNextQuestion(nextIndex); // Call onNextQuestion with the next index
        }
      }, 1000); // Flash for 1 second before moving to the next question
    };

    const showHint = () => {
      if (!hintClicked && hintsUsed < Math.ceil(settings.questionAmount / 5)) {
        setHint(shuffledQuestions[currentQuestionIndex].hint);
        setHintsUsed(prev => prev + 1);
        setHintClicked(true); // Lock the hint button after one use per question
      }
    };

    const quitQuiz = () => {
      resetQuiz();
    };

    useEffect(() => {
      if (isQuizOver) {
        const totalQuestions = shuffledQuestions.length;
        const timeTaken = settings.timeAllocated - timeLeft;
        const results = {
          answeredQuestions,
          correctAnswers,
          totalQuestions,
          timeTaken,
        };

        showResults(results);
      }
    }, [isQuizOver, correctAnswers, showResults, shuffledQuestions.length, settings.timeAllocated, timeLeft, answeredQuestions]);

    if (shuffledQuestions.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <QuizLayout
        question={shuffledQuestions[currentQuestionIndex].question}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={shuffledQuestions.length}
        score={correctAnswers}
        handleAnswer={handleAnswer}
        showHint={showHint}
        hintsUsed={hintsUsed}
        selectedOption={selectedOption}
        quitQuiz={quitQuiz}
        isDarkMode={isDarkMode}
        hint={hint} // Pass hint to the layout
        timeLeft={timeLeft} // Pass timeLeft to the layout
      >
        {currentOptions.map((option, index) => (
          <AnswerButton
            key={index}
            option={option}
            isSelected={selectedOption === option}
            isCorrect={option === shuffledQuestions[currentQuestionIndex].correct_answer}
            onClick={() => setSelectedOption(option)}
            isAnswerShown={isAnswerShown !== null}
            isDarkMode={isDarkMode}
          />
        ))}
        <WrappedComponent {...{ settings, isDarkMode, isMuted, showResults, resetQuiz, timeLeft, correctAnswers, answeredQuestions }} />
      </QuizLayout>
    );
  };
};

export default withQuizLogic;
