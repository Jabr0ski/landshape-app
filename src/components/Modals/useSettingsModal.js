import { useState } from 'react';

const useSettingsModal = () => {
  const [isSettingsShowing, setSettingsIsShowing] = useState(false);

  function toggleSettings() {
    setSettingsIsShowing(!isSettingsShowing);
  }

  return {
    isSettingsShowing,
    toggleSettings,
  }
};

export default useSettingsModal;