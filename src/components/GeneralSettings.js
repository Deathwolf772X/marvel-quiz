import React from 'react';

function GeneralSettings({ isDarkMode, toggleDarkMode, isMuted, toggleMute }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">General Settings</h3>
      <label className="block my-2">
        <span>Volume</span>
        <label className="switch ml-2">
          <input type="checkbox" checked={!isMuted} onChange={toggleMute} />
          <span className="slider round"></span>
        </label>
      </label>
      <label className="block my-2">
        <span>Dark Mode</span>
        <label className="switch ml-2">
          <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </label>
    </div>
  );
}

export default GeneralSettings;
