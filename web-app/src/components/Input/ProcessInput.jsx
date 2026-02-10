import React, { useState } from 'react';
import { Plus, Trash2, BrainCircuit, Zap, X } from 'lucide-react';
import useSchedulerStore from '../../hooks/useScheduler';
import {
  MAX_PROCESSES,
  MAX_BURST_TIME,
  getProcessColor,
} from '../../utils/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const ProcessInput = () => {
  const { processes, addProcess, removeProcess, updateProcess, setProcesses } =
    useSchedulerStore();
  const [showRandomizer, setShowRandomizer] = useState(false);

  // Randomizer State
  const [randomCount, setRandomCount] = useState(5);
  const [arrivalRange, setArrivalRange] = useState([0, 10]);
  const [burstRange, setBurstRange] = useState([1, 10]);

  const handleAddProcess = () => {
    if (processes.length >= MAX_PROCESSES) return;

    // Find next available ID number
    const usedIds = new Set(
      processes.map((p) => parseInt(p.id.replace('P', '')))
    );
    let nextId = 1;
    while (usedIds.has(nextId)) nextId++;

    const newProcess = {
      id: `P${nextId}`,
      arrivalTime: 0,
      burstTime: 5,
      priority: 1,
      color: getProcessColor(nextId - 1),
    };

    addProcess(newProcess);
  };

  const handleGenerateRandom = () => {
    const newProcesses = [];
    for (let i = 0; i < randomCount; i++) {
      newProcesses.push({
        id: `P${i + 1}`,
        arrivalTime:
          Math.floor(Math.random() * (arrivalRange[1] - arrivalRange[0] + 1)) +
          arrivalRange[0],
        burstTime:
          Math.floor(Math.random() * (burstRange[1] - burstRange[0] + 1)) +
          burstRange[0],
        priority: Math.floor(Math.random() * 5) + 1,
        color: getProcessColor(i),
      });
    }
    // Sort by arrival time for better visualization
    newProcesses.sort((a, b) => a.arrivalTime - b.arrivalTime);
    setProcesses(newProcesses);
    setShowRandomizer(false);
  };

  return (
    <>
      <Card className="h-full flex flex-col border-border/50 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Processes
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowRandomizer(true)}
              title="Randomize"
              className="h-8 w-8"
            >
              <BrainCircuit className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handleAddProcess}
              disabled={processes.length >= MAX_PROCESSES}
              title="Add Process"
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {processes.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-sm py-8 text-center">
              <p>No processes added.</p>
              <Button
                variant="link"
                onClick={handleAddProcess}
                className="mt-2 h-auto p-0"
              >
                Add one now
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {processes.map((process) => (
                <div
                  key={process.id}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm relative overflow-hidden transition-all hover:border-primary/50"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5 transition-colors"
                    style={{ backgroundColor: process.color }}
                  />
                  <div className="p-3 pl-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-sm bg-muted px-2 py-0.5 rounded">
                        {process.id}
                      </span>
                      {processes.length > 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeProcess(process.id)}
                          className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                          Arrival
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          max="50"
                          value={process.arrivalTime}
                          onChange={(e) =>
                            updateProcess(
                              process.id,
                              'arrivalTime',
                              parseInt(e.target.value) || 0
                            )
                          }
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                          Burst
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max={MAX_BURST_TIME}
                          value={process.burstTime}
                          onChange={(e) =>
                            updateProcess(
                              process.id,
                              'burstTime',
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase text-muted-foreground font-bold">
                          Priority
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          max="10"
                          value={process.priority}
                          onChange={(e) =>
                            updateProcess(
                              process.id,
                              'priority',
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="h-8 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Randomizer Modal */}
      {showRandomizer && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card className="w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Generate Processes</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowRandomizer(false)}
                className="h-8 w-8 rounded-full"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Count: {randomCount}</Label>
                </div>
                <Slider
                  defaultValue={[randomCount]}
                  min={3}
                  max={15}
                  step={1}
                  onValueChange={(value) => setRandomCount(value[0])}
                  className="py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Max Arrival (0-{arrivalRange[1]})</Label>
                  <Input
                    type="number"
                    min="0"
                    max="50"
                    value={arrivalRange[1]}
                    onChange={(e) =>
                      setArrivalRange([0, parseInt(e.target.value)])
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Burst (1-{burstRange[1]})</Label>
                  <Input
                    type="number"
                    min="1"
                    max="50"
                    value={burstRange[1]}
                    onChange={(e) =>
                      setBurstRange([1, parseInt(e.target.value)])
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowRandomizer(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleGenerateRandom} className="flex-1">
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
export default ProcessInput;
