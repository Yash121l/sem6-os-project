import React from 'react';
import useSchedulerStore from '../../hooks/useScheduler';
import { ALGORITHMS } from '../../utils/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AlgorithmSelector = () => {
  const { selectedAlgorithm, setAlgorithm, quantum, setQuantum } =
    useSchedulerStore();

  const algorithms = [
    { value: ALGORITHMS.FCFS, label: 'First Come First Served (FCFS)' },
    { value: ALGORITHMS.SJF, label: 'Shortest Job First (SJF)' },
    { value: ALGORITHMS.SRTF, label: 'Shortest Remaining Time First (SRTF)' },
    { value: ALGORITHMS.RR, label: 'Round Robin (RR)' },
    { value: ALGORITHMS.PRIORITY, label: 'Priority (Non-preemptive)' },
    { value: ALGORITHMS.PRIORITY_PREEMPTIVE, label: 'Priority (Preemptive)' },
  ];

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 bg-background p-2 rounded-lg border border-border transition-colors w-full sm:w-auto">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Label className="whitespace-nowrap font-medium text-sm">
          Algorithm:
        </Label>
        <Select value={selectedAlgorithm} onValueChange={setAlgorithm}>
          <SelectTrigger className="w-full sm:min-w-[280px]">
            <SelectValue placeholder="Select algorithm" />
          </SelectTrigger>
          <SelectContent>
            {algorithms.map((algo) => (
              <SelectItem key={algo.value} value={algo.value}>
                {algo.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedAlgorithm === ALGORITHMS.RR && (
        <div className="flex items-center gap-3 border-l border-border pl-4 animate-in fade-in slide-in-from-left-2 duration-300">
          <Label className="whitespace-nowrap font-medium text-sm">
            Time Quantum:
          </Label>
          <Input
            type="number"
            min="1"
            max="10"
            value={quantum}
            onChange={(e) => setQuantum(parseInt(e.target.value) || 1)}
            className="w-20"
          />
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelector;
