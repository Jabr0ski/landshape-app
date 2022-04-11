import { useState } from 'react';

const useHelpModal = () => {
  const [isHelpShowing, setHelpIsShowing] = useState(false);

  function toggleHelp() {
    setHelpIsShowing(!isHelpShowing);
  }

  return {
    isHelpShowing,
    toggleHelp,
  }
};

export default useHelpModal;