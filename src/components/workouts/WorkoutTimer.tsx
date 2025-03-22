
import React, { useState, useEffect } from 'react';
import Button from '../shared/Button';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { toast } from "sonner";

interface WorkoutTimerProps {
  duration: number;
  onComplete: () => void;
}

const WorkoutTimer: React.FC<WorkoutTimerProps> = ({ duration, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      onComplete();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive && timeRemaining === duration * 60) {
      toast.info("Workout started! You can do this! 💪");
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(duration * 60);
    toast.info("Timer reset");
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (timeRemaining / (duration * 60)) * 100;

  return (
    <div className="bg-apteats-neutral-light p-4 rounded-lg">
      <div className="text-center mb-4">
        <h4 className="font-medium text-lg">{formatTime(timeRemaining)}</h4>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-apteats-moss h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="primary" 
          className="flex-1"
          onClick={toggleTimer}
        >
          {isActive ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={resetTimer}
        >
          <RefreshCw size={16} className="mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default WorkoutTimer;
