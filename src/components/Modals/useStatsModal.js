import { useState } from 'react';

const useStatsModal = () => {
  const [isStatsShowing, setStatsIsShowing] = useState(false);

  function toggleStats() {
    setStatsIsShowing(!isStatsShowing);
  }

  return {
    isStatsShowing,
    toggleStats,
  }
};

export default useStatsModal;