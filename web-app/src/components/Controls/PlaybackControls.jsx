import React from 'react';
import { RotateCcw } from 'lucide-react';
import useSchedulerStore from '../../hooks/useScheduler';
import { Button } from '@/components/ui/button';

const PlaybackControls = () => {
  const { runScheduler } = useSchedulerStore();

  const handleReset = () => {
    runScheduler();
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handleReset}
        title="Reset / Re-run"
        className="rounded-full h-10 w-10"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PlaybackControls;
