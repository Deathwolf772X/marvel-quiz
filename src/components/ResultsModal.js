import React from 'react';
import resultsData from '../results.json';

const ResultsModal = ({ results, closeResults, quizType, isDarkMode }) => {
  const calculatePercentage = () => {
    if (results.totalQuestions === 0) {
      return 0;
    }
    return ((results.correctAnswers / results.totalQuestions) * 100).toFixed(2);
  };

  const getResultsMessage = (percentage) => {
    if (percentage === '0.00') {
      return resultsData.rewards['0'][0].message.replace('%%', percentage);
    } else if (percentage >= 85) {
      const reward = resultsData.rewards['85-100'][Math.floor(Math.random() * resultsData.rewards['85-100'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 75) {
      const reward = resultsData.rewards['75-84'][Math.floor(Math.random() * resultsData.rewards['75-84'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 70) {
      const reward = resultsData.rewards['70-74'][Math.floor(Math.random() * resultsData.rewards['70-74'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 65) {
      const reward = resultsData.rewards['65-69'][Math.floor(Math.random() * resultsData.rewards['65-69'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 60) {
      const reward = resultsData.rewards['60-64'][Math.floor(Math.random() * resultsData.rewards['60-64'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 55) {
      const reward = resultsData.rewards['55-59'][Math.floor(Math.random() * resultsData.rewards['55-59'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 50) {
      const reward = resultsData.rewards['50-54'][Math.floor(Math.random() * resultsData.rewards['50-54'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 45) {
      const reward = resultsData.rewards['45-49'][Math.floor(Math.random() * resultsData.rewards['45-49'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 40) {
      const reward = resultsData.rewards['40-44'][Math.floor(Math.random() * resultsData.rewards['40-44'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 35) {
      const reward = resultsData.rewards['35-39'][Math.floor(Math.random() * resultsData.rewards['35-39'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 30) {
      const reward = resultsData.rewards['30-34'][Math.floor(Math.random() * resultsData.rewards['30-34'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 25) {
      const reward = resultsData.rewards['25-29'][Math.floor(Math.random() * resultsData.rewards['25-29'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 20) {
      const reward = resultsData.rewards['20-24'][Math.floor(Math.random() * resultsData.rewards['20-24'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 15) {
      const reward = resultsData.rewards['15-19'][Math.floor(Math.random() * resultsData.rewards['15-19'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 10) {
      const reward = resultsData.rewards['10-14'][Math.floor(Math.random() * resultsData.rewards['10-14'].length)];
      return reward.message.replace('%%', percentage);
    } else if (percentage >= 5) {
      const reward = resultsData.rewards['5-9'][Math.floor(Math.random() * resultsData.rewards['5-9'].length)];
      return reward.message.replace('%%', percentage);
    } else {
      const reward = resultsData.rewards['1-4'][Math.floor(Math.random() * resultsData.rewards['1-4'].length)];
      return reward.message.replace('%%', percentage);
    }
  };

  const percentage = calculatePercentage();
  const message = getResultsMessage(percentage);

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className={`p-6 rounded shadow-lg w-96 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl mb-4">
          {quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz Results
        </h2>
        <div className="mb-4">
          <p>Answered Questions: {results.answeredQuestions}/{results.totalQuestions}</p>
          <p>Correct Answers: {results.correctAnswers}</p>
          {quizType === 'timed' && <p>Time Taken: {results.timeTaken} seconds</p>}
          <p>Score: {percentage}%</p>
        </div>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button 
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={closeResults}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsModal;
