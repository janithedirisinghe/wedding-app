"use client";

import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string; // Format: 'YYYY-MM-DDTHH:mm:ssZ'
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      try {
        const now = new Date();
        const target = new Date(targetDate);

        if (isNaN(target.getTime())) {
          throw new Error('Invalid target date format.');
        }

        const totalSeconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));

        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        setTimeLeft({ days, hours, minutes, seconds });
      } catch (e) {
        console.error('Error in calculateTimeLeft:', e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unexpected error occurred.');
        }
      }
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [targetDate]);

  if (error) {
    return <div className="text-red-500 p-4 border border-red-300 rounded">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 max-w-md mx-auto bgColour rounded-lg border border-gray-200">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 fontColour4">
        {timeLeft ? (
          <>
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
              <span className="text-xl sm:text-2xl font-bold">{timeLeft.days}</span>
              <span className="text-xs sm:text-sm fontColour3">Days</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
              <span className="text-xl sm:text-2xl font-bold">{timeLeft.hours}</span>
              <span className="text-xs sm:text-sm fontColour3">Hours</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
              <span className="text-xl sm:text-2xl font-bold">{timeLeft.minutes}</span>
              <span className="text-xs sm:text-sm fontColour3">Minutes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition">
              <span className="text-xl sm:text-2xl font-bold">{timeLeft.seconds}</span>
              <span className="text-xs sm:text-sm fontColour3">Seconds</span>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Countdown;
