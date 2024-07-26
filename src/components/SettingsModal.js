import React, { useState, useEffect } from 'react';
import GeneralSettings from './GeneralSettings';
import TimedQuizSettings from './TimedQuizSettings';
import RandomQuizSettings from './RandomQuizSettings';
import ChronologicalQuizSettings from './ChronologicalQuizSettings';

function SettingsModal({ 
  closeSettings, 
  timedQuizSettings, 
  updateTimedQuizSettings, 
  randomQuizSettings, 
  updateRandomQuizSettings, 
  chronologicalQuizSettings, 
  updateChronologicalQuizSettings,
  maxQuestions,
  isDarkMode,
  toggleDarkMode,
  isMuted,
  toggleMute,
  mediaTitles
}) {
  const [localTimedQuizSettings, setLocalTimedQuizSettings] = useState(timedQuizSettings);
  const [localRandomQuizSettings, setLocalRandomQuizSettings] = useState(randomQuizSettings);
  const [localChronologicalQuizSettings, setLocalChronologicalQuizSettings] = useState(chronologicalQuizSettings);
  const [currentMediaTitle, setCurrentMediaTitle] = useState('');

  useEffect(() => {
    updateCurrentMediaTitle(localChronologicalQuizSettings.questionAmount);
  }, [localChronologicalQuizSettings.questionAmount]);

  const handleTimedQuizChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : parseInt(value, 10);
    setLocalTimedQuizSettings(prev => ({ ...prev, [name]: val }));
  };

  const handleTimeSliderChange = (e) => {
    const { value } = e.target;
    setLocalTimedQuizSettings(prev => ({ ...prev, timeAllocated: parseInt(value, 10) }));
  };

  const handleTimedQuestionsSliderChange = (e) => {
    const { value } = e.target;
    setLocalTimedQuizSettings(prev => ({ ...prev, questionAmount: parseInt(value, 10) }));
  };

  const handleRandomQuizChange = (e) => {
    const { name, value } = e.target;
    setLocalRandomQuizSettings(prev => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const handleRandomQuestionsSliderChange = (e) => {
    const { value } = e.target;
    setLocalRandomQuizSettings(prev => ({ ...prev, questionAmount: parseInt(value, 10) }));
  };

  const handleChronologicalQuizChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : parseInt(value, 10);
    setLocalChronologicalQuizSettings(prev => ({ ...prev, [name]: val }));
    updateCurrentMediaTitle(val);
  };

  const handleChronologicalQuestionsSliderChange = (e) => {
    const { value } = e.target;
    const val = parseInt(value, 10);
    setLocalChronologicalQuizSettings(prev => ({ ...prev, questionAmount: val }));
    updateCurrentMediaTitle(val);
  };

  const updateCurrentMediaTitle = (questions) => {
    const index = Math.ceil(questions / 5) - 1;
    if (index >= 0 && index < mediaTitles.length) {
      setCurrentMediaTitle(mediaTitles[index]);
    } else {
      setCurrentMediaTitle('');
    }
  };

  const saveSettings = () => {
    updateTimedQuizSettings(localTimedQuizSettings);
    updateRandomQuizSettings(localRandomQuizSettings);
    updateChronologicalQuizSettings(localChronologicalQuizSettings);
    closeSettings();
  };

  return (
    <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'} bg-opacity-75 flex items-center justify-center z-20`}>
      <div className={`p-6 rounded shadow-lg w-96 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl mb-4">Settings</h2>
        <GeneralSettings isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} isMuted={isMuted} toggleMute={toggleMute} />
        <TimedQuizSettings 
          localTimedQuizSettings={localTimedQuizSettings} 
          handleTimedQuizChange={handleTimedQuizChange} 
          handleTimedQuestionsSliderChange={handleTimedQuestionsSliderChange}
          handleTimeSliderChange={handleTimeSliderChange}
          maxQuestions={maxQuestions}
          isDarkMode={isDarkMode}
        />
        <RandomQuizSettings 
          localRandomQuizSettings={localRandomQuizSettings}
          handleRandomQuizChange={handleRandomQuizChange}
          handleRandomQuestionsSliderChange={handleRandomQuestionsSliderChange}
          maxQuestions={maxQuestions}
          isDarkMode={isDarkMode}
        />
        <ChronologicalQuizSettings 
          localChronologicalQuizSettings={localChronologicalQuizSettings}
          handleChronologicalQuizChange={handleChronologicalQuizChange}
          handleChronologicalQuestionsSliderChange={handleChronologicalQuestionsSliderChange}
          currentMediaTitle={currentMediaTitle}
          maxQuestions={maxQuestions}
          isDarkMode={isDarkMode}
        />
        <div className="flex justify-end">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
            onClick={saveSettings}
          >
            Save
          </button>
          <button 
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
            onClick={closeSettings}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
