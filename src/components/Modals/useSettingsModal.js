import { useState } from 'react';

const useSettings = () => {
  const [isSettingsShowing, setSettingsIsShowing] = useState(false);

  function toggleSettings() {
    setSettingsIsShowing(!isSettingsShowing);
  }

  return {
    isSettingsShowing,
    toggleSettings,
  }
};

export default useSettings;