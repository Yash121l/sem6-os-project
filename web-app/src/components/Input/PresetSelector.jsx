import React from 'react';
import { BookOpen } from 'lucide-react';
import useSchedulerStore from '../../hooks/useScheduler';
import { PRESETS } from '../../data/presets';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const PresetSelector = () => {
  const { setProcesses } = useSchedulerStore();

  const handleSelect = (idx) => {
    if (idx === undefined) return;
    setProcesses(PRESETS[idx].processes);
  };

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      <BookOpen size={16} className="text-muted-foreground shrink-0" />
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Load Preset..." />
        </SelectTrigger>
        <SelectContent>
          {PRESETS.map((preset, idx) => (
            <SelectItem key={idx} value={idx}>
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PresetSelector;
