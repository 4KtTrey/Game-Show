import { useEffect, useState } from 'react';

interface TimerProps {
  duration: number; // seconds
  onTimeUp: () => void;
  isRunning: boolean;
  resetKey: number;
}

export function Timer({ duration, onTimeUp, isRunning, resetKey }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [resetKey, duration]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const progress = timeLeft / duration;
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference * (1 - progress);

  const getColor = () => {
    if (progress > 0.5) return '#22c55e';
    if (progress > 0.25) return '#f59e0b';
    return '#ef4444';
  };

  const getPulse = () => {
    if (timeLeft <= 5 && timeLeft > 0) return 'animate-pulse';
    return '';
  };

  return (
    <div className={`relative flex items-center justify-center ${getPulse()}`}>
      <svg width="130" height="130" className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx="65"
          cy="65"
          r="54"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="8"
        />
        {/* Progress arc */}
        <circle
          cx="65"
          cy="65"
          r="54"
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease' }}
        />
        {/* Glowing effect */}
        <circle
          cx="65"
          cy="65"
          r="54"
          fill="none"
          stroke={getColor()}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          opacity="0.4"
          filter="url(#glow)"
          style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease' }}
        />
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-black text-white tabular-nums" style={{ textShadow: `0 0 20px ${getColor()}` }}>
          {timeLeft}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold">seconds</span>
      </div>
    </div>
  );
}
