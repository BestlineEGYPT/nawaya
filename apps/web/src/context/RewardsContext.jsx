import React, { createContext, useContext, useState, useEffect } from 'react';

const RewardsContext = createContext();

export const RewardsProvider = ({ children }) => {
  const [rewards, setRewards] = useState({
    totalPoints: 0,
    currentPoints: 0,
    pointsHistory: [],
  });

  // Load rewards from localStorage on mount
  useEffect(() => {
    const savedRewards = localStorage.getItem('rewards');
    if (savedRewards) {
      try {
        setRewards(JSON.parse(savedRewards));
      } catch (error) {
        console.error('Failed to parse saved rewards:', error);
      }
    }
  }, []);

  // Save rewards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  const addPoints = (points, reason = 'Purchase', description = '') => {
    setRewards((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      currentPoints: prev.currentPoints + points,
      pointsHistory: [
        {
          id: Date.now(),
          points,
          reason,
          description,
          date: new Date().toISOString(),
          type: 'earned',
        },
        ...prev.pointsHistory,
      ],
    }));
  };

  const redeemPoints = (points, rewardName = '', rewardValue = 0) => {
    if (rewards.currentPoints < points) {
      throw new Error('Not enough points to redeem');
    }

    setRewards((prev) => ({
      ...prev,
      currentPoints: prev.currentPoints - points,
      pointsHistory: [
        {
          id: Date.now(),
          points: -points,
          reason: 'Redeemed',
          description: rewardName,
          rewardValue,
          date: new Date().toISOString(),
          type: 'redeemed',
        },
        ...prev.pointsHistory,
      ],
    }));
  };

  const resetPoints = () => {
    setRewards({
      totalPoints: 0,
      currentPoints: 0,
      pointsHistory: [],
    });
  };

  return (
    <RewardsContext.Provider
      value={{
        rewards,
        addPoints,
        redeemPoints,
        resetPoints,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within RewardsProvider');
  }
  return context;
};
