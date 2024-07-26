import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QuizSelection from './components/QuizSelection';
import TimedQuiz from './components/TimedQuiz';
import ChronologicalQuiz from './components/ChronologicalQuiz';
import RandomQuiz from './components/RandomQuiz';
import SettingsModal from './components/SettingsModal';
import ResultsModal from './components/ResultsModal';
import questionsData from './questions.json';
import mediaTitles from './mediaTitles.json';
import './index.css';  // Make sure to import your CSS file

function App() {
  const [quizType, setQuizType] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [globalTimedQuizSettings, setGlobalTimedQuizSettings] = useState({ questionAmount: 10, timeAllocated: 30, randomize: false });
  const [globalRandomQuizSettings, setGlobalRandomQuizSettings] = useState({ questionAmount: 10, isRandomQuiz: true });
  const [globalChronologicalQuizSettings, setGlobalChronologicalQuizSettings] = useState({ questionAmount: 10, randomize: false });
  const [currentQuizSettings, setCurrentQuizSettings] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');

  const maxQuestions = questionsData.length;

  // List of background images
  const backgroundImages = [
    'bg1.jpg',
    'bg2.jpg',
    'bg3.jpg',
    'bg4.jpg',
    'bg5.jpg',
    'bg6.jpg',
    'bg7.jpg',
    // Add more background images here
  ];

  useEffect(() => {
    preloadImages();
    setRandomBackgroundImage();
  }, []);

  useEffect(() => {
    if (quizType === 'timed') {
      setCurrentQuizSettings({ ...globalTimedQuizSettings });
    } else if (quizType === 'random') {
      setCurrentQuizSettings({ ...globalRandomQuizSettings });
    } else if (quizType === 'chronological') {
      setCurrentQuizSettings({ ...globalChronologicalQuizSettings });
    }
  }, [quizType]);

  const preloadImages = () => {
    backgroundImages.forEach(image => {
      const img = new Image();
      img.src = `${process.env.PUBLIC_URL}/${image}`;
    });
  };

  const selectQuiz = (type) => {
    setQuizType(type);
  };

  const resetQuiz = () => {
    setQuizType(null);
    setQuizResults(null);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const updateTimedQuizSettings = (settings) => {
    setGlobalTimedQuizSettings(settings);
  };

  const updateRandomQuizSettings = (settings) => {
    setGlobalRandomQuizSettings(settings);
  };

  const updateChronologicalQuizSettings = (settings) => {
    setGlobalChronologicalQuizSettings(settings);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showResults = (results) => {
    setQuizResults(results);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const setRandomBackgroundImage = () => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundImage(backgroundImages[randomIndex]);
  };

  const handleNextQuestion = (currentQuestionIndex) => {
    if ((currentQuestionIndex + 1) % 5 === 0) {
      setRandomBackgroundImage();
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'dark-mode' : 'light-mode'} relative`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className={`top-bar ${isDarkMode ? 'dark' : 'light'}`}></div>
      <div className={`bottom-bar ${isDarkMode ? 'dark' : 'light'}`}></div>
      {showSettings && (
        <SettingsModal 
          closeSettings={toggleSettings} 
          timedQuizSettings={globalTimedQuizSettings} 
          updateTimedQuizSettings={updateTimedQuizSettings}
          randomQuizSettings={globalRandomQuizSettings}
          updateRandomQuizSettings={updateRandomQuizSettings}
          chronologicalQuizSettings={globalChronologicalQuizSettings}
          updateChronologicalQuizSettings={updateChronologicalQuizSettings}
          maxQuestions={maxQuestions}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isMuted={isMuted}
          toggleMute={toggleMute}
          mediaTitles={mediaTitles} 
        />
      )}
      {quizResults && (
        <>
          <ResultsModal results={quizResults} closeResults={resetQuiz} quizType={quizType} isDarkMode={isDarkMode} />
          <div className="absolute inset-0 z-40 bg-black bg-opacity-50"></div>
        </>
      )}
      <div 
        className={`settings-container ${isHovered ? 'is-hovered' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="settings-background">
          <motion.div
            className="relative z-10 text-2xl"
            style={{ color: isDarkMode ? 'white' : 'black' }}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-cog"></i>
          </motion.div>
          <div className="settings-icons">
            {isHovered && (
              <>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from closing the settings
                    toggleMute();
                  }}
                  className="settings-icon"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'}`}></i>
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from closing the settings
                    toggleDarkMode();
                  }}
                  className="settings-icon"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="fas fa-eye"></i>
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the click event from closing the settings
                    toggleSettings();
                  }}
                  className="settings-icon"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <i className="fas fa-plus"></i>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
      {!quizResults && quizType === null && <QuizSelection selectQuiz={selectQuiz} isDarkMode={isDarkMode} />}
      {!quizResults && quizType === 'timed' && <TimedQuiz questions={questionsData} resetQuiz={resetQuiz} settings={currentQuizSettings} showResults={showResults} isDarkMode={isDarkMode} isMuted={isMuted} onNextQuestion={handleNextQuestion} />}
      {!quizResults && quizType === 'chronological' && <ChronologicalQuiz questions={questionsData} resetQuiz={resetQuiz} settings={currentQuizSettings} showResults={showResults} isDarkMode={isDarkMode} isMuted={isMuted} onNextQuestion={handleNextQuestion} />}
      {!quizResults && quizType === 'random' && <RandomQuiz questions={questionsData} resetQuiz={resetQuiz} settings={currentQuizSettings} showResults={showResults} isDarkMode={isDarkMode} isMuted={isMuted} onNextQuestion={handleNextQuestion} />}
    </div>
  );
}

export default App;
